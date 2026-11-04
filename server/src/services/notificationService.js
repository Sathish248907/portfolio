import { Notification } from '../models/Notification.js';
import { NotificationPreference } from '../models/NotificationPreference.js';

export const notificationService = {
  /**
   * Create an in-app notification
   */
  async createNotification({
    recipientId = null,
    recipientRole = 'all',
    title,
    message,
    category = 'system',
    type = 'info',
    relatedResourceId = null,
    relatedResourceType = 'system',
    actionUrl = null,
  }) {
    // Check if recipient has in-app notifications disabled for this category
    if (recipientId) {
      const isAllowed = await this.shouldDeliver(recipientId, category, 'inApp');
      if (!isAllowed) {
        return null;
      }
    }

    const notification = new Notification({
      recipientId,
      recipientRole,
      title,
      message,
      category,
      type,
      relatedResourceId,
      relatedResourceType,
      actionUrl,
      isRead: false,
    });

    await notification.save();
    return notification;
  },

  /**
   * Get notifications visible to a specific user with filtering and pagination
   */
  async getNotificationsForUser(user, { category, unreadOnly, search, page = 1, limit = 20 } = {}) {
    const query = {
      isArchived: false,
      $or: [
        { recipientId: user._id || user.id },
        { recipientRole: 'all' },
        { recipientRole: user.role },
      ],
    };

    if (unreadOnly === 'true' || unreadOnly === true) {
      query.isRead = false;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$and = [
        { $or: query.$or },
        { $or: [{ title: searchRegex }, { message: searchRegex }] },
      ];
      delete query.$or;
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)),
      Notification.countDocuments(query),
      this.getUnreadCount(user),
    ]);

    return {
      notifications,
      unreadCount,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(total / parseInt(limit, 10)),
      },
    };
  },

  /**
   * Get count of unread notifications for a user
   */
  async getUnreadCount(user) {
    return Notification.countDocuments({
      isArchived: false,
      isRead: false,
      $or: [
        { recipientId: user._id || user.id },
        { recipientRole: 'all' },
        { recipientRole: user.role },
      ],
    });
  },

  /**
   * Mark single notification as read
   */
  async markAsRead(notificationId, user) {
    const notification = await Notification.findOne({
      _id: notificationId,
      $or: [
        { recipientId: user._id || user.id },
        { recipientRole: 'all' },
        { recipientRole: user.role },
      ],
    });

    if (!notification) return null;

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    return notification;
  },

  /**
   * Mark all unread notifications visible to user as read
   */
  async markAllAsRead(user) {
    const result = await Notification.updateMany(
      {
        isRead: false,
        isArchived: false,
        $or: [
          { recipientId: user._id || user.id },
          { recipientRole: 'all' },
          { recipientRole: user.role },
        ],
      },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      }
    );

    return { modifiedCount: result.modifiedCount };
  },

  /**
   * Archive or delete a notification
   */
  async archiveNotification(notificationId, user) {
    const notification = await Notification.findOne({
      _id: notificationId,
      $or: [
        { recipientId: user._id || user.id },
        { recipientRole: 'all' },
        { recipientRole: user.role },
      ],
    });

    if (!notification) return null;

    notification.isArchived = true;
    await notification.save();

    return notification;
  },

  /**
   * Retrieve notification preferences for user, creating defaults if not yet present
   */
  async getUserPreferences(userId) {
    let pref = await NotificationPreference.findOne({ userId });
    if (!pref) {
      pref = new NotificationPreference({
        userId,
        categories: {
          inquiry: { inApp: true, email: true },
          assignment: { inApp: true, email: true },
          statusUpdate: { inApp: true, email: false },
          cms: { inApp: true, email: false },
          userManagement: { inApp: true, email: true },
          reminder: { inApp: true, email: true },
          security: { inApp: true, email: true },
        },
        frequency: 'immediate',
      });
      await pref.save();
    }
    return pref;
  },

  /**
   * Update notification preferences for user
   */
  async updateUserPreferences(userId, updateData) {
    let pref = await this.getUserPreferences(userId);

    if (updateData.categories) {
      // Merge categories, preserving security mandatory flags
      pref.categories = {
        ...pref.categories.toObject(),
        ...updateData.categories,
        security: { inApp: true, email: true }, // Cannot be disabled for security audits
      };
    }

    if (updateData.frequency) {
      pref.frequency = updateData.frequency;
    }

    pref.updatedAt = new Date();
    await pref.save();
    return pref;
  },

  /**
   * Verify whether a channel should deliver for category based on user preferences
   */
  async shouldDeliver(userId, category, channel = 'inApp') {
    // Security notifications are non-negotiable
    if (category === 'security') return true;

    try {
      const pref = await this.getUserPreferences(userId);
      const categoryMap = {
        inquiry: 'inquiry',
        cms: 'cms',
        user_management: 'userManagement',
        reminder: 'reminder',
        system: 'inquiry',
      };
      const catKey = categoryMap[category] || 'inquiry';
      const catPref = pref.categories?.[catKey];

      if (!catPref) return true;
      return catPref[channel] !== false;
    } catch {
      return true;
    }
  },
};

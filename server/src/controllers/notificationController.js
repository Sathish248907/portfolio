import { notificationService } from '../services/notificationService.js';
import { EmailLog } from '../models/EmailLog.js';
import { Notification } from '../models/Notification.js';

export const notificationController = {
  /**
   * Admin: Centralized notifications dashboard summary metrics & list
   */
  async getNotifications(req, res, next) {
    try {
      const { category, unreadOnly, search, page = 1, limit = 20 } = req.query;
      const data = await notificationService.getNotificationsForUser(req.user, {
        category,
        unreadOnly,
        search,
        page,
        limit,
      });

      // Aggregate high-level dashboard metrics
      const [totalCount, unreadCount, readCount, failedEmailCount] = await Promise.all([
        Notification.countDocuments({ isArchived: false }),
        notificationService.getUnreadCount(req.user),
        Notification.countDocuments({ isArchived: false, isRead: true }),
        EmailLog.countDocuments({ status: 'failed' }),
      ]);

      res.json({
        success: true,
        data: {
          metrics: {
            total: totalCount,
            unread: unreadCount,
            read: readCount,
            failedEmails: failedEmailCount,
          },
          notifications: data.notifications,
          pagination: data.pagination,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Lightweight endpoint for navbar badge real-time polling
   */
  async getUnreadCount(req, res, next) {
    try {
      const count = await notificationService.getUnreadCount(req.user);
      res.json({
        success: true,
        unreadCount: count,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Mark single notification as read
   */
  async markAsRead(req, res, next) {
    try {
      const notification = await notificationService.markAsRead(req.params.id, req.user);
      if (!notification) {
        return res.status(404).json({ success: false, error: 'Notification not found.' });
      }
      res.json({ success: true, data: notification });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Mark all notifications visible to user as read
   */
  async markAllAsRead(req, res, next) {
    try {
      const result = await notificationService.markAllAsRead(req.user);
      res.json({
        success: true,
        message: 'All notifications marked as read.',
        modifiedCount: result.modifiedCount,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Archive notification
   */
  async archiveNotification(req, res, next) {
    try {
      const notification = await notificationService.archiveNotification(req.params.id, req.user);
      if (!notification) {
        return res.status(404).json({ success: false, error: 'Notification not found.' });
      }
      res.json({ success: true, message: 'Notification archived.' });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Get user's notification preferences
   */
  async getPreferences(req, res, next) {
    try {
      const preferences = await notificationService.getUserPreferences(req.user._id || req.user.id);
      res.json({ success: true, data: preferences });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update user's notification preferences
   */
  async updatePreferences(req, res, next) {
    try {
      const preferences = await notificationService.updateUserPreferences(
        req.user._id || req.user.id,
        req.body
      );
      res.json({
        success: true,
        message: 'Notification preferences updated successfully.',
        data: preferences,
      });
    } catch (err) {
      next(err);
    }
  },
};


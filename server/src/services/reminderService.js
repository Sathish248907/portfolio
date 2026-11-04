import { Reminder } from '../models/Reminder.js';
import { AdminUser } from '../models/AdminUser.js';
import { notificationService } from './notificationService.js';
import { emailService } from './emailService.js';

export const reminderService = {
  /**
   * Create a new inquiry follow-up reminder
   */
  async createReminder(data, currentUser) {
    let assignedUser = null;
    if (data.assignedTo) {
      assignedUser = await AdminUser.findById(data.assignedTo);
    }
    if (!assignedUser) {
      assignedUser = currentUser;
    }

    const reminder = new Reminder({
      ...data,
      assignedTo: assignedUser._id,
      assignedToName: assignedUser.name,
      assignedToEmail: assignedUser.email,
      createdBy: currentUser._id || currentUser.id,
      createdByName: currentUser.name || 'Administrator',
      status: 'pending',
    });

    await reminder.save();

    // Alert assignee of the new scheduled reminder
    await notificationService.createNotification({
      recipientId: assignedUser._id,
      recipientRole: assignedUser.role,
      title: `New Follow-Up Scheduled: ${reminder.title}`,
      message: `Due on ${new Date(reminder.dueAt).toLocaleDateString()} for inquiry ${reminder.inquiryReference || 'lead'}: ${reminder.description || 'Action required'}`,
      category: 'reminder',
      type: reminder.priority === 'urgent' ? 'urgent' : 'info',
      relatedResourceId: reminder._id.toString(),
      relatedResourceType: 'reminder',
      actionUrl: `/admin/reminders`,
    });

    return reminder;
  },

  /**
   * List reminders with tab filtering (all, today, upcoming, overdue, completed)
   */
  async listReminders({
    filter = 'all',
    assignedTo = null,
    search = '',
    page = 1,
    limit = 50,
  } = {}) {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const query = {};

    if (assignedTo && assignedTo !== 'all') {
      query.assignedTo = assignedTo;
    }

    if (filter === 'overdue') {
      query.status = 'pending';
      query.dueAt = { $lt: now };
    } else if (filter === 'today') {
      query.status = 'pending';
      query.dueAt = { $gte: startOfToday, $lte: endOfToday };
    } else if (filter === 'upcoming') {
      query.status = 'pending';
      query.dueAt = { $gt: endOfToday };
    } else if (filter === 'completed') {
      query.status = 'completed';
    }

    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { inquiryReference: searchRegex },
        { clientName: searchRegex },
        { assignedToName: searchRegex },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [
      reminders,
      total,
      allPending,
      completedCount,
    ] = await Promise.all([
      Reminder.find(query).sort({ dueAt: 1 }).skip(skip).limit(parseInt(limit, 10)),
      Reminder.countDocuments(query),
      Reminder.find({ status: 'pending' }, 'dueAt').lean(),
      Reminder.countDocuments({ status: 'completed' }),
    ]);

    let overdueCount = 0;
    let todayCount = 0;
    let upcomingCount = 0;

    allPending.forEach((r) => {
      const d = new Date(r.dueAt);
      if (d < now) {
        overdueCount++;
      } else if (d >= startOfToday && d <= endOfToday) {
        todayCount++;
      } else {
        upcomingCount++;
      }
    });

    return {
      reminders,
      metrics: {
        totalPending: allPending.length,
        todayCount,
        upcomingCount,
        overdueCount,
        completedCount,
      },
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(total / parseInt(limit, 10)),
      },
    };
  },

  /**
   * Mark reminder as completed
   */
  async completeReminder(reminderId, user) {
    const reminder = await Reminder.findById(reminderId);
    if (!reminder) return null;

    reminder.status = 'completed';
    reminder.completedAt = new Date();
    reminder.completedBy = user._id || user.id;
    await reminder.save();

    return reminder;
  },

  /**
   * Update reminder details
   */
  async updateReminder(reminderId, updateData) {
    const reminder = await Reminder.findById(reminderId);
    if (!reminder) return null;

    if (updateData.title) reminder.title = updateData.title;
    if (updateData.description !== undefined) reminder.description = updateData.description;
    if (updateData.dueAt) reminder.dueAt = updateData.dueAt;
    if (updateData.priority) reminder.priority = updateData.priority;
    if (updateData.status) reminder.status = updateData.status;

    if (updateData.assignedTo) {
      const assigned = await AdminUser.findById(updateData.assignedTo);
      if (assigned) {
        reminder.assignedTo = assigned._id;
        reminder.assignedToName = assigned.name;
        reminder.assignedToEmail = assigned.email;
      }
    }

    reminder.updatedAt = new Date();
    await reminder.save();
    return reminder;
  },

  /**
   * Delete reminder
   */
  async deleteReminder(reminderId) {
    return Reminder.findByIdAndDelete(reminderId);
  },

  /**
   * Check for due reminders and dispatch notifications without duplication
   */
  async checkAndDispatchDueReminders() {
    const now = new Date();
    const dueReminders = await Reminder.find({
      status: 'pending',
      dueAt: { $lte: now },
      notificationSent: false,
    });

    const results = [];
    for (const rem of dueReminders) {
      rem.notificationSent = true;
      await rem.save();

      // Dispatch in-app notification
      await notificationService.createNotification({
        recipientId: rem.assignedTo,
        title: `Reminder Due: ${rem.title}`,
        message: `Inquiry follow-up reminder for ${rem.clientName || rem.inquiryReference || 'Lead'}: ${rem.description}`,
        category: 'reminder',
        type: rem.priority === 'urgent' ? 'urgent' : 'warning',
        relatedResourceId: rem._id.toString(),
        relatedResourceType: 'reminder',
        actionUrl: `/admin/reminders`,
      });

      // Dispatch email if assignee has reminder emails enabled
      const shouldEmail = await notificationService.shouldDeliver(rem.assignedTo, 'reminder', 'email');
      if (shouldEmail && rem.assignedToEmail) {
        await emailService.sendEmailWithTemplate({
          templateSlug: 'new_inquiry_admin_alert', // Or general alert
          recipient: rem.assignedToEmail,
          recipientName: rem.assignedToName,
          data: {
            referenceNumber: rem.inquiryReference || 'N/A',
            service: rem.title,
            companyName: rem.clientName || 'Lead',
            clientName: rem.assignedToName,
            email: rem.assignedToEmail,
            phone: '',
            industry: 'Follow-Up Due',
            budgetRange: rem.priority,
            timeline: new Date(rem.dueAt).toLocaleTimeString(),
            dashboardUrl: `${process.env.APP_URL || 'http://localhost:5155'}/admin/reminders`,
          },
          category: 'reminder',
          relatedResourceId: rem._id.toString(),
          relatedResourceType: 'reminder',
          idempotencyKey: `due_reminder_${rem._id.toString()}_${now.toISOString().split('T')[0]}`,
        }).catch((err) => console.warn('[REMINDER EMAIL WARNING]:', err.message));
      }

      results.push(rem._id);
    }

    return results;
  },
};


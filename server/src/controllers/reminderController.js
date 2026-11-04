import { reminderService } from '../services/reminderService.js';

export const reminderController = {
  /**
   * Admin: List reminders with filter tabs (all, today, upcoming, overdue, completed)
   */
  async list(req, res, next) {
    try {
      const { filter, assignedTo, search, page = 1, limit = 50 } = req.query;
      const data = await reminderService.listReminders({
        filter,
        assignedTo,
        search,
        page,
        limit,
      });

      res.json({
        success: true,
        data: {
          reminders: data.reminders,
          metrics: data.metrics,
          pagination: data.pagination,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Create a new follow-up reminder
   */
  async create(req, res, next) {
    try {
      const { title, dueAt } = req.body;
      if (!title || !dueAt) {
        return res.status(400).json({
          success: false,
          error: 'Title and due date/time are required.',
        });
      }

      const reminder = await reminderService.createReminder(req.body, req.user);
      res.status(201).json({
        success: true,
        message: 'Follow-up reminder scheduled successfully.',
        data: reminder,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Mark reminder as completed
   */
  async complete(req, res, next) {
    try {
      const reminder = await reminderService.completeReminder(req.params.id, req.user);
      if (!reminder) {
        return res.status(404).json({ success: false, error: 'Reminder not found.' });
      }

      res.json({
        success: true,
        message: 'Reminder marked as completed.',
        data: reminder,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update reminder
   */
  async update(req, res, next) {
    try {
      const reminder = await reminderService.updateReminder(req.params.id, req.body);
      if (!reminder) {
        return res.status(404).json({ success: false, error: 'Reminder not found.' });
      }

      res.json({
        success: true,
        message: 'Reminder updated successfully.',
        data: reminder,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Delete reminder
   */
  async delete(req, res, next) {
    try {
      const reminder = await reminderService.deleteReminder(req.params.id);
      if (!reminder) {
        return res.status(404).json({ success: false, error: 'Reminder not found.' });
      }

      res.json({
        success: true,
        message: 'Reminder deleted successfully.',
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin / Cron: Trigger due reminder notifications
   */
  async checkDue(req, res, next) {
    try {
      const dispatchedIds = await reminderService.checkAndDispatchDueReminders();
      res.json({
        success: true,
        dispatchedCount: dispatchedIds.length,
        dispatchedIds,
      });
    } catch (err) {
      next(err);
    }
  },
};


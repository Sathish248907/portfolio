import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { notificationController } from '../../controllers/notificationController.js';
import { emailController } from '../../controllers/emailController.js';
import { reminderController } from '../../controllers/reminderController.js';

const router = Router();

// All notification & communication routes require active administrative session
router.use(requireAuth);

// ==========================================
// 1. IN-APP NOTIFICATIONS & PREFERENCES
// ==========================================
router.get('/notifications', notificationController.getNotifications);
router.get('/notifications/unread-count', notificationController.getUnreadCount);
router.patch('/notifications/:id/read', notificationController.markAsRead);
router.post('/notifications/read-all', notificationController.markAllAsRead);
router.delete('/notifications/:id', notificationController.archiveNotification);
router.get('/notifications/preferences', notificationController.getPreferences);
router.put('/notifications/preferences', notificationController.updatePreferences);

// ==========================================
// 2. EMAIL LOGS & TEMPLATE MANAGEMENT
// ==========================================
router.get('/emails/logs', emailController.getEmailLogs);
router.post('/emails/logs/:id/retry', emailController.retryEmail);
router.get('/emails/templates', emailController.getTemplates);
router.get('/emails/templates/:idOrSlug', emailController.getTemplate);
router.put('/emails/templates/:idOrSlug', emailController.updateTemplate);
router.post('/emails/templates/:idOrSlug/preview', emailController.previewTemplate);
router.post('/emails/test', emailController.sendTestEmail);

// ==========================================
// 3. SCHEDULED REMINDERS & LEAD FOLLOW-UPS
// ==========================================
router.get('/reminders', reminderController.list);
router.post('/reminders', reminderController.create);
router.patch('/reminders/:id/complete', reminderController.complete);
router.put('/reminders/:id', reminderController.update);
router.delete('/reminders/:id', reminderController.delete);
router.post('/reminders/check-due', reminderController.checkDue);

export default router;

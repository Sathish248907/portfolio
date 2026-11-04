import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import { seedInitialData } from '../src/services/seedService.js';
import { AdminUser } from '../src/models/AdminUser.js';
import { Notification } from '../src/models/Notification.js';
import { EmailLog } from '../src/models/EmailLog.js';
import { Reminder } from '../src/models/Reminder.js';
import { automationService } from '../src/services/automationService.js';

let mongoServer;
let superadminToken = '';
let superadminUser = null;

describe('Phase 11 — Notifications, Email Automation & Communication Management', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    await seedInitialData();

    // Authenticate Superadmin
    const res = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({ email: 'admin@peacehaven.tech', password: 'PeaceHavenAdmin2026!' });

    superadminToken = res.body.data.token;
    superadminUser = await AdminUser.findOne({ email: 'admin@peacehaven.tech' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  describe('1. In-App Notifications & Alert Center', () => {
    it('retrieves paginated notifications and unread metrics for authenticated admin', async () => {
      const res = await request(app)
        .get('/api/v1/admin/notifications')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('metrics');
      expect(res.body.data.metrics).toHaveProperty('total');
      expect(res.body.data.metrics).toHaveProperty('unread');
      expect(Array.isArray(res.body.data.notifications)).toBe(true);
    });

    it('returns fast unread count for navbar badge polling', async () => {
      const res = await request(app)
        .get('/api/v1/admin/notifications/unread-count')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.unreadCount).toBe('number');
    });

    it('marks a single notification as read', async () => {
      const notif = await Notification.create({
        recipientRole: 'superadmin',
        title: 'Single Read Test',
        message: 'Testing markAsRead functionality',
        category: 'system',
        isRead: false,
      });

      const res = await request(app)
        .patch(`/api/v1/admin/notifications/${notif._id}/read`)
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.isRead).toBe(true);
      expect(res.body.data.readAt).toBeTruthy();
    });

    it('marks all visible notifications as read', async () => {
      const res = await request(app)
        .post('/api/v1/admin/notifications/read-all')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('modifiedCount');
    });

    it('archives notification cleanly', async () => {
      const notif = await Notification.create({
        recipientRole: 'superadmin',
        title: 'Archive Test',
        message: 'Testing archiving',
        category: 'system',
      });

      const res = await request(app)
        .delete(`/api/v1/admin/notifications/${notif._id}`)
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toContain('archived');

      const refreshed = await Notification.findById(notif._id);
      expect(refreshed.isArchived).toBe(true);
    });
  });

  describe('2. Email Template Management & Preview', () => {
    it('lists all 10 core email templates with categories and variables', async () => {
      const res = await request(app)
        .get('/api/v1/admin/emails/templates')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(10);

      const clientConfirm = res.body.data.find(
        (t) => t.slug === 'client_inquiry_confirmation'
      );
      expect(clientConfirm).toBeTruthy();
      expect(clientConfirm.name).toBe('Client Inquiry Confirmation');
      expect(clientConfirm.variables).toContain('referenceNumber');
    });

    it('previews compiled email template with test dynamic placeholders', async () => {
      const res = await request(app)
        .post('/api/v1/admin/emails/templates/client_inquiry_confirmation/preview')
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          data: {
            clientName: 'Dr. Gregory House',
            referenceNumber: 'PH-TEST-007',
            service: 'Healthcare Solutions',
            companyName: 'Princeton Diagnostics',
            budgetRange: '$250,000+',
            timeline: '6 months',
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.data.subject).toContain('PH-TEST-007');
      expect(res.body.data.html).toContain('Dr. Gregory House');
      expect(res.body.data.html).toContain('Princeton Diagnostics');
      expect(res.body.data.html).toContain('#17232B'); // Peace Haven brand palette
    });

    it('updates email template subject and content', async () => {
      const res = await request(app)
        .put('/api/v1/admin/emails/templates/security_alert')
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          subject: '[URGENT SECURITY NOTICE] {{eventTitle}}',
          isActive: true,
        });

      expect(res.status).toBe(200);
      expect(res.body.data.subject).toBe('[URGENT SECURITY NOTICE] {{eventTitle}}');
    });
  });

  describe('3. Email Logs & Reliability', () => {
    it('retrieves paginated email logs with status metrics', async () => {
      const res = await request(app)
        .get('/api/v1/admin/emails/logs')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('metrics');
      expect(Array.isArray(res.body.data.logs)).toBe(true);
    });

    it('dispatches test email to authorized test recipient without throwing', async () => {
      const res = await request(app)
        .post('/api/v1/admin/emails/test')
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          recipient: 'tester@peacehaven.tech',
          templateSlug: 'client_inquiry_confirmation',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.recipient).toBe('tester@peacehaven.tech');
      expect(res.body.data.status).toBe('sent');
    });

    it('retries a failed email record and updates status', async () => {
      const failedLog = await EmailLog.create({
        recipient: 'retry.target@peacehaven.tech',
        subject: 'Retry Test Subject',
        status: 'failed',
        failureReason: 'Connection timeout',
        payloadSnapshot: { html: '<p>Retry Content</p>', text: 'Retry Content' },
      });

      const res = await request(app)
        .post(`/api/v1/admin/emails/logs/${failedLog._id}/retry`)
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('sent');
      expect(res.body.data.attemptCount).toBe(2);
    });
  });

  describe('4. Scheduled Inquiry Reminders & Follow-Ups', () => {
    let createdReminderId = '';

    it('creates a new inquiry follow-up reminder and dispatches in-app alert to assignee', async () => {
      const res = await request(app)
        .post('/api/v1/admin/reminders')
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          title: 'Review CAD files with Apex Robotics',
          description: 'Evaluate EB-300 robotic arm joint tolerances',
          inquiryReference: 'PH-APEX-01',
          clientName: 'Marcus Vance',
          assignedTo: superadminUser._id,
          dueAt: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
          priority: 'urgent',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe('Review CAD files with Apex Robotics');
      expect(res.body.data.status).toBe('pending');
      createdReminderId = res.body.data._id;

      // Verify assignee received an in-app alert
      const notif = await Notification.findOne({
        relatedResourceId: createdReminderId,
        category: 'reminder',
      });
      expect(notif).toBeTruthy();
    });

    it('lists reminders with metric counters for today, upcoming, overdue, and completed', async () => {
      const res = await request(app)
        .get('/api/v1/admin/reminders')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('metrics');
      expect(res.body.data.metrics).toHaveProperty('todayCount');
      expect(res.body.data.metrics).toHaveProperty('upcomingCount');
      expect(res.body.data.metrics).toHaveProperty('overdueCount');
    });

    it('marks a reminder as completed', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/reminders/${createdReminderId}/complete`)
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('completed');
      expect(res.body.data.completedAt).toBeTruthy();
    });

    it('checks due reminders and executes notification dispatch', async () => {
      // Create an overdue reminder
      const overdue = await Reminder.create({
        title: 'Overdue Automated Test Reminder',
        description: 'Should trigger due check',
        dueAt: new Date(Date.now() - 3600 * 1000),
        status: 'pending',
        assignedTo: superadminUser._id,
        assignedToName: superadminUser.name,
        assignedToEmail: superadminUser.email,
        createdBy: superadminUser._id,
        notificationSent: false,
      });

      const res = await request(app)
        .post('/api/v1/admin/reminders/check-due')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.dispatchedCount).toBeGreaterThanOrEqual(1);

      const refreshed = await Reminder.findById(overdue._id);
      expect(refreshed.notificationSent).toBe(true);
    });
  });

  describe('5. Notification Preferences', () => {
    it('retrieves user notification preferences', async () => {
      const res = await request(app)
        .get('/api/v1/admin/notifications/preferences')
        .set('Authorization', `Bearer ${superadminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('categories');
      expect(res.body.data.categories).toHaveProperty('inquiry');
      expect(res.body.data.categories).toHaveProperty('security');
    });

    it('updates user notification preferences while enforcing security notifications', async () => {
      const res = await request(app)
        .put('/api/v1/admin/notifications/preferences')
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          categories: {
            inquiry: { inApp: true, email: false },
            security: { inApp: false, email: false }, // Should be overridden to true for security audits
          },
          frequency: 'daily_digest',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.categories.inquiry.email).toBe(false);
      expect(res.body.data.categories.security.inApp).toBe(true); // Mandatory
      expect(res.body.data.categories.security.email).toBe(true); // Mandatory
      expect(res.body.data.frequency).toBe('daily_digest');
    });
  });

  describe('6. Automation Event Integration', () => {
    it('dispatches client confirmation, admin alert, and in-app notification when inquiry is created', async () => {
      const testInquiry = {
        _id: '507f1f77bcf86cd799439011',
        referenceNumber: 'PH-AUTO-TEST-8819',
        clientName: 'Sir Arthur Conan Doyle',
        email: 'arthur@bakerstreet.co.uk',
        companyName: 'Strand Magazine Corp',
        service: 'Web Development',
        budgetRange: '$50,000 - $100,000',
        timeline: '3 months',
        industry: 'Information Technology & Software',
      };

      await automationService.emitEvent('INQUIRY_CREATED', { inquiry: testInquiry });

      // Verify EmailLog created for client
      const clientEmail = await EmailLog.findOne({
        idempotencyKey: `inquiry_confirm_${testInquiry.referenceNumber}`,
      });
      expect(clientEmail).toBeTruthy();
      expect(clientEmail.recipient).toBe('arthur@bakerstreet.co.uk');
      expect(clientEmail.status).toBe('sent');

      // Verify in-app notification created
      const notif = await Notification.findOne({
        relatedResourceId: testInquiry.referenceNumber,
      });
      expect(notif).toBeTruthy();
      expect(notif.category).toBe('inquiry');
    });
  });
});

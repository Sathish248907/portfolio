import nodemailer from 'nodemailer';
import { config } from '../config/env.js';
import { EmailLog } from '../models/EmailLog.js';
import { emailTemplateService } from './emailTemplateService.js';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    if (config.smtp.user && config.smtp.pass) {
      transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.port === 465,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass,
        },
      });
    } else {
      // Simulated transport for zero-dependency local development and Vitest tests
      transporter = {
        sendMail: async (options) => {
          console.log(`[Email Simulation] To: ${options.to} | Subject: "${options.subject}"`);
          return { messageId: `simulated-${Date.now()}-${Math.floor(Math.random() * 10000)}` };
        },
      };
    }
  }
  return transporter;
}

export const emailService = {
  /**
   * Centralized sender that logs to EmailLog, checks idempotency, and delivers mail
   */
  async sendEmailWithTemplate({
    templateSlug,
    recipient,
    recipientName = '',
    data = {},
    category = 'general',
    relatedResourceId = null,
    relatedResourceType = null,
    idempotencyKey = null,
  }) {
    // 1. Idempotency Check
    if (idempotencyKey) {
      const existing = await EmailLog.findOne({ idempotencyKey, status: 'sent' });
      if (existing) {
        console.log(`[Email Idempotency] Skipping duplicate send for key: ${idempotencyKey}`);
        return existing;
      }
    }

    // 2. Render Template
    const rendered = await emailTemplateService.renderTemplateBySlug(templateSlug, data);

    // 3. Create or find EmailLog record
    let logRecord = null;
    if (idempotencyKey) {
      logRecord = await EmailLog.findOne({ idempotencyKey });
    }

    if (!logRecord) {
      logRecord = new EmailLog({
        recipient,
        recipientName,
        subject: rendered.subject,
        templateId: rendered.template?._id?.toString() || templateSlug,
        templateName: rendered.template?.name || templateSlug,
        category,
        relatedResourceId,
        relatedResourceType,
        idempotencyKey: idempotencyKey || `email_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        status: 'processing',
        payloadSnapshot: data,
        attemptCount: 1,
        lastAttemptAt: new Date(),
      });
      await logRecord.save();
    } else {
      logRecord.attemptCount += 1;
      logRecord.lastAttemptAt = new Date();
      logRecord.status = 'processing';
      await logRecord.save();
    }

    // 4. Dispatch Email via Transporter
    try {
      const mailer = getTransporter();
      const info = await mailer.sendMail({
        from: config.smtp.from,
        to: recipient,
        subject: rendered.subject,
        text: rendered.text,
        html: rendered.html,
      });

      logRecord.status = 'sent';
      logRecord.sentAt = new Date();
      logRecord.providerMessageId = info.messageId || `msg_${Date.now()}`;
      logRecord.failureReason = null;
      await logRecord.save();

      console.log(`[Email Dispatched] To: ${recipient} | Subject: "${rendered.subject}"`);
      return logRecord;
    } catch (err) {
      logRecord.status = 'failed';
      logRecord.failureReason = err.message || 'Unknown SMTP Delivery Failure';
      await logRecord.save();

      console.error(`[Email Failed] To: ${recipient} | Error: ${err.message}`);
      return logRecord;
    }
  },

  /**
   * Safe retry mechanism for failed emails
   */
  async retryFailedEmail(logId) {
    const log = await EmailLog.findById(logId);
    if (!log) {
      throw new Error('Email log entry not found.');
    }

    if (log.status === 'sent') {
      return log; // Already sent, do not re-send
    }

    log.status = 'retrying';
    log.attemptCount += 1;
    log.lastAttemptAt = new Date();
    await log.save();

    try {
      const mailer = getTransporter();
      const info = await mailer.sendMail({
        from: config.smtp.from,
        to: log.recipient,
        subject: log.subject,
        text: log.payloadSnapshot?.text || `Resent message regarding: ${log.subject}`,
        html: log.payloadSnapshot?.html || `<p>${log.subject}</p>`,
      });

      log.status = 'sent';
      log.sentAt = new Date();
      log.providerMessageId = info.messageId || `retry_${Date.now()}`;
      log.failureReason = null;
      await log.save();

      return log;
    } catch (err) {
      log.status = 'failed';
      log.failureReason = err.message;
      await log.save();
      return log;
    }
  },

  /**
   * Client confirmation email when submitting inquiry
   */
  async sendClientInquiryConfirmation(inquiry) {
    const idempotencyKey = `inquiry_confirm_${inquiry.referenceNumber || inquiry._id}`;
    return this.sendEmailWithTemplate({
      templateSlug: 'client_inquiry_confirmation',
      recipient: inquiry.email,
      recipientName: inquiry.clientName,
      data: {
        clientName: inquiry.clientName,
        referenceNumber: inquiry.referenceNumber,
        service: inquiry.service || (inquiry.selectedServices && inquiry.selectedServices[0]) || 'Web Development',
        companyName: inquiry.companyName,
        budgetRange: inquiry.budgetRange,
        timeline: inquiry.timeline,
        contactEmail: config.smtp.notificationEmail,
      },
      category: 'inquiry_client',
      relatedResourceId: inquiry.referenceNumber || inquiry._id?.toString(),
      relatedResourceType: 'inquiry',
      idempotencyKey,
    });
  },

  /**
   * Admin alert email when new inquiry is ingested
   */
  async notifyTeamOfInquiry(inquiry) {
    const idempotencyKey = `inquiry_team_alert_${inquiry.referenceNumber || inquiry._id}`;
    const dashboardUrl = `${process.env.APP_URL || 'http://localhost:5155'}/admin/inquiries?search=${inquiry.referenceNumber}`;
    return this.sendEmailWithTemplate({
      templateSlug: 'new_inquiry_admin_alert',
      recipient: config.smtp.notificationEmail,
      recipientName: 'Peace Haven Lead Triage Team',
      data: {
        referenceNumber: inquiry.referenceNumber,
        service: inquiry.service || (inquiry.selectedServices && inquiry.selectedServices[0]) || 'Engineering Discipline',
        companyName: inquiry.companyName,
        clientName: inquiry.clientName,
        email: inquiry.email,
        phone: inquiry.phoneNumber || 'N/A',
        industry: inquiry.industry || 'Technology',
        budgetRange: inquiry.budgetRange,
        timeline: inquiry.timeline,
        dashboardUrl,
      },
      category: 'inquiry_admin',
      relatedResourceId: inquiry.referenceNumber || inquiry._id?.toString(),
      relatedResourceType: 'inquiry',
      idempotencyKey,
    });
  },

  /**
   * Optional client email on inquiry status change
   */
  async sendInquiryStatusUpdate({ inquiry, newStatus, statusDescription, notes }) {
    const idempotencyKey = `status_update_${inquiry.referenceNumber}_${newStatus}_${Date.now()}`;
    return this.sendEmailWithTemplate({
      templateSlug: 'inquiry_status_update',
      recipient: inquiry.email,
      recipientName: inquiry.clientName,
      data: {
        clientName: inquiry.clientName,
        referenceNumber: inquiry.referenceNumber,
        newStatus,
        statusDescription: statusDescription || `Your inquiry status is now: ${newStatus}`,
        notes: notes || 'Our engineering team is actively working on your scoping requirements.',
        service: inquiry.service || 'Technology Services',
      },
      category: 'status_update',
      relatedResourceId: inquiry.referenceNumber,
      relatedResourceType: 'inquiry',
      idempotencyKey,
    });
  },

  /**
   * Send Administrator Invitation Email with secure single-use token
   */
  async sendAdminInvitation({ email, name, role, token, expiresAt, invitedByName }) {
    const inviteUrl = `${process.env.APP_URL || 'http://localhost:5155'}/admin/accept-invitation?token=${token}`;
    const idempotencyKey = `invite_${email}_${token.substring(0, 10)}`;

    return this.sendEmailWithTemplate({
      templateSlug: 'admin_invitation',
      recipient: email,
      recipientName: name || 'Administrator',
      data: {
        name: name || 'Staff Member',
        role,
        inviteUrl,
        expiresAt: new Date(expiresAt).toUTCString(),
        invitedBy: invitedByName || 'Executive Technical Lead',
      },
      category: 'invitation',
      relatedResourceId: email,
      relatedResourceType: 'user',
      idempotencyKey,
    });
  },

  /**
   * Security alert sent to superadmins on account lockouts
   */
  async sendSecurityAlert({ eventTitle, accountEmail, ipAddress, details, actionRequired }) {
    const idempotencyKey = `sec_alert_${accountEmail}_${Date.now()}`;
    return this.sendEmailWithTemplate({
      templateSlug: 'security_alert',
      recipient: config.smtp.notificationEmail,
      recipientName: 'Security Operations',
      data: {
        eventTitle,
        accountEmail,
        ipAddress: ipAddress || 'Unknown IP',
        timestamp: new Date().toISOString(),
        details,
        actionRequired: actionRequired || 'Review admin audit logs and investigate IP address origin.',
      },
      category: 'security',
      relatedResourceId: accountEmail,
      relatedResourceType: 'security',
      idempotencyKey,
    });
  },

  /**
   * Send test email to authorized test recipients
   */
  async sendTestEmail({ recipient, templateSlug = 'client_inquiry_confirmation', sampleData = {} }) {
    const testData = {
      clientName: 'Alexander Hayes',
      referenceNumber: 'PH-TEST-9921',
      service: 'Robotics & Automation',
      companyName: 'Apex Robotics Labs',
      budgetRange: '$100,000 - $250,000',
      timeline: '3 to 6 months',
      contactEmail: config.smtp.notificationEmail,
      ...sampleData,
    };

    return this.sendEmailWithTemplate({
      templateSlug,
      recipient,
      recipientName: 'Authorized Admin Tester',
      data: testData,
      category: 'test',
      relatedResourceId: 'test_preview',
      relatedResourceType: 'system',
    });
  },
};

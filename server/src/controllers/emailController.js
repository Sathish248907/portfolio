import { EmailLog } from '../models/EmailLog.js';
import { EmailTemplate } from '../models/EmailTemplate.js';
import { emailService } from '../services/emailService.js';
import { emailTemplateService } from '../services/emailTemplateService.js';

export const emailController = {
  /**
   * Admin: List paginated email delivery logs
   */
  async getEmailLogs(req, res, next) {
    try {
      const { status, category, search, page = 1, limit = 20 } = req.query;
      const query = {};

      if (status && status !== 'all') {
        query.status = status;
      }
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search && search.trim()) {
        const searchRegex = { $regex: search.trim(), $options: 'i' };
        query.$or = [
          { recipient: searchRegex },
          { subject: searchRegex },
          { templateName: searchRegex },
          { relatedResourceId: searchRegex },
        ];
      }

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const [logs, total, statusCounts] = await Promise.all([
        EmailLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)),
        EmailLog.countDocuments(query),
        EmailLog.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),
      ]);

      const counts = {
        sent: 0,
        failed: 0,
        processing: 0,
        retrying: 0,
        pending: 0,
      };
      statusCounts.forEach((s) => {
        if (counts[s._id] !== undefined) counts[s._id] = s.count;
      });

      res.json({
        success: true,
        data: {
          logs,
          metrics: counts,
          pagination: {
            total,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            totalPages: Math.ceil(total / parseInt(limit, 10)),
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Retry failed email delivery
   */
  async retryEmail(req, res, next) {
    try {
      const log = await emailService.retryFailedEmail(req.params.id);
      res.json({
        success: true,
        message: log.status === 'sent' ? 'Email delivered successfully.' : 'Email retry attempted.',
        data: log,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: List all available email templates
   */
  async getTemplates(req, res, next) {
    try {
      await emailTemplateService.ensureDefaultTemplates();
      const templates = await EmailTemplate.find().sort({ category: 1, name: 1 });
      res.json({
        success: true,
        data: templates,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Get single email template
   */
  async getTemplate(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const template = await EmailTemplate.findOne({
        $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
      });

      if (!template) {
        return res.status(404).json({ success: false, error: 'Email template not found.' });
      }

      res.json({ success: true, data: template });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update email template
   */
  async updateTemplate(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const { subject, htmlContent, textContent, isActive } = req.body;

      const template = await EmailTemplate.findOne({
        $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
      });

      if (!template) {
        return res.status(404).json({ success: false, error: 'Email template not found.' });
      }

      if (subject) template.subject = subject;
      if (htmlContent) template.htmlContent = htmlContent;
      if (textContent) template.textContent = textContent;
      if (isActive !== undefined) template.isActive = isActive;
      template.updatedAt = new Date();

      await template.save();

      res.json({
        success: true,
        message: `Template '${template.name}' updated successfully.`,
        data: template,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Preview compiled email template with test variables
   */
  async previewTemplate(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const sampleData = req.body?.data || {
        clientName: 'Alexander Hayes',
        referenceNumber: 'PH-TEST-9921',
        service: 'Robotics & Automation',
        companyName: 'Apex Robotics Labs',
        budgetRange: '$100,000 - $250,000',
        timeline: '3 to 6 months',
        contactEmail: 'inquiries@peacehaven.tech',
        newStatus: 'QUALIFIED',
        statusDescription: 'Technical scoping phase approved by senior engineering panel.',
        notes: 'Prototype CAD schematics undergoing compatibility review.',
        name: 'Sarah Jenkins',
        role: 'editor',
        inviteUrl: 'http://localhost:5155/admin/accept-invitation?token=test-token-xyz',
        expiresAt: new Date(Date.now() + 48 * 3600 * 1000).toUTCString(),
        invitedBy: 'Executive Technical Lead',
        resetUrl: 'http://localhost:5155/admin/reset-password?token=test-token-xyz',
        expiresIn: '60 minutes',
        ipAddress: '198.51.100.42',
        title: 'EB-300 Autonomous Mobile Fleet Case Study',
        contentType: 'Case Study',
        submittedBy: 'David Okafor',
        reviewUrl: 'http://localhost:5155/admin/cms',
        publicUrl: 'http://localhost:5155/portfolio/eb-300-robotic-arm',
        eventTitle: 'Account Lockout Enforced',
        accountEmail: 'admin@peacehaven.tech',
        timestamp: new Date().toISOString(),
        details: '5 consecutive invalid credentials detected within 60 seconds.',
        actionRequired: 'Verify authenticity of requesting operator.',
      };

      const rendered = await emailTemplateService.renderTemplateBySlug(idOrSlug, sampleData);

      res.json({
        success: true,
        data: {
          subject: rendered.subject,
          html: rendered.html,
          text: rendered.text,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Dispatch test email
   */
  async sendTestEmail(req, res, next) {
    try {
      const { recipient, templateSlug, sampleData } = req.body;
      if (!recipient) {
        return res.status(400).json({ success: false, error: 'Recipient email is required.' });
      }

      const log = await emailService.sendTestEmail({
        recipient,
        templateSlug: templateSlug || 'client_inquiry_confirmation',
        sampleData,
      });

      res.json({
        success: true,
        message: `Test email dispatched to ${recipient}.`,
        data: log,
      });
    } catch (err) {
      next(err);
    }
  },
};

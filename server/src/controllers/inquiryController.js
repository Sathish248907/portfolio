import { inquirySchema, statusUpdateSchema, noteSchema, clientEmailSchema } from '../validators/inquiryValidator.js';
import { inquiryService } from '../services/inquiryService.js';
import { inquiryCommunicationService } from '../services/inquiryCommunicationService.js';

export const inquiryController = {
  /**
   * Public: Submit a project inquiry from multi-step form (Phase 6)
   */
  async submit(req, res, next) {
    try {
      const validatedData = inquirySchema.parse(req.body);
      const newInquiry = await inquiryService.submitInquiry(validatedData);

      res.status(201).json({
        success: true,
        message: 'Project inquiry registered successfully.',
        data: newInquiry,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: List all inquiries with metrics, filtering, search, and pagination
   */
  async list(req, res, next) {
    try {
      const result = await inquiryService.listInquiries(req.query);

      res.json({
        success: true,
        data: result.inquiries,
        metrics: result.metrics,
        pagination: result.pagination,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Get inquiry by ID or reference number
   */
  async getById(req, res, next) {
    try {
      const inquiry = await inquiryService.getInquiryById(req.params.id);

      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry record not found.' });
      }

      res.json({ success: true, data: inquiry });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update lead status, assigned team member & internal notes
   */
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = statusUpdateSchema.parse(req.body);

      const inquiry = await inquiryService.updateInquiryStatus(id, updateData, req.user);

      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry record not found.' });
      }

      res.json({
        success: true,
        message: 'Inquiry updated successfully.',
        data: inquiry,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Add internal note to an inquiry
   */
  async addNote(req, res, next) {
    try {
      const { id } = req.params;
      const noteData = noteSchema.parse(req.body);

      const result = await inquiryService.addInquiryNote(id, noteData, req.user);

      if (!result) {
        return res.status(404).json({ success: false, error: 'Inquiry record not found.' });
      }

      res.status(201).json({
        success: true,
        message: 'Internal note recorded.',
        data: result.newNote,
        inquiry: result.inquiry,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Export all inquiries to CSV
   */
  async exportCsv(req, res, next) {
    try {
      const csvContent = await inquiryService.generateInquiryCsv();

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="peace-haven-inquiries-${Date.now()}.csv"`
      );
      res.status(200).send(csvContent);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Send a direct email to client and log in communication history
   */
  async sendClientEmail(req, res, next) {
    try {
      const { id } = req.params;
      const validatedEmailData = clientEmailSchema.parse(req.body);

      const result = await inquiryCommunicationService.sendClientEmail(
        id,
        validatedEmailData,
        req.user
      );

      res.status(200).json({
        success: true,
        message: 'Client communication dispatched successfully.',
        data: result.communication,
        deliveryStatus: result.deliveryStatus,
        inquiry: result.inquiry,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Get client communication history for an inquiry
   */
  async getCommunicationHistory(req, res, next) {
    try {
      const { id } = req.params;
      const result = await inquiryCommunicationService.getCommunicationHistory(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Get available client communication templates
   */
  async getCommunicationTemplates(req, res, next) {
    try {
      const templates = inquiryCommunicationService.getTemplates();
      res.status(200).json({
        success: true,
        data: templates,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update lead priority
   */
  async updatePriority(req, res, next) {
    try {
      const { id } = req.params;
      const { priority } = req.body;
      if (!['low', 'medium', 'high', 'urgent'].includes(priority)) {
        return res.status(400).json({ success: false, error: 'Invalid priority level.' });
      }

      const inquiry = await inquiryService.updateInquiryPriority(id, priority, req.user);
      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry not found.' });
      }

      res.json({
        success: true,
        message: `Priority set to ${priority}.`,
        data: inquiry,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Delete an inquiry
   */
  async deleteInquiry(req, res, next) {
    try {
      const inquiry = await inquiryService.deleteInquiry(req.params.id);

      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry not found.' });
      }

      res.json({
        success: true,
        message: `Inquiry ${inquiry.referenceNumber} has been deleted.`,
      });
    } catch (err) {
      next(err);
    }
  },
};

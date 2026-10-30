import { Inquiry } from '../models/Inquiry.js';
import { inquirySchema, statusUpdateSchema } from '../validators/inquiryValidator.js';
import { emailService } from '../services/emailService.js';

export const inquiryController = {
  /**
   * Public: Submit a project inquiry from multi-step form
   */
  async submit(req, res, next) {
    try {
      const validatedData = inquirySchema.parse(req.body);

      // Generate verifiable reference number: PH-[BASE36_TIME]-[RANDOM_4_DIGITS]
      const referenceNumber = `PH-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newInquiry = new Inquiry({
        ...validatedData,
        referenceNumber,
        status: 'New',
        auditHistory: [
          {
            action: 'CREATED',
            changedBy: 'client_intake',
            previousStatus: null,
            newStatus: 'New',
            notes: 'Initial submission through public intake flow',
          },
        ],
      });

      // 1. Persist in MongoDB FIRST (critical requirement)
      await newInquiry.save();

      // 2. Dispatches notifications (handled safely without losing inquiry if email fails)
      await Promise.all([
        emailService.sendClientInquiryConfirmation(newInquiry),
        emailService.notifyTeamOfInquiry(newInquiry),
      ]);

      res.status(201).json({
        success: true,
        message: 'Project inquiry registered successfully.',
        data: {
          referenceNumber: newInquiry.referenceNumber,
          service: newInquiry.service,
          companyName: newInquiry.companyName,
          status: newInquiry.status,
          createdAt: newInquiry.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: List all inquiries with status/service filtering, search, and pagination
   */
  async list(req, res, next) {
    try {
      const { status, service, search, page = 1, limit = 50 } = req.query;
      const query = {};

      if (status && status !== 'All') {
        query.status = status;
      }

      if (service && service !== 'All') {
        query.service = service;
      }

      if (search) {
        query.$or = [
          { referenceNumber: { $regex: search, $options: 'i' } },
          { clientName: { $regex: search, $options: 'i' } },
          { companyName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const [inquiries, total] = await Promise.all([
        Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)),
        Inquiry.countDocuments(query),
      ]);

      res.json({
        success: true,
        data: inquiries,
        pagination: {
          total,
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          pages: Math.ceil(total / parseInt(limit, 10)),
        },
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
      const { id } = req.params;
      const inquiry = await Inquiry.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { referenceNumber: id }],
      });

      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry record not found.' });
      }

      res.json({ success: true, data: inquiry });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update lead status & add internal notes with full audit logging
   */
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, notes } = statusUpdateSchema.parse(req.body);

      const inquiry = await Inquiry.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { referenceNumber: id }],
      });

      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry record not found.' });
      }

      const prevStatus = inquiry.status;
      inquiry.status = status;
      if (notes !== undefined) {
        inquiry.notes = notes;
      }

      // Record in immutable audit trail
      inquiry.auditHistory.push({
        action: 'STATUS_UPDATE',
        changedBy: req.user?.email || 'admin',
        previousStatus: prevStatus,
        newStatus: status,
        notes: notes || '',
        timestamp: new Date(),
      });

      await inquiry.save();

      res.json({
        success: true,
        message: `Inquiry status updated from '${prevStatus}' to '${status}'.`,
        data: inquiry,
      });
    } catch (err) {
      next(err);
    }
  },
};

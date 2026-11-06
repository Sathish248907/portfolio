import { Inquiry } from '../models/Inquiry.js';
import { automationService } from './automationService.js';

export function normalizeAssigned(assignedTo, disciplines = []) {
  if (!assignedTo || !assignedTo.name || assignedTo.name === 'Unassigned') {
    return { name: 'Unassigned', email: '', role: 'None' };
  }
  const n = assignedTo.name.trim();
  if (n.includes('Alex Rivera') || n.includes('Marcus Sterling')) {
    if (Array.isArray(disciplines) && disciplines.some((d) => /fintech/i.test(d))) {
      return { name: 'PH Hari', email: 'phhari@peacehaven.tech', role: 'FinTech Principal' };
    }
    if (Array.isArray(disciplines) && disciplines.some((d) => /web/i.test(d))) {
      return { name: 'Sathish', email: 'sathish@peacehaven.tech', role: 'Web Development Lead' };
    }
    return { name: 'Unassigned', email: '', role: 'None' };
  }
  if (n.includes('Maya Chen')) {
    return { name: 'PH Hari', email: 'phhari@peacehaven.tech', role: 'FinTech Principal' };
  }
  if (n.includes('David Kim')) {
    return { name: 'Dhanush', email: 'dhanush@peacehaven.tech', role: 'Robotics & Automation Lead' };
  }
  if (n.includes('Sarah Vance')) {
    return { name: 'Swarna', email: 'swarna@peacehaven.tech', role: 'Healthcare Systems Architect' };
  }
  if (n.includes('Sathish & Vishal')) {
    return { name: 'Sathish', email: 'sathish@peacehaven.tech', role: 'Web Development Lead' };
  }
  if (n.includes('Dhanush & Albin')) {
    return { name: 'Dhanush', email: 'dhanush@peacehaven.tech', role: 'Robotics & Automation Lead' };
  }
  if (n.includes('Swarna & Shyam')) {
    return { name: 'Swarna', email: 'swarna@peacehaven.tech', role: 'Healthcare Systems Architect' };
  }
  return assignedTo;
}

export const inquiryService = {
  /**
   * Submit and persist project inquiry, generating reference number and sending email notifications
   */
  async submitInquiry(validatedData) {
    // Generate verifiable reference number: PH-[BASE36_TIME]-[RANDOM_4_DIGITS]
    const referenceNumber = `PH-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Normalize selectedServices and service
    let selectedServices = validatedData.selectedServices || [];
    let service = validatedData.service || (selectedServices.length > 0 ? selectedServices[0] : 'Web Development');
    if (selectedServices.length === 0 && service) {
      selectedServices = [service];
    }

    // Normalize projectRequirements & projectDescription
    const projectRequirements = validatedData.projectRequirements || validatedData.projectDescription || '';
    const projectDescription = validatedData.projectDescription || projectRequirements;

    const newInquiry = new Inquiry({
      ...validatedData,
      referenceNumber,
      selectedServices,
      service,
      projectRequirements,
      projectDescription,
      status: 'NEW',
      priority: validatedData.priority || 'medium',
      communicationHistory: [
        {
          id: `comm_${Date.now()}_auto`,
          type: 'email_sent',
          direction: 'outbound',
          sender: 'Peace Haven Intake <inquiries@peacehaven.tech>',
          recipient: validatedData.email,
          subject: `[Peace Haven] Inquiry Received: Ref ${referenceNumber}`,
          message: `Your project requirements for "${validatedData.projectTitle || service}" have been logged into our intake queue under tracking reference ${referenceNumber}. Our solutions engineering team is reviewing your technical specifications.`,
          templateSlug: 'client_inquiry_confirmation',
          templateName: 'Client Inquiry Confirmation (Automated)',
          deliveryStatus: 'sent',
          sentAt: new Date(),
        },
      ],
      auditHistory: [
        {
          action: 'CREATED',
          changedBy: validatedData.email || 'client_intake',
          previousStatus: null,
          newStatus: 'NEW',
          notes: 'Initial submission through advanced multi-step intake flow',
          timestamp: new Date(),
        },
      ],
    });

    // 1. Persist in MongoDB FIRST
    await newInquiry.save();

    // 2. Dispatches notifications & emails via centralized automation engine
    await automationService.emitEvent('INQUIRY_CREATED', { inquiry: newInquiry });

    return newInquiry;
  },

  /**
   * List inquiries with filtering, search query normalization, and computed metrics
   */
  async listInquiries({
    status,
    service,
    industry,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 50,
  }) {
    const query = {};

    // Filter by status (support normalized uppercase and legacy)
    if (status && status !== 'All') {
      const upper = status.toUpperCase();
      query.status = { $regex: new RegExp(`^${status}$|^${upper}$`, 'i') };
    }

    // Filter by service (checks selectedServices array or legacy service)
    if (service && service !== 'All') {
      query.$or = [
        { selectedServices: { $regex: new RegExp(service, 'i') } },
        { service: { $regex: new RegExp(service, 'i') } },
      ];
    }

    // Filter by industry
    if (industry && industry !== 'All') {
      query.industry = { $regex: new RegExp(`^${industry}$`, 'i') };
    }

    // Search across clientName, companyName, email, referenceNumber, projectTitle, requirements
    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      const searchConditions = [
        { referenceNumber: searchRegex },
        { clientName: searchRegex },
        { companyName: searchRegex },
        { email: searchRegex },
        { projectTitle: searchRegex },
        { projectRequirements: searchRegex },
        { projectDescription: searchRegex },
      ];

      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchConditions }];
        delete query.$or;
      } else {
        query.$or = searchConditions;
      }
    }

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [inquiries, total, allForMetrics] = await Promise.all([
      Inquiry.find(query).sort(sort).skip(skip).limit(parseInt(limit, 10)),
      Inquiry.countDocuments(query),
      Inquiry.find({}, 'status').lean(),
    ]);

    // Calculate overview metrics across all leads
    const metrics = {
      total: allForMetrics.length,
      new: 0,
      underReview: 0,
      needMoreInfo: 0,
      inDiscussion: 0,
      proposalSent: 0,
      converted: 0,
      closed: 0,
      // Backward compatibility keys
      inProgress: 0,
      qualified: 0,
      rejected: 0,
    };

    allForMetrics.forEach((item) => {
      const s = (item.status || '').toUpperCase();
      if (s === 'NEW') {
        metrics.new += 1;
      } else if (s === 'UNDER_REVIEW' || s === 'REVIEWING') {
        metrics.underReview += 1;
        metrics.inProgress += 1;
      } else if (s === 'NEED_MORE_INFORMATION') {
        metrics.needMoreInfo += 1;
        metrics.inProgress += 1;
      } else if (s === 'IN_DISCUSSION') {
        metrics.inDiscussion += 1;
        metrics.inProgress += 1;
      } else if (s === 'PROPOSAL_SENT') {
        metrics.proposalSent += 1;
        metrics.inProgress += 1;
      } else if (s === 'CONTACTED') {
        metrics.inProgress += 1;
      } else if (s === 'QUALIFIED') {
        metrics.qualified += 1;
        metrics.inProgress += 1;
      } else if (['CONVERTED', 'WON'].includes(s)) {
        metrics.converted += 1;
      } else if (['CLOSED', 'REJECTED', 'LOST', 'ARCHIVED'].includes(s)) {
        metrics.closed += 1;
        metrics.rejected += 1;
      }
    });

    const normalizedInquiries = inquiries.map((inq) => {
      const doc = inq.toObject ? inq.toObject() : inq;
      if (doc.assignedTo) {
        doc.assignedTo = normalizeAssigned(doc.assignedTo, doc.selectedServices || [doc.service]);
      }
      return doc;
    });

    return {
      inquiries: normalizedInquiries,
      total,
      metrics,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    };
  },

  /**
   * Find inquiry by MongoDB ObjectID or human-readable reference number
   */
  async getInquiryById(id) {
    const inquiry = await Inquiry.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { referenceNumber: id }],
    });
    if (inquiry && inquiry.assignedTo) {
      inquiry.assignedTo = normalizeAssigned(inquiry.assignedTo, inquiry.selectedServices || [inquiry.service]);
    }
    return inquiry;
  },

  /**
   * Update lead pipeline status and internal notes
   */
  async updateInquiryStatus(id, updateData = {}, user) {
    const { status, priority, notes, assignedTo, notifyClient } = updateData;
    const inquiry = await this.getInquiryById(id);
    if (!inquiry) return null;

    const prevStatus = inquiry.status;
    const prevPriority = inquiry.priority;
    if (status) inquiry.status = status;
    if (priority) inquiry.priority = priority;
    if (notes !== undefined) inquiry.notes = notes;
    if (assignedTo !== undefined) inquiry.assignedTo = normalizeAssigned(assignedTo, inquiry.selectedServices || [inquiry.service]);

    // Record in immutable audit trail
    inquiry.auditHistory.push({
      action: 'UPDATE',
      changedBy: user?.email || user?.name || 'admin',
      previousStatus: prevStatus,
      newStatus: status || prevStatus,
      notes: notes || (assignedTo ? `Assigned to: ${assignedTo.name}` : priority ? `Priority set to ${priority}` : 'Details updated'),
      timestamp: new Date(),
    });

    await inquiry.save();

    // Trigger automation event
    if (status && status !== prevStatus) {
      await automationService.emitEvent('INQUIRY_STATUS_CHANGED', {
        inquiry,
        prevStatus,
        newStatus: status,
        user,
        notifyClient: updateData?.notifyClient,
        clientNotes: notes,
      });
    }

    if (assignedTo && (!inquiry.assignedTo || inquiry.assignedTo.toString() !== assignedTo.toString())) {
      await automationService.emitEvent('INQUIRY_ASSIGNED', {
        inquiry,
        assignee: assignedTo,
        assignedBy: user,
      });
    }

    return inquiry;
  },

  /**
   * Update priority tier (low, medium, high, urgent)
   */
  async updateInquiryPriority(id, priority, user) {
    const inquiry = await this.getInquiryById(id);
    if (!inquiry) return null;

    const prevPriority = inquiry.priority;
    inquiry.priority = priority;
    inquiry.auditHistory.push({
      action: 'PRIORITY_CHANGED',
      changedBy: user?.email || user?.name || 'admin',
      previousStatus: inquiry.status,
      newStatus: inquiry.status,
      notes: `Priority changed from ${prevPriority} to ${priority}`,
      timestamp: new Date(),
    });

    await inquiry.save();
    return inquiry;
  },

  /**
   * Add internal staff note to lead dossier
   */
  async addInquiryNote(id, { text, author }, user) {
    const inquiry = await this.getInquiryById(id);
    if (!inquiry) return null;

    const noteAuthor = author || user?.name || user?.email || 'Engineering Lead';
    const newNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      text,
      author: noteAuthor,
      createdAt: new Date(),
    };

    inquiry.internalNotes.push(newNote);
    inquiry.auditHistory.push({
      action: 'NOTE_ADDED',
      changedBy: noteAuthor,
      previousStatus: inquiry.status,
      newStatus: inquiry.status,
      notes: `Internal note added: "${text.substring(0, 40)}${text.length > 40 ? '...' : ''}"`,
      timestamp: new Date(),
    });

    await inquiry.save();
    return { newNote, inquiry };
  },

  /**
   * Generate CSV export format of all inquiry dossiers
   */
  async generateInquiryCsv() {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });

    const headers = [
      'Reference ID',
      'Submission Date',
      'Client Name',
      'Company Name',
      'Job Title',
      'Email',
      'Phone',
      'Country',
      'Selected Services',
      'Industry',
      'Project Title',
      'Project Requirements',
      'Project Type',
      'Expected Deliverables',
      'Preferred Technology',
      'Timeline',
      'Budget Range',
      'Start Preference',
      'Status',
      'Assigned To',
      'Internal Notes Count',
    ];

    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const stringified = String(str).replace(/"/g, '""');
      return `"${stringified}"`;
    };

    const rows = inquiries.map((i) => [
      escapeCsv(i.referenceNumber),
      escapeCsv(i.createdAt ? new Date(i.createdAt).toISOString() : ''),
      escapeCsv(i.clientName),
      escapeCsv(i.companyName),
      escapeCsv(i.jobTitle || ''),
      escapeCsv(i.email),
      escapeCsv(i.phoneNumber || ''),
      escapeCsv(i.country || ''),
      escapeCsv((i.selectedServices && i.selectedServices.length > 0 ? i.selectedServices.join('; ') : i.service) || ''),
      escapeCsv(i.industry || ''),
      escapeCsv(i.projectTitle || ''),
      escapeCsv(i.projectRequirements || i.projectDescription || ''),
      escapeCsv(i.projectType || ''),
      escapeCsv(i.deliverables || ''),
      escapeCsv(i.preferredTechnology || ''),
      escapeCsv(i.timeline || ''),
      escapeCsv(i.budgetRange || ''),
      escapeCsv(i.startPreference || ''),
      escapeCsv(i.status || ''),
      escapeCsv(i.assignedTo?.name || 'Unassigned'),
      escapeCsv(i.internalNotes?.length || 0),
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  },

  /**
   * Delete inquiry record
   */
  async deleteInquiry(id) {
    return Inquiry.findOneAndDelete({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { referenceNumber: id }],
    });
  },
};


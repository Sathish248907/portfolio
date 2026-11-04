import { z } from 'zod';

export const inquirySchema = z
  .object({
    // Service selection
    service: z.string().optional(),
    selectedServices: z.array(z.string()).optional(),

    // Contact Information (supports standard & alternate field names)
    clientName: z.string().min(2, 'Client name must be at least 2 characters').optional(),
    fullName: z.string().min(2).optional(),
    email: z.string().email('Valid work email is required').optional(),
    businessEmail: z.string().email().optional(),
    companyName: z.string().min(2, 'Company name is required'),
    jobTitle: z.string().optional().default(''),
    country: z.string().optional().default(''),
    phoneNumber: z.string().optional().default(''),
    phone: z.string().optional(),

    // Project Specifications
    projectTitle: z.string().optional().default(''),
    projectDescription: z.string().optional(),
    projectRequirements: z.string().optional(),
    projectOverview: z.string().optional(),
    detailedRequirements: z.string().optional(),
    projectObjectives: z.string().optional(),
    requiredFeatures: z.string().optional(),
    industry: z.string().optional().default('Information Technology & Software'),
    projectType: z.string().optional().default('Full Implementation'),
    deliverables: z.string().optional().default(''),
    preferredTechnology: z.string().optional().default(''),
    technicalRequirements: z.string().optional().default(''),
    additionalRequirements: z.string().optional().default(''),
    additionalInformation: z.string().optional().default(''),

    // Budget & Timeline
    budgetRange: z.string().min(1, 'Budget range is required').optional(),
    budgetCurrency: z.string().optional().default('USD'),
    budgetMin: z.number().nullable().optional(),
    budgetMax: z.number().nullable().optional(),
    customBudget: z.string().optional().default(''),
    timeline: z.string().min(1, 'Timeline is required').optional(),
    expectedTimeline: z.string().optional(),
    startPreference: z.string().optional().default('Immediately'),
    expectedStartDate: z.string().optional(),
    urgency: z.enum(['Normal', 'High', 'Urgent', 'Critical']).optional().default('Normal'),
    preferredContactMethod: z.enum(['Email', 'Phone', 'Video Meeting']).optional().default('Email'),

    attachments: z
      .array(
        z.object({
          fileName: z.string(),
          fileSize: z.number().optional(),
          fileType: z.string().optional(),
          fileUrl: z.string().optional(),
        })
      )
      .optional()
      .default([]),
  })
  .superRefine((data, ctx) => {
    // Validate clientName / fullName
    const hasName = Boolean((data.clientName && data.clientName.trim().length >= 2) || (data.fullName && data.fullName.trim().length >= 2));
    if (!hasName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['clientName'],
        message: 'Client name must be at least 2 characters',
      });
    }

    // Validate email / businessEmail
    const hasEmail = Boolean((data.email && data.email.includes('@')) || (data.businessEmail && data.businessEmail.includes('@')));
    if (!hasEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['email'],
        message: 'Valid business email is required',
      });
    }

    // Check service
    const hasService = Boolean(data.service && data.service.trim().length > 0);
    const hasSelectedServices = Boolean(data.selectedServices && data.selectedServices.length > 0);
    if (!hasService && !hasSelectedServices) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['service'],
        message: 'At least one service discipline must be selected',
      });
    }

    // Check budget
    const hasBudget = Boolean((data.budgetRange && data.budgetRange.trim().length > 0) || (data.customBudget && data.customBudget.trim().length > 0));
    if (!hasBudget) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['budgetRange'],
        message: 'Budget range is required',
      });
    }

    // Check timeline
    const hasTimeline = Boolean((data.timeline && data.timeline.trim().length > 0) || (data.expectedTimeline && data.expectedTimeline.trim().length > 0));
    if (!hasTimeline) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timeline'],
        message: 'Timeline is required',
      });
    }

    // Check project requirements/description/overview
    const reqLen = (data.projectRequirements || '').trim().length;
    const descLen = (data.projectDescription || '').trim().length;
    const overLen = (data.projectOverview || '').trim().length;
    const detailLen = (data.detailedRequirements || '').trim().length;
    if (reqLen < 15 && descLen < 15 && overLen < 15 && detailLen < 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 15,
        type: 'string',
        inclusive: true,
        exact: false,
        path: ['projectRequirements'],
        message: 'Requirements must be at least 15 characters',
      });
    }
  });

export const statusUpdateSchema = z.object({
  status: z
    .enum([
      'NEW',
      'UNDER_REVIEW',
      'NEED_MORE_INFORMATION',
      'CONTACTED',
      'REVIEWING',
      'QUALIFIED',
      'IN_DISCUSSION',
      'PROPOSAL_SENT',
      'CONVERTED',
      'CLOSED',
      'REJECTED',
      // Legacy aliases
      'New',
      'Under Review',
      'Need More Information',
      'Reviewing',
      'Contacted',
      'Qualified',
      'Proposal Sent',
      'Won',
      'Lost',
      'Archived',
    ])
    .optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  notes: z.string().optional(),
  notifyClient: z.boolean().optional().default(false),
  assignedTo: z
    .object({
      name: z.string(),
      email: z.string().optional().default(''),
      role: z.string().optional().default(''),
    })
    .optional(),
});

export const noteSchema = z.object({
  text: z.string().min(1, 'Note text is required'),
  author: z.string().optional(),
});

export const clientEmailSchema = z.object({
  recipientEmail: z.string().email('Valid client email is required'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  templateSlug: z.string().optional().default(''),
  attachments: z
    .array(
      z.object({
        fileName: z.string(),
        fileSize: z.number().optional(),
        fileType: z.string().optional(),
        fileUrl: z.string().optional(),
      })
    )
    .optional()
    .default([]),
});

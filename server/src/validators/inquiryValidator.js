import { z } from 'zod';

export const inquirySchema = z
  .object({
    service: z.string().optional(),
    selectedServices: z.array(z.string()).optional(),
    projectTitle: z.string().optional().default(''),
    projectDescription: z.string().optional(),
    projectRequirements: z.string().optional(),
    industry: z.string().optional().default('Information Technology & Software'),
    projectType: z.string().optional().default('Full Implementation'),
    deliverables: z.string().optional().default(''),
    preferredTechnology: z.string().optional().default(''),
    budgetRange: z.string().min(1, 'Budget range is required'),
    timeline: z.string().min(1, 'Timeline is required'),
    startPreference: z.string().optional().default('Immediately'),
    additionalRequirements: z.string().optional().default(''),
    clientName: z.string().min(2, 'Client name must be at least 2 characters'),
    email: z.string().email('Valid work email is required'),
    companyName: z.string().min(2, 'Company name is required'),
    jobTitle: z.string().optional().default(''),
    country: z.string().optional().default(''),
    phoneNumber: z.string().optional().default(''),
    attachments: z
      .array(
        z.object({
          fileName: z.string(),
          fileSize: z.number().optional(),
          fileType: z.string().optional(),
        })
      )
      .optional()
      .default([]),
  })
  .superRefine((data, ctx) => {
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

    // Check project requirements/description
    const reqLen = (data.projectRequirements || '').trim().length;
    const descLen = (data.projectDescription || '').trim().length;
    if (reqLen < 15 && descLen < 15) {
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
      'REVIEWING',
      'QUALIFIED',
      'IN_DISCUSSION',
      'PROPOSAL_SENT',
      'CONVERTED',
      'CLOSED',
      'REJECTED',
      // Legacy aliases
      'New',
      'Reviewing',
      'Contacted',
      'Qualified',
      'Proposal Sent',
      'Won',
      'Lost',
      'Archived',
    ])
    .optional(),
  notes: z.string().optional(),
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

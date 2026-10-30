import { z } from 'zod';

export const inquirySchema = z.object({
  service: z.enum([
    'Web Development',
    'FinTech',
    'Robotics',
    'Drones',
    'Healthcare',
    'US Staffing',
    'Trading',
    'Digital Marketing',
    'Multiple Services',
    'Other',
  ]),
  projectRequirements: z.string().min(15, 'Requirements must be at least 15 characters'),
  budgetRange: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  email: z.string().email('Valid work email is required'),
  companyName: z.string().min(2, 'Company name is required'),
  phoneNumber: z.string().optional().default(''),
});

export const statusUpdateSchema = z.object({
  status: z.enum([
    'New',
    'Reviewing',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'Won',
    'Lost',
    'Archived',
  ]),
  notes: z.string().optional(),
});

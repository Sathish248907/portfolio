import { z } from 'zod';

export const recordEventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required').max(100),
  pagePath: z.string().min(1, 'Page path is required').max(500),
  eventCategory: z.enum(['Page Tracking', 'User Interaction', 'Conversion', 'Engagement', 'Navigation']).default('User Interaction'),
  eventLabel: z.string().max(200).optional().default(''),
  serviceSlug: z.string().max(100).nullable().optional().default(null),
  industrySlug: z.string().max(100).nullable().optional().default(null),
  projectSlug: z.string().max(100).nullable().optional().default(null),
  sessionId: z.string().min(1, 'Session ID is required').max(100),
  anonymousVisitorId: z.string().min(1, 'Anonymous visitor ID is required').max(100),
  isReturningVisitor: z.boolean().optional().default(false),
  trafficSource: z
    .object({
      source: z.string().max(100).default('Direct'),
      medium: z.string().max(100).default('none'),
      campaign: z.string().max(100).default('none'),
    })
    .optional()
    .default({ source: 'Direct', medium: 'none', campaign: 'none' }),
  deviceCategory: z.enum(['desktop', 'mobile', 'tablet']).optional().default('desktop'),
  browser: z.string().max(100).optional().default('Chrome'),
  os: z.string().max(100).optional().default('Windows'),
  country: z.string().max(100).optional().default('United States'),
  region: z.string().max(100).optional().default('California'),
  city: z.string().max(100).optional().default('San Francisco'),
  duration: z.number().min(0).max(86400).optional().default(0),
  metadata: z.record(z.any()).optional().default({}),
});

export const analyticsQuerySchema = z.object({
  period: z.enum(['today', '7d', '30d', '90d', 'custom']).default('30d'),
  startDate: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}/).optional()),
  endDate: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}/).optional()),
  service: z.string().optional(),
  industry: z.string().optional(),
  project: z.string().optional(),
});


import { z } from 'zod';

export const pageUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().default(''),
  status: z.enum(['draft', 'review', 'approved', 'published', 'unpublished']).optional().default('published'),
  hero: z
    .object({
      headline: z.string().optional().default(''),
      subheadline: z.string().optional().default(''),
      ctaText: z.string().optional().default(''),
      ctaLink: z.string().optional().default(''),
      badge: z.string().optional().default(''),
    })
    .optional()
    .default({}),
  sections: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        title: z.string().optional().default(''),
        subtitle: z.string().optional().default(''),
        content: z.string().optional().default(''),
        ctaText: z.string().optional().default(''),
        ctaLink: z.string().optional().default(''),
        order: z.number().optional().default(0),
        isVisible: z.boolean().optional().default(true),
        metadata: z.record(z.any()).optional().default({}),
      })
    )
    .optional()
    .default([]),
  seo: z
    .object({
      title: z.string().optional().default(''),
      description: z.string().optional().default(''),
      canonicalUrl: z.string().optional().default(''),
      ogTitle: z.string().optional().default(''),
      ogDescription: z.string().optional().default(''),
      ogImage: z.string().optional().default('/og-image.png'),
      indexable: z.boolean().optional().default(true),
    })
    .optional()
    .default({}),
  changeSummary: z.string().optional().default('Page content modified via CMS'),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be alphanumeric lowercase with hyphens'),
  subtitle: z.string().max(500).optional().default(''),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(600),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  featuredImage: z.string().optional().default('/images/hero/cinematic-poster.jpg'),
  category: z.enum([
    'Technology',
    'Artificial Intelligence',
    'FinTech',
    'Robotics & Automation',
    'Healthcare Technology',
    'Web Development',
    'Industry Insights',
  ]),
  tags: z.array(z.string()).optional().default([]),
  author: z
    .object({
      name: z.string().default('Peace Haven Engineering'),
      role: z.string().default('Technical Lead'),
      avatar: z.string().default('/favicon.svg'),
    })
    .optional()
    .default({ name: 'Peace Haven Engineering', role: 'Technical Lead', avatar: '/favicon.svg' }),
  readTime: z.string().optional().default('5 min read'),
  status: z.enum(['draft', 'review', 'approved', 'published', 'unpublished']).optional().default('published'),
  isFeatured: z.boolean().optional().default(false),
  scheduledAt: z.string().datetime().optional().nullable().default(null),
  seo: z
    .object({
      title: z.string().optional().default(''),
      description: z.string().optional().default(''),
      canonicalUrl: z.string().optional().default(''),
      ogImage: z.string().optional().default(''),
      keywords: z.array(z.string()).optional().default([]),
    })
    .optional()
    .default({}),
});

export const mediaAssetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  fileName: z.string().min(1, 'File name is required'),
  url: z.string().min(1, 'Asset URL is required'),
  fileType: z.string().default('image/png'),
  fileSize: z.number().min(0).max(25000000, 'Max file size 25MB').default(0), // up to 25MB
  dimensions: z
    .object({
      width: z.number().default(0),
      height: z.number().default(0),
    })
    .optional()
    .default({ width: 0, height: 0 }),
  category: z.enum(['Services', 'Projects', 'Industries', 'Hero', 'Blog', 'General']).default('General'),
  altText: z.string().max(300).optional().default(''),
});

export const navigationItemSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100),
  path: z.string().min(1, 'Path is required').max(300),
  menu: z.enum(['main', 'services_dropdown', 'footer_quick', 'footer_services', 'footer_legal', 'social', 'cta']),
  order: z.number().default(0),
  isVisible: z.boolean().default(true),
  icon: z.string().optional().default(''),
  badge: z.string().optional().default(''),
  description: z.string().optional().default(''),
  isExternal: z.boolean().default(false),
  parent: z.string().nullable().optional().default(null),
});


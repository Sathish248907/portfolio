import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      default: '/images/hero/cinematic-poster.jpg',
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Technology',
        'Artificial Intelligence',
        'FinTech',
        'Robotics & Automation',
        'Healthcare Technology',
        'Web Development',
        'Industry Insights',
      ],
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      name: { type: String, default: 'Peace Haven Engineering' },
      role: { type: String, default: 'Technical Lead' },
      avatar: { type: String, default: '/favicon.svg' },
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'published', 'unpublished'],
      default: 'published',
      index: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      canonicalUrl: { type: String, default: '' },
      ogImage: { type: String, default: '' },
      keywords: [String],
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    lastUpdatedBy: {
      type: String,
      default: 'System',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying published articles sorted by date
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ category: 1, status: 1 });

export const BlogPost = mongoose.model('BlogPost', BlogPostSchema);


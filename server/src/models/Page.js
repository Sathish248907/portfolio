import mongoose from 'mongoose';

const ContentSectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'hero', 'intro', 'grid', 'features', 'cta'
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    content: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaLink: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const PageSchema = new mongoose.Schema(
  {
    pageId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'published', 'unpublished'],
      default: 'published',
      index: true,
    },
    hero: {
      headline: { type: String, default: '' },
      subheadline: { type: String, default: '' },
      ctaText: { type: String, default: '' },
      ctaLink: { type: String, default: '' },
      badge: { type: String, default: '' },
    },
    sections: [ContentSectionSchema],
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      canonicalUrl: { type: String, default: '' },
      ogTitle: { type: String, default: '' },
      ogDescription: { type: String, default: '' },
      ogImage: { type: String, default: '/og-image.png' },
      indexable: { type: Boolean, default: true },
    },
    lastUpdatedBy: {
      type: String,
      default: 'System',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Page = mongoose.model('Page', PageSchema);


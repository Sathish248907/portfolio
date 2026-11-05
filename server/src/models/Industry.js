import mongoose from 'mongoose';

const IndustrySchema = new mongoose.Schema(
  {
    industryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
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
    shortDesc: {
      type: String,
      required: true,
    },
    heroHeadline: {
      type: String,
      default: '',
    },
    overview: {
      type: String,
      default: '',
    },
    keyChallenges: [
      {
        title: String,
        description: String,
      },
    ],
    capabilities: [
      {
        title: String,
        description: String,
        features: [String],
      },
    ],
    technologies: [String],
    relatedServiceSlugs: [String],
    relatedProjectSlugs: [String],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished'],
      default: 'published',
      index: true,
    },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      canonicalUrl: { type: String, default: '' },
      ogImage: { type: String, default: '/og-image.png' },
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

IndustrySchema.index({ displayOrder: 1 });

export const Industry = mongoose.model('Industry', IndustrySchema);


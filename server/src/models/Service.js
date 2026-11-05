import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    serviceId: {
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
    },
    tagline: {
      type: String,
      required: true,
    },
    heroHeadline: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      default: 'Cpu',
    },
    capabilities: [
      {
        title: String,
        description: String,
        features: [String],
      },
    ],
    benefits: [
      {
        title: String,
        description: String,
        metric: String,
      },
    ],
    workflow: [
      {
        step: String,
        title: String,
        description: String,
      },
    ],
    techStack: [String],
    deliverables: [String],
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
      ogTitle: { type: String, default: '' },
      ogDescription: { type: String, default: '' },
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

export const Service = mongoose.model('Service', ServiceSchema);

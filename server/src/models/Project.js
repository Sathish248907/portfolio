import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
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
    subtitle: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
      index: true,
    },
    serviceName: {
      type: String,
      default: 'Engineering Solutions',
    },
    industry: {
      type: String,
      default: 'Technology & Enterprise',
    },
    category: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    isDemonstrationOrPrototype: {
      type: Boolean,
      default: true,
    },
    statusBadge: {
      type: String,
      default: 'Engineering Demonstration Prototype',
    },
    thumbnail: {
      type: String,
      default: '/images/projects/artistry-homepage.png',
    },
    heroImage: {
      type: String,
      default: '/images/projects/artistry-homepage.png',
    },
    overview: {
      type: String,
      required: true,
    },
    challenge: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    architectureHighlights: [String],
    engineeringCapabilitiesDemonstrated: [String],
    technologies: [String],
    resultsOrProjections: [
      {
        metric: String,
        label: String,
        detail: String,
      },
    ],
    galleryImages: [String],
    demoUrl: String,
    publishedAt: String,
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished', 'archived'],
      default: 'published',
      index: true,
    },
    clientName: {
      type: String,
      default: '',
    },
    businessChallenge: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
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

export const Project = mongoose.model('Project', ProjectSchema);

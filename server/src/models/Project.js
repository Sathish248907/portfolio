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
      required: true,
    },
    industry: {
      type: String,
      required: true,
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
      required: true,
    },
    heroImage: {
      type: String,
      required: true,
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
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model('Project', ProjectSchema);

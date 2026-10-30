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
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model('Service', ServiceSchema);

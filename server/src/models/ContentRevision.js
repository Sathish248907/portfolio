import mongoose from 'mongoose';

const ContentRevisionSchema = new mongoose.Schema(
  {
    contentType: {
      type: String,
      enum: ['page', 'service', 'industry', 'project', 'blog', 'navigation', 'settings'],
      required: true,
      index: true,
    },
    contentId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: '',
    },
    version: {
      type: Number,
      required: true,
    },
    snapshot: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    changeSummary: {
      type: String,
      default: 'Content updated',
    },
    author: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

ContentRevisionSchema.index({ contentType: 1, contentId: 1, version: -1 });

export const ContentRevision = mongoose.model('ContentRevision', ContentRevisionSchema);


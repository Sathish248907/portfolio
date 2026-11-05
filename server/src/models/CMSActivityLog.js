import mongoose from 'mongoose';

const CMSActivityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ['CREATE', 'UPDATE', 'PUBLISH', 'UNPUBLISH', 'DELETE', 'RESTORE'],
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ['page', 'service', 'industry', 'project', 'blog', 'media', 'navigation', 'settings'],
      required: true,
      index: true,
    },
    entityTitle: {
      type: String,
      required: true,
    },
    entityId: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    performedBy: {
      type: String,
      required: true,
      default: 'Admin',
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

CMSActivityLogSchema.index({ timestamp: -1 });

export const CMSActivityLog = mongoose.model('CMSActivityLog', CMSActivityLogSchema);


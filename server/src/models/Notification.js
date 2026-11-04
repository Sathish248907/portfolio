import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      default: null, // Null means broadcast to all permitted administrators or role
    },
    recipientRole: {
      type: String,
      enum: ['superadmin', 'admin', 'content_manager', 'editor', 'marketing_manager', 'sales_manager', 'viewer', 'all'],
      default: 'all',
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['inquiry', 'cms', 'user_management', 'reminder', 'security', 'system'],
      default: 'system',
    },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error', 'urgent'],
      default: 'info',
    },
    relatedResourceId: {
      type: String,
      trim: true,
      default: null,
    },
    relatedResourceType: {
      type: String,
      enum: ['inquiry', 'page', 'post', 'user', 'reminder', 'system', 'security'],
      default: 'system',
    },
    actionUrl: {
      type: String,
      trim: true,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
      default: null,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipientId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipientRole: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ category: 1, createdAt: -1 });

export const Notification = mongoose.model('Notification', notificationSchema);

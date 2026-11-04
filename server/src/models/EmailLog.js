import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    recipientName: {
      type: String,
      trim: true,
      default: '',
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    templateId: {
      type: String,
      trim: true,
      default: null,
    },
    templateName: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: ['inquiry_client', 'inquiry_admin', 'status_update', 'invitation', 'auth', 'cms', 'reminder', 'security', 'test', 'general'],
      default: 'general',
    },
    relatedResourceId: {
      type: String,
      trim: true,
      default: null,
    },
    relatedResourceType: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'sent', 'failed', 'retrying'],
      default: 'pending',
    },
    providerMessageId: {
      type: String,
      trim: true,
      default: null,
    },
    attemptCount: {
      type: Number,
      default: 1,
    },
    lastAttemptAt: {
      type: Date,
      default: Date.now,
    },
    sentAt: {
      type: Date,
      default: null,
    },
    failureReason: {
      type: String,
      default: null,
    },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    payloadSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

emailLogSchema.index({ recipient: 1, createdAt: -1 });
emailLogSchema.index({ status: 1, createdAt: -1 });
emailLogSchema.index({ category: 1, createdAt: -1 });

export const EmailLog = mongoose.model('EmailLog', emailLogSchema);


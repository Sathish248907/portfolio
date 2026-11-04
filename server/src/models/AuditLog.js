import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: String,
      default: 'system',
    },
    actorName: {
      type: String,
      default: 'System',
    },
    actorEmail: {
      type: String,
      default: 'system@peacehaven.tech',
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    module: {
      type: String,
      required: true,
      index: true,
    },
    resourceId: {
      type: String,
      default: null,
    },
    changeSummary: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      enum: ['success', 'failure', 'warning'],
      default: 'success',
      index: true,
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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

// Prevent updates or deletions to guarantee append-only integrity
AuditLogSchema.pre('updateOne', function (next) {
  next(new Error('Audit logs are append-only and cannot be modified.'));
});

AuditLogSchema.pre('updateMany', function (next) {
  next(new Error('Audit logs are append-only and cannot be modified.'));
});

AuditLogSchema.pre('findOneAndDelete', function (next) {
  next(new Error('Audit logs cannot be deleted.'));
});

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema);


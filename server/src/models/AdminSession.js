import mongoose from 'mongoose';

const AdminSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true,
      index: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    device: {
      type: String,
      default: 'Desktop / Chrome Browser',
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminSession = mongoose.model('AdminSession', AdminSessionSchema);


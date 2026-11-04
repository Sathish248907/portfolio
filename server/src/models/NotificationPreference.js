import mongoose from 'mongoose';

const preferenceSubSchema = new mongoose.Schema(
  {
    inApp: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
  },
  { _id: false }
);

const notificationPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true,
      unique: true,
    },
    categories: {
      inquiry: {
        type: preferenceSubSchema,
        default: () => ({ inApp: true, email: true }),
      },
      assignment: {
        type: preferenceSubSchema,
        default: () => ({ inApp: true, email: true }),
      },
      statusUpdate: {
        type: preferenceSubSchema,
        default: () => ({ inApp: true, email: false }),
      },
      cms: {
        type: preferenceSubSchema,
        default: () => ({ inApp: true, email: false }),
      },
      userManagement: {
        type: preferenceSubSchema,
        default: () => ({ inApp: true, email: true }),
      },
      reminder: {
        type: preferenceSubSchema,
        default: () => ({ inApp: true, email: true }),
      },
      security: {
        type: preferenceSubSchema,
        default: () => ({ inApp: true, email: true }),
      },
    },
    frequency: {
      type: String,
      enum: ['immediate', 'daily_digest'],
      default: 'immediate',
    },
  },
  {
    timestamps: true,
  }
);

export const NotificationPreference = mongoose.model(
  'NotificationPreference',
  notificationPreferenceSchema
);

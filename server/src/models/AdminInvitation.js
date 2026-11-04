import mongoose from 'mongoose';

const AdminInvitationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: 'editor',
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    tokenHash: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled', 'expired'],
      default: 'pending',
    },
    invitedBy: {
      id: String,
      name: String,
      email: String,
    },
    acceptedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminInvitation = mongoose.model('AdminInvitation', AdminInvitationSchema);

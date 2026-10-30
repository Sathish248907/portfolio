import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    service: {
      type: String,
      required: true,
      enum: [
        'Web Development',
        'FinTech',
        'Robotics',
        'Drones',
        'Healthcare',
        'US Staffing',
        'Trading',
        'Digital Marketing',
        'Multiple Services',
        'Other',
      ],
    },
    projectRequirements: {
      type: String,
      required: true,
      trim: true,
    },
    budgetRange: {
      type: String,
      required: true,
    },
    timeline: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'New',
        'Reviewing',
        'Contacted',
        'Qualified',
        'Proposal Sent',
        'Won',
        'Lost',
        'Archived',
      ],
      default: 'New',
      index: true,
    },
    notes: {
      type: String,
      default: '',
    },
    auditHistory: [
      {
        action: String,
        changedBy: String,
        timestamp: { type: Date, default: Date.now },
        previousStatus: String,
        newStatus: String,
        notes: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.model('Inquiry', InquirySchema);

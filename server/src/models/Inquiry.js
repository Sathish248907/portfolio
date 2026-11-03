import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // Multi-service selection support (Phase 6)
    selectedServices: {
      type: [String],
      default: [],
    },
    // Primary service category (backwards compatibility)
    service: {
      type: String,
      required: true,
      default: 'Web Development',
    },
    // Detailed project specifications
    projectTitle: {
      type: String,
      trim: true,
      default: '',
    },
    projectDescription: {
      type: String,
      trim: true,
      default: '',
    },
    projectRequirements: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
      default: 'Information Technology & Software',
    },
    projectType: {
      type: String,
      trim: true,
      default: 'Full Implementation',
    },
    deliverables: {
      type: String,
      trim: true,
      default: '',
    },
    preferredTechnology: {
      type: String,
      trim: true,
      default: '',
    },
    budgetRange: {
      type: String,
      required: true,
    },
    timeline: {
      type: String,
      required: true,
    },
    startPreference: {
      type: String,
      trim: true,
      default: 'Immediately',
    },
    additionalRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    // Contact Information (Step 1)
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
    jobTitle: {
      type: String,
      trim: true,
      default: '',
    },
    country: {
      type: String,
      trim: true,
      default: '',
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    // Attachments metadata
    attachments: [
      {
        fileName: String,
        fileSize: Number,
        fileType: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    // 8 Lead Pipeline Statuses + legacy aliases
    status: {
      type: String,
      enum: [
        'NEW',
        'REVIEWING',
        'QUALIFIED',
        'IN_DISCUSSION',
        'PROPOSAL_SENT',
        'CONVERTED',
        'CLOSED',
        'REJECTED',
        // Legacy aliases
        'New',
        'Reviewing',
        'Contacted',
        'Qualified',
        'Proposal Sent',
        'Won',
        'Lost',
        'Archived',
      ],
      default: 'NEW',
      index: true,
    },
    // Assigned team member
    assignedTo: {
      name: { type: String, default: 'Unassigned' },
      email: { type: String, default: '' },
      role: { type: String, default: '' },
    },
    // Structured Internal Notes
    internalNotes: [
      {
        id: {
          type: String,
          default: () => `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        },
        text: { type: String, required: true },
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
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

InquirySchema.pre('validate', function (next) {
  // Sync selectedServices and primary service
  if ((!this.selectedServices || this.selectedServices.length === 0) && this.service) {
    this.selectedServices = [this.service];
  } else if (this.selectedServices && this.selectedServices.length > 0 && !this.service) {
    this.service = this.selectedServices[0];
  }

  // Sync projectRequirements and projectDescription
  if (!this.projectRequirements && this.projectDescription) {
    this.projectRequirements = this.projectDescription;
  } else if (!this.projectDescription && this.projectRequirements) {
    this.projectDescription = this.projectRequirements;
  }

  next();
});

export const Inquiry = mongoose.model('Inquiry', InquirySchema);

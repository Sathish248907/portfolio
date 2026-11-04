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
    projectOverview: {
      type: String,
      trim: true,
      default: '',
    },
    detailedRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    projectObjectives: {
      type: String,
      trim: true,
      default: '',
    },
    requiredFeatures: {
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
    technicalRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    budgetRange: {
      type: String,
      required: true,
    },
    budgetCurrency: {
      type: String,
      trim: true,
      default: 'USD',
    },
    budgetMin: {
      type: Number,
      default: null,
    },
    budgetMax: {
      type: Number,
      default: null,
    },
    customBudget: {
      type: String,
      trim: true,
      default: '',
    },
    timeline: {
      type: String,
      required: true,
    },
    expectedTimeline: {
      type: String,
      trim: true,
      default: '',
    },
    startPreference: {
      type: String,
      trim: true,
      default: 'Immediately',
    },
    expectedStartDate: {
      type: String,
      trim: true,
      default: '',
    },
    urgency: {
      type: String,
      enum: ['Normal', 'High', 'Urgent', 'Critical'],
      default: 'Normal',
    },
    preferredContactMethod: {
      type: String,
      enum: ['Email', 'Phone', 'Video Meeting'],
      default: 'Email',
    },
    additionalRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    additionalInformation: {
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
    // Lead Pipeline Statuses + legacy aliases
    status: {
      type: String,
      enum: [
        'NEW',
        'UNDER_REVIEW',
        'NEED_MORE_INFORMATION',
        'CONTACTED',
        'REVIEWING',
        'QUALIFIED',
        'IN_DISCUSSION',
        'PROPOSAL_SENT',
        'CONVERTED',
        'CLOSED',
        'REJECTED',
        // Legacy aliases
        'New',
        'Under Review',
        'Need More Information',
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
    // Priority level
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    // Assigned team member
    assignedTo: {
      name: { type: String, default: 'Unassigned' },
      email: { type: String, default: '' },
      role: { type: String, default: '' },
    },
    // Last communication timestamp
    lastCommunicatedAt: {
      type: Date,
      default: null,
    },
    // Chronological Client Communication History (Emails sent & received)
    communicationHistory: [
      {
        id: {
          type: String,
          default: () => `comm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        },
        type: {
          type: String,
          enum: ['email_sent', 'email_received', 'status_update', 'system'],
          default: 'email_sent',
        },
        direction: {
          type: String,
          enum: ['outbound', 'inbound'],
          default: 'outbound',
        },
        sender: { type: String, required: true },
        recipient: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        templateSlug: { type: String, default: '' },
        templateName: { type: String, default: '' },
        attachments: [
          {
            fileName: String,
            fileSize: Number,
            fileType: String,
            fileUrl: String,
          },
        ],
        deliveryStatus: {
          type: String,
          enum: ['sent', 'delivered', 'failed', 'pending'],
          default: 'sent',
        },
        sentAt: { type: Date, default: Date.now },
        notes: String,
      },
    ],
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
  // Aliases for client information
  if (!this.clientName && this.fullName) this.clientName = this.fullName;
  if (!this.email && this.businessEmail) this.email = this.businessEmail;
  if (!this.phoneNumber && this.phone) this.phoneNumber = this.phone;

  // Sync selectedServices and primary service
  if ((!this.selectedServices || this.selectedServices.length === 0) && this.service) {
    this.selectedServices = [this.service];
  } else if (this.selectedServices && this.selectedServices.length > 0 && !this.service) {
    this.service = this.selectedServices[0];
  }

  // Sync projectRequirements, projectDescription, projectOverview, detailedRequirements
  const primaryDesc = this.projectRequirements || this.projectDescription || this.detailedRequirements || this.projectOverview || '';
  if (!this.projectRequirements) this.projectRequirements = primaryDesc || 'No detailed specifications entered.';
  if (!this.projectDescription) this.projectDescription = this.projectRequirements;
  if (!this.projectOverview) this.projectOverview = this.projectDescription;
  if (!this.detailedRequirements) this.detailedRequirements = this.projectRequirements;

  // Sync timelines
  if (!this.expectedTimeline && this.timeline) this.expectedTimeline = this.timeline;
  if (!this.timeline && this.expectedTimeline) this.timeline = this.expectedTimeline;

  // Sync start preference
  if (!this.expectedStartDate && this.startPreference) this.expectedStartDate = this.startPreference;
  if (!this.startPreference && this.expectedStartDate) this.startPreference = this.expectedStartDate;

  // Sync additional info
  if (!this.additionalRequirements && this.additionalInformation) this.additionalRequirements = this.additionalInformation;
  if (!this.additionalInformation && this.additionalRequirements) this.additionalInformation = this.additionalRequirements;

  next();
});

export const Inquiry = mongoose.model('Inquiry', InquirySchema);

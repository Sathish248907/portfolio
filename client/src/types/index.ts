export type ServiceId = 
  | 'web-development'
  | 'fintech'
  | 'robotics'
  | 'drone-technology'
  | 'healthcare'
  | 'us-staffing'
  | 'trading'
  | 'digital-marketing';

export interface ServiceCapabilityItem {
  title: string;
  description: string;
  features: string[];
  icon?: string;
}

export interface ServiceUseCaseItem {
  title: string;
  scenario: string;
  solution: string;
  outcome: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  phase: string;
  description: string;
  deliverable?: string;
}

export interface ServiceDetail {
  id: ServiceId;
  slug: string;
  title: string;
  shortDescription: string;
  tagline: string;
  heroHeadline: string;
  heroDescription?: string;
  iconName: string;
  accentColor?: string;
  inquiryCategory: InquiryServiceCategory;
  overview: {
    summary: string;
    problemsSolved: string[];
    clientTypes: string[];
    solutionsOffered: string[];
    potentialOutcomes: string[];
  };
  capabilities: ServiceCapabilityItem[];
  approach: ServiceProcessStep[];
  benefits: {
    title: string;
    description: string;
    metric?: string;
  }[];
  useCases: ServiceUseCaseItem[];
  faqs: ServiceFAQItem[];
  workflow?: {
    step: string;
    title: string;
    description: string;
  }[];
  techStack: string[];
  deliverables: string[];
  relatedProjectSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  ctaLabel?: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  serviceId: ServiceId;
  serviceName: string;
  category?: string;
  shortDescription?: string;
  industry: string;
  isDemonstrationOrPrototype: boolean;
  statusBadge: string;
  thumbnail: string;
  heroImage: string;
  overview: string;
  challenge: string;
  solution: string;
  architectureHighlights: string[];
  engineeringCapabilitiesDemonstrated: string[];
  technologies: string[];
  resultsOrProjections: {
    metric: string;
    label: string;
    detail: string;
  }[];
  galleryImages: string[];
  demoUrl?: string;
  liveUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  designApproach?: {
    palette?: { name: string; hex: string }[];
    typography?: string[];
    visualDetails?: string[];
  };
  implementedFeatures?: {
    title: string;
    description: string;
    tag?: string;
  }[];
  technicalArchitecture?: {
    layers?: { layer: string; technology: string; purpose: string }[];
    flowDiagram?: string[];
  };
  developmentProcess?: { step: string; title: string; description?: string }[];
  liveCta?: {
    heading: string;
    description: string;
    buttonLabel: string;
  };
  publishedAt: string;
}

export type InquiryServiceCategory = 
  | 'Web Development'
  | 'FinTech'
  | 'Robotics'
  | 'Drones'
  | 'Healthcare'
  | 'US Staffing'
  | 'Trading'
  | 'Digital Marketing'
  | 'Multiple Services'
  | 'Other';

export type InquiryStatus = 
  | 'NEW'
  | 'REVIEWING'
  | 'QUALIFIED'
  | 'IN_DISCUSSION'
  | 'PROPOSAL_SENT'
  | 'CONVERTED'
  | 'CLOSED'
  | 'REJECTED'
  // Legacy aliases
  | 'New'
  | 'Reviewing'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Won'
  | 'Lost'
  | 'Archived';

export interface InternalNote {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface InquiryAuditEntry {
  action: string;
  changedBy: string;
  timestamp: string;
  previousStatus?: string | null;
  newStatus?: string;
  notes?: string;
}

export interface ProjectInquiry {
  _id?: string;
  referenceNumber: string;
  // Phase 6 multi-service support & legacy primary service
  selectedServices?: string[];
  service: InquiryServiceCategory | string;
  // Step 1: Contact
  clientName: string;
  email: string;
  phoneNumber?: string;
  companyName: string;
  jobTitle?: string;
  country?: string;
  // Step 3: Project Requirements
  projectTitle?: string;
  projectDescription?: string;
  projectRequirements: string;
  industry?: string;
  projectType?: string;
  deliverables?: string;
  preferredTechnology?: string;
  // Step 4: Budget & Additional Info
  timeline: string;
  budgetRange: string;
  startPreference?: string;
  additionalRequirements?: string;
  attachments?: {
    fileName: string;
    fileSize?: number;
    fileType?: string;
  }[];
  // Step 5 & Management
  status: InquiryStatus;
  assignedTo?: {
    name: string;
    email?: string;
    role?: string;
  };
  internalNotes?: InternalNote[];
  notes?: string;
  auditHistory?: InquiryAuditEntry[];
  createdAt: string;
  updatedAt?: string;
}

export interface InquiryMetrics {
  total: number;
  new: number;
  inProgress: number;
  qualified: number;
  converted: number;
  rejected: number;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export type AdminRoleSlug =
  | 'superadmin'
  | 'admin'
  | 'content_manager'
  | 'editor'
  | 'marketing_manager'
  | 'sales_manager'
  | 'viewer'
  | string;

export type AdminAccountStatus = 'active' | 'inactive' | 'pending_invitation' | 'suspended';

export interface AdminUser {
  id: string;
  _id?: string;
  email: string;
  name: string;
  role: AdminRoleSlug;
  status?: AdminAccountStatus;
  profileImage?: string;
  lastLoginAt?: string;
  createdAt?: string;
  customPermissions?: string[];
}

export interface AdminRole {
  _id?: string;
  id?: string;
  slug: string;
  name: string;
  description: string;
  permissions: string[];
  isSystemRole: boolean;
  userCount?: number;
}

export interface PermissionModule {
  id: string;
  label: string;
  actions: string[];
}

export interface AdminInvitation {
  _id: string;
  id?: string;
  name?: string;
  email: string;
  role: string;
  token?: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'cancelled' | 'expired';
  invitedBy?: {
    id?: string;
    name?: string;
    email?: string;
  };
  createdAt?: string;
}

export interface AuditLogEntry {
  _id: string;
  id?: string;
  actorId: string;
  actorName: string;
  actorEmail: string;
  action: string;
  module: string;
  resourceId?: string;
  changeSummary: string;
  result: 'success' | 'failure' | 'warning';
  ipAddress?: string;
  timestamp: string;
  metadata?: any;
}

export interface AdminSessionInfo {
  _id: string;
  id?: string;
  userId: string;
  userEmail: string;
  device: string;
  ipAddress: string;
  lastActiveAt: string;
  expiresAt: string;
  revokedAt?: string | null;
}

export interface AdminDashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingInvitations: number;
  availableRoles: number;
}

export interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface IndustryDetail {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
  iconName: string;
  categoryGroup: 'software' | 'engineering' | 'operations';
  heroHeadline: string;
  heroDescription: string;
  overview: {
    summary: string;
    marketContext: string;
    keyDeliverables: string[];
  };
  challenges: {
    title: string;
    description: string;
  }[];
  capabilities: {
    title: string;
    description: string;
    highlights: string[];
  }[];
  applicableServices: {
    title: string;
    slug: string;
    description: string;
  }[];
  relatedProjectSlugs: string[];
  useCases: {
    title: string;
    challenge: string;
    solution: string;
    outcome: string;
  }[];
}

// ==========================================
// PHASE 11: NOTIFICATIONS, EMAILS & REMINDERS
// ==========================================

export type NotificationCategory =
  | 'inquiry'
  | 'cms'
  | 'user_management'
  | 'reminder'
  | 'security'
  | 'system';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'urgent';

export interface InAppNotification {
  _id: string;
  id?: string;
  recipientId?: string | null;
  recipientRole?: string;
  title: string;
  message: string;
  category: NotificationCategory;
  type: NotificationType;
  relatedResourceId?: string | null;
  relatedResourceType?: string;
  actionUrl?: string | null;
  isRead: boolean;
  readAt?: string | null;
  isArchived?: boolean;
  createdAt: string;
}

export type EmailDeliveryStatus = 'pending' | 'processing' | 'sent' | 'failed' | 'retrying';

export interface EmailLogEntry {
  _id: string;
  id?: string;
  recipient: string;
  recipientName?: string;
  subject: string;
  templateId?: string;
  templateName?: string;
  category: string;
  relatedResourceId?: string;
  status: EmailDeliveryStatus;
  providerMessageId?: string;
  attemptCount: number;
  lastAttemptAt: string;
  sentAt?: string | null;
  failureReason?: string | null;
  idempotencyKey?: string;
  createdAt: string;
}

export interface EmailTemplateItem {
  _id: string;
  id?: string;
  slug: string;
  name: string;
  category: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  description?: string;
  isActive: boolean;
  isSystem: boolean;
  updatedAt?: string;
}

export interface NotificationPreferenceCategory {
  inApp: boolean;
  email: boolean;
}

export interface NotificationPreferences {
  _id?: string;
  userId?: string;
  categories: {
    inquiry: NotificationPreferenceCategory;
    assignment: NotificationPreferenceCategory;
    statusUpdate: NotificationPreferenceCategory;
    cms: NotificationPreferenceCategory;
    userManagement: NotificationPreferenceCategory;
    reminder: NotificationPreferenceCategory;
    security: NotificationPreferenceCategory;
  };
  frequency: 'immediate' | 'daily_digest';
  updatedAt?: string;
}

export type ReminderStatus = 'pending' | 'completed' | 'cancelled';
export type ReminderPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ReminderItem {
  _id: string;
  id?: string;
  inquiryId?: string;
  inquiryReference?: string;
  clientName?: string;
  assignedTo: string;
  assignedToName?: string;
  assignedToEmail?: string;
  createdBy: string;
  createdByName?: string;
  title: string;
  description?: string;
  dueAt: string;
  status: ReminderStatus;
  priority: ReminderPriority;
  completedAt?: string | null;
  completedBy?: string | null;
  notificationSent?: boolean;
  createdAt: string;
  updatedAt: string;
}


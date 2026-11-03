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

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'editor';
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

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
  | 'New'
  | 'Reviewing'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Won'
  | 'Lost'
  | 'Archived';

export interface ProjectInquiry {
  _id?: string;
  referenceNumber: string;
  service: InquiryServiceCategory;
  projectRequirements: string;
  budgetRange: string;
  timeline: string;
  clientName: string;
  email: string;
  companyName: string;
  phoneNumber?: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
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

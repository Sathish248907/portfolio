import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { StartProjectPage } from '../pages/StartProjectPage';
import { AdminInquiriesPage } from '../pages/admin/AdminInquiriesPage';
import { AdminInquiryDetailPage } from '../pages/admin/AdminInquiryDetailPage';
import { ClientCommunication } from '../components/inquiry/ClientCommunication';
import { AuthContext } from '../context/AuthContext';
import { api } from '../lib/api';
import { inquiryApi } from '../services/api/inquiryApi';
import { ProjectInquiry } from '../types';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

const mockInquiry: ProjectInquiry = {
  _id: 'inq-6721',
  referenceNumber: 'PH-ENG-2026-9901',
  service: 'Web Development',
  selectedServices: ['Web Development', 'FinTech'],
  clientName: 'Julian Sterling',
  companyName: 'Sterling Global Capital',
  jobTitle: 'Chief Technology Officer',
  country: 'United Kingdom',
  email: 'j.sterling@sterlingcap.com',
  phoneNumber: '+44 20 7946 0912',
  projectTitle: 'Institutional Asset Tokenization Portal',
  projectDescription: 'High-speed institutional interface for automated settlement and vault reserves custody.',
  projectOverview: 'High-speed institutional interface for automated settlement and vault reserves custody.',
  projectRequirements: 'High-speed institutional interface for automated settlement and vault reserves custody.',
  detailedRequirements: 'Microservices architecture with REST, FIX and WebSocket endpoints.',
  projectObjectives: '1. Ultra-low latency execution\n2. Real-time reserve audit\n3. Full regulatory compliance',
  requiredFeatures: 'Automated order matching, custody multi-sig vault, real-time telemetry dashboard',
  technicalRequirements: 'React 18, Node.js, Redis, PostgreSQL, Kubernetes',
  deliverables: 'Architecture blueprint, complete source code, deployment Helm charts',
  preferredTechnology: 'React, Node.js, TypeScript',
  industry: 'Banking & Financial Services',
  projectType: 'Enterprise System Modernization',
  budgetRange: '$100,000 - $250,000',
  customBudget: '$175,000',
  budgetCurrency: 'USD',
  timeline: '3 - 6 months',
  expectedTimeline: '3 - 6 months',
  startPreference: 'Within 2 weeks',
  expectedStartDate: 'Within 2 weeks',
  urgency: 'High',
  preferredContactMethod: 'Video Meeting',
  status: 'UNDER_REVIEW',
  priority: 'high',
  assignedTo: {
    name: 'Maya Chen',
    email: 'mchen@peacehaven.tech',
    role: 'FinTech Principal',
  },
  internalNotes: [
    {
      id: 'note-1',
      author: 'Maya Chen',
      text: 'Completed preliminary security architecture review.',
      createdAt: '2026-03-05T10:00:00.000Z',
    },
  ],
  auditHistory: [
    {
      action: 'CREATED',
      changedBy: 'j.sterling@sterlingcap.com',
      timestamp: '2026-03-05T08:00:00.000Z',
      notes: 'Initial client engagement inquiry submitted.',
    },
    {
      action: 'STATUS_UPDATED',
      changedBy: 'Maya Chen',
      timestamp: '2026-03-05T09:30:00.000Z',
      notes: 'Transitioned from NEW to UNDER_REVIEW.',
    },
  ],
  communicationHistory: [
    {
      id: 'comm-1',
      type: 'email',
      direction: 'sent',
      senderEmail: 'inquiries@peacehaven.tech',
      senderName: 'Peace Haven Solutions Team',
      recipientEmail: 'j.sterling@sterlingcap.com',
      subject: 'Inquiry Acknowledgment [Ref: PH-ENG-2026-9901]',
      body: 'Thank you for submitting your project requirements. Our engineering team has begun reviewing your specifications.',
      templateSlug: 'inquiry_acknowledgment',
      status: 'DELIVERED',
      sentAt: '2026-03-05T08:05:00.000Z',
    },
  ],
  createdAt: '2026-03-05T08:00:00.000Z',
  updatedAt: '2026-03-05T10:00:00.000Z',
};

const mockTemplates = [
  {
    slug: 'inquiry_acknowledgment',
    name: '1. Inquiry Acknowledgment & Reference Code',
    subject: 'Inquiry Acknowledgment [Ref: {{referenceNumber}}] – Peace Haven Technology',
    category: 'acknowledgment',
    body: 'Dear {{clientName}},\n\nThank you for submitting your project requirements for {{projectTitle}}.\n\nYour inquiry reference code is {{referenceNumber}}.',
  },
  {
    slug: 'schedule_discussion',
    name: '5. Schedule Discovery & Architecture Discussion',
    subject: 'Discovery Session Invitation [Ref: {{referenceNumber}}] – Peace Haven',
    category: 'meeting',
    body: 'Dear {{clientName}},\n\nOur engineering leads have reviewed your specifications for {{companyName}}.\n\nWe would like to invite you to a 30-minute discovery session.',
  },
  {
    slug: 'project_proposal',
    name: '7. Project Proposal & Technical Blueprint Submission',
    subject: 'Technical Proposal & Implementation Blueprint [Ref: {{referenceNumber}}]',
    category: 'proposal',
    body: 'Dear {{clientName}},\n\nPlease find attached the formal technical proposal for {{projectTitle}}.',
  },
];

vi.mock('../lib/api', () => ({
  api: {
    submitInquiry: vi.fn(),
    getAdminInquiriesWithMetrics: vi.fn(),
    updateInquiry: vi.fn(),
    addInquiryNote: vi.fn(),
    deleteInquiry: vi.fn(),
  },
}));

vi.mock('../services/api/inquiryApi', () => ({
  inquiryApi: {
    getInquiryByRef: vi.fn(),
    getInquiriesWithMetrics: vi.fn(),
    updateInquiry: vi.fn(),
    updateInquiryPriority: vi.fn(),
    addInternalNote: vi.fn(),
    getClientCommunicationTemplates: vi.fn(),
    getCommunicationHistory: vi.fn(),
    sendClientEmail: vi.fn(),
  },
}));

describe('Peace Haven — Project Engagement Form, Admin Integration & Client Communication', () => {
  const mockAuthContext = {
    user: { id: 'admin-1', name: 'Maya Chen', email: 'mchen@peacehaven.tech', role: 'superadmin' as const },
    token: 'valid-test-jwt-token',
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (inquiryApi.getClientCommunicationTemplates as any).mockResolvedValue({
      success: true,
      data: mockTemplates,
    });
  });

  describe('1. Five-Step Project Engagement Intake Form (/start-a-project)', () => {
    it('successfully navigates through all 5 steps with new fields and submits inquiry', async () => {
      (api.submitInquiry as any).mockResolvedValueOnce({
        success: true,
        referenceNumber: 'PH-ENG-2026-9901',
        message: 'Project engagement successfully registered.',
      });

      render(
        <MemoryRouter initialEntries={['/start-a-project']}>
          <StartProjectPage />
        </MemoryRouter>
      );

      // STEP 1: Contact Information
      expect(screen.getByText(/Contact & Organization Information/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Full Name \*/i), { target: { value: 'Julian Sterling' } });
      fireEvent.change(screen.getByLabelText(/Business Email \*/i), { target: { value: 'j.sterling@sterlingcap.com' } });
      fireEvent.change(screen.getByLabelText(/Company \/ Organization Name \*/i), { target: { value: 'Sterling Global Capital' } });
      fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '+44 20 7946 0912' } });
      fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Chief Technology Officer' } });

      const nextToStep2Btn = screen.getByRole('button', { name: /Continue to Step 2/i });
      fireEvent.click(nextToStep2Btn);

      // STEP 2: Service Selection & Project Context
      expect(await screen.findByText(/Select Required Services/i)).toBeInTheDocument();
      const fintechCard = screen.getByText('FinTech');
      fireEvent.click(fintechCard);

      const nextToStep3Btn = screen.getByRole('button', { name: /Continue to Step 3/i });
      fireEvent.click(nextToStep3Btn);

      // STEP 3: Project Requirements & Technical Objectives
      expect(await screen.findByText(/Project Requirements & Scope/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Project Title \*/i), {
        target: { value: 'Institutional Asset Tokenization Portal' },
      });
      fireEvent.change(screen.getByLabelText(/Project Description & Requirements \*/i), {
        target: { value: 'High-speed institutional interface for automated settlement and vault reserves custody.' },
      });
      fireEvent.change(screen.getByLabelText(/Industry \*/i), {
        target: { value: 'Banking & Financial Services' },
      });
      fireEvent.change(screen.getByLabelText(/Main Project Objectives/i), {
        target: { value: '1. Ultra-low latency execution 2. Real-time reserve audit' },
      });
      fireEvent.change(screen.getByLabelText(/Required Features & Capabilities/i), {
        target: { value: 'Automated order matching, custody multi-sig vault' },
      });

      const nextToStep4Btn = screen.getByRole('button', { name: /Continue to Step 4/i });
      fireEvent.click(nextToStep4Btn);

      // STEP 4: Budget, Timeline & Urgency
      expect(await screen.findByText(/Budget & Additional Details/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Or Specify Custom Budget Amount/i), { target: { value: '$175,000' } });
      
      const urgentBtn = screen.getByRole('button', { name: 'High' });
      fireEvent.click(urgentBtn);

      const videoContactBtn = screen.getByRole('button', { name: 'Video Meeting' });
      fireEvent.click(videoContactBtn);

      const nextToStep5Btn = screen.getByRole('button', { name: /Continue to Step 5/i });
      fireEvent.click(nextToStep5Btn);

      // STEP 5: Final Review & Submission
      expect(await screen.findByText(/Review & Verify Project Specification/i)).toBeInTheDocument();
      expect(screen.getByText('Julian Sterling')).toBeInTheDocument();
      expect(screen.getByText('Sterling Global Capital')).toBeInTheDocument();
      expect(screen.getByText('j.sterling@sterlingcap.com')).toBeInTheDocument();
      expect(screen.getByText('Institutional Asset Tokenization Portal')).toBeInTheDocument();
      expect(screen.getByText(/USD \$175,000/i)).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
      expect(screen.getByText('Video Meeting')).toBeInTheDocument();

      // Submit Form
      const submitBtn = screen.getByRole('button', { name: /Submit Inquiry/i });
      fireEvent.click(submitBtn);

      // Confirmation View
      await waitFor(() => {
        expect(api.submitInquiry).toHaveBeenCalledTimes(1);
      });
      expect(await screen.findByText('PH-ENG-2026-9901')).toBeInTheDocument();
      expect(screen.getByText(/Project Intake Confirmed/i)).toBeInTheDocument();
      expect(screen.getByText(/inquiries@peacehaven\.tech/i)).toBeInTheDocument();
      expect(screen.getByText(/\+1 \(415\) 890-3345/i)).toBeInTheDocument();
    });
  });

  describe('2. Admin Inquiries Dashboard (/admin/inquiries)', () => {
    it('renders metrics cards, pipeline tracking bar, and inquiry table columns', async () => {
      (api.getAdminInquiriesWithMetrics as any).mockResolvedValueOnce({
        inquiries: [mockInquiry],
        metrics: {
          total: 1,
          new: 0,
          inProgress: 1,
          qualified: 0,
          converted: 0,
          rejected: 0,
          underReview: 1,
          needMoreInfo: 0,
          inDiscussion: 0,
          proposalSent: 0,
          closed: 0,
        },
      });

      render(
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter>
            <AdminInquiriesPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      // Verify Dashboard Header
      expect(screen.getByText(/Project Inquiries & Lead Management/i)).toBeInTheDocument();

      // Verify Metrics Cards
      expect(await screen.findByText('Total Inquiries')).toBeInTheDocument();
      expect(screen.getByText('New Inquiries')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Qualified Leads')).toBeInTheDocument();
      expect(screen.getByText('Closed / Rejected')).toBeInTheDocument();

      // Verify Pipeline Stage Breakdown Cards
      expect(screen.getAllByText('Under Review').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Need More Info')).toBeInTheDocument();
      expect(screen.getByText('In Discussion')).toBeInTheDocument();
      expect(screen.getByText('Proposals Sent')).toBeInTheDocument();

      // Verify Table Columns
      expect(screen.getByRole('columnheader', { name: /Reference ID/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Client/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Company/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Email/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Service/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Project/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Budget/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Submitted/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Status/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Assigned To/i })).toBeInTheDocument();

      // Verify Table Row Contents
      expect(screen.getByText('PH-ENG-2026-9901')).toBeInTheDocument();
      expect(screen.getByText('Julian Sterling')).toBeInTheDocument();
      expect(screen.getByText('Sterling Global Capital')).toBeInTheDocument();
      expect(screen.getByText('j.sterling@sterlingcap.com')).toBeInTheDocument();
    });
  });

  describe('3. Admin Inquiry Details Page (/admin/inquiries/:id)', () => {
    it('renders all 6 structured sections (A to F) with complete specifications', async () => {
      (inquiryApi.getInquiryByRef as any).mockResolvedValueOnce({
        success: true,
        data: mockInquiry,
      });
      (inquiryApi.getClientCommunicationTemplates as any).mockResolvedValueOnce({
        success: true,
        data: mockTemplates,
      });

      render(
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter initialEntries={['/admin/inquiries/PH-ENG-2026-9901']}>
            <Routes>
              <Route path="/admin/inquiries/:id" element={<AdminInquiryDetailPage />} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );

      // Header Reference
      expect(await screen.findByText('PH-ENG-2026-9901')).toBeInTheDocument();

      // SECTION A: Client Profile
      expect(screen.getByText(/A\. Client Profile & Organization Details/i)).toBeInTheDocument();
      expect(screen.getByText('Julian Sterling')).toBeInTheDocument();
      expect(screen.getByText('Sterling Global Capital')).toBeInTheDocument();
      expect(screen.getByText('Chief Technology Officer')).toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();

      // SECTION B: Selected Services
      expect(screen.getByText(/B\. Selected Services/i)).toBeInTheDocument();

      // SECTION C: Project Requirements
      expect(screen.getByText(/C\. Project Requirements & Scope/i)).toBeInTheDocument();
      expect(screen.getByText('Institutional Asset Tokenization Portal')).toBeInTheDocument();
      expect(screen.getByText(/1\. Ultra-low latency execution/i)).toBeInTheDocument();
      expect(screen.getByText(/Automated order matching/i)).toBeInTheDocument();

      // SECTION D: Budget & Timeline
      expect(screen.getByText(/D\. Budget, Currency & Timeline Specifications/i)).toBeInTheDocument();
      expect(screen.getByText('$175,000')).toBeInTheDocument();
      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
      expect(screen.getByText('Video Meeting')).toBeInTheDocument();

      // SECTION E: Inquiry Management
      expect(screen.getByText(/E\. Inquiry Management/i)).toBeInTheDocument();
      expect(screen.getByText(/Internal Notes \(1\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Completed preliminary security architecture review/i)).toBeInTheDocument();
      expect(screen.getByText(/Audit Trail/i)).toBeInTheDocument();

      // SECTION F: Client Communication
      expect(screen.getByText(/Client Communication & Email Response/i)).toBeInTheDocument();
      expect(screen.getByText(/Inquiry Acknowledgment \[Ref: PH-ENG-2026-9901\]/i)).toBeInTheDocument();
    });

    it('updates priority tier when clicking priority button', async () => {
      (inquiryApi.getInquiryByRef as any).mockResolvedValueOnce({
        success: true,
        data: mockInquiry,
      });
      (inquiryApi.updateInquiryPriority as any).mockResolvedValueOnce({
        success: true,
        data: { ...mockInquiry, priority: 'urgent' },
      });
      (inquiryApi.getClientCommunicationTemplates as any).mockResolvedValueOnce({
        success: true,
        data: mockTemplates,
      });

      render(
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter initialEntries={['/admin/inquiries/PH-ENG-2026-9901']}>
            <Routes>
              <Route path="/admin/inquiries/:id" element={<AdminInquiryDetailPage />} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(await screen.findByText('PH-ENG-2026-9901')).toBeInTheDocument();
      const urgentBtn = screen.getByRole('button', { name: /Urgent \/ Critical/i });
      fireEvent.click(urgentBtn);

      await waitFor(() => {
        expect(inquiryApi.updateInquiryPriority).toHaveBeenCalledWith(
          'valid-test-jwt-token',
          'PH-ENG-2026-9901',
          'urgent'
        );
      });
    });
  });

  describe('4. Client Communication System (ClientCommunication)', () => {
    it('populates email template with token substitution, adds attachment, and dispatches email', async () => {
      (inquiryApi.getClientCommunicationTemplates as any).mockResolvedValueOnce({
        success: true,
        data: mockTemplates,
      });
      (inquiryApi.sendClientEmail as any).mockResolvedValueOnce({
        success: true,
        message: 'Official client communication dispatched successfully.',
        inquiry: {
          ...mockInquiry,
          lastCommunicatedAt: new Date().toISOString(),
          communicationHistory: [
            ...(mockInquiry.communicationHistory || []),
            {
              id: 'comm-2',
              type: 'email',
              direction: 'sent',
              senderEmail: 'mchen@peacehaven.tech',
              senderName: 'Maya Chen',
              recipientEmail: 'j.sterling@sterlingcap.com',
              subject: 'Discovery Session Invitation [Ref: PH-ENG-2026-9901] – Peace Haven',
              body: 'Dear Julian Sterling,\n\nOur engineering leads have reviewed your specifications for Sterling Global Capital.',
              templateSlug: 'schedule_discussion',
              status: 'SENT',
              sentAt: new Date().toISOString(),
            },
          ],
        },
      });

      const onCommunicationSentMock = vi.fn();

      render(
        <ClientCommunication
          inquiry={mockInquiry}
          token="valid-test-jwt-token"
          adminName="Maya Chen"
          adminEmail="mchen@peacehaven.tech"
          onCommunicationSent={onCommunicationSentMock}
        />
      );

      expect(screen.getByText(/Client Communication & Email Response/i)).toBeInTheDocument();

      // Wait for Templates to load into DOM
      await screen.findByText('5. Schedule Discovery & Architecture Discussion');

      const templateSelect = screen.getByRole('combobox');
      fireEvent.change(templateSelect, { target: { value: 'schedule_discussion' } });

      // Verify Token Replacement
      const messageBody = screen.getByPlaceholderText(/Type your response to the client or select a template above/i) as HTMLTextAreaElement;
      expect(messageBody.value).toContain('Dear Julian Sterling');
      expect(messageBody.value).toContain('Sterling Global Capital');

      // Add Simulated Attachment
      const attachInput = screen.getByPlaceholderText(/e\.g\. peace_haven_scoping_brief_v1\.pdf/i);
      fireEvent.change(attachInput, { target: { value: 'PeaceHaven_Architecture_Brief.pdf' } });
      const addAttachBtn = screen.getByRole('button', { name: /Attach/i });
      fireEvent.click(addAttachBtn);

      expect(screen.getByText('PeaceHaven_Architecture_Brief.pdf')).toBeInTheDocument();

      // Dispatch Communication
      const sendBtn = screen.getByRole('button', { name: /Send Email to Client/i });
      fireEvent.click(sendBtn);

      await waitFor(() => {
        expect(inquiryApi.sendClientEmail).toHaveBeenCalledWith(
          'valid-test-jwt-token',
          'PH-ENG-2026-9901',
          expect.objectContaining({
            recipientEmail: 'j.sterling@sterlingcap.com',
            templateSlug: 'schedule_discussion',
            attachments: expect.arrayContaining([
              expect.objectContaining({ fileName: 'PeaceHaven_Architecture_Brief.pdf' }),
            ]),
          })
        );
      });

      expect(await screen.findByText(/Email dispatched successfully to j\.sterling@sterlingcap\.com/i)).toBeInTheDocument();
      expect(onCommunicationSentMock).toHaveBeenCalledTimes(1);
    });
  });
});

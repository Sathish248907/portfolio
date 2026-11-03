import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ContactPage } from '../pages/ContactPage';
import { StartProjectPage } from '../pages/StartProjectPage';
import { AdminInquiriesPage } from '../pages/admin/AdminInquiriesPage';
import { AuthContext } from '../context/AuthContext';
import { api } from '../lib/api';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

vi.mock('../lib/api', () => ({
  api: {
    submitContact: vi.fn().mockResolvedValue({ success: true, message: 'Message sent successfully.' }),
    submitInquiry: vi.fn().mockResolvedValue({
      success: true,
      referenceNumber: 'PH-MWTEST26-4821',
      message: 'Inquiry registered.',
    }),
    getAdminInquiriesWithMetrics: vi.fn().mockResolvedValue({
      inquiries: [
        {
          _id: 'inq-001',
          referenceNumber: 'PH-MWTEST26-4821',
          service: 'Web Development',
          selectedServices: ['Web Development', 'FinTech'],
          clientName: 'Elena Rostova',
          companyName: 'Vanguard Global Financials',
          jobTitle: 'VP of Technology',
          country: 'United States',
          email: 'elena@vanguardfin.com',
          phoneNumber: '+1-555-901-2345',
          projectTitle: 'Enterprise Precious Metals Custody Gateway',
          projectDescription: 'A high-throughput FIX-compliant transaction engine connecting vaulted physical bullion inventory with institutional investors.',
          projectRequirements: 'A high-throughput FIX-compliant transaction engine connecting vaulted physical bullion inventory with institutional investors.',
          industry: 'Banking & Financial Services',
          projectType: 'Enterprise System Modernization',
          deliverables: 'Architecture blueprint, microservices backend, reactive UI',
          preferredTechnology: 'React, Node.js, MongoDB',
          timeline: '3 - 6 months',
          budgetRange: '$100,000 - $250,000 (Enterprise Infrastructure)',
          startPreference: 'Within 2 weeks',
          status: 'NEW',
          assignedTo: { name: 'Maya Chen', email: 'mchen@peacehaven.tech', role: 'FinTech Principal' },
          internalNotes: [
            { id: 'note-1', text: 'Initial scoping session scheduled.', author: 'Maya Chen', createdAt: '2026-03-01T10:00:00.000Z' }
          ],
          auditHistory: [
            { action: 'CREATED', changedBy: 'elena@vanguardfin.com', timestamp: '2026-03-01T09:00:00.000Z' }
          ],
          createdAt: '2026-03-01T09:00:00.000Z',
        },
        {
          _id: 'inq-002',
          referenceNumber: 'PH-MWTEST26-9932',
          service: 'Robotics & Automation',
          selectedServices: ['Robotics & Automation'],
          clientName: 'Dr. Michael Vance',
          companyName: 'Apex Robotics Systems',
          email: 'mvance@apexrobotics.io',
          projectTitle: 'Warehouse AMR Fleet Dispatcher',
          projectDescription: 'LiDAR-guided obstacle avoidance and fleet dispatch orchestrator for 30 autonomous robots.',
          projectRequirements: 'LiDAR-guided obstacle avoidance and fleet dispatch orchestrator for 30 autonomous robots.',
          industry: 'Manufacturing & Industrial Automation',
          timeline: '1 - 3 months',
          budgetRange: '$50,000 - $100,000 (Production System Build)',
          status: 'REVIEWING',
          assignedTo: { name: 'David Kim', email: 'dkim@peacehaven.tech', role: 'Robotics & Automation Lead' },
          createdAt: '2026-03-02T11:00:00.000Z',
        }
      ],
      metrics: {
        total: 2,
        new: 1,
        inProgress: 1,
        qualified: 0,
        converted: 0,
        rejected: 0,
      }
    }),
    updateInquiry: vi.fn().mockResolvedValue({ success: true }),
    addInquiryNote: vi.fn().mockResolvedValue({ success: true }),
    deleteInquiry: vi.fn().mockResolvedValue({ success: true }),
  },
}));

describe('Phase 6 — Advanced Project Inquiry & Lead Management System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('1. Contact Page Upgrade (/contact)', () => {
    it('renders exact heading and description required by Phase 6 specification', () => {
      render(
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      );

      // Verify exact heading
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Let's Build Something Extraordinary.");

      // Verify exact description
      expect(
        screen.getByText(
          /Have an idea, business challenge or technology requirement\? Connect with Peace Haven and explore how we can turn your vision into a practical technology solution\./i
        )
      ).toBeInTheDocument();
    });

    it('renders all 5 inquiry channels', () => {
      render(
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      );

      expect(screen.getByText('Project Inquiry')).toBeInTheDocument();
      expect(screen.getByText('Business Collaboration')).toBeInTheDocument();
      expect(screen.getByText('Technology Consultation')).toBeInTheDocument();
      expect(screen.getByText('Partnership Opportunities')).toBeInTheDocument();
      expect(screen.getByText('General Enquiries')).toBeInTheDocument();
    });

    it('displays verified contact channels and link to Guided Project Intake', () => {
      render(
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      );

      expect(screen.getByText('inquiries@peacehaven.tech')).toBeInTheDocument();
      expect(screen.getByText(/Site No 71, SNV Garden Main Rd/i)).toBeInTheDocument();
      expect(screen.getByText('+1 (800) 555-0199')).toBeInTheDocument();
      expect(screen.getByText(/Guaranteed within 24 business hours/i)).toBeInTheDocument();

      // CTA button linking to Start Project
      const startProjectLink = screen.getByRole('link', { name: /Start a Project/i });
      expect(startProjectLink).toHaveAttribute('href', '/start-a-project');
    });

    it('submits contact form with selected inquiry channel', async () => {
      render(
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/Your Full Name \*/i), { target: { value: 'Dr. Jane Foster' } });
      fireEvent.change(screen.getByLabelText(/Corporate Email \*/i), { target: { value: 'jane@astrolabs.org' } });
      fireEvent.change(screen.getByLabelText(/Message & Operational Requirements \*/i), {
        target: { value: 'We are seeking research collaboration in drone thermography sensors.' },
      });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      await waitFor(() => {
        expect(api.submitContact).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Dr. Jane Foster',
            email: 'jane@astrolabs.org',
          })
        );
      });
      expect(await screen.findByText(/Transmission Successful/i)).toBeInTheDocument();
    });
  });

  describe('2. Advanced Project Inquiry Form (/start-a-project)', () => {
    it('walks through the 5-step intake workflow and submits successfully', async () => {
      render(
        <MemoryRouter>
          <StartProjectPage />
        </MemoryRouter>
      );

      // STEP 1: Contact Information
      expect(screen.getByText(/Step 1 of 5/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact & Organization Information/i)).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/Full Name \*/i), { target: { value: 'Elena Rostova' } });
      fireEvent.change(screen.getByLabelText(/Business Email \*/i), { target: { value: 'elena@vanguardfin.com' } });
      fireEvent.change(screen.getByLabelText(/Company \/ Organization Name \*/i), { target: { value: 'Vanguard Global' } });
      fireEvent.change(screen.getByLabelText(/Job Title \/ Role/i), { target: { value: 'VP of Technology' } });
      fireEvent.change(screen.getByLabelText(/Country \/ Region/i), { target: { value: 'United States' } });

      fireEvent.click(screen.getByRole('button', { name: /Continue to Step 2/i }));

      // STEP 2: Select Services (Multi-service)
      expect(await screen.findByText(/Step 2 of 5/i)).toBeInTheDocument();
      expect(screen.getByText(/Select Required Services/i)).toBeInTheDocument();

      // Click FinTech to select both Web Development and FinTech
      fireEvent.click(screen.getByText('FinTech'));
      expect(screen.getByText(/Selected \(2\):/i)).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Continue to Step 3/i }));

      // STEP 3: Project Requirements
      expect(await screen.findByText(/Step 3 of 5/i)).toBeInTheDocument();
      expect(screen.getByText(/Project Requirements & Scope/i)).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/Project Title \*/i), {
        target: { value: 'Enterprise Bullion Trading & Settlement Platform' },
      });
      fireEvent.change(screen.getByLabelText(/Project Description & Requirements \*/i), {
        target: { value: 'We need an automated settlement gateway with fractional bullion accounting, live market rates, and vault custodian integration.' },
      });
      fireEvent.change(screen.getByLabelText(/Industry \*/i), {
        target: { value: 'Banking & Financial Services' },
      });

      fireEvent.click(screen.getByRole('button', { name: /Continue to Step 4/i }));

      // STEP 4: Budget & Timeline
      expect(await screen.findByText(/Step 4 of 5/i)).toBeInTheDocument();
      expect(screen.getByText(/Budget & Additional Details/i)).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Continue to Step 5/i }));

      // STEP 5: Review & Submit
      expect(await screen.findByText(/Step 5 of 5/i)).toBeInTheDocument();
      expect(screen.getByText(/Review & Verify Project Specification/i)).toBeInTheDocument();
      expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
      expect(screen.getByText('Vanguard Global')).toBeInTheDocument();
      expect(screen.getByText(/Enterprise Bullion Trading & Settlement Platform/i)).toBeInTheDocument();

      // Submit Form
      fireEvent.click(screen.getByRole('button', { name: /Submit Inquiry/i }));

      await waitFor(() => {
        expect(api.submitInquiry).toHaveBeenCalledWith(
          expect.objectContaining({
            clientName: 'Elena Rostova',
            companyName: 'Vanguard Global',
            email: 'elena@vanguardfin.com',
            projectTitle: 'Enterprise Bullion Trading & Settlement Platform',
          })
        );
      });

      // Verify Reference Number Confirmation
      expect(await screen.findByText('PH-MWTEST26-4821')).toBeInTheDocument();
      expect(screen.getByText(/Project Intake Confirmed/i)).toBeInTheDocument();
    });
  });

  describe('3. Inquiry Management Dashboard (/admin/inquiries)', () => {
    const mockAuthContext = {
      user: { id: 'admin-1', name: 'Executive Admin', email: 'admin@peacehaven.tech', role: 'superadmin' as const },
      token: 'valid-test-token',
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    };

    it('renders dashboard overview metrics cards', async () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter>
            <AdminInquiriesPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByText('Project Inquiries & Lead Management')).toBeInTheDocument();
      expect(await screen.findByText('Total Inquiries')).toBeInTheDocument();
      expect(screen.getByText('New Inquiries')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Qualified Leads')).toBeInTheDocument();
      expect(screen.getByText('Closed / Rejected')).toBeInTheDocument();
    });

    it('displays inquiries list with client details, services badges, budget, and status', async () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter>
            <AdminInquiriesPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(await screen.findByText('PH-MWTEST26-4821')).toBeInTheDocument();
      expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
      expect(screen.getByText('Vanguard Global Financials')).toBeInTheDocument();
      expect(screen.getByText('Maya Chen')).toBeInTheDocument();

      expect(screen.getByText('PH-MWTEST26-9932')).toBeInTheDocument();
      expect(screen.getByText('Dr. Michael Vance')).toBeInTheDocument();
      expect(screen.getByText('Apex Robotics Systems')).toBeInTheDocument();
    });

    it('opens inquiry dossier modal upon clicking Inspect', async () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter>
            <AdminInquiriesPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      // Click on Elena Rostova's row to open dossier
      const elenaCell = await screen.findByText('Elena Rostova');
      fireEvent.click(elenaCell);

      expect(await screen.findByText(/Inquiry Dossier & Project Specification/i)).toBeInTheDocument();
      expect(screen.getByText(/1\. Contact & Organization Details/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Project Scope & Specifications/i)).toBeInTheDocument();
      expect(screen.getByText(/3\. Budget, Timeline & Attachments/i)).toBeInTheDocument();
      expect(screen.getByText(/Internal Lead Notes/i)).toBeInTheDocument();
      expect(screen.getByText('Initial scoping session scheduled.')).toBeInTheDocument();
    });

    it('filters inquiries by search query', async () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter>
            <AdminInquiriesPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(await screen.findByText('PH-MWTEST26-4821')).toBeInTheDocument();
      expect(screen.getByText('PH-MWTEST26-9932')).toBeInTheDocument();

      const searchInput = screen.getByPlaceholderText(/Search reference, client, company/i);
      fireEvent.change(searchInput, { target: { value: 'Apex Robotics' } });

      expect(screen.getByText('PH-MWTEST26-9932')).toBeInTheDocument();
      expect(screen.queryByText('PH-MWTEST26-4821')).not.toBeInTheDocument();
    });
  });
});

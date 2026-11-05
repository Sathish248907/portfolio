/** @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminCmsPage } from '../pages/admin/AdminCmsPage';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { ServicesPage } from '../pages/ServicesPage';
import { PortfolioPage } from '../pages/PortfolioPage';
import { IndustriesPage } from '../pages/IndustriesPage';
import { ContentPreviewModal } from '../pages/admin/cms/ContentPreviewModal';

// Mock API
vi.mock('../services/api', () => ({
  api: {
    getCmsOverview: vi.fn().mockResolvedValue({
      data: {
        metrics: {
          publishedPages: 6,
          draftPages: 0,
          publishedProjects: 10,
          draftProjects: 0,
          publishedBlogs: 3,
          draftBlogs: 0,
          totalServices: 8,
          totalIndustries: 10,
          totalMedia: 4,
        },
        recentlyUpdated: [
          { type: 'Page', title: 'Homepage', status: 'published', updatedAt: new Date().toISOString() },
        ],
        recentActivity: [
          { action: 'UPDATE', entityType: 'page', entityTitle: 'Homepage', performedBy: 'Admin Lead', timestamp: new Date().toISOString() },
        ],
      },
    }),
    getCmsPages: vi.fn().mockResolvedValue({
      data: [
        { pageId: 'home', title: 'Peace Haven | Home', slug: '/', status: 'published' },
        { pageId: 'about', title: 'About Us', slug: '/about', status: 'published' },
      ],
    }),
    getCmsPage: vi.fn().mockResolvedValue({
      data: {
        pageId: 'home',
        title: 'Peace Haven | Home',
        slug: '/',
        status: 'published',
        hero: {
          headline: 'Engineering Ideas. Empowering Industries.',
          subheadline: 'Multi-disciplinary engineering company.',
          badge: 'Engineering Firm',
          ctaText: 'Start a Project',
          ctaLink: '/start-a-project',
        },
        customContent: {
          intro: { heading: 'Company Intro', summary: 'Engineering solutions across 8 domains.' },
          cta: { title: 'Collaborate', description: 'Start now', buttonText: 'Contact', buttonLink: '/contact' },
        },
        seo: { title: 'Peace Haven Home', description: 'Innovative technology' },
      },
    }),
    getPublicPage: vi.fn().mockResolvedValue({
      pageId: 'home',
      title: 'Peace Haven | Home',
      slug: '/',
      status: 'published',
      hero: {
        headline: 'Engineering Ideas. Empowering Industries.',
        subheadline: 'Multi-disciplinary engineering company.',
        badge: 'Engineering Firm',
      },
      customContent: {
        intro: { heading: 'Company Intro', summary: 'Engineering solutions across 8 domains.' },
      },
    }),
    getCmsServices: vi.fn().mockResolvedValue({
      data: [
        { slug: 'web-dev', title: 'Web Development', division: 'Cloud & Software', status: 'published', capabilities: [] },
      ],
    }),
    getPublicServices: vi.fn().mockResolvedValue([]),
    getCmsProjects: vi.fn().mockResolvedValue({
      data: [
        { slug: 'artistry', title: 'Artistry Gold', category: 'Web Development', status: 'published' },
      ],
    }),
    getPublicProjects: vi.fn().mockResolvedValue([]),
    getCmsIndustries: vi.fn().mockResolvedValue({
      data: [
        { slug: 'banking', title: 'Banking & Finance', displayOrder: 1, shortDesc: 'Fintech systems' },
      ],
    }),
    getPublicIndustries: vi.fn().mockResolvedValue([]),
    getAdminBlogs: vi.fn().mockResolvedValue({ data: [] }),
    getCmsMedia: vi.fn().mockResolvedValue({ data: [] }),
    getCmsNavigation: vi.fn().mockResolvedValue({ data: [] }),
    getCmsSettings: vi.fn().mockResolvedValue({
      data: {
        companyName: 'Peace Haven Technologies Inc.',
        tagline: 'Engineering Ideas. Empowering Industries.',
        contactEmail: 'inquiries@peacehaven.tech',
        contactPhone: '+1 (800) 555-0199',
        address: 'Site No 71, SNV Garden Main Rd, Coimbatore',
        businessHours: 'Guaranteed within 24 business hours',
      },
    }),
    getPublicSettings: vi.fn().mockResolvedValue({
      companyName: 'Peace Haven Technologies Inc.',
      contactEmail: 'inquiries@peacehaven.tech',
      contactPhone: '+1 (800) 555-0199',
    }),
    getCmsRevisions: vi.fn().mockResolvedValue({
      data: [
        {
          _id: 'rev-1',
          entityType: 'page',
          entityTitle: 'Homepage',
          version: 2,
          modifiedBy: 'Admin Lead',
          changeSummary: 'Updated hero copy',
          createdAt: new Date().toISOString(),
        },
      ],
    }),
    updateCmsPage: vi.fn().mockResolvedValue({ success: true }),
    updateCmsSettings: vi.fn().mockResolvedValue({ success: true }),
    toggleCmsServicePublish: vi.fn().mockResolvedValue({ success: true }),
    toggleCmsProjectPublish: vi.fn().mockResolvedValue({ success: true }),
  },
}));

describe('Phase 12 — Complete Admin-to-Website CMS Integration (Frontend)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('1. Centralized Admin CMS Dashboard', () => {
    it('renders Admin CMS page with all navigation tabs', async () => {
      render(
        <BrowserRouter>
          <AdminCmsPage />
        </BrowserRouter>
      );

      expect(screen.getByText(/Content Management System \(CMS\)/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Overview$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Homepage$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Services/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Portfolio/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Industries/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^About Us$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Contact$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Settings$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Revisions$/i })).toBeInTheDocument();
    });

    it('navigates to Homepage Editor tab and renders hero copy inputs', async () => {
      render(
        <BrowserRouter>
          <AdminCmsPage />
        </BrowserRouter>
      );

      const homeTab = screen.getByRole('button', { name: /^Homepage$/i });
      fireEvent.click(homeTab);

      await waitFor(() => {
        expect(screen.getByText(/Homepage Content Management/i)).toBeInTheDocument();
        expect(screen.getByText(/Hero Section Banner/i)).toBeInTheDocument();
      });
    });

    it('navigates to About Us Editor tab', async () => {
      render(
        <BrowserRouter>
          <AdminCmsPage />
        </BrowserRouter>
      );

      const aboutTab = screen.getByRole('button', { name: /^About Us$/i });
      fireEvent.click(aboutTab);

      await waitFor(() => {
        expect(screen.getByText(/About Us Page Management/i)).toBeInTheDocument();
        expect(screen.getByText(/Engineering Creed & Principles/i)).toBeInTheDocument();
      });
    });

    it('navigates to Contact Editor tab', async () => {
      render(
        <BrowserRouter>
          <AdminCmsPage />
        </BrowserRouter>
      );

      const contactTab = screen.getByRole('button', { name: /^Contact$/i });
      fireEvent.click(contactTab);

      await waitFor(() => {
        expect(screen.getByText(/Contact Information & Desk Management/i)).toBeInTheDocument();
        expect(screen.getByText(/Official Commercial & Technical Desks/i)).toBeInTheDocument();
      });
    });

    it('navigates to Global Settings tab', async () => {
      render(
        <BrowserRouter>
          <AdminCmsPage />
        </BrowserRouter>
      );

      const settingsTab = screen.getByRole('button', { name: /^Settings$/i });
      fireEvent.click(settingsTab);

      await waitFor(() => {
        expect(screen.getByText(/Website Branding & Global Configurations/i)).toBeInTheDocument();
        expect(screen.getByText(/Header Announcement Banner/i)).toBeInTheDocument();
      });
    });

    it('navigates to Revision History tab and displays snapshots', async () => {
      render(
        <BrowserRouter>
          <AdminCmsPage />
        </BrowserRouter>
      );

      const revTab = screen.getByRole('button', { name: /^Revisions$/i });
      fireEvent.click(revTab);

      await waitFor(() => {
        expect(screen.getByText(/Revision History & Rollback System/i)).toBeInTheDocument();
        expect(screen.getByText(/Restore Version/i)).toBeInTheDocument();
      });
    });
  });

  describe('2. Responsive Content Preview Modal', () => {
    it('renders ContentPreviewModal and toggles between Desktop, Tablet, and Mobile viewports', () => {
      const mockClose = vi.fn();
      render(
        <ContentPreviewModal
          title="Homepage Preview"
          data={{
            title: 'Engineering Ideas',
            hero: { headline: 'Engineering Ideas', subheadline: 'Modern tech company', badge: 'Company' },
          }}
          type="homepage"
          onClose={mockClose}
        />
      );

      expect(screen.getByText(/Live Responsive Preview: Homepage Preview/i)).toBeInTheDocument();

      // Click Tablet
      const tabletBtn = screen.getByRole('button', { name: /Tablet/i });
      fireEvent.click(tabletBtn);
      expect(screen.getByText(/Viewport: TABLET/i)).toBeInTheDocument();

      // Click Mobile
      const mobileBtn = screen.getByRole('button', { name: /Mobile/i });
      fireEvent.click(mobileBtn);
      expect(screen.getByText(/Viewport: MOBILE/i)).toBeInTheDocument();

      // Click Close
      const closeBtn = screen.getByRole('button', { name: /Close Preview/i });
      fireEvent.click(closeBtn);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('3. Public Pages Rendering with Dynamic CMS Integration', () => {
    it('renders public HomePage with fallback and dynamic hero capability', async () => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );

      // Verify immediate SSR/static fallback presence
      expect(screen.getByText(/We turn ambitious ideas into/i)).toBeInTheDocument();

      // Verify dynamic resolution
      await waitFor(() => {
        expect(screen.getByText(/Engineering Firm/i)).toBeInTheDocument();
      });
    });

    it('renders public AboutPage with creed and principles', () => {
      render(
        <BrowserRouter>
          <AboutPage />
        </BrowserRouter>
      );

      expect(screen.getByText(/Our Engineering Creed/i)).toBeInTheDocument();
      expect(screen.getByText(/First-Principles Systems Engineering/i)).toBeInTheDocument();
    });

    it('renders public ContactPage with dynamic desk information', () => {
      render(
        <BrowserRouter>
          <ContactPage />
        </BrowserRouter>
      );

      expect(screen.getByText(/Let's Build Something Extraordinary./i)).toBeInTheDocument();
      expect(screen.getByText(/Commercial & Technical Desk/i)).toBeInTheDocument();
    });

    it('renders public ServicesPage with integrated divisions', () => {
      render(
        <BrowserRouter>
          <ServicesPage />
        </BrowserRouter>
      );

      expect(screen.getByText(/Capabilities Built Around Your Ambition./i)).toBeInTheDocument();
    });

    it('renders public PortfolioPage with laboratory case studies', () => {
      render(
        <BrowserRouter>
          <PortfolioPage />
        </BrowserRouter>
      );

      expect(screen.getByText(/Verified Systems & Case Studies/i)).toBeInTheDocument();
    });

    it('renders public IndustriesPage with sector cards', () => {
      render(
        <BrowserRouter>
          <IndustriesPage />
        </BrowserRouter>
      );

      expect(screen.getByText(/Technology That Moves Industries Forward./i)).toBeInTheDocument();
    });
  });
});

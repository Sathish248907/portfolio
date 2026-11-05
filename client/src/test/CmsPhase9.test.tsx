import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { InsightsPage } from '../pages/InsightsPage';
import { InsightDetailPage } from '../pages/InsightDetailPage';
import { AdminCmsPage } from '../pages/admin/AdminCmsPage';

describe('Phase 9 — Content Management System (CMS) & Dynamic Insights', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Public Technical Insights Hub (InsightsPage)', () => {
    it('renders the technical journal headline and search filter', async () => {
      render(
        <MemoryRouter initialEntries={['/insights']}>
          <Routes>
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: /Engineering Insights & Deep-Tech Perspectives/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Search perspectives/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'FinTech' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Robotics & Automation' })).toBeInTheDocument();
    });

    it('renders published insight articles and filter tabs', async () => {
      render(
        <MemoryRouter initialEntries={['/insights']}>
          <Routes>
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond/i)).toBeInTheDocument();
        expect(screen.getByText(/Fractional Bullion Architecture: Engineering Live Precious Metal Settlement/i)).toBeInTheDocument();
        expect(screen.getByText(/Point-of-Care Diagnostics: Accelerating Acute Myocardial Infarction Screening/i)).toBeInTheDocument();
      });
    });

    it('filters articles when typing in the search box', async () => {
      render(
        <MemoryRouter initialEntries={['/insights']}>
          <Routes>
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond/i)).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(/Search perspectives/i);
      fireEvent.change(searchInput, { target: { value: 'Bullion' } });

      await waitFor(() => {
        expect(screen.getByText(/Fractional Bullion Architecture: Engineering Live Precious Metal Settlement/i)).toBeInTheDocument();
        expect(screen.queryByText(/Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond/i)).not.toBeInTheDocument();
      });
    });

    it('filters articles by category badge click', async () => {
      render(
        <MemoryRouter initialEntries={['/insights']}>
          <Routes>
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Fractional Bullion Architecture: Engineering Live Precious Metal Settlement/i)).toBeInTheDocument();
      });

      const roboticsBtn = screen.getByRole('button', { name: 'Robotics & Automation' });
      fireEvent.click(roboticsBtn);

      await waitFor(() => {
        expect(screen.getByText(/Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond/i)).toBeInTheDocument();
        expect(screen.queryByText(/Fractional Bullion Architecture: Engineering Live Precious Metal Settlement/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Public Technical Article Reader (InsightDetailPage)', () => {
    it('renders article title, author byline, reading time, and consultation CTA', async () => {
      render(
        <MemoryRouter initialEntries={['/insights/autonomous-edge-ai-robotics-vda5050']}>
          <Routes>
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: /Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond/i })).toBeInTheDocument();
        expect(screen.getByText(/Dr\. Michael Vance/i)).toBeInTheDocument();
        expect(screen.getByText(/6 min read/i)).toBeInTheDocument();
        expect(screen.getByText(/Turn Architectural Blueprints into Production Reality\./i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Start a Project/i })).toBeInTheDocument();
      });
    });

    it('renders article tags and breadcrumbs', async () => {
      render(
        <MemoryRouter initialEntries={['/insights/autonomous-edge-ai-robotics-vda5050']}>
          <Routes>
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('#Robotics')).toBeInTheDocument();
        expect(screen.getByText('#ROS 2')).toBeInTheDocument();
        expect(screen.getAllByText('Robotics & Automation').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Admin CMS Dashboard (AdminCmsPage)', () => {
    it('renders the CMS dashboard header and tab navigation', async () => {
      render(
        <MemoryRouter>
          <AdminCmsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Content Management System \(CMS\)/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Page Management/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /6 Services/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /10 Projects/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /10 Industries/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Blog & Insights/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Media Library/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Navigation & Menus/i })).toBeInTheDocument();
      });
    });

    it('switches to Pages manager tab and displays page items', async () => {
      render(
        <MemoryRouter>
          <AdminCmsPage />
        </MemoryRouter>
      );

      const pagesTab = screen.getByRole('button', { name: /Page Management/i });
      fireEvent.click(pagesTab);

      await waitFor(() => {
        expect(screen.getByText(/Managed Website Pages/i)).toBeInTheDocument();
        expect(screen.getByText('home')).toBeInTheDocument();
        expect(screen.getByText('about')).toBeInTheDocument();
      });
    });

    it('switches to Blog & Insights tab and opens article creator modal', async () => {
      render(
        <MemoryRouter>
          <AdminCmsPage />
        </MemoryRouter>
      );

      const blogTab = screen.getByRole('button', { name: /Blog & Insights/i });
      fireEvent.click(blogTab);

      await waitFor(() => {
        expect(screen.getByText(/Technical Blog & Insights Journal/i)).toBeInTheDocument();
      });

      const newArticleBtn = screen.getAllByRole('button', { name: /New Article/i })[0];
      fireEvent.click(newArticleBtn);

      await waitFor(() => {
        expect(screen.getByText(/Create Technical Insight Article/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Article Headline/i)).toBeInTheDocument();
      });
    });

    it('switches to Media Library tab and opens upload modal', async () => {
      render(
        <MemoryRouter>
          <AdminCmsPage />
        </MemoryRouter>
      );

      const mediaTab = screen.getByRole('button', { name: /Media Library/i });
      fireEvent.click(mediaTab);

      await waitFor(() => {
        expect(screen.getByText(/Media & Asset Library/i)).toBeInTheDocument();
      });

      const uploadBtn = screen.getByRole('button', { name: /Register Media Asset/i });
      fireEvent.click(uploadBtn);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Register Media Asset/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e\.g\. Robot Arm CAD Schematic/i)).toBeInTheDocument();
      });
    });

    it('switches to Navigation manager tab and displays navigation structure', async () => {
      render(
        <MemoryRouter>
          <AdminCmsPage />
        </MemoryRouter>
      );

      const navTab = screen.getByRole('button', { name: /Navigation & Menus/i });
      fireEvent.click(navTab);

      await waitFor(() => {
        expect(screen.getByText(/Navigation & Menu Structure/i)).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
      });
    });
  });
});

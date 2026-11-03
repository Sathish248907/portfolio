import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { 
  analytics, 
  getAnonymousVisitorId, 
  getSessionId, 
  getTrafficSource,
  getDeviceCategory,
  trackPageView,
  trackEvent
} from '../utils/analytics';
import { AdminAnalyticsPage } from '../pages/admin/AdminAnalyticsPage';
import { api } from '../lib/api';

describe('Phase 8 — Advanced Analytics & Visitor Tracking Engine', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('generates and persists an anonymous visitor ID in localStorage', () => {
    const id1 = getAnonymousVisitorId();
    expect(id1).toMatch(/^ph_vid_/);

    const id2 = getAnonymousVisitorId();
    expect(id2).toBe(id1);
    expect(localStorage.getItem('ph_anon_vid')).toBe(id1);
  });

  it('generates and persists a session ID in sessionStorage', () => {
    const sess1 = getSessionId();
    expect(sess1).toMatch(/^ph_sess_/);

    const sess2 = getSessionId();
    expect(sess2).toBe(sess1);
    expect(sessionStorage.getItem('ph_session_id')).toBe(sess1);
  });

  it('correctly extracts UTM attribution parameters', () => {
    // Mock window.location.search
    Object.defineProperty(window, 'location', {
      value: {
        search: '?utm_source=TechCrunch&utm_medium=referral&utm_campaign=seed_round',
        pathname: '/services/fintech',
        href: 'https://peacehaven.tech/services/fintech?utm_source=TechCrunch&utm_medium=referral&utm_campaign=seed_round',
        hostname: 'peacehaven.tech',
      },
      writable: true,
    });

    const source = getTrafficSource();
    expect(source.source).toBe('TechCrunch');
    expect(source.medium).toBe('referral');
    expect(source.campaign).toBe('seed_round');
  });

  it('defaults to Direct when no UTM parameters or referrer exist', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '',
        pathname: '/',
        href: 'https://peacehaven.tech/',
        hostname: 'peacehaven.tech',
      },
      writable: true,
    });

    const source = getTrafficSource();
    expect(source.source).toBe('Direct');
    expect(source.medium).toBe('none');
  });

  it('detects desktop device category in test environment', () => {
    const device = getDeviceCategory();
    expect(['desktop', 'mobile', 'tablet']).toContain(device);
  });

  it('dispatches page view tracking event without errors', () => {
    expect(() => {
      trackPageView('/services/robotics', 'Robotics & Automation | Peace Haven');
    }).not.toThrow();
  });

  it('dispatches high-intent interaction tracking helpers', () => {
    expect(() => {
      analytics.trackCtaClick('Start a Project', '/start-a-project', 'Hero Section');
      analytics.trackServiceView('FinTech', 'fintech');
      analytics.trackIndustryView('Healthcare & Medical', 'healthcare-medical');
      analytics.trackCaseStudyView('EB-300 Robotic Arm', 'eb-300-robotic-arm', 'Robotics');
      analytics.trackExternalLink('https://growcapital.app', 'grow-capital');
    }).not.toThrow();
  });

  it('dispatches inquiry conversion funnel events', () => {
    expect(() => {
      analytics.trackInquiryFunnel('form_start', { service: 'Web Development' });
      analytics.trackInquiryFunnel('service_selected');
      analytics.trackInquiryFunnel('requirements_entered');
      analytics.trackInquirySubmission('PH-TEST-REF-99', ['FinTech'], '$50k - $100k');
    }).not.toThrow();
  });
});

describe('Phase 8 — Admin Analytics Dashboard Page (/admin/analytics)', () => {
  beforeEach(() => {
    localStorage.setItem('ph_admin_token', 'ph-demo-jwt-token-verified-2026');
  });

  it('renders dashboard heading, live aggregation badge, and metric cards', async () => {
    render(
      <MemoryRouter>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Analytics & Conversion Intelligence')).toBeInTheDocument();
    expect(screen.getByText(/Telemetry Engine v1.0/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText('Unique Visitors')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Page Views')[0]).toBeInTheDocument();
      expect(screen.getByText('Avg Engagement')).toBeInTheDocument();
      expect(screen.getByText('Inquiries')).toBeInTheDocument();
      expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
      expect(screen.getByText('Retention')).toBeInTheDocument();
    });
  });

  it('allows switching period filters (7D, 30D, 90D, Today)', async () => {
    render(
      <MemoryRouter>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    const btn7d = screen.getByRole('button', { name: '7D' });
    const btn90d = screen.getByRole('button', { name: '90D' });
    const btnToday = screen.getByRole('button', { name: 'Today' });

    expect(btn7d).toBeInTheDocument();
    expect(btn90d).toBeInTheDocument();
    expect(btnToday).toBeInTheDocument();

    fireEvent.click(btn7d);
    await waitFor(() => {
      expect(btn7d).toHaveClass('bg-teal-700');
    });

    fireEvent.click(btn90d);
    await waitFor(() => {
      expect(btn90d).toHaveClass('bg-teal-700');
    });
  });

  it('switches to 8 Service Divisions tab and displays breakdown', async () => {
    render(
      <MemoryRouter>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    const servicesTab = screen.getByRole('button', { name: /8 Service Divisions/i });
    fireEvent.click(servicesTab);

    await waitFor(() => {
      expect(screen.getByText(/Eight Specialized Service Divisions — Demand Analytics/i)).toBeInTheDocument();
      expect(screen.getByText('Web Development')).toBeInTheDocument();
      expect(screen.getByText('FinTech')).toBeInTheDocument();
      expect(screen.getByText('Robotics & Automation')).toBeInTheDocument();
      expect(screen.getByText('Drone Technology')).toBeInTheDocument();
      expect(screen.getByText('Healthcare Solutions')).toBeInTheDocument();
      expect(screen.getByText('US Staffing')).toBeInTheDocument();
      expect(screen.getByText('Trading & Investment')).toBeInTheDocument();
      expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
    });
  });

  it('switches to 10 Industry Sectors tab and displays vertical metrics', async () => {
    render(
      <MemoryRouter>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    const indTab = screen.getByRole('button', { name: /10 Industry Sectors/i });
    fireEvent.click(indTab);

    await waitFor(() => {
      expect(screen.getByText(/Ten Industry Verticals — Market Engagement Analytics/i)).toBeInTheDocument();
      expect(screen.getByText('Information Technology & Software')).toBeInTheDocument();
      expect(screen.getByText('Banking & Financial Services')).toBeInTheDocument();
      expect(screen.getByText('Manufacturing & Industrial Automation')).toBeInTheDocument();
    });
  });

  it('switches to 10 Portfolio Projects tab and displays case studies', async () => {
    render(
      <MemoryRouter>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    const portTab = screen.getByRole('button', { name: /10 Portfolio Projects/i });
    fireEvent.click(portTab);

    await waitFor(() => {
      expect(screen.getByText(/Ten Selected Works & Laboratory Case Studies/i)).toBeInTheDocument();
      expect(screen.getByText('PH Homes')).toBeInTheDocument();
      expect(screen.getByText('Grow Capital')).toBeInTheDocument();
      expect(screen.getByText('AURAVIA')).toBeInTheDocument();
      expect(screen.getByText('EB-300 Robotic Arm')).toBeInTheDocument();
    });
  });

  it('switches to 8-Stage Conversion Funnel tab and displays all stages', async () => {
    render(
      <MemoryRouter>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    const funnelTab = screen.getByRole('button', { name: /8-Stage Conversion Funnel/i });
    fireEvent.click(funnelTab);

    await waitFor(() => {
      expect(screen.getByText(/Eight-Stage Project Inquiry & Lead Management Funnel/i)).toBeInTheDocument();
      expect(screen.getByText('Website Visitors')).toBeInTheDocument();
      expect(screen.getByText('Service or Industry Visitors')).toBeInTheDocument();
      expect(screen.getByText('Inquiry CTA Clicked')).toBeInTheDocument();
      expect(screen.getByText('Inquiry Form Started')).toBeInTheDocument();
      expect(screen.getByText('Inquiry Form Submitted')).toBeInTheDocument();
      expect(screen.getByText('Inquiry Reviewed by Admin')).toBeInTheDocument();
      expect(screen.getByText('Qualified Opportunity')).toBeInTheDocument();
      expect(screen.getByText('Converted Engagement')).toBeInTheDocument();
    });
  });

  it('triggers CSV report export action without errors', async () => {
    const exportSpy = vi.spyOn(api, 'exportAnalyticsCsv').mockResolvedValue({ success: true } as any);

    render(
      <MemoryRouter>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    const exportBtn = screen.getByRole('button', { name: /Export CSV/i });
    expect(exportBtn).toBeInTheDocument();

    const overviewExport = screen.getByText('Overview Summary');
    fireEvent.click(overviewExport);

    await waitFor(() => {
      expect(exportSpy).toHaveBeenCalledWith('ph-demo-jwt-token-verified-2026', 'overview', '30d');
    });
  });
});

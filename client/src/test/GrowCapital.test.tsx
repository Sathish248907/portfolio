import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('Grow Capital — FinTech Selected Works & Dedicated Case Study Integration', () => {
  it('includes grow-capital in FinTech service relatedProjectSlugs', () => {
    const fintechService = servicesData.find((s) => s.slug === 'fintech');
    expect(fintechService).toBeDefined();
    expect(fintechService?.relatedProjectSlugs).toContain('grow-capital');
  });

  it('contains complete verified data model for grow-capital in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'grow-capital');
    expect(project).toBeDefined();
    expect(project?.title).toBe('Grow Capital');
    expect(project?.subtitle).toBe('Digital Gold & Silver Investment Platform');
    expect(project?.category).toBe('FinTech');
    expect(project?.industry).toBe('Digital Finance & Precious Metals');
    expect(project?.statusBadge).toBe('Verified Live Production Platform');
    expect(project?.liveUrl).toBe('https://growcapital.app/');
    expect(project?.demoUrl).toBe('https://growcapital.app/');
    expect(project?.isDemonstrationOrPrototype).toBe(false);

    // Verified technology stack tags
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'FinTech',
        'Digital Gold',
        'Digital Silver',
        'Investment Platform',
        'Augmont Integration',
        'Brinks Vaults',
        'IDBI Trusteeship',
        'UPI Payments'
      ])
    );

    // Verified gallery images
    expect(project?.heroImage).toBe('/images/projects/grow-capital/grow-capital-hero.png');
    expect(project?.thumbnail).toBe('/images/projects/grow-capital/grow-capital-hero.png');
    expect(project?.galleryImages.length).toBe(6);
    expect(project?.galleryImages).toEqual(
      expect.arrayContaining([
        '/images/projects/grow-capital/grow-capital-hero.png',
        '/images/projects/grow-capital/grow-capital-metals.png',
        '/images/projects/grow-capital/grow-capital-how-it-works.png',
        '/images/projects/grow-capital/grow-capital-calculator.png',
        '/images/projects/grow-capital/grow-capital-security.png',
        '/images/projects/grow-capital/grow-capital-mobile.png'
      ])
    );
  });

  it('renders Grow Capital card within FinTech Selected Works section with live project and case study links', () => {
    render(
      <MemoryRouter initialEntries={['/services/fintech']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify Selected Works heading is present
    expect(screen.getByRole('heading', { level: 2, name: /Selected Works/i })).toBeInTheDocument();

    // Verify Grow Capital card title
    expect(screen.getByRole('heading', { level: 3, name: /Grow Capital/i })).toBeInTheDocument();

    // Verify description
    expect(
      screen.getByText(/A digital precious-metals platform that makes buying, tracking and redeeming gold and silver more accessible/i)
    ).toBeInTheDocument();

    // Verify Explore Case Study link points to /work/grow-capital
    const caseStudyLinks = screen.getAllByRole('link', { name: /Explore Case Study/i });
    expect(caseStudyLinks.some((link) => link.getAttribute('href') === '/work/grow-capital')).toBe(true);

    // Verify Visit Live Project external link points to https://growcapital.app/
    const liveProjectLinks = screen.getAllByRole('link', { name: /Visit Live Project/i });
    const growLiveLink = liveProjectLinks.find((link) => link.getAttribute('href') === 'https://growcapital.app/');
    expect(growLiveLink).toBeDefined();
    expect(growLiveLink).toHaveAttribute('href', 'https://growcapital.app/');
  });

  it('renders dedicated Case Study page at /work/grow-capital with all required sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/grow-capital']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Hero Section Heading and Subtitle
    expect(screen.getByText('Buy Real Gold & Silver Digitally. From ₹10.')).toBeInTheDocument();
    expect(
      screen.getByText(/A digital precious-metals platform making physical bullion ownership accessible through fractional purchases/i)
    ).toBeInTheDocument();

    // Browser Chrome Header
    expect(screen.getByText(/Verified Live Production Platform — Augmont Bullion Infrastructure/i)).toBeInTheDocument();

    // Section C: The Challenge
    expect(screen.getByRole('heading', { level: 2, name: /The Challenge: Modernizing Precious Metal Ownership/i })).toBeInTheDocument();
    expect(screen.getByText('High Capital Barriers')).toBeInTheDocument();
    expect(screen.getByText('Heavy Making Charges')).toBeInTheDocument();
    expect(screen.getByText('Custody & Theft Risks')).toBeInTheDocument();

    // Section D: Our Solution
    expect(screen.getByRole('heading', { level: 2, name: /Digital Gold & Silver Backed 1:1 by Physical Bullion/i })).toBeInTheDocument();
    expect(screen.getByText('Micro-Investing from ₹10')).toBeInTheDocument();
    expect(screen.getByText('Live Market Spot Rates')).toBeInTheDocument();
    expect(screen.getByText('100% Physical Allocation')).toBeInTheDocument();
    expect(screen.getByText('Insured Brinks Vaults')).toBeInTheDocument();
    expect(screen.getByText('Independent IDBI Trusteeship')).toBeInTheDocument();

    // Section: Core Platform Capabilities (11 features)
    expect(screen.getByRole('heading', { level: 2, name: /A Complete Precious Metals Investment Platform/i })).toBeInTheDocument();
    expect(screen.getAllByText('Digital Gold Purchases').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Digital Silver Purchases').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Fractional Buys from ₹10').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Live Bullion Pricing')).toBeInTheDocument();
    expect(screen.getByText('Holdings & Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Instant Buy & Sell')).toBeInTheDocument();
    expect(screen.getByText('Savings Planner (SIP)')).toBeInTheDocument();
    expect(screen.getByText('Physical Coin Redemption')).toBeInTheDocument();
    expect(screen.getAllByText('Multi-Rail Digital Payments').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('24/7 Grow Assistant')).toBeInTheDocument();
    expect(screen.getByText('Bullion KYC Workflow')).toBeInTheDocument();

    // Section: How It Works
    expect(screen.getByRole('heading', { level: 2, name: /How It Works: Four Simple Steps to Bullion Ownership/i })).toBeInTheDocument();
    expect(screen.getByText('Select Metal & Amount')).toBeInTheDocument();
    expect(screen.getByText('Instant Payment')).toBeInTheDocument();
    expect(screen.getByText('Allocated Vault Storage')).toBeInTheDocument();
    expect(screen.getByText('Sell or Deliver')).toBeInTheDocument();

    // Section: Technology & Infrastructure Partners
    expect(screen.getByRole('heading', { level: 2, name: /Institutional Technology & Infrastructure Partners/i })).toBeInTheDocument();
    expect(screen.getAllByText('Augmont Goldtech').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Brinks India').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('IDBI Trusteeship').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('NPCI & UPI Rails').length).toBeGreaterThanOrEqual(1);

    // Section: Security & Risk Disclosures
    expect(screen.getByRole('heading', { level: 2, name: /Security, Bullion Backing & Regulatory Disclosures/i })).toBeInTheDocument();
    expect(screen.getAllByText('100% Physically Backed').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Trustee Lien Protection').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Commodity Market & Regulatory Risk Notice:')).toBeInTheDocument();

    // Section: Key Engineering Highlights
    expect(screen.getByRole('heading', { level: 2, name: /Key Engineering Highlights & FinTech Outcomes/i })).toBeInTheDocument();
    expect(screen.getByText('Live Bullion Price Streaming')).toBeInTheDocument();
    expect(screen.getByText('Micro-Transaction Precision Engine')).toBeInTheDocument();
    expect(screen.getByText('Multi-Rail UPI Checkout')).toBeInTheDocument();

    // Live Project CTA
    expect(screen.getByRole('heading', { level: 3, name: /Experience Grow Capital Live/i })).toBeInTheDocument();
    const liveCtaLinks = screen.getAllByRole('link', { name: /Visit Grow Capital|Visit Live Platform/i });
    expect(liveCtaLinks.length).toBeGreaterThanOrEqual(1);
    expect(liveCtaLinks[0]).toHaveAttribute('href', 'https://growcapital.app/');

    const inquireLinks = screen.getAllByRole('link', { name: /Inquire About FinTech Solutions/i });
    expect(inquireLinks.length).toBeGreaterThanOrEqual(1);
    expect(inquireLinks[0]).toHaveAttribute('href', '/start-a-project?service=fintech');
  });
});

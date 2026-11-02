import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('PH Homes — Web Development Selected Works & Dedicated Case Study', () => {
  it('links ph-homes in Web Development service relatedProjectSlugs', () => {
    const webDevService = servicesData.find((s) => s.slug === 'web-development' || s.id === 'web-development');
    expect(webDevService).toBeDefined();
    expect(webDevService?.relatedProjectSlugs).toContain('ph-homes');
  });

  it('contains complete verified data model for ph-homes in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'ph-homes');
    expect(project).toBeDefined();
    expect(project?.title).toBe('PH Homes');
    expect(project?.subtitle).toBe('Intelligent Real Estate & Property Platform');
    expect(project?.serviceId).toBe('web-development');
    expect(project?.category).toBe('Full-Stack Web Application');
    expect(project?.industry).toBe('Real Estate Technology');
    expect(project?.statusBadge).toBe('Verified Platform Prototype');
    expect(project?.isDemonstrationOrPrototype).toBe(true);

    // Verify technologies verified in codebase
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'AI-Powered Search',
        'Socket.IO',
        'Stripe',
        'Google Maps API',
        'Tailwind CSS',
        'Vite',
        'Zod',
        'JWT',
        'Docker',
        'Vitest'
      ])
    );

    // Check authentic screenshots present
    expect(project?.heroImage).toBe('/images/projects/ph-homes/ph-homes-homepage.png');
    expect(project?.thumbnail).toBe('/images/projects/ph-homes/ph-homes-homepage.png');
    expect(project?.galleryImages.length).toBe(10);
    expect(project?.galleryImages).toEqual(
      expect.arrayContaining([
        '/images/projects/ph-homes/ph-homes-homepage.png',
        '/images/projects/ph-homes/ph-homes-agent-dashboard.png',
        '/images/projects/ph-homes/ph-homes-lead-pipeline.png',
        '/images/projects/ph-homes/ph-homes-analytics.png',
        '/images/projects/ph-homes/ph-homes-admin-dashboard.png',
        '/images/projects/ph-homes/ph-homes-agent-performance.png',
        '/images/projects/ph-homes/ph-homes-lead-details.png',
        '/images/projects/ph-homes/ph-homes-sell-valuation.png',
        '/images/projects/ph-homes/ph-homes-callback-inquiry.png',
        '/images/projects/ph-homes/ph-homes-mobile-pipeline.png'
      ])
    );

    // Verify no live URL since public production deployment is not active
    expect(project?.liveUrl).toBeUndefined();
    expect(project?.demoUrl).toBeUndefined();
  });

  it('renders project card within Web Development Selected Works section with Explore Case Study link and no live button', () => {
    render(
      <MemoryRouter initialEntries={['/services/web-development']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify title on the card
    expect(screen.getByText('PH Homes')).toBeInTheDocument();

    // Verify category and industry
    expect(screen.getAllByText('Full-Stack Web Application').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Real Estate Technology')).toBeInTheDocument();

    // Verify prototype status badge
    expect(screen.getAllByText('Verified Platform Prototype').length).toBeGreaterThanOrEqual(1);

    // Verify Explore Case Study link exists for ph-homes
    const links = screen.getAllByRole('link', { name: /explore case study/i });
    const phHomesLink = links.find((l) => l.getAttribute('href') === '/work/ph-homes');
    expect(phHomesLink).toBeDefined();
    expect(phHomesLink).toHaveAttribute('href', '/work/ph-homes');

    // Verify that NO "Visit Live Project" button is rendered for PH Homes
    const liveLinks = screen.queryAllByRole('link', { name: /visit live project/i });
    const phHomesLiveLink = liveLinks.find((l) => l.getAttribute('href')?.includes('ph-homes'));
    expect(phHomesLiveLink).toBeUndefined();
  });

  it('renders dedicated Case Study page at /work/ph-homes with all required sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/ph-homes']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Hero Section Heading and Subtitle
    expect(screen.getByText('Reimagining the Real Estate Experience Through Technology.')).toBeInTheDocument();
    expect(screen.getByText(/An intelligent full-stack property platform connecting buyers, renters, agents and home-service professionals through one integrated digital ecosystem/i)).toBeInTheDocument();

    // Prototype Status Banner
    expect(screen.getByRole('heading', { level: 2, name: /Verified Platform Demonstration Prototype/i })).toBeInTheDocument();
    expect(screen.getByText(/265 automated backend tests passing across 10 Vitest test suites/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform Prototype Notice:/i)).toBeInTheDocument();

    // Section C: The Challenge
    expect(screen.getByRole('heading', { level: 2, name: /The Challenge: Connecting a Fragmented Real Estate Experience/i })).toBeInTheDocument();
    expect(screen.getByText('Multi-Market Discovery')).toBeInTheDocument();
    expect(screen.getByText('Listing Verification & Fraud')).toBeInTheDocument();
    expect(screen.getByText('Multi-Role Access Control')).toBeInTheDocument();

    // Section D: Our Solution (7 Roles)
    expect(screen.getByRole('heading', { level: 2, name: /One Platform\. Seven Roles\. Connected Real Estate Workflows\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Buyers' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Renters' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Agents' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Service Providers' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Reviewers' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Concierge Staff' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Administrators' })).toBeInTheDocument();

    // Section 5: Core Platform Features (10 Pillars)
    expect(screen.getByRole('heading', { level: 2, name: /A Complete Real Estate Technology Ecosystem/i })).toBeInTheDocument();
    expect(screen.getByText('1. AI-Powered Property Discovery')).toBeInTheDocument();
    expect(screen.getByText('2. Interactive Property Maps')).toBeInTheDocument();
    expect(screen.getByText('3. PHWorth Property Intelligence')).toBeInTheDocument();
    expect(screen.getByText('4. Neighborhood & Market Insights')).toBeInTheDocument();
    expect(screen.getByText('5. Property Discovery Tools')).toBeInTheDocument();
    expect(screen.getByText('6. Buyer & Renter Workflows')).toBeInTheDocument();
    expect(screen.getByText('7. Real-Time Communication')).toBeInTheDocument();
    expect(screen.getByText('8. Agent Management Dashboard')).toBeInTheDocument();
    expect(screen.getByText('9. Home-Services Marketplace')).toBeInTheDocument();
    expect(screen.getByText('10. Payment & Subscriptions')).toBeInTheDocument();

    // Section 6: Listing Verification Workflow
    expect(screen.getByRole('heading', { level: 2, name: /A Structured Property Listing Review Process/i })).toBeInTheDocument();
    expect(screen.getByText('Photos & Deed Documents')).toBeInTheDocument();
    expect(screen.getByText('Review Staging Queue')).toBeInTheDocument();
    expect(screen.getByText('Human Verification')).toBeInTheDocument();

    // Section 7: Home-Services Marketplace
    expect(screen.getByRole('heading', { level: 2, name: /Beyond Property Search: A Connected Home-Services Marketplace/i })).toBeInTheDocument();
    expect(screen.getByText('ZIP Code Routing')).toBeInTheDocument();
    expect(screen.getByText('Quote Submission')).toBeInTheDocument();

    // Section 8: Centralized Platform Administration
    expect(screen.getByRole('heading', { level: 2, name: /Centralized Platform Administration/i })).toBeInTheDocument();
    expect(screen.getByText('User Account Governance')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive Audit Logging')).toBeInTheDocument();

    // Section 9: Security, Privacy & Reliability
    expect(screen.getByRole('heading', { level: 2, name: /Enterprise Security, Privacy & Reliability Architecture/i })).toBeInTheDocument();
    expect(screen.getByText('JWT & OAuth 2.0')).toBeInTheDocument();
    expect(screen.getByText('Zod Schema Validation')).toBeInTheDocument();
    expect(screen.getByText('Helmet & CORS Controls')).toBeInTheDocument();

    // Section 11: Testing & Quality Assurance
    expect(screen.getByRole('heading', { level: 2, name: /Rigorous Testing & Automated Verification/i })).toBeInTheDocument();
    expect(screen.getByText('265 Tests')).toBeInTheDocument();
    expect(screen.getByText('Backend Vitest Suite')).toBeInTheDocument();

    // Section 12: Key Engineering Highlights
    expect(screen.getByRole('heading', { level: 2, name: /Key Engineering Highlights & Platform Outcomes/i })).toBeInTheDocument();
    expect(screen.getByText('Multi-Role RBAC Architecture')).toBeInTheDocument();
    expect(screen.getByText('Geospatial Vector Search')).toBeInTheDocument();
    expect(screen.getByText('Real-Time WebSocket Engine')).toBeInTheDocument();

    // Live Project CTA
    expect(screen.getByRole('heading', { level: 3, name: /Interested in Custom Real Estate Technology\?/i })).toBeInTheDocument();
    const ctaButtons = screen.getAllByRole('link', { name: /Inquire About Web Development/i });
    expect(ctaButtons.length).toBeGreaterThanOrEqual(2);
    ctaButtons.forEach((btn) => {
      expect(btn).toHaveAttribute('href', '/start-a-project?service=web-development');
    });
  });
});

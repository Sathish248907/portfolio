import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ServicesPage } from '../pages/ServicesPage';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { StartProjectPage } from '../pages/StartProjectPage';

describe('Phase 3: Dedicated Service Architecture & Eight Service Experience', () => {
  it('contains all 8 required service divisions in servicesData with verified models', () => {
    expect(servicesData.length).toBe(8);
    
    const requiredSlugs = [
      'web-development',
      'fintech',
      'robotics',
      'drone-technology',
      'healthcare',
      'us-staffing',
      'trading',
      'digital-marketing'
    ];

    requiredSlugs.forEach((slug) => {
      const service = servicesData.find((s) => s.slug === slug);
      expect(service).toBeDefined();
      expect(service?.title).toBeTruthy();
      expect(service?.shortDescription).toBeTruthy();
      expect(service?.tagline).toBeTruthy();
      
      // Check 4-6 capabilities per service
      expect(service?.capabilities.length).toBeGreaterThanOrEqual(4);
      expect(service?.capabilities.length).toBeLessThanOrEqual(6);
      
      // Check 5-step approach (Discover, Plan, Design, Build, Launch)
      expect(service?.approach.length).toBe(5);
      expect(service?.approach[0].title).toBe('Discover');
      expect(service?.approach[1].title).toBe('Plan');
      expect(service?.approach[2].title).toBe('Design');
      expect(service?.approach[3].title).toBe('Build');
      expect(service?.approach[4].title).toBe('Launch');

      // Check 4-6 FAQs per service
      expect(service?.faqs.length).toBeGreaterThanOrEqual(4);
      expect(service?.faqs.length).toBeLessThanOrEqual(6);

      // Check overview structure (4 pillars)
      expect(service?.overview.problemsSolved.length).toBeGreaterThan(0);
      expect(service?.overview.clientTypes.length).toBeGreaterThan(0);
      expect(service?.overview.solutionsOffered.length).toBeGreaterThan(0);
      expect(service?.overview.potentialOutcomes.length).toBeGreaterThan(0);

      // Check realistic use cases
      expect(service?.useCases.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('renders central ServicesPage listing all eight service divisions', () => {
    render(
      <MemoryRouter initialEntries={['/services']}>
        <ServicesPage />
      </MemoryRouter>
    );

    // Title and heading check
    expect(screen.getByText('Capabilities Built Around Your Ambition.')).toBeInTheDocument();

    // Verify all 8 titles are rendered
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('FinTech Solutions')).toBeInTheDocument();
    expect(screen.getByText('Robotics & Automation')).toBeInTheDocument();
    expect(screen.getByText('Drone Technology')).toBeInTheDocument();
    expect(screen.getByText('Healthcare Solutions')).toBeInTheDocument();
    expect(screen.getByText('US Staffing')).toBeInTheDocument();
    expect(screen.getByText('Trading')).toBeInTheDocument();
    expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
  });

  it('renders dedicated ServiceDetailPage with all Phase 3 sections for Web Development', () => {
    render(
      <MemoryRouter initialEntries={['/services/web-development']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Breadcrumb
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();

    // Hero Section
    expect(screen.getByRole('heading', { level: 1, name: /Web Development/i })).toBeInTheDocument();
    expect(screen.getByText(/Mission-Critical Cloud Platforms/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Discuss Your Project/i })).toHaveAttribute(
      'href',
      '/start-a-project?service=web-development'
    );

    // Overview Section (4 pillars)
    expect(screen.getByText('Understanding the Discipline')).toBeInTheDocument();
    expect(screen.getByText('Challenges This Service Solves')).toBeInTheDocument();
    expect(screen.getByText('Who We Support')).toBeInTheDocument();
    expect(screen.getByText('Our Engineering Solutions')).toBeInTheDocument();
    expect(screen.getByText('Potential Business Outcomes')).toBeInTheDocument();

    // Capabilities Section
    expect(screen.getByText('Capabilities and Solutions')).toBeInTheDocument();
    expect(screen.getByText('Corporate and business websites')).toBeInTheDocument();
    expect(screen.getByText('Custom web applications')).toBeInTheDocument();
    expect(screen.getByText('E-commerce solutions')).toBeInTheDocument();
    expect(screen.getByText('Responsive user interfaces')).toBeInTheDocument();
    expect(screen.getByText('API and backend development')).toBeInTheDocument();
    expect(screen.getByText('Website performance and SEO foundations')).toBeInTheDocument();

    // Approach Section (5 steps)
    expect(screen.getByText('Our Approach')).toBeInTheDocument();
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
    expect(screen.getByText('Launch')).toBeInTheDocument();

    // FAQ Section
    expect(screen.getByRole('heading', { level: 2, name: /Frequently Asked Questions/i })).toBeInTheDocument();
    expect(screen.getByText('What types of web projects does Peace Haven support?')).toBeInTheDocument();

    // Final CTA Section
    expect(screen.getByText(/Let's Build Your Next Solution/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Discuss This Service/i })).toHaveAttribute(
      'href',
      '/start-a-project?service=web-development'
    );
  });

  it('supports alias /services/drones normalizing to Drone Technology', () => {
    render(
      <MemoryRouter initialEntries={['/services/drones']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Drone Technology/i })).toBeInTheDocument();
    expect(screen.getByText(/Aerial Data Workflows/i)).toBeInTheDocument();
  });

  it('supports keyboard navigation on FAQ accordion items', () => {
    render(
      <MemoryRouter initialEntries={['/services/fintech']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const questionButton = screen.getByRole('button', {
      name: /Does Peace Haven act as a payment processor or banking institution/i,
    });
    expect(questionButton).toBeInTheDocument();

    // Press Enter to toggle
    fireEvent.keyDown(questionButton, { key: 'Enter', code: 'Enter' });
    expect(questionButton).toHaveAttribute('aria-expanded');
  });

  it('preselects service in StartProjectPage when accessed with query parameter', () => {
    render(
      <MemoryRouter initialEntries={['/start-a-project?service=fintech']}>
        <StartProjectPage />
      </MemoryRouter>
    );

    // Verify Step 1 is rendered and FinTech card is preselected
    expect(screen.getByText(/Step 1: Select Primary Engineering Discipline/i)).toBeInTheDocument();
    const fintechRadio = screen.getByLabelText(/FinTech Solutions/i);
    expect(fintechRadio).toBeChecked();
  });
});

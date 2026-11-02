import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { industriesData, getIndustryBySlug } from '../data/industriesData';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { IndustriesPage } from '../pages/IndustriesPage';
import { IndustryDetailPage } from '../pages/IndustryDetailPage';

describe('Peace Haven Industries Upgrade — Data Models & Architecture', () => {
  it('contains all 10 recommended industry categories with complete verified structures', () => {
    expect(industriesData).toHaveLength(10);

    const expectedSlugs = [
      'information-technology',
      'banking-finance',
      'manufacturing',
      'healthcare',
      'agriculture',
      'real-estate',
      'logistics',
      'retail-ecommerce',
      'human-resources',
      'education'
    ];

    expectedSlugs.forEach((slug, idx) => {
      const industry = getIndustryBySlug(slug);
      expect(industry).toBeDefined();
      expect(industry?.slug).toBe(slug);
      expect(industry?.number).toBe(String(idx + 1).padStart(2, '0'));
      expect(industry?.title).toBeTruthy();
      expect(industry?.shortDescription).toBeTruthy();
      expect(industry?.tags.length).toBeGreaterThanOrEqual(3);
      expect(industry?.heroHeadline).toBeTruthy();
      expect(industry?.heroDescription).toBeTruthy();
      expect(industry?.overview.keyDeliverables.length).toBeGreaterThanOrEqual(4);
      expect(industry?.challenges.length).toBeGreaterThanOrEqual(4);
      expect(industry?.capabilities.length).toBeGreaterThanOrEqual(4);
      expect(industry?.applicableServices.length).toBeGreaterThanOrEqual(2);
      expect(industry?.useCases.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('renders homepage IndustriesSection with exact eyebrow, heading, description, and 10 cards', () => {
    render(
      <MemoryRouter>
        <IndustriesSection />
      </MemoryRouter>
    );

    // Section Eyebrow & Heading
    expect(screen.getByText('INDUSTRIES WE SERVE')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Technology That Moves Industries Forward\./i })).toBeInTheDocument();
    expect(
      screen.getByText(/From intelligent software and financial technology to robotics and healthcare innovation/i)
    ).toBeInTheDocument();

    // Verify all 10 industry titles are rendered
    expect(screen.getByRole('heading', { level: 3, name: /Information Technology & Software/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Banking & Financial Services/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Manufacturing & Industrial Automation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Healthcare & Medical Technology/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Agriculture & Agritech/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Real Estate & Property Technology/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Logistics & Supply Chain/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Retail & E-commerce/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Human Resources & Staffing/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Education & EdTech/i })).toBeInTheDocument();

    // CTA Button
    const ctaButton = screen.getByRole('link', { name: /Explore Our Solutions/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/industries');
  });

  it('renders central IndustriesPage at /industries with filter tabs and search input', () => {
    render(
      <MemoryRouter initialEntries={['/industries']}>
        <IndustriesPage />
      </MemoryRouter>
    );

    // Title and Header
    expect(screen.getByRole('heading', { level: 1, name: /Technology That Moves Industries Forward\./i })).toBeInTheDocument();
    
    // Filter Tabs
    expect(screen.getByRole('tab', { name: /All Industries \(10\)/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Software & SaaS \(5\)/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Robotics & Hardware \(2\)/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Operations & Commerce \(3\)/i })).toBeInTheDocument();

    // Search input
    const searchInput = screen.getByLabelText(/Search industries/i);
    expect(searchInput).toBeInTheDocument();

    // Test search filter
    fireEvent.change(searchInput, { target: { value: 'FinTech' } });
    expect(screen.getByRole('heading', { level: 3, name: /Banking & Financial Services/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: /Agriculture & Agritech/i })).not.toBeInTheDocument();
  });

  it('renders dedicated IndustryDetailPage for Banking & Financial Services with Grow Capital connected', () => {
    render(
      <MemoryRouter initialEntries={['/industries/banking-finance']}>
        <Routes>
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Breadcrumb
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();

    // Heading
    expect(screen.getByRole('heading', { level: 1, name: /Banking & Financial Services/i })).toBeInTheDocument();
    expect(screen.getByText(/Sector 02/i)).toBeInTheDocument();

    // Challenges Section
    expect(screen.getByRole('heading', { level: 2, name: /Common Business & Engineering Challenges/i })).toBeInTheDocument();
    expect(screen.getByText(/Real-Time Market Rate Synchronization/i)).toBeInTheDocument();
    expect(screen.getByText(/Custody Transparency & Physical Backing/i)).toBeInTheDocument();

    // Capabilities Section
    expect(screen.getByRole('heading', { level: 2, name: /Peace Haven's Sector-Specific Engineering Solutions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Fractional Investment Platforms/i })).toBeInTheDocument();

    // Connected Project: Grow Capital
    expect(screen.getByRole('heading', { level: 3, name: /Grow Capital/i })).toBeInTheDocument();
    expect(screen.getByText(/Digital Gold & Silver Investment Platform/i)).toBeInTheDocument();
    const liveLinks = screen.getAllByRole('link', { name: /Visit Live Project/i });
    expect(liveLinks.some((l) => l.getAttribute('href') === 'https://growcapital.app/')).toBe(true);

    // Use cases
    expect(screen.getByText(/Fractional Digital Bullion Investment Platform/i)).toBeInTheDocument();
  });

  it('renders dedicated IndustryDetailPage for Real Estate with PH Homes connected', () => {
    render(
      <MemoryRouter initialEntries={['/industries/real-estate']}>
        <Routes>
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Real Estate & Property Technology/i })).toBeInTheDocument();
    expect(screen.getByText(/Sector 06/i)).toBeInTheDocument();

    // Connected Project: PH Homes
    expect(screen.getByRole('heading', { level: 3, name: 'PH Homes' })).toBeInTheDocument();
    expect(screen.getByText(/Intelligent Real Estate & Property Platform/i)).toBeInTheDocument();
  });

  it('renders dedicated IndustryDetailPage for Manufacturing with EB-300 Robotic Arm connected', () => {
    render(
      <MemoryRouter initialEntries={['/industries/manufacturing']}>
        <Routes>
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Manufacturing & Industrial Automation/i })).toBeInTheDocument();
    expect(screen.getByText(/Sector 03/i)).toBeInTheDocument();

    // Connected Prototype: EB-300 Robotic Arm
    expect(screen.getByRole('heading', { level: 3, name: /EB-300 Robotic Arm/i })).toBeInTheDocument();
    expect(screen.getByText(/6-Axis Industrial Robotic Manipulator/i)).toBeInTheDocument();
  });
});

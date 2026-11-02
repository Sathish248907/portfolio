import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('Rapid MI Screening Test — Healthcare Selected Works & Case Study', () => {
  it('links rapid-mi-screening-test in Healthcare service relatedProjectSlugs', () => {
    const healthcareService = servicesData.find((s) => s.slug === 'healthcare' || s.id === 'healthcare');
    expect(healthcareService).toBeDefined();
    expect(healthcareService?.relatedProjectSlugs).toContain('rapid-mi-screening-test');
  });

  it('contains complete verified data model for rapid-mi-screening-test in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'rapid-mi-screening-test');
    expect(project).toBeDefined();
    expect(project?.title).toBe('Rapid MI Screening Test');
    expect(project?.subtitle).toBe('Cardiac Biomarker Assay Kit for Rapid Detection of Myocardial Infarction');
    expect(project?.category).toBe('Point-of-Care Diagnostics');
    expect(project?.industry).toBe('Healthcare & Clinical Diagnostics');
    expect(project?.statusBadge).toBe('Prototype Project');
    expect(project?.isDemonstrationOrPrototype).toBe(true);

    // Verified technology stack tags
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'Lateral Flow Immunoassay (LFA)',
        'Point-of-Care Diagnostics',
        'Cardiac Biomarkers',
        'Colloidal Gold Nanoparticles',
        'Monoclonal Antibody Conjugation',
        'Nitrocellulose Capillary Membrane',
        'Biosensor Engineering',
        'Clinical Triage Workflow'
      ])
    );

    // Check authentic images present
    expect(project?.heroImage).toBe('/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png');
    expect(project?.thumbnail).toBe('/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png');
    expect(project?.galleryImages.length).toBe(6);
    expect(project?.galleryImages).toEqual(
      expect.arrayContaining([
        '/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png',
        '/images/projects/rapid-mi-screening-test/rapid-mi-test-architecture.png',
        '/images/projects/rapid-mi-screening-test/rapid-mi-test-strip.png',
        '/images/projects/rapid-mi-screening-test/rapid-mi-test-conjugate.png',
        '/images/projects/rapid-mi-screening-test/rapid-mi-test-readout.png',
        '/images/projects/rapid-mi-screening-test/rapid-mi-test-control.png'
      ])
    );
  });

  it('renders project card within Healthcare Selected Works section with Prototype Project badge and Explore Case Study link', () => {
    render(
      <MemoryRouter initialEntries={['/services/healthcare']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify title and subtitle on the card
    expect(screen.getByText('Rapid MI Screening Test')).toBeInTheDocument();
    expect(screen.getAllByText('Point-of-Care Diagnostics').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Healthcare & Clinical Diagnostics')).toBeInTheDocument();

    // Verify prototype status badge
    expect(screen.getAllByText('Prototype Project').length).toBeGreaterThanOrEqual(1);

    // Verify Explore Case Study links
    const links = screen.getAllByRole('link', { name: /explore case study/i });
    const rapidMiLink = links.find((l) => l.getAttribute('href') === '/work/rapid-mi-screening-test');
    expect(rapidMiLink).toBeDefined();
    expect(rapidMiLink).toHaveAttribute('href', '/work/rapid-mi-screening-test');
  });

  it('renders dedicated Case Study page at /work/rapid-mi-screening-test with all required sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/rapid-mi-screening-test']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Hero Section Heading and Subtitle
    expect(
      screen.getByRole('heading', { name: /early detection saves lives\. rapid cardiac triage\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a rapid point-of-care lateral flow immunoassay engineered for the frontline detection of myocardial infarction biomarkers within 10 to 15 minutes\./i)
    ).toBeInTheDocument();

    // Prototype Project Status Banner
    expect(screen.getByText(/project verification status: prototype project/i)).toBeInTheDocument();
    expect(screen.getByText(/diagnostic research prototype notice:/i)).toBeInTheDocument();

    // Challenge & Solution Sections
    expect(screen.getByText(/the challenge: time-critical detection in acute myocardial infarction/i)).toBeInTheDocument();
    expect(screen.getByText(/a lateral flow approach to rapid cardiac screening/i)).toBeInTheDocument();

    // 5 Core Elements of Solution
    expect(screen.getAllByText('Sample Delivery & Separation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Gold Nanoparticle Conjugates').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Capillary Nitrocellulose Matrix').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Dual-Line Capture Architecture').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Rapid Visual Triage Readout').length).toBeGreaterThanOrEqual(1);

    // Lateral Flow Test Strip Architecture (6 Zones)
    expect(screen.getByText(/understanding the lateral flow test architecture/i)).toBeInTheDocument();
    expect(screen.getByText('Sample Application Pad')).toBeInTheDocument();
    expect(screen.getByText('Conjugate Release Matrix')).toBeInTheDocument();
    expect(screen.getAllByText('Nitrocellulose Membrane').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Test Line (T-Line)')).toBeInTheDocument();
    expect(screen.getByText('Control Line (C-Line)')).toBeInTheDocument();
    expect(screen.getByText('Absorbent Wicking Pad')).toBeInTheDocument();

    // 6 Sequential Operational Stages
    expect(screen.getByText(/how the rapid mi screening test works/i)).toBeInTheDocument();
    expect(screen.getByText('Sample Deposition')).toBeInTheDocument();
    expect(screen.getByText('Conjugate Rehydration & Binding')).toBeInTheDocument();
    expect(screen.getByText('Capillary Lateral Migration')).toBeInTheDocument();
    expect(screen.getByText('Test Line Sandwich Capture')).toBeInTheDocument();
    expect(screen.getByText('Control Line Flow Validation')).toBeInTheDocument();
    expect(screen.getByText('Result Readout in 10–15 Minutes')).toBeInTheDocument();

    // Biochemical & Material Components (8 components)
    expect(screen.getByText(/engineering behind the rapid mi assay/i)).toBeInTheDocument();
    expect(screen.getAllByText('Colloidal Gold Nanoparticles').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Monoclonal Capture Antibodies').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Detection Conjugates').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Secondary Control Antibodies').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Nitrocellulose Membrane').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Glass Fiber Conjugate Pad').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Blood Separation Matrix').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Cellulose Absorbent Pad').length).toBeGreaterThanOrEqual(1);

    // Visual Result Interpretation Guide
    expect(screen.getByText(/visual result interpretation guide/i)).toBeInTheDocument();
    expect(screen.getByText('Elevated Cardiac Biomarkers')).toBeInTheDocument();
    expect(screen.getByText('Normal Biomarker Concentration')).toBeInTheDocument();
    expect(screen.getByText('Retest Required')).toBeInTheDocument();

    // Clinical Applications
    expect(screen.getByText(/where rapid cardiac screening saves critical time/i)).toBeInTheDocument();
    expect(screen.getAllByText('Emergency Medical Services').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Rural Health Clinics').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Emergency Department Fast-Track').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Remote Industrial & Maritime').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Community Screening Programs').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Disaster Relief & Field Hospitals').length).toBeGreaterThanOrEqual(1);

    // Inside the Rapid MI Screening Test (Gallery)
    expect(screen.getByText('Inside the Rapid MI Screening Test')).toBeInTheDocument();

    // Benefits & Future Enhancements
    expect(screen.getByText(/designed for decentralized cardiac care/i)).toBeInTheDocument();
    expect(screen.getByText(/proposed future enhancements/i)).toBeInTheDocument();
    expect(screen.getByText('Smartphone Optical Reader')).toBeInTheDocument();
    expect(screen.getByText('Multiplexed Triple-Marker')).toBeInTheDocument();

    // Live CTA Button
    expect(screen.getAllByText(/inquire about healthcare & diagnostics/i).length).toBeGreaterThanOrEqual(1);
  });
});

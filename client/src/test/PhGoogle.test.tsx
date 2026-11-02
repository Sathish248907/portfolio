import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('PH Google — FinTech Selected Works & Dedicated Case Study Integration', () => {
  it('includes ph-google and ai-command-center in FinTech service relatedProjectSlugs', () => {
    const fintechService = servicesData.find((s) => s.slug === 'fintech');
    expect(fintechService).toBeDefined();
    expect(fintechService?.relatedProjectSlugs).toContain('ph-google');
    expect(fintechService?.relatedProjectSlugs).toContain('ai-command-center');
    expect(fintechService?.relatedProjectSlugs).not.toContain('strata-institutional-settlement-engine');
  });

  it('ensures strata-institutional-settlement-engine is completely removed from projectsData', () => {
    const strata = projectsData.find((p) => p.slug === 'strata-institutional-settlement-engine');
    expect(strata).toBeUndefined();
  });

  it('contains complete verified data model for ph-google in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'ph-google');
    expect(project).toBeDefined();
    expect(project?.title).toBe('PH Google');
    expect(project?.subtitle).toBe('Centralized Digital Workspace');
    expect(project?.category).toBe('Enterprise Web Application');
    expect(project?.industry).toBe('Business Productivity & Enterprise Technology');
    expect(project?.statusBadge).toBe('Internal Project');
    expect(project?.liveUrl).toBeUndefined();
    expect(project?.demoUrl).toBeUndefined();

    // Verified technology stack tags
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'React.js',
        'Python',
        'Google Services Integration',
      ])
    );

    // Check authentic screenshots present
    expect(project?.heroImage).toBe('/images/projects/ph-google/ph-google-hero.png');
    expect(project?.galleryImages.length).toBe(5);
    expect(project?.galleryImages).toEqual(
      expect.arrayContaining([
        '/images/projects/ph-google/ph-google-hero.png',
        '/images/projects/ph-google/ph-google-gmail.webp',
        '/images/projects/ph-google/ph-google-user-management.webp',
        '/images/projects/ph-google/ph-google-admin.webp',
        '/images/projects/ph-google/ph-google-notifications.webp',
      ])
    );
  });

  it('renders PH Google card within FinTech Selected Works section with internal status and no external live button', () => {
    render(
      <MemoryRouter initialEntries={['/services/fintech']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify Selected Works heading is present
    expect(screen.getByRole('heading', { level: 2, name: /Selected Works/i })).toBeInTheDocument();

    // Verify PH Google card title
    expect(screen.getByRole('heading', { level: 3, name: /PH Google/i })).toBeInTheDocument();

    // Verify description
    expect(
      screen.getByText(/A unified enterprise workspace bringing essential business tools, documents and team collaboration into one centralized platform/i)
    ).toBeInTheDocument();

    // Verify Strata High-Security Ledger Engine is NOT rendered
    expect(screen.queryByText(/Strata High-Security Ledger Engine/i)).not.toBeInTheDocument();

    // Verify Enterprise Web Application category filter button exists
    expect(screen.getByRole('button', { name: /Enterprise Web Application/i })).toBeInTheDocument();

    // Verify Explore Case Study link points to /work/ph-google
    const caseStudyLinks = screen.getAllByRole('link', { name: /Explore Case Study/i });
    expect(caseStudyLinks.some((link) => link.getAttribute('href') === '/work/ph-google')).toBe(true);

    // Verify that NO live project button points to an external site for PH Google
    const allLinks = screen.getAllByRole('link');
    const phGoogleExternal = allLinks.find((l) => l.getAttribute('href')?.includes('ph-google.com'));
    expect(phGoogleExternal).toBeUndefined();
  });

  it('renders dedicated CaseStudyDetailPage at /work/ph-google with verified sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/ph-google']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify Hero title and subtitle
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /PH Google – One Workspace. Everything Connected/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A centralized digital workplace designed to simplify business operations, improve collaboration and connect essential workplace services/i)
    ).toBeInTheDocument();

    // Verify verified project category and internal status
    expect(screen.getAllByText('Enterprise Web Application').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Internal Project').length).toBeGreaterThan(0);

    // Verify that NO external live project button is rendered
    const liveLinks = screen.queryAllByRole('link', { name: /Visit Live Project|View Live Website/i });
    expect(liveLinks.length).toBe(0);

    // Verify Google Services Integration section
    expect(screen.getByRole('heading', { level: 2, name: /Google Services Integration/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Google Drive/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Gmail/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Google Calendar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Google Sheets/i).length).toBeGreaterThan(0);

    // Verify Internal Project status section
    expect(screen.getByRole('heading', { level: 2, name: /Internal Project/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Developed as an internal digital workspace initiative for Peace Haven. The platform is not currently publicly available/i)
    ).toBeInTheDocument();

    // Verify Inside PH Google visual gallery section
    expect(screen.getByRole('heading', { level: 2, name: /Inside PH Google/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Explore the digital workspace, connected services and tools/i)
    ).toBeInTheDocument();

    // Verify Technical Architecture section
    expect(screen.getByRole('heading', { level: 2, name: /Technical Architecture/i })).toBeInTheDocument();
    expect(screen.getByText(/React.js & Tailwind CSS/i)).toBeInTheDocument();
    expect(screen.getByText(/Python Backend Services/i)).toBeInTheDocument();

    // Verify Inquire CTA buttons exist (hero and bottom CTA)
    const inquireLinks = screen.getAllByRole('link', { name: /Inquire About Enterprise Workspaces/i });
    expect(inquireLinks.length).toBeGreaterThanOrEqual(1);
    expect(inquireLinks[0]).toHaveAttribute('href', '/start-a-project?service=fintech');
  });
});

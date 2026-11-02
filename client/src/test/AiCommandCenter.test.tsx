import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('AI Command Center — FinTech Selected Works & Dedicated Case Study Integration', () => {
  it('includes ai-command-center in FinTech service relatedProjectSlugs', () => {
    const fintechService = servicesData.find((s) => s.slug === 'fintech');
    expect(fintechService).toBeDefined();
    expect(fintechService?.relatedProjectSlugs).toContain('ai-command-center');
  });

  it('contains complete verified data model for ai-command-center in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'ai-command-center');
    expect(project).toBeDefined();
    expect(project?.title).toBe('AI Command Center');
    expect(project?.category).toBe('AI & Enterprise Technology');
    expect(project?.statusBadge).toBe('Verified Live Production Platform');
    expect(project?.liveUrl).toBe('https://ai.peacehavencorp.com/');

    // Verified technology stack tags
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'React 19',
        'TypeScript',
        'Node.js',
        'Plaid API',
        'OpenAI API',
        'Tailwind CSS',
        'Vite',
        'Google Workspace API',
      ])
    );

    // Check authentic screenshots present
    expect(project?.heroImage).toBe('/images/projects/ai-command-center-dashboard.png');
    expect(project?.galleryImages.length).toBeGreaterThanOrEqual(4);
  });

  it('renders AI Command Center card within FinTech Selected Works section', () => {
    render(
      <MemoryRouter initialEntries={['/services/fintech']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify Selected Works heading is present
    expect(screen.getByRole('heading', { level: 2, name: /Selected Works/i })).toBeInTheDocument();

    // Verify AI Command Center card title
    expect(screen.getByRole('heading', { level: 3, name: /AI Command Center/i })).toBeInTheDocument();

    // Verify description
    expect(
      screen.getByText(/An intelligent digital platform designed to centralize AI-powered capabilities and simplify supported business workflows/i)
    ).toBeInTheDocument();

    // Verify Explore Case Study links exist and at least one points to /work/ai-command-center
    const caseStudyLinks = screen.getAllByRole('link', { name: /Explore Case Study/i });
    expect(caseStudyLinks.some((link) => link.getAttribute('href') === '/work/ai-command-center')).toBe(true);

    // Verify Visit Live Project external links exist and at least one points to https://ai.peacehavencorp.com/
    const liveProjectLinks = screen.getAllByRole('link', { name: /Visit Live Project/i });
    const aiLiveLink = liveProjectLinks.find((link) => link.getAttribute('href') === 'https://ai.peacehavencorp.com/');
    expect(aiLiveLink).toBeDefined();
    expect(aiLiveLink).toHaveAttribute('target', '_blank');
    expect(aiLiveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders dedicated CaseStudyDetailPage at /work/ai-command-center with verified sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/ai-command-center']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify Hero title and subtitle
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /AI Command Center – Bringing Intelligence Into One Workspace/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/An AI-powered digital platform developed to centralize intelligent capabilities and support modern business workflows/i)
    ).toBeInTheDocument();

    // Verify verified project category
    expect(screen.getAllByText('AI & Enterprise Technology').length).toBeGreaterThan(0);

    // Verify external CTA link
    const liveLinks = screen.getAllByRole('link', { name: /Visit Live Project/i });
    expect(liveLinks.some((link) => link.getAttribute('href') === 'https://ai.peacehavencorp.com/')).toBe(true);

    // Verify FinTech Relevance & Verified Banking Capabilities section
    expect(screen.getByRole('heading', { level: 2, name: /FinTech Relevance & Verified Banking Capabilities/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Plaid Multi-Bank Aggregation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mailbox Payment Stream Triage/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Claims Payout & Debt Service/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Finance User Access Scoping/i).length).toBeGreaterThan(0);

    // Verify Technical Architecture section
    expect(screen.getByRole('heading', { level: 2, name: /Technical Architecture/i })).toBeInTheDocument();
    expect(screen.getByText(/React 19.3 & Tailwind CSS/i)).toBeInTheDocument();

    // Verify Project Visual Gallery
    expect(screen.getByRole('heading', { level: 2, name: /Project Gallery & Actual Screenshots/i })).toBeInTheDocument();
  });
});

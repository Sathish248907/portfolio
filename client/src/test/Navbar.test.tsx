import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { AuthProvider } from '../context/AuthContext';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';

describe('Navigation and Layout System', () => {
  it('renders Peace Haven branding and core navigation links', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/PEACE HAVEN/i)).toBeInTheDocument();
    expect(screen.getByText(/Technologies/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /industries/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /careers/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('contains verified data for all 8 core services', () => {
    expect(servicesData).toHaveLength(8);
    
    const serviceSlugs = servicesData.map((s) => s.slug);
    expect(serviceSlugs).toContain('web-development');
    expect(serviceSlugs).toContain('fintech');
    expect(serviceSlugs).toContain('robotics');
    expect(serviceSlugs).toContain('drone-technology');
    expect(serviceSlugs).toContain('healthcare');
    expect(serviceSlugs).toContain('us-staffing');
    expect(serviceSlugs).toContain('trading');
    expect(serviceSlugs).toContain('digital-marketing');
  });

  it('marks all laboratory projects as prototypes/demonstrations for transparency', () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(4);
    projectsData.forEach((project) => {
      expect(project.isDemonstrationOrPrototype).toBe(true);
      expect(project.statusBadge).toBeDefined();
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AuthProvider } from '../context/AuthContext';
import { eightServices } from '../components/home/ServiceGrid';

describe('Phase 2 Homepage Implementation Tests', () => {
  it('renders all required Phase 2 homepage section headings and exact copy', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </AuthProvider>
    );

    // Section 2: Hero
    expect(screen.getByText(/(INNOVATION MEETS IMPACT|ENGINEERING THE FUTURE)/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /We turn ambitious ideas into intelligent solutions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/From digital experiences and financial technology to healthcare/i)
    ).toBeInTheDocument();

    // Section 3: Company Introduction
    expect(
      screen.getByRole('heading', { level: 2, name: /One partner\. Multiple capabilities\. A shared vision\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Peace Haven brings together technology, business services, and engineering capabilities/i)
    ).toBeInTheDocument();

    // Section 4: Eight Service Divisions
    expect(
      screen.getByRole('heading', { level: 2, name: /Capabilities built around your ambition\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Explore the services that help businesses innovate, operate, and grow\./i)
    ).toBeInTheDocument();

    // Section 5: Industries Served
    expect(
      screen.getByRole('heading', { level: 2, name: /Technology for the challenges that matter\./i })
    ).toBeInTheDocument();

    // Section 7: Our Process
    expect(
      screen.getByRole('heading', { level: 2, name: /From first conversation to real-world impact\./i })
    ).toBeInTheDocument();
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Validate')).toBeInTheDocument();
    expect(screen.getByText('Deploy')).toBeInTheDocument();
    expect(screen.getByText('Evolve')).toBeInTheDocument();

    // Section 8: Why Peace Haven
    expect(
      screen.getByRole('heading', { level: 2, name: /Engineering with purpose\. Technology with direction\./i })
    ).toBeInTheDocument();
    expect(screen.getByText('Purpose-driven solutions')).toBeInTheDocument();
    expect(screen.getByText('Connected capabilities')).toBeInTheDocument();
    expect(screen.getByText('Built to evolve')).toBeInTheDocument();

    // Section 9: Final Project CTA
    expect(
      screen.getByRole('heading', { level: 2, name: /Have a challenge worth solving\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Tell us what you're building, what needs to improve, or where your next opportunity lies/i)
    ).toBeInTheDocument();
  });

  it('verifies that all eight service cards are defined with exact requested descriptions', () => {
    expect(eightServices).toHaveLength(8);

    const webDev = eightServices.find((s) => s.id === 'web-development');
    expect(webDev?.description).toBe(
      'Responsive websites, web applications, e-commerce platforms, and custom business software.'
    );

    const fintech = eightServices.find((s) => s.id === 'fintech');
    expect(fintech?.description).toBe(
      'Financial software, payment integrations, transaction workflows, and financial technology solutions.'
    );

    const robotics = eightServices.find((s) => s.id === 'robotics');
    expect(robotics?.description).toBe(
      'Robotics applications, intelligent control, prototyping, and automation engineering.'
    );

    const drones = eightServices.find((s) => s.id === 'drones');
    expect(drones?.description).toBe(
      'Drone-enabled applications for aerial data collection, mapping, inspection, and monitoring.'
    );

    const healthcare = eightServices.find((s) => s.id === 'healthcare');
    expect(healthcare?.description).toBe(
      'Healthcare technology, clinic websites, appointment workflows, and digital tools for healthcare operations.'
    );

    const staffing = eightServices.find((s) => s.id === 'us-staffing');
    expect(staffing?.description).toBe(
      'Recruitment support, candidate sourcing, talent coordination, and staffing workflows for eligible US-market clients.'
    );

    const trading = eightServices.find((s) => s.id === 'trading');
    expect(trading?.description).toBe(
      'Trading-related software, analytics dashboards, market-data interfaces, and business workflow tools.'
    );

    const marketing = eightServices.find((s) => s.id === 'digital-marketing');
    expect(marketing?.description).toBe(
      'Search engine optimization, content strategy, campaign management, analytics, and digital growth services.'
    );
  });
});

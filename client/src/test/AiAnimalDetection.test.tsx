import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('AI-Based Agricultural Animal Detection System — Robotics Selected Works & Case Study', () => {
  it('links ai-agricultural-animal-detection in Robotics service relatedProjectSlugs', () => {
    const roboticsService = servicesData.find((s) => s.slug === 'robotics' || s.id === 'robotics');
    expect(roboticsService).toBeDefined();
    expect(roboticsService?.relatedProjectSlugs).toContain('ai-agricultural-animal-detection');
  });

  it('contains complete verified data model for ai-agricultural-animal-detection in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'ai-agricultural-animal-detection');
    expect(project).toBeDefined();
    expect(project?.title).toBe('AI-Based Agricultural Animal Detection System');
    expect(project?.subtitle).toBe('AI-Powered Smart Farming & Crop Protection');
    expect(project?.category).toBe('AI & IoT Agricultural Automation');
    expect(project?.industry).toBe('Agriculture & Smart Farming');
    expect(project?.statusBadge).toBe('Prototype Project');
    expect(project?.isDemonstrationOrPrototype).toBe(true);

    // Verified technology stack tags
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'Artificial Intelligence',
        'Computer Vision',
        'ESP32-CAM',
        'PIR Sensor',
        'IoT',
        'Telegram Bot'
      ])
    );

    // Check authentic screenshots present
    expect(project?.heroImage).toBe('/images/projects/ai-agricultural-animal-detection/ai-animal-detection-overview.png');
    expect(project?.thumbnail).toBe('/images/projects/ai-agricultural-animal-detection/ai-animal-detection-overview.png');
    expect(project?.galleryImages.length).toBe(5);
    expect(project?.galleryImages).toEqual(
      expect.arrayContaining([
        '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-overview.png',
        '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-hardware.png',
        '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-telegram.png',
        '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-process.png',
        '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-deterrent.png'
      ])
    );
  });

  it('renders project card within Robotics Selected Works section with Prototype Project badge and Explore Case Study link', () => {
    render(
      <MemoryRouter initialEntries={['/services/robotics']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify title and subtitle on the card
    expect(screen.getByText('AI-Based Agricultural Animal Detection System')).toBeInTheDocument();
    expect(screen.getAllByText('AI & IoT Agricultural Automation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Agriculture & Smart Farming')).toBeInTheDocument();

    // Verify prototype status badge
    expect(screen.getAllByText('Prototype Project').length).toBeGreaterThanOrEqual(1);

    // Verify Explore Case Study button links to the case study
    const links = screen.getAllByRole('link', { name: /explore case study/i });
    const caseStudyLink = links.find((l) => l.getAttribute('href') === '/work/ai-agricultural-animal-detection');
    expect(caseStudyLink).toBeDefined();
    expect(caseStudyLink).toHaveAttribute('href', '/work/ai-agricultural-animal-detection');
  });

  it('renders dedicated Case Study page at /work/ai-agricultural-animal-detection with all required sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/ai-agricultural-animal-detection']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Hero Section Heading and Subtitle
    expect(
      screen.getByRole('heading', { name: /smarter farming through ai-powered animal detection\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/an intelligent agricultural monitoring solution combining computer vision, embedded systems and iot communication/i)
    ).toBeInTheDocument();

    // Prototype Project Status Banner
    expect(screen.getByText(/project verification status: prototype project/i)).toBeInTheDocument();

    // Challenge & Solution Sections
    expect(screen.getByText(/the challenge: protecting farmland from animal intrusion/i)).toBeInTheDocument();
    expect(screen.getByText(/an intelligent monitoring and alert system/i)).toBeInTheDocument();

    // System Architecture with Dual Output Paths
    expect(screen.getByRole('heading', { name: /^system architecture$/i })).toBeInTheDocument();
    expect(screen.getByText(/path a: local deterrent mechanism/i)).toBeInTheDocument();
    expect(screen.getByText(/path b: remote telegram alert/i)).toBeInTheDocument();

    // How the System Works (6 Sequential Steps)
    expect(screen.getByRole('heading', { name: /how the system works/i })).toBeInTheDocument();
    expect(screen.getByText('STEP 01')).toBeInTheDocument();
    expect(screen.getByText('Movement Detection')).toBeInTheDocument();
    expect(screen.getByText('STEP 06')).toBeInTheDocument();
    expect(screen.getByText('Telegram Alert')).toBeInTheDocument();

    // Hardware Components
    expect(screen.getByRole('heading', { name: /hardware components/i })).toBeInTheDocument();
    expect(screen.getAllByText('ESP32-CAM').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('PIR Motion Sensor').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Solar Panel').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Buzzer / Speaker').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Relay Module').length).toBeGreaterThanOrEqual(1);

    // Real-Time Alerts for Farmers (Telegram Bot UI)
    expect(screen.getByRole('heading', { name: /real-time alerts for farmers/i })).toBeInTheDocument();
    expect(screen.getByText('🤖 🚨 ANIMAL ALERT 🚨')).toBeInTheDocument();
    expect(screen.getByText('Elephant 🐘')).toBeInTheDocument();
    expect(screen.getAllByText('94%').length).toBeGreaterThanOrEqual(1);

    // Humane and Responsible Animal Monitoring
    expect(screen.getByRole('heading', { name: /humane and responsible animal monitoring/i })).toBeInTheDocument();

    // Benefits & Future Enhancements
    expect(screen.getByRole('heading', { name: /designed for smarter agricultural monitoring/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /proposed future enhancements/i })).toBeInTheDocument();

    // Gallery Title
    expect(screen.getByRole('heading', { name: /inside the smart agricultural system/i })).toBeInTheDocument();

    // Inquire Button CTA
    expect(screen.getAllByRole('link', { name: /inquire about agricultural robotics/i }).length).toBeGreaterThanOrEqual(1);
  });
});

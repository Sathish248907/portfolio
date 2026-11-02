import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('Smart Blind Stick — Robotics & Automation Selected Works & Case Study', () => {
  it('links both ai-agricultural-animal-detection and smart-blind-stick in Robotics service relatedProjectSlugs', () => {
    const roboticsService = servicesData.find((s) => s.slug === 'robotics' || s.id === 'robotics');
    expect(roboticsService).toBeDefined();
    expect(roboticsService?.relatedProjectSlugs).toContain('smart-blind-stick');
    expect(roboticsService?.relatedProjectSlugs).toContain('ai-agricultural-animal-detection');
  });

  it('contains complete verified data model for smart-blind-stick in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'smart-blind-stick');
    expect(project).toBeDefined();
    expect(project?.title).toBe('Smart Blind Stick');
    expect(project?.subtitle).toBe('IoT-Based Assistive Mobility System');
    expect(project?.category).toBe('Assistive Technology & IoT');
    expect(project?.industry).toBe('Healthcare Technology & Accessibility');
    expect(project?.statusBadge).toBe('Prototype Project');
    expect(project?.isDemonstrationOrPrototype).toBe(true);

    // Verified technology stack tags
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'ESP32-S3',
        'IoT',
        'Ultrasonic Sensors',
        'MPU6050',
        'GPS',
        '4G LTE',
        'Embedded Systems',
        'Haptic Feedback'
      ])
    );

    // Check authentic screenshots present
    expect(project?.heroImage).toBe('/images/projects/smart-blind-stick/smart-blind-stick-overview.png');
    expect(project?.thumbnail).toBe('/images/projects/smart-blind-stick/smart-blind-stick-overview.png');
    expect(project?.galleryImages.length).toBe(6);
    expect(project?.galleryImages).toEqual(
      expect.arrayContaining([
        '/images/projects/smart-blind-stick/smart-blind-stick-overview.png',
        '/images/projects/smart-blind-stick/smart-blind-stick-prototype.png',
        '/images/projects/smart-blind-stick/smart-blind-stick-enclosure.png',
        '/images/projects/smart-blind-stick/smart-blind-stick-sensors.png',
        '/images/projects/smart-blind-stick/smart-blind-stick-alert.png',
        '/images/projects/smart-blind-stick/smart-blind-stick-process.png'
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
    expect(screen.getByText('Smart Blind Stick')).toBeInTheDocument();
    expect(screen.getAllByText('Assistive Technology & IoT').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Healthcare Technology & Accessibility')).toBeInTheDocument();

    // Verify prototype status badge
    expect(screen.getAllByText('Prototype Project').length).toBeGreaterThanOrEqual(1);

    // Verify Explore Case Study links (both projects should be present in Robotics Selected Works)
    const links = screen.getAllByRole('link', { name: /explore case study/i });
    const blindStickLink = links.find((l) => l.getAttribute('href') === '/work/smart-blind-stick');
    expect(blindStickLink).toBeDefined();
    expect(blindStickLink).toHaveAttribute('href', '/work/smart-blind-stick');
  });

  it('renders dedicated Case Study page at /work/smart-blind-stick with all required sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/smart-blind-stick']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Hero Section Heading and Subtitle
    expect(
      screen.getByRole('heading', { name: /technology that supports independent mobility\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/an iot-powered assistive mobility system combining intelligent obstacle detection, directional haptic feedback and emergency communication\./i)
    ).toBeInTheDocument();

    // Prototype Project Status Banner
    expect(screen.getByText(/project verification status: prototype project/i)).toBeInTheDocument();
    expect(screen.getByText(/supplementary assistive technology notice:/i)).toBeInTheDocument();

    // Challenge & Solution Sections
    expect(screen.getByText(/the challenge: supporting safer independent navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/an intelligent assistive mobility system/i)).toBeInTheDocument();

    // 5 Core Capabilities
    expect(screen.getAllByText('Multi-Directional Detection').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Directional Haptic Feedback').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Motion & Orientation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('GPS Location Tracking').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Emergency Communication').length).toBeGreaterThanOrEqual(1);

    // System Architecture
    expect(screen.getByText(/esp32-s3 microcontroller, sensors & actuation outputs/i)).toBeInTheDocument();
    expect(screen.getAllByText('ESP32-S3 Microcontroller').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Front Ultrasonic Sensor').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Left Ultrasonic Sensor').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Right Ultrasonic Sensor').length).toBeGreaterThanOrEqual(1);

    // 6 Sequential Operational Steps
    expect(screen.getByText(/how the smart blind stick works/i)).toBeInTheDocument();
    expect(screen.getByText('Environmental Sensing')).toBeInTheDocument();
    expect(screen.getByText('Obstacle Detection')).toBeInTheDocument();
    expect(screen.getByText('Directional Feedback')).toBeInTheDocument();
    expect(screen.getByText('Motion Monitoring')).toBeInTheDocument();
    expect(screen.getByText('Location Identification')).toBeInTheDocument();
    expect(screen.getByText('Emergency Notification')).toBeInTheDocument();

    // Hardware Behind the Innovation (7 components)
    expect(screen.getByText(/hardware behind the innovation/i)).toBeInTheDocument();
    expect(screen.getAllByText('Ultrasonic Sensors (x3)').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('MPU6050 Motion Sensor').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Vibration Motors').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('GPS Module (NEO-6M / NEO-M8N)').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('SIMCom A7670C').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Battery Monitoring System').length).toBeGreaterThanOrEqual(1);

    // Designed Around Accessibility
    expect(screen.getByText(/designed around accessibility/i)).toBeInTheDocument();
    expect(screen.getByText(/important assistive scope & safety requirement:/i)).toBeInTheDocument();

    // Connected Emergency Assistance (Mockup)
    expect(screen.getByText(/connected emergency assistance/i)).toBeInTheDocument();
    expect(screen.getAllByText(/11\.0168° N, 76\.9558° E/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/maps\.google\.com/i).length).toBeGreaterThanOrEqual(1);

    // Inside the Smart Blind Stick (Gallery)
    expect(screen.getByText('Inside the Smart Blind Stick')).toBeInTheDocument();

    // Benefits & Future Enhancements
    expect(screen.getByText(/supporting smarter assistive mobility/i)).toBeInTheDocument();
    expect(screen.getByText(/proposed future enhancements/i)).toBeInTheDocument();
    expect(screen.getByText('Voice-Based Obstacle Announcements')).toBeInTheDocument();

    // Live CTA Button
    expect(screen.getAllByText(/inquire about assistive robotics/i).length).toBeGreaterThanOrEqual(1);
  });
});

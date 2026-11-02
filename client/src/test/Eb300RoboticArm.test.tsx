import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';

describe('EB-300 Robotic Arm — Robotics & Automation Selected Works & Case Study', () => {
  it('links eb-300-robotic-arm alongside agricultural animal detection and blind stick in Robotics service relatedProjectSlugs', () => {
    const roboticsService = servicesData.find((s) => s.slug === 'robotics' || s.id === 'robotics');
    expect(roboticsService).toBeDefined();
    expect(roboticsService?.relatedProjectSlugs).toContain('eb-300-robotic-arm');
    expect(roboticsService?.relatedProjectSlugs).toContain('smart-blind-stick');
    expect(roboticsService?.relatedProjectSlugs).toContain('ai-agricultural-animal-detection');
  });

  it('contains complete verified data model for eb-300-robotic-arm in projectsData', () => {
    const project = projectsData.find((p) => p.slug === 'eb-300-robotic-arm');
    expect(project).toBeDefined();
    expect(project?.title).toBe('EB-300 Robotic Arm');
    expect(project?.subtitle).toBe('6-Axis Industrial Robotic Manipulator');
    expect(project?.category).toBe('Industrial Robotics & Automation');
    expect(project?.industry).toBe('Manufacturing & Industrial Automation');
    expect(project?.statusBadge).toBe('Prototype Project');
    expect(project?.isDemonstrationOrPrototype).toBe(true);

    // Verified technology stack tags
    expect(project?.technologies).toEqual(
      expect.arrayContaining([
        'Industrial Robotics',
        '6-Axis Manipulation',
        'Motion Control',
        'Mechanical Design',
        'Embedded Systems',
        'Stepper & Servo Actuation',
        'Arduino Mega 2560',
        'Kinematic Positioning'
      ])
    );

    // Check authentic screenshots present
    expect(project?.heroImage).toBe('/images/projects/eb-300-robotic-arm/eb-300-overview.png');
    expect(project?.thumbnail).toBe('/images/projects/eb-300-robotic-arm/eb-300-overview.png');
    expect(project?.galleryImages.length).toBe(8);
    expect(project?.galleryImages).toEqual(
      expect.arrayContaining([
        '/images/projects/eb-300-robotic-arm/eb-300-overview.png',
        '/images/projects/eb-300-robotic-arm/eb-300-manipulator.png',
        '/images/projects/eb-300-robotic-arm/eb-300-workspace.png',
        '/images/projects/eb-300-robotic-arm/eb-300-views.png',
        '/images/projects/eb-300-robotic-arm/eb-300-dof.png',
        '/images/projects/eb-300-robotic-arm/eb-300-control.png',
        '/images/projects/eb-300-robotic-arm/eb-300-end-effectors.png',
        '/images/projects/eb-300-robotic-arm/eb-300-applications.png'
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
    expect(screen.getByText('EB-300 Robotic Arm')).toBeInTheDocument();
    expect(screen.getAllByText('Industrial Robotics & Automation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Manufacturing & Industrial Automation')).toBeInTheDocument();

    // Verify prototype status badge
    expect(screen.getAllByText('Prototype Project').length).toBeGreaterThanOrEqual(1);

    // Verify Explore Case Study links (all three projects should be present in Robotics Selected Works)
    const links = screen.getAllByRole('link', { name: /explore case study/i });
    const eb300Link = links.find((l) => l.getAttribute('href') === '/work/eb-300-robotic-arm');
    expect(eb300Link).toBeDefined();
    expect(eb300Link).toHaveAttribute('href', '/work/eb-300-robotic-arm');
  });

  it('renders dedicated Case Study page at /work/eb-300-robotic-arm with all required sections', () => {
    render(
      <MemoryRouter initialEntries={['/work/eb-300-robotic-arm']}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Hero Section Heading and Subtitle
    expect(
      screen.getByRole('heading', { name: /precision in motion\. innovation in robotics\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/an industrial-inspired six-axis robotic manipulator designed to demonstrate coordinated movement, flexible object handling and automated operations\./i)
    ).toBeInTheDocument();

    // Prototype Project Status Banner
    expect(screen.getByText(/project verification status: prototype project/i)).toBeInTheDocument();
    expect(screen.getByText(/engineering scope notice:/i)).toBeInTheDocument();

    // Challenge & Solution Sections
    expect(screen.getByText(/the challenge: flexible and controlled object handling/i)).toBeInTheDocument();
    expect(screen.getByText(/a multi-axis approach to robotic manipulation/i)).toBeInTheDocument();

    // 5 Core Elements of Solution
    expect(screen.getAllByText('Mechanical Structure').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Multi-Axis Movement').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Motion Control').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('End-Effector Interface').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Programmable Operations').length).toBeGreaterThanOrEqual(1);

    // Six-Axis Robotic Architecture
    expect(screen.getByText(/understanding the six axes of motion/i)).toBeInTheDocument();
    expect(screen.getByText('Base Rotation')).toBeInTheDocument();
    expect(screen.getByText('Shoulder Movement')).toBeInTheDocument();
    expect(screen.getByText('Elbow Movement')).toBeInTheDocument();
    expect(screen.getByText('Wrist 1 (Pitch & Roll)')).toBeInTheDocument();
    expect(screen.getByText('Wrist 2 (Bending)')).toBeInTheDocument();
    expect(screen.getByText('End Effector (Tool Roll)')).toBeInTheDocument();

    // 6 Sequential Operational Steps
    expect(screen.getByText(/how the robotic arm works/i)).toBeInTheDocument();
    expect(screen.getByText('Motion Command')).toBeInTheDocument();
    expect(screen.getByText('Joint Coordination')).toBeInTheDocument();
    expect(screen.getByText('Base and Arm Movement')).toBeInTheDocument();
    expect(screen.getByText('Wrist Positioning')).toBeInTheDocument();
    expect(screen.getByText('Object Interaction')).toBeInTheDocument();
    expect(screen.getByText('Return or Next Operation')).toBeInTheDocument();

    // Mechanical Components Showcase (8 components)
    expect(screen.getByText(/engineering behind the eb-300/i)).toBeInTheDocument();
    expect(screen.getAllByText('Base Assembly').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Shoulder Joint').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Upper Arm Link').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Elbow Joint').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Wrist Assembly').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('End-Effector Mount').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Actuation System').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Controller').length).toBeGreaterThanOrEqual(1);

    // End-Effector Options
    expect(screen.getByText(/modular end-effector tooling options/i)).toBeInTheDocument();
    expect(screen.getAllByText('Parallel Gripper').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Vacuum Gripper').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Magnetic Gripper').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Custom Tool Flange').length).toBeGreaterThanOrEqual(1);

    // Industrial Applications
    expect(screen.getByText(/where robotic manipulation can make a difference/i)).toBeInTheDocument();
    expect(screen.getAllByText('Pick-and-Place').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Material Handling').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Assembly Assistance').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Sorting Operations').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Educational Robotics').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Industrial Automation').length).toBeGreaterThanOrEqual(1);

    // Inside the EB-300 Robotic Arm (Gallery)
    expect(screen.getByText('Inside the EB-300 Robotic Arm')).toBeInTheDocument();

    // Benefits & Future Enhancements
    expect(screen.getByText(/designed for flexible robotic automation/i)).toBeInTheDocument();
    expect(screen.getByText(/proposed future enhancements/i)).toBeInTheDocument();
    expect(screen.getByText('Advanced Inverse Kinematics')).toBeInTheDocument();
    expect(screen.getByText('Computer Vision Recognition')).toBeInTheDocument();

    // Live CTA Button
    expect(screen.getAllByText(/inquire about industrial robotics/i).length).toBeGreaterThanOrEqual(1);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ParticleBackground } from '../components/effects/ParticleBackground';
import { HeroSection } from '../components/home/HeroSection';

describe('Cinematic Animated Particle Constellation Background', () => {
  beforeEach(() => {
    // Mock HTMLCanvasElement.getContext
    const mockContext = {
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      scale: vi.fn(),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      createRadialGradient: vi.fn().mockReturnValue({
        addColorStop: vi.fn(),
      }),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      globalAlpha: 1,
    };

    HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextId) => {
      if (contextId === '2d') {
        return mockContext;
      }
      return null;
    }) as any;

    // Mock ResizeObserver
    global.ResizeObserver = class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as any;
  });

  it('renders ParticleBackground canvas and atmospheric containers', () => {
    const { container } = render(
      <ParticleBackground
        particleCount={50}
        connectionDistance={100}
        particleSpeed={1}
        enableMouseInteraction={true}
        enableGlow={true}
      />
    );

    const particleContainer = container.querySelector('.ph-particle-container');
    expect(particleContainer).toBeInTheDocument();

    const canvas = container.querySelector('canvas.ph-particle-canvas');
    expect(canvas).toBeInTheDocument();

    const goldAmbient = container.querySelector('.ph-particle-ambient-gold');
    expect(goldAmbient).toBeInTheDocument();

    const blueAmbient = container.querySelector('.ph-particle-ambient-blue');
    expect(blueAmbient).toBeInTheDocument();
  });

  it('renders cleanly in HeroSection behind content', () => {
    const { container } = render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    const canvas = container.querySelector('canvas.ph-particle-canvas');
    expect(canvas).toBeInTheDocument();

    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toContain('We turn ambitious ideas into intelligent solutions');
  });
});

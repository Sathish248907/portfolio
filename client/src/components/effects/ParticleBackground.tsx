import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';

export interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  particleSpeed?: number;
  enableMouseInteraction?: boolean;
  enableGlow?: boolean;
  backgroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  glowColor: string;
  glowRadius: number;
  hasGlow: boolean;
  isGold: boolean;
  connectable: boolean; // false for distant micro-dust to give 3D depth
  layerSpeed: number;
}

// Visual Color Tokens Matching Reference Image
const COLOR_GOLD_CORE = '#FFE8C2';
const COLOR_GOLD = '#DFA561';
const COLOR_WHITE_CORE = '#FFFFFF';
const COLOR_CYAN_WHITE = '#D6F0FF';
const COLOR_MUTED_BLUE = '#6B90A6';

// Pre-render radial glow sprites on small offscreen canvases
function createGlowSprite(r: number, g: number, b: number, size = 64): HTMLCanvasElement | undefined {
  try {
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return undefined;

    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
    gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.45)`);
    gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.15)`);
    gradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, 0.04)`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();
    return offscreen;
  } catch {
    return undefined;
  }
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount: customParticleCount,
  connectionDistance: customConnectionDistance,
  particleSpeed = 1,
  enableMouseInteraction = true,
  enableGlow = true,
  backgroundColor,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d', { alpha: true });
    } catch {
      return;
    }
    if (!ctx) return;

    // Detect user preferences & device features
    let prefersReducedMotion = false;
    let isTouchDevice = false;
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        isTouchDevice =
          'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
      }
    } catch {
      // Fallback
    }

    const allowMouse = enableMouseInteraction && !isTouchDevice;

    // Pre-render vibrant glow sprites (Gold: 223, 165, 97; Cyan-White: 180, 230, 255; Blue: 107, 144, 166)
    const goldGlowLarge = createGlowSprite(223, 165, 97, 80);
    const goldGlowMid = createGlowSprite(223, 165, 97, 48);
    const whiteGlowLarge = createGlowSprite(195, 235, 255, 80);
    const whiteGlowMid = createGlowSprite(195, 235, 255, 48);

    let animationFrameId: number = 0;
    let particles: Particle[] = [];
    let width = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
    let height = container.clientHeight || 750;
    let isTabVisible = typeof document !== 'undefined' ? !document.hidden : true;

    // Mouse coordinates (relative to canvas)
    let mouseX = -10000;
    let mouseY = -10000;

    const getResponsiveConfig = (w: number) => {
      let count = customParticleCount;
      let dist = customConnectionDistance;

      if (count === undefined) {
        if (w >= 1200) {
          count = 85;
        } else if (w >= 768) {
          count = 55;
        } else {
          count = 35;
        }
      }

      if (dist === undefined) {
        if (w >= 1200) {
          dist = 125;
        } else if (w >= 768) {
          dist = 95;
        } else {
          dist = 65;
        }
      }

      return { count, dist };
    };

    let { count: activeParticleCount, dist: activeConnectionDistance } = getResponsiveConfig(width);
    let maxDistSq = activeConnectionDistance * activeConnectionDistance;

    const initParticles = () => {
      particles = [];
      const config = getResponsiveConfig(width);
      activeParticleCount = config.count;
      activeConnectionDistance = config.dist;
      maxDistSq = activeConnectionDistance * activeConnectionDistance;

      for (let i = 0; i < activeParticleCount; i++) {
        const roll = Math.random();
        let color: string;
        let glowColor: string;
        let isGold = false;
        let hasGlow = false;
        let glowRadius = 32;
        let radius: number;
        let layerSpeed: number;
        let connectable = true;

        if (roll < 0.16) {
          // Major Glowing Golden Anchor Star
          color = COLOR_GOLD;
          glowColor = 'rgba(223, 165, 97, 0.45)';
          isGold = true;
          hasGlow = true;
          glowRadius = 40;
          radius = Math.random() * 0.8 + 2.8;
          layerSpeed = 1.15;
        } else if (roll < 0.32) {
          // Major Glowing Blue-White Anchor Star
          color = COLOR_CYAN_WHITE;
          glowColor = 'rgba(195, 235, 255, 0.42)';
          isGold = false;
          hasGlow = true;
          glowRadius = 40;
          radius = Math.random() * 0.8 + 2.8;
          layerSpeed = 1.15;
        } else if (roll < 0.52) {
          // Medium Constellation Node (Gold)
          color = COLOR_GOLD;
          glowColor = 'rgba(223, 165, 97, 0.25)';
          isGold = true;
          hasGlow = true;
          glowRadius = 24;
          radius = Math.random() * 0.7 + 1.8;
          layerSpeed = 0.9;
        } else if (roll < 0.75) {
          // Medium Constellation Node (White / Cyan)
          color = COLOR_CYAN_WHITE;
          glowColor = 'rgba(195, 235, 255, 0.22)';
          isGold = false;
          hasGlow = true;
          glowRadius = 24;
          radius = Math.random() * 0.7 + 1.8;
          layerSpeed = 0.9;
        } else {
          // Distant background star dust (gives cosmic 3D depth, no lines)
          color = Math.random() < 0.5 ? COLOR_MUTED_BLUE : COLOR_CYAN_WHITE;
          glowColor = 'transparent';
          isGold = false;
          hasGlow = false;
          glowRadius = 0;
          radius = Math.random() * 0.6 + 0.8;
          layerSpeed = 0.5;
          connectable = false;
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.2 + 0.08) * particleSpeed;

        particles.push({
          x: Math.random() * Math.max(width, 10),
          y: Math.random() * Math.max(height, 10),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          baseAlpha: Math.random() * 0.4 + 0.55,
          alpha: 0.7,
          twinkleSpeed: Math.random() * 0.025 + 0.012,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
          glowColor,
          glowRadius,
          hasGlow: enableGlow && hasGlow,
          isGold,
          connectable,
          layerSpeed,
        });
      }
    };

    const applySize = (newW: number, newH: number) => {
      if (!canvas || !ctx || newW <= 0 || newH <= 0) return;
      width = newW;
      height = newH;
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    applySize(
      container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200),
      container.clientHeight || 750
    );

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const contentWidth = Math.floor(entry.contentRect.width);
          const contentHeight = Math.floor(entry.contentRect.height);
          if (
            contentWidth > 0 &&
            contentHeight > 0 &&
            (Math.abs(contentWidth - width) > 4 || Math.abs(contentHeight - height) > 4)
          ) {
            applySize(contentWidth, contentHeight);
          }
        }
      });
      resizeObserver.observe(container);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      try {
        const rect = canvas.getBoundingClientRect();
        if (
          e.clientX >= rect.left - 40 &&
          e.clientX <= rect.right + 40 &&
          e.clientY >= rect.top - 40 &&
          e.clientY <= rect.bottom + 40
        ) {
          mouseX = e.clientX - rect.left;
          mouseY = e.clientY - rect.top;
        } else {
          mouseX = -10000;
          mouseY = -10000;
        }
      } catch {
        mouseX = -10000;
        mouseY = -10000;
      }
    };

    const handleMouseLeave = () => {
      mouseX = -10000;
      mouseY = -10000;
    };

    if (allowMouse && typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    if (prefersReducedMotion) {
      try {
        ctx.clearRect(0, 0, width, height);

        // Static constellation rendering
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          if (!p1.connectable) continue;
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (!p2.connectable) continue;
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxDistSq) {
              const dist = Math.sqrt(distSq);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(140, 185, 210, ${(1 - dist / activeConnectionDistance) * 0.18})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.hasGlow) {
            const sprite = p.isGold ? (p.glowRadius > 30 ? goldGlowLarge : goldGlowMid) : (p.glowRadius > 30 ? whiteGlowLarge : whiteGlowMid);
            if (sprite) {
              const half = sprite.width / 2;
              ctx.globalAlpha = 0.5;
              ctx.drawImage(sprite, p.x - half, p.y - half);
            }
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.isGold ? COLOR_GOLD_CORE : COLOR_WHITE_CORE;
          ctx.globalAlpha = p.baseAlpha;
          ctx.fill();
        }
      } catch {
        // Fallback
      }

      return () => {
        if (resizeObserver) resizeObserver.disconnect();
        if (typeof document !== 'undefined') {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
        if (allowMouse && typeof window !== 'undefined') {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }

    const mouseRadius = 140;
    const mouseRadiusSq = mouseRadius * mouseRadius;

    // Realtime 60 FPS Render Loop
    const render = () => {
      if (!isTabVisible || !ctx) return;

      try {
        ctx.clearRect(0, 0, width, height);

        const pCount = particles.length;

        // 1. Update positions & soft repulsion
        for (let i = 0; i < pCount; i++) {
          const p = particles[i];

          p.x += p.vx * p.layerSpeed;
          p.y += p.vy * p.layerSpeed;

          // Margin wrapping
          const margin = 25;
          if (p.x < -margin) p.x = width + margin;
          else if (p.x > width + margin) p.x = -margin;
          if (p.y < -margin) p.y = height + margin;
          else if (p.y > height + margin) p.y = -margin;

          p.twinklePhase += p.twinkleSpeed;
          p.alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(p.twinklePhase));

          if (allowMouse && mouseX > -5000) {
            const dxM = p.x - mouseX;
            const dyM = p.y - mouseY;
            const distMSq = dxM * dxM + dyM * dyM;

            if (distMSq < mouseRadiusSq && distMSq > 1) {
              const distM = Math.sqrt(distMSq);
              const force = (1 - distM / mouseRadius) * 0.8;
              p.x += (dxM / distM) * force;
              p.y += (dyM / distM) * force;
            }
          }
        }

        // 2. Draw Geometric Constellation Connecting Lines
        for (let i = 0; i < pCount; i++) {
          const p1 = particles[i];
          if (!p1.connectable) continue;

          for (let j = i + 1; j < pCount; j++) {
            const p2 = particles[j];
            if (!p2.connectable) continue;

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const dist = Math.sqrt(distSq);
              const lineAlpha = (1 - dist / activeConnectionDistance) * 0.22;

              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              // Tint line slightly warm if both nodes are gold
              if (p1.isGold && p2.isGold) {
                ctx.strokeStyle = `rgba(223, 165, 97, ${lineAlpha * 1.15})`;
              } else {
                ctx.strokeStyle = `rgba(140, 185, 210, ${lineAlpha})`;
              }
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }

        // 3. Draw Radiant Glow Halos (Underneath Core Dots)
        for (let i = 0; i < pCount; i++) {
          const p = particles[i];
          if (p.hasGlow) {
            const sprite = p.isGold
              ? (p.glowRadius > 30 ? goldGlowLarge : goldGlowMid)
              : (p.glowRadius > 30 ? whiteGlowLarge : whiteGlowMid);

            if (sprite) {
              const half = sprite.width / 2;
              ctx.globalAlpha = p.alpha * 0.65;
              ctx.drawImage(sprite, p.x - half, p.y - half);
            }
          }
        }

        // 4. Draw Core Dots
        for (let i = 0; i < pCount; i++) {
          const p = particles[i];

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.isGold ? COLOR_GOLD_CORE : COLOR_WHITE_CORE;
          ctx.globalAlpha = Math.min(p.alpha * 1.2, 1);
          ctx.fill();

          // Subtle secondary ring on prominent nodes
          if (p.hasGlow && p.glowRadius > 30) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + 1.2, 0, Math.PI * 2);
            ctx.strokeStyle = p.isGold ? 'rgba(255, 232, 194, 0.4)' : 'rgba(214, 240, 255, 0.4)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        animationFrameId = requestAnimationFrame(render);
      } catch {
        // Catch gracefully
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
      if (allowMouse && typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [
    customParticleCount,
    customConnectionDistance,
    particleSpeed,
    enableMouseInteraction,
    enableGlow,
  ]);

  const containerStyle: React.CSSProperties = {
    ...(backgroundColor ? { background: backgroundColor } : {}),
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={`ph-particle-container ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      {/* Soft Ambient Cinematic Illumination Matching Reference */}
      <div className="ph-particle-ambient-gold" />
      <div className="ph-particle-ambient-blue" />

      {/* Hardware-Accelerated Canvas */}
      <canvas ref={canvasRef} className="ph-particle-canvas" />
    </div>
  );
};

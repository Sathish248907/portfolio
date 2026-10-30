import React from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';
import { ParticleHeroCanvas } from './ParticleHeroCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center pt-10 pb-20 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Interactive Particle Canvas */}
      <ParticleHeroCanvas />

      {/* Atmospheric lighting & cyber grid */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-electric-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container size="lg" className="relative z-10 text-center space-y-8">
        
        {/* Eyebrow */}
        <Reveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-neon-cyan animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERING THE FUTURE</span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal direction="up" delay={0.2}>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-5xl mx-auto">
            We turn ambitious ideas into{' '}
            <span className="text-gradient-cyan">intelligent solutions.</span>
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal direction="up" delay={0.3}>
          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-light">
            From digital experiences and financial technology to healthcare, engineering, staffing, trading, and marketing — Peace Haven brings technology and business expertise together to move organizations forward.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              to="/start-a-project"
              variant="cyan"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Project
            </Button>

            <Button
              to="/portfolio"
              variant="secondary"
              size="lg"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Explore Our Work
            </Button>
          </div>
        </Reveal>

        {/* Abstract technological geometry preview */}
        <Reveal direction="up" delay={0.5}>
          <div className="pt-10 flex items-center justify-center">
            <div className="relative w-44 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-md pointer-events-none" />
              <div className="flex items-center gap-6 font-mono text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Engineering Systems
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-slate-400">Business Synergy</span>
              </div>
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
};

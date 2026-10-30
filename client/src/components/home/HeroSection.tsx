import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';
import { ParticleBackground } from '../effects/ParticleBackground';

export const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center pt-14 pb-24 overflow-hidden bg-[#07151e]"
      style={{
        background: 'radial-gradient(ellipse 95% 85% at 50% 30%, #0d232e 0%, #07151e 52%, #030a0f 100%)'
      }}
      aria-label="Hero Section"
    >
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        enableGlow={true}
        enableMouseInteraction={true}
        particleSpeed={0.9}
      />

      <Container size="lg" className="relative z-10 text-center space-y-8">
        
        {/* Eyebrow Pill */}
        <Reveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c1f29]/90 border border-[#dfa561]/40 text-[#dfa561] text-xs font-mono uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#dfa561]" />
            <span>INNOVATION MEETS IMPACT</span>
          </div>
        </Reveal>

        {/* Headline matching reference: 'solutions.' in signature warm amber */}
        <Reveal direction="up" delay={0.2}>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-5xl mx-auto">
            We turn ambitious ideas into<br className="hidden sm:inline" /> intelligent{' '}
            <span className="text-[#dfa561]">solutions.</span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal direction="up" delay={0.3}>
          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-light">
            From digital experiences and financial technology to healthcare, engineering, staffing, trading, and marketing — Peace Haven brings technology and business expertise together to move organizations forward.
          </p>
        </Reveal>

        {/* CTAs matching reference */}
        <Reveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              to="/start-a-project"
              variant="champagne"
              size="lg"
              className="bg-[#dfa561] hover:bg-[#d09550] text-[#08151e] font-semibold px-7 py-3.5 rounded-2xl shadow-lg border-0 transition-transform hover:scale-[1.02]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Project
            </Button>

            <Button
              to="/portfolio"
              variant="secondary"
              size="lg"
              className="bg-[#0b1c26]/90 hover:bg-[#122835] text-white border border-[#213a48] hover:border-[#dfa561]/40 px-7 py-3.5 rounded-2xl transition-transform hover:scale-[1.02]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Our Work
            </Button>
          </div>
        </Reveal>

        {/* Bottom pill preview indicator */}
        <Reveal direction="up" delay={0.5}>
          <div className="pt-8 flex items-center justify-center">
            <div className="relative inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0a1820]/90 border border-[#1b3240] text-xs font-mono text-[#8fa7b5] shadow-sm">
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                Engineering Systems
              </span>
              <span className="text-[#324a59] font-light">|</span>
              <span className="text-[#8fa7b5]">Business Synergy</span>
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
};

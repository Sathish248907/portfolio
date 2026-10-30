import React from 'react';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';
import { Compass, CheckCircle2, Cpu, Globe2, Zap } from 'lucide-react';
import { ParticleBackground } from '../effects/ParticleBackground';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07151e] border-t border-[#1b3240]" aria-labelledby="intro-heading">
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        particleCount={45}
        connectionDistance={105}
        particleSpeed={0.7}
        enableGlow={true}
        enableMouseInteraction={true}
      />

      <Container size="lg" className="relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 border border-sage-500/20 relative overflow-hidden bg-[#0c1f2a]/85 backdrop-blur-md shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Descriptive Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal direction="left" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-200/10 border border-[#dfa561]/35 text-[#dfa561] text-xs font-mono uppercase tracking-widest">
                  <Compass className="w-3.5 h-3.5 text-[#dfa561]" />
                  <span>Integrated Enterprise Capabilities</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <h2 
                  id="intro-heading"
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
                >
                  One partner. Multiple capabilities. A shared vision.
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                  Peace Haven brings together technology, business services, and engineering capabilities to help organizations develop digital products, improve workflows, explore new opportunities, and solve practical challenges.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.4}>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#dfa561] shrink-0" />
                    <span>Cross-Discipline Synthesis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#dfa561] shrink-0" />
                    <span>Engineering Problem Solving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#dfa561] shrink-0" />
                    <span>Practical System Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#dfa561] shrink-0" />
                    <span>Long-Term Product Evolution</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Abstract Technology Visual Column */}
            <div className="lg:col-span-5">
              <Reveal direction="right" delay={0.3}>
                <div className="relative aspect-square max-w-md mx-auto rounded-2xl bg-charcoal-900 border border-sage-500/25 p-6 flex items-center justify-center overflow-hidden shadow-card-dark">
                  
                  {/* Subtle geometric grid background */}
                  <div className="absolute inset-0 bg-subtle-grid opacity-25" />
                  
                  {/* Concentric rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-sage-500/15" />
                  <div className="absolute w-48 h-48 rounded-full border border-dashed border-[#dfa561]/25" />
                  <div className="absolute w-32 h-32 rounded-full border border-teal-500/20" />

                  {/* Core emblem */}
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-700 via-sage-500 to-[#dfa561] p-[1.5px] mx-auto shadow-md">
                      <div className="w-full h-full bg-charcoal-900 rounded-[14px] flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-[#dfa561]" />
                      </div>
                    </div>
                    <div>
                      <span className="font-heading font-bold text-white text-sm block">Peace Haven</span>
                      <span className="font-mono text-[11px] text-[#dfa561]">Integrated Platform</span>
                    </div>
                  </div>

                  {/* Connected satellite nodes */}
                  <div className="absolute top-8 left-8 p-2 rounded-lg bg-charcoal-850 border border-sage-500/30 text-[#dfa561] flex items-center gap-1.5 text-[10px] font-mono shadow-sm">
                    <Globe2 className="w-3.5 h-3.5 text-[#dfa561]" />
                    <span className="text-warm-200">Cloud & Digital</span>
                  </div>
                  <div className="absolute bottom-8 right-8 p-2 rounded-lg bg-charcoal-850 border border-sage-500/30 text-[#dfa561] flex items-center gap-1.5 text-[10px] font-mono shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-[#dfa561]" />
                    <span className="text-warm-200">Automation & Tech</span>
                  </div>

                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

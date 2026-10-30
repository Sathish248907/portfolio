import React from 'react';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';
import { Compass, CheckCircle2, Cpu, Globe2, ShieldCheck, Zap } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="intro-heading">
      <Container size="lg">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-slate-800 relative overflow-hidden bg-gradient-to-r from-navy-900/90 via-navy-850/80 to-navy-900/90 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Descriptive Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal direction="left" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                  <Compass className="w-3.5 h-3.5" />
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
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Cross-Discipline Synthesis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Engineering Problem Solving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Practical System Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Long-Term Product Evolution</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Abstract Technology Visual Column */}
            <div className="lg:col-span-5">
              <Reveal direction="right" delay={0.3}>
                <div className="relative aspect-square max-w-md mx-auto rounded-2xl bg-navy-950/80 border border-slate-800 p-6 flex items-center justify-center overflow-hidden">
                  
                  {/* Subtle geometric grid background */}
                  <div className="absolute inset-0 bg-cyber-grid opacity-30" />
                  
                  {/* Concentric rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-cyan-500/10 animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute w-48 h-48 rounded-full border border-dashed border-electric-500/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                  <div className="absolute w-32 h-32 rounded-full border border-cyan-400/20" />

                  {/* Core emblem */}
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electric-600 via-cyan-500 to-electric-400 p-[1.5px] mx-auto shadow-neon-cyan">
                      <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <span className="font-heading font-bold text-white text-sm block">Peace Haven</span>
                      <span className="font-mono text-[11px] text-cyan-400">Integrated Platform</span>
                    </div>
                  </div>

                  {/* Connected orbiting satellite nodes */}
                  <div className="absolute top-8 left-8 p-2 rounded-lg bg-navy-900 border border-slate-700/80 text-cyan-400 flex items-center gap-1.5 text-[10px] font-mono">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>Cloud & Digital</span>
                  </div>
                  <div className="absolute bottom-8 right-8 p-2 rounded-lg bg-navy-900 border border-slate-700/80 text-cyan-400 flex items-center gap-1.5 text-[10px] font-mono">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Automation & Tech</span>
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

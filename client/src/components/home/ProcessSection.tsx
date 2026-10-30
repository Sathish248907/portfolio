import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { ParticleBackground } from '../effects/ParticleBackground';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding organizational objectives, operational bottlenecks, system constraints, and technical requirements.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Formulating modular system architecture, interface specifications, interaction flows, and execution milestones.',
  },
  {
    number: '03',
    title: 'Engineer',
    description: 'Writing maintainable code, assembling hardware-in-the-loop controls, and building resilient data pipelines.',
  },
  {
    number: '04',
    title: 'Validate',
    description: 'Executing comprehensive unit, integration, stress, and compliance test suites against realistic operational scenarios.',
  },
  {
    number: '05',
    title: 'Deploy',
    description: 'Coordinating reliable zero-downtime rollouts with automated health monitors, telemetry, and verification gates.',
  },
  {
    number: '06',
    title: 'Evolve',
    description: 'Refining systems from real telemetry, scaling capacity, and continuously enhancing performance as demands grow.',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07151e] border-t border-[#1b3240]" aria-labelledby="process-heading">
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        particleCount={50}
        connectionDistance={105}
        particleSpeed={0.7}
        enableGlow={true}
        enableMouseInteraction={true}
      />

      <Container size="lg" className="space-y-16 relative z-10">
        
        <Reveal direction="up">
          <SectionHeading
            theme="dark"
            eyebrow="Our Methodology"
            title="From first conversation to real-world impact."
            subtitle="A structured, transparent engineering lifecycle designed to turn ambitious concepts into reliable, production-ready systems."
          />
        </Reveal>

        {/* Desktop Connected Process Line & Responsive Grid */}
        <div className="relative">
          
          {/* Subtle connected horizontal progress line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sage-500/20 via-[#dfa561]/35 to-sage-500/20 -translate-y-8 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <Reveal key={step.number} direction="up" delay={idx * 0.08}>
                <div className="bg-[#0b1c26]/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 flex flex-col justify-between h-full group hover:border-[#dfa561]/50 shadow-xl backdrop-blur-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-extrabold text-2xl text-[#dfa561] block">
                        {step.number}
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#dfa561]/40 group-hover:bg-[#dfa561] transition-all" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-white group-hover:text-[#dfa561] transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
};

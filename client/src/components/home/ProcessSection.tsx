import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';

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
    <section className="py-20 relative border-t border-slate-800/80" aria-labelledby="process-heading">
      <Container size="lg" className="space-y-16">
        
        <Reveal direction="up">
          <SectionHeading
            eyebrow="Our Methodology"
            title="From first conversation to real-world impact."
            subtitle="A structured, transparent engineering lifecycle designed to turn ambitious concepts into reliable, production-ready systems."
          />
        </Reveal>

        {/* Desktop Connected Process Line & Responsive Grid */}
        <div className="relative">
          
          {/* Subtle connected horizontal progress bar on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/10 via-cyan-500/40 to-electric-500/20 -translate-y-8 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <Reveal key={step.number} direction="up" delay={idx * 0.08}>
                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between h-full group hover:border-cyan-500/40 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-extrabold text-2xl text-gradient-cyan block">
                        {step.number}
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 group-hover:shadow-neon-cyan transition-all" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
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

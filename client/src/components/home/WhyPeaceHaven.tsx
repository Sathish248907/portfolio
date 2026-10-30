import React from 'react';
import { Target, Layers, TrendingUp } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { ParticleBackground } from '../effects/ParticleBackground';

interface PrincipleItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const principles: PrincipleItem[] = [
  {
    icon: Target,
    title: 'Purpose-driven solutions',
    description: 'We shape architectures around genuine operational needs and measurable objectives, avoiding unnecessary complexity and over-engineered abstractions.',
  },
  {
    icon: Layers,
    title: 'Connected capabilities',
    description: 'Combining software engineering, data systems, automation, and technical staffing enables cohesive solutions without the friction of fragmented providers.',
  },
  {
    icon: TrendingUp,
    title: 'Built to evolve',
    description: 'Systems are designed with modular boundaries and clean interfaces, allowing your technology to scale gracefully as organizational demands expand.',
  },
];

export const WhyPeaceHaven: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07151e] border-t border-[#1b3240]" aria-labelledby="why-heading">
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        particleCount={45}
        connectionDistance={110}
        particleSpeed={0.7}
        enableGlow={true}
        enableMouseInteraction={true}
      />

      <Container size="lg" className="space-y-14 relative z-10">
        
        <Reveal direction="up">
          <SectionHeading
            theme="dark"
            eyebrow="Core Philosophy"
            title="Engineering with purpose. Technology with direction."
            subtitle="How we approach technology partnerships, system reliability, and long-term business value."
          />
        </Reveal>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} direction="up" delay={idx * 0.1}>
                <div className="bg-[#0b1c26]/90 p-8 rounded-3xl border border-sage-500/25 space-y-4 h-full flex flex-col justify-between group hover:border-[#dfa561]/50 shadow-xl backdrop-blur-md transition-all">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-charcoal-850 border border-sage-500/30 flex items-center justify-center text-[#dfa561] group-hover:bg-[#dfa561] group-hover:text-[#08151e] transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#dfa561] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

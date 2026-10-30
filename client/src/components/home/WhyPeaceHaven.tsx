import React from 'react';
import { Target, Layers, TrendingUp } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';

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
    <section className="py-20 relative" aria-labelledby="why-heading">
      <Container size="lg" className="space-y-14">
        
        <Reveal direction="up">
          <SectionHeading
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
                <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4 h-full flex flex-col justify-between group hover:border-cyan-500/40 transition-colors">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:bg-electric-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
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

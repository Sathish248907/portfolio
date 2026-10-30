import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  TrendingUp, 
  HeartPulse, 
  Building, 
  ShoppingCart, 
  Truck, 
  Rocket, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';

interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const targetIndustries: IndustryItem[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing and industrial operations',
    description: 'Factory floor automation, autonomous mobile robots (AMRs), SCADA telemetry, and automated optical inspection.',
    icon: Factory,
  },
  {
    id: 'financial',
    title: 'Financial services',
    description: 'Double-entry ledger engines, payment routing pipelines, compliance automation, and institutional financial technology.',
    icon: TrendingUp,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Clinic portals, telemedicine workflows, remote patient monitoring platforms, and health data interoperability.',
    icon: HeartPulse,
  },
  {
    id: 'real-estate',
    title: 'Real estate',
    description: 'Property management dashboards, tenant workflow platforms, and drone aerial thermography for infrastructure review.',
    icon: Building,
  },
  {
    id: 'retail',
    title: 'Retail and e-commerce',
    description: 'Omnichannel commerce platforms, automated inventory synchronization, and conversion-optimized digital experiences.',
    icon: ShoppingCart,
  },
  {
    id: 'logistics',
    title: 'Logistics and transportation',
    description: 'Warehouse fleet management, route optimization tools, supply chain tracking, and automated sorting controls.',
    icon: Truck,
  },
  {
    id: 'startups',
    title: 'Technology startups',
    description: 'Rapid MVP engineering, scalable cloud foundations, technical squad augmentation, and architecture advisory.',
    icon: Rocket,
  },
  {
    id: 'business-services',
    title: 'Business and professional services',
    description: 'Internal workflow automation, secure client collaboration portals, and data analytics dashboards.',
    icon: Briefcase,
  },
];

export const IndustriesSection: React.FC = () => {
  return (
    <section className="py-20 relative" aria-labelledby="industries-heading">
      <Container size="lg" className="space-y-12">
        
        <Reveal direction="up">
          <SectionHeading
            eyebrow="Target Domains"
            title="Technology for the challenges that matter."
            subtitle="Architectural capabilities built for organizations tackling complex operational, technical, and commercial demands."
          />
        </Reveal>

        {/* 8 Target Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetIndustries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <Reveal key={ind.id} direction="up" delay={index * 0.05}>
                <Link
                  to="/industries"
                  className="group p-6 rounded-2xl glass-card border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 h-full"
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-xl bg-navy-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:bg-electric-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {ind.title}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {ind.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300 mt-4">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

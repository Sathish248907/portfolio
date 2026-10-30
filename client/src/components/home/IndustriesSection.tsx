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
import { ParticleBackground } from '../effects/ParticleBackground';

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
    description: 'HIPAA-aligned clinical platforms, medical telemetry streaming, hospital ERP interfaces, and appointment engines.',
    icon: HeartPulse,
  },
  {
    id: 'government',
    title: 'Government and public sector',
    description: 'Secure citizen-facing portals, municipal workflow systems, geospatial drone mapping, and audit-compliant records.',
    icon: Building,
  },
  {
    id: 'retail',
    title: 'Retail and commerce',
    description: 'Headless storefront architectures, real-time inventory synchronization, payment routing, and customer analytics.',
    icon: ShoppingCart,
  },
  {
    id: 'logistics',
    title: 'Logistics and supply chain',
    description: 'Fleet dispatch telematics, warehouse automation middleware, drone inspection pipelines, and route optimization.',
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
    <section className="py-24 relative overflow-hidden bg-[#07151e] border-t border-[#1b3240]" aria-labelledby="industries-heading">
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        particleCount={55}
        connectionDistance={115}
        particleSpeed={0.7}
        enableGlow={true}
        enableMouseInteraction={true}
      />

      <Container size="lg" className="space-y-14 relative z-10">
        
        <Reveal direction="up">
          <SectionHeading
            theme="dark"
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
                  className="group p-6 rounded-2xl bg-[#0b1c26]/90 border border-sage-500/25 hover:border-[#dfa561]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 h-full shadow-xl backdrop-blur-md"
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-xl bg-charcoal-850 border border-sage-500/30 flex items-center justify-center text-[#dfa561] group-hover:bg-[#dfa561] group-hover:text-[#08151e] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#dfa561] transition-colors">
                        {ind.title}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
                        {ind.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-sage-500/20 flex items-center justify-between text-xs font-mono text-[#dfa561] group-hover:text-champagne-300 mt-4">
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

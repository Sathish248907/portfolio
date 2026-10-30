import React from 'react';
import { 
  Code2, 
  Wallet, 
  Bot, 
  Navigation, 
  HeartPulse, 
  Users, 
  TrendingUp, 
  Megaphone 
} from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { ServiceCard, ServiceCardData } from './ServiceCard';
import { ParticleBackground } from '../effects/ParticleBackground';

export const eightServices: ServiceCardData[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    slug: 'web-development',
    description: 'Responsive websites, web applications, e-commerce platforms, and custom business software.',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Core Services',
    route: '/services/web-development',
  },
  {
    id: 'fintech',
    title: 'FinTech',
    slug: 'fintech',
    description: 'Financial software, payment integrations, transaction workflows, and financial technology solutions.',
    icon: Wallet,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    badge: 'Financial Systems',
    route: '/services/fintech',
  },
  {
    id: 'robotics',
    title: 'Robotics & Automation',
    slug: 'robotics',
    description: 'Robotics applications, intelligent control, prototyping, and automation engineering.',
    icon: Bot,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Automation Engineering',
    route: '/services/robotics',
  },
  {
    id: 'drones',
    title: 'Drone Technology',
    slug: 'drones',
    description: 'Drone-enabled applications for aerial data collection, mapping, inspection, and monitoring.',
    icon: Navigation,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    badge: 'Aerial Systems',
    route: '/services/drones',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Solutions',
    slug: 'healthcare',
    description: 'Healthcare technology, clinic websites, appointment workflows, and digital tools for healthcare operations.',
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    badge: 'Digital Health',
    route: '/services/healthcare',
  },
  {
    id: 'us-staffing',
    title: 'US Staffing',
    slug: 'us-staffing',
    description: 'Recruitment support, candidate sourcing, talent coordination, and staffing workflows for eligible US-market clients.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    badge: 'Talent Sourcing',
    route: '/services/us-staffing',
  },
  {
    id: 'trading',
    title: 'Trading',
    slug: 'trading',
    description: 'Trading-related software, analytics dashboards, market-data interfaces, and business workflow tools.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=800&q=80',
    badge: 'Market Analytics',
    route: '/services/trading',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Search engine optimization, content strategy, campaign management, analytics, and digital growth services.',
    icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
    badge: 'Growth Strategy',
    route: '/services/digital-marketing',
  },
];

export const ServiceGrid: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07151e] border-t border-[#1b3240]" aria-labelledby="services-heading">
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        particleCount={65}
        connectionDistance={115}
        particleSpeed={0.7}
        enableGlow={true}
        enableMouseInteraction={true}
      />

      <Container size="lg" className="space-y-14 relative z-10">
        
        <Reveal direction="up">
          <SectionHeading
            theme="dark"
            eyebrow="Service Divisions"
            title="Capabilities built around your ambition."
            subtitle="Explore the services that help businesses innovate, operate, and grow."
          />
        </Reveal>

        {/* Responsive Grid: 4 cols desktop, 2 tablets, 1-2 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eightServices.map((service, index) => (
            <Reveal key={service.id} direction="up" delay={index * 0.05}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
};

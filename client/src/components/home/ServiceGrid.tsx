import React from 'react';
import { 
  Globe, 
  CreditCard, 
  Cpu, 
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

export const eightServices: ServiceCardData[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    slug: 'web-development',
    description: 'Responsive websites, web applications, e-commerce platforms, and custom business software.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: 'Digital Products',
    route: '/services/web-development',
  },
  {
    id: 'fintech',
    title: 'FinTech',
    slug: 'fintech',
    description: 'Financial software, payment integrations, transaction workflows, and financial technology solutions.',
    icon: CreditCard,
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    badge: 'Financial Systems',
    route: '/services/fintech',
  },
  {
    id: 'robotics',
    title: 'Robotics & Automation',
    slug: 'robotics',
    description: 'Robotics applications, intelligent control, prototyping, and automation engineering.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    badge: 'Automation Engineering',
    route: '/services/robotics',
  },
  {
    id: 'drones',
    title: 'Drone Technology',
    slug: 'drones',
    description: 'Drone-enabled applications for aerial data collection, mapping, inspection, and monitoring.',
    icon: Navigation,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    badge: 'Aerial Systems',
    route: '/services/drones',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Solutions',
    slug: 'healthcare',
    description: 'Healthcare technology, clinic websites, appointment workflows, and digital tools for healthcare operations.',
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    badge: 'Digital Health',
    route: '/services/healthcare',
  },
  {
    id: 'us-staffing',
    title: 'US Staffing',
    slug: 'us-staffing',
    description: 'Recruitment support, candidate sourcing, talent coordination, and staffing workflows for eligible US-market clients.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    badge: 'Talent Sourcing',
    route: '/services/us-staffing',
  },
  {
    id: 'trading',
    title: 'Trading',
    slug: 'trading',
    description: 'Trading-related software, analytics dashboards, market-data interfaces, and business workflow tools.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    badge: 'Market Analytics',
    route: '/services/trading',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Search engine optimization, content strategy, campaign management, analytics, and digital growth services.',
    icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badge: 'Growth Strategy',
    route: '/services/digital-marketing',
  },
];

export const ServiceGrid: React.FC = () => {
  return (
    <section className="py-20 relative" aria-labelledby="services-heading">
      <Container size="lg" className="space-y-14">
        
        <Reveal direction="up">
          <SectionHeading
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

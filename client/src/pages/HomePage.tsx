import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { IntroSection } from '../components/home/IntroSection';
import { ServiceGrid } from '../components/home/ServiceGrid';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { WhyPeaceHaven } from '../components/home/WhyPeaceHaven';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <SEO 
        title="Peace Haven | Engineering Ideas. Empowering Industries."
        description="From digital experiences and financial technology to healthcare, engineering, staffing, trading, and marketing — Peace Haven brings technology and business expertise together to move organizations forward."
      />

      {/* Section 2: Cinematic Hero */}
      <HeroSection />

      {/* Section 3: Company Introduction */}
      <IntroSection />

      {/* Section 4: Eight Service Divisions */}
      <ServiceGrid />

      {/* Section 5: Industries Served */}
      <IndustriesSection />

      {/* Section 7: Our Process */}
      <ProcessSection />

      {/* Section 8: Why Peace Haven */}
      <WhyPeaceHaven />

      {/* Section 9: Final Project CTA */}
      <FinalCTA />
    </div>
  );
};

import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { IntroSection } from '../components/home/IntroSection';
import { ServiceGrid } from '../components/home/ServiceGrid';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { WhyPeaceHaven } from '../components/home/WhyPeaceHaven';
import { FinalCTA } from '../components/home/FinalCTA';
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from '../utils/seo';
import { useCmsPage } from '../hooks/useCmsContent';

export const HomePage: React.FC = () => {
  const { data: cmsPage } = useCmsPage('home');

  const pageTitle = cmsPage?.seo?.title || cmsPage?.title || 'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions';
  const pageDescription = cmsPage?.seo?.description || cmsPage?.description || 'Peace Haven delivers innovative technology solutions across web development, FinTech, robotics, healthcare and digital transformation for businesses and industries.';

  return (
    <div className="relative overflow-hidden">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://peacehaven.tech/"
        keywords={[
          'Peace Haven',
          'technology company',
          'Web Development',
          'FinTech',
          'Robotics and Automation',
          'Drone Technology',
          'Healthcare Solutions',
          'US Staffing'
        ]}
        schema={[
          generateOrganizationSchema(),
          generateWebSiteSchema(),
          generateLocalBusinessSchema(),
        ]}
      />

      {/* Section 2: Cinematic Hero */}
      <HeroSection cmsHero={cmsPage?.hero} />

      {/* Section 3: Company Introduction */}
      <IntroSection cmsIntro={cmsPage?.customContent?.intro} />

      {/* Section 4: Six Service Divisions */}
      <ServiceGrid />

      {/* Section 5: Industries Served */}
      <IndustriesSection />

      {/* Section 7: Our Process */}
      <ProcessSection />

      {/* Section 8: Why Peace Haven */}
      <WhyPeaceHaven />

      {/* Section 9: Final Project CTA */}
      <FinalCTA cmsCta={cmsPage?.customContent?.finalCta} />
    </div>
  );
};

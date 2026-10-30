import React, { useEffect } from 'react';
import { SEO } from '../common/SEO';
import { ServiceHero } from './ServiceHero';
import { ServiceOverview } from './ServiceOverview';
import { ServiceCapabilities } from './ServiceCapabilities';
import { ServiceProcess } from './ServiceProcess';
import { ServiceBenefits } from './ServiceBenefits';
import { RelatedProjects } from './RelatedProjects';
import { ServiceFAQ } from './ServiceFAQ';
import { ServiceCTA } from './ServiceCTA';
import { ServiceDetail } from '../../types';

interface ServicePageTemplateProps {
  service: ServiceDetail;
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ service }) => {
  // Ensure smooth scroll to top on service switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service.slug]);

  return (
    <div className="min-h-screen bg-charcoal-900 text-warm-200 selection:bg-teal-700/30 selection:text-champagne-300">
      {/* Dynamic SEO Metadata */}
      <SEO
        title={service.seoTitle || `${service.title} | Peace Haven`}
        description={service.seoDescription || service.shortDescription}
      />

      {/* A. Cinematic Hero (Dark Charcoal) */}
      <ServiceHero service={service} />

      {/* B. Service Overview (Warm Off-White) */}
      <ServiceOverview service={service} />

      {/* C. Capabilities and Solutions (Pure White) */}
      <ServiceCapabilities 
        capabilities={service.capabilities} 
        serviceTitle={service.title} 
      />

      {/* D. Our Approach (Warm Off-White) */}
      <ServiceProcess 
        approach={service.approach} 
        serviceTitle={service.title} 
      />

      {/* E. Benefits and Use Cases (Deep Charcoal Navy) */}
      <ServiceBenefits 
        benefits={service.benefits} 
        useCases={service.useCases} 
        serviceTitle={service.title} 
      />

      {/* F. Related Work (Light Neutral) */}
      <RelatedProjects
        serviceId={service.id}
        serviceTitle={service.title}
        relatedProjectSlugs={service.relatedProjectSlugs}
      />

      {/* G. Frequently Asked Questions (Warm Off-White) */}
      <ServiceFAQ 
        faqs={service.faqs} 
        serviceTitle={service.title} 
      />

      {/* H. Final Inquiry CTA (Deep Charcoal Navy) */}
      <ServiceCTA 
        serviceSlug={service.slug} 
        serviceTitle={service.title} 
      />
    </div>
  );
};

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ServicePageTemplate } from '../components/services/ServicePageTemplate';
import { useCmsServices } from '../hooks/useCmsContent';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services } = useCmsServices(servicesData);

  // Normalize aliases like /services/drones -> drone-technology
  const normalizedSlug = slug === 'drones' ? 'drone-technology' : slug;
  
  const fallback = servicesData.find(
    (s) => s.slug === normalizedSlug || s.slug === slug || s.id === normalizedSlug
  );
  const cmsService = services.find(
    (s) => s.slug === normalizedSlug || s.slug === slug || s.id === normalizedSlug
  );

  if (!fallback && !cmsService) {
    return <Navigate to="/services" replace />;
  }

  const service = fallback
    ? {
        ...fallback,
        ...(cmsService || {}),
        overview:
          cmsService?.overview && typeof cmsService.overview === 'object' && (cmsService.overview as any).summary
            ? cmsService.overview
            : fallback.overview,
        approach:
          Array.isArray(cmsService?.approach) && cmsService.approach.length > 0
            ? cmsService.approach
            : fallback.approach,
        useCases:
          Array.isArray(cmsService?.useCases) && cmsService.useCases.length > 0
            ? cmsService.useCases
            : fallback.useCases,
        capabilities:
          Array.isArray(cmsService?.capabilities) && cmsService.capabilities.length > 0
            ? cmsService.capabilities
            : fallback.capabilities,
        benefits:
          Array.isArray(cmsService?.benefits) && cmsService.benefits.length > 0
            ? cmsService.benefits
            : fallback.benefits,
        faqs:
          Array.isArray(cmsService?.faqs) && cmsService.faqs.length > 0
            ? cmsService.faqs
            : fallback.faqs,
      }
    : cmsService!;

  return <ServicePageTemplate service={service} />;
};

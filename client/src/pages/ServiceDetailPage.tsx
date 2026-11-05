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
  
  const service = services.find(
    (s) => s.slug === normalizedSlug || s.slug === slug || s.id === normalizedSlug
  ) || servicesData.find(
    (s) => s.slug === normalizedSlug || s.slug === slug || s.id === normalizedSlug
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return <ServicePageTemplate service={service} />;
};

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ServicePageTemplate } from '../components/services/ServicePageTemplate';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Normalize aliases like /services/drones -> drone-technology
  const normalizedSlug = slug === 'drones' ? 'drone-technology' : slug;
  
  const service = servicesData.find(
    (s) => s.slug === normalizedSlug || s.slug === slug || s.id === normalizedSlug
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return <ServicePageTemplate service={service} />;
};

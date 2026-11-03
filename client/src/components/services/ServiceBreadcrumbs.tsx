import React from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface ServiceBreadcrumbsProps {
  currentTitle: string;
}

/**
 * ServiceBreadcrumbs
 * Canonical wrapper delegating to Breadcrumbs component
 */
export const ServiceBreadcrumbs: React.FC<ServiceBreadcrumbsProps> = ({ currentTitle }) => {
  return (
    <div className="py-2">
      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: currentTitle },
        ]}
        showHomeIcon={true}
      />
    </div>
  );
};

import { ServiceDetail, ProjectCaseStudy, IndustryDetail } from '../types';

export const BASE_SITE_URL = 'https://peacehaven.tech';

export const VERIFIED_COMPANY_DATA = {
  name: 'Peace Haven Technologies',
  legalName: 'Peace Haven Technologies Private Limited',
  url: BASE_SITE_URL,
  logo: `${BASE_SITE_URL}/favicon.svg`,
  email: 'inquiries@peacehaven.tech',
  telephone: '+1-800-555-0199',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Site No 71, SNV Garden Main Rd, Ramanathapuram',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641036',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/peace-haven-tech',
    'https://github.com/peace-haven-tech',
    'https://twitter.com/PeaceHavenTech',
  ],
};

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${BASE_SITE_URL}/#organization`,
    ...VERIFIED_COMPANY_DATA,
    description:
      'Peace Haven delivers innovative technology solutions across web development, FinTech, robotics, healthcare and digital transformation for businesses and industries.',
    knowsAbout: [
      'Web Development',
      'Financial Technology',
      'Robotics & Industrial Automation',
      'Drone Technology',
      'Healthcare Technology',
      'Technical Staff Augmentation',
      'Quantitative Trading Systems',
      'B2B Growth Engineering',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_SITE_URL}/#website`,
    url: BASE_SITE_URL,
    name: 'Peace Haven Technologies',
    publisher: {
      '@id': `${BASE_SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

export function generateServiceSchema(service: ServiceDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.shortDescription || service.tagline,
    provider: {
      '@id': `${BASE_SITE_URL}/#organization`,
    },
    areaServed: ['United States', 'North America', 'United Kingdom', 'Global'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Capabilities`,
      itemListElement: service.capabilities?.map((c, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: c.title,
          description: c.description,
        },
        position: i + 1,
      })),
    },
  };
}

export function generateIndustrySchema(industry: IndustryDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_SITE_URL}/industries/${industry.slug}#webpage`,
    name: `${industry.title} Technology Solutions`,
    description: industry.shortDescription,
    publisher: {
      '@id': `${BASE_SITE_URL}/#organization`,
    },
    about: {
      '@type': 'Thing',
      name: industry.title,
      description: industry.overview?.summary || industry.shortDescription,
    },
  };
}

export function generateProjectSchema(project: ProjectCaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${BASE_SITE_URL}/work/${project.slug}#project`,
    name: project.title,
    headline: project.subtitle,
    description: project.overview,
    applicationCategory: project.serviceName || project.category || 'Enterprise Application',
    operatingSystem: 'Cross-platform, Web, Cloud',
    author: {
      '@id': `${BASE_SITE_URL}/#organization`,
    },
    provider: {
      '@id': `${BASE_SITE_URL}/#organization`,
    },
    datePublished: project.publishedAt || '2026-01-01',
    image: project.heroImage.startsWith('http') ? project.heroImage : `${BASE_SITE_URL}${project.heroImage}`,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_SITE_URL}${item.url}`,
    })),
  };
}

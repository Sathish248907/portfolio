import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { servicesData } from '../data/servicesData';
import { industriesData } from '../data/industriesData';
import { projectsData } from '../data/projectsData';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateIndustrySchema,
  generateProjectSchema,
  generateBreadcrumbSchema,
} from '../utils/seo';
import { analytics } from '../utils/analytics';

describe('Phase 7 — SEO, Performance Optimization & Search Visibility', () => {
  beforeEach(() => {
    // Reset document head
    document.title = '';
    const existingSchema = document.getElementById('route-schema-jsonld');
    if (existingSchema) existingSchema.remove();
  });

  describe('1. On-Page SEO & Metadata Verification', () => {
    it('renders exact Homepage title and meta description required by Phase 7', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      // Verify exact Homepage title
      expect(document.title).toBe(
        'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions'
      );

      // Verify meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      expect(metaDesc).not.toBeNull();
      expect(metaDesc?.getAttribute('content')).toBe(
        'Peace Haven delivers innovative technology solutions across web development, FinTech, robotics, healthcare and digital transformation for businesses and industries.'
      );

      // Verify canonical URL
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      expect(canonicalTag?.getAttribute('href')).toBe('https://peacehaven.tech/');
    });

    it('renders 404 page with noindex directive and proper title', () => {
      render(
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      );

      expect(document.title).toBe('404 - Page Not Found | Peace Haven');
      const robotsMeta = document.querySelector('meta[name="robots"]');
      expect(robotsMeta?.getAttribute('content')).toContain('noindex');
    });

    it('verifies all 8 core services have unique SEO metadata and keywords', () => {
      const titles = new Set<string>();
      const descriptions = new Set<string>();

      servicesData.forEach((service) => {
        expect(service.seoTitle).toBeDefined();
        expect(service.seoTitle.length).toBeGreaterThan(15);
        expect(service.seoDescription).toBeDefined();
        expect(service.seoDescription.length).toBeGreaterThan(25);
        expect(Array.isArray(service.keywords)).toBe(true);
        expect(service.keywords.length).toBeGreaterThanOrEqual(3);

        titles.add(service.seoTitle);
        descriptions.add(service.seoDescription);
      });

      // No duplicate titles or descriptions among services
      expect(titles.size).toBe(servicesData.length);
      expect(descriptions.size).toBe(servicesData.length);
    });

    it('verifies all 10 industries have unique titles, descriptions, and tags', () => {
      const titles = new Set<string>();

      industriesData.forEach((industry) => {
        expect(industry.title).toBeDefined();
        expect(industry.shortDescription.length).toBeGreaterThan(20);
        expect(industry.tags.length).toBeGreaterThanOrEqual(3);
        titles.add(industry.title);
      });

      expect(titles.size).toBe(10);
    });

    it('verifies all 10 project case studies have descriptive titles, overviews, and hero images', () => {
      projectsData.forEach((project) => {
        expect(project.title).toBeDefined();
        expect(project.overview.length).toBeGreaterThan(30);
        expect(project.heroImage).toBeDefined();
        expect(project.technologies.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  describe('2. Schema.org JSON-LD Structured Data', () => {
    it('generates valid Organization and WebSite schema graph', () => {
      const orgSchema = generateOrganizationSchema();
      expect(orgSchema['@type']).toBe('Corporation');
      expect(orgSchema.name).toBe('Peace Haven Technologies');
      expect(orgSchema.email).toBe('inquiries@peacehaven.tech');
      expect(orgSchema.telephone).toBe('+1-800-555-0199');
      expect(orgSchema.address.addressLocality).toBe('Coimbatore');

      const webSiteSchema = generateWebSiteSchema();
      expect(webSiteSchema['@type']).toBe('WebSite');
      expect(webSiteSchema.url).toBe('https://peacehaven.tech');
    });

    it('generates valid Service schema with capabilities catalog', () => {
      const webDev = servicesData.find((s) => s.id === 'web-development')!;
      const serviceSchema = generateServiceSchema(webDev);

      expect(serviceSchema['@type']).toBe('Service');
      expect(serviceSchema.name).toBe('Web Development');
      expect(serviceSchema.hasOfferCatalog['@type']).toBe('OfferCatalog');
      expect(serviceSchema.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0);
    });

    it('generates valid SoftwareApplication schema for project case study', () => {
      const phHomes = projectsData.find((p) => p.slug === 'ph-homes')!;
      const projectSchema = generateProjectSchema(phHomes);

      expect(projectSchema['@type']).toBe('SoftwareApplication');
      expect(projectSchema.name).toBe(phHomes.title);
      expect(projectSchema.image).toContain('https://peacehaven.tech');
    });

    it('injects dynamic JSON-LD script into head when SEO component mounts', () => {
      const testSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Peace Haven Verification',
      };

      render(
        <SEO
          title="Test Page"
          schema={testSchema}
        />
      );

      const script = document.getElementById('route-schema-jsonld') as HTMLScriptElement;
      expect(script).not.toBeNull();
      const parsed = JSON.parse(script.textContent || '{}');
      expect(parsed['@type']).toBe('WebSite');
      expect(parsed.name).toBe('Peace Haven Verification');
    });
  });

  describe('3. Semantic Breadcrumbs Component', () => {
    it('renders accessible breadcrumbs navigation with schema and ARIA attributes', () => {
      render(
        <MemoryRouter>
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'FinTech' },
            ]}
          />
        </MemoryRouter>
      );

      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();

      // Home link
      expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
      // Services link
      expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
      // Active leaf
      const current = screen.getByText('FinTech');
      expect(current).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('4. Technical SEO Files: robots.txt and sitemap.xml', () => {
    it('verifies public/robots.txt exists with valid directives and sitemap declaration', () => {
      const robotsPath = path.resolve(__dirname, '../../public/robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);

      const content = fs.readFileSync(robotsPath, 'utf-8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Disallow: /admin');
      expect(content).toContain('Sitemap: https://peacehaven.tech/sitemap.xml');
      expect(content).toContain('Host: https://peacehaven.tech');
    });

    it('verifies public/sitemap.xml exists and indexes all key canonical URLs', () => {
      const sitemapPath = path.resolve(__dirname, '../../public/sitemap.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);

      const content = fs.readFileSync(sitemapPath, 'utf-8');
      expect(content).toContain('https://peacehaven.tech/');
      expect(content).toContain('https://peacehaven.tech/services/fintech');
      expect(content).toContain('https://peacehaven.tech/services/web-development');
      expect(content).toContain('https://peacehaven.tech/industries/banking-financial-services');
      expect(content).toContain('https://peacehaven.tech/work/ph-homes');
      expect(content).toContain('https://peacehaven.tech/work/grow-capital');
      expect(content).toContain('https://peacehaven.tech/start-a-project');
      expect(content).toContain('https://peacehaven.tech/contact');
    });
  });

  describe('5. Analytics and Conversion Tracking Utility', () => {
    it('invokes window.gtag on custom event triggers', () => {
      window.dataLayer = [];
      window.gtag = vi.fn();

      analytics.trackInquirySubmission('PH-TEST-99', ['Web Development'], '$50k-$100k');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'generate_lead',
        expect.objectContaining({
          reference_number: 'PH-TEST-99',
          selected_services: 'Web Development',
        })
      );

      analytics.trackContactSubmission('Project Inquiry', 'Cloud migration proposal');
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'contact_message_sent',
        expect.objectContaining({
          inquiry_channel: 'Project Inquiry',
        })
      );
    });
  });
});

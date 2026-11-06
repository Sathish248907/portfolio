import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';

import { SEO } from '../components/common/SEO';
import { SeoMetadataEditor } from '../components/admin/SeoMetadataEditor';
import { servicesData } from '../data/servicesData';
import { industriesData } from '../data/industriesData';
import { projectsData } from '../data/projectsData';
import { keywordStrategyClusters } from '../data/seoContentStrategy';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateProjectSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '../utils/seo';

describe('Phase 14 — Advanced SEO, Search Visibility & Organic Growth', () => {
  beforeEach(() => {
    document.title = '';
    const existingSchema = document.getElementById('route-schema-jsonld');
    if (existingSchema) existingSchema.remove();
  });

  describe('1. Technical SEO — XML Sitemap & Robots.txt Directives', () => {
    it('verifies client public sitemap.xml exists and contains all required canonical sections', () => {
      const sitemapPath = path.resolve(__dirname, '../../public/sitemap.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);

      const content = fs.readFileSync(sitemapPath, 'utf8');
      expect(content).toContain('<loc>https://peacehaven.tech/</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/services</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/industries</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/portfolio</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/work/ph-homes</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/work/artistry-gold-diamonds</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/work/grow-capital</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/work/eb-300-robotic-arm</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/work/rapid-mi-screening-test</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/contact</loc>');
      expect(content).toContain('<loc>https://peacehaven.tech/start-a-project</loc>');

      // Verify deprecated services are purged from index
      expect(content).not.toContain('/services/trading');
      expect(content).not.toContain('/services/digital-marketing');

      // Verify private admin routes are NOT exposed in public sitemap
      expect(content).not.toContain('/admin');
    });

    it('verifies robots.txt disallows private administration and points to sitemap.xml', () => {
      const robotsPath = path.resolve(__dirname, '../../public/robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);

      const content = fs.readFileSync(robotsPath, 'utf8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Disallow: /admin');
      expect(content).toContain('Disallow: /api/');
      expect(content).toContain('Sitemap: https://peacehaven.tech/sitemap.xml');
    });
  });

  describe('2. Structured Data & Schema.org JSON-LD Generators', () => {
    it('generates compliant LocalBusiness ProfessionalService schema with Coimbatore coordinates', () => {
      const schema = generateLocalBusinessSchema();

      expect(schema['@type']).toBe('ProfessionalService');
      expect(schema.name).toBe('Peace Haven Technologies');
      expect(schema.address.addressLocality).toBe('Coimbatore');
      expect(schema.address.addressRegion).toBe('Tamil Nadu');
      expect(schema.address.postalCode).toBe('641036');
      expect(schema.geo.latitude).toBe('11.0016');
      expect(schema.geo.longitude).toBe('76.9868');
      expect(schema.telephone).toBe('+91-6566226262');
    });

    it('generates compliant TechArticle schema for published Insights', () => {
      const article = {
        title: 'Robotics and Industrial Automation: Bridging Hardware and Cloud',
        description: 'How modern manufacturing facilities deploy AMRs and edge vision.',
        slug: 'robotics-and-automation-in-modern-industries',
        authorName: 'Alex Rivera, Lead Architect',
      };
      const schema = generateArticleSchema(article);

      expect(schema['@type']).toBe('TechArticle');
      expect(schema.headline).toBe(article.title);
      expect(schema.url).toContain('/insights/robotics-and-automation-in-modern-industries');
      expect(schema.author.name).toBe('Alex Rivera, Lead Architect');
    });

    it('generates compliant SoftwareApplication schema for project case studies', () => {
      const project = projectsData[0]; // Artistry Gold & Diamonds
      const schema = generateProjectSchema(project);

      expect(schema['@type']).toBe('SoftwareApplication');
      expect(schema.name).toBe(project.title);
      expect(schema.operatingSystem).toBe('Cross-platform, Web, Cloud');
      expect(schema['@id']).toContain(project.slug);
    });
  });

  describe('3. Metadata Quality & Scope Across All Services & Projects', () => {
    it('verifies all 6 core service divisions have unique and descriptive titles', () => {
      const activeServices = servicesData.filter(
        (s) => (s.id as string) !== 'trading' && (s.id as string) !== 'digital-marketing'
      );
      expect(activeServices.length).toBe(6);

      const titles = new Set<string>();
      activeServices.forEach((service) => {
        expect(service.title).toBeTruthy();
        expect(service.shortDescription).toBeTruthy();
        titles.add(service.title);
      });
      expect(titles.size).toBe(6);
    });

    it('verifies all 10 laboratory projects have unique titles and SEO descriptions', () => {
      expect(projectsData.length).toBe(10);

      const titles = new Set<string>();
      projectsData.forEach((project) => {
        expect(project.seoTitle).toBeTruthy();
        expect(project.seoDescription).toBeTruthy();
        expect(project.seoTitle).toContain('Peace Haven');
        titles.add(project.seoTitle as string);
      });
      expect(titles.size).toBe(10);
    });

    it('verifies all 10 industries have dedicated titles and overviews', () => {
      expect(industriesData.length).toBe(10);

      const titles = new Set<string>();
      industriesData.forEach((industry) => {
        expect(industry.title).toBeTruthy();
        expect(industry.shortDescription).toBeTruthy();
        titles.add(industry.title);
      });
      expect(titles.size).toBe(10);
    });
  });

  describe('4. Keyword Strategy Clusters & Mapping', () => {
    it('validates comprehensive keyword clusters spanning Company, Service, Project, and Local groups', () => {
      expect(keywordStrategyClusters.length).toBeGreaterThanOrEqual(15);

      const groups = new Set(keywordStrategyClusters.map((k) => k.group));
      expect(groups.has('Company')).toBe(true);
      expect(groups.has('Service')).toBe(true);
      expect(groups.has('Project')).toBe(true);
      expect(groups.has('Local')).toBe(true);

      // Verify every keyword entry maps to a valid landing page and has secondary variants
      keywordStrategyClusters.forEach((entry) => {
        expect(entry.primaryKeyword).toBeTruthy();
        expect(entry.landingPage.startsWith('/')).toBe(true);
        expect(entry.secondaryKeywords.length).toBeGreaterThan(0);
        expect(entry.contentOpportunity).toBeTruthy();
      });
    });
  });

  describe('5. Admin SEO Metadata Editor Component', () => {
    it('renders SEO title and description inputs with character counters and live SERP preview', () => {
      let currentVal = {
        title: 'Industrial Robotics & Automation Solutions',
        description: 'Peace Haven designs ROS 2 autonomous mobile robots and articulated manipulators for industrial micro-factories.',
        canonicalUrl: 'https://peacehaven.tech/services/robotics',
        noindex: false,
      };

      const handleChange = vi.fn((newVal) => {
        currentVal = newVal;
      });

      render(
        <SeoMetadataEditor
          value={currentVal}
          onChange={handleChange}
          defaultSlug="services/robotics"
          pageContextName="Robotics & Automation"
        />
      );

      // Verify headings and controls
      expect(screen.getByText(/Search Engine Optimization \(SEO\) & Indexing Controls/i)).toBeInTheDocument();
      expect(screen.getByText(/Indexable \(Visible in Search\)/i)).toBeInTheDocument();

      // Verify title input
      const titleInput = screen.getByDisplayValue('Industrial Robotics & Automation Solutions');
      expect(titleInput).toBeInTheDocument();

      // Verify SERP Preview
      expect(screen.getByText('Google SERP Preview')).toBeInTheDocument();
      expect(screen.getByText('peacehaven.tech/services/robotics')).toBeInTheDocument();

      // Test noindex toggle
      const indexToggle = screen.getByRole('button', { name: /Indexable/i });
      fireEvent.click(indexToggle);
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ noindex: true }));
    });
  });
});

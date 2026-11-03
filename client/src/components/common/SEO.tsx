import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions';
const DEFAULT_DESCRIPTION =
  'Peace Haven delivers innovative technology solutions across web development, FinTech, robotics, healthcare and digital transformation for businesses and industries.';
const DEFAULT_OG_IMAGE = 'https://peacehaven.tech/og-image.png';
const BASE_URL = 'https://peacehaven.tech';

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  breadcrumbs,
  schema,
  noindex = false,
}) => {
  useEffect(() => {
    // 1. Format document title
    const fullTitle = title.includes('Peace Haven') ? title : `${title} | Peace Haven`;
    document.title = fullTitle;

    // Helper to safely set or create a meta tag
    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMeta('name', 'title', fullTitle);
    setMeta('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }
    setMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 3. Canonical URL
    const activeCanonical = canonicalUrl || (window.location.origin + window.location.pathname);
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', activeCanonical);

    // 4. Open Graph / Facebook / LinkedIn
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', activeCanonical);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Peace Haven Technologies');
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    setMeta('property', 'og:image', fullOgImage);

    // 5. Twitter / X Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullOgImage);
    setMeta('name', 'twitter:url', activeCanonical);

    // 6. JSON-LD Structured Data Injection
    const schemaElements: Record<string, any>[] = [];

    // Optional BreadcrumbList schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaElements.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
        })),
      });
    }

    // Optional Page/Entity-specific schema
    if (schema) {
      if (Array.isArray(schema)) {
        schemaElements.push(...schema);
      } else {
        schemaElements.push(schema);
      }
    }

    // Update dynamic schema script tag
    let schemaScript = document.getElementById('route-schema-jsonld') as HTMLScriptElement | null;
    if (schemaElements.length > 0) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'route-schema-jsonld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(
        schemaElements.length === 1 ? schemaElements[0] : { '@context': 'https://schema.org', '@graph': schemaElements }
      );
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up route-specific schema when component unmounts
      const scriptToRemove = document.getElementById('route-schema-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, canonicalUrl, ogImage, type, keywords, breadcrumbs, schema, noindex]);

  return null;
};

export const SEOHead = SEO;

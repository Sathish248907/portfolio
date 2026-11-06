/**
 * Comprehensive XML Sitemap Generator for Peace Haven Technologies
 * Validates and provides indexable canonical URLs for all published pages, services, industries, and case studies
 */

export const SITEMAP_URLS = [
  // Homepage
  { loc: 'https://peacehaven.tech/', changefreq: 'daily', priority: '1.0' },

  // Services Hub & 6 Core Divisions
  { loc: 'https://peacehaven.tech/services', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/services/web-development', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/services/fintech', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/services/robotics', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/services/drone-technology', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/services/healthcare', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/services/us-staffing', changefreq: 'weekly', priority: '0.9' },

  // Industries Hub & 10 Industry Categories
  { loc: 'https://peacehaven.tech/industries', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/industries/information-technology-software', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/banking-financial-services', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/manufacturing-industrial-automation', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/healthcare-medical-technology', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/agriculture-agritech', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/real-estate-property-technology', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/logistics-supply-chain', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/retail-ecommerce', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/human-resources-staffing', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/industries/education-edtech', changefreq: 'monthly', priority: '0.8' },

  // Portfolio Hub & 10 Verified Case Studies
  { loc: 'https://peacehaven.tech/portfolio', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/work/ph-homes', changefreq: 'monthly', priority: '0.85' },
  { loc: 'https://peacehaven.tech/work/grow-capital', changefreq: 'monthly', priority: '0.85' },
  { loc: 'https://peacehaven.tech/work/artistry-gold-diamonds', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/work/peace-haven-clinic', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/work/ph-google', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/work/ai-command-center', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/work/ai-agricultural-animal-detection', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/work/smart-blind-stick', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/work/eb-300-robotic-arm', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/work/rapid-mi-screening-test', changefreq: 'monthly', priority: '0.8' },

  // Institutional, Insights & Inquiry Pages
  { loc: 'https://peacehaven.tech/insights', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/about', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://peacehaven.tech/contact', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://peacehaven.tech/start-a-project', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://peacehaven.tech/careers', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://peacehaven.tech/privacy', changefreq: 'yearly', priority: '0.4' },
  { loc: 'https://peacehaven.tech/terms', changefreq: 'yearly', priority: '0.4' },
];

export function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];
  const urlEntries = SITEMAP_URLS.map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

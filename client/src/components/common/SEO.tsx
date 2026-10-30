import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Peace Haven | Engineering Ideas. Empowering Industries.',
  description = 'Peace Haven is an integrated technology powerhouse delivering advanced solutions across Web Development, FinTech, Robotics, Drone Technology, Healthcare, US Staffing, Trading, and Digital Marketing.',
  canonicalUrl = 'https://peacehaven.tech/',
  ogImage = '/og-image.png',
}) => {
  useEffect(() => {
    // Set document title
    document.title = title.includes('Peace Haven') ? title : `${title} | Peace Haven`;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', ogImage);

    // Update Twitter tags
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    // Update Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);
  }, [title, description, canonicalUrl, ogImage]);

  return null;
};

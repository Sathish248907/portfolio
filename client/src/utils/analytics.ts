import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID || 'G-PEACEHAVEN';

/**
 * Initializes Google Analytics 4 securely
 */
export function initGA4(measurementId: string = GA_MEASUREMENT_ID) {
  if (typeof window === 'undefined' || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // Handled dynamically on route transitions
    anonymize_ip: true,
  });

  // Inject GA script if not already in document
  if (!document.getElementById('ga4-script')) {
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
}

/**
 * Tracks route-based page views
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
}

/**
 * Tracks custom high-intent conversion events
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString(),
    });
  }
}

// Preset Business Conversion Trackers
export const analytics = {
  trackInquirySubmission(referenceNumber: string, services: string[], budget: string) {
    trackEvent('generate_lead', {
      event_category: 'Inquiry',
      reference_number: referenceNumber,
      selected_services: services.join(', '),
      budget_tier: budget,
    });
  },

  trackContactSubmission(channel: string, subject: string) {
    trackEvent('contact_message_sent', {
      event_category: 'Contact',
      inquiry_channel: channel,
      subject_topic: subject,
    });
  },

  trackServiceView(serviceTitle: string, slug: string) {
    trackEvent('view_service', {
      event_category: 'Service',
      service_name: serviceTitle,
      service_slug: slug,
    });
  },

  trackCaseStudyView(projectTitle: string, slug: string, industry: string) {
    trackEvent('view_case_study', {
      event_category: 'Portfolio',
      project_title: projectTitle,
      project_slug: slug,
      industry_domain: industry,
    });
  },

  trackCtaClick(ctaName: string, destination: string) {
    trackEvent('cta_click', {
      event_category: 'Engagement',
      cta_name: ctaName,
      target_url: destination,
    });
  },
};

/**
 * React hook to automatically trigger pageview tracking on route changes
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
}


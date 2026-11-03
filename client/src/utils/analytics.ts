import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID || 'G-PEACEHAVEN';
const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

/**
 * Retrieves or generates an anonymous visitor identifier that persists across sessions
 */
export function getAnonymousVisitorId(): string {
  if (typeof window === 'undefined') return 'server_render';
  try {
    let vid = localStorage.getItem('ph_anon_vid');
    if (!vid) {
      vid = `ph_vid_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('ph_anon_vid', vid);
    }
    return vid;
  } catch {
    return 'fallback_visitor';
  }
}

/**
 * Retrieves or creates a temporary session identifier that resets when the tab is closed
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  try {
    let sid = sessionStorage.getItem('ph_session_id');
    if (!sid) {
      sid = `ph_sess_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
      sessionStorage.setItem('ph_session_id', sid);
    }
    return sid;
  } catch {
    return 'fallback_session';
  }
}

/**
 * Extracts UTM parameters from URL search query string
 */
export function getTrafficSource(): { source: string; medium: string; campaign: string } {
  if (typeof window === 'undefined') {
    return { source: 'Direct', medium: 'none', campaign: 'none' };
  }
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium') || 'none';
    const utmCampaign = params.get('utm_campaign') || 'none';

    if (utmSource) {
      return { source: utmSource, medium: utmMedium, campaign: utmCampaign };
    }

    // Fallback to document.referrer
    if (document.referrer) {
      const refUrl = new URL(document.referrer);
      if (refUrl.hostname !== window.location.hostname) {
        if (/google/i.test(refUrl.hostname)) return { source: 'Google Search', medium: 'organic', campaign: 'none' };
        if (/bing|yahoo|duckduckgo/i.test(refUrl.hostname)) return { source: 'Search Engine', medium: 'organic', campaign: 'none' };
        if (/linkedin/i.test(refUrl.hostname)) return { source: 'LinkedIn', medium: 'social', campaign: 'none' };
        if (/twitter|x\.com/i.test(refUrl.hostname)) return { source: 'X / Twitter', medium: 'social', campaign: 'none' };
        if (/github/i.test(refUrl.hostname)) return { source: 'GitHub', medium: 'referral', campaign: 'none' };
        return { source: refUrl.hostname, medium: 'referral', campaign: 'none' };
      }
    }

    return { source: 'Direct', medium: 'none', campaign: 'none' };
  } catch {
    return { source: 'Direct', medium: 'none', campaign: 'none' };
  }
}

/**
 * Detects current device category safely
 */
export function getDeviceCategory(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'mobile';
  return 'desktop';
}

/**
 * Dispatches an event to the backend telemetry intake endpoint with fallback
 */
async function sendToBackend(payload: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const endpoint = `${API_BASE}/api/analytics/events`;
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silently continue to prevent analytics failures from affecting UI
  }
}

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
    send_page_view: false,
    anonymize_ip: true,
  });

  if (!document.getElementById('ga4-script')) {
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
}

/**
 * Base tracking dispatcher: sends to both backend telemetry and GA4
 */
export function trackEvent(
  eventName: string,
  category: 'Page Tracking' | 'User Interaction' | 'Conversion' | 'Engagement' | 'Navigation' = 'User Interaction',
  params: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  let serviceSlug: string | null = null;
  let industrySlug: string | null = null;
  let projectSlug: string | null = null;

  if (currentPath.startsWith('/services/')) {
    serviceSlug = currentPath.replace('/services/', '').split('/')[0] || null;
  }
  if (currentPath.startsWith('/industries/')) {
    industrySlug = currentPath.replace('/industries/', '').split('/')[0] || null;
  }
  if (currentPath.startsWith('/work/') || currentPath.startsWith('/portfolio/')) {
    projectSlug = currentPath.replace(/^\/(work|portfolio)\//, '').split('/')[0] || null;
  }

  const payload = {
    eventName,
    pagePath: currentPath,
    eventCategory: category,
    eventLabel: params.label || params.eventLabel || '',
    serviceSlug: params.serviceSlug || serviceSlug,
    industrySlug: params.industrySlug || industrySlug,
    projectSlug: params.projectSlug || projectSlug,
    sessionId: getSessionId(),
    anonymousVisitorId: getAnonymousVisitorId(),
    trafficSource: getTrafficSource(),
    deviceCategory: getDeviceCategory(),
    duration: typeof params.duration === 'number' ? params.duration : 0,
    metadata: params,
  };

  // 1. Dual dispatch to custom telemetry API
  sendToBackend(payload);

  // 2. Dispatch to GA4 gtag if initialized
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      ...params,
    });
  }
}

/**
 * Tracks route-based page views
 */
export function trackPageView(path: string, title?: string) {
  trackEvent('page_view', 'Page Tracking', {
    pagePath: path,
    pageTitle: title || (typeof document !== 'undefined' ? document.title : ''),
  });
}

/**
 * High-intent Interaction & Business Conversion Helpers
 */
export const analytics = {
  trackPageView,

  trackInteraction(action: string, category: 'User Interaction' | 'Navigation' | 'Engagement' = 'User Interaction', label: string = '', metadata: Record<string, any> = {}) {
    trackEvent(action, category, { label, ...metadata });
  },

  trackCtaClick(ctaName: string, destination: string, locationContext: string = '') {
    trackEvent('cta_click', 'User Interaction', {
      label: ctaName,
      targetUrl: destination,
      context: locationContext,
    });
  },

  trackInquiryFunnel(
    stage: 'form_start' | 'service_selected' | 'requirements_entered' | 'submitted',
    metadata: Record<string, any> = {}
  ) {
    const eventName = stage === 'form_start' ? 'inquiry_form_start' : stage === 'submitted' ? 'inquiry_form_submit' : `inquiry_step_${stage}`;
    trackEvent(eventName, 'Conversion', {
      stage,
      ...metadata,
    });
  },

  trackInquirySubmission(referenceNumber: string, services: string[], budget: string) {
    trackEvent('inquiry_form_submit', 'Conversion', {
      reference_number: referenceNumber,
      selected_services: services.join(', '),
      budget_tier: budget,
    });
    trackEvent('generate_lead', 'Conversion', {
      event_category: 'Inquiry',
      reference_number: referenceNumber,
      selected_services: services.join(', '),
      budget_tier: budget,
    });
  },

  trackContactSubmission(channel: string, subject: string) {
    trackEvent('contact_message_sent', 'Conversion', {
      event_category: 'Contact',
      inquiry_channel: channel,
      channel,
      subject_topic: subject,
      subject,
    });
  },

  trackServiceView(serviceTitle: string, slug: string) {
    trackEvent('service_view', 'Page Tracking', {
      serviceSlug: slug,
      serviceTitle,
    });
  },

  trackIndustryView(industryTitle: string, slug: string) {
    trackEvent('industry_view', 'Page Tracking', {
      industrySlug: slug,
      industryTitle,
    });
  },

  trackCaseStudyView(projectTitle: string, slug: string, industry: string) {
    trackEvent('project_view', 'Page Tracking', {
      projectSlug: slug,
      projectTitle,
      industry,
    });
  },

  trackExternalLink(url: string, projectName?: string) {
    trackEvent('external_link_click', 'User Interaction', {
      targetUrl: url,
      projectSlug: projectName,
    });
  },
};

/**
 * React hook to automatically trigger pageview tracking on route changes
 * and measure active reading engagement duration on unmount
 */
export function usePageTracking() {
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    trackPageView(location.pathname + location.search);

    return () => {
      // Dispatches duration on page leave
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      if (durationSeconds > 3) {
        trackEvent('page_engagement', 'Engagement', {
          duration: durationSeconds,
          pagePath: location.pathname,
        });
      }
    };
  }, [location.pathname, location.search]);
}

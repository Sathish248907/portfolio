import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Reusable Hook to dynamically consume public CMS Page content
 * with guaranteed fallback to verified static data.
 */
export function useCmsPage(pageId: string, initialFallback: any = null) {
  const [data, setData] = useState<any>(initialFallback);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPage() {
      try {
        const remote = await api.getPublicPage(pageId);
        if (isMounted && remote) {
          setData(remote);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Failed to load dynamic page content');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPage();
    return () => {
      isMounted = false;
    };
  }, [pageId]);

  return { data, loading, error };
}

/**
 * Hook to consume published Services dynamically from CMS
 */
export function useCmsServices<T = any>(fallbackServices: T[] = []) {
  const [services, setServices] = useState<T[]>(fallbackServices);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const remote = await api.getPublicServices();
        if (isMounted && Array.isArray(remote) && remote.length > 0) {
          const merged = fallbackServices.map((fallback: any) => {
            const found = remote.find(
              (r: any) =>
                r.slug === fallback.slug ||
                r.serviceId === fallback.id ||
                r.id === fallback.id
            );
            if (found) {
              return {
                ...fallback,
                ...found,
                overview:
                  found.overview && typeof found.overview === 'object' && found.overview.summary
                    ? found.overview
                    : fallback.overview,
                approach:
                  Array.isArray(found.approach) && found.approach.length > 0
                    ? found.approach
                    : fallback.approach,
                useCases:
                  Array.isArray(found.useCases) && found.useCases.length > 0
                    ? found.useCases
                    : fallback.useCases,
                capabilities:
                  Array.isArray(found.capabilities) && found.capabilities.length > 0
                    ? found.capabilities
                    : fallback.capabilities,
                benefits:
                  Array.isArray(found.benefits) && found.benefits.length > 0
                    ? found.benefits
                    : fallback.benefits,
                faqs:
                  Array.isArray(found.faqs) && found.faqs.length > 0
                    ? found.faqs
                    : fallback.faqs,
                relatedProjectSlugs:
                  Array.isArray(found.relatedProjectSlugs) && found.relatedProjectSlugs.length > 0
                    ? found.relatedProjectSlugs
                    : fallback.relatedProjectSlugs,
              };
            }
            return fallback;
          });
          setServices(merged as T[]);
        }
      } catch {
        // preserve fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { services, loading };
}

/**
 * Hook to consume published Portfolio projects dynamically from CMS
 */
export function useCmsPortfolio<T = any>(fallbackProjects: T[] = []) {
  const [projects, setProjects] = useState<T[]>(fallbackProjects);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const remote = await api.getPublicProjects();
        if (isMounted && Array.isArray(remote) && remote.length > 0) {
          const merged = fallbackProjects.map((fallback: any) => {
            const found = remote.find(
              (r: any) =>
                r.slug === fallback.slug ||
                r.projectId === fallback.id ||
                r.id === fallback.id
            );
            if (found) {
              return {
                ...fallback,
                ...found,
                metrics:
                  Array.isArray(found.metrics) && found.metrics.length > 0
                    ? found.metrics
                    : fallback.metrics,
                architectureHighlights:
                  Array.isArray(found.architectureHighlights) && found.architectureHighlights.length > 0
                    ? found.architectureHighlights
                    : fallback.architectureHighlights,
                keyFeatures:
                  Array.isArray(found.keyFeatures) && found.keyFeatures.length > 0
                    ? found.keyFeatures
                    : fallback.keyFeatures,
              };
            }
            return fallback;
          });
          setProjects(merged as T[]);
        }
      } catch {
        // preserve fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading };
}

/**
 * Hook to consume published Industries dynamically from CMS
 */
export function useCmsIndustries<T = any>(fallbackIndustries: T[] = []) {
  const [industries, setIndustries] = useState<T[]>(fallbackIndustries);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const remote = await api.getPublicIndustries();
        if (isMounted && Array.isArray(remote) && remote.length > 0) {
          const merged = fallbackIndustries.map((fallback: any) => {
            const found = remote.find(
              (r: any) =>
                r.slug === fallback.slug ||
                r.industryId === fallback.id ||
                r.id === fallback.id
            );
            if (found) {
              return {
                ...fallback,
                ...found,
                overview:
                  found.overview && typeof found.overview === 'object' && found.overview.summary
                    ? found.overview
                    : fallback.overview,
                challenges:
                  Array.isArray(found.challenges) && found.challenges.length > 0
                    ? found.challenges
                    : fallback.challenges,
                solutions:
                  Array.isArray(found.solutions) && found.solutions.length > 0
                    ? found.solutions
                    : fallback.solutions,
                faqs:
                  Array.isArray(found.faqs) && found.faqs.length > 0
                    ? found.faqs
                    : fallback.faqs,
                relatedProjectSlugs:
                  Array.isArray(found.relatedProjectSlugs) && found.relatedProjectSlugs.length > 0
                    ? found.relatedProjectSlugs
                    : fallback.relatedProjectSlugs,
              };
            }
            return fallback;
          });
          setIndustries(merged as T[]);
        }
      } catch {
        // preserve fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { industries, loading };
}

/**
 * Hook to consume Global Website Settings dynamically from CMS
 */
export function useCmsSettings(fallbackSettings: any = null) {
  const [settings, setSettings] = useState<any>(fallbackSettings);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const remote = await api.getPublicSettings();
        if (isMounted && remote) {
          setSettings(remote);
        }
      } catch {
        // preserve fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { settings, loading };
}

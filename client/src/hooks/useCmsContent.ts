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
          setServices(remote as T[]);
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
          setProjects(remote as T[]);
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
          setIndustries(remote as T[]);
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

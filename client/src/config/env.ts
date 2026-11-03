/**
 * Application environment configuration
 */
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Peace Haven Technologies',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://peacehaven.tech',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;


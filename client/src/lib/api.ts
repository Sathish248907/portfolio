/**
 * Legacy API client facade
 * Re-exports modularized API clients from src/services/api/
 * Maintained for 100% backward compatibility across all existing pages and test suites.
 */
export {
  api,
  authApi,
  inquiryApi,
  contactApi,
  analyticsApi,
  cmsApi,
  request,
  ApiError
} from '../services/api';

import { api } from '../services/api';
export default api;

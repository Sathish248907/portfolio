import { authApi } from './authApi';
import { inquiryApi } from './inquiryApi';
import { contactApi } from './contactApi';
import { analyticsApi } from './analyticsApi';
import { cmsApi } from './cmsApi';

export { authApi } from './authApi';
export { inquiryApi } from './inquiryApi';
export { contactApi } from './contactApi';
export { analyticsApi } from './analyticsApi';
export { cmsApi } from './cmsApi';
export * from './httpClient';

/**
 * Unified Peace Haven API Facade
 * Backward-compatible composite combining all domain clients
 */
export const api = {
  // Auth
  adminLogin: authApi.adminLogin.bind(authApi),
  verifyAdminToken: authApi.verifyAdminToken.bind(authApi),

  // Inquiries
  submitInquiry: inquiryApi.submitInquiry.bind(inquiryApi),
  getInquiries: inquiryApi.getInquiries.bind(inquiryApi),
  getInquiryByRef: inquiryApi.getInquiryByRef.bind(inquiryApi),
  updateInquiryStatus: inquiryApi.updateInquiryStatus.bind(inquiryApi),
  addInquiryNote: inquiryApi.addInquiryNote.bind(inquiryApi),
  exportInquiriesCsv: inquiryApi.exportInquiriesCsv.bind(inquiryApi),

  // Contact
  sendContactMessage: contactApi.sendContactMessage.bind(contactApi),

  // Analytics & Tracking
  trackAnalyticsEvent: analyticsApi.trackAnalyticsEvent.bind(analyticsApi),
  getAnalyticsOverview: analyticsApi.getAnalyticsOverview.bind(analyticsApi),
  getAnalyticsSummary: analyticsApi.getAnalyticsSummary.bind(analyticsApi),
  getRealtimeVisitors: analyticsApi.getRealtimeVisitors.bind(analyticsApi),
  getServiceAnalytics: analyticsApi.getServiceAnalytics.bind(analyticsApi),
  getIndustryAnalytics: analyticsApi.getIndustryAnalytics.bind(analyticsApi),
  getPortfolioAnalytics: analyticsApi.getPortfolioAnalytics.bind(analyticsApi),
  getFunnelAnalytics: analyticsApi.getFunnelAnalytics.bind(analyticsApi),
  getFunnelMetrics: analyticsApi.getFunnelMetrics.bind(analyticsApi),
  exportAnalyticsCsv: analyticsApi.exportAnalyticsCsv.bind(analyticsApi),

  // CMS & Content Management
  getCmsOverview: cmsApi.getCmsOverview.bind(cmsApi),
  getCmsPages: cmsApi.getCmsPages.bind(cmsApi),
  getCmsPage: cmsApi.getCmsPage.bind(cmsApi),
  updateCmsPage: cmsApi.updateCmsPage.bind(cmsApi),
  toggleCmsPagePublish: cmsApi.toggleCmsPagePublish.bind(cmsApi),
  getPublicInsights: cmsApi.getPublicInsights.bind(cmsApi),
  getPublicInsightBySlug: cmsApi.getPublicInsightBySlug.bind(cmsApi),
  getAdminBlogs: cmsApi.getAdminBlogs.bind(cmsApi),
  createBlog: cmsApi.createBlog.bind(cmsApi),
  updateBlog: cmsApi.updateBlog.bind(cmsApi),
  deleteBlog: cmsApi.deleteBlog.bind(cmsApi),
  getCmsMedia: cmsApi.getCmsMedia.bind(cmsApi),
  uploadCmsMedia: cmsApi.uploadCmsMedia.bind(cmsApi),
  deleteCmsMedia: cmsApi.deleteCmsMedia.bind(cmsApi),
  getCmsNavigation: cmsApi.getCmsNavigation.bind(cmsApi),
  saveCmsNavigationItem: cmsApi.saveCmsNavigationItem.bind(cmsApi),
  getCmsIndustries: cmsApi.getCmsIndustries.bind(cmsApi),
  updateCmsIndustry: cmsApi.updateCmsIndustry.bind(cmsApi),
  getCmsActivity: cmsApi.getCmsActivity.bind(cmsApi),
};

export default api;

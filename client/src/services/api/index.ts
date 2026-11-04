import { authApi } from './authApi';
import { inquiryApi } from './inquiryApi';
import { contactApi } from './contactApi';
import { analyticsApi } from './analyticsApi';
import { cmsApi } from './cmsApi';
import { adminApi } from './adminApi';
import { notificationsApi } from './notificationsApi';
import { servicesData } from '../../data/servicesData';
import { projectsData } from '../../data/projectsData';
import { request } from './httpClient';

export { authApi } from './authApi';
export { inquiryApi } from './inquiryApi';
export { contactApi } from './contactApi';
export { analyticsApi } from './analyticsApi';
export { cmsApi } from './cmsApi';
export { adminApi } from './adminApi';
export { notificationsApi } from './notificationsApi';
export * from './httpClient';

/**
 * Unified Peace Haven API Facade
 * Backward-compatible composite combining all domain clients
 */
export const api = {
  // Public Catalog
  async getServices() {
    try {
      const res = await request<{ data?: any }>('/services');
      if (res?.data) return res.data;
    } catch {}
    return servicesData;
  },

  async getProjects() {
    try {
      const res = await request<{ data?: any }>('/projects');
      if (res?.data) return res.data;
    } catch {}
    return projectsData;
  },

  async getProjectBySlug(slug: string) {
    try {
      const res = await request<{ data?: any }>(`/projects/${slug}`);
      if (res?.data) return res.data;
    } catch {}
    return projectsData.find((p) => p.slug === slug) || null;
  },

  // Auth
  adminLogin: authApi.adminLogin.bind(authApi),
  verifyAdminToken: authApi.verifyAdminToken.bind(authApi),

  // Inquiries
  submitInquiry: inquiryApi.submitInquiry.bind(inquiryApi),
  getAdminInquiries: inquiryApi.getAdminInquiries.bind(inquiryApi),
  getAdminInquiriesWithMetrics: inquiryApi.getAdminInquiriesWithMetrics.bind(inquiryApi),
  getInquiries: inquiryApi.getInquiries.bind(inquiryApi),
  getInquiryByRef: inquiryApi.getInquiryByRef.bind(inquiryApi),
  updateInquiryStatus: inquiryApi.updateInquiryStatus.bind(inquiryApi),
  updateInquiry: inquiryApi.updateInquiry.bind(inquiryApi),
  addInquiryNote: inquiryApi.addInquiryNote.bind(inquiryApi),
  deleteInquiry: inquiryApi.deleteInquiry.bind(inquiryApi),
  exportInquiriesCsv: inquiryApi.exportInquiriesCsv.bind(inquiryApi),

  // Contact
  submitContact: contactApi.submitContact.bind(contactApi),
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

  // Admin Management & RBAC (Phase 10)
  getDashboardStats: adminApi.getDashboardStats.bind(adminApi),
  getAdminUsers: adminApi.getAdminUsers.bind(adminApi),
  createAdminUser: adminApi.createAdminUser.bind(adminApi),
  getAdminUser: adminApi.getAdminUser.bind(adminApi),
  updateAdminUser: adminApi.updateAdminUser.bind(adminApi),
  updateAdminUserStatus: adminApi.updateAdminUserStatus.bind(adminApi),
  deleteAdminUser: adminApi.deleteAdminUser.bind(adminApi),
  getAdminUserActivity: adminApi.getAdminUserActivity.bind(adminApi),
  getAdminRoles: adminApi.getAdminRoles.bind(adminApi),
  createAdminRole: adminApi.createAdminRole.bind(adminApi),
  updateAdminRole: adminApi.updateAdminRole.bind(adminApi),
  deleteAdminRole: adminApi.deleteAdminRole.bind(adminApi),
  getAdminInvitations: adminApi.getAdminInvitations.bind(adminApi),
  createAdminInvitation: adminApi.createAdminInvitation.bind(adminApi),
  resendAdminInvitation: adminApi.resendAdminInvitation.bind(adminApi),
  cancelAdminInvitation: adminApi.cancelAdminInvitation.bind(adminApi),
  verifyInvitationToken: adminApi.verifyInvitationToken.bind(adminApi),
  acceptInvitation: adminApi.acceptInvitation.bind(adminApi),
  getAuditLogs: adminApi.getAuditLogs.bind(adminApi),
  exportAuditLogsCsv: adminApi.exportAuditLogsCsv.bind(adminApi),
  getAdminProfile: adminApi.getAdminProfile.bind(adminApi),
  updateAdminProfile: adminApi.updateAdminProfile.bind(adminApi),
  changeAdminPassword: adminApi.changeAdminPassword.bind(adminApi),
  getAdminSessions: adminApi.getAdminSessions.bind(adminApi),
  revokeAdminSession: adminApi.revokeAdminSession.bind(adminApi),
  revokeAllOtherAdminSessions: adminApi.revokeAllOtherAdminSessions.bind(adminApi),

  // Notifications & Communications (Phase 11)
  getNotifications: notificationsApi.getNotifications.bind(notificationsApi),
  getUnreadCount: notificationsApi.getUnreadCount.bind(notificationsApi),
  markNotificationAsRead: notificationsApi.markAsRead.bind(notificationsApi),
  markAllNotificationsAsRead: notificationsApi.markAllAsRead.bind(notificationsApi),
  archiveNotification: notificationsApi.archiveNotification.bind(notificationsApi),
  getNotificationPreferences: notificationsApi.getPreferences.bind(notificationsApi),
  updateNotificationPreferences: notificationsApi.updatePreferences.bind(notificationsApi),
  getEmailLogs: notificationsApi.getEmailLogs.bind(notificationsApi),
  retryEmail: notificationsApi.retryEmail.bind(notificationsApi),
  getEmailTemplates: notificationsApi.getTemplates.bind(notificationsApi),
  getEmailTemplate: notificationsApi.getTemplate.bind(notificationsApi),
  updateEmailTemplate: notificationsApi.updateTemplate.bind(notificationsApi),
  previewEmailTemplate: notificationsApi.previewTemplate.bind(notificationsApi),
  sendTestEmail: notificationsApi.sendTestEmail.bind(notificationsApi),
  getReminders: notificationsApi.getReminders.bind(notificationsApi),
  createReminder: notificationsApi.createReminder.bind(notificationsApi),
  completeReminder: notificationsApi.completeReminder.bind(notificationsApi),
  updateReminder: notificationsApi.updateReminder.bind(notificationsApi),
  deleteReminder: notificationsApi.deleteReminder.bind(notificationsApi),
};

export default api;

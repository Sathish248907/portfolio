import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { usePageTracking } from './utils/analytics';

// Lazy-loaded public pages for Core Web Vitals & bundle optimization
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })));
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage').then((m) => ({ default: m.IndustryDetailPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage })));
const InsightDetailPage = lazy(() => import('./pages/InsightDetailPage').then((m) => ({ default: m.InsightDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then((m) => ({ default: m.CareersPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const StartProjectPage = lazy(() => import('./pages/StartProjectPage').then((m) => ({ default: m.StartProjectPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Lazy-loaded administrative portal
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage').then((m) => ({ default: m.AdminAnalyticsPage })));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage').then((m) => ({ default: m.AdminInquiriesPage })));
const AdminInquiryDetailPage = lazy(() => import('./pages/admin/AdminInquiryDetailPage').then((m) => ({ default: m.AdminInquiryDetailPage })));
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage').then((m) => ({ default: m.AdminProjectsPage })));
const AdminCmsPage = lazy(() => import('./pages/admin/AdminCmsPage').then((m) => ({ default: m.AdminCmsPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })));
const AdminRolesPage = lazy(() => import('./pages/admin/AdminRolesPage').then((m) => ({ default: m.AdminRolesPage })));
const AdminAuditLogsPage = lazy(() => import('./pages/admin/AdminAuditLogsPage').then((m) => ({ default: m.AdminAuditLogsPage })));
const AdminProfilePage = lazy(() => import('./pages/admin/AdminProfilePage').then((m) => ({ default: m.AdminProfilePage })));
const AdminAcceptInvitePage = lazy(() => import('./pages/admin/AdminAcceptInvitePage').then((m) => ({ default: m.AdminAcceptInvitePage })));
const AdminNotificationsPage = lazy(() => import('./pages/admin/AdminNotificationsPage').then((m) => ({ default: m.AdminNotificationsPage })));
const AdminRemindersPage = lazy(() => import('./pages/admin/AdminRemindersPage').then((m) => ({ default: m.AdminRemindersPage })));
const AdminNotificationSettingsPage = lazy(() => import('./pages/admin/AdminNotificationSettingsPage').then((m) => ({ default: m.AdminNotificationSettingsPage })));
import { PermissionGuard } from './components/common/PermissionGuard';

// Lightweight accessibility-compliant page loading fallback (avoids layout shift)
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4" aria-busy="true" aria-label="Loading page content">
    <div className="w-8 h-8 rounded-full border-2 border-champagne-400 border-t-transparent animate-spin" />
    <span className="text-xs font-mono text-slate-400 tracking-wider">Loading experience...</span>
  </div>
);

export const App: React.FC = () => {
  // Automatic GA4 / Analytics page tracking on route change
  usePageTracking();

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        {/* Public Routes with Shared Layout */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Services */}
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          
          {/* Core Pages */}
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="industries/:slug" element={<IndustryDetailPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:slug" element={<CaseStudyDetailPage />} />
          <Route path="work" element={<PortfolioPage />} />
          <Route path="work/:slug" element={<CaseStudyDetailPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="insights/:slug" element={<InsightDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="start-a-project" element={<StartProjectPage />} />
          <Route path="start-project" element={<StartProjectPage />} />
          
          {/* Legal */}
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />

          {/* 404 within RootLayout */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Authentication & Activation */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/accept-invitation" element={<AdminAcceptInvitePage />} />

        {/* Protected Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="reminders" element={<AdminRemindersPage />} />
          <Route path="notification-settings" element={<AdminNotificationSettingsPage />} />
          <Route path="users" element={<PermissionGuard module="users" isPage><AdminUsersPage /></PermissionGuard>} />
          <Route path="roles-permissions" element={<PermissionGuard module="roles" isPage><AdminRolesPage /></PermissionGuard>} />
          <Route path="audit-logs" element={<PermissionGuard module="audit_logs" isPage><AdminAuditLogsPage /></PermissionGuard>} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="analytics" element={<PermissionGuard module="analytics" isPage><AdminAnalyticsPage /></PermissionGuard>} />
          <Route path="inquiries" element={<PermissionGuard module="inquiries" isPage><AdminInquiriesPage /></PermissionGuard>} />
          <Route path="inquiries/:id" element={<PermissionGuard module="inquiries" isPage><AdminInquiryDetailPage /></PermissionGuard>} />
          <Route path="projects" element={<PermissionGuard module="portfolio" isPage><AdminProjectsPage /></PermissionGuard>} />
          <Route path="cms" element={<PermissionGuard module="cms" isPage><AdminCmsPage /></PermissionGuard>} />
          <Route path="content" element={<PermissionGuard module="portfolio" isPage><AdminProjectsPage /></PermissionGuard>} />
          <Route path="settings" element={<PermissionGuard module="settings" isPage><AdminSettingsPage /></PermissionGuard>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

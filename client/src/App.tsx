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
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage').then((m) => ({ default: m.AdminProjectsPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));

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

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="content" element={<AdminProjectsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

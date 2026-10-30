import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { StartProjectPage } from './pages/StartProjectPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes with Shared Layout */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        
        {/* Services */}
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        
        {/* Core Pages */}
        <Route path="industries" element={<IndustriesPage />} />
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
        <Route path="inquiries" element={<AdminInquiriesPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="content" element={<AdminProjectsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};

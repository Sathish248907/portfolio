import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { ScrollToTop } from './ScrollToTop';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal-900 text-warm-200 selection:bg-teal-700/30 selection:text-champagne-300">
      
      {/* Skip to Main Content Link for WCAG Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-champagne-500 text-charcoal-900 font-bold rounded-lg shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main-content" className="flex-1 focus:outline-none pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

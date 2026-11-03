import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative">
      <SEO 
        title="404 - Page Not Found | Peace Haven" 
        description="The requested engineering resource or endpoint does not exist on Peace Haven."
        noindex={true}
      />
      
      {/* Background warmth */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />

      <div className="max-w-md w-full bg-charcoal-850/90 p-8 rounded-2xl border border-sage-700/40 text-center relative z-10 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 mx-auto flex items-center justify-center">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
            STATUS 404: RESOURCE NOT FOUND
          </div>

          <h1 className="font-heading text-3xl font-bold text-white">
            Page Not Found
          </h1>
          
          <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
            The requested route or architecture document does not exist or has been relocated. Explore our core engineering hubs below.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-left pt-2 border-t border-sage-500/20">
          <Link to="/services" className="p-2.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-slate-300 hover:text-champagne-300 transition-colors">
            &rarr; All Services
          </Link>
          <Link to="/industries" className="p-2.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-slate-300 hover:text-champagne-300 transition-colors">
            &rarr; Industries Served
          </Link>
          <Link to="/portfolio" className="p-2.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-slate-300 hover:text-champagne-300 transition-colors">
            &rarr; Selected Works
          </Link>
          <Link to="/contact" className="p-2.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-slate-300 hover:text-champagne-300 transition-colors">
            &rarr; Contact Us
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            to="/"
            variant="cyan"
            size="md"
            leftIcon={<Home className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

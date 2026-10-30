import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative">
      <SEO title="404 - Node Not Found | Peace Haven" description="The requested engineering resource or endpoint does not exist." />
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 rounded-2xl border border-slate-700/80 text-center relative z-10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center mb-6">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
          ERR_ENDPOINT_UNRESOLVED: 404
        </div>

        <h1 className="font-heading text-3xl font-bold text-white mb-2">
          Node Not Found
        </h1>
        
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          The requested system route or architecture document does not exist in the Peace Haven network cluster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            to="/"
            variant="cyan"
            size="md"
            leftIcon={<Home className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Return to Core
          </Button>

          <Button
            to="/services"
            variant="secondary"
            size="md"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            View Services
          </Button>
        </div>
      </div>
    </div>
  );
};

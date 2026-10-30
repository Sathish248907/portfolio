import React from 'react';
import { ArrowRight, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

interface ServiceCTAProps {
  serviceSlug: string;
  serviceTitle: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({ serviceSlug, serviceTitle }) => {
  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="service-cta-heading">
      {/* Glow highlight */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-t from-cyan-500/15 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 glass-card border border-cyan-500/30 overflow-hidden bg-gradient-to-b from-navy-900/95 via-navy-950/90 to-navy-900/95 shadow-2xl text-center space-y-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Project Scoping & Exploration</span>
          </div>

          {/* Heading */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 
              id="service-cta-heading" 
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Let's Build Your Next Solution.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Tell us what you're building in {serviceTitle}, what operational bottlenecks need to improve, or where your next technology opportunity lies. Let's explore the right architectural approach together.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              to={`/start-a-project?service=${serviceSlug}`}
              variant="cyan"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              id="service-discuss-service-btn"
            >
              Discuss This Service
            </Button>

            <Button
              to="/contact"
              variant="secondary"
              size="lg"
              leftIcon={<Mail className="w-4 h-4" />}
            >
              Contact Peace Haven
            </Button>
          </div>

          {/* Engagement Guarantee Note */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Direct consultation with senior engineering leads &bull; No obligation</span>
          </div>

        </div>
      </div>
    </section>
  );
};

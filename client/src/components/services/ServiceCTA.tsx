import React from 'react';
import { ArrowRight, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

interface ServiceCTAProps {
  serviceSlug: string;
  serviceTitle: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({ serviceSlug, serviceTitle }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-charcoal-950 border-t border-sage-500/20" aria-labelledby="service-cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 glass-card border border-sage-500/25 overflow-hidden bg-charcoal-900 shadow-xl text-center space-y-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
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
              leftIcon={<Mail className="w-4 h-4 text-champagne-400" />}
            >
              Contact Peace Haven
            </Button>
          </div>

          {/* Engagement Guarantee Note */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-champagne-400" />
            <span>Direct consultation with senior engineering leads &bull; No obligation</span>
          </div>

        </div>
      </div>
    </section>
  );
};

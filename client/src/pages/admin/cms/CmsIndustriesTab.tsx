import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ExternalLink } from 'lucide-react';

interface CmsIndustriesTabProps {
  industries: any[];
}

export const CmsIndustriesTab: React.FC<CmsIndustriesTabProps> = ({ industries }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-heading font-semibold text-white">
              Ten Core Industry Categories
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage sector descriptions, related services, and domain positioning.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industries.map((ind) => (
            <div key={ind.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-white text-sm">{ind.title}</span>
                <span className="text-[10px] font-mono text-champagne-400">Order: {ind.displayOrder}</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">{ind.shortDesc}</p>
              <div className="pt-2 flex items-center justify-between border-t border-sage-500/10">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Published
                </span>
                <Link
                  to={`/industries/${ind.slug}`}
                  target="_blank"
                  className="text-xs font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                >
                  <span>View Sector Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


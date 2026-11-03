import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ExternalLink } from 'lucide-react';

interface CmsServicesTabProps {
  services: any[];
}

export const CmsServicesTab: React.FC<CmsServicesTabProps> = ({ services }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-heading font-semibold text-white">
              Eight Specialized Service Divisions
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage capability titles, benefits, engineering highlights, and display order.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((serv) => (
            <div key={serv.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-white text-sm">{serv.title}</span>
                  <span className="text-[11px] font-mono text-champagne-400 block">/services/{serv.slug}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-700/20 text-champagne-300 border border-champagne-500/20 font-mono">
                  {serv.division || 'Engineering Division'}
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {serv.shortDesc || 'Engineering mission-critical digital systems and specialized solutions.'}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-sage-500/10">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Published
                </span>
                <Link
                  to={`/services/${serv.slug}`}
                  target="_blank"
                  className="text-xs font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                >
                  <span>Public Preview</span>
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


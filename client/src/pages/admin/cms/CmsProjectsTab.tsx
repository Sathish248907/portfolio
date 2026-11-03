import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ExternalLink } from 'lucide-react';

interface CmsProjectsTabProps {
  projects: any[];
}

export const CmsProjectsTab: React.FC<CmsProjectsTabProps> = ({ projects }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-heading font-semibold text-white">
              Ten Selected Works & Laboratory Case Studies
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage project case studies, statuses (Completed, Prototype, Demonstration), and assigned disciplines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-white text-sm">{proj.title}</span>
                  <span className="text-[11px] font-mono text-champagne-400 block">/work/{proj.slug}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-800 text-champagne-300 font-mono border border-sage-500/20">
                  {proj.category}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-sage-500/10">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Case Study
                </span>
                <Link
                  to={`/work/${proj.slug}`}
                  target="_blank"
                  className="text-xs font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                >
                  <span>Explore Case Study</span>
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


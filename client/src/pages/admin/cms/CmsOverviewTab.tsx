import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

interface CmsOverviewTabProps {
  metrics: {
    publishedPages: number;
    draftPages: number;
    publishedProjects: number;
    publishedBlogs: number;
    totalMedia: number;
  };
  overview: any;
}

export const CmsOverviewTab: React.FC<CmsOverviewTabProps> = ({ metrics, overview }) => {
  return (
    <div className="space-y-6">
      {/* Top Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Managed Pages</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-white">{metrics.publishedPages}</span>
            <span className="text-xs font-mono text-emerald-400">Published</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{metrics.draftPages} Drafts</span>
        </div>

        <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Selected Works</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-white">{metrics.publishedProjects}</span>
            <span className="text-xs font-mono text-teal-400">Active</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Prototypes & Demonstrations</span>
        </div>

        <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Journal Articles</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-white">{metrics.publishedBlogs}</span>
            <span className="text-xs font-mono text-champagne-400">Live</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Public Insights Hub</span>
        </div>

        <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Media Assets</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-white">{metrics.totalMedia}</span>
            <span className="text-xs font-mono text-indigo-400">Assets</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Images & Schematics</span>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Updated Content */}
        <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-champagne-400" />
              <span>Recently Modified Content</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Live Updates</span>
          </div>
          <div className="space-y-2.5">
            {(overview?.recentlyUpdated || []).map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/10 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-charcoal-800 text-champagne-300 font-mono">
                      {item.type}
                    </span>
                    <span className="font-medium text-slate-200">{item.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {new Date(item.updatedAt).toLocaleString()}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Admin Activity Log */}
        <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Administrative Audit History</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Recent 10 Events</span>
          </div>
          <div className="space-y-2.5">
            {(overview?.recentActivity || []).map((log: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/10 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-champagne-300 text-[11px]">
                      [{log.action}]
                    </span>
                    <span className="text-slate-200">{log.entityTitle}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    By {log.performedBy} • {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {log.entityType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


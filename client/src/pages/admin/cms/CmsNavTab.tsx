import React from 'react';

interface CmsNavTabProps {
  navItems: any[];
}

export const CmsNavTab: React.FC<CmsNavTabProps> = ({ navItems }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <h3 className="text-base font-heading font-semibold text-white mb-1">
          Navigation & Menu Structure
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Configure primary header navigation items, labels, routes, and visibility.
        </p>

        <div className="space-y-2">
          {navItems.map((item, idx) => (
            <div key={item._id || idx} className="p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-charcoal-800 text-champagne-400 font-mono flex items-center justify-center text-[11px]">
                  {item.order || idx + 1}
                </span>
                <div>
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="text-[11px] font-mono text-slate-400 block">{item.path}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-700/20 text-champagne-300">
                  {item.menu}
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


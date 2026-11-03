import React from 'react';
import { Edit3 } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { api } from '../../../services/api';
import { cn } from '../../../lib/utils';

interface CmsPagesTabProps {
  pages: any[];
  token: string;
  onTogglePublish: (pageId: string, currentStatus: string) => void;
  onEditPage: (page: any) => void;
}

export const CmsPagesTab: React.FC<CmsPagesTabProps> = ({
  pages,
  token,
  onTogglePublish,
  onEditPage,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-heading font-semibold text-white">
              Managed Website Pages
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Update titles, hero copy, headings, section order, and search engine metadata without breaking routes.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-sage-500/20 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-4">Page Identifier</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Route Path</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-500/10">
              {pages.map((p) => (
                <tr key={p.pageId} className="hover:bg-charcoal-800/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-champagne-300">
                    {p.pageId}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-white max-w-sm truncate">
                    {p.title}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{p.slug}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => onTogglePublish(p.pageId, p.status)}
                      className={cn(
                        'px-2.5 py-0.5 rounded-full text-[10px] font-mono border transition-colors',
                        p.status === 'published'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                      )}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      onClick={async () => {
                        const res = await api.getCmsPage(token, p.pageId);
                        onEditPage(res?.data || p);
                      }}
                      variant="outline"
                      size="sm"
                      leftIcon={<Edit3 className="w-3 h-3 text-champagne-400" />}
                    >
                      Edit Content & SEO
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Upload, Copy, Trash2 } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface CmsMediaTabProps {
  mediaList: any[];
  onOpenUpload: () => void;
  onCopyUrl: (url: string) => void;
  onDeleteMedia: (id: string) => void;
}

export const CmsMediaTab: React.FC<CmsMediaTabProps> = ({
  mediaList,
  onOpenUpload,
  onCopyUrl,
  onDeleteMedia,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-heading font-semibold text-white">
              Media & Asset Library
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload, organize, preview, and manage images with accessible alt-text.
            </p>
          </div>
          <Button
            onClick={onOpenUpload}
            variant="champagne"
            size="sm"
            leftIcon={<Upload className="w-3.5 h-3.5" />}
          >
            Register Media Asset
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {mediaList.map((m) => (
            <div key={m._id || m.fileName} className="p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-2 group">
              <div className="aspect-video w-full rounded-lg bg-charcoal-950 overflow-hidden relative">
                <img src={m.url} alt={m.altText || m.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded bg-charcoal-900/90 text-champagne-300 font-mono">
                  {m.category}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-white block truncate">{m.title}</span>
                <span className="text-[10px] font-mono text-slate-400 block truncate">{m.fileName}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-sage-500/10">
                <button
                  onClick={() => onCopyUrl(m.url)}
                  className="text-[11px] font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy URL
                </button>
                <button
                  onClick={() => onDeleteMedia(m._id)}
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


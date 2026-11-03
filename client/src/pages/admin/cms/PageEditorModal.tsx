import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface PageEditorModalProps {
  page: any;
  onClose: () => void;
  onSave: (page: any) => void;
  onChange: (page: any) => void;
}

export const PageEditorModal: React.FC<PageEditorModalProps> = ({
  page,
  onClose,
  onSave,
  onChange,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-charcoal-900 border border-sage-500/30 w-full max-w-3xl rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-sage-500/20">
          <div>
            <h3 className="text-lg font-heading font-bold text-white">
              Edit Page: {page.pageId?.toUpperCase()}
            </h3>
            <span className="text-xs font-mono text-champagne-400">{page.slug}</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Page Title</label>
            <input
              type="text"
              value={page.title || ''}
              onChange={(e) => onChange({ ...page, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Hero Headline</label>
            <input
              type="text"
              value={page.hero?.headline || ''}
              onChange={(e) => onChange({ ...page, hero: { ...page.hero, headline: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Hero Subheadline</label>
            <textarea
              rows={2}
              value={page.hero?.subheadline || ''}
              onChange={(e) => onChange({ ...page, hero: { ...page.hero, subheadline: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">SEO Meta Description</label>
            <textarea
              rows={2}
              value={page.seo?.description || ''}
              onChange={(e) => onChange({ ...page, seo: { ...page.seo, description: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage-500/20">
          <Button onClick={onClose} variant="outline" size="sm">
            Cancel
          </Button>
          <Button onClick={() => onSave(page)} variant="champagne" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};


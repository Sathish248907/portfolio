import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface BlogEditorModalProps {
  blog: any;
  isCreating: boolean;
  onClose: () => void;
  onSave: (blog: any) => void;
  onChange: (blog: any) => void;
}

export const BlogEditorModal: React.FC<BlogEditorModalProps> = ({
  blog,
  isCreating,
  onClose,
  onSave,
  onChange,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-charcoal-900 border border-sage-500/30 w-full max-w-3xl rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-sage-500/20">
          <h3 className="text-lg font-heading font-bold text-white">
            {isCreating ? 'Create Technical Insight Article' : 'Edit Article'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Title</label>
            <input
              type="text"
              value={blog.title || ''}
              onChange={(e) => onChange({ ...blog, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              placeholder="Article Headline"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">URL Slug</label>
              <input
                type="text"
                value={blog.slug || ''}
                onChange={(e) => onChange({ ...blog, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
                placeholder="article-slug"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Category</label>
              <select
                value={blog.category || 'Technology'}
                onChange={(e) => onChange({ ...blog, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              >
                {['Technology', 'Artificial Intelligence', 'FinTech', 'Robotics & Automation', 'Healthcare Technology', 'Web Development', 'Industry Insights'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Excerpt Summary</label>
            <textarea
              rows={2}
              value={blog.excerpt || ''}
              onChange={(e) => onChange({ ...blog, excerpt: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              placeholder="Concise technical summary..."
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Article Body (HTML/Text)</label>
            <textarea
              rows={6}
              value={blog.content || ''}
              onChange={(e) => onChange({ ...blog, content: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage-500/20">
          <Button onClick={onClose} variant="outline" size="sm">
            Cancel
          </Button>
          <Button onClick={() => onSave(blog)} variant="champagne" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
            Publish Article
          </Button>
        </div>
      </div>
    </div>
  );
};


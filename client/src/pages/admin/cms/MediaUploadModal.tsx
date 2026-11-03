import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface MediaUploadModalProps {
  form: {
    title: string;
    fileName: string;
    url: string;
    fileType: string;
    fileSize: number;
    category: string;
    altText: string;
  };
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (form: any) => void;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  form,
  onClose,
  onSubmit,
  onChange,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="bg-charcoal-900 border border-sage-500/30 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-sage-500/20">
          <h3 className="text-base font-heading font-bold text-white">Register Media Asset</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Asset Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => onChange({ ...form, title: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white"
            placeholder="e.g. Robot Arm CAD Schematic"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">File Name</label>
          <input
            type="text"
            required
            value={form.fileName}
            onChange={(e) => onChange({ ...form, fileName: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
            placeholder="schematic.png"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Asset URL / Path</label>
          <input
            type="text"
            required
            value={form.url}
            onChange={(e) => onChange({ ...form, url: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
            placeholder="/images/projects/blueprint.png"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => onChange({ ...form, category: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white"
          >
            {['Services', 'Projects', 'Industries', 'Hero', 'Blog', 'General'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Alternative Text (Alt)</label>
          <input
            type="text"
            value={form.altText}
            onChange={(e) => onChange({ ...form, altText: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white"
            placeholder="Accessible screen-reader description"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-sage-500/20">
          <Button type="button" onClick={onClose} variant="outline" size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="champagne" size="sm">
            Save Asset
          </Button>
        </div>
      </form>
    </div>
  );
};


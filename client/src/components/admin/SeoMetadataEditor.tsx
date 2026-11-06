import React, { useState } from 'react';
import { 
  Globe2, 
  Search, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  ShieldAlert, 
  Sparkles,
  Link2,
  Tag
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SeoMetadataValue {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string | string[];
  ogImage?: string;
  noindex?: boolean;
}

interface SeoMetadataEditorProps {
  value: SeoMetadataValue;
  onChange: (updated: SeoMetadataValue) => void;
  defaultSlug?: string;
  pageContextName?: string;
}

export const SeoMetadataEditor: React.FC<SeoMetadataEditorProps> = ({
  value,
  onChange,
  defaultSlug = '',
  pageContextName = 'Page',
}) => {
  const [activePreview, setActivePreview] = useState<'google' | 'social'>('google');

  const title = value.title || '';
  const description = value.description || '';
  const canonicalUrl = value.canonicalUrl || `https://peacehaven.tech${defaultSlug.startsWith('/') ? '' : '/'}${defaultSlug}`;
  const ogImage = value.ogImage || 'https://peacehaven.tech/og-image.png';
  const noindex = Boolean(value.noindex);
  const keywordsStr = Array.isArray(value.keywords) ? value.keywords.join(', ') : (value.keywords || '');

  const titleLength = title.length;
  const descLength = description.length;

  const isTitleOptimal = titleLength >= 35 && titleLength <= 65;
  const isDescOptimal = descLength >= 120 && descLength <= 165;

  return (
    <div className="space-y-6 pt-4 border-t border-sage-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-champagne-400" />
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Search Engine Optimization (SEO) & Indexing Controls
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">Indexing:</span>
          <button
            type="button"
            onClick={() => onChange({ ...value, noindex: !noindex })}
            className={cn(
              'px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors',
              noindex
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            )}
          >
            {noindex ? 'noindex (Hidden from Search)' : 'Indexable (Visible in Search)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="space-y-4">
          {/* SEO Title */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-slate-300">
                SEO Meta Title <span className="text-rose-400">*</span>
              </label>
              <span className={cn(
                'text-[10px] font-mono',
                isTitleOptimal ? 'text-emerald-400' : 'text-amber-400'
              )}>
                {titleLength} / 60 chars ({isTitleOptimal ? 'Optimal' : titleLength < 35 ? 'Too Short' : 'Long'})
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => onChange({ ...value, title: e.target.value })}
              placeholder="e.g. Robotics & Industrial Automation | Peace Haven"
              className="w-full px-3 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400"
            />
          </div>

          {/* SEO Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-slate-300">
                SEO Meta Description <span className="text-rose-400">*</span>
              </label>
              <span className={cn(
                'text-[10px] font-mono',
                isDescOptimal ? 'text-emerald-400' : 'text-amber-400'
              )}>
                {descLength} / 160 chars ({isDescOptimal ? 'Optimal' : descLength < 120 ? 'Too Short' : 'Long'})
              </span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => onChange({ ...value, description: e.target.value })}
              placeholder="Summarize the core engineering capabilities, technologies, and value proposition for search engines..."
              className="w-full px-3 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400 leading-relaxed"
            />
          </div>

          {/* Canonical URL */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Canonical URL</span>
              </label>
              <span className="text-[10px] font-mono text-slate-500">Auto-resolved if blank</span>
            </div>
            <input
              type="text"
              value={value.canonicalUrl || ''}
              onChange={(e) => onChange({ ...value, canonicalUrl: e.target.value })}
              placeholder={canonicalUrl}
              className="w-full px-3 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-slate-300 font-mono focus:outline-none focus:border-champagne-400"
            />
          </div>

          {/* Keywords */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-champagne-400" />
                <span>Target Keywords (Comma-Separated)</span>
              </label>
            </div>
            <input
              type="text"
              value={keywordsStr}
              onChange={(e) => onChange({ ...value, keywords: e.target.value })}
              placeholder="e.g. robotics automation, ROS 2 AMR, computer vision"
              className="w-full px-3 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400"
            />
          </div>
        </div>

        {/* Live SERP & Social Preview Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-charcoal-850 p-1.5 rounded-xl border border-sage-500/20">
            <button
              type="button"
              onClick={() => setActivePreview('google')}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-mono transition-colors',
                activePreview === 'google' ? 'bg-charcoal-700 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span>Google SERP Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('social')}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-mono transition-colors',
                activePreview === 'social' ? 'bg-charcoal-700 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Share2 className="w-3.5 h-3.5 text-champagne-400" />
              <span>Social Card (OG)</span>
            </button>
          </div>

          {activePreview === 'google' ? (
            <div className="p-4 rounded-2xl bg-charcoal-950 border border-sage-500/20 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-sans">
                <div className="w-4 h-4 rounded-full bg-charcoal-800 flex items-center justify-center text-[10px] text-champagne-400 font-bold">
                  P
                </div>
                <div className="truncate">
                  <span className="text-slate-300 font-medium">Peace Haven Technologies</span>
                  <span className="text-slate-500 mx-1">›</span>
                  <span className="text-slate-400 font-mono text-[10px]">{canonicalUrl.replace('https://', '')}</span>
                </div>
              </div>

              <h5 className="text-base font-sans font-medium text-[#8ab4f8] hover:underline cursor-pointer truncate">
                {title || `${pageContextName} | Peace Haven Technologies`}
              </h5>

              <p className="text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
                {description || 'Explore verified technology solutions, case studies, and engineering capabilities from Peace Haven Technologies.'}
              </p>

              {noindex && (
                <div className="pt-2 flex items-center gap-1.5 text-rose-400 text-[11px] font-mono">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Warning: This page has noindex enabled and will not appear in Google search results.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl bg-charcoal-950 border border-sage-500/20 overflow-hidden shadow-lg">
              <div className="h-32 bg-charcoal-800 flex items-center justify-center relative overflow-hidden">
                {ogImage ? (
                  <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Sparkles className="w-6 h-6 text-champagne-400 mx-auto mb-1" />
                    <span className="text-xs font-mono text-slate-400">Default Brand Social Banner</span>
                  </div>
                )}
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white">
                  peacehaven.tech
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h5 className="text-xs font-semibold text-white truncate">
                  {title || `${pageContextName} | Peace Haven`}
                </h5>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {description || 'Integrated engineering solutions and enterprise digital transformation.'}
                </p>
              </div>
            </div>
          )}

          {/* Quick Quality Checklist */}
          <div className="p-3 rounded-xl bg-charcoal-850/60 border border-sage-500/20 text-[11px] font-mono space-y-1.5">
            <span className="text-slate-400 block uppercase tracking-wider text-[10px]">On-Page Quality Assurance</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={cn('w-3.5 h-3.5', isTitleOptimal ? 'text-emerald-400' : 'text-amber-400')} />
              <span className={isTitleOptimal ? 'text-slate-300' : 'text-amber-300'}>
                Title Length: {titleLength} chars (Recommended 35-65)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={cn('w-3.5 h-3.5', isDescOptimal ? 'text-emerald-400' : 'text-amber-400')} />
              <span className={isDescOptimal ? 'text-slate-300' : 'text-amber-300'}>
                Description Length: {descLength} chars (Recommended 120-165)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">
                Canonical URL: {canonicalUrl}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

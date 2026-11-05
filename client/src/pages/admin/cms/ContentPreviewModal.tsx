import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface ContentPreviewModalProps {
  title: string;
  data: any;
  type: 'homepage' | 'about' | 'contact' | 'service' | 'project' | 'page';
  onClose: () => void;
}

export const ContentPreviewModal: React.FC<ContentPreviewModalProps> = ({
  title,
  data,
  type,
  onClose,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'max-w-5xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
      {/* Top Bar with Device Controls */}
      <div className="w-full max-w-5xl flex items-center justify-between pb-4 border-b border-sage-500/20 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-champagne-500/20 text-champagne-400 flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Live Responsive Preview: {title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-800/40 border border-teal-500/30 text-teal-300 font-mono">
                {type.toUpperCase()}
              </span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Rendering draft content before publishing
            </span>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-charcoal-850 border border-sage-500/30">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === 'desktop'
                ? 'bg-champagne-500 text-charcoal-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === 'tablet'
                ? 'bg-champagne-500 text-charcoal-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet (768px)</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === 'mobile'
                ? 'bg-champagne-500 text-charcoal-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (375px)</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-charcoal-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Preview Frame */}
      <div className="flex-1 w-full overflow-y-auto py-6 flex justify-center">
        <div
          className={`w-full ${getContainerWidth()} bg-charcoal-900 border border-sage-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-8 transition-all duration-300 overflow-hidden`}
        >
          {/* Simulated Browser Bar */}
          <div className="flex items-center gap-2 pb-4 border-b border-sage-500/20 text-xs font-mono text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 px-3 py-1 rounded-md bg-charcoal-800 text-[11px] text-slate-300 w-full truncate">
              https://peacehaven.tech{data?.slug || ''}
            </span>
          </div>

          {/* Hero Banner Preview */}
          <div className="space-y-4 text-center py-6 px-4 rounded-xl bg-charcoal-850/60 border border-sage-500/20">
            {data?.hero?.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-warm-200/10 border border-champagne-500/30 text-champagne-400">
                {data.hero.badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {data?.hero?.headline || data?.title || 'Preview Title'}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto font-light leading-relaxed">
              {data?.hero?.subheadline || data?.shortDescription || data?.description || 'Preview description will appear here.'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {data?.hero?.ctaText && (
                <span className="px-4 py-2 rounded-xl bg-champagne-500 text-charcoal-950 font-bold text-xs">
                  {data.hero.ctaText}
                </span>
              )}
              {data?.hero?.secondaryCtaText && (
                <span className="px-4 py-2 rounded-xl border border-sage-500/40 text-slate-300 text-xs font-medium">
                  {data.hero.secondaryCtaText}
                </span>
              )}
            </div>
          </div>

          {/* Body / Custom Content Preview */}
          {data?.customContent && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-champagne-400 font-semibold">
                Custom Page Sections
              </h4>
              <pre className="p-4 rounded-xl bg-charcoal-950 text-slate-300 font-mono text-[11px] overflow-x-auto border border-sage-500/20">
                {JSON.stringify(data.customContent, null, 2)}
              </pre>
            </div>
          )}

          {/* Service/Project Specific Fields */}
          {type === 'service' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-champagne-400 font-semibold">
                Key Capabilities Preview
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(data?.capabilities || []).map((cap: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-charcoal-850 border border-sage-500/20 text-xs">
                    <span className="font-bold text-white block mb-1">{cap.title}</span>
                    <p className="text-slate-400 text-[11px]">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'project' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-charcoal-850 border border-sage-500/20">
                  <span className="text-slate-400 block text-[10px]">Client / Org</span>
                  <span className="text-white font-medium">{data?.clientName || 'Peace Haven Lab'}</span>
                </div>
                <div className="p-3 rounded-lg bg-charcoal-850 border border-sage-500/20">
                  <span className="text-slate-400 block text-[10px]">Division</span>
                  <span className="text-champagne-300 font-medium">{data?.serviceId || data?.category}</span>
                </div>
                <div className="p-3 rounded-lg bg-charcoal-850 border border-sage-500/20">
                  <span className="text-slate-400 block text-[10px]">Classification</span>
                  <span className="text-teal-300 font-medium">{data?.statusBadge || 'Verified'}</span>
                </div>
              </div>

              {data?.challenge && (
                <div className="p-4 rounded-xl bg-charcoal-850 border border-sage-500/20 text-xs space-y-1">
                  <span className="font-bold text-rose-400 font-mono text-[11px]">Business Challenge</span>
                  <p className="text-slate-300">{data.challenge}</p>
                </div>
              )}

              {data?.solution && (
                <div className="p-4 rounded-xl bg-charcoal-850 border border-sage-500/20 text-xs space-y-1">
                  <span className="font-bold text-emerald-400 font-mono text-[11px]">Engineered Solution</span>
                  <p className="text-slate-300">{data.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* SEO Metadata Card */}
          <div className="p-4 rounded-xl bg-charcoal-950/70 border border-sage-500/20 text-xs space-y-2">
            <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold">
              Search Engine & Social OpenGraph Card
            </span>
            <div className="font-medium text-white">{data?.seo?.title || data?.title}</div>
            <div className="text-slate-400 text-[11px]">{data?.seo?.description || data?.description}</div>
            <div className="text-[10px] font-mono text-teal-400">{data?.seo?.canonicalUrl || `https://peacehaven.tech${data?.slug || ''}`}</div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="w-full max-w-5xl flex items-center justify-between pt-4 border-t border-sage-500/20 text-xs">
        <span className="text-slate-400 font-mono">
          Viewport: {device.toUpperCase()} ({device === 'desktop' ? '1280px' : device === 'tablet' ? '768px' : '375px'})
        </span>
        <Button onClick={onClose} variant="secondary" size="sm">
          Close Preview
        </Button>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  HelpCircle, 
  Globe2, 
  RefreshCw,
  Sliders,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { api } from '../../../services/api';
import { ContentPreviewModal } from './ContentPreviewModal';

interface CmsHomepageEditorProps {
  token: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const CmsHomepageEditor: React.FC<CmsHomepageEditorProps> = ({
  token,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [homeData, setHomeData] = useState<any>({
    pageId: 'home',
    title: 'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions',
    slug: '/',
    status: 'published',
    hero: {
      headline: 'Engineering Ideas. Empowering Industries.',
      subheadline: 'From digital experiences and financial technology to healthcare, engineering, and technical staffing — Peace Haven creates scalable, secure, and modern solutions.',
      badge: 'Multi-Disciplinary Technology Company',
      ctaText: 'Start a Project',
      ctaLink: '/start-a-project',
      secondaryCtaText: 'Explore Works',
      secondaryCtaLink: '/portfolio',
      bgImage: '',
    },
    customContent: {
      intro: {
        heading: 'Innovating Across Modern Engineering Disciplines',
        summary: 'Peace Haven is a modern multi-disciplinary technology company focused on delivering purposeful, high-impact solutions across eight vital business domains.',
        points: [
          'Enterprise Architecture & High-Scale Web Services',
          'Institutional FinTech & Compliant Ledger Systems',
          'Autonomous Mobile Robotics & Edge Computing',
          'Intelligent Drone Telemetry & Mission Telematics'
        ],
      },
      whyUs: {
        title: 'Why Global Teams Build With Peace Haven',
        description: 'Our cross-disciplinary squads eliminate technology silos, bringing hardware and software engineering under one rigorous standard of craftsmanship.',
      },
      cta: {
        title: 'Ready to Engineer Your Future?',
        description: 'Whether you require an autonomous robotics prototype or a cloud fintech ledger, our engineering leads are prepared to architect your solution.',
        buttonText: 'Start Your Project',
        buttonLink: '/start-a-project',
      },
    },
    seo: {
      title: 'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions',
      description: 'Peace Haven delivers innovative technology solutions across web development, FinTech, robotics, healthcare and digital transformation.',
      keywords: 'technology, fintech, robotics, healthcare, software engineering',
      canonicalUrl: 'https://peacehaven.tech/',
      ogImage: '/og-image.png',
    },
  });

  const loadHomepageData = async () => {
    setLoading(true);
    try {
      const res = await api.getCmsPage(token, 'home');
      if (res?.data) {
        setHomeData((prev: any) => ({
          ...prev,
          ...res.data,
          hero: { ...prev.hero, ...(res.data.hero || {}) },
          customContent: { ...prev.customContent, ...(res.data.customContent || {}) },
          seo: { ...prev.seo, ...(res.data.seo || {}) },
        }));
      }
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomepageData();
  }, []);

  const handleSave = async (publishImmediate = false) => {
    setSaving(true);
    try {
      const payload = {
        ...homeData,
        status: publishImmediate ? 'published' : homeData.status,
      };

      const res = await api.updateCmsPage(token, 'home', payload);
      if (res?.success || res?.data) {
        onSuccess(publishImmediate ? 'Homepage successfully published to live website!' : 'Homepage content saved successfully!');
        if (res.data) setHomeData(res.data);
      } else {
        onError(res?.message || 'Failed to save homepage content.');
      }
    } catch (err: any) {
      onError(err?.message || 'Error communicating with server.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-champagne-400" />
        <span>Loading Homepage CMS Configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-champagne-400 font-bold uppercase tracking-wider">
              Public Page Content
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
              homeData.status === 'published' 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
            }`}>
              {homeData.status.toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Homepage Content Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the hero banner, intro narrative, value pillars, and final call-to-action rendered on the root route.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => setPreviewOpen(true)}
            variant="outline"
            size="sm"
            leftIcon={<Eye className="w-3.5 h-3.5 text-champagne-400" />}
          >
            Responsive Preview
          </Button>

          <Button
            onClick={() => handleSave(false)}
            variant="secondary"
            size="sm"
            isLoading={saving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Draft
          </Button>

          <Button
            onClick={() => handleSave(true)}
            variant="champagne"
            size="sm"
            isLoading={saving}
            leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-charcoal-950" />}
          >
            Publish Live
          </Button>
        </div>
      </div>

      {/* SECTION 1: HERO BANNER */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Sparkles className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Hero Section Banner</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Hero Eyebrow / Badge Text</label>
            <input
              type="text"
              value={homeData.hero?.badge || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                hero: { ...homeData.hero, badge: e.target.value },
              })}
              placeholder="e.g. Multi-Disciplinary Technology Company"
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Main Headline *</label>
            <input
              type="text"
              value={homeData.hero?.headline || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                hero: { ...homeData.hero, headline: e.target.value },
              })}
              placeholder="e.g. Engineering Ideas. Empowering Industries."
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-medium"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Subheadline / Paragraph *</label>
            <textarea
              rows={3}
              value={homeData.hero?.subheadline || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                hero: { ...homeData.hero, subheadline: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Primary CTA Button Label</label>
            <input
              type="text"
              value={homeData.hero?.ctaText || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                hero: { ...homeData.hero, ctaText: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Primary CTA Destination Link</label>
            <input
              type="text"
              value={homeData.hero?.ctaLink || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                hero: { ...homeData.hero, ctaLink: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Secondary CTA Button Label</label>
            <input
              type="text"
              value={homeData.hero?.secondaryCtaText || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                hero: { ...homeData.hero, secondaryCtaText: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Secondary CTA Destination Link</label>
            <input
              type="text"
              value={homeData.hero?.secondaryCtaLink || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                hero: { ...homeData.hero, secondaryCtaLink: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: INTRO & VALUE PROPOSITION */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Layers className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Introduction & Value Pillars</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Intro Section Headline</label>
            <input
              type="text"
              value={homeData.customContent?.intro?.heading || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                customContent: {
                  ...homeData.customContent,
                  intro: { ...(homeData.customContent?.intro || {}), heading: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Intro Narrative / Company Overview</label>
            <textarea
              rows={3}
              value={homeData.customContent?.intro?.summary || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                customContent: {
                  ...homeData.customContent,
                  intro: { ...(homeData.customContent?.intro || {}), summary: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: CALL TO ACTION BANNER */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <ArrowRight className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Final Call to Action (CTA) Banner</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">CTA Headline</label>
            <input
              type="text"
              value={homeData.customContent?.cta?.title || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                customContent: {
                  ...homeData.customContent,
                  cta: { ...(homeData.customContent?.cta || {}), title: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">CTA Description</label>
            <textarea
              rows={2}
              value={homeData.customContent?.cta?.description || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                customContent: {
                  ...homeData.customContent,
                  cta: { ...(homeData.customContent?.cta || {}), description: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Action Button Label</label>
            <input
              type="text"
              value={homeData.customContent?.cta?.buttonText || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                customContent: {
                  ...homeData.customContent,
                  cta: { ...(homeData.customContent?.cta || {}), buttonText: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Destination URL</label>
            <input
              type="text"
              value={homeData.customContent?.cta?.buttonLink || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                customContent: {
                  ...homeData.customContent,
                  cta: { ...(homeData.customContent?.cta || {}), buttonLink: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: SEO METADATA */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Globe2 className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Homepage Search Engine Optimization (SEO)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Meta Title Tag</label>
            <input
              type="text"
              value={homeData.seo?.title || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                seo: { ...homeData.seo, title: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Meta Description</label>
            <textarea
              rows={2}
              value={homeData.seo?.description || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                seo: { ...homeData.seo, description: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Canonical URL</label>
            <input
              type="text"
              value={homeData.seo?.canonicalUrl || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                seo: { ...homeData.seo, canonicalUrl: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">OpenGraph Share Image URL</label>
            <input
              type="text"
              value={homeData.seo?.ogImage || ''}
              onChange={(e) => setHomeData({
                ...homeData,
                seo: { ...homeData.seo, ogImage: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* Modal for Live Preview */}
      {previewOpen && (
        <ContentPreviewModal
          title="Homepage Preview"
          data={homeData}
          type="homepage"
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
};


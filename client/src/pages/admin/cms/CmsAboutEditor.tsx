import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Globe2, 
  RefreshCw,
  Plus,
  Trash2,
  Compass
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { api } from '../../../services/api';
import { ContentPreviewModal } from './ContentPreviewModal';

interface CmsAboutEditorProps {
  token: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const CmsAboutEditor: React.FC<CmsAboutEditorProps> = ({
  token,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [aboutData, setAboutData] = useState<any>({
    pageId: 'about',
    title: 'About Peace Haven | Multidisciplinary Engineering Firm',
    slug: '/about',
    status: 'published',
    hero: {
      headline: 'Architecting Systems That Move Real Industries.',
      subheadline: 'Peace Haven is an integrated technology and engineering firm founded on the principle that the most valuable digital systems are those that securely power physical and commercial infrastructure.',
      badge: 'Engineering Organization Overview',
      ctaText: 'Meet Our Leadership',
      ctaLink: '#leadership',
    },
    customContent: {
      principles: [
        {
          title: 'First-Principles Systems Engineering',
          desc: 'We do not wrap superficial wrappers over outdated foundations. From low-level C++ robotics drivers to event-driven cloud systems, we design architectures from root mechanical and algorithmic requirements.',
        },
        {
          title: 'Radical Engineering Transparency',
          desc: 'We present genuine capabilities, reproducible benchmarks, and honest prototype designations. We never invent fake customer logos, fabricated testimonials, or imaginary metrics.',
        },
        {
          title: 'Zero-Downtime & High-Integrity Tolerances',
          desc: 'Whether building double-entry financial ledgers, autonomous obstacle-avoidance firmware, or high-throughput cloud portals, systems are engineered to fail safely under adverse conditions.',
        },
        {
          title: 'Hardware & Software Convergence',
          desc: 'True industrial transformation occurs when physical sensors, actuators, and drones communicate flawlessly with cloud telemetry and distributed databases.',
        },
      ],
      cta: {
        title: 'Collaborate With Peace Haven Engineers',
        description: 'Whether you need a dedicated technical squad or a complete end-to-end autonomous robotics build, we are ready to architect your solution.',
        buttonText: 'Initiate Engineering Consultation',
        buttonLink: '/start-a-project',
      },
    },
    seo: {
      title: 'About Peace Haven | Engineering Principles',
      description: "Learn about Peace Haven's engineering methodology, cross-disciplinary technical capabilities, and transparency ethos.",
      canonicalUrl: 'https://peacehaven.tech/about',
    },
  });

  const loadAboutData = async () => {
    setLoading(true);
    try {
      const res = await api.getCmsPage(token, 'about');
      if (res?.data) {
        setAboutData((prev: any) => ({
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
    loadAboutData();
  }, []);

  const handleSave = async (publishImmediate = false) => {
    setSaving(true);
    try {
      const payload = {
        ...aboutData,
        status: publishImmediate ? 'published' : aboutData.status,
      };

      const res = await api.updateCmsPage(token, 'about', payload);
      if (res?.success || res?.data) {
        onSuccess(publishImmediate ? 'About Us page published to live site!' : 'About Us content saved successfully!');
        if (res.data) setAboutData(res.data);
      } else {
        onError(res?.message || 'Failed to save About Us content.');
      }
    } catch (err: any) {
      onError(err?.message || 'Error communicating with server.');
    } finally {
      setSaving(false);
    }
  };

  const addPrinciple = () => {
    const list = [...(aboutData.customContent?.principles || [])];
    list.push({ title: 'New Engineering Principle', desc: 'Enter description of principle...' });
    setAboutData({
      ...aboutData,
      customContent: { ...aboutData.customContent, principles: list },
    });
  };

  const removePrinciple = (index: number) => {
    const list = [...(aboutData.customContent?.principles || [])];
    list.splice(index, 1);
    setAboutData({
      ...aboutData,
      customContent: { ...aboutData.customContent, principles: list },
    });
  };

  const updatePrinciple = (index: number, field: 'title' | 'desc', value: string) => {
    const list = [...(aboutData.customContent?.principles || [])];
    list[index] = { ...list[index], [field]: value };
    setAboutData({
      ...aboutData,
      customContent: { ...aboutData.customContent, principles: list },
    });
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-champagne-400" />
        <span>Loading About Us CMS Configuration...</span>
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
              aboutData.status === 'published' 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
            }`}>
              {aboutData.status.toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            About Us Page Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage company philosophy, engineering principles, firm overview, and consultation call-to-action.
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

      {/* SECTION 1: HERO */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Compass className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">About Hero Banner</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Eyebrow Badge Text</label>
            <input
              type="text"
              value={aboutData.hero?.badge || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                hero: { ...aboutData.hero, badge: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Main Headline</label>
            <input
              type="text"
              value={aboutData.hero?.headline || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                hero: { ...aboutData.hero, headline: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-medium"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Overview Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.hero?.subheadline || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                hero: { ...aboutData.hero, subheadline: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: PRINCIPLES */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-sage-500/15">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-champagne-400" />
            <h3 className="font-heading text-sm font-semibold text-white">Engineering Creed & Principles</h3>
          </div>
          <Button
            onClick={addPrinciple}
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5 text-champagne-400" />}
          >
            Add Principle
          </Button>
        </div>

        <div className="space-y-4">
          {(aboutData.customContent?.principles || []).map((p: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-champagne-400 font-bold">
                  0{idx + 1} / PRINCIPLE
                </span>
                <button
                  onClick={() => removePrinciple(idx)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => updatePrinciple(idx, 'title', e.target.value)}
                  placeholder="Principle Title"
                  className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <textarea
                  rows={2}
                  value={p.desc}
                  onChange={(e) => updatePrinciple(idx, 'desc', e.target.value)}
                  placeholder="Principle details and description..."
                  className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: CTA */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Sparkles className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Consultation Call-to-Action</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">CTA Title</label>
            <input
              type="text"
              value={aboutData.customContent?.cta?.title || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                customContent: {
                  ...aboutData.customContent,
                  cta: { ...(aboutData.customContent?.cta || {}), title: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">CTA Description</label>
            <textarea
              rows={2}
              value={aboutData.customContent?.cta?.description || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                customContent: {
                  ...aboutData.customContent,
                  cta: { ...(aboutData.customContent?.cta || {}), description: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Button Text</label>
            <input
              type="text"
              value={aboutData.customContent?.cta?.buttonText || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                customContent: {
                  ...aboutData.customContent,
                  cta: { ...(aboutData.customContent?.cta || {}), buttonText: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Button Link</label>
            <input
              type="text"
              value={aboutData.customContent?.cta?.buttonLink || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                customContent: {
                  ...aboutData.customContent,
                  cta: { ...(aboutData.customContent?.cta || {}), buttonLink: e.target.value },
                },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: SEO */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Globe2 className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">About Page SEO Metadata</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">SEO Meta Title</label>
            <input
              type="text"
              value={aboutData.seo?.title || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                seo: { ...aboutData.seo, title: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">SEO Meta Description</label>
            <textarea
              rows={2}
              value={aboutData.seo?.description || ''}
              onChange={(e) => setAboutData({
                ...aboutData,
                seo: { ...aboutData.seo, description: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <ContentPreviewModal
          title="About Us Page Preview"
          data={aboutData}
          type="about"
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
};


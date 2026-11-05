import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe2, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { api } from '../../../services/api';
import { ContentPreviewModal } from './ContentPreviewModal';

interface CmsContactEditorProps {
  token: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const CmsContactEditor: React.FC<CmsContactEditorProps> = ({
  token,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [contactData, setContactData] = useState<any>({
    pageId: 'contact',
    title: "Contact Us | Let's Build Something Extraordinary | Peace Haven",
    slug: '/contact',
    status: 'published',
    hero: {
      headline: "Let's Build Something Extraordinary.",
      subheadline: 'Have an idea, business challenge or technology requirement? Connect with Peace Haven and explore how we can turn your vision into a practical technology solution.',
      badge: 'Connect with Peace Haven',
    },
    seo: {
      title: "Contact Us | Let's Build Something Extraordinary | Peace Haven",
      description: 'Have an idea, business challenge or technology requirement? Connect with Peace Haven and explore how we can turn your vision into a practical technology solution.',
      canonicalUrl: 'https://peacehaven.tech/contact',
    },
  });

  const [settingsData, setSettingsData] = useState<any>({
    contactEmail: 'inquiries@peacehaven.tech',
    contactPhone: '+1 (800) 555-0199',
    address: 'Site No 71, SNV Garden Main Rd,\nRamanathapuram, Coimbatore,\nTamil Nadu 641036',
    businessHours: 'Guaranteed within 24 business hours',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [pageRes, setRes] = await Promise.all([
        api.getCmsPage(token, 'contact'),
        api.getCmsSettings(token),
      ]);

      if (pageRes?.data) {
        setContactData((prev: any) => ({
          ...prev,
          ...pageRes.data,
          hero: { ...prev.hero, ...(pageRes.data.hero || {}) },
          seo: { ...prev.seo, ...(pageRes.data.seo || {}) },
        }));
      }

      if (setRes?.data) {
        setSettingsData((prev: any) => ({
          ...prev,
          contactEmail: setRes.data.contactEmail || prev.contactEmail,
          contactPhone: setRes.data.contactPhone || prev.contactPhone,
          address: setRes.data.address || prev.address,
          businessHours: setRes.data.businessHours || prev.businessHours,
        }));
      }
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (publishImmediate = false) => {
    setSaving(true);
    try {
      const pagePayload = {
        ...contactData,
        status: publishImmediate ? 'published' : contactData.status,
      };

      const [pageRes, setRes] = await Promise.all([
        api.updateCmsPage(token, 'contact', pagePayload),
        api.updateCmsSettings(token, settingsData),
      ]);

      if (pageRes?.success || pageRes?.data) {
        onSuccess(publishImmediate ? 'Contact page and settings published live!' : 'Contact settings saved successfully!');
        if (pageRes.data) setContactData(pageRes.data);
      } else {
        onError(pageRes?.message || 'Failed to update contact page.');
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
        <span>Loading Contact CMS Configuration...</span>
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
              Public Page & Corporate Desk
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
              contactData.status === 'published' 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
            }`}>
              {contactData.status.toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Contact Information & Desk Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage public contact email, technical facility addresses, direct support numbers, and response standards.
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
          <Sparkles className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Contact Page Hero</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Eyebrow Badge Text</label>
            <input
              type="text"
              value={contactData.hero?.badge || ''}
              onChange={(e) => setContactData({
                ...contactData,
                hero: { ...contactData.hero, badge: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Hero Headline</label>
            <input
              type="text"
              value={contactData.hero?.headline || ''}
              onChange={(e) => setContactData({
                ...contactData,
                hero: { ...contactData.hero, headline: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-medium"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Hero Subheadline</label>
            <textarea
              rows={2}
              value={contactData.hero?.subheadline || ''}
              onChange={(e) => setContactData({
                ...contactData,
                hero: { ...contactData.hero, subheadline: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: OFFICIAL DIRECT CONTACT POINTS */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Mail className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Official Commercial & Technical Desks</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-champagne-400" />
              <span>Public Contact Email</span>
            </label>
            <input
              type="email"
              value={settingsData.contactEmail || ''}
              onChange={(e) => setSettingsData({ ...settingsData, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-champagne-400" />
              <span>Direct Phone Line</span>
            </label>
            <input
              type="text"
              value={settingsData.contactPhone || ''}
              onChange={(e) => setSettingsData({ ...settingsData, contactPhone: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-champagne-400" />
              <span>Registered Technical Center Address</span>
            </label>
            <textarea
              rows={3}
              value={settingsData.address || ''}
              onChange={(e) => setSettingsData({ ...settingsData, address: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-champagne-400" />
              <span>Response Standard & Business Hours</span>
            </label>
            <input
              type="text"
              value={settingsData.businessHours || ''}
              onChange={(e) => setSettingsData({ ...settingsData, businessHours: e.target.value })}
              placeholder="e.g. Guaranteed within 24 business hours"
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: SEO */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Globe2 className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Contact Page SEO Metadata</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">SEO Meta Title</label>
            <input
              type="text"
              value={contactData.seo?.title || ''}
              onChange={(e) => setContactData({
                ...contactData,
                seo: { ...contactData.seo, title: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">SEO Meta Description</label>
            <textarea
              rows={2}
              value={contactData.seo?.description || ''}
              onChange={(e) => setContactData({
                ...contactData,
                seo: { ...contactData.seo, description: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <ContentPreviewModal
          title="Contact Page Preview"
          data={{ ...contactData, settings: settingsData }}
          type="contact"
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Settings, 
  Sliders, 
  Sparkles, 
  Share2, 
  Bell, 
  Image as ImageIcon, 
  Globe2, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { api } from '../../../services/api';

interface CmsSettingsTabProps {
  token: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const CmsSettingsTab: React.FC<CmsSettingsTabProps> = ({
  token,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    companyName: 'Peace Haven Technologies Inc.',
    tagline: 'Engineering Ideas. Empowering Industries.',
    logoUrl: '/images/peace-haven-logo.png',
    faviconUrl: '/favicon.ico',
    contactEmail: 'inquiries@peacehaven.tech',
    contactPhone: '+1 (800) 555-0199',
    address: 'Site No 71, SNV Garden Main Rd, Ramanathapuram, Coimbatore, Tamil Nadu 641036',
    businessHours: 'Guaranteed within 24 business hours',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/peace-haven-technologies',
      github: 'https://github.com/peace-haven',
      twitter: 'https://x.com/peacehaventech',
      youtube: 'https://youtube.com/@peacehaventech',
    },
    headerAnnouncement: {
      enabled: false,
      message: 'Peace Haven Unveils Next-Gen ROS 2 Robotics & FinTech Reference Stack',
      link: '/portfolio',
      linkText: 'Explore Stack',
    },
    defaultCta: {
      title: 'Ready to Engineer Your Future?',
      description: 'Whether you need a dedicated technical squad or a complete end-to-end robotics build, we are ready to architect your solution.',
      buttonText: 'Start a Project',
      buttonLink: '/start-a-project',
    },
    copyrightText: '© 2026 Peace Haven Technologies Inc. All rights reserved. Registered Engineering Firm.',
    defaultSeo: {
      metaTitle: 'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions',
      metaDescription: 'Peace Haven delivers innovative technology solutions across web development, FinTech, robotics, healthcare and digital transformation.',
      ogImage: '/og-image.png',
    },
  });

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await api.getCmsSettings(token);
      if (res?.data) {
        setSettings((prev: any) => ({
          ...prev,
          ...res.data,
          socialLinks: { ...prev.socialLinks, ...(res.data.socialLinks || {}) },
          headerAnnouncement: { ...prev.headerAnnouncement, ...(res.data.headerAnnouncement || {}) },
          defaultCta: { ...prev.defaultCta, ...(res.data.defaultCta || {}) },
          defaultSeo: { ...prev.defaultSeo, ...(res.data.defaultSeo || {}) },
        }));
      }
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.updateCmsSettings(token, settings);
      if (res?.success || res?.data) {
        onSuccess('Global website branding and settings updated successfully!');
        if (res.data) setSettings(res.data);
      } else {
        onError(res?.message || 'Failed to update global settings.');
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
        <span>Loading Global Site Settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div>
          <span className="text-xs font-mono text-champagne-400 font-bold uppercase tracking-wider">
            Site-Wide Settings
          </span>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Website Branding & Global Configurations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure global website name, brand logo, favicon, header announcements, social channels, and copyright.
          </p>
        </div>

        <Button
          onClick={handleSave}
          variant="champagne"
          size="sm"
          isLoading={saving}
          leftIcon={<Save className="w-3.5 h-3.5 text-charcoal-950" />}
        >
          Save Global Settings
        </Button>
      </div>

      {/* SECTION 1: IDENTITY & BRANDING */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Settings className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Identity & Branding</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Company Legal Name</label>
            <input
              type="text"
              value={settings.companyName || ''}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Global Brand Tagline</label>
            <input
              type="text"
              value={settings.tagline || ''}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Logo Image URL</label>
            <input
              type="text"
              value={settings.logoUrl || ''}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Favicon URL</label>
            <input
              type="text"
              value={settings.faviconUrl || ''}
              onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: HEADER ANNOUNCEMENT BANNER */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-sage-500/15">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-champagne-400" />
            <h3 className="font-heading text-sm font-semibold text-white">Header Announcement Banner</h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
            <input
              type="checkbox"
              checked={settings.headerAnnouncement?.enabled || false}
              onChange={(e) => setSettings({
                ...settings,
                headerAnnouncement: {
                  ...settings.headerAnnouncement,
                  enabled: e.target.checked,
                },
              })}
              className="rounded bg-charcoal-900 border-sage-500/40 text-champagne-500 focus:ring-0"
            />
            <span>Enable Top Banner</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-mono text-slate-300">Announcement Message</label>
            <input
              type="text"
              value={settings.headerAnnouncement?.message || ''}
              onChange={(e) => setSettings({
                ...settings,
                headerAnnouncement: {
                  ...settings.headerAnnouncement,
                  message: e.target.value,
                },
              })}
              placeholder="e.g. Peace Haven Unveils Next-Gen ROS 2 Robotics & FinTech Stack"
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Action Button Label</label>
            <input
              type="text"
              value={settings.headerAnnouncement?.linkText || ''}
              onChange={(e) => setSettings({
                ...settings,
                headerAnnouncement: {
                  ...settings.headerAnnouncement,
                  linkText: e.target.value,
                },
              })}
              placeholder="e.g. Explore Stack"
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-slate-300">Destination Link URL</label>
            <input
              type="text"
              value={settings.headerAnnouncement?.link || ''}
              onChange={(e) => setSettings({
                ...settings,
                headerAnnouncement: {
                  ...settings.headerAnnouncement,
                  link: e.target.value,
                },
              })}
              placeholder="e.g. /portfolio"
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: SOCIAL MEDIA LINKS */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Share2 className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Verified Social & Repository Profiles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">LinkedIn Profile URL</label>
            <input
              type="url"
              value={settings.socialLinks?.linkedin || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">GitHub Organization URL</label>
            <input
              type="url"
              value={settings.socialLinks?.github || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, github: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Twitter / X URL</label>
            <input
              type="url"
              value={settings.socialLinks?.twitter || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, twitter: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">YouTube Channel URL</label>
            <input
              type="url"
              value={settings.socialLinks?.youtube || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, youtube: e.target.value },
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: COPYRIGHT & DEFAULT LEGAL */}
      <div className="p-6 rounded-2xl bg-charcoal-850/70 border border-sage-500/20 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-sage-500/15">
          <Globe2 className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading text-sm font-semibold text-white">Footer Legal & Copyright</h3>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-300">Footer Copyright Statement</label>
          <input
            type="text"
            value={settings.copyrightText || ''}
            onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white"
          />
        </div>
      </div>
    </div>
  );
};


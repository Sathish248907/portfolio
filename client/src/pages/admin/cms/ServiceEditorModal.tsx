import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Layers, CheckCircle2, Globe2 } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { SeoMetadataEditor } from '../../../components/admin/SeoMetadataEditor';

interface ServiceEditorModalProps {
  service: any;
  isNew?: boolean;
  onClose: () => void;
  onSave: (serviceData: any) => Promise<void>;
}

export const ServiceEditorModal: React.FC<ServiceEditorModalProps> = ({
  service,
  isNew = false,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({
    serviceId: service?.serviceId || service?.id || '',
    slug: service?.slug || '',
    title: service?.title || '',
    tagline: service?.tagline || '',
    heroHeadline: service?.heroHeadline || '',
    shortDescription: service?.shortDescription || service?.shortDesc || '',
    division: service?.division || 'Engineering Division',
    iconName: service?.iconName || 'Cpu',
    status: service?.status || 'published',
    displayOrder: service?.displayOrder || 1,
    capabilities: service?.capabilities || [
      { title: 'Core Capability', description: 'System design and implementation.' },
    ],
    techStack: Array.isArray(service?.techStack) ? service.techStack.join(', ') : '',
    deliverables: Array.isArray(service?.deliverables) ? service.deliverables.join(', ') : '',
    seo: {
      title: service?.seo?.title || `${service?.title || 'Engineering Service'} | Peace Haven`,
      description: service?.seo?.description || service?.shortDescription || '',
      keywords: service?.seo?.keywords || '',
    },
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        techStack: formData.techStack.split(',').map((s: string) => s.trim()).filter(Boolean),
        deliverables: formData.deliverables.split(',').map((s: string) => s.trim()).filter(Boolean),
      };
      await onSave(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const addCapability = () => {
    setFormData({
      ...formData,
      capabilities: [
        ...formData.capabilities,
        { title: 'New Capability', description: 'Capability description...' },
      ],
    });
  };

  const removeCapability = (index: number) => {
    const caps = [...formData.capabilities];
    caps.splice(index, 1);
    setFormData({ ...formData, capabilities: caps });
  };

  const updateCapability = (index: number, field: string, val: string) => {
    const caps = [...formData.capabilities];
    caps[index] = { ...caps[index], [field]: val };
    setFormData({ ...formData, capabilities: caps });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-charcoal-900 border border-sage-500/30 w-full max-w-4xl rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sage-500/20">
          <div>
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-champagne-400" />
              <span>{isNew ? 'Create New Engineering Service' : `Edit Service: ${formData.title}`}</span>
            </h3>
            <span className="text-xs font-mono text-champagne-400">
              /services/{formData.slug || 'service-slug'}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Service Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Route Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Division Category</label>
              <input
                type="text"
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                placeholder="e.g. Cloud & Software or Robotics & Aerial"
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Publication Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-mono text-slate-300">Short Summary *</label>
              <textarea
                rows={2}
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Hero Headline</label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Hero Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              />
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-3 pt-3 border-t border-sage-500/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-champagne-400 font-bold uppercase">
                Service Capabilities
              </label>
              <button
                type="button"
                onClick={addCapability}
                className="text-xs font-mono text-champagne-400 hover:text-white flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Capability</span>
              </button>
            </div>

            {formData.capabilities.map((cap: any, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Capability #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeCapability(idx)}
                    className="text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={cap.title}
                  onChange={(e) => updateCapability(idx, 'title', e.target.value)}
                  placeholder="Capability Title"
                  className="w-full px-3 py-1.5 rounded-lg bg-charcoal-900 border border-sage-500/30 text-xs text-white"
                />
                <textarea
                  rows={2}
                  value={cap.description}
                  onChange={(e) => updateCapability(idx, 'description', e.target.value)}
                  placeholder="Capability description..."
                  className="w-full px-3 py-1.5 rounded-lg bg-charcoal-900 border border-sage-500/30 text-xs text-white resize-none"
                />
              </div>
            ))}
          </div>

          {/* Tech Stack & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-sage-500/20">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="React, Node.js, ROS 2, Python, Docker"
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Deliverables (comma separated)</label>
              <input
                type="text"
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                placeholder="Production Portal, Automated CI/CD, Documentation"
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>
          </div>

          {/* Advanced SEO Metadata Controls */}
          <SeoMetadataEditor
            value={{
              title: formData.seo?.title || formData.title,
              description: formData.seo?.description || formData.shortDescription,
              canonicalUrl: formData.seo?.canonicalUrl || '',
              keywords: formData.seo?.keywords || formData.techStack,
              ogImage: formData.seo?.ogImage || '',
              noindex: formData.seo?.noindex || false,
            }}
            defaultSlug={`services/${formData.slug}`}
            pageContextName={formData.title || 'Service'}
            onChange={(updatedSeo: any) => {
              setFormData({
                ...formData,
                seo: {
                  ...formData.seo,
                  ...updatedSeo,
                },
              });
            }}
          />

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage-500/20">
            <Button type="button" onClick={onClose} variant="outline" size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="champagne"
              size="sm"
              isLoading={saving}
              leftIcon={<Save className="w-3.5 h-3.5 text-charcoal-950" />}
            >
              {isNew ? 'Create Service' : 'Save Service Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Briefcase, Globe2, Sparkles } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface ProjectEditorModalProps {
  project: any;
  isNew?: boolean;
  onClose: () => void;
  onSave: (projectData: any) => Promise<void>;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  isNew = false,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({
    projectId: project?.projectId || project?.id || '',
    slug: project?.slug || '',
    title: project?.title || '',
    subtitle: project?.subtitle || '',
    clientName: project?.clientName || 'Peace Haven Engineering Lab',
    category: project?.category || 'Web Development',
    serviceId: project?.serviceId || 'web-development',
    serviceName: project?.serviceName || 'Web Development & Cloud',
    industry: project?.industry || 'Technology & Enterprise',
    isDemonstrationOrPrototype: project?.isDemonstrationOrPrototype ?? false,
    statusBadge: project?.statusBadge || 'Verified Live Production Platform',
    isFeatured: project?.isFeatured ?? false,
    displayOrder: project?.displayOrder || 1,
    status: project?.status || 'published',
    thumbnail: project?.thumbnail || '/images/projects/artistry-homepage.png',
    heroImage: project?.heroImage || '/images/projects/artistry-homepage.png',
    shortDescription: project?.shortDescription || '',
    overview: project?.overview || '',
    challenge: project?.challenge || project?.businessChallenge || '',
    solution: project?.solution || '',
    technologies: Array.isArray(project?.technologies) ? project.technologies.join(', ') : '',
    liveUrl: project?.liveUrl || '',
    demoUrl: project?.demoUrl || '',
    architectureHighlights: project?.architectureHighlights || [
      'High-throughput distributed architecture',
    ],
    seo: {
      title: project?.seo?.title || `${project?.title || 'Case Study'} | Peace Haven Portfolio`,
      description: project?.seo?.description || project?.shortDescription || '',
    },
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map((s: string) => s.trim()).filter(Boolean),
      };
      await onSave(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      architectureHighlights: [...formData.architectureHighlights, 'New technical architectural highlight'],
    });
  };

  const removeHighlight = (idx: number) => {
    const list = [...formData.architectureHighlights];
    list.splice(idx, 1);
    setFormData({ ...formData, architectureHighlights: list });
  };

  const updateHighlight = (idx: number, val: string) => {
    const list = [...formData.architectureHighlights];
    list[idx] = val;
    setFormData({ ...formData, architectureHighlights: list });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-charcoal-900 border border-sage-500/30 w-full max-w-4xl rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sage-500/20">
          <div>
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-champagne-400" />
              <span>{isNew ? 'Create New Selected Work Case Study' : `Edit Case Study: ${formData.title}`}</span>
            </h3>
            <span className="text-xs font-mono text-champagne-400">
              /work/{formData.slug || 'case-study-slug'}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Project Title *</label>
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
              <label className="text-xs font-mono text-slate-300">Subtitle / Tagline</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Luxury Jewellery E-Commerce Platform"
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Client / Organization</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. Artistry Jewels Inc."
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Service Category</label>
              <select
                value={formData.serviceId}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  serviceId: e.target.value,
                  category: e.target.options[e.target.selectedIndex].text
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              >
                <option value="web-development">Web Development</option>
                <option value="fintech">FinTech</option>
                <option value="robotics">Robotics</option>
                <option value="healthcare">Healthcare</option>
                <option value="drone-technology">Drone Technology</option>
                <option value="us-staffing">US Staffing</option>
                <option value="trading">Trading</option>
                <option value="digital-marketing">Digital Marketing</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Status Badge</label>
              <input
                type="text"
                value={formData.statusBadge}
                onChange={(e) => setFormData({ ...formData, statusBadge: e.target.value })}
                placeholder="e.g. Verified Live Production Platform or Prototype"
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>

            <div className="flex items-center gap-6 pt-3 md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isDemonstrationOrPrototype}
                  onChange={(e) => setFormData({ ...formData, isDemonstrationOrPrototype: e.target.checked })}
                  className="rounded bg-charcoal-850 border-sage-500/40 text-champagne-500 focus:ring-0"
                />
                <span>Designate as Demonstration / Prototype</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded bg-charcoal-850 border-sage-500/40 text-champagne-500 focus:ring-0"
                />
                <span>Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.status === 'published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                  className="rounded bg-charcoal-850 border-sage-500/40 text-champagne-500 focus:ring-0"
                />
                <span>Published Live</span>
              </label>
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

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-mono text-slate-300">Comprehensive Case Study Overview</label>
              <textarea
                rows={3}
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Business Challenge</label>
              <textarea
                rows={2}
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Engineered Solution</label>
              <textarea
                rows={2}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Technologies (comma separated)</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, TypeScript, Node.js, MongoDB"
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Live URL (optional)</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Thumbnail Image URL</label>
              <input
                type="text"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Hero Image URL</label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
              />
            </div>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-3 pt-3 border-t border-sage-500/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-champagne-400 font-bold uppercase">
                Architectural Highlights & Innovations
              </label>
              <button
                type="button"
                onClick={addHighlight}
                className="text-xs font-mono text-champagne-400 hover:text-white flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Highlight</span>
              </button>
            </div>

            {formData.architectureHighlights.map((hl: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={hl}
                  onChange={(e) => updateHighlight(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(idx)}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

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
              {isNew ? 'Create Case Study' : 'Save Project Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Briefcase, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { ProjectEditorModal } from './ProjectEditorModal';
import { api } from '../../../services/api';

interface CmsProjectsTabProps {
  projects: any[];
  token: string;
  onRefresh: () => Promise<void>;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const CmsProjectsTab: React.FC<CmsProjectsTabProps> = ({
  projects,
  token,
  onRefresh,
  onSuccess,
  onError,
}) => {
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleTogglePublish = async (proj: any) => {
    try {
      const nextStatus = (proj.status === 'published' || proj.isPublished) ? 'draft' : 'published';
      const res = await api.toggleCmsProjectPublish(token, proj.slug || proj.id, nextStatus);
      if (res?.success) {
        onSuccess(`Project "${proj.title}" publish state set to ${nextStatus}!`);
        await onRefresh();
      } else {
        onError(res?.message || 'Failed to update project status.');
      }
    } catch (err: any) {
      onError(err?.message || 'Error communicating with server.');
    }
  };

  const handleDelete = async (proj: any) => {
    const confirm = window.confirm(`Are you sure you want to delete case study "${proj.title}"?`);
    if (!confirm) return;

    try {
      const res = await api.deleteCmsProject(token, proj.slug || proj.id);
      if (res?.success) {
        onSuccess(`Case study "${proj.title}" deleted.`);
        await onRefresh();
      } else {
        onError(res?.message || 'Failed to delete project.');
      }
    } catch (err: any) {
      onError(err?.message || 'Error communicating with server.');
    }
  };

  const handleSave = async (projectData: any) => {
    try {
      if (isCreating) {
        const res = await api.createCmsProject(token, projectData);
        if (res?.success) {
          onSuccess(`Case study "${projectData.title}" created successfully!`);
          setIsCreating(false);
          await onRefresh();
        } else {
          onError(res?.message || 'Failed to create project.');
        }
      } else {
        const res = await api.updateCmsProject(token, projectData.slug || projectData.id, projectData);
        if (res?.success) {
          onSuccess(`Case study "${projectData.title}" updated successfully!`);
          setEditingProject(null);
          await onRefresh();
        } else {
          onError(res?.message || 'Failed to update project.');
        }
      }
    } catch (err: any) {
      onError(err?.message || 'Error communicating with server.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div>
          <span className="text-xs font-mono text-champagne-400 font-bold uppercase tracking-wider">
            Verified Laboratory & Case Studies
          </span>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Portfolio & Selected Works Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage genuine client systems, engineering demonstrators, architectural prototypes, and metrics.
          </p>
        </div>

        <Button
          onClick={() => setIsCreating(true)}
          variant="champagne"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5 text-charcoal-950" />}
        >
          Add New Case Study
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.slug || proj.id}
            className="p-5 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 space-y-4 hover:border-sage-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-heading font-bold text-white text-base">{proj.title}</h4>
                  <span className="text-[11px] font-mono text-champagne-400 block">
                    /work/{proj.slug}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <button
                    onClick={() => handleTogglePublish(proj)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono border transition-colors ${
                      proj.status === 'published' || proj.isPublished
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {proj.status || (proj.isPublished ? 'published' : 'draft')}
                  </button>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-900 text-teal-300 border border-teal-500/20 font-mono">
                    {proj.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {proj.shortDescription || proj.overview || 'Verified architectural reference platform and case study.'}
              </p>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/15 text-champagne-300">
                  {proj.statusBadge || 'Verified Production'}
                </span>
                {proj.clientName && (
                  <span className="truncate">Client: {proj.clientName}</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-sage-500/15 text-xs">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setEditingProject(proj)}
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit3 className="w-3 h-3 text-champagne-400" />}
                >
                  Edit
                </Button>
                <button
                  onClick={() => handleDelete(proj)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                  title="Delete Case Study"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <Link
                to={`/work/${proj.slug}`}
                target="_blank"
                className="text-xs font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
              >
                <span>Live Route</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {(isCreating || editingProject) && (
        <ProjectEditorModal
          project={isCreating ? null : editingProject}
          isNew={isCreating}
          onClose={() => {
            setIsCreating(false);
            setEditingProject(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

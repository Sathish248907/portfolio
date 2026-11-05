import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Layers, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { ServiceEditorModal } from './ServiceEditorModal';
import { api } from '../../../services/api';

interface CmsServicesTabProps {
  services: any[];
  token: string;
  onRefresh: () => Promise<void>;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const CmsServicesTab: React.FC<CmsServicesTabProps> = ({
  services,
  token,
  onRefresh,
  onSuccess,
  onError,
}) => {
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleTogglePublish = async (service: any) => {
    try {
      const nextStatus = (service.status === 'published' || !service.status) ? 'draft' : 'published';
      const res = await api.toggleCmsServicePublish(token, service.slug || service.id, nextStatus);
      if (res?.success) {
        onSuccess(`Service ${service.title} publish state set to ${nextStatus}!`);
        await onRefresh();
      } else {
        onError(res?.message || 'Failed to update service status.');
      }
    } catch (err: any) {
      onError(err?.message || 'Error communicating with server.');
    }
  };

  const handleDelete = async (service: any) => {
    const confirm = window.confirm(`Are you sure you want to delete "${service.title}"? This action cannot be undone.`);
    if (!confirm) return;

    try {
      const res = await api.deleteCmsService(token, service.slug || service.id);
      if (res?.success) {
        onSuccess(`Service "${service.title}" deleted.`);
        await onRefresh();
      } else {
        onError(res?.message || 'Failed to delete service.');
      }
    } catch (err: any) {
      onError(err?.message || 'Error communicating with server.');
    }
  };

  const handleSave = async (serviceData: any) => {
    try {
      if (isCreating) {
        const res = await api.createCmsService(token, serviceData);
        if (res?.success) {
          onSuccess(`Service "${serviceData.title}" created successfully!`);
          setIsCreating(false);
          await onRefresh();
        } else {
          onError(res?.message || 'Failed to create service.');
        }
      } else {
        const res = await api.updateCmsService(token, serviceData.slug || serviceData.id, serviceData);
        if (res?.success) {
          onSuccess(`Service "${serviceData.title}" updated successfully!`);
          setEditingService(null);
          await onRefresh();
        } else {
          onError(res?.message || 'Failed to update service.');
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
            Capabilities Architecture
          </span>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Engineering Services & Divisions Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, edit, reorder, and configure the public service divisions, capabilities, tech stacks, and workflows.
          </p>
        </div>

        <Button
          onClick={() => setIsCreating(true)}
          variant="champagne"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5 text-charcoal-950" />}
        >
          Add New Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((serv) => (
          <div
            key={serv.slug || serv.id}
            className="p-5 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 space-y-4 hover:border-sage-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-heading font-bold text-white text-base">{serv.title}</h4>
                  <span className="text-[11px] font-mono text-champagne-400 block">
                    /services/{serv.slug}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(serv)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono border transition-colors ${
                      serv.status === 'published' || !serv.status
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {serv.status || 'published'}
                  </button>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-900 text-slate-300 border border-sage-500/20 font-mono">
                    {serv.division || 'Division'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {serv.shortDescription || serv.shortDesc || 'Specialized multidisciplinary engineering capability.'}
              </p>

              {(serv.techStack || []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(serv.techStack || []).slice(0, 4).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/15 text-[10px] font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {(serv.techStack || []).length > 4 && (
                    <span className="text-[10px] font-mono text-slate-500 self-center">
                      +{serv.techStack.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-sage-500/15 text-xs">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setEditingService(serv)}
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit3 className="w-3 h-3 text-champagne-400" />}
                >
                  Edit
                </Button>
                <button
                  onClick={() => handleDelete(serv)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <Link
                to={`/services/${serv.slug}`}
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
      {(isCreating || editingService) && (
        <ServiceEditorModal
          service={isCreating ? null : editingService}
          isNew={isCreating}
          onClose={() => {
            setIsCreating(false);
            setEditingService(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

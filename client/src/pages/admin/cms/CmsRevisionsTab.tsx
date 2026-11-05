import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  Clock, 
  History, 
  User, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { api } from '../../../services/api';

interface CmsRevisionsTabProps {
  token: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const CmsRevisionsTab: React.FC<CmsRevisionsTabProps> = ({
  token,
  onSuccess,
  onError,
}) => {
  const [revisions, setRevisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const loadRevisions = async () => {
    setLoading(true);
    try {
      const res = await api.getCmsRevisions(token);
      if (res?.data) {
        setRevisions(res.data);
      }
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRevisions();
  }, []);

  const handleRestore = async (rev: any) => {
    const confirm = window.confirm(`Are you sure you want to restore "${rev.entityTitle || rev.entityId}" to version ${rev.version} snapshot? Current live data will be rolled back.`);
    if (!confirm) return;

    setRestoringId(rev._id || rev.id);
    try {
      const res = await api.restoreCmsRevision(token, rev._id || rev.id);
      if (res?.success) {
        onSuccess(`Successfully rolled back ${rev.entityTitle} to version ${rev.version}!`);
        await loadRevisions();
      } else {
        onError(res?.message || 'Failed to restore revision.');
      }
    } catch (err: any) {
      onError(err?.message || 'Error executing rollback.');
    } finally {
      setRestoringId(null);
    }
  };

  const filteredRevisions = filterType === 'all'
    ? revisions
    : revisions.filter((r) => r.entityType === filterType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div>
          <span className="text-xs font-mono text-champagne-400 font-bold uppercase tracking-wider">
            Content Versioning & Integrity
          </span>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Revision History & Rollback System
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every update made to pages, services, case studies, or settings creates an immutable snapshot. Restore any earlier version with one click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs font-mono text-slate-300 focus:outline-none"
          >
            <option value="all">All Entity Types</option>
            <option value="page">Pages</option>
            <option value="service">Services</option>
            <option value="project">Portfolio Case Studies</option>
            <option value="settings">Global Settings</option>
          </select>

          <Button
            onClick={loadRevisions}
            variant="outline"
            size="sm"
            isLoading={loading}
            leftIcon={<RefreshCw className="w-3.5 h-3.5 text-champagne-400" />}
          >
            Refresh History
          </Button>
        </div>
      </div>

      {/* Revision Table */}
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        {filteredRevisions.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <History className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-heading font-bold text-slate-300">No Revision Snapshots Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-light">
              Revisions are automatically captured when website pages, services, or settings are updated through the Admin CMS.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-sage-500/20 text-slate-400 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4">Entity Type</th>
                  <th className="py-3 px-4">Entity Title / ID</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Modified By</th>
                  <th className="py-3 px-4">Change Summary</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-500/10">
                {filteredRevisions.map((rev) => (
                  <tr key={rev._id || rev.id} className="hover:bg-charcoal-800/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-champagne-400 uppercase text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">
                        {rev.entityType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white max-w-xs truncate">
                      {rev.entityTitle || rev.entityId}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-teal-300">
                      v{rev.version || 1}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono flex items-center gap-1.5 pt-4">
                      <User className="w-3 h-3 text-slate-500" />
                      <span>{rev.modifiedBy || 'Administrator'}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate font-mono text-[11px]">
                      {rev.changeSummary || 'Content modified in CMS'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {new Date(rev.timestamp || rev.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        onClick={() => handleRestore(rev)}
                        variant="outline"
                        size="sm"
                        isLoading={restoringId === (rev._id || rev.id)}
                        leftIcon={<RotateCcw className="w-3 h-3 text-teal-400" />}
                      >
                        Restore Version
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


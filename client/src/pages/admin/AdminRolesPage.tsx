import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  Check, 
  Lock, 
  AlertTriangle, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  Users, 
  Info,
  X
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { AdminRole, PermissionModule } from '../../types';
import { Button } from '../../components/common/Button';
import { cn } from '../../lib/utils';
import { FALLBACK_MODULES, FALLBACK_ROLES } from '../../services/api/adminApi';

export const AdminRolesPage: React.FC = () => {
  const { token, user: currentUser } = useAuth();
  const [roles, setRoles] = useState<AdminRole[]>(FALLBACK_ROLES);
  const [modules, setModules] = useState<PermissionModule[]>(FALLBACK_MODULES);
  const [selectedRoleSlug, setSelectedRoleSlug] = useState<string>('content_manager');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Custom role modal state
  const [createRoleModalOpen, setCreateRoleModalOpen] = useState(false);
  const [customRoleForm, setCustomRoleForm] = useState({
    name: '',
    slug: '',
    description: '',
  });

  const fetchRolesData = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminRoles(token || '');
      if (data?.roles && data.roles.length > 0) {
        setRoles(data.roles);
      }
      if (data?.modules && data.modules.length > 0) {
        setModules(data.modules);
      }
    } catch (e) {
      console.warn('Roles fetch fallback', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolesData();
  }, []);

  const activeRole = roles.find((r) => r.slug === selectedRoleSlug) || roles[0];

  const handleTogglePermission = (modId: string, action: string) => {
    if (activeRole.slug === 'superadmin') {
      setNotification({
        type: 'error',
        message: 'Super Admin holds root system authority and permissions cannot be revoked.',
      });
      return;
    }

    const permKey = `${modId}:${action}`;
    const currentPerms = new Set(activeRole.permissions);

    if (currentPerms.has(permKey)) {
      currentPerms.delete(permKey);
    } else {
      currentPerms.add(permKey);
    }

    const updatedRoles = roles.map((r) =>
      r.slug === activeRole.slug ? { ...r, permissions: Array.from(currentPerms) } : r
    );
    setRoles(updatedRoles);
  };

  const handleSavePermissions = async () => {
    setSaving(true);
    try {
      const res = await api.updateAdminRole(token || '', activeRole._id || activeRole.id || activeRole.slug, {
        permissions: activeRole.permissions,
        description: activeRole.description,
      });
      if (res?.success) {
        setNotification({
          type: 'success',
          message: `Permissions updated successfully for role '${activeRole.name}'.`,
        });
        fetchRolesData();
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to save permissions' });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCustomRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRoleForm.name || !customRoleForm.slug) return;
    try {
      const res = await api.createAdminRole(token || '', {
        name: customRoleForm.name,
        slug: customRoleForm.slug,
        description: customRoleForm.description,
        permissions: ['dashboard:view'],
      });
      if (res?.success) {
        setNotification({ type: 'success', message: `Custom role '${customRoleForm.name}' created.` });
        setCreateRoleModalOpen(false);
        setCustomRoleForm({ name: '', slug: '', description: '' });
        fetchRolesData();
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Error creating custom role' });
    }
  };

  const allAvailableActions = ['view', 'create', 'edit', 'delete', 'publish', 'export', 'assign'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white">Roles & Permissions Matrix</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
              RBAC v2.0
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Configure access control at the module and action level for internal staff roles and custom positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchRolesData}
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
          {currentUser?.role === 'superadmin' && (
            <Button
              onClick={() => setCreateRoleModalOpen(true)}
              variant="champagne"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Create Custom Role
            </Button>
          )}
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={cn(
            'p-4 rounded-xl border text-xs flex items-center justify-between animate-in fade-in duration-200',
            notification.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-red-500/10 border-red-500/40 text-red-300'
          )}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Role Selector Tabs / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        {roles.map((r) => {
          const isSelected = r.slug === activeRole.slug;
          return (
            <button
              key={r.slug}
              onClick={() => setSelectedRoleSlug(r.slug)}
              className={cn(
                'p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2',
                isSelected
                  ? 'bg-teal-700/20 border-champagne-400 text-white shadow-md'
                  : 'bg-charcoal-850/80 border-sage-700/30 text-slate-400 hover:text-slate-200 hover:border-sage-700/60'
              )}
            >
              <div className="flex items-center justify-between">
                <Shield className={cn('w-4 h-4', isSelected ? 'text-champagne-300' : 'text-slate-500')} />
                {r.isSystemRole && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-charcoal-900 border border-sage-700/30 text-slate-400">
                    System
                  </span>
                )}
              </div>
              <div>
                <span className="font-heading font-bold text-xs block leading-tight truncate">{r.name}</span>
                <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                  {r.permissions.length} perms
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Role Meta & Save Bar */}
      <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-bold text-white">{activeRole.name}</h2>
            <span className="font-mono text-xs text-champagne-400 bg-charcoal-900 px-2 py-0.5 rounded border border-sage-700/40">
              slug: {activeRole.slug}
            </span>
            {activeRole.slug === 'superadmin' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                <Lock className="w-3 h-3" /> Root Immutable
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs">{activeRole.description}</p>
        </div>

        {activeRole.slug !== 'superadmin' && (
          <Button
            onClick={handleSavePermissions}
            variant="champagne"
            size="sm"
            disabled={saving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            {saving ? 'Saving Changes...' : 'Save Permissions'}
          </Button>
        )}
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-sage-700/30 bg-charcoal-900/80 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-5 w-64">Administrative Module</th>
                {allAvailableActions.map((action) => (
                  <th key={action} className="py-3.5 px-3 text-center capitalize w-24">
                    {action}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-700/20 text-xs">
              {modules.map((mod) => {
                return (
                  <tr key={mod.id} className="hover:bg-white/[0.015] transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-semibold text-white block">{mod.label}</span>
                      <span className="text-[10px] font-mono text-slate-500">{mod.id}</span>
                    </td>

                    {allAvailableActions.map((act) => {
                      const isApplicable = mod.actions.includes(act);
                      const permKey = `${mod.id}:${act}`;
                      const isGranted =
                        activeRole.slug === 'superadmin' ||
                        activeRole.permissions.includes(permKey) ||
                        activeRole.permissions.includes(`${mod.id}:*`);

                      if (!isApplicable) {
                        return (
                          <td key={act} className="py-3.5 px-3 text-center">
                            <span className="text-slate-600 font-mono text-[10px]">—</span>
                          </td>
                        );
                      }

                      return (
                        <td key={act} className="py-3.5 px-3 text-center">
                          <button
                            type="button"
                            disabled={activeRole.slug === 'superadmin'}
                            onClick={() => handleTogglePermission(mod.id, act)}
                            className={cn(
                              'w-6 h-6 rounded-lg inline-flex items-center justify-center border transition-all',
                              isGranted
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-charcoal-900/60 text-slate-600 border-sage-700/30 hover:border-sage-700/60',
                              activeRole.slug === 'superadmin' && 'opacity-70 cursor-not-allowed'
                            )}
                            title={isGranted ? `Revoke ${permKey}` : `Grant ${permKey}`}
                          >
                            {isGranted ? <Check className="w-3.5 h-3.5" /> : null}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE CUSTOM ROLE MODAL */}
      {createRoleModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-850 border border-sage-700/40 max-w-md w-full p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-sage-700/30 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-champagne-400" />
                <h3 className="font-heading font-bold text-lg text-white">Create Custom Role</h3>
              </div>
              <button
                onClick={() => setCreateRoleModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomRole} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Role Title *</label>
                <input
                  type="text"
                  required
                  value={customRoleForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
                    setCustomRoleForm({ ...customRoleForm, name, slug });
                  }}
                  placeholder="e.g. Compliance Auditor"
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">System Slug *</label>
                <input
                  type="text"
                  required
                  value={customRoleForm.slug}
                  onChange={(e) => setCustomRoleForm({ ...customRoleForm, slug: e.target.value })}
                  placeholder="e.g. compliance_auditor"
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-champagne-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={customRoleForm.description}
                  onChange={(e) => setCustomRoleForm({ ...customRoleForm, description: e.target.value })}
                  placeholder="Responsibilities and operational scope for this position..."
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-sage-700/30">
                <Button type="button" onClick={() => setCreateRoleModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="champagne" size="sm">
                  Create Role
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


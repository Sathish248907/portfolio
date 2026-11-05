import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert, 
  MoreVertical, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  RotateCcw,
  Trash2,
  Edit2,
  Lock,
  X
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { AdminUser, AdminInvitation, AdminRole } from '../../types';
import { Button } from '../../components/common/Button';
import { cn } from '../../lib/utils';

export const AdminUsersPage: React.FC = () => {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [invitations, setInvitations] = useState<AdminInvitation[]>([]);
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'invitations'>('users');
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Form states
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'editor' });
  const [editForm, setEditForm] = useState({ name: '', role: 'editor', status: 'active' });
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsersAndInvites = async () => {
    setLoading(true);
    try {
      const [usersRes, invitesRes, rolesRes] = await Promise.all([
        api.getAdminUsers(token || '', { search, role: roleFilter, status: statusFilter }),
        api.getAdminInvitations(token || ''),
        api.getAdminRoles(token || ''),
      ]);

      if (usersRes?.data) setUsers(usersRes.data);
      if (Array.isArray(invitesRes)) setInvitations(invitesRes);
      if (rolesRes?.roles) setRoles(rolesRes.roles);
    } catch (err: any) {
      console.warn('Could not fetch user management data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndInvites();
  }, [roleFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsersAndInvites();
  };

  const showNotification = (type: 'success' | 'error', text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage(null), 5000);
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.email) return;
    setActionLoading(true);
    try {
      const res = await api.createAdminInvitation(token || '', inviteForm);
      if (res?.success) {
        showNotification('success', (res as any)?.message || `Invitation successfully sent to ${inviteForm.email}`);
        setInviteModalOpen(false);
        setInviteForm({ name: '', email: '', role: 'editor' });
        fetchUsersAndInvites();
      } else {
        showNotification('error', (res as any)?.error || 'Failed to dispatch invitation');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Error creating invitation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      const res = await api.updateAdminUser(token || '', selectedUser.id || selectedUser._id || '', {
        name: editForm.name,
        role: editForm.role,
        status: editForm.status as any,
      });
      if (res?.success) {
        showNotification('success', 'User information updated successfully');
        setEditUserModalOpen(false);
        fetchUsersAndInvites();
      } else {
        showNotification('error', (res as any)?.error || 'Failed to update user');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Error updating user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusToggle = async (user: AdminUser, newStatus: string) => {
    if (user.id === currentUser?.id || user._id === currentUser?.id) {
      showNotification('error', 'You cannot alter your own account status.');
      return;
    }
    if (user.role === 'superadmin' && newStatus !== 'active') {
      const superAdminCount = users.filter((u) => u.role === 'superadmin' && u.status === 'active').length;
      if (superAdminCount <= 1) {
        showNotification('error', 'Safety protection: Cannot suspend the last active Super Admin.');
        return;
      }
    }

    try {
      const res = await api.updateAdminUserStatus(token || '', user.id || user._id || '', newStatus);
      if (res?.success) {
        showNotification('success', `User account status set to ${newStatus}.`);
        fetchUsersAndInvites();
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update status');
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (user.id === currentUser?.id || user._id === currentUser?.id) {
      showNotification('error', 'You cannot delete your own administrator account.');
      return;
    }
    if (user.role === 'superadmin') {
      const superAdminCount = users.filter((u) => u.role === 'superadmin').length;
      if (superAdminCount <= 1) {
        showNotification('error', 'Safety protection: Cannot delete the last remaining Super Admin.');
        return;
      }
    }

    if (!window.confirm(`Are you sure you want to permanently delete administrator account for ${user.email}?`)) {
      return;
    }

    try {
      const res = await api.deleteAdminUser(token || '', user.id || user._id || '');
      if (res?.success) {
        showNotification('success', 'Admin user account permanently deleted.');
        fetchUsersAndInvites();
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete user');
    }
  };

  const handleResendInvite = async (invitation: AdminInvitation) => {
    try {
      const res = await api.resendAdminInvitation(token || '', invitation._id || invitation.id || '');
      if (res?.success) {
        showNotification('success', `Invitation resent to ${invitation.email}.`);
        fetchUsersAndInvites();
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to resend invitation');
    }
  };

  const handleCancelInvite = async (invitation: AdminInvitation) => {
    if (!window.confirm(`Revoke invitation for ${invitation.email}?`)) return;
    try {
      const res = await api.cancelAdminInvitation(token || '', invitation._id || invitation.id || '');
      if (res?.success) {
        showNotification('success', 'Invitation cancelled.');
        fetchUsersAndInvites();
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to cancel invitation');
    }
  };

  const openEditModal = (u: AdminUser) => {
    setSelectedUser(u);
    setEditForm({
      name: u.name,
      role: u.role,
      status: u.status || 'active',
    });
    setEditUserModalOpen(true);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Active
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" /> Suspended
          </span>
        );
      case 'pending_invitation':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-500/10 text-slate-400 border border-slate-500/30">
            Inactive
          </span>
        );
    }
  };

  const getRoleBadge = (role: string) => {
    const formatted = role.replace(/_/g, ' ');
    return (
      <span className="capitalize text-xs font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-sage-700/40 text-champagne-300">
        {formatted}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white">Admin User Management</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
              Single-Admin Policy
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Sole root administrative account for Peace Haven governance, CMS management, client inquiries, and security operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchUsersAndInvites}
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
          <Button
            onClick={() => setInviteModalOpen(true)}
            variant="champagne"
            size="sm"
            leftIcon={<Mail className="w-3.5 h-3.5" />}
          >
            Invite Administrator
          </Button>
        </div>
      </div>

      {/* Single Administrator Policy Notice */}
      <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-champagne-500/30 flex items-start gap-3 shadow-md">
        <div className="w-9 h-9 rounded-xl bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-400 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Single-Administrator Architecture Active</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Enforced</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Peace Haven is strictly configured with one primary root administrator (<span className="text-champagne-300 font-mono">admin@peacehaven.tech</span>). All governance, CMS publishing, technical inquiries, and system notifications are centralized under this single authority. Creation of additional administrator accounts and outbound invitations is locked by system policy.
          </p>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={cn(
            'p-4 rounded-xl border text-xs flex items-center justify-between animate-in fade-in duration-200',
            actionMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-red-500/10 border-red-500/40 text-red-300'
          )}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-sage-700/30">
        <button
          onClick={() => setActiveTab('users')}
          className={cn(
            'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2',
            activeTab === 'users'
              ? 'border-champagne-400 text-champagne-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          )}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Registered Administrators</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-charcoal-850 border border-sage-700/40">
            {users.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('invitations')}
          className={cn(
            'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2',
            activeTab === 'invitations'
              ? 'border-champagne-400 text-champagne-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          )}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Pending Invitations</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-charcoal-850 border border-sage-700/40">
            {invitations.filter((i) => i.status === 'pending').length}
          </span>
        </button>
      </div>

      {/* TAB 1: REGISTERED USERS */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-charcoal-850/80 p-4 rounded-xl border border-sage-700/30 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search administrators by name or email..."
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-champagne-400"
              />
            </form>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Filter className="w-3.5 h-3.5" />
                <span>Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-charcoal-900 border border-sage-700/40 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-champagne-400"
                >
                  <option value="all">All Roles</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="content_manager">Content Manager</option>
                  <option value="editor">Editor</option>
                  <option value="marketing_manager">Marketing Manager</option>
                  <option value="sales_manager">Sales Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-charcoal-900 border border-sage-700/40 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-champagne-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-sage-700/30 bg-charcoal-900/60 text-[11px] font-mono uppercase text-slate-400">
                    <th className="py-3.5 px-4">Administrator</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Last Login</th>
                    <th className="py-3.5 px-4">Created</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-700/20 text-xs">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                        No admin users found matching the filter criteria.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => {
                      const isSelf = u.id === currentUser?.id || u._id === currentUser?.id;
                      return (
                        <tr key={u.id || u._id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-teal-500/20 text-champagne-300 border border-teal-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                                {u.name ? u.name.charAt(0).toUpperCase() : 'A'}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-white truncate">{u.name}</span>
                                  {isSelf && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-champagne-500/20 text-champagne-300 border border-champagne-500/40">
                                      YOU
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] font-mono text-slate-400 truncate block">{u.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>
                          <td className="py-3.5 px-4">{getStatusBadge(u.status)}</td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                            {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never logged in'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditModal(u)}
                                className="p-1.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-slate-300 hover:text-white border border-sage-700/30"
                                title="Edit user"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {!isSelf && (
                                <>
                                  {u.status === 'suspended' ? (
                                    <button
                                      onClick={() => handleStatusToggle(u, 'active')}
                                      className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                      title="Reactivate user"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleStatusToggle(u, 'suspended')}
                                      className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                      title="Suspend user access"
                                    >
                                      <XCircle className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                  <button
                                    onClick={() => handleDeleteUser(u)}
                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                                    title="Delete user"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PENDING INVITATIONS */}
      {activeTab === 'invitations' && (
        <div className="space-y-4">
          <div className="bg-charcoal-850/80 p-4 rounded-xl border border-sage-700/30 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-white text-sm">Active Administrator Invitations</h3>
              <p className="text-slate-400 text-xs">Single-use, time-limited security tokens generated for new administrative onboarding.</p>
            </div>
            <Button
              onClick={() => setInviteModalOpen(true)}
              variant="champagne"
              size="sm"
              leftIcon={<Mail className="w-3.5 h-3.5" />}
            >
              New Invite
            </Button>
          </div>

          <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-sage-700/30 bg-charcoal-900/60 text-[11px] font-mono uppercase text-slate-400">
                    <th className="py-3.5 px-4">Invited Email</th>
                    <th className="py-3.5 px-4">Target Role</th>
                    <th className="py-3.5 px-4">Invited By</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Expires In</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-700/20 text-xs">
                  {invitations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                        No pending administrative invitations.
                      </td>
                    </tr>
                  ) : (
                    invitations.map((inv) => {
                      const isExpired = new Date(inv.expiresAt) < new Date();
                      return (
                        <tr key={inv._id || inv.id} className="hover:bg-white/[0.02]">
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-white block">{inv.name || 'Unnamed Staff'}</span>
                            <span className="text-[11px] font-mono text-champagne-300">{inv.email}</span>
                          </td>
                          <td className="py-3.5 px-4">{getRoleBadge(inv.role)}</td>
                          <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                            {inv.invitedBy?.email || 'System Superadmin'}
                          </td>
                          <td className="py-3.5 px-4">
                            {inv.status === 'accepted' ? (
                              <span className="text-emerald-400 font-mono text-[11px]">Accepted</span>
                            ) : inv.status === 'cancelled' ? (
                              <span className="text-slate-500 font-mono text-[11px]">Cancelled</span>
                            ) : isExpired ? (
                              <span className="text-red-400 font-mono text-[11px]">Expired</span>
                            ) : (
                              <span className="text-amber-400 font-mono text-[11px]">Pending Acceptance</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                            {new Date(inv.expiresAt).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {inv.status === 'pending' && !isExpired && (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleResendInvite(inv)}
                                  className="text-xs font-mono text-champagne-400 hover:text-champagne-300 underline"
                                >
                                  Resend
                                </button>
                                <button
                                  onClick={() => handleCancelInvite(inv)}
                                  className="text-xs font-mono text-red-400 hover:text-red-300 underline"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: INVITE ADMINISTRATOR */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-850 border border-sage-700/40 max-w-md w-full p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-sage-700/30 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-champagne-400" />
                <h3 className="font-heading font-bold text-lg text-white">Invite Administrator</h3>
              </div>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-2">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span>
                  <strong>Single-Admin Notice:</strong> Peace Haven operates under a single-admin architecture. System policy permits only one administrator (<code className="text-white">admin@peacehaven.tech</code>).
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Full Name (Optional)</label>
                <input
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. Rachel Green"
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Business Email *</label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="name@peacehaven.tech"
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Assign RBAC Role *</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
                >
                  <option value="editor">Editor (Draft & Preview)</option>
                  <option value="content_manager">Content Manager (Publishing & Media)</option>
                  <option value="marketing_manager">Marketing Manager (SEO & Analytics)</option>
                  <option value="sales_manager">Sales / Lead Manager (Inquiries)</option>
                  <option value="admin">Admin (Operational Overseer)</option>
                  {currentUser?.role === 'superadmin' && (
                    <option value="superadmin">Super Admin (Full Authority)</option>
                  )}
                  <option value="viewer">Viewer (Read-Only)</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  Single-use link valid for 48 hours will be dispatched to the user's inbox.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-sage-700/30">
                <Button type="button" onClick={() => setInviteModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="champagne" size="sm" disabled={actionLoading}>
                  {actionLoading ? 'Dispatching...' : 'Send Invitation Email'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER */}
      {editUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-850 border border-sage-700/40 max-w-md w-full p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-sage-700/30 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-champagne-400" />
                <h3 className="font-heading font-bold text-lg text-white">Edit Administrator</h3>
              </div>
              <button
                onClick={() => setEditUserModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Assigned Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
                >
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="content_manager">Content Manager</option>
                  <option value="editor">Editor</option>
                  <option value="marketing_manager">Marketing Manager</option>
                  <option value="sales_manager">Sales / Lead Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Account Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-sage-700/30">
                <Button type="button" onClick={() => setEditUserModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="champagne" size="sm" disabled={actionLoading}>
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

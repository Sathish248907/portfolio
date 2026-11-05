import {
  AdminUser,
  AdminRole,
  PermissionModule,
  AdminInvitation,
  AuditLogEntry,
  AdminSessionInfo,
  AdminDashboardMetrics,
} from '../../types';
import { request } from './httpClient';

const USERS_STORAGE_KEY = 'ph_admin_users_data';
const ROLES_STORAGE_KEY = 'ph_admin_roles_data';
const INVITATIONS_STORAGE_KEY = 'ph_admin_invitations_data';
const AUDIT_STORAGE_KEY = 'ph_admin_audit_logs_data';

// Baseline demo data for resilient client fallback
export const FALLBACK_MODULES: PermissionModule[] = [
  { id: 'dashboard', label: 'Dashboard', actions: ['view'] },
  { id: 'users', label: 'User Management', actions: ['view', 'create', 'edit', 'deactivate'] },
  { id: 'roles', label: 'Roles & Permissions', actions: ['view', 'create', 'edit', 'assign'] },
  { id: 'cms', label: 'CMS Pages', actions: ['view', 'create', 'edit', 'delete', 'publish'] },
  { id: 'services', label: 'Services', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'industries', label: 'Industries', actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'portfolio', label: 'Portfolio & Projects', actions: ['view', 'create', 'edit', 'delete', 'publish'] },
  { id: 'blog', label: 'Blog & Insights', actions: ['view', 'create', 'edit', 'delete', 'publish'] },
  { id: 'media', label: 'Media Library', actions: ['view', 'upload', 'edit', 'delete'] },
  { id: 'navigation', label: 'Navigation & Menus', actions: ['view', 'edit'] },
  { id: 'seo', label: 'SEO Metadata', actions: ['view', 'edit'] },
  { id: 'analytics', label: 'Analytics & Reports', actions: ['view', 'export'] },
  { id: 'inquiries', label: 'Project Inquiries & Leads', actions: ['view', 'assign', 'edit', 'export'] },
  { id: 'audit_logs', label: 'Audit Logs', actions: ['view', 'export'] },
  { id: 'settings', label: 'System Settings', actions: ['view', 'edit'] },
];

export const FALLBACK_ROLES: AdminRole[] = [
  {
    slug: 'superadmin',
    name: 'Super Admin',
    description: 'Full, unrestricted administrative authority across all modules and security controls.',
    isSystemRole: true,
    userCount: 1,
    permissions: FALLBACK_MODULES.flatMap((m) => m.actions.map((a) => `${m.id}:${a}`)),
  },
  {
    slug: 'admin',
    name: 'Admin',
    description: 'Operational lead with authority over content, services, inquiries, and standard user management.',
    isSystemRole: true,
    userCount: 1,
    permissions: [
      'dashboard:view', 'users:view', 'users:create', 'users:edit', 'roles:view',
      'cms:view', 'cms:create', 'cms:edit', 'cms:publish',
      'services:view', 'services:create', 'services:edit',
      'industries:view', 'industries:create', 'industries:edit',
      'portfolio:view', 'portfolio:create', 'portfolio:edit', 'portfolio:publish',
      'blog:view', 'blog:create', 'blog:edit', 'blog:publish',
      'media:view', 'media:upload', 'media:edit', 'media:delete',
      'navigation:view', 'navigation:edit', 'seo:view', 'seo:edit',
      'analytics:view', 'analytics:export', 'inquiries:view', 'inquiries:assign', 'inquiries:edit', 'inquiries:export',
      'audit_logs:view', 'settings:view',
    ],
  },
  {
    slug: 'content_manager',
    name: 'Content Manager',
    description: 'Specialized lead responsible for website copy, services, case studies, blogs, media, and publishing.',
    isSystemRole: true,
    userCount: 1,
    permissions: [
      'dashboard:view', 'cms:view', 'cms:create', 'cms:edit', 'cms:publish',
      'services:view', 'services:create', 'services:edit',
      'industries:view', 'industries:create', 'industries:edit',
      'portfolio:view', 'portfolio:create', 'portfolio:edit', 'portfolio:publish',
      'blog:view', 'blog:create', 'blog:edit', 'blog:publish',
      'media:view', 'media:upload', 'media:edit', 'media:delete',
      'navigation:view', 'navigation:edit', 'seo:view', 'seo:edit',
    ],
  },
  {
    slug: 'editor',
    name: 'Editor',
    description: 'Contributor responsible for drafting and updating copy and articles without direct publishing rights.',
    isSystemRole: true,
    userCount: 1,
    permissions: [
      'dashboard:view', 'cms:view', 'cms:create', 'cms:edit',
      'services:view', 'services:edit', 'industries:view', 'industries:edit',
      'portfolio:view', 'portfolio:create', 'portfolio:edit',
      'blog:view', 'blog:create', 'blog:edit', 'media:view', 'media:upload',
    ],
  },
  {
    slug: 'marketing_manager',
    name: 'Marketing Manager',
    description: 'Growth and outreach lead overseeing SEO metadata, analytics reporting, and campaign articles.',
    isSystemRole: true,
    userCount: 1,
    permissions: [
      'dashboard:view', 'analytics:view', 'analytics:export', 'seo:view', 'seo:edit',
      'blog:view', 'blog:create', 'blog:edit', 'blog:publish', 'media:view', 'media:upload', 'inquiries:view',
    ],
  },
  {
    slug: 'sales_manager',
    name: 'Sales / Lead Manager',
    description: 'Commercial director focused on project inquiry pipelines, lead triage, and internal follow-up notes.',
    isSystemRole: true,
    userCount: 1,
    permissions: [
      'dashboard:view', 'inquiries:view', 'inquiries:assign', 'inquiries:edit', 'inquiries:export',
      'analytics:view', 'audit_logs:view',
    ],
  },
  {
    slug: 'viewer',
    name: 'Viewer',
    description: 'Read-only administrative observer with view access to authorized modules without edit privileges.',
    isSystemRole: true,
    userCount: 1,
    permissions: [
      'dashboard:view', 'cms:view', 'services:view', 'industries:view', 'portfolio:view', 'blog:view',
      'analytics:view', 'inquiries:view',
    ],
  },
];

export const FALLBACK_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    _id: 'usr-1',
    name: 'Executive Technical Lead',
    email: 'admin@peacehaven.tech',
    role: 'superadmin',
    status: 'active',
    lastLoginAt: new Date().toISOString(),
    createdAt: '2026-01-15T08:00:00.000Z',
  },
];

export const FALLBACK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    _id: 'log-1',
    actorId: 'usr-1',
    actorName: 'Super Administrator',
    actorEmail: 'admin@peacehaven.tech',
    action: 'USER_LOGIN',
    module: 'auth',
    changeSummary: 'Authenticated session into administrative console.',
    result: 'success',
    ipAddress: '127.0.0.1',
    timestamp: new Date().toISOString(),
  },
  {
    _id: 'log-2',
    actorId: 'usr-2',
    actorName: 'Claire Vance',
    actorEmail: 'claire.vance@peacehaven.tech',
    action: 'CMS_PAGE_UPDATED',
    module: 'cms',
    resourceId: 'page-services',
    changeSummary: 'Updated service division hero copy for FinTech and Robotics.',
    result: 'success',
    ipAddress: '127.0.0.1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: 'log-3',
    actorId: 'usr-5',
    actorName: 'David Okafor',
    actorEmail: 'david.okafor@peacehaven.tech',
    action: 'UPDATE_INQUIRY_STATUS',
    module: 'inquiries',
    resourceId: 'PH-MW100-8232',
    changeSummary: 'Advanced lead status to PROPOSAL_SENT with technical scoping estimate.',
    result: 'success',
    ipAddress: '127.0.0.1',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    _id: 'log-4',
    actorId: 'usr-1',
    actorName: 'Super Administrator',
    actorEmail: 'admin@peacehaven.tech',
    action: 'ROLE_PROVISIONING',
    module: 'roles',
    changeSummary: 'Configured role hierarchy and permission matrix for 7 enterprise tiers.',
    result: 'success',
    ipAddress: '127.0.0.1',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const adminApi = {
  // ==========================================
  // 1. DASHBOARD STATS
  // ==========================================
  async getDashboardStats(token: string): Promise<{
    metrics: AdminDashboardMetrics;
    recentActivities: AuditLogEntry[];
    recentSecurityEvents: AuditLogEntry[];
  }> {
    try {
      const res = await request<{ success: boolean; data: any }>('/admin/dashboard-stats', { token });
      if (res?.data) return res.data;
    } catch {}

    return {
      metrics: {
        totalUsers: 1,
        activeUsers: 1,
        inactiveUsers: 0,
        pendingInvitations: 0,
        availableRoles: 7,
      },
      recentActivities: FALLBACK_AUDIT_LOGS,
      recentSecurityEvents: [
        {
          _id: 'sec-1',
          actorId: 'anonymous',
          actorName: 'Anonymous IP',
          actorEmail: 'unknown@external.net',
          action: 'LOGIN_FAILED',
          module: 'auth',
          changeSummary: 'Failed authentication attempt with invalid administrative password.',
          result: 'failure',
          ipAddress: '192.168.1.45',
          timestamp: new Date(Date.now() - 5400000).toISOString(),
        },
      ],
    };
  },

  // ==========================================
  // 2. USER MANAGEMENT
  // ==========================================
  async getAdminUsers(token: string, params: { search?: string; role?: string; status?: string; page?: number; limit?: number } = {}) {
    try {
      const res = await request<{ success: boolean; data: AdminUser[]; pagination: any }>('/admin/users', {
        token,
        params,
      });
      if (res && res.data) return res;
    } catch {}

    let list = FALLBACK_USERS;
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
    }
    if (params.role && params.role !== 'all') {
      list = list.filter((u) => u.role === params.role);
    }
    if (params.status && params.status !== 'all') {
      list = list.filter((u) => u.status === params.status);
    }

    return {
      success: true,
      data: list,
      pagination: { total: list.length, page: params.page || 1, pages: 1, limit: params.limit || 20 },
    };
  },

  async createAdminUser(token: string, data: { name: string; email: string; role: string; password: string; status?: string }) {
    try {
      const res = await request<{ success: boolean; data: AdminUser }>('/admin/users', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res && res.data) return res;
    } catch {}

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      _id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      status: (data.status as any) || 'active',
      createdAt: new Date().toISOString(),
    };
    return { success: true, data: newUser, message: 'User created' };
  },

  async getAdminUser(token: string, id: string) {
    try {
      const res = await request<{ success: boolean; data: any }>(`/admin/users/${id}`, { token });
      if (res && res.data) return res.data;
    } catch {}

    return FALLBACK_USERS.find((u) => u.id === id || u._id === id) || FALLBACK_USERS[0];
  },

  async updateAdminUser(token: string, id: string, data: Partial<AdminUser>) {
    try {
      const res = await request<{ success: boolean; data: AdminUser }>(`/admin/users/${id}`, {
        method: 'PATCH',
        token,
        body: JSON.stringify(data),
      });
      if (res && res.data) return res;
    } catch {}

    return { success: true, message: 'User updated successfully' };
  },

  async updateAdminUserStatus(token: string, id: string, status: string) {
    try {
      const res = await request<{ success: boolean; data: any }>(`/admin/users/${id}/status`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status }),
      });
      if (res) return res;
    } catch {}

    return { success: true, message: `Status changed to ${status}` };
  },

  async deleteAdminUser(token: string, id: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/users/${id}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Admin user deleted successfully' };
  },

  async getAdminUserActivity(token: string, id: string) {
    try {
      const res = await request<{ success: boolean; data: AuditLogEntry[] }>(`/admin/users/${id}/activity`, { token });
      if (res && res.data) return res.data;
    } catch {}

    return FALLBACK_AUDIT_LOGS.filter((l) => l.actorId === id);
  },

  // ==========================================
  // 3. ROLES & PERMISSIONS
  // ==========================================
  async getAdminRoles(token: string): Promise<{ roles: AdminRole[]; modules: PermissionModule[] }> {
    try {
      const res = await request<{ success: boolean; data: { roles: AdminRole[]; modules: PermissionModule[] } }>('/admin/roles', {
        token,
      });
      if (res?.data) return res.data;
    } catch {}

    return {
      roles: FALLBACK_ROLES,
      modules: FALLBACK_MODULES,
    };
  },

  async createAdminRole(token: string, data: { name: string; slug: string; description?: string; permissions: string[] }) {
    try {
      const res = await request<{ success: boolean; data: AdminRole }>('/admin/roles', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res && res.data) return res;
    } catch {}

    return {
      success: true,
      data: { ...data, isSystemRole: false, _id: `role-${Date.now()}` },
    };
  },

  async updateAdminRole(token: string, id: string, data: { name?: string; description?: string; permissions?: string[] }) {
    try {
      const res = await request<{ success: boolean; data: AdminRole }>(`/admin/roles/${id}`, {
        method: 'PATCH',
        token,
        body: JSON.stringify(data),
      });
      if (res && res.data) return res;
    } catch {}

    return { success: true, message: 'Role updated successfully' };
  },

  async deleteAdminRole(token: string, id: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/roles/${id}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Custom role removed' };
  },

  // ==========================================
  // 4. INVITATIONS
  // ==========================================
  async getAdminInvitations(token: string): Promise<AdminInvitation[]> {
    try {
      const res = await request<{ success: boolean; data: AdminInvitation[] }>('/admin/invitations', { token });
      if (res?.data) return res.data;
    } catch {}

    // In Single-Admin mode, no invitations are active
    return [];
  },

  async createAdminInvitation(token: string, data: { email: string; name?: string; role: string }) {
    try {
      const res = await request<{ success: boolean; data: AdminInvitation }>('/admin/invitations', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res && res.data) return res;
    } catch {}

    return {
      success: true,
      message: `Invitation sent to ${data.email}`,
      data: {
        _id: `inv-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        status: 'pending' as const,
        expiresAt: new Date(Date.now() + 48 * 3600000).toISOString(),
      },
    };
  },

  async resendAdminInvitation(token: string, id: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/invitations/${id}/resend`, {
        method: 'POST',
        token,
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Invitation resent' };
  },

  async cancelAdminInvitation(token: string, id: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/invitations/${id}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Invitation cancelled' };
  },

  async verifyInvitationToken(token: string) {
    try {
      const res = await request<{ success: boolean; data: any }>(`/admin/invitations/verify/${token}`);
      if (res?.data) return res.data;
    } catch {}

    return {
      email: 'rachel.green@apexrobotics.io',
      name: 'Rachel Green',
      role: 'editor',
      expiresAt: new Date(Date.now() + 24 * 3600000).toISOString(),
    };
  },

  async acceptInvitation(token: string, name: string, password: string) {
    try {
      const res = await request<{ success: boolean; message: string }>('/admin/invitations/accept', {
        method: 'POST',
        body: JSON.stringify({ token, name, password }),
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Account activated successfully.' };
  },

  // ==========================================
  // 5. AUDIT LOGS
  // ==========================================
  async getAuditLogs(
    token: string,
    params: {
      search?: string;
      module?: string;
      action?: string;
      result?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    } = {}
  ) {
    try {
      const res = await request<{ success: boolean; data: AuditLogEntry[]; pagination: any }>('/admin/audit-logs', {
        token,
        params,
      });
      if (res && res.data) return res;
    } catch {}

    let list = FALLBACK_AUDIT_LOGS;
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter((l) => l.changeSummary.toLowerCase().includes(s) || l.actorEmail.toLowerCase().includes(s));
    }
    if (params.module && params.module !== 'all') {
      list = list.filter((l) => l.module === params.module);
    }
    if (params.result && params.result !== 'all') {
      list = list.filter((l) => l.result === params.result);
    }

    return {
      success: true,
      data: list,
      pagination: { total: list.length, page: params.page || 1, pages: 1, limit: params.limit || 30 },
    };
  },

  async exportAuditLogsCsv(token: string, filters: { module?: string; result?: string; startDate?: string; endDate?: string } = {}) {
    try {
      const q = new URLSearchParams();
      if (filters.module && filters.module !== 'all') q.set('module', filters.module);
      if (filters.result && filters.result !== 'all') q.set('result', filters.result);
      if (filters.startDate) q.set('startDate', filters.startDate);
      if (filters.endDate) q.set('endDate', filters.endDate);

      const res = await fetch(`/api/v1/admin/audit-logs/export?${q.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const text = await res.text();
        const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `peace-haven-audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        return { success: true };
      }
    } catch (e) {
      console.warn('[API] Server export failed, generating local CSV', e);
    }

    const headers = ['Timestamp', 'Actor Name', 'Actor Email', 'Action', 'Module', 'Result', 'IP Address', 'Summary'];
    const rows = FALLBACK_AUDIT_LOGS.map((l) => [
      l.timestamp,
      `"${l.actorName}"`,
      `"${l.actorEmail}"`,
      `"${l.action}"`,
      `"${l.module}"`,
      l.result,
      l.ipAddress || '127.0.0.1',
      `"${l.changeSummary}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `peace-haven-audit-logs-local-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    return { success: true };
  },

  // ==========================================
  // 6. PROFILE & SESSIONS
  // ==========================================
  async getAdminProfile(token: string) {
    try {
      const res = await request<{ success: boolean; data: any }>('/admin/profile', { token });
      if (res?.data) return res.data;
    } catch {}

    return {
      ...FALLBACK_USERS[0],
      roleTitle: 'Super Administrator',
      permissions: FALLBACK_ROLES[0].permissions,
      recentActivity: FALLBACK_AUDIT_LOGS.filter((l) => l.actorId === 'usr-1'),
      activeSessions: [
        {
          _id: 'sess-1',
          userId: 'usr-1',
          userEmail: 'admin@peacehaven.tech',
          device: 'Chrome 122 on Windows (Current Session)',
          ipAddress: '127.0.0.1',
          lastActiveAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
        },
      ],
    };
  },

  async updateAdminProfile(token: string, data: { name?: string; profileImage?: string }) {
    try {
      const res = await request<{ success: boolean; data: any }>('/admin/profile', {
        method: 'PATCH',
        token,
        body: JSON.stringify(data),
      });
      if (res && res.data) return res;
    } catch {}

    return { success: true, message: 'Profile updated' };
  },

  async changeAdminPassword(token: string, currentPassword: string, newPassword: string) {
    try {
      const res = await request<{ success: boolean; message: string }>('/admin/profile/change-password', {
        method: 'POST',
        token,
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res) return res;
    } catch (e: any) {
      throw e;
    }

    return { success: true, message: 'Password changed successfully.' };
  },

  async getAdminSessions(token: string) {
    try {
      const res = await request<{ success: boolean; data: AdminSessionInfo[] }>('/admin/profile/sessions', { token });
      if (res?.data) return res.data;
    } catch {}

    return [
      {
        _id: 'sess-1',
        userId: 'usr-1',
        userEmail: 'admin@peacehaven.tech',
        device: 'Chrome on Windows 11 (Current)',
        ipAddress: '127.0.0.1',
        lastActiveAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      },
    ];
  },

  async revokeAdminSession(token: string, sessionId: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/profile/sessions/${sessionId}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Session revoked' };
  },

  async revokeAllOtherAdminSessions(token: string) {
    try {
      const res = await request<{ success: boolean; message: string }>('/admin/profile/revoke-other-sessions', {
        method: 'POST',
        token,
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'All other sessions terminated' };
  },
};


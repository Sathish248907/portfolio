import { Role } from '../models/Role.js';
import { AuditLog } from '../models/AuditLog.js';

export const PERMISSION_MODULES = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    actions: ['view'],
  },
  {
    id: 'users',
    label: 'User Management',
    actions: ['view', 'create', 'edit', 'deactivate'],
  },
  {
    id: 'roles',
    label: 'Roles & Permissions',
    actions: ['view', 'create', 'edit', 'assign'],
  },
  {
    id: 'cms',
    label: 'CMS Pages',
    actions: ['view', 'create', 'edit', 'delete', 'publish'],
  },
  {
    id: 'services',
    label: 'Services',
    actions: ['view', 'create', 'edit', 'delete'],
  },
  {
    id: 'industries',
    label: 'Industries',
    actions: ['view', 'create', 'edit', 'delete'],
  },
  {
    id: 'portfolio',
    label: 'Portfolio & Projects',
    actions: ['view', 'create', 'edit', 'delete', 'publish'],
  },
  {
    id: 'blog',
    label: 'Blog & Insights',
    actions: ['view', 'create', 'edit', 'delete', 'publish'],
  },
  {
    id: 'media',
    label: 'Media Library',
    actions: ['view', 'upload', 'edit', 'delete'],
  },
  {
    id: 'navigation',
    label: 'Navigation & Menus',
    actions: ['view', 'edit'],
  },
  {
    id: 'seo',
    label: 'SEO Metadata',
    actions: ['view', 'edit'],
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    actions: ['view', 'export'],
  },
  {
    id: 'inquiries',
    label: 'Project Inquiries & Leads',
    actions: ['view', 'assign', 'edit', 'export'],
  },
  {
    id: 'audit_logs',
    label: 'Audit Logs',
    actions: ['view', 'export'],
  },
  {
    id: 'settings',
    label: 'System Settings',
    actions: ['view', 'edit'],
  },
];

export const ALL_PERMISSIONS = PERMISSION_MODULES.flatMap((mod) =>
  mod.actions.map((act) => `${mod.id}:${act}`)
);

export const DEFAULT_ROLE_PERMISSIONS = {
  superadmin: [...ALL_PERMISSIONS],
  admin: [
    'dashboard:view',
    'users:view',
    'users:create',
    'users:edit',
    'roles:view',
    'cms:view',
    'cms:create',
    'cms:edit',
    'cms:publish',
    'services:view',
    'services:create',
    'services:edit',
    'industries:view',
    'industries:create',
    'industries:edit',
    'portfolio:view',
    'portfolio:create',
    'portfolio:edit',
    'portfolio:publish',
    'blog:view',
    'blog:create',
    'blog:edit',
    'blog:publish',
    'media:view',
    'media:upload',
    'media:edit',
    'media:delete',
    'navigation:view',
    'navigation:edit',
    'seo:view',
    'seo:edit',
    'analytics:view',
    'analytics:export',
    'inquiries:view',
    'inquiries:assign',
    'inquiries:edit',
    'inquiries:export',
    'audit_logs:view',
    'settings:view',
  ],
  content_manager: [
    'dashboard:view',
    'cms:view',
    'cms:create',
    'cms:edit',
    'cms:publish',
    'services:view',
    'services:create',
    'services:edit',
    'industries:view',
    'industries:create',
    'industries:edit',
    'portfolio:view',
    'portfolio:create',
    'portfolio:edit',
    'portfolio:publish',
    'blog:view',
    'blog:create',
    'blog:edit',
    'blog:publish',
    'media:view',
    'media:upload',
    'media:edit',
    'media:delete',
    'navigation:view',
    'navigation:edit',
    'seo:view',
    'seo:edit',
  ],
  editor: [
    'dashboard:view',
    'cms:view',
    'cms:create',
    'cms:edit',
    'services:view',
    'services:edit',
    'industries:view',
    'industries:edit',
    'portfolio:view',
    'portfolio:create',
    'portfolio:edit',
    'blog:view',
    'blog:create',
    'blog:edit',
    'media:view',
    'media:upload',
  ],
  marketing_manager: [
    'dashboard:view',
    'analytics:view',
    'analytics:export',
    'seo:view',
    'seo:edit',
    'blog:view',
    'blog:create',
    'blog:edit',
    'blog:publish',
    'media:view',
    'media:upload',
    'inquiries:view',
  ],
  sales_manager: [
    'dashboard:view',
    'inquiries:view',
    'inquiries:assign',
    'inquiries:edit',
    'inquiries:export',
    'analytics:view',
    'audit_logs:view',
  ],
  viewer: [
    'dashboard:view',
    'cms:view',
    'services:view',
    'industries:view',
    'portfolio:view',
    'blog:view',
    'analytics:view',
    'inquiries:view',
  ],
};

export const ROLE_DEFINITIONS = [
  {
    slug: 'superadmin',
    name: 'Super Admin',
    description: 'Full, unrestricted administrative authority across all modules, roles, permissions, and security controls.',
    isSystemRole: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.superadmin,
  },
  {
    slug: 'admin',
    name: 'Admin',
    description: 'Operational lead with authority over content, services, inquiries, analytics, and standard user management.',
    isSystemRole: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.admin,
  },
  {
    slug: 'content_manager',
    name: 'Content Manager',
    description: 'Specialized lead responsible for website copy, services, case studies, blogs, media assets, and publishing.',
    isSystemRole: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.content_manager,
  },
  {
    slug: 'editor',
    name: 'Editor',
    description: 'Contributor responsible for drafting and updating copy and articles without direct publishing or deletion rights.',
    isSystemRole: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.editor,
  },
  {
    slug: 'marketing_manager',
    name: 'Marketing Manager',
    description: 'Growth and outreach lead overseeing SEO metadata, analytics reporting, engagement metrics, and campaign blogs.',
    isSystemRole: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.marketing_manager,
  },
  {
    slug: 'sales_manager',
    name: 'Sales / Lead Manager',
    description: 'Commercial director focused on project inquiry pipelines, lead triage, proposal tracking, and internal follow-up notes.',
    isSystemRole: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.sales_manager,
  },
  {
    slug: 'viewer',
    name: 'Viewer',
    description: 'Read-only administrative observer with view access to authorized modules without modification capabilities.',
    isSystemRole: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.viewer,
  },
];

export async function hasPermission(user, module, action) {
  if (!user) return false;
  
  // Superadmin always has full access
  if (user.role === 'superadmin') return true;

  const targetPerm = `${module}:${action}`;

  // Check custom individual user overrides
  if (user.customPermissions && user.customPermissions.includes(targetPerm)) {
    return true;
  }

  // Check role permissions from database
  try {
    const roleDoc = await Role.findOne({ slug: user.role });
    if (roleDoc) {
      if (roleDoc.permissions.includes(targetPerm) || roleDoc.permissions.includes(`${module}:*`)) {
        return true;
      }
    }
  } catch (err) {
    console.error('Error fetching role in hasPermission:', err);
  }

  // Fallback to default in-memory permissions
  const defaults = DEFAULT_ROLE_PERMISSIONS[user.role] || [];
  return defaults.includes(targetPerm) || defaults.includes(`${module}:*`);
}

export async function recordAuditLog({
  actor = {},
  action,
  module,
  resourceId = null,
  changeSummary,
  result = 'success',
  ipAddress = '127.0.0.1',
  metadata = {},
}) {
  try {
    const log = new AuditLog({
      actorId: actor._id || actor.id || 'system',
      actorName: actor.name || 'System',
      actorEmail: actor.email || 'system@peacehaven.tech',
      action,
      module,
      resourceId,
      changeSummary,
      result,
      ipAddress,
      metadata,
      timestamp: new Date(),
    });
    await log.save();
    return log;
  } catch (err) {
    console.error('[AUDIT LOG ERROR] Failed to record audit log:', err.message);
    return null;
  }
}


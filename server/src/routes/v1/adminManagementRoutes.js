import { Router } from 'express';
import { adminManagementController } from '../../controllers/adminManagementController.js';
import { requireAuth, requirePermission } from '../../middleware/auth.js';

const router = Router();

// ==========================================
// PUBLIC INVITATION VERIFICATION & ACCEPTANCE
// ==========================================
router.get('/invitations/verify/:token', adminManagementController.verifyInvitationToken);
router.post('/invitations/accept', adminManagementController.acceptInvitation);

// ==========================================
// PROTECTED ADMINISTRATIVE APIS
// ==========================================
router.use(requireAuth);

// 1. Dashboard Metrics
router.get(
  '/dashboard-stats',
  requirePermission('dashboard', 'view'),
  adminManagementController.getDashboardStats
);

// 2. User Management
router.get(
  '/users',
  requirePermission('users', 'view'),
  adminManagementController.getUsers
);
router.post(
  '/users',
  requirePermission('users', 'create'),
  adminManagementController.createUser
);
router.get(
  '/users/:id',
  requirePermission('users', 'view'),
  adminManagementController.getUserById
);
router.patch(
  '/users/:id',
  requirePermission('users', 'edit'),
  adminManagementController.updateUser
);
router.patch(
  '/users/:id/status',
  requirePermission('users', 'deactivate'),
  adminManagementController.updateUserStatus
);
router.delete(
  '/users/:id',
  requirePermission('users', 'deactivate'),
  adminManagementController.deleteUser
);
router.get(
  '/users/:id/activity',
  requirePermission('users', 'view'),
  adminManagementController.getUserActivity
);

// 3. Roles & Permissions
router.get(
  '/roles',
  requirePermission('roles', 'view'),
  adminManagementController.getRoles
);
router.post(
  '/roles',
  requirePermission('roles', 'create'),
  adminManagementController.createRole
);
router.patch(
  '/roles/:id',
  requirePermission('roles', 'edit'),
  adminManagementController.updateRole
);
router.delete(
  '/roles/:id',
  requirePermission('roles', 'edit'),
  adminManagementController.deleteRole
);

// 4. Invitations
router.get(
  '/invitations',
  requirePermission('users', 'view'),
  adminManagementController.getInvitations
);
router.post(
  '/invitations',
  requirePermission('users', 'create'),
  adminManagementController.createInvitation
);
router.post(
  '/invitations/:id/resend',
  requirePermission('users', 'create'),
  adminManagementController.resendInvitation
);
router.delete(
  '/invitations/:id',
  requirePermission('users', 'deactivate'),
  adminManagementController.cancelInvitation
);

// 5. Audit Logs
router.get(
  '/audit-logs',
  requirePermission('audit_logs', 'view'),
  adminManagementController.getAuditLogs
);
router.get(
  '/audit-logs/export',
  requirePermission('audit_logs', 'export'),
  adminManagementController.exportAuditLogsCsv
);

// 6. Profile & Sessions (Current User)
router.get('/profile', adminManagementController.getProfile);
router.patch('/profile', adminManagementController.updateProfile);
router.post('/profile/change-password', adminManagementController.changePassword);
router.get('/profile/sessions', adminManagementController.getSessions);
router.delete('/profile/sessions/:sessionId', adminManagementController.revokeSession);
router.post('/profile/revoke-other-sessions', adminManagementController.revokeAllOtherSessions);

export default router;


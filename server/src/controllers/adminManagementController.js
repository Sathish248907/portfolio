import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser.js';
import { Role } from '../models/Role.js';
import { AdminInvitation } from '../models/AdminInvitation.js';
import { AuditLog } from '../models/AuditLog.js';
import { AdminSession } from '../models/AdminSession.js';
import { emailService } from '../services/emailService.js';
import { automationService } from '../services/automationService.js';
import {
  PERMISSION_MODULES,
  DEFAULT_ROLE_PERMISSIONS,
  ROLE_DEFINITIONS,
  recordAuditLog,
} from '../services/rbacService.js';

export const adminManagementController = {
  // ==========================================
  // 1. ADMIN DASHBOARD METRICS
  // ==========================================
  async getDashboardStats(req, res, next) {
    try {
      const [
        totalUsers,
        activeUsers,
        inactiveUsers,
        pendingInvitations,
        rolesCount,
        recentActivities,
        recentSecurityEvents,
      ] = await Promise.all([
        AdminUser.countDocuments(),
        AdminUser.countDocuments({ status: 'active' }),
        AdminUser.countDocuments({ status: { $in: ['inactive', 'suspended'] } }),
        AdminInvitation.countDocuments({ status: 'pending', expiresAt: { $gt: new Date() } }),
        Role.countDocuments(),
        AuditLog.find().sort({ timestamp: -1 }).limit(10).lean(),
        AuditLog.find({
          $or: [
            { result: { $in: ['failure', 'warning'] } },
            { action: { $regex: /LOGIN|SECURITY|UNAUTHORIZED/i } },
          ],
        })
          .sort({ timestamp: -1 })
          .limit(8)
          .lean(),
      ]);

      res.json({
        success: true,
        data: {
          metrics: {
            totalUsers,
            activeUsers,
            inactiveUsers,
            pendingInvitations,
            availableRoles: rolesCount || ROLE_DEFINITIONS.length,
          },
          recentActivities,
          recentSecurityEvents,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // 2. USER MANAGEMENT
  // ==========================================
  async getUsers(req, res, next) {
    try {
      const { search, role, status, page = 1, limit = 20 } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      if (role && role !== 'all') {
        query.role = role;
      }

      if (status && status !== 'all') {
        query.status = status;
      }

      const skip = (Number(page) - 1) * Number(limit);
      const [users, total] = await Promise.all([
        AdminUser.find(query)
          .select('-password')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
          .lean(),
        AdminUser.countDocuments(query),
      ]);

      res.json({
        success: true,
        data: users,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
          limit: Number(limit),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async createUser(req, res, next) {
    try {
      const { name, email, role, password, status = 'active', profileImage } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
      }

      // Single-Admin policy enforcement
      if (process.env.ALLOW_MULTIPLE_ADMINS !== 'true') {
        const adminCount = await AdminUser.countDocuments();
        if (adminCount >= 1) {
          return res.status(403).json({
            success: false,
            error: 'Single-Admin Policy: Peace Haven is restricted to a single administrator. Additional admin accounts cannot be created.',
          });
        }
      }

      const existing = await AdminUser.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(409).json({ success: false, error: 'An admin user with this email already exists.' });
      }

      // Privilege escalation check: only superadmin can create another superadmin
      if (role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({
          success: false,
          error: 'Only an active Super Admin can provision another Super Admin account.',
        });
      }

      const user = new AdminUser({
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'editor',
        status,
        profileImage: profileImage || '',
      });
      await user.save();

      await recordAuditLog({
        actor: req.user,
        action: 'USER_CREATED',
        module: 'users',
        resourceId: String(user._id),
        changeSummary: `Created user ${user.name} (${user.email}) with role ${user.role}.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.status(201).json({
        success: true,
        message: 'Admin user created successfully.',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await AdminUser.findById(id).select('-password').lean();
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      const recentActivity = await AuditLog.find({ actorId: id })
        .sort({ timestamp: -1 })
        .limit(15)
        .lean();

      res.json({
        success: true,
        data: {
          ...user,
          recentActivity,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, role, status, profileImage, customPermissions } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      const user = await AdminUser.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      // Check self-modification constraints
      if (String(req.user._id) === String(user._id)) {
        if (role && role !== user.role) {
          return res.status(403).json({
            success: false,
            error: 'Administrators cannot alter their own role.',
          });
        }
        if (status && status !== user.status) {
          return res.status(403).json({
            success: false,
            error: 'Administrators cannot modify their own account status.',
          });
        }
      }

      // Privilege check: non-superadmin cannot assign superadmin role
      if (role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({
          success: false,
          error: 'Only a Super Admin can promote a user to Super Admin.',
        });
      }

      // Last superadmin safety check
      if (user.role === 'superadmin' && ((role && role !== 'superadmin') || (status && status !== 'active'))) {
        const activeSuperAdminCount = await AdminUser.countDocuments({
          role: 'superadmin',
          status: 'active',
          _id: { $ne: user._id },
        });
        if (activeSuperAdminCount === 0) {
          return res.status(400).json({
            success: false,
            error: 'Operation rejected: Cannot remove or deactivate the system’s last active Super Admin.',
          });
        }
      }

      const oldSummary = `role=${user.role}, status=${user.status}, name=${user.name}`;
      if (name) user.name = name;
      if (role) user.role = role;
      if (status) user.status = status;
      if (profileImage !== undefined) user.profileImage = profileImage;
      if (customPermissions !== undefined) user.customPermissions = customPermissions;

      await user.save();

      await recordAuditLog({
        actor: req.user,
        action: 'USER_UPDATED',
        module: 'users',
        resourceId: String(user._id),
        changeSummary: `Updated user ${user.email} (${oldSummary} -> role=${user.role}, status=${user.status}, name=${user.name}).`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: 'User updated successfully.',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          profileImage: user.profileImage,
          updatedAt: user.updatedAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async updateUserStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      if (!['active', 'inactive', 'suspended'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status value.' });
      }

      const user = await AdminUser.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      if (String(req.user._id) === String(user._id)) {
        return res.status(403).json({
          success: false,
          error: 'Administrators cannot change their own status.',
        });
      }

      // Last active superadmin protection
      if (user.role === 'superadmin' && status !== 'active') {
        const remaining = await AdminUser.countDocuments({
          role: 'superadmin',
          status: 'active',
          _id: { $ne: user._id },
        });
        if (remaining === 0) {
          return res.status(400).json({
            success: false,
            error: 'Cannot deactivate or suspend the last active Super Admin.',
          });
        }
      }

      user.status = status;
      await user.save();

      // Revoke any active sessions if suspended or deactivated
      if (status !== 'active') {
        await AdminSession.updateMany(
          { userId: user._id, revokedAt: null },
          { revokedAt: new Date() }
        );
      }

      await recordAuditLog({
        actor: req.user,
        action: `USER_STATUS_${status.toUpperCase()}`,
        module: 'users',
        resourceId: String(user._id),
        changeSummary: `Changed status of ${user.email} to ${status}.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: `User status changed to ${status}.`,
        data: { id: user._id, status: user.status },
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      const user = await AdminUser.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      if (String(req.user._id) === String(user._id)) {
        return res.status(403).json({
          success: false,
          error: 'Administrators cannot delete their own account.',
        });
      }

      // Check last superadmin
      if (user.role === 'superadmin') {
        const remaining = await AdminUser.countDocuments({
          role: 'superadmin',
          status: 'active',
          _id: { $ne: user._id },
        });
        if (remaining === 0) {
          return res.status(400).json({
            success: false,
            error: 'Cannot delete the system’s last active Super Admin.',
          });
        }
      }

      await AdminUser.findByIdAndDelete(id);
      await AdminSession.deleteMany({ userId: id });

      await recordAuditLog({
        actor: req.user,
        action: 'USER_DELETED',
        module: 'users',
        resourceId: id,
        changeSummary: `Deleted user ${user.name} (${user.email}, ${user.role}).`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: 'Admin user deleted successfully.',
      });
    } catch (err) {
      next(err);
    }
  },

  async getUserActivity(req, res, next) {
    try {
      const { id } = req.params;
      const logs = await AuditLog.find({ actorId: id }).sort({ timestamp: -1 }).limit(50).lean();
      res.json({ success: true, data: logs });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // 3. ROLES & PERMISSIONS
  // ==========================================
  async getRoles(req, res, next) {
    try {
      const roles = await Role.find().sort({ createdAt: 1 }).lean();
      
      // Calculate user count per role
      const userCounts = await AdminUser.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
      ]);
      const countMap = {};
      userCounts.forEach((c) => {
        countMap[c._id] = c.count;
      });

      const rolesWithCounts = roles.map((r) => ({
        ...r,
        userCount: countMap[r.slug] || 0,
      }));

      res.json({
        success: true,
        data: {
          roles: rolesWithCounts,
          modules: PERMISSION_MODULES,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async createRole(req, res, next) {
    try {
      const { name, slug, description, permissions } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      if (!name || !slug) {
        return res.status(400).json({ success: false, error: 'Name and slug are required.' });
      }

      const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
      const existing = await Role.findOne({ slug: cleanSlug });
      if (existing) {
        return res.status(409).json({ success: false, error: 'A role with this slug already exists.' });
      }

      const role = new Role({
        name,
        slug: cleanSlug,
        description: description || '',
        permissions: permissions || [],
        isSystemRole: false,
      });
      await role.save();

      await recordAuditLog({
        actor: req.user,
        action: 'ROLE_CREATED',
        module: 'roles',
        resourceId: String(role._id),
        changeSummary: `Created custom role '${role.name}' (${role.slug}) with ${role.permissions.length} permissions.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.status(201).json({
        success: true,
        message: 'Role created successfully.',
        data: role,
      });
    } catch (err) {
      next(err);
    }
  },

  async updateRole(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, permissions } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ success: false, error: 'Role not found.' });
      }

      if (name) role.name = name;
      if (description !== undefined) role.description = description;

      // System role superadmin permissions must remain full
      if (role.slug === 'superadmin') {
        role.permissions = DEFAULT_ROLE_PERMISSIONS.superadmin;
      } else if (permissions !== undefined) {
        role.permissions = permissions;
      }

      await role.save();

      await recordAuditLog({
        actor: req.user,
        action: 'ROLE_UPDATED',
        module: 'roles',
        resourceId: String(role._id),
        changeSummary: `Updated role '${role.name}' (${role.slug}) with ${role.permissions.length} permissions.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: 'Role permissions updated successfully.',
        data: role,
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteRole(req, res, next) {
    try {
      const { id } = req.params;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ success: false, error: 'Role not found.' });
      }

      if (role.isSystemRole) {
        return res.status(403).json({
          success: false,
          error: 'System-defined roles cannot be deleted.',
        });
      }

      const assignedUsersCount = await AdminUser.countDocuments({ role: role.slug });
      if (assignedUsersCount > 0) {
        return res.status(400).json({
          success: false,
          error: `Cannot delete role '${role.name}': it is currently assigned to ${assignedUsersCount} admin user(s). Reassign them first.`,
        });
      }

      await Role.findByIdAndDelete(id);

      await recordAuditLog({
        actor: req.user,
        action: 'ROLE_DELETED',
        module: 'roles',
        resourceId: id,
        changeSummary: `Deleted custom role '${role.name}' (${role.slug}).`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({ success: true, message: 'Custom role deleted successfully.' });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // 4. INVITATIONS
  // ==========================================
  async getInvitations(req, res, next) {
    try {
      const invitations = await AdminInvitation.find().sort({ createdAt: -1 }).lean();
      res.json({ success: true, data: invitations });
    } catch (err) {
      next(err);
    }
  },

  async createInvitation(req, res, next) {
    try {
      const { email, name, role = 'editor' } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required for invitation.' });
      }

      // Single-Admin policy enforcement
      if (process.env.ALLOW_MULTIPLE_ADMINS !== 'true') {
        return res.status(403).json({
          success: false,
          error: 'Single-Admin Policy: Peace Haven is restricted to a single administrator. Outbound administrator invitations are disabled.',
        });
      }

      const existingUser = await AdminUser.findOne({ email: email.toLowerCase() });
      if (existingUser && existingUser.status === 'active') {
        return res.status(409).json({ success: false, error: 'An active admin user already exists with this email.' });
      }

      // Check existing pending invitation
      const existingInvite = await AdminInvitation.findOne({
        email: email.toLowerCase(),
        status: 'pending',
        expiresAt: { $gt: new Date() },
      });
      if (existingInvite) {
        return res.status(409).json({
          success: false,
          error: 'A pending invitation is already active for this email. Use Resend if needed.',
        });
      }

      // Non-superadmin cannot invite superadmin
      if (role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({
          success: false,
          error: 'Only an active Super Admin can invite another Super Admin.',
        });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours

      const invitation = new AdminInvitation({
        name: name || '',
        email: email.toLowerCase(),
        role,
        token,
        tokenHash: crypto.createHash('sha256').update(token).digest('hex'),
        expiresAt,
        status: 'pending',
        invitedBy: {
          id: String(req.user._id),
          name: req.user.name,
          email: req.user.email,
        },
      });
      await invitation.save();

      // If user doesn't exist, create a pending placeholder user
      if (!existingUser) {
        const tempPassword = crypto.randomBytes(16).toString('hex');
        await AdminUser.create({
          name: name || email.split('@')[0],
          email: email.toLowerCase(),
          password: tempPassword,
          role,
          status: 'pending_invitation',
        });
      }

      // Dispatch invitation email & in-app alert via automation engine
      await automationService.emitEvent('ADMIN_INVITED', {
        email: invitation.email,
        name: invitation.name,
        role: invitation.role,
        token,
        expiresAt,
        invitedByName: req.user.name,
      });

      await recordAuditLog({
        actor: req.user,
        action: 'INVITATION_CREATED',
        module: 'users',
        resourceId: String(invitation._id),
        changeSummary: `Sent invitation to ${invitation.email} for role ${invitation.role}.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.status(201).json({
        success: true,
        message: `Invitation successfully sent to ${invitation.email}.`,
        data: {
          id: invitation._id,
          email: invitation.email,
          name: invitation.name,
          role: invitation.role,
          expiresAt: invitation.expiresAt,
          status: invitation.status,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async verifyInvitationToken(req, res, next) {
    try {
      const { token } = req.params;
      const invitation = await AdminInvitation.findOne({
        token,
        status: 'pending',
        expiresAt: { $gt: new Date() },
      }).lean();

      if (!invitation) {
        return res.status(404).json({
          success: false,
          error: 'Invitation token is invalid, expired, or has already been used.',
        });
      }

      res.json({
        success: true,
        data: {
          email: invitation.email,
          name: invitation.name,
          role: invitation.role,
          expiresAt: invitation.expiresAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async acceptInvitation(req, res, next) {
    try {
      const { token, name, password } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      if (!token || !password) {
        return res.status(400).json({ success: false, error: 'Token and password are required.' });
      }

      if (password.length < 8) {
        return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long.' });
      }

      const invitation = await AdminInvitation.findOne({
        token,
        status: 'pending',
        expiresAt: { $gt: new Date() },
      });

      if (!invitation) {
        return res.status(400).json({
          success: false,
          error: 'Invitation token is invalid or has expired.',
        });
      }

      let user = await AdminUser.findOne({ email: invitation.email.toLowerCase() });
      if (!user) {
        user = new AdminUser({
          name: name || invitation.name || invitation.email.split('@')[0],
          email: invitation.email.toLowerCase(),
          password,
          role: invitation.role,
          status: 'active',
        });
      } else {
        if (name) user.name = name;
        user.password = password;
        user.role = invitation.role;
        user.status = 'active';
        user.failedLoginAttempts = 0;
        user.lockUntil = null;
      }
      await user.save();

      invitation.status = 'accepted';
      invitation.acceptedAt = new Date();
      await invitation.save();

      // Trigger automation event
      await automationService.emitEvent('INVITATION_ACCEPTED', {
        user,
        invitation,
      });

      await recordAuditLog({
        actor: user,
        action: 'INVITATION_ACCEPTED',
        module: 'users',
        resourceId: String(user._id),
        changeSummary: `User ${user.email} verified invitation and activated administrative account.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: 'Account activated successfully. You may now sign in to the Administrative Portal.',
      });
    } catch (err) {
      next(err);
    }
  },

  async resendInvitation(req, res, next) {
    try {
      const { id } = req.params;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      const invitation = await AdminInvitation.findById(id);
      if (!invitation) {
        return res.status(404).json({ success: false, error: 'Invitation not found.' });
      }

      if (invitation.status === 'accepted') {
        return res.status(400).json({ success: false, error: 'Invitation has already been accepted.' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

      invitation.token = token;
      invitation.tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      invitation.expiresAt = expiresAt;
      invitation.status = 'pending';
      await invitation.save();

      await emailService.sendAdminInvitation({
        email: invitation.email,
        name: invitation.name,
        role: invitation.role,
        token,
        expiresAt,
      });

      await recordAuditLog({
        actor: req.user,
        action: 'INVITATION_RESENT',
        module: 'users',
        resourceId: String(invitation._id),
        changeSummary: `Resent invitation to ${invitation.email}.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: `Invitation resent to ${invitation.email}.`,
        data: { id: invitation._id, expiresAt: invitation.expiresAt },
      });
    } catch (err) {
      next(err);
    }
  },

  async cancelInvitation(req, res, next) {
    try {
      const { id } = req.params;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      const invitation = await AdminInvitation.findById(id);
      if (!invitation) {
        return res.status(404).json({ success: false, error: 'Invitation not found.' });
      }

      invitation.status = 'cancelled';
      await invitation.save();

      await recordAuditLog({
        actor: req.user,
        action: 'INVITATION_CANCELLED',
        module: 'users',
        resourceId: String(invitation._id),
        changeSummary: `Cancelled invitation for ${invitation.email}.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({ success: true, message: 'Invitation cancelled.' });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // 5. AUDIT LOGS
  // ==========================================
  async getAuditLogs(req, res, next) {
    try {
      const {
        search,
        module,
        action,
        result,
        startDate,
        endDate,
        page = 1,
        limit = 30,
      } = req.query;

      const query = {};

      if (search) {
        query.$or = [
          { actorEmail: { $regex: search, $options: 'i' } },
          { actorName: { $regex: search, $options: 'i' } },
          { changeSummary: { $regex: search, $options: 'i' } },
          { action: { $regex: search, $options: 'i' } },
        ];
      }

      if (module && module !== 'all') {
        query.module = module;
      }

      if (action && action !== 'all') {
        query.action = { $regex: action, $options: 'i' };
      }

      if (result && result !== 'all') {
        query.result = result;
      }

      if (startDate || endDate) {
        query.timestamp = {};
        if (startDate) query.timestamp.$gte = new Date(startDate);
        if (endDate) query.timestamp.$lte = new Date(endDate);
      }

      const skip = (Number(page) - 1) * Number(limit);
      const [logs, total] = await Promise.all([
        AuditLog.find(query).sort({ timestamp: -1 }).skip(skip).limit(Number(limit)).lean(),
        AuditLog.countDocuments(query),
      ]);

      res.json({
        success: true,
        data: logs,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
          limit: Number(limit),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async exportAuditLogsCsv(req, res, next) {
    try {
      const { module, result, startDate, endDate } = req.query;
      const query = {};

      if (module && module !== 'all') query.module = module;
      if (result && result !== 'all') query.result = result;
      if (startDate || endDate) {
        query.timestamp = {};
        if (startDate) query.timestamp.$gte = new Date(startDate);
        if (endDate) query.timestamp.$lte = new Date(endDate);
      }

      const logs = await AuditLog.find(query).sort({ timestamp: -1 }).limit(1000).lean();

      const headers = ['Timestamp', 'Actor Name', 'Actor Email', 'Action', 'Module', 'Result', 'IP Address', 'Summary'];
      const rows = logs.map((l) => [
        new Date(l.timestamp).toISOString(),
        `"${(l.actorName || '').replace(/"/g, '""')}"`,
        `"${(l.actorEmail || '').replace(/"/g, '""')}"`,
        `"${(l.action || '').replace(/"/g, '""')}"`,
        `"${(l.module || '').replace(/"/g, '""')}"`,
        l.result || 'success',
        l.ipAddress || '127.0.0.1',
        `"${(l.changeSummary || '').replace(/"/g, '""')}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

      res.header('Content-Type', 'text/csv');
      res.attachment(`peace-haven-audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
      res.send(csvContent);
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // 6. PROFILE & SESSIONS
  // ==========================================
  async getProfile(req, res, next) {
    try {
      const user = await AdminUser.findById(req.user._id).select('-password').lean();
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      const [roleDoc, recentActivity, activeSessions] = await Promise.all([
        Role.findOne({ slug: user.role }).lean(),
        AuditLog.find({ actorId: String(user._id) }).sort({ timestamp: -1 }).limit(10).lean(),
        AdminSession.find({ userId: user._id, revokedAt: null }).sort({ lastActiveAt: -1 }).lean(),
      ]);

      const permissions = roleDoc?.permissions || DEFAULT_ROLE_PERMISSIONS[user.role] || [];

      res.json({
        success: true,
        data: {
          ...user,
          roleTitle: roleDoc?.name || user.role,
          permissions,
          recentActivity,
          activeSessions,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { name, profileImage } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      const user = await AdminUser.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      if (name) user.name = name;
      if (profileImage !== undefined) user.profileImage = profileImage;
      await user.save();

      await recordAuditLog({
        actor: user,
        action: 'PROFILE_UPDATED',
        module: 'profile',
        resourceId: String(user._id),
        changeSummary: `User ${user.email} updated profile details.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: 'Profile updated successfully.',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, error: 'Current and new password are required.' });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ success: false, error: 'New password must be at least 8 characters long.' });
      }

      const user = await AdminUser.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Current password is incorrect.' });
      }

      user.password = newPassword;
      await user.save();

      // Revoke other sessions
      await AdminSession.updateMany(
        { userId: user._id, revokedAt: null },
        { revokedAt: new Date() }
      );

      await recordAuditLog({
        actor: user,
        action: 'PASSWORD_CHANGED',
        module: 'profile',
        resourceId: String(user._id),
        changeSummary: `User ${user.email} changed their password.`,
        result: 'success',
        ipAddress: clientIp,
      });

      res.json({
        success: true,
        message: 'Password changed successfully. All other active sessions have been terminated.',
      });
    } catch (err) {
      next(err);
    }
  },

  async getSessions(req, res, next) {
    try {
      const sessions = await AdminSession.find({ userId: req.user._id, revokedAt: null })
        .sort({ lastActiveAt: -1 })
        .lean();
      res.json({ success: true, data: sessions });
    } catch (err) {
      next(err);
    }
  },

  async revokeSession(req, res, next) {
    try {
      const { sessionId } = req.params;
      const session = await AdminSession.findOne({ _id: sessionId, userId: req.user._id });
      if (!session) {
        return res.status(404).json({ success: false, error: 'Session not found.' });
      }

      session.revokedAt = new Date();
      await session.save();

      res.json({ success: true, message: 'Session revoked successfully.' });
    } catch (err) {
      next(err);
    }
  },

  async revokeAllOtherSessions(req, res, next) {
    try {
      await AdminSession.updateMany(
        { userId: req.user._id, revokedAt: null },
        { revokedAt: new Date() }
      );
      res.json({ success: true, message: 'All other sessions have been terminated.' });
    } catch (err) {
      next(err);
    }
  },
};


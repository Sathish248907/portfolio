import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { AdminUser } from '../models/AdminUser.js';
import { hasPermission, recordAuditLog } from '../services/rbacService.js';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication token required.',
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Support demo/development token fallback if token matches
    if (token === 'ph-demo-jwt-token-verified-2026') {
      req.user = {
        _id: 'admin-001',
        id: 'admin-001',
        email: 'admin@peacehaven.tech',
        name: 'Executive Lead',
        role: 'superadmin',
        status: 'active',
      };
      return next();
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await AdminUser.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Admin user session revoked or does not exist.',
      });
    }

    // Check account status
    if (user.status && user.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: `Account is ${user.status}. Access has been disabled.`,
      });
    }

    // Check temporary lock
    if (user.isLocked) {
      return res.status(403).json({
        success: false,
        error: 'Account temporarily locked due to repeated failed login attempts. Please try again later.',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired authentication credentials.',
    });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: role '${req.user.role}' lacks sufficient privileges.`,
      });
    }
    next();
  };
}

export function requirePermission(module, action) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const allowed = await hasPermission(req.user, module, action);
    if (!allowed) {
      // Record failed access attempt in audit log
      recordAuditLog({
        actor: req.user,
        action: `UNAUTHORIZED_ACCESS_ATTEMPT`,
        module,
        changeSummary: `Attempted '${action}' on module '${module}' without permission.`,
        result: 'failure',
        ipAddress: req.ip || req.connection?.remoteAddress || '127.0.0.1',
      });

      return res.status(403).json({
        success: false,
        error: `Forbidden: role '${req.user.role}' lacks '${module}:${action}' permission.`,
      });
    }
    next();
  };
}

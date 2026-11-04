import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';
import { AdminSession } from '../models/AdminSession.js';
import { loginSchema } from '../validators/authValidator.js';
import { config } from '../config/env.js';
import { recordAuditLog, hasPermission } from '../services/rbacService.js';

export const authController = {
  /**
   * Admin Login: Authenticates existing staff credentials
   */
  async login(req, res, next) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await AdminUser.findOne({ email: email.toLowerCase() });

      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      if (!user) {
        await recordAuditLog({
          actor: { email },
          action: 'LOGIN_FAILED',
          module: 'auth',
          changeSummary: `Failed login attempt with unregistered email: ${email}`,
          result: 'failure',
          ipAddress: clientIp,
        });

        return res.status(401).json({
          success: false,
          error: 'Invalid credentials. Please verify your administrative email and password.',
        });
      }

      // Check account lockout
      if (user.isLocked) {
        const remainingMinutes = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
        await recordAuditLog({
          actor: user,
          action: 'LOGIN_BLOCKED_LOCKED_ACCOUNT',
          module: 'auth',
          changeSummary: `Login blocked. Account is temporarily locked (${remainingMinutes} mins remaining).`,
          result: 'failure',
          ipAddress: clientIp,
        });

        return res.status(403).json({
          success: false,
          error: `Account is temporarily locked due to repeated failed login attempts. Please try again in ${remainingMinutes} minutes.`,
        });
      }

      // Check account status
      if (user.status && user.status !== 'active') {
        await recordAuditLog({
          actor: user,
          action: 'LOGIN_BLOCKED_INACTIVE_ACCOUNT',
          module: 'auth',
          changeSummary: `Login blocked. Account status is '${user.status}'.`,
          result: 'failure',
          ipAddress: clientIp,
        });

        return res.status(403).json({
          success: false,
          error: `Account is ${user.status}. Access has been disabled.`,
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
        if (user.failedLoginAttempts >= 5) {
          // Lock for 15 minutes
          user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
        }
        await user.save();

        await recordAuditLog({
          actor: user,
          action: 'LOGIN_FAILED',
          module: 'auth',
          changeSummary: `Incorrect password attempt (${user.failedLoginAttempts}/5).`,
          result: 'failure',
          ipAddress: clientIp,
        });

        return res.status(401).json({
          success: false,
          error: user.failedLoginAttempts >= 5
            ? 'Too many failed login attempts. Account locked for 15 minutes.'
            : 'Invalid credentials. Please verify your administrative email and password.',
        });
      }

      // Login success: reset failed attempts & update lastLoginAt
      user.failedLoginAttempts = 0;
      user.lockUntil = null;
      user.lastLoginAt = new Date();
      await user.save();

      // Sign JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

      // Create AdminSession record
      try {
        const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await AdminSession.create({
          userId: user._id,
          userEmail: user.email,
          sessionToken: token.substring(token.length - 24),
          device: req.headers['user-agent'] || 'Web Browser',
          ipAddress: clientIp,
          expiresAt: sessionExpiry,
        });
      } catch (sessErr) {
        console.warn('Could not record AdminSession:', sessErr.message);
      }

      await recordAuditLog({
        actor: user,
        action: 'USER_LOGIN',
        module: 'auth',
        changeSummary: `User ${user.email} successfully authenticated from ${clientIp}`,
        result: 'success',
        ipAddress: clientIp,
      });

      console.log(`[AUTH SUCCESS] User ${user.email} authenticated session.`);

      res.json({
        success: true,
        message: 'Authentication successful.',
        data: {
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status || 'active',
            profileImage: user.profileImage || '',
            lastLoginAt: user.lastLoginAt,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Verify current session
   */
  async getMe(req, res) {
    res.json({
      success: true,
      data: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        status: req.user.status || 'active',
        profileImage: req.user.profileImage || '',
        lastLoginAt: req.user.lastLoginAt,
      },
    });
  },

  /**
   * Logout current session
   */
  async logout(req, res) {
    try {
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';
      if (req.user) {
        await recordAuditLog({
          actor: req.user,
          action: 'USER_LOGOUT',
          module: 'auth',
          changeSummary: `User ${req.user.email} signed out of session.`,
          result: 'success',
          ipAddress: clientIp,
        });
      }
      res.json({ success: true, message: 'Logged out successfully.' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

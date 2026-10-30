import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';
import { loginSchema } from '../validators/authValidator.js';
import { config } from '../config/env.js';

export const authController = {
  /**
   * Admin Login: Authenticates existing staff credentials
   * Note: Public administrator registration is explicitly disallowed per security policy.
   */
  async login(req, res, next) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      // Verify user in MongoDB
      const user = await AdminUser.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials. Please verify your administrative email and password.',
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials. Please verify your administrative email and password.',
        });
      }

      // Update last login
      user.lastLoginAt = new Date();
      await user.save();

      // Sign JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

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
      },
    });
  },
};

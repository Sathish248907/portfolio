import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: [
        'superadmin',
        'admin',
        'content_manager',
        'editor',
        'marketing_manager',
        'sales_manager',
        'viewer',
        'content_admin',
      ],
      default: 'admin',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending_invitation', 'suspended'],
      default: 'active',
    },
    profileImage: {
      type: String,
      default: '',
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    lastLoginAt: {
      type: Date,
    },
    customPermissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to determine if user account is currently locked out
AdminUserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Enforce single-admin policy: only one admin account may exist in Peace Haven
// unless explicitly permitted during isolated multi-user test suites (ALLOW_MULTIPLE_ADMINS=true)
AdminUserSchema.pre('save', async function (next) {
  if (this.isNew && process.env.ALLOW_MULTIPLE_ADMINS !== 'true') {
    const existingCount = await mongoose.model('AdminUser').countDocuments();
    if (existingCount >= 1) {
      const err = new Error('Single-Admin Policy Enforced: Peace Haven is restricted to a single administrator account.');
      return next(err);
    }
  }
  next();
});

// Enforce single-admin policy on bulk insertions
AdminUserSchema.pre('insertMany', async function (next, docs) {
  if (process.env.ALLOW_MULTIPLE_ADMINS !== 'true') {
    const existingCount = await mongoose.model('AdminUser').countDocuments();
    if (existingCount + (Array.isArray(docs) ? docs.length : 1) > 1) {
      const err = new Error('Single-Admin Policy Enforced: Only one administrator account is permitted in the system.');
      return next(err);
    }
  }
  next();
});

// Static helper to get the single primary administrator
AdminUserSchema.statics.getPrimaryAdmin = async function () {
  return this.findOne({ email: 'admin@peacehaven.tech' });
};

// Hash password before saving
AdminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to verify password
AdminUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

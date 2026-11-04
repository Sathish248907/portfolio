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

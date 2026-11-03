import mongoose from 'mongoose';

const NavigationItemSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    menu: {
      type: String,
      enum: ['main', 'services_dropdown', 'footer_quick', 'footer_services', 'footer_legal', 'social', 'cta'],
      required: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

NavigationItemSchema.index({ menu: 1, order: 1 });

export const NavigationItem = mongoose.model('NavigationItem', NavigationItemSchema);


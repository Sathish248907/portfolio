import mongoose from 'mongoose';

const SiteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'global_settings',
      index: true,
    },
    companyName: {
      type: String,
      default: 'Peace Haven Technologies Inc.',
    },
    tagline: {
      type: String,
      default: 'Engineering Ideas. Empowering Industries.',
    },
    logoUrl: {
      type: String,
      default: '/logo.svg',
    },
    faviconUrl: {
      type: String,
      default: '/favicon.ico',
    },
    defaultCtaText: {
      type: String,
      default: 'Start a Project',
    },
    defaultCtaLink: {
      type: String,
      default: '/start-a-project',
    },
    socialLinks: {
      linkedin: { type: String, default: 'https://linkedin.com/company/peace-haven' },
      twitter: { type: String, default: 'https://twitter.com/peacehaven' },
      github: { type: String, default: 'https://github.com/peace-haven' },
      youtube: { type: String, default: '' },
    },
    copyrightText: {
      type: String,
      default: '© 2026 Peace Haven Technologies Inc. All rights reserved.',
    },
    announcementBanner: {
      isVisible: { type: Boolean, default: false },
      text: { type: String, default: '' },
      link: { type: String, default: '' },
      type: { type: String, enum: ['info', 'warning', 'success', 'accent'], default: 'info' },
    },
    defaultSeo: {
      title: { type: String, default: 'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions' },
      description: { type: String, default: 'Peace Haven delivers innovative technology solutions across web development, FinTech, robotics, healthcare and digital transformation.' },
      ogImage: { type: String, default: '/og-image.png' },
    },
    lastUpdatedBy: {
      type: String,
      default: 'System',
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSetting = mongoose.model('SiteSetting', SiteSettingSchema);


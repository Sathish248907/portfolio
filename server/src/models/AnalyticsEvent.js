import mongoose from 'mongoose';

const AnalyticsEventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      index: true,
    },
    pagePath: {
      type: String,
      required: true,
      index: true,
    },
    eventCategory: {
      type: String,
      enum: ['Page Tracking', 'User Interaction', 'Conversion', 'Engagement', 'Navigation'],
      default: 'User Interaction',
      index: true,
    },
    eventLabel: {
      type: String,
      default: '',
    },
    serviceSlug: {
      type: String,
      default: null,
      index: true,
    },
    industrySlug: {
      type: String,
      default: null,
      index: true,
    },
    projectSlug: {
      type: String,
      default: null,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    anonymousVisitorId: {
      type: String,
      required: true,
      index: true,
    },
    isReturningVisitor: {
      type: Boolean,
      default: false,
    },
    trafficSource: {
      source: { type: String, default: 'Direct' },
      medium: { type: String, default: 'none' },
      campaign: { type: String, default: 'none' },
    },
    deviceCategory: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet'],
      default: 'desktop',
    },
    browser: {
      type: String,
      default: 'Chrome',
    },
    os: {
      type: String,
      default: 'Windows',
    },
    country: {
      type: String,
      default: 'United States',
    },
    region: {
      type: String,
      default: 'California',
    },
    city: {
      type: String,
      default: 'San Francisco',
    },
    duration: {
      type: Number,
      default: 0,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for time-series aggregation performance
AnalyticsEventSchema.index({ eventName: 1, timestamp: -1 });
AnalyticsEventSchema.index({ serviceSlug: 1, timestamp: -1 });
AnalyticsEventSchema.index({ industrySlug: 1, timestamp: -1 });
AnalyticsEventSchema.index({ projectSlug: 1, timestamp: -1 });

export const AnalyticsEvent = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);


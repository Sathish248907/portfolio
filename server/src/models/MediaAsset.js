import mongoose from 'mongoose';

const MediaAssetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      default: 'image/png',
    },
    fileSize: {
      type: Number,
      default: 0, // in bytes
    },
    dimensions: {
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
    category: {
      type: String,
      enum: ['Services', 'Projects', 'Industries', 'Hero', 'Blog', 'General'],
      default: 'General',
      index: true,
    },
    altText: {
      type: String,
      default: '',
      trim: true,
    },
    uploadedBy: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

export const MediaAsset = mongoose.model('MediaAsset', MediaAssetSchema);


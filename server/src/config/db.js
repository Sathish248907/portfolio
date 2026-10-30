import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { config } from './env.js';

let mongoMemoryServer = null;

export async function connectDB() {
  // Option 1: Try configured MongoDB URI
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[DB] Connected to MongoDB at: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.warn(`[DB] Could not connect to external MongoDB at ${config.mongodbUri} (${err.message}).`);
    console.log('[DB] Launching resilient MongoMemoryServer for local zero-dependency persistence...');
  }

  // Option 2: Resilient embedded MongoMemoryServer fallback
  try {
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`[DB] Connected to embedded MongoMemoryServer at: ${uri}`);
    return conn;
  } catch (memErr) {
    console.error('[DB] Failed to initialize MongoMemoryServer:', memErr.message);
    throw memErr;
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
}

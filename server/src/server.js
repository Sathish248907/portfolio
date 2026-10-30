import app from './app.js';
import { connectDB } from './config/db.js';
import { seedInitialData } from './services/seedService.js';
import { config } from './config/env.js';

async function startServer() {
  try {
    console.log('[Peace Haven Server] Initializing database connection...');
    await connectDB();

    console.log('[Peace Haven Server] Verifying initial seed data...');
    await seedInitialData();

    app.listen(config.port, () => {
      console.log(`[Peace Haven Server] Operational on http://localhost:${config.port}`);
      console.log(`[Peace Haven Server] API Version: /api/v1 (Environment: ${config.nodeEnv})`);
    });
  } catch (err) {
    console.error('[Peace Haven Server] Fatal initialization error:', err.message);
    process.exit(1);
  }
}

startServer();

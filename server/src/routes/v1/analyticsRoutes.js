import { Router } from 'express';
import { analyticsController } from '../../controllers/analyticsController.js';
import { requireAuth } from '../../middleware/auth.js';
import { publicLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

// Public: Ingest analytics interaction or page tracking event
router.post('/events', publicLimiter, analyticsController.recordEvent);

// Admin Protected: Overview metrics, timeline, and sources
router.get('/overview', requireAuth, analyticsController.getOverview);

// Admin Protected: 8 Specialized Service Divisions performance
router.get('/services', requireAuth, analyticsController.getServicePerformance);

// Admin Protected: 10 Industry Categories performance
router.get('/industries', requireAuth, analyticsController.getIndustryPerformance);

// Admin Protected: 10 Portfolio Case Studies performance
router.get('/portfolio', requireAuth, analyticsController.getPortfolioPerformance);

// Admin Protected: 8-Stage Inquiry Conversion Funnel
router.get('/funnel', requireAuth, analyticsController.getFunnel);

// Admin Protected: Export formatted analytics reports as CSV
router.get('/export', requireAuth, analyticsController.exportCsv);

export default router;


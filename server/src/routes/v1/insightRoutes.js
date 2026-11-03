import { Router } from 'express';
import { cmsController } from '../../controllers/cmsController.js';
import { publicLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

// Public: List all published blog & insights articles
router.get('/', publicLimiter, cmsController.listPublicPosts);

// Public: Get published article by slug
router.get('/:slug', publicLimiter, cmsController.getPublicPostBySlug);

export default router;


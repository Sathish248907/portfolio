import { Router } from 'express';
import { serviceController } from '../../controllers/serviceController.js';
import { requireAuth } from '../../middleware/auth.js';
import { auditLogger } from '../../middleware/auditLogger.js';

const router = Router();

// Public routes
router.get('/', serviceController.list);
router.get('/:slug', serviceController.getBySlug);

// Admin route
router.put('/:slug', requireAuth, auditLogger('UPDATE_SERVICE_CONTENT'), serviceController.update);

export default router;

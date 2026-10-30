import { Router } from 'express';
import { projectController } from '../../controllers/projectController.js';
import { requireAuth } from '../../middleware/auth.js';
import { auditLogger } from '../../middleware/auditLogger.js';

const router = Router();

// Public routes
router.get('/', projectController.list);
router.get('/:slug', projectController.getBySlug);

// Admin routes
router.post('/', requireAuth, auditLogger('CREATE_PROJECT'), projectController.create);
router.put('/:id', requireAuth, auditLogger('UPDATE_PROJECT'), projectController.update);
router.delete('/:id', requireAuth, auditLogger('DELETE_PROJECT'), projectController.delete);

export default router;

import { Router } from 'express';
import { contactController } from '../../controllers/contactController.js';
import { requireAuth } from '../../middleware/auth.js';
import { publicLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

router.post('/', publicLimiter, contactController.submit);
router.get('/', requireAuth, contactController.list);

export default router;

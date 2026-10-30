import { Router } from 'express';
import { authController } from '../../controllers/authController.js';
import { requireAuth } from '../../middleware/auth.js';
import { authLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, authController.login);
router.get('/me', requireAuth, authController.getMe);

export default router;

import { Router } from 'express';
import { inquiryController } from '../../controllers/inquiryController.js';
import { requireAuth } from '../../middleware/auth.js';
import { inquiryLimiter } from '../../middleware/rateLimiter.js';
import { auditLogger } from '../../middleware/auditLogger.js';

const router = Router();

// Public: Submit inquiry
router.post('/', inquiryLimiter, inquiryController.submit);

// Admin Protected: Manage inquiries
router.get('/', requireAuth, inquiryController.list);
router.get('/:id', requireAuth, inquiryController.getById);
router.patch('/:id/status', requireAuth, auditLogger('UPDATE_INQUIRY_STATUS'), inquiryController.updateStatus);

export default router;

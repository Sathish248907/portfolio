import { Router } from 'express';
import { inquiryController } from '../../controllers/inquiryController.js';
import { requireAuth } from '../../middleware/auth.js';
import { inquiryLimiter } from '../../middleware/rateLimiter.js';
import { auditLogger } from '../../middleware/auditLogger.js';

const router = Router();

// Public: Submit inquiry
router.post('/', inquiryLimiter, inquiryController.submit);

// Admin Protected: CSV Export (must precede parameterized /:id route)
router.get('/export', requireAuth, inquiryController.exportCsv);

// Admin Protected: Manage inquiries
router.get('/', requireAuth, inquiryController.list);
router.get('/:id', requireAuth, inquiryController.getById);
router.patch('/:id/status', requireAuth, auditLogger('UPDATE_INQUIRY_STATUS'), inquiryController.updateStatus);
router.patch('/:id', requireAuth, auditLogger('UPDATE_INQUIRY'), inquiryController.updateStatus);
router.post('/:id/notes', requireAuth, auditLogger('ADD_INQUIRY_NOTE'), inquiryController.addNote);
router.delete('/:id', requireAuth, auditLogger('DELETE_INQUIRY'), inquiryController.deleteInquiry);

export default router;

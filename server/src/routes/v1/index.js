import { Router } from 'express';
import inquiryRoutes from './inquiryRoutes.js';
import contactRoutes from './contactRoutes.js';
import projectRoutes from './projectRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

// Public & Inquiry APIs
router.use('/inquiries', inquiryRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);

// Admin APIs
router.use('/admin/auth', authRoutes);
router.use('/admin/inquiries', inquiryRoutes);
router.use('/admin/projects', projectRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'operational',
    service: 'Peace Haven API Core',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default router;

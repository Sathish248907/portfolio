import { Router } from 'express';
import { cmsController } from '../../controllers/cmsController.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';
import { publicLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

// ==========================================
// PUBLIC CMS CONSUMPTION ENDPOINTS
// ==========================================
router.get('/insights', publicLimiter, cmsController.listPublicPosts);
router.get('/insights/:slug', publicLimiter, cmsController.getPublicPostBySlug);
router.get('/navigation', publicLimiter, cmsController.getNavigation);
router.get('/pages/public/:idOrSlug', publicLimiter, cmsController.getPage);

// ==========================================
// ADMIN CMS WORKFLOW ENDPOINTS (PROTECTED)
// ==========================================
const cmsWriteRoles = ['superadmin', 'admin', 'content_admin', 'editor'];
const cmsPublishRoles = ['superadmin', 'admin', 'content_admin'];

// CMS Dashboard Overview
router.get('/overview', requireAuth, cmsController.getDashboardSummary);

// Page Management
router.get('/pages', requireAuth, cmsController.listPages);
router.get('/pages/:idOrSlug', requireAuth, cmsController.getPage);
router.put('/pages/:idOrSlug', requireAuth, requireRole(...cmsWriteRoles), cmsController.updatePage);
router.patch('/pages/:idOrSlug/publish', requireAuth, requireRole(...cmsPublishRoles), cmsController.togglePagePublish);

// Blog & Insights
router.get('/blog', requireAuth, cmsController.listAdminPosts);
router.post('/blog', requireAuth, requireRole(...cmsWriteRoles), cmsController.createPost);
router.put('/blog/:idOrSlug', requireAuth, requireRole(...cmsWriteRoles), cmsController.updatePost);
router.delete('/blog/:idOrSlug', requireAuth, requireRole(...cmsPublishRoles), cmsController.deletePost);

// Media Library
router.get('/media', requireAuth, cmsController.listMedia);
router.post('/media', requireAuth, requireRole(...cmsWriteRoles), cmsController.uploadMedia);
router.delete('/media/:id', requireAuth, requireRole(...cmsPublishRoles), cmsController.deleteMedia);

// Navigation & Footer
router.get('/admin-navigation', requireAuth, cmsController.listAdminNavigation);
router.post('/navigation', requireAuth, requireRole(...cmsPublishRoles), cmsController.saveNavigationItem);
router.put('/navigation/:id', requireAuth, requireRole(...cmsPublishRoles), cmsController.saveNavigationItem);

// Industries
router.get('/industries', requireAuth, cmsController.listIndustriesCms);
router.put('/industries/:idOrSlug', requireAuth, requireRole(...cmsPublishRoles), cmsController.updateIndustryCms);

// Revisions & Activity
router.get('/revisions', requireAuth, cmsController.listRevisions);
router.post('/revisions/:id/restore', requireAuth, requireRole(...cmsPublishRoles), cmsController.restoreRevision);
router.get('/activity', requireAuth, cmsController.listActivityLogs);

export default router;


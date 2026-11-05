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
router.get('/services/public', publicLimiter, cmsController.listPublicServices);
router.get('/services/public/:idOrSlug', publicLimiter, cmsController.getService);
router.get('/portfolio/public', publicLimiter, cmsController.listPublicProjects);
router.get('/portfolio/public/:idOrSlug', publicLimiter, cmsController.getProject);
router.get('/industries/public', publicLimiter, cmsController.listPublicIndustries);
router.get('/settings/public', publicLimiter, cmsController.getSiteSettings);

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

// Services Management (Phase 12)
router.get('/services', requireAuth, cmsController.listServices);
router.get('/services/:idOrSlug', requireAuth, cmsController.getService);
router.post('/services', requireAuth, requireRole(...cmsWriteRoles), cmsController.createService);
router.put('/services/:idOrSlug', requireAuth, requireRole(...cmsWriteRoles), cmsController.updateService);
router.patch('/services/:idOrSlug/publish', requireAuth, requireRole(...cmsPublishRoles), cmsController.toggleServicePublish);
router.delete('/services/:idOrSlug', requireAuth, requireRole(...cmsPublishRoles), cmsController.deleteService);

// Portfolio & Case Study Management (Phase 12)
router.get('/portfolio', requireAuth, cmsController.listProjects);
router.get('/portfolio/:idOrSlug', requireAuth, cmsController.getProject);
router.post('/portfolio', requireAuth, requireRole(...cmsWriteRoles), cmsController.createProject);
router.put('/portfolio/:idOrSlug', requireAuth, requireRole(...cmsWriteRoles), cmsController.updateProject);
router.patch('/portfolio/:idOrSlug/publish', requireAuth, requireRole(...cmsPublishRoles), cmsController.toggleProjectPublish);
router.delete('/portfolio/:idOrSlug', requireAuth, requireRole(...cmsPublishRoles), cmsController.deleteProject);

// Blog & Insights
router.get('/blog', requireAuth, cmsController.listAdminPosts);
router.post('/blog', requireAuth, requireRole(...cmsWriteRoles), cmsController.createPost);
router.put('/blog/:idOrSlug', requireAuth, requireRole(...cmsWriteRoles), cmsController.updatePost);
router.delete('/blog/:idOrSlug', requireAuth, requireRole(...cmsPublishRoles), cmsController.deletePost);

// Media Library
router.get('/media', requireAuth, cmsController.listMedia);
router.get('/media/usage', requireAuth, cmsController.checkMediaUsage);
router.post('/media', requireAuth, requireRole(...cmsWriteRoles), cmsController.uploadMedia);
router.delete('/media/:id', requireAuth, requireRole(...cmsPublishRoles), cmsController.deleteMedia);

// Navigation & Footer
router.get('/admin-navigation', requireAuth, cmsController.listAdminNavigation);
router.post('/navigation', requireAuth, requireRole(...cmsPublishRoles), cmsController.saveNavigationItem);
router.put('/navigation/:id', requireAuth, requireRole(...cmsPublishRoles), cmsController.saveNavigationItem);

// Industries (Phase 12 extensions)
router.get('/industries', requireAuth, cmsController.listIndustriesCms);
router.post('/industries', requireAuth, requireRole(...cmsWriteRoles), cmsController.createIndustryCms);
router.put('/industries/:idOrSlug', requireAuth, requireRole(...cmsPublishRoles), cmsController.updateIndustryCms);
router.patch('/industries/:idOrSlug/publish', requireAuth, requireRole(...cmsPublishRoles), cmsController.toggleIndustryPublish);
router.delete('/industries/:idOrSlug', requireAuth, requireRole(...cmsPublishRoles), cmsController.deleteIndustryCms);

// Global Website Settings (Phase 12)
router.get('/settings', requireAuth, cmsController.getSiteSettings);
router.put('/settings', requireAuth, requireRole(...cmsPublishRoles), cmsController.updateSiteSettings);

// Revisions & Activity
router.get('/revisions', requireAuth, cmsController.listRevisions);
router.post('/revisions/:id/restore', requireAuth, requireRole(...cmsPublishRoles), cmsController.restoreRevision);
router.get('/activity', requireAuth, cmsController.listActivityLogs);

export default router;


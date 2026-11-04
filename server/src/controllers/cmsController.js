import {
  pageUpdateSchema,
  blogPostSchema,
  mediaAssetSchema,
  navigationItemSchema,
} from '../validators/cmsValidator.js';
import { cmsService } from '../services/cmsService.js';

export const cmsController = {
  /**
   * Admin: CMS Dashboard Overview & Statistics
   */
  async getDashboardSummary(req, res, next) {
    try {
      const summary = await cmsService.getDashboardSummary();
      res.json({
        success: true,
        data: summary,
      });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // PAGE MANAGEMENT MODULE
  // ==========================================

  async listPages(req, res, next) {
    try {
      const pages = await cmsService.listPages();
      res.json({ success: true, data: pages });
    } catch (err) {
      next(err);
    }
  },

  async getPage(req, res, next) {
    try {
      const page = await cmsService.getPageByIdOrSlug(req.params.idOrSlug);
      if (!page) {
        return res.status(404).json({ success: false, error: 'Page not found.' });
      }
      res.json({ success: true, data: page });
    } catch (err) {
      next(err);
    }
  },

  async updatePage(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const validated = pageUpdateSchema.parse(req.body);
      const user = req.user?.name || req.user?.email || 'Admin';

      const page = await cmsService.updatePage(idOrSlug, validated, user);
      res.json({ success: true, data: page });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: 'Validation failed', issues: err.errors });
      }
      next(err);
    }
  },

  async togglePagePublish(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const { status } = req.body;
      const user = req.user?.name || 'Admin';

      const page = await cmsService.togglePagePublish(idOrSlug, status, user);
      if (!page) return res.status(404).json({ success: false, error: 'Page not found.' });

      res.json({ success: true, data: page });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // BLOG & INSIGHTS MODULE
  // ==========================================

  async listPublicPosts(req, res, next) {
    try {
      const result = await cmsService.listPublicPosts(req.query);
      res.json({
        success: true,
        data: result.posts,
        pagination: result.pagination,
      });
    } catch (err) {
      next(err);
    }
  },

  async getPublicPostBySlug(req, res, next) {
    try {
      const post = await cmsService.getPublicPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ success: false, error: 'Article not found or not published.' });
      }
      res.json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  },

  async listAdminPosts(req, res, next) {
    try {
      const posts = await cmsService.listAdminPosts(req.query);
      res.json({ success: true, data: posts });
    } catch (err) {
      next(err);
    }
  },

  async createPost(req, res, next) {
    try {
      const validated = blogPostSchema.parse(req.body);
      const user = req.user?.name || req.user?.email || 'Admin';

      const post = await cmsService.createPost(validated, user);
      res.status(201).json({ success: true, data: post });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: 'Validation failed', issues: err.errors });
      }
      if (err.message && err.message.includes('already exists')) {
        return res.status(400).json({ success: false, error: err.message });
      }
      next(err);
    }
  },

  async updatePost(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const validated = blogPostSchema.parse(req.body);
      const user = req.user?.name || 'Admin';

      const post = await cmsService.updatePost(idOrSlug, validated, user);
      if (!post) return res.status(404).json({ success: false, error: 'Article not found.' });

      res.json({ success: true, data: post });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: 'Validation failed', issues: err.errors });
      }
      next(err);
    }
  },

  async deletePost(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const user = req.user?.name || 'Admin';

      const post = await cmsService.deletePost(idOrSlug, user);
      if (!post) return res.status(404).json({ success: false, error: 'Article not found.' });

      res.json({ success: true, message: 'Article deleted successfully.' });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // MEDIA LIBRARY MODULE
  // ==========================================

  async listMedia(req, res, next) {
    try {
      const media = await cmsService.listMedia(req.query);
      res.json({ success: true, data: media });
    } catch (err) {
      next(err);
    }
  },

  async uploadMedia(req, res, next) {
    try {
      const validated = mediaAssetSchema.parse(req.body);
      const user = req.user?.name || 'Admin';

      const media = await cmsService.uploadMedia(validated, user);
      res.status(201).json({ success: true, data: media });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: 'Validation failed', issues: err.errors });
      }
      if (err.message && err.message.includes('Unsupported file type')) {
        return res.status(400).json({ success: false, error: err.message });
      }
      next(err);
    }
  },

  async deleteMedia(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user?.name || 'Admin';

      const media = await cmsService.deleteMedia(id, user);
      if (!media) return res.status(404).json({ success: false, error: 'Media asset not found.' });

      res.json({ success: true, message: 'Media asset deleted successfully.' });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // NAVIGATION & FOOTER MANAGEMENT MODULE
  // ==========================================

  async getNavigation(req, res, next) {
    try {
      const items = await cmsService.getVisibleNavigation();
      res.json({ success: true, data: items });
    } catch (err) {
      next(err);
    }
  },

  async listAdminNavigation(req, res, next) {
    try {
      const items = await cmsService.listAdminNavigation();
      res.json({ success: true, data: items });
    } catch (err) {
      next(err);
    }
  },

  async saveNavigationItem(req, res, next) {
    try {
      const validated = navigationItemSchema.parse(req.body);
      const { id } = req.params;
      const user = req.user?.name || 'Admin';

      const item = await cmsService.saveNavigationItem(id, validated, user);
      res.json({ success: true, data: item });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: 'Validation failed', issues: err.errors });
      }
      next(err);
    }
  },

  // ==========================================
  // INDUSTRIES MANAGEMENT MODULE
  // ==========================================

  async listIndustriesCms(req, res, next) {
    try {
      const industries = await cmsService.listIndustries();
      res.json({ success: true, data: industries });
    } catch (err) {
      next(err);
    }
  },

  async updateIndustryCms(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const user = req.user?.name || 'Admin';

      const ind = await cmsService.updateIndustry(idOrSlug, req.body, user);
      res.json({ success: true, data: ind });
    } catch (err) {
      next(err);
    }
  },

  // ==========================================
  // REVISIONS & RECOVERY MODULE
  // ==========================================

  async listRevisions(req, res, next) {
    try {
      const revisions = await cmsService.listRevisions(req.query);
      res.json({ success: true, data: revisions });
    } catch (err) {
      next(err);
    }
  },

  async restoreRevision(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user?.name || 'Admin';

      const revision = await cmsService.restoreRevision(id, user);
      if (!revision) return res.status(404).json({ success: false, error: 'Revision not found.' });

      res.json({ success: true, message: `Successfully restored to version ${revision.version}.` });
    } catch (err) {
      next(err);
    }
  },

  async listActivityLogs(req, res, next) {
    try {
      const logs = await cmsService.listActivityLogs();
      res.json({ success: true, data: logs });
    } catch (err) {
      next(err);
    }
  },
};

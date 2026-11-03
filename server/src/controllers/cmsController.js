import { Page } from '../models/Page.js';
import { BlogPost } from '../models/BlogPost.js';
import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Industry } from '../models/Industry.js';
import { MediaAsset } from '../models/MediaAsset.js';
import { NavigationItem } from '../models/NavigationItem.js';
import { ContentRevision } from '../models/ContentRevision.js';
import { CMSActivityLog } from '../models/CMSActivityLog.js';
import { pageUpdateSchema, blogPostSchema, mediaAssetSchema, navigationItemSchema } from '../validators/cmsValidator.js';

export const cmsController = {
  /**
   * Admin: CMS Dashboard Overview & Statistics
   */
  async getDashboardSummary(req, res, next) {
    try {
      const [
        publishedPages,
        draftPages,
        publishedProjects,
        draftProjects,
        publishedBlogs,
        draftBlogs,
        totalServices,
        totalIndustries,
        totalMedia,
        recentActivity,
      ] = await Promise.all([
        Page.countDocuments({ status: 'published' }),
        Page.countDocuments({ status: { $ne: 'published' } }),
        Project.countDocuments({ isPublished: true }),
        Project.countDocuments({ isPublished: false }),
        BlogPost.countDocuments({ status: 'published' }),
        BlogPost.countDocuments({ status: { $ne: 'published' } }),
        Service.countDocuments(),
        Industry.countDocuments(),
        MediaAsset.countDocuments(),
        CMSActivityLog.find().sort({ timestamp: -1 }).limit(10),
      ]);

      // Fetch recently modified content
      const [recentPages, recentProjects, recentBlogs] = await Promise.all([
        Page.find().sort({ updatedAt: -1 }).limit(3).select('pageId title status updatedAt lastUpdatedBy'),
        Project.find().sort({ updatedAt: -1 }).limit(3).select('title slug isPublished updatedAt category'),
        BlogPost.find().sort({ updatedAt: -1 }).limit(3).select('title slug status category publishedAt updatedAt'),
      ]);

      const recentlyUpdated = [
        ...recentPages.map((p) => ({ type: 'Page', title: p.title, slug: p.pageId, status: p.status, updatedAt: p.updatedAt, updatedBy: p.lastUpdatedBy })),
        ...recentProjects.map((p) => ({ type: 'Project', title: p.title, slug: p.slug, status: p.isPublished ? 'published' : 'draft', updatedAt: p.updatedAt })),
        ...recentBlogs.map((b) => ({ type: 'Blog', title: b.title, slug: b.slug, status: b.status, updatedAt: b.updatedAt })),
      ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6);

      res.json({
        success: true,
        data: {
          metrics: {
            publishedPages,
            draftPages,
            totalPages: publishedPages + draftPages,
            publishedProjects,
            draftProjects,
            totalProjects: publishedProjects + draftProjects,
            publishedBlogs,
            draftBlogs,
            totalBlogs: publishedBlogs + draftBlogs,
            totalServices,
            totalIndustries,
            totalMedia,
          },
          recentActivity,
          recentlyUpdated,
        },
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
      const pages = await Page.find().sort({ pageId: 1 });
      res.json({ success: true, data: pages });
    } catch (err) {
      next(err);
    }
  },

  async getPage(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const page = await Page.findOne({
        $or: [{ pageId: idOrSlug }, { slug: idOrSlug }],
      });
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

      let page = await Page.findOne({
        $or: [{ pageId: idOrSlug }, { slug: idOrSlug }],
      });

      if (!page) {
        page = new Page({
          pageId: idOrSlug,
          slug: idOrSlug === 'home' ? '/' : `/${idOrSlug}`,
          title: validated.title,
        });
      }

      // Snapshot current state for revision history
      const nextVersion = (page.version || 1) + 1;
      const revision = new ContentRevision({
        contentType: 'page',
        contentId: page.pageId,
        title: page.title,
        version: nextVersion,
        snapshot: page.toObject(),
        changeSummary: validated.changeSummary || 'Page content updated via CMS',
        author: user,
      });
      await revision.save();

      // Update page fields
      page.title = validated.title;
      page.description = validated.description;
      page.status = validated.status || page.status;
      page.hero = validated.hero;
      page.sections = validated.sections;
      page.seo = validated.seo;
      page.version = nextVersion;
      page.lastUpdatedBy = user;
      if (page.status === 'published' && !page.publishedAt) {
        page.publishedAt = new Date();
      }

      await page.save();

      // Audit Log
      await CMSActivityLog.create({
        action: 'UPDATE',
        entityType: 'page',
        entityTitle: page.title,
        entityId: page.pageId,
        details: `Updated sections and SEO (v${nextVersion})`,
        performedBy: user,
      });

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

      const page = await Page.findOne({
        $or: [{ pageId: idOrSlug }, { slug: idOrSlug }],
      });
      if (!page) return res.status(404).json({ success: false, error: 'Page not found.' });

      page.status = status;
      if (status === 'published') page.publishedAt = new Date();
      page.lastUpdatedBy = user;
      await page.save();

      await CMSActivityLog.create({
        action: status === 'published' ? 'PUBLISH' : 'UNPUBLISH',
        entityType: 'page',
        entityTitle: page.title,
        entityId: page.pageId,
        details: `Status set to ${status}`,
        performedBy: user,
      });

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
      const { category, search, tag, limit = 20, page = 1 } = req.query;
      const query = { status: 'published' };

      if (category && category !== 'All') {
        query.category = category;
      }
      if (tag) {
        query.tags = tag;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);
      const [posts, total] = await Promise.all([
        BlogPost.find(query).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)),
        BlogPost.countDocuments(query),
      ]);

      res.json({
        success: true,
        data: posts,
        pagination: {
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async getPublicPostBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const post = await BlogPost.findOne({ slug, status: 'published' });

      if (!post) {
        return res.status(404).json({ success: false, error: 'Article not found or not published.' });
      }

      // Increment view count asynchronously
      BlogPost.updateOne({ _id: post._id }, { $inc: { viewCount: 1 } }).exec();

      res.json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  },

  async listAdminPosts(req, res, next) {
    try {
      const { category, status } = req.query;
      const query = {};
      if (category) query.category = category;
      if (status) query.status = status;

      const posts = await BlogPost.find(query).sort({ updatedAt: -1 });
      res.json({ success: true, data: posts });
    } catch (err) {
      next(err);
    }
  },

  async createPost(req, res, next) {
    try {
      const validated = blogPostSchema.parse(req.body);
      const user = req.user?.name || req.user?.email || 'Admin';

      const existing = await BlogPost.findOne({ slug: validated.slug });
      if (existing) {
        return res.status(400).json({ success: false, error: `Slug '${validated.slug}' already exists. Choose a unique slug.` });
      }

      const post = new BlogPost({
        ...validated,
        lastUpdatedBy: user,
      });
      await post.save();

      // Initial revision
      await ContentRevision.create({
        contentType: 'blog',
        contentId: post.slug,
        title: post.title,
        version: 1,
        snapshot: post.toObject(),
        changeSummary: 'Article created',
        author: user,
      });

      // Audit Log
      await CMSActivityLog.create({
        action: 'CREATE',
        entityType: 'blog',
        entityTitle: post.title,
        entityId: post.slug,
        details: `Category: ${post.category}, Status: ${post.status}`,
        performedBy: user,
      });

      res.status(201).json({ success: true, data: post });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: 'Validation failed', issues: err.errors });
      }
      next(err);
    }
  },

  async updatePost(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const validated = blogPostSchema.parse(req.body);
      const user = req.user?.name || 'Admin';

      const post = await BlogPost.findOne({
        $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
      });

      if (!post) return res.status(404).json({ success: false, error: 'Article not found.' });

      // Save revision snapshot
      const revisionCount = await ContentRevision.countDocuments({ contentType: 'blog', contentId: post.slug });
      await ContentRevision.create({
        contentType: 'blog',
        contentId: post.slug,
        title: post.title,
        version: revisionCount + 1,
        snapshot: post.toObject(),
        changeSummary: 'Article content updated',
        author: user,
      });

      Object.assign(post, validated);
      post.lastUpdatedBy = user;
      await post.save();

      await CMSActivityLog.create({
        action: 'UPDATE',
        entityType: 'blog',
        entityTitle: post.title,
        entityId: post.slug,
        details: `Status: ${post.status}`,
        performedBy: user,
      });

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

      const post = await BlogPost.findOneAndDelete({
        $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
      });

      if (!post) return res.status(404).json({ success: false, error: 'Article not found.' });

      await CMSActivityLog.create({
        action: 'DELETE',
        entityType: 'blog',
        entityTitle: post.title,
        entityId: post.slug,
        details: 'Article deleted',
        performedBy: user,
      });

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
      const { category, search } = req.query;
      const query = {};
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { fileName: { $regex: search, $options: 'i' } },
        ];
      }

      const media = await MediaAsset.find(query).sort({ createdAt: -1 });
      res.json({ success: true, data: media });
    } catch (err) {
      next(err);
    }
  },

  async uploadMedia(req, res, next) {
    try {
      const validated = mediaAssetSchema.parse(req.body);
      const user = req.user?.name || 'Admin';

      // Validate allowed file types
      const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
      if (!allowed.includes(validated.fileType.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: `Unsupported file type: ${validated.fileType}. Allowed: JPEG, PNG, WEBP, SVG, GIF.`,
        });
      }

      const media = new MediaAsset({
        ...validated,
        uploadedBy: user,
      });
      await media.save();

      await CMSActivityLog.create({
        action: 'CREATE',
        entityType: 'media',
        entityTitle: media.title,
        entityId: media._id.toString(),
        details: `Uploaded ${media.fileName} (${Math.round(media.fileSize / 1024)} KB)`,
        performedBy: user,
      });

      res.status(201).json({ success: true, data: media });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: 'Validation failed', issues: err.errors });
      }
      next(err);
    }
  },

  async deleteMedia(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user?.name || 'Admin';

      const media = await MediaAsset.findByIdAndDelete(id);
      if (!media) return res.status(404).json({ success: false, error: 'Media asset not found.' });

      await CMSActivityLog.create({
        action: 'DELETE',
        entityType: 'media',
        entityTitle: media.title,
        entityId: id,
        details: `Deleted file ${media.fileName}`,
        performedBy: user,
      });

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
      const items = await NavigationItem.find({ isVisible: true }).sort({ menu: 1, order: 1 });
      res.json({ success: true, data: items });
    } catch (err) {
      next(err);
    }
  },

  async listAdminNavigation(req, res, next) {
    try {
      const items = await NavigationItem.find().sort({ menu: 1, order: 1 });
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

      let item;
      if (id && id !== 'new') {
        item = await NavigationItem.findByIdAndUpdate(id, validated, { new: true });
      } else {
        item = new NavigationItem(validated);
        await item.save();
      }

      await CMSActivityLog.create({
        action: id && id !== 'new' ? 'UPDATE' : 'CREATE',
        entityType: 'navigation',
        entityTitle: item.label,
        entityId: item._id.toString(),
        details: `Menu: ${item.menu}, Path: ${item.path}`,
        performedBy: user,
      });

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
      const industries = await Industry.find().sort({ displayOrder: 1 });
      res.json({ success: true, data: industries });
    } catch (err) {
      next(err);
    }
  },

  async updateIndustryCms(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const user = req.user?.name || 'Admin';

      let ind = await Industry.findOne({
        $or: [{ industryId: idOrSlug }, { slug: idOrSlug }],
      });

      if (!ind) {
        ind = new Industry({ industryId: idOrSlug, slug: idOrSlug, ...req.body });
      } else {
        Object.assign(ind, req.body);
      }

      ind.lastUpdatedBy = user;
      await ind.save();

      await CMSActivityLog.create({
        action: 'UPDATE',
        entityType: 'industry',
        entityTitle: ind.title,
        entityId: ind.slug,
        details: 'Industry details and technologies updated',
        performedBy: user,
      });

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
      const { contentType, contentId } = req.query;
      const query = {};
      if (contentType) query.contentType = contentType;
      if (contentId) query.contentId = contentId;

      const revisions = await ContentRevision.find(query).sort({ version: -1 }).limit(20);
      res.json({ success: true, data: revisions });
    } catch (err) {
      next(err);
    }
  },

  async restoreRevision(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user?.name || 'Admin';

      const revision = await ContentRevision.findById(id);
      if (!revision) return res.status(404).json({ success: false, error: 'Revision not found.' });

      if (revision.contentType === 'page') {
        await Page.findOneAndUpdate({ pageId: revision.contentId }, revision.snapshot, { new: true });
      } else if (revision.contentType === 'blog') {
        await BlogPost.findOneAndUpdate({ slug: revision.contentId }, revision.snapshot, { new: true });
      }

      await CMSActivityLog.create({
        action: 'RESTORE',
        entityType: revision.contentType,
        entityTitle: revision.title || revision.contentId,
        entityId: revision.contentId,
        details: `Restored to version ${revision.version}`,
        performedBy: user,
      });

      res.json({ success: true, message: `Successfully restored to version ${revision.version}.` });
    } catch (err) {
      next(err);
    }
  },

  async listActivityLogs(req, res, next) {
    try {
      const logs = await CMSActivityLog.find().sort({ timestamp: -1 }).limit(50);
      res.json({ success: true, data: logs });
    } catch (err) {
      next(err);
    }
  },
};


import { Page } from '../models/Page.js';
import { BlogPost } from '../models/BlogPost.js';
import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Industry } from '../models/Industry.js';
import { MediaAsset } from '../models/MediaAsset.js';
import { NavigationItem } from '../models/NavigationItem.js';
import { ContentRevision } from '../models/ContentRevision.js';
import { CMSActivityLog } from '../models/CMSActivityLog.js';

export const cmsService = {
  /**
   * Aggregate CMS dashboard statistics, metrics, and recent activity
   */
  async getDashboardSummary() {
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

    return {
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
    };
  },

  /**
   * List all CMS managed pages
   */
  async listPages() {
    return Page.find().sort({ pageId: 1 });
  },

  /**
   * Find page by pageId or slug
   */
  async getPageByIdOrSlug(idOrSlug) {
    return Page.findOne({
      $or: [{ pageId: idOrSlug }, { slug: idOrSlug }],
    });
  },

  /**
   * Update or create page content with automated revision versioning and CMS activity log
   */
  async updatePage(idOrSlug, validated, user = 'Admin') {
    let page = await this.getPageByIdOrSlug(idOrSlug);

    if (!page) {
      page = new Page({
        pageId: idOrSlug,
        slug: idOrSlug === 'home' ? '/' : `/${idOrSlug}`,
        title: validated.title,
      });
    }

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

    await CMSActivityLog.create({
      action: 'UPDATE',
      entityType: 'page',
      entityTitle: page.title,
      entityId: page.pageId,
      details: `Updated sections and SEO (v${nextVersion})`,
      performedBy: user,
    });

    return page;
  },

  /**
   * Toggle page publication status
   */
  async togglePagePublish(idOrSlug, status, user = 'Admin') {
    const page = await this.getPageByIdOrSlug(idOrSlug);
    if (!page) return null;

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

    return page;
  },

  /**
   * List public published blog articles
   */
  async listPublicPosts({ category, search, tag, limit = 20, page = 1 }) {
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

    return {
      posts,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  },

  /**
   * Get single public published post by slug and increment view count
   */
  async getPublicPostBySlug(slug) {
    const post = await BlogPost.findOne({ slug, status: 'published' });
    if (!post) return null;

    BlogPost.updateOne({ _id: post._id }, { $inc: { viewCount: 1 } }).exec();
    return post;
  },

  /**
   * Admin: List all posts including drafts
   */
  async listAdminPosts({ category, status }) {
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    return BlogPost.find(query).sort({ updatedAt: -1 });
  },

  /**
   * Admin: Create blog post
   */
  async createPost(validated, user = 'Admin') {
    const existing = await BlogPost.findOne({ slug: validated.slug });
    if (existing) {
      throw new Error(`Slug '${validated.slug}' already exists. Choose a unique slug.`);
    }

    const post = new BlogPost({
      ...validated,
      lastUpdatedBy: user,
    });
    await post.save();

    await ContentRevision.create({
      contentType: 'blog',
      contentId: post.slug,
      title: post.title,
      version: 1,
      snapshot: post.toObject(),
      changeSummary: 'Article created',
      author: user,
    });

    await CMSActivityLog.create({
      action: 'CREATE',
      entityType: 'blog',
      entityTitle: post.title,
      entityId: post.slug,
      details: `Category: ${post.category}, Status: ${post.status}`,
      performedBy: user,
    });

    return post;
  },

  /**
   * Admin: Update blog post
   */
  async updatePost(idOrSlug, validated, user = 'Admin') {
    const post = await BlogPost.findOne({
      $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
    });

    if (!post) return null;

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

    return post;
  },

  /**
   * Admin: Delete blog post
   */
  async deletePost(idOrSlug, user = 'Admin') {
    const post = await BlogPost.findOneAndDelete({
      $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
    });

    if (!post) return null;

    await CMSActivityLog.create({
      action: 'DELETE',
      entityType: 'blog',
      entityTitle: post.title,
      entityId: post.slug,
      details: 'Article deleted',
      performedBy: user,
    });

    return post;
  },

  /**
   * List media library items
   */
  async listMedia({ category, search }) {
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { fileName: { $regex: search, $options: 'i' } },
      ];
    }

    return MediaAsset.find(query).sort({ createdAt: -1 });
  },

  /**
   * Upload media asset record
   */
  async uploadMedia(validated, user = 'Admin') {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!allowed.includes(validated.fileType.toLowerCase())) {
      throw new Error(`Unsupported file type: ${validated.fileType}. Allowed: JPEG, PNG, WEBP, SVG, GIF.`);
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

    return media;
  },

  /**
   * Delete media asset record
   */
  async deleteMedia(id, user = 'Admin') {
    const media = await MediaAsset.findByIdAndDelete(id);
    if (!media) return null;

    await CMSActivityLog.create({
      action: 'DELETE',
      entityType: 'media',
      entityTitle: media.title,
      entityId: id,
      details: `Deleted file ${media.fileName}`,
      performedBy: user,
    });

    return media;
  },

  /**
   * Navigation management: list visible items
   */
  async getVisibleNavigation() {
    return NavigationItem.find({ isVisible: true }).sort({ menu: 1, order: 1 });
  },

  /**
   * Navigation management: list all items for admin
   */
  async listAdminNavigation() {
    return NavigationItem.find().sort({ menu: 1, order: 1 });
  },

  /**
   * Save (create or update) navigation item
   */
  async saveNavigationItem(id, validated, user = 'Admin') {
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

    return item;
  },

  /**
   * Industry CMS: list all industries
   */
  async listIndustries() {
    return Industry.find().sort({ displayOrder: 1 });
  },

  /**
   * Industry CMS: update or create industry
   */
  async updateIndustry(idOrSlug, data, user = 'Admin') {
    let ind = await Industry.findOne({
      $or: [{ industryId: idOrSlug }, { slug: idOrSlug }],
    });

    if (!ind) {
      ind = new Industry({ industryId: idOrSlug, slug: idOrSlug, ...data });
    } else {
      Object.assign(ind, data);
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

    return ind;
  },

  /**
   * Revision history: list revisions
   */
  async listRevisions({ contentType, contentId }) {
    const query = {};
    if (contentType) query.contentType = contentType;
    if (contentId) query.contentId = contentId;

    return ContentRevision.find(query).sort({ version: -1 }).limit(20);
  },

  /**
   * Revision history: restore revision
   */
  async restoreRevision(id, user = 'Admin') {
    const revision = await ContentRevision.findById(id);
    if (!revision) return null;

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

    return revision;
  },

  /**
   * CMS Activity logs
   */
  async listActivityLogs() {
    return CMSActivityLog.find().sort({ timestamp: -1 }).limit(50);
  },
};

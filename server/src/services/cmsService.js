import { Page } from '../models/Page.js';
import { BlogPost } from '../models/BlogPost.js';
import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Industry } from '../models/Industry.js';
import { MediaAsset } from '../models/MediaAsset.js';
import { NavigationItem } from '../models/NavigationItem.js';
import { ContentRevision } from '../models/ContentRevision.js';
import { CMSActivityLog } from '../models/CMSActivityLog.js';
import { SiteSetting } from '../models/SiteSetting.js';
import { automationService } from './automationService.js';

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

    if (status === 'published') {
      await automationService.emitEvent('CMS_PUBLISHED', {
        entityType: 'page',
        title: page.title,
        id: page.pageId,
        user: { name: user },
      });
    }

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
   * Delete media asset record with reference safety check
   */
  async deleteMedia(id, user = 'Admin', force = false) {
    const media = await MediaAsset.findById(id);
    if (!media) return null;

    if (!force) {
      const usage = await this.checkMediaUsage(media.url);
      if (usage.isUsed) {
        const error = new Error(`Cannot delete media asset: File is actively referenced on ${usage.references.length} website item(s): ${usage.references.map(r => r.title).join(', ')}.`);
        error.statusCode = 400;
        error.references = usage.references;
        throw error;
      }
    }

    await MediaAsset.findByIdAndDelete(id);

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
    } else if (revision.contentType === 'service') {
      await Service.findOneAndUpdate(
        { $or: [{ serviceId: revision.contentId }, { slug: revision.contentId }] },
        revision.snapshot,
        { new: true }
      );
    } else if (revision.contentType === 'project') {
      await Project.findOneAndUpdate({ slug: revision.contentId }, revision.snapshot, { new: true });
    } else if (revision.contentType === 'industry') {
      await Industry.findOneAndUpdate(
        { $or: [{ industryId: revision.contentId }, { slug: revision.contentId }] },
        revision.snapshot,
        { new: true }
      );
    } else if (revision.contentType === 'settings') {
      await SiteSetting.findOneAndUpdate({ key: 'global_settings' }, revision.snapshot, { new: true });
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
   * ==========================================
   * SERVICES CMS MANAGEMENT (Phase 12)
   * ==========================================
   */
  async listServices() {
    return Service.find().sort({ displayOrder: 1, createdAt: 1 });
  },

  async listPublicServices() {
    return Service.find({ status: { $ne: 'draft' } }).sort({ displayOrder: 1, createdAt: 1 });
  },

  async getServiceByIdOrSlug(idOrSlug) {
    return Service.findOne({
      $or: [{ serviceId: idOrSlug }, { slug: idOrSlug }],
    });
  },

  async createService(data, user = 'Admin') {
    const slug = data.slug || data.serviceId || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await Service.findOne({ $or: [{ slug }, { serviceId: data.serviceId || slug }] });
    if (existing) {
      throw new Error(`A service with identifier or slug '${slug}' already exists.`);
    }

    const service = new Service({
      ...data,
      serviceId: data.serviceId || slug,
      slug,
      lastUpdatedBy: user,
    });
    await service.save();

    await ContentRevision.create({
      contentType: 'service',
      contentId: service.slug,
      title: service.title,
      version: 1,
      snapshot: service.toObject(),
      changeSummary: 'Service division created',
      author: user,
    });

    await CMSActivityLog.create({
      action: 'CREATE',
      entityType: 'service',
      entityTitle: service.title,
      entityId: service.slug,
      details: `Service created (${service.slug})`,
      performedBy: user,
    });

    return service;
  },

  async updateService(idOrSlug, data, user = 'Admin') {
    let service = await this.getServiceByIdOrSlug(idOrSlug);
    if (!service) return null;

    const revisionCount = await ContentRevision.countDocuments({ contentType: 'service', contentId: service.slug });
    await ContentRevision.create({
      contentType: 'service',
      contentId: service.slug,
      title: service.title,
      version: revisionCount + 1,
      snapshot: service.toObject(),
      changeSummary: data.changeSummary || 'Service content updated',
      author: user,
    });

    Object.assign(service, data);
    service.lastUpdatedBy = user;
    await service.save();

    await CMSActivityLog.create({
      action: 'UPDATE',
      entityType: 'service',
      entityTitle: service.title,
      entityId: service.slug,
      details: 'Updated service information and capabilities',
      performedBy: user,
    });

    return service;
  },

  async toggleServicePublish(idOrSlug, status, user = 'Admin') {
    const service = await this.getServiceByIdOrSlug(idOrSlug);
    if (!service) return null;

    service.status = status;
    service.lastUpdatedBy = user;
    await service.save();

    await CMSActivityLog.create({
      action: status === 'published' ? 'PUBLISH' : 'UNPUBLISH',
      entityType: 'service',
      entityTitle: service.title,
      entityId: service.slug,
      details: `Status set to ${status}`,
      performedBy: user,
    });

    return service;
  },

  async deleteService(idOrSlug, user = 'Admin') {
    const service = await Service.findOneAndDelete({
      $or: [{ serviceId: idOrSlug }, { slug: idOrSlug }],
    });
    if (!service) return null;

    await CMSActivityLog.create({
      action: 'DELETE',
      entityType: 'service',
      entityTitle: service.title,
      entityId: service.slug,
      details: 'Service deleted from CMS',
      performedBy: user,
    });

    return service;
  },

  /**
   * ==========================================
   * PORTFOLIO & CASE STUDY CMS (Phase 12)
   * ==========================================
   */
  async listProjects(query = {}) {
    const filter = {};
    if (query.serviceId && query.serviceId !== 'all') filter.serviceId = query.serviceId;
    if (query.status && query.status !== 'all') filter.status = query.status;
    if (query.category && query.category !== 'all') filter.category = query.category;

    return Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  },

  async listPublicProjects(query = {}) {
    const filter = {
      isPublished: true,
      status: { $ne: 'draft' },
    };
    if (query.serviceId && query.serviceId !== 'all') filter.serviceId = query.serviceId;
    if (query.industry && query.industry !== 'all') filter.industry = query.industry;

    return Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  },

  async getProjectByIdOrSlug(idOrSlug) {
    return Project.findOne({
      $or: [
        { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
        { slug: idOrSlug },
      ],
    });
  },

  async createProject(data, user = 'Admin') {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await Project.findOne({ slug });
    if (existing) {
      throw new Error(`A portfolio project with slug '${slug}' already exists.`);
    }

    const project = new Project({
      ...data,
      slug,
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      status: data.status || 'published',
      publishedAt: data.publishedAt || new Date().toISOString(),
      lastUpdatedBy: user,
    });
    await project.save();

    await ContentRevision.create({
      contentType: 'project',
      contentId: project.slug,
      title: project.title,
      version: 1,
      snapshot: project.toObject(),
      changeSummary: 'Portfolio case study initialized',
      author: user,
    });

    await CMSActivityLog.create({
      action: 'CREATE',
      entityType: 'project',
      entityTitle: project.title,
      entityId: project.slug,
      details: `Project added: ${project.serviceName}`,
      performedBy: user,
    });

    return project;
  },

  async updateProject(idOrSlug, data, user = 'Admin') {
    let project = await this.getProjectByIdOrSlug(idOrSlug);
    if (!project) return null;

    const revisionCount = await ContentRevision.countDocuments({ contentType: 'project', contentId: project.slug });
    await ContentRevision.create({
      contentType: 'project',
      contentId: project.slug,
      title: project.title,
      version: revisionCount + 1,
      snapshot: project.toObject(),
      changeSummary: data.changeSummary || 'Case study details updated',
      author: user,
    });

    Object.assign(project, data);
    project.lastUpdatedBy = user;
    await project.save();

    await CMSActivityLog.create({
      action: 'UPDATE',
      entityType: 'project',
      entityTitle: project.title,
      entityId: project.slug,
      details: 'Updated case study specifications and architecture highlights',
      performedBy: user,
    });

    return project;
  },

  async toggleProjectPublish(idOrSlug, status, user = 'Admin') {
    const project = await this.getProjectByIdOrSlug(idOrSlug);
    if (!project) return null;

    project.status = status;
    project.isPublished = status === 'published';
    project.lastUpdatedBy = user;
    await project.save();

    await CMSActivityLog.create({
      action: status === 'published' ? 'PUBLISH' : 'UNPUBLISH',
      entityType: 'project',
      entityTitle: project.title,
      entityId: project.slug,
      details: `Status set to ${status}`,
      performedBy: user,
    });

    return project;
  },

  async deleteProject(idOrSlug, user = 'Admin') {
    const project = await Project.findOneAndDelete({
      $or: [
        { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
        { slug: idOrSlug },
      ],
    });
    if (!project) return null;

    await CMSActivityLog.create({
      action: 'DELETE',
      entityType: 'project',
      entityTitle: project.title,
      entityId: project.slug,
      details: 'Project removed from portfolio',
      performedBy: user,
    });

    return project;
  },

  /**
   * ==========================================
   * INDUSTRIES CMS EXTENSIONS (Phase 12)
   * ==========================================
   */
  async listPublicIndustries() {
    return Industry.find({ isPublished: true, status: { $ne: 'draft' } }).sort({ displayOrder: 1 });
  },

  async createIndustry(data, user = 'Admin') {
    const slug = data.slug || data.industryId || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await Industry.findOne({ $or: [{ slug }, { industryId: data.industryId || slug }] });
    if (existing) {
      throw new Error(`Industry with identifier '${slug}' already exists.`);
    }

    const ind = new Industry({
      ...data,
      industryId: data.industryId || slug,
      slug,
      lastUpdatedBy: user,
    });
    await ind.save();

    await ContentRevision.create({
      contentType: 'industry',
      contentId: ind.slug,
      title: ind.title,
      version: 1,
      snapshot: ind.toObject(),
      changeSummary: 'Industry category created',
      author: user,
    });

    await CMSActivityLog.create({
      action: 'CREATE',
      entityType: 'industry',
      entityTitle: ind.title,
      entityId: ind.slug,
      details: `Industry category added: ${ind.title}`,
      performedBy: user,
    });

    return ind;
  },

  async toggleIndustryPublish(idOrSlug, status, user = 'Admin') {
    const ind = await Industry.findOne({
      $or: [{ industryId: idOrSlug }, { slug: idOrSlug }],
    });
    if (!ind) return null;

    ind.status = status;
    ind.isPublished = status === 'published';
    ind.lastUpdatedBy = user;
    await ind.save();

    await CMSActivityLog.create({
      action: status === 'published' ? 'PUBLISH' : 'UNPUBLISH',
      entityType: 'industry',
      entityTitle: ind.title,
      entityId: ind.slug,
      details: `Status set to ${status}`,
      performedBy: user,
    });

    return ind;
  },

  async deleteIndustry(idOrSlug, user = 'Admin') {
    const ind = await Industry.findOneAndDelete({
      $or: [{ industryId: idOrSlug }, { slug: idOrSlug }],
    });
    if (!ind) return null;

    await CMSActivityLog.create({
      action: 'DELETE',
      entityType: 'industry',
      entityTitle: ind.title,
      entityId: ind.slug,
      details: 'Industry deleted',
      performedBy: user,
    });

    return ind;
  },

  /**
   * ==========================================
   * GLOBAL SITE SETTINGS (Phase 12)
   * ==========================================
   */
  async getSiteSettings() {
    let settings = await SiteSetting.findOne({ key: 'global_settings' });
    if (!settings) {
      settings = await SiteSetting.create({
        key: 'global_settings',
        companyName: 'Peace Haven Technologies Inc.',
        tagline: 'Engineering Ideas. Empowering Industries.',
        logoUrl: '/logo.svg',
        faviconUrl: '/favicon.ico',
        defaultCtaText: 'Start a Project',
        defaultCtaLink: '/start-a-project',
        copyrightText: '© 2026 Peace Haven Technologies Inc. All rights reserved.',
      });
    }
    return settings;
  },

  async updateSiteSettings(data, user = 'Admin') {
    let settings = await this.getSiteSettings();

    const revisionCount = await ContentRevision.countDocuments({ contentType: 'settings', contentId: 'global_settings' });
    await ContentRevision.create({
      contentType: 'settings',
      contentId: 'global_settings',
      title: 'Global Website Settings',
      version: revisionCount + 1,
      snapshot: settings.toObject(),
      changeSummary: data.changeSummary || 'Updated global website settings & branding',
      author: user,
    });

    Object.assign(settings, data);
    settings.lastUpdatedBy = user;
    await settings.save();

    await CMSActivityLog.create({
      action: 'UPDATE',
      entityType: 'settings',
      entityTitle: 'Global Website Settings',
      entityId: 'global_settings',
      details: 'Branding, navigation, socials, and announcement banner modified',
      performedBy: user,
    });

    return settings;
  },

  /**
   * ==========================================
   * ASSET USAGE VERIFICATION (Phase 12)
   * ==========================================
   */
  async checkMediaUsage(mediaUrl) {
    if (!mediaUrl) return { isUsed: false, references: [] };

    const regex = new RegExp(mediaUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const [pages, services, projects, blogs] = await Promise.all([
      Page.find({
        $or: [
          { 'hero.bgImage': regex },
          { 'seo.ogImage': regex },
          { 'sections.content': regex },
        ],
      }).select('pageId title'),
      Service.find({
        $or: [{ 'seo.ogImage': regex }],
      }).select('serviceId title'),
      Project.find({
        $or: [
          { thumbnail: regex },
          { heroImage: regex },
          { galleryImages: regex },
        ],
      }).select('slug title'),
      BlogPost.find({
        $or: [{ coverImage: regex }, { content: regex }],
      }).select('slug title'),
    ]);

    const references = [
      ...pages.map((p) => ({ type: 'Page', title: p.title, id: p.pageId })),
      ...services.map((s) => ({ type: 'Service', title: s.title, id: s.serviceId })),
      ...projects.map((pr) => ({ type: 'Project', title: pr.title, id: pr.slug })),
      ...blogs.map((b) => ({ type: 'Blog', title: b.title, id: b.slug })),
    ];

    return {
      isUsed: references.length > 0,
      references,
    };
  },

  /**
   * CMS Activity logs
   */
  async listActivityLogs() {
    return CMSActivityLog.find().sort({ timestamp: -1 }).limit(50);
  },
};


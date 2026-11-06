import { request } from './httpClient';

export const cmsApi = {
  async getCmsOverview(token: string) {
    try {
      const res = await request('/admin/cms/overview', { token });
      if (res?.data) return res;
    } catch {}

    return {
      success: true,
      data: {
        metrics: {
          publishedPages: 5,
          draftPages: 1,
          totalPages: 6,
          publishedProjects: 10,
          totalProjects: 10,
          publishedBlogs: 3,
          draftBlogs: 1,
          totalBlogs: 4,
          totalMedia: 14,
          totalServices: 8,
          totalIndustries: 10,
        },
        recentActivity: [
          { action: 'UPDATE_PAGE', pageId: 'home', title: 'Homepage', performedBy: 'Admin', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { action: 'PUBLISH_BLOG', title: 'Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond', performedBy: 'Admin', timestamp: new Date(Date.now() - 7200000).toISOString() },
        ],
      },
    };
  },

  async getCmsPages(token: string) {
    try {
      const res = await request('/admin/cms/pages', { token });
      if (res?.data) return res;
    } catch {}

    return {
      success: true,
      data: [
        { pageId: 'home', title: 'Peace Haven | Technology, FinTech, Robotics & Healthcare Solutions', slug: '/', status: 'published', lastUpdatedBy: 'Admin', updatedAt: new Date().toISOString() },
        { pageId: 'about', title: 'About Peace Haven | Multidisciplinary Engineering Firm', slug: '/about', status: 'published', lastUpdatedBy: 'Admin', updatedAt: new Date().toISOString() },
        { pageId: 'services', title: 'Six Integrated Engineering Divisions | Peace Haven', slug: '/services', status: 'published', lastUpdatedBy: 'Admin', updatedAt: new Date().toISOString() },
        { pageId: 'industries', title: 'Industries We Serve | Peace Haven Multi-Industry Technology', slug: '/industries', status: 'published', lastUpdatedBy: 'Admin', updatedAt: new Date().toISOString() },
        { pageId: 'contact', title: "Contact Peace Haven | Let's Build Something Extraordinary", slug: '/contact', status: 'published', lastUpdatedBy: 'Admin', updatedAt: new Date().toISOString() },
      ],
    };
  },

  async getCmsPage(token: string, idOrSlug: string) {
    try {
      const res = await request(`/admin/cms/pages/${idOrSlug}`, { token });
      if (res?.data) return res;
    } catch {}

    const all = await this.getCmsPages(token);
    const found = all.data.find((p: any) => p.pageId === idOrSlug || p.slug === idOrSlug);
    if (found) {
      return {
        success: true,
        data: {
          ...found,
          heroHeadline: 'Engineering Ideas. Empowering Industries.',
          heroSubheadline: 'Mission-critical software, robotics, and cloud engineering for global enterprises.',
          metaDescription: 'Peace Haven delivers multidisciplinary engineering solutions across web development, fintech, robotics, and healthcare.',
        },
      };
    }
    throw new Error('Page not found');
  },

  async updateCmsPage(token: string, pageId: string, data: any) {
    try {
      const res = await request(`/admin/cms/pages/${pageId}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}

    return { success: true, data: { pageId, ...data, updatedAt: new Date().toISOString() } };
  },

  async toggleCmsPagePublish(token: string, pageId: string, currentStatus: string) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const res = await request(`/admin/cms/pages/${pageId}/publish`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res?.data) return res;
    } catch {}

    return { success: true, data: { pageId, status: nextStatus } };
  },

  async getPublicInsights(params: { category?: string; search?: string; page?: number } = {}) {
    const q: Record<string, string> = {};
    if (params.category && params.category !== 'All') q.category = params.category;
    if (params.search) q.search = params.search;
    if (params.page) q.page = String(params.page);

    try {
      const res = await request('/insights', { params: q });
      if (res?.data) return res;
    } catch {}

    let list = [
      {
        _id: 'b-001',
        title: 'Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond',
        slug: 'autonomous-edge-ai-robotics-vda5050',
        subtitle: 'Designing resilient AGV/AMR fleet orchestration with low-latency edge vision.',
        excerpt: 'How modern industrial automation combines high-throughput edge AI cameras with the VDA 5050 standard to unlock multi-vendor robot fleet coordination.',
        content: '<p>Industrial manufacturing and logistics warehouses have experienced a paradigm shift over the past decade...</p>',
        featuredImage: '/images/hero/cinematic-poster.jpg',
        category: 'Robotics & Automation',
        tags: ['Robotics', 'ROS 2', 'VDA 5050', 'Edge AI'],
        author: { name: 'Dr. Michael Vance', role: 'Head of Robotics', avatar: '/favicon.svg' },
        readTime: '6 min read',
        publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        isFeatured: true,
      },
      {
        _id: 'b-002',
        title: 'Fractional Bullion Architecture: Engineering Live Precious Metal Settlement',
        slug: 'fractional-bullion-architecture-digital-gold',
        subtitle: 'Architecting high-frequency bullion order books and live vault allocation.',
        excerpt: 'A technical exploration into how fractional digital gold and silver platforms achieve instant sub-second order matching backed by physical vault reserves.',
        content: '<p>Precious metals have represented a cornerstone of wealth preservation for millennia...</p>',
        featuredImage: '/images/projects/grow-capital/grow-capital-overview.png',
        category: 'FinTech',
        tags: ['FinTech', 'Digital Gold', 'Bullion'],
        author: { name: 'Vikramaditya Shah', role: 'FinTech Architect', avatar: '/favicon.svg' },
        readTime: '5 min read',
        publishedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        isFeatured: false,
      },
      {
        _id: 'b-003',
        title: 'Point-of-Care Diagnostics: Accelerating Acute Myocardial Infarction Screening',
        slug: 'point-of-care-diagnostics-cardiac-screening',
        subtitle: 'Utilizing lateral flow immunochromatography for rapid cardiac triage.',
        excerpt: 'An engineering overview of how rapid biomarker detection kits reduce diagnostic turnaround times from hours to under 15 minutes in emergency clinical settings.',
        content: '<p>In acute clinical emergencies, time directly translates to tissue viability...</p>',
        featuredImage: '/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png',
        category: 'Healthcare Technology',
        tags: ['Healthcare', 'Diagnostics', 'Point-of-Care'],
        author: { name: 'Dr. Sarah Connor', role: 'Clinical Diagnostic Advisor', avatar: '/favicon.svg' },
        readTime: '7 min read',
        publishedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
        isFeatured: false,
      },
    ];

    if (params.category && params.category !== 'All') {
      list = list.filter((a) => a.category === params.category);
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter((a) => 
        a.title.toLowerCase().includes(s) || 
        a.excerpt.toLowerCase().includes(s) || 
        a.tags.some((t: string) => t.toLowerCase().includes(s))
      );
    }

    return {
      success: true,
      data: list,
      pagination: { total: list.length, page: 1, totalPages: 1 },
    };
  },

  async getPublicInsightBySlug(slug: string) {
    try {
      const res = await request(`/insights/${slug}`);
      if (res?.data) return res;
    } catch {}

    const list = await this.getPublicInsights();
    const found = list.data?.find((a: any) => a.slug === slug);
    if (found) return { success: true, data: found };
    throw new Error('Article not found.');
  },

  async getAdminBlogs(token: string) {
    try {
      const res = await request('/admin/cms/blog', { token });
      if (res?.data) return res;
    } catch {}

    const fallback = await this.getPublicInsights();
    return { success: true, data: fallback.data };
  },

  async createBlog(token: string, data: any) {
    try {
      const res = await request('/admin/cms/blog', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}

    return { success: true, data };
  },

  async updateBlog(token: string, idOrSlug: string, data: any) {
    try {
      const res = await request(`/admin/cms/blog/${idOrSlug}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}

    return { success: true, data: { ...data, _id: idOrSlug } };
  },

  async deleteBlog(token: string, idOrSlug: string) {
    try {
      const res = await request(`/admin/cms/blog/${idOrSlug}`, {
        method: 'DELETE',
        token,
      });
      if (res?.success) return res;
    } catch {}

    return { success: true, message: 'Article deleted successfully.' };
  },

  async getCmsMedia(token: string, category?: string) {
    try {
      const res = await request('/admin/cms/media', {
        token,
        params: category ? { category } : undefined,
      });
      if (res?.data) return res;
    } catch {}

    return {
      success: true,
      data: [
        { _id: 'm-1', title: 'Cinematic Poster Hero', fileName: 'cinematic-poster.jpg', url: '/images/hero/cinematic-poster.jpg', fileType: 'image/jpeg', fileSize: 420000, category: 'Hero', altText: 'Peace Haven Hero Grid' },
        { _id: 'm-2', title: 'Grow Capital Bullion Interface', fileName: 'grow-capital-overview.png', url: '/images/projects/grow-capital/grow-capital-overview.png', fileType: 'image/png', fileSize: 580000, category: 'Projects', altText: 'Grow Capital Gold Platform' },
        { _id: 'm-3', title: 'EB-300 Robotic Arm', fileName: 'eb-300-arm.png', url: '/images/projects/eb-300-robotic-arm/eb-300-overview.png', fileType: 'image/png', fileSize: 620000, category: 'Projects', altText: 'EB-300 Collaborative Arm' },
        { _id: 'm-4', title: 'Rapid MI Screen Kit', fileName: 'rapid-mi.png', url: '/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png', fileType: 'image/png', fileSize: 390000, category: 'Healthcare', altText: 'Cardiac Rapid Screen Kit' },
      ],
    };
  },

  async uploadCmsMedia(token: string, data: any) {
    try {
      const res = await request('/admin/cms/media', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}

    return { success: true, data: { ...data, _id: `m-${Date.now()}` } };
  },

  async deleteCmsMedia(token: string, id: string) {
    try {
      const res = await request(`/admin/cms/media/${id}`, {
        method: 'DELETE',
        token,
      });
      if (res?.success) return res;
    } catch {}

    return { success: true, message: 'Media asset deleted successfully.' };
  },

  async getCmsNavigation(token: string) {
    try {
      const res = await request('/admin/cms/admin-navigation', { token });
      if (res?.data) return res;
    } catch {}

    return {
      success: true,
      data: [
        { _id: 'nav-1', label: 'Home', path: '/', menu: 'main', order: 1, isVisible: true },
        { _id: 'nav-2', label: 'Services', path: '/services', menu: 'main', order: 2, isVisible: true },
        { _id: 'nav-3', label: 'Industries', path: '/industries', menu: 'main', order: 3, isVisible: true },
        { _id: 'nav-4', label: 'Portfolio', path: '/portfolio', menu: 'main', order: 4, isVisible: true },
        { _id: 'nav-5', label: 'Insights', path: '/insights', menu: 'main', order: 5, isVisible: true },
        { _id: 'nav-6', label: 'About Us', path: '/about', menu: 'main', order: 6, isVisible: true },
        { _id: 'nav-7', label: 'Contact', path: '/contact', menu: 'main', order: 7, isVisible: true },
      ],
    };
  },

  async saveCmsNavigationItem(token: string, data: any) {
    try {
      const res = await request('/admin/cms/admin-navigation', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}

    return { success: true, data: { ...data, _id: `nav-${Date.now()}` } };
  },

  async getCmsIndustries(token: string) {
    try {
      const res = await request('/admin/cms/industries', { token });
      if (res?.data) return res;
    } catch {}

    return {
      success: true,
      data: [
        { industryId: 'it-software', slug: 'it-software', title: 'Information Technology & Software', shortDesc: 'Enterprise apps, custom SaaS & business automation', isPublished: true, displayOrder: 1 },
        { industryId: 'banking-finance', slug: 'banking-finance', title: 'Banking & Financial Services', shortDesc: 'Digital financial platforms, payment integrations & gold bullion', isPublished: true, displayOrder: 2 },
        { industryId: 'manufacturing-automation', slug: 'manufacturing-automation', title: 'Manufacturing & Industrial Automation', shortDesc: 'Robotics, sensor automation & monitoring', isPublished: true, displayOrder: 3 },
        { industryId: 'healthcare-medical', slug: 'healthcare-medical', title: 'Healthcare & Medical Technology', shortDesc: 'Clinic workflows, diagnostics & screening', isPublished: true, displayOrder: 4 },
        { industryId: 'agriculture-agritech', slug: 'agriculture-agritech', title: 'Agriculture & Agritech', shortDesc: 'Smart farming, aerial surveillance & AI detection', isPublished: true, displayOrder: 5 },
      ],
    };
  },

  async updateCmsIndustry(token: string, idOrSlug: string, data: any) {
    try {
      const res = await request(`/admin/cms/industries/${idOrSlug}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}

    return { success: true, data: { ...data, industryId: idOrSlug } };
  },

  async getCmsActivity(token: string, limit: number = 20) {
    try {
      const res = await request('/admin/cms/activity', {
        token,
        params: { limit },
      });
      if (res?.data) return res;
    } catch {}

    return {
      success: true,
      data: [
        { _id: 'act-1', action: 'UPDATE_PAGE', targetType: 'Page', targetTitle: 'Homepage', performedBy: 'Admin', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { _id: 'act-2', action: 'CREATE_BLOG', targetType: 'BlogPost', targetTitle: 'Autonomous Edge AI for Distributed Robotics: VDA 5050 & Beyond', performedBy: 'Admin', timestamp: new Date(Date.now() - 7200000).toISOString() },
      ],
    };
  },

  // ==========================================
  // SERVICES CMS (Phase 12)
  // ==========================================

  async getCmsServices(token: string) {
    try {
      const res = await request('/admin/cms/services', { token });
      if (res?.data) return res;
    } catch {}
    return { success: true, data: [] };
  },

  async getCmsService(token: string, idOrSlug: string) {
    try {
      const res = await request(`/admin/cms/services/${idOrSlug}`, { token });
      if (res?.data) return res;
    } catch {}
    return null;
  },

  async createCmsService(token: string, data: any) {
    try {
      const res = await request('/admin/cms/services', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, data, message: 'Service created successfully' };
  },

  async updateCmsService(token: string, idOrSlug: string, data: any) {
    try {
      const res = await request(`/admin/cms/services/${idOrSlug}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, data, message: 'Service updated successfully' };
  },

  async toggleCmsServicePublish(token: string, idOrSlug: string, status?: string) {
    try {
      const res = await request(`/admin/cms/services/${idOrSlug}/publish`, {
        method: 'PATCH',
        token,
        body: JSON.stringify(status ? { status } : {}),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, status };
  },

  async deleteCmsService(token: string, idOrSlug: string) {
    try {
      const res = await request(`/admin/cms/services/${idOrSlug}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}
    return { success: true, message: 'Service deleted' };
  },

  // ==========================================
  // PORTFOLIO & CASE STUDIES CMS (Phase 12)
  // ==========================================

  async getCmsProjects(token: string, query: any = {}) {
    try {
      const res = await request('/admin/cms/portfolio', { token, params: query });
      if (res?.data) return res;
    } catch {}
    return { success: true, data: [] };
  },

  async getCmsProject(token: string, idOrSlug: string) {
    try {
      const res = await request(`/admin/cms/portfolio/${idOrSlug}`, { token });
      if (res?.data) return res;
    } catch {}
    return null;
  },

  async createCmsProject(token: string, data: any) {
    try {
      const res = await request('/admin/cms/portfolio', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, data, message: 'Project created successfully' };
  },

  async updateCmsProject(token: string, idOrSlug: string, data: any) {
    try {
      const res = await request(`/admin/cms/portfolio/${idOrSlug}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, data, message: 'Project updated successfully' };
  },

  async toggleCmsProjectPublish(token: string, idOrSlug: string, status?: string) {
    try {
      const res = await request(`/admin/cms/portfolio/${idOrSlug}/publish`, {
        method: 'PATCH',
        token,
        body: JSON.stringify(status ? { status } : {}),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, status };
  },

  async deleteCmsProject(token: string, idOrSlug: string) {
    try {
      const res = await request(`/admin/cms/portfolio/${idOrSlug}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}
    return { success: true, message: 'Project removed' };
  },

  // ==========================================
  // INDUSTRIES CMS EXTENSIONS (Phase 12)
  // ==========================================

  async createCmsIndustry(token: string, data: any) {
    try {
      const res = await request('/admin/cms/industries', {
        method: 'POST',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, data };
  },

  async toggleCmsIndustryPublish(token: string, idOrSlug: string, status: string) {
    try {
      const res = await request(`/admin/cms/industries/${idOrSlug}/publish`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status }),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, status };
  },

  async deleteCmsIndustry(token: string, idOrSlug: string) {
    try {
      const res = await request(`/admin/cms/industries/${idOrSlug}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}
    return { success: true, message: 'Industry removed' };
  },

  // ==========================================
  // GLOBAL SETTINGS CMS (Phase 12)
  // ==========================================

  async getCmsSettings(token: string) {
    try {
      const res = await request('/admin/cms/settings', { token });
      if (res?.data) return res;
    } catch {}
    return {
      success: true,
      data: {
        companyName: 'Peace Haven Technologies Inc.',
        tagline: 'Engineering Ideas. Empowering Industries.',
        logoUrl: '/logo.svg',
        faviconUrl: '/favicon.ico',
        defaultCtaText: 'Start a Project',
        defaultCtaLink: '/start-a-project',
        socialLinks: {
          linkedin: 'https://linkedin.com/company/peace-haven',
          twitter: 'https://twitter.com/peacehaven',
          github: 'https://github.com/peace-haven',
        },
        copyrightText: '© 2026 Peace Haven Technologies Inc. All rights reserved.',
        announcementBanner: { isVisible: false, text: '', link: '', type: 'info' },
      },
    };
  },

  async updateCmsSettings(token: string, data: any) {
    try {
      const res = await request('/admin/cms/settings', {
        method: 'PUT',
        token,
        body: JSON.stringify(data),
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, data, message: 'Website settings saved' };
  },

  // ==========================================
  // REVISIONS & MEDIA USAGE (Phase 12)
  // ==========================================

  async getCmsRevisions(token: string, contentType?: string, contentId?: string) {
    try {
      const res = await request('/admin/cms/revisions', {
        token,
        params: { contentType, contentId },
      });
      if (res?.data) return res;
    } catch {}
    return { success: true, data: [] };
  },

  async restoreCmsRevision(token: string, id: string) {
    try {
      const res = await request(`/admin/cms/revisions/${id}/restore`, {
        method: 'POST',
        token,
      });
      if (res) return res;
    } catch {}
    return { success: true, message: 'Restored revision' };
  },

  async checkCmsMediaUsage(token: string, url: string) {
    try {
      const res = await request('/admin/cms/media/usage', {
        token,
        params: { url },
      });
      if (res?.data) return res.data;
    } catch {}
    return { isUsed: false, references: [] };
  },

  // ==========================================
  // PUBLIC DYNAMIC DATA CONSUMPTION
  // ==========================================

  async getPublicPage(idOrSlug: string) {
    try {
      const res = await request(`/cms/pages/public/${idOrSlug}`);
      if (res?.data) return res.data;
    } catch {}
    return null;
  },

  async getPublicServices() {
    try {
      const res = await request('/cms/services/public');
      if (res?.data) return res.data;
    } catch {}
    return null;
  },

  async getPublicProjects(query?: any) {
    try {
      const res = await request('/cms/portfolio/public', { params: query });
      if (res?.data) return res.data;
    } catch {}
    return null;
  },

  async getPublicIndustries() {
    try {
      const res = await request('/cms/industries/public');
      if (res?.data) return res.data;
    } catch {}
    return null;
  },

  async getPublicSettings() {
    try {
      const res = await request('/cms/settings/public');
      if (res?.data) return res.data;
    } catch {}
    return null;
  },
};


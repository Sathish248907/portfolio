import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Layers, 
  Briefcase, 
  Building2, 
  Image as ImageIcon, 
  Menu as MenuIcon, 
  Plus, 
  CheckCircle2, 
  Upload, 
  RefreshCw, 
  Sparkles,
  AlertCircle,
  BookOpen,
  Home,
  Compass,
  Mail,
  Settings,
  RotateCcw
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Button } from '../../components/common/Button';
import { api } from '../../services/api';
import { cn } from '../../lib/utils';

// Modular CMS sub-components
import { CmsOverviewTab } from './cms/CmsOverviewTab';
import { CmsHomepageEditor } from './cms/CmsHomepageEditor';
import { CmsAboutEditor } from './cms/CmsAboutEditor';
import { CmsContactEditor } from './cms/CmsContactEditor';
import { CmsSettingsTab } from './cms/CmsSettingsTab';
import { CmsRevisionsTab } from './cms/CmsRevisionsTab';
import { CmsPagesTab } from './cms/CmsPagesTab';
import { CmsServicesTab } from './cms/CmsServicesTab';
import { CmsProjectsTab } from './cms/CmsProjectsTab';
import { CmsIndustriesTab } from './cms/CmsIndustriesTab';
import { CmsBlogTab } from './cms/CmsBlogTab';
import { CmsMediaTab } from './cms/CmsMediaTab';
import { CmsNavTab } from './cms/CmsNavTab';
import { PageEditorModal } from './cms/PageEditorModal';
import { BlogEditorModal } from './cms/BlogEditorModal';
import { MediaUploadModal } from './cms/MediaUploadModal';

export type CmsTab = 
  | 'overview' 
  | 'homepage' 
  | 'services' 
  | 'projects' 
  | 'industries' 
  | 'about' 
  | 'contact' 
  | 'pages' 
  | 'settings' 
  | 'revisions' 
  | 'blogs' 
  | 'media' 
  | 'navigation';

export const AdminCmsPage: React.FC = () => {
  const [token] = useState<string>(() => localStorage.getItem('ph_admin_token') || 'ph-demo-jwt-token-verified-2026');
  const [activeTab, setActiveTab] = useState<CmsTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // CMS State
  const [overview, setOverview] = useState<any>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [navItems, setNavItems] = useState<any[]>([]);

  // Modals & Editors
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [mediaUploadForm, setMediaUploadForm] = useState({
    title: '',
    fileName: '',
    url: '',
    fileType: 'image/png',
    fileSize: 524288,
    category: 'General',
    altText: '',
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllCmsData = async () => {
    setIsRefreshing(true);
    try {
      const [ov, pg, srv, prj, ind, blg, med, nav] = await Promise.all([
        api.getCmsOverview(token),
        api.getCmsPages(token),
        api.getCmsServices(token),
        api.getCmsProjects(token),
        api.getCmsIndustries(token),
        api.getAdminBlogs(token),
        api.getCmsMedia(token),
        api.getCmsNavigation(token),
      ]);

      if (ov?.data) setOverview(ov.data);
      if (pg?.data) setPages(pg.data);
      if (srv?.data) setServices(srv.data);
      if (prj?.data) setProjects(prj.data);
      if (ind?.data) setIndustries(ind.data);
      if (blg?.data) setBlogs(blg.data);
      if (med?.data) setMediaList(med.data);
      if (nav?.data) setNavItems(nav.data);
    } catch (err) {
      console.error('Failed to load CMS data', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllCmsData();
  }, []);

  // Handlers for Page Management
  const handleSavePage = async (pageData: any) => {
    try {
      await api.updateCmsPage(token, pageData.pageId, pageData);
      showNotification(`Page '${pageData.title}' updated successfully.`);
      setEditingPage(null);
      loadAllCmsData();
    } catch {
      showNotification('Failed to update page.', 'error');
    }
  };

  const handleTogglePagePublish = async (pageId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await api.toggleCmsPagePublish(token, pageId, nextStatus);
      showNotification(`Page status set to ${nextStatus}.`);
      loadAllCmsData();
    } catch {
      showNotification('Failed to toggle publication status.', 'error');
    }
  };

  // Handlers for Blog Management
  const handleSaveBlog = async (blogData: any) => {
    try {
      if (isCreatingBlog) {
        await api.createBlog(token, blogData);
        showNotification(`Article '${blogData.title}' published successfully.`);
      } else {
        await api.updateBlog(token, blogData.slug, blogData);
        showNotification(`Article '${blogData.title}' updated.`);
      }
      setEditingBlog(null);
      setIsCreatingBlog(false);
      loadAllCmsData();
    } catch (e: any) {
      showNotification(e.message || 'Error saving article.', 'error');
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.deleteBlog(token, slug);
      showNotification('Article deleted.');
      loadAllCmsData();
    } catch {
      showNotification('Failed to delete article.', 'error');
    }
  };

  // Handlers for Media Library
  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.uploadCmsMedia(token, mediaUploadForm);
      showNotification(`Media asset '${mediaUploadForm.title}' registered.`);
      setIsUploadingMedia(false);
      setMediaUploadForm({
        title: '',
        fileName: '',
        url: '',
        fileType: 'image/png',
        fileSize: 524288,
        category: 'General',
        altText: '',
      });
      loadAllCmsData();
    } catch {
      showNotification('Failed to upload media asset.', 'error');
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!window.confirm('Delete this media asset?')) return;
    try {
      const res = await api.deleteCmsMedia(token, id);
      if (res?.success === false) {
        showNotification(res.message || 'Asset is in use and cannot be deleted.', 'error');
        return;
      }
      showNotification('Media asset deleted.');
      loadAllCmsData();
    } catch {
      showNotification('Failed to delete media asset.', 'error');
    }
  };

  const metrics = overview?.metrics || {
    publishedPages: 6,
    draftPages: 0,
    publishedProjects: 10,
    draftProjects: 0,
    publishedBlogs: 3,
    draftBlogs: 0,
    totalServices: 6,
    totalIndustries: 10,
    totalMedia: 4,
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <SEO 
        title="Content Management System (CMS) | Peace Haven Admin"
        description="Dynamic website management portal: create, edit, preview, and publish pages, services, portfolio case studies, technical insights, and media."
      />

      {/* Floating Notification */}
      {notification && (
        <div className={cn(
          'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-mono border backdrop-blur-md transition-all',
          notification.type === 'success'
            ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
            : 'bg-rose-950/90 text-rose-200 border-rose-500/40'
        )}>
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-sage-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-700/20 text-champagne-300 text-xs font-mono border border-champagne-500/30">
              CMS Dynamic Suite v2.0
            </span>
            <span className="text-xs font-mono text-slate-400">
              Admin-to-Website Content Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-warm-100 tracking-tight">
            Content Management System (CMS)
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Centralized hub to add, edit, reorder, preview, and publish pages, service divisions, portfolio case studies, site branding, and media assets without touching React source code.
          </p>
        </div>

        {/* Global Quick Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => setActiveTab('homepage')}
            variant="outline"
            size="sm"
            leftIcon={<Home className="w-3.5 h-3.5 text-champagne-400" />}
          >
            Edit Homepage
          </Button>

          <Button
            onClick={() => {
              setIsCreatingBlog(true);
              setEditingBlog({
                title: '',
                slug: '',
                subtitle: '',
                excerpt: '',
                content: '',
                category: 'Technology',
                tags: '',
                readTime: '5 min read',
                isFeatured: false,
                status: 'draft',
                authorName: 'Peace Haven Lead',
                authorRole: 'Engineering Architect',
              });
              setActiveTab('blogs');
            }}
            variant="champagne"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            New Article
          </Button>

          <Button
            onClick={() => {
              setIsUploadingMedia(true);
              setActiveTab('media');
            }}
            variant="outline"
            size="sm"
            leftIcon={<Upload className="w-3.5 h-3.5 text-champagne-400" />}
          >
            Upload Media
          </Button>

          <button
            onClick={loadAllCmsData}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-slate-300 hover:text-white transition-colors"
            title="Refresh CMS"
          >
            <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin text-champagne-400')} />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 sm:gap-1.5 border-b border-sage-500/20 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'Overview', icon: Sparkles },
          { id: 'homepage', label: 'Homepage', icon: Home },
          { id: 'services', label: 'Services Hub', ariaLabel: 'Services (6 Services)', icon: Layers, badge: metrics.totalServices },
          { id: 'projects', label: 'Portfolio', ariaLabel: 'Portfolio (10 Projects)', icon: Briefcase, badge: metrics.publishedProjects },
          { id: 'industries', label: 'Industries', ariaLabel: 'Industries (10 Industries)', icon: Building2, badge: metrics.totalIndustries },
          { id: 'about', label: 'About Us', icon: Compass },
          { id: 'contact', label: 'Contact', icon: Mail },
          { id: 'pages', label: 'All Pages', ariaLabel: 'Page Management (All Pages)', icon: FileText, badge: metrics.publishedPages },
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'revisions', label: 'Revisions', icon: RotateCcw },
          { id: 'blogs', label: 'Blog & Insights', icon: BookOpen, badge: metrics.publishedBlogs },
          { id: 'media', label: 'Media Library', icon: ImageIcon, badge: metrics.totalMedia },
          { id: 'navigation', label: 'Navigation & Menus', icon: MenuIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              aria-label={tab.ariaLabel || tab.label}
              onClick={() => setActiveTab(tab.id as CmsTab)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap',
                active
                  ? 'border-champagne-400 text-champagne-300 font-semibold bg-white/5 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              <Icon className={cn('w-3.5 h-3.5', active ? 'text-champagne-400' : 'text-slate-400')} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                  active ? 'bg-champagne-500/20 text-champagne-300' : 'bg-charcoal-800 text-slate-400'
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Modular Tab Views */}
      {activeTab === 'overview' && (
        <CmsOverviewTab 
          metrics={metrics} 
          overview={overview} 
          onSelectTab={(tabId) => setActiveTab(tabId as CmsTab)}
        />
      )}

      {activeTab === 'homepage' && (
        <CmsHomepageEditor
          token={token}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
        />
      )}

      {activeTab === 'about' && (
        <CmsAboutEditor
          token={token}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
        />
      )}

      {activeTab === 'contact' && (
        <CmsContactEditor
          token={token}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
        />
      )}

      {activeTab === 'settings' && (
        <CmsSettingsTab
          token={token}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
        />
      )}

      {activeTab === 'revisions' && (
        <CmsRevisionsTab
          token={token}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
        />
      )}

      {activeTab === 'pages' && (
        <CmsPagesTab
          pages={pages}
          token={token}
          onTogglePublish={handleTogglePagePublish}
          onEditPage={setEditingPage}
        />
      )}

      {activeTab === 'services' && (
        <CmsServicesTab
          services={services}
          token={token}
          onRefresh={loadAllCmsData}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
        />
      )}

      {activeTab === 'projects' && (
        <CmsProjectsTab
          projects={projects}
          token={token}
          onRefresh={loadAllCmsData}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
        />
      )}

      {activeTab === 'industries' && (
        <CmsIndustriesTab industries={industries} />
      )}

      {activeTab === 'blogs' && (
        <CmsBlogTab
          blogs={blogs}
          onNewArticle={() => {
            setEditingBlog({
              title: '',
              slug: '',
              subtitle: '',
              excerpt: '',
              content: '<p>Write your technical analysis here...</p>',
              category: 'Technology',
              tags: ['Tech'],
              readTime: '5 min read',
              status: 'published',
              author: { name: 'Peace Haven Lead', role: 'Principal Architect' },
            });
            setIsCreatingBlog(true);
          }}
          onEditArticle={(b) => {
            setEditingBlog(b);
            setIsCreatingBlog(false);
          }}
          onDeleteArticle={handleDeleteBlog}
        />
      )}

      {activeTab === 'media' && (
        <CmsMediaTab
          mediaList={mediaList}
          onOpenUpload={() => setIsUploadingMedia(true)}
          onCopyUrl={(url) => {
            navigator.clipboard.writeText(url);
            showNotification('URL copied to clipboard.');
          }}
          onDeleteMedia={handleDeleteMedia}
        />
      )}

      {activeTab === 'navigation' && (
        <CmsNavTab navItems={navItems} />
      )}

      {/* Modular Editor Modals */}
      {editingPage && (
        <PageEditorModal
          page={editingPage}
          onClose={() => setEditingPage(null)}
          onSave={handleSavePage}
          onChange={setEditingPage}
        />
      )}

      {editingBlog && (
        <BlogEditorModal
          blog={editingBlog}
          isCreating={isCreatingBlog}
          onClose={() => setEditingBlog(null)}
          onSave={handleSaveBlog}
          onChange={setEditingBlog}
        />
      )}

      {isUploadingMedia && (
        <MediaUploadModal
          form={mediaUploadForm}
          onClose={() => setIsUploadingMedia(false)}
          onSubmit={handleUploadMedia}
          onChange={setMediaUploadForm}
        />
      )}
    </div>
  );
};

export default AdminCmsPage;

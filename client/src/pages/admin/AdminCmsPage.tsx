import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Layers, 
  Briefcase, 
  Building2, 
  Image as ImageIcon, 
  Menu as MenuIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Globe2, 
  Upload, 
  Search, 
  Filter, 
  ArrowRight, 
  Save, 
  RefreshCw, 
  Copy, 
  Sliders, 
  Sparkles,
  AlertCircle,
  X,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Button } from '../../components/common/Button';
import { api } from '../../lib/api';
import { cn } from '../../lib/utils';

type CmsTab = 'overview' | 'pages' | 'services' | 'projects' | 'industries' | 'blogs' | 'media' | 'navigation';

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
        api.getServiceAnalytics(token), // provides 8 canonical services
        api.getPortfolioAnalytics(token), // provides 10 canonical projects
        api.getCmsIndustries(token),
        api.getAdminBlogs(token),
        api.getCmsMedia(token),
        api.getCmsNavigation(token),
      ]);

      if (ov?.data) setOverview(ov.data);
      if (pg?.data) setPages(pg.data);
      if (srv?.services) setServices(srv.services);
      if (prj?.projects) setProjects(prj.projects);
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
      await api.deleteCmsMedia(token, id);
      showNotification('Media asset deleted.');
      loadAllCmsData();
    } catch {
      showNotification('Failed to delete media asset.', 'error');
    }
  };

  const metrics = overview?.metrics || {
    publishedPages: 5,
    draftPages: 0,
    publishedProjects: 10,
    draftProjects: 0,
    publishedBlogs: 3,
    draftBlogs: 0,
    totalServices: 8,
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
              CMS Engine v1.0
            </span>
            <span className="text-xs font-mono text-slate-400">
              Live Production Content Architecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-warm-100 tracking-tight">
            Content Management System (CMS)
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Centralized hub to draft, update, organize, preview, and publish pages, service capabilities, laboratory case studies, technical journal articles, and media assets.
          </p>
        </div>

        {/* Global Quick Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => {
              setEditingBlog({
                title: '',
                slug: '',
                subtitle: '',
                excerpt: '',
                content: '<p>Write your technical analysis here...</p>',
                category: 'Artificial Intelligence',
                tags: ['AI', 'Engineering'],
                readTime: '5 min read',
                status: 'published',
                author: { name: 'Peace Haven Lead', role: 'Principal Architect' },
              });
              setIsCreatingBlog(true);
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
      <div className="flex items-center gap-1 sm:gap-2 border-b border-sage-500/20 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'CMS Overview', icon: Sparkles },
          { id: 'pages', label: 'Page Management', icon: FileText, badge: metrics.publishedPages },
          { id: 'services', label: '8 Services', icon: Layers, badge: metrics.totalServices },
          { id: 'projects', label: '10 Projects', icon: Briefcase, badge: metrics.publishedProjects },
          { id: 'industries', label: '10 Industries', icon: Building2, badge: metrics.totalIndustries },
          { id: 'blogs', label: 'Blog & Insights', icon: BookOpen, badge: metrics.publishedBlogs },
          { id: 'media', label: 'Media Library', icon: ImageIcon, badge: metrics.totalMedia },
          { id: 'navigation', label: 'Navigation & Menus', icon: MenuIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CmsTab)}
              className={cn(
                'inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap',
                active
                  ? 'border-champagne-400 text-champagne-300 font-semibold bg-white/5 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              <Icon className={cn('w-4 h-4', active ? 'text-champagne-400' : 'text-slate-400')} />
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

      {/* TAB 1: CMS OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Managed Pages</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-heading text-white">{metrics.publishedPages}</span>
                <span className="text-xs font-mono text-emerald-400">Published</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">{metrics.draftPages} Drafts</span>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Selected Works</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-heading text-white">{metrics.publishedProjects}</span>
                <span className="text-xs font-mono text-teal-400">Active</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Prototypes & Demonstrations</span>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Journal Articles</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-heading text-white">{metrics.publishedBlogs}</span>
                <span className="text-xs font-mono text-champagne-400">Live</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Public Insights Hub</span>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal-850/90 border border-sage-500/20">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Media Assets</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-heading text-white">{metrics.totalMedia}</span>
                <span className="text-xs font-mono text-indigo-400">Assets</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Images & Schematics</span>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recently Updated Content */}
            <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-champagne-400" />
                  <span>Recently Modified Content</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">Live Updates</span>
              </div>
              <div className="space-y-2.5">
                {(overview?.recentlyUpdated || []).map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/10 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-charcoal-800 text-champagne-300 font-mono">
                          {item.type}
                        </span>
                        <span className="font-medium text-slate-200">{item.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {new Date(item.updatedAt).toLocaleString()}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Admin Activity Log */}
            <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Administrative Audit History</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">Recent 10 Events</span>
              </div>
              <div className="space-y-2.5">
                {(overview?.recentActivity || []).map((log: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/10 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-champagne-300 text-[11px]">
                          [{log.action}]
                        </span>
                        <span className="text-slate-200">{log.entityTitle}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        By {log.performedBy} • {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {log.entityType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAGE MANAGEMENT */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Managed Website Pages
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update titles, hero copy, headings, section order, and search engine metadata without breaking routes.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-sage-500/20 text-slate-400 font-mono text-[11px] uppercase">
                    <th className="py-3 px-4">Page Identifier</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Route Path</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-500/10">
                  {pages.map((p) => (
                    <tr key={p.pageId} className="hover:bg-charcoal-800/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-champagne-300">
                        {p.pageId}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-white max-w-sm truncate">
                        {p.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{p.slug}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePagePublish(p.pageId, p.status)}
                          className={cn(
                            'px-2.5 py-0.5 rounded-full text-[10px] font-mono border transition-colors',
                            p.status === 'published'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                          )}
                        >
                          {p.status}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          onClick={async () => {
                            const res = await api.getCmsPage(token, p.pageId);
                            setEditingPage(res?.data || p);
                          }}
                          variant="outline"
                          size="sm"
                          leftIcon={<Edit3 className="w-3 h-3 text-champagne-400" />}
                        >
                          Edit Content & SEO
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 8 SERVICES */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Eight Specialized Service Divisions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage capability titles, benefits, engineering highlights, and display order.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((serv) => (
                <div key={serv.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-bold text-white text-sm">{serv.title}</span>
                      <span className="text-[11px] font-mono text-champagne-400 block">/services/{serv.slug}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-700/20 text-champagne-300 border border-champagne-500/20 font-mono">
                      {serv.division || 'Engineering Division'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {serv.shortDesc || 'Engineering mission-critical digital systems and specialized solutions.'}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-sage-500/10">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Published
                    </span>
                    <Link
                      to={`/services/${serv.slug}`}
                      target="_blank"
                      className="text-xs font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                    >
                      <span>Public Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 10 PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Ten Selected Works & Laboratory Case Studies
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage project case studies, statuses (Completed, Prototype, Demonstration), and assigned disciplines.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-bold text-white text-sm">{proj.title}</span>
                      <span className="text-[11px] font-mono text-champagne-400 block">/work/{proj.slug}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-800 text-champagne-300 font-mono border border-sage-500/20">
                      {proj.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-sage-500/10">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active Case Study
                    </span>
                    <Link
                      to={`/work/${proj.slug}`}
                      target="_blank"
                      className="text-xs font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                    >
                      <span>Explore Case Study</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 10 INDUSTRIES */}
      {activeTab === 'industries' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Ten Core Industry Categories
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage sector descriptions, related services, and domain positioning.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industries.map((ind) => (
                <div key={ind.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-white text-sm">{ind.title}</span>
                    <span className="text-[10px] font-mono text-champagne-400">Order: {ind.displayOrder}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{ind.shortDesc}</p>
                  <div className="pt-2 flex items-center justify-between border-t border-sage-500/10">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Published
                    </span>
                    <Link
                      to={`/industries/${ind.slug}`}
                      target="_blank"
                      className="text-xs font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                    >
                      <span>View Sector Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BLOG & INSIGHTS */}
      {activeTab === 'blogs' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Technical Blog & Insights Journal
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Publish articles, drafts, categories, and author credits for technical SEO marketing.
                </p>
              </div>
              <Button
                onClick={() => {
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
                variant="champagne"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Create New Article
              </Button>
            </div>

            <div className="space-y-3">
              {blogs.map((b) => (
                <div key={b.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-700/20 text-champagne-300 font-mono border border-champagne-500/20">
                        {b.category}
                      </span>
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-mono border',
                        b.status === 'published'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                      )}>
                        {b.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-heading font-bold text-white">{b.title}</h4>
                    <p className="text-xs text-slate-400 font-mono">By {b.author?.name} • {b.readTime || '5 min'}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/insights/${b.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-charcoal-800 text-slate-300 hover:text-white"
                      title="Public preview"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => {
                        setEditingBlog(b);
                        setIsCreatingBlog(false);
                      }}
                      className="p-2 rounded-lg bg-charcoal-800 text-champagne-400 hover:text-champagne-300"
                      title="Edit article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b.slug)}
                      className="p-2 rounded-lg bg-charcoal-800 text-rose-400 hover:text-rose-300"
                      title="Delete article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: MEDIA LIBRARY */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Media & Asset Library
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload, organize, preview, and manage images with accessible alt-text.
                </p>
              </div>
              <Button
                onClick={() => setIsUploadingMedia(true)}
                variant="champagne"
                size="sm"
                leftIcon={<Upload className="w-3.5 h-3.5" />}
              >
                Register Media Asset
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {mediaList.map((m) => (
                <div key={m._id || m.fileName} className="p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/20 space-y-2 group">
                  <div className="aspect-video w-full rounded-lg bg-charcoal-950 overflow-hidden relative">
                    <img src={m.url} alt={m.altText || m.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded bg-charcoal-900/90 text-champagne-300 font-mono">
                      {m.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white block truncate">{m.title}</span>
                    <span className="text-[10px] font-mono text-slate-400 block truncate">{m.fileName}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-sage-500/10">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(m.url);
                        showNotification('URL copied to clipboard.');
                      }}
                      className="text-[11px] font-mono text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy URL
                    </button>
                    <button
                      onClick={() => handleDeleteMedia(m._id)}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: NAVIGATION & MENUS */}
      {activeTab === 'navigation' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <h3 className="text-base font-heading font-semibold text-white mb-1">
              Navigation & Menu Structure
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Configure primary header navigation items, labels, routes, and visibility.
            </p>

            <div className="space-y-2">
              {navItems.map((item, idx) => (
                <div key={item._id || idx} className="p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-charcoal-800 text-champagne-400 font-mono flex items-center justify-center text-[11px]">
                      {item.order || idx + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="text-[11px] font-mono text-slate-400 block">{item.path}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-700/20 text-champagne-300">
                      {item.menu}
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAGE EDITOR MODAL */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal-900 border border-sage-500/30 w-full max-w-3xl rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-sage-500/20">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">
                  Edit Page: {editingPage.pageId.toUpperCase()}
                </h3>
                <span className="text-xs font-mono text-champagne-400">{editingPage.slug}</span>
              </div>
              <button onClick={() => setEditingPage(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Page Title</label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Hero Headline</label>
                <input
                  type="text"
                  value={editingPage.hero?.headline || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, hero: { ...editingPage.hero, headline: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Hero Subheadline</label>
                <textarea
                  rows={2}
                  value={editingPage.hero?.subheadline || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, hero: { ...editingPage.hero, subheadline: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={editingPage.seo?.description || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, description: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage-500/20">
              <Button onClick={() => setEditingPage(null)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={() => handleSavePage(editingPage)} variant="champagne" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* BLOG EDITOR MODAL */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal-900 border border-sage-500/30 w-full max-w-3xl rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-sage-500/20">
              <h3 className="text-lg font-heading font-bold text-white">
                {isCreatingBlog ? 'Create Technical Insight Article' : 'Edit Article'}
              </h3>
              <button onClick={() => setEditingBlog(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                  placeholder="Article Headline"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingBlog.slug}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                    className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
                    placeholder="article-slug"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Category</label>
                  <select
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                  >
                    {['Technology', 'Artificial Intelligence', 'FinTech', 'Robotics & Automation', 'Healthcare Technology', 'Web Development', 'Industry Insights'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                  placeholder="Concise technical summary..."
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Article Body (HTML/Text)</label>
                <textarea
                  rows={6}
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage-500/20">
              <Button onClick={() => setEditingBlog(null)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={() => handleSaveBlog(editingBlog)} variant="champagne" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
                Publish Article
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MEDIA UPLOAD MODAL */}
      {isUploadingMedia && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleUploadMedia} className="bg-charcoal-900 border border-sage-500/30 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-sage-500/20">
              <h3 className="text-base font-heading font-bold text-white">Register Media Asset</h3>
              <button type="button" onClick={() => setIsUploadingMedia(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Asset Title</label>
              <input
                type="text"
                required
                value={mediaUploadForm.title}
                onChange={(e) => setMediaUploadForm({ ...mediaUploadForm, title: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                placeholder="e.g. Robot Arm CAD Schematic"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">File Name</label>
              <input
                type="text"
                required
                value={mediaUploadForm.fileName}
                onChange={(e) => setMediaUploadForm({ ...mediaUploadForm, fileName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
                placeholder="schematic.png"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Asset URL / Path</label>
              <input
                type="text"
                required
                value={mediaUploadForm.url}
                onChange={(e) => setMediaUploadForm({ ...mediaUploadForm, url: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white font-mono"
                placeholder="/images/projects/blueprint.png"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Category</label>
              <select
                value={mediaUploadForm.category}
                onChange={(e) => setMediaUploadForm({ ...mediaUploadForm, category: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white"
              >
                {['Services', 'Projects', 'Industries', 'Hero', 'Blog', 'General'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Alternative Text (Alt)</label>
              <input
                type="text"
                value={mediaUploadForm.altText}
                onChange={(e) => setMediaUploadForm({ ...mediaUploadForm, altText: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs text-white"
                placeholder="Accessible screen-reader description"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-sage-500/20">
              <Button type="button" onClick={() => setIsUploadingMedia(false)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button type="submit" variant="champagne" size="sm">
                Save Asset
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminCmsPage;

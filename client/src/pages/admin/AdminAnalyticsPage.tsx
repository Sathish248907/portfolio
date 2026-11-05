import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Clock, 
  FileText, 
  Calendar, 
  Download, 
  RefreshCw, 
  ArrowUpRight, 
  Layers, 
  Briefcase, 
  Building2, 
  Globe2, 
  Smartphone, 
  Laptop, 
  Tablet, 
  ChevronRight,
  Filter,
  CheckCircle2,
  PieChart,
  Activity,
  ArrowRight
} from 'lucide-react';
import { api } from '../../lib/api';
import { SEO } from '../../components/common/SEO';
import { cn } from '../../lib/utils';

type PeriodType = 'today' | '7d' | '30d' | '90d' | 'custom';
type ActiveTabType = 'overview' | 'services' | 'industries' | 'portfolio' | 'funnel';

export const AdminAnalyticsPage: React.FC = () => {
  const [token] = useState<string>(() => localStorage.getItem('ph_admin_token') || 'ph-demo-jwt-token-verified-2026');
  const [period, setPeriod] = useState<PeriodType>('30d');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('overview');
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Data states
  const [overviewData, setOverviewData] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [industriesData, setIndustriesData] = useState<any[]>([]);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAnalytics = async () => {
    setIsRefreshing(true);
    try {
      const [ov, srv, ind, port, fnl] = await Promise.all([
        api.getAnalyticsOverview(token, period, customStart, customEnd),
        api.getServiceAnalytics(token, period),
        api.getIndustryAnalytics(token, period),
        api.getPortfolioAnalytics(token, period),
        api.getFunnelAnalytics(token, period),
      ]);

      if (ov) setOverviewData(ov);
      if (srv?.services) setServicesData(srv.services);
      if (ind?.industries) setIndustriesData(ind.industries);
      if (port?.projects) setPortfolioData(port.projects);
      if (fnl) setFunnelData(fnl);
    } catch (e) {
      console.error('Failed to load analytics intelligence', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllAnalytics();
  }, [period]);

  const handleExport = async (type: string) => {
    setIsExporting(true);
    try {
      await api.exportAnalyticsCsv(token, type, period);
    } finally {
      setIsExporting(false);
    }
  };

  const metrics = overviewData?.metrics || {
    uniqueVisitors: 0,
    totalPageViews: 0,
    avgEngagementSecs: 0,
    inquirySubmissions: 0,
    conversionRate: 0,
    newVisitors: 0,
    returningVisitors: 0,
    comparisons: {
      visitorsDelta: 0,
      pageViewsDelta: 0,
      durationDelta: 0,
      inquiriesDelta: 0,
      conversionRateDelta: 0,
    },
  };

  const timeline = overviewData?.dailyTimeline || [];
  const topPages = overviewData?.topPages || [];
  const trafficSources = overviewData?.trafficSources || [];
  const devices = overviewData?.devices || [];
  const countries = overviewData?.countries || [];

  // Compute SVG chart points for Timeline
  const chartPoints = useMemo(() => {
    if (!timeline.length) {
      return { visitorsLine: '', viewsLine: '', viewsArea: '', max: 100, coords: [] };
    }
    const maxVal = Math.max(...timeline.map((d: any) => Math.max(d.visitors || 0, d.pageViews || 0)), 10);
    const width = 800;
    const height = 220;
    const padding = 20;

    const coords = timeline.map((d: any, idx: number) => {
      const x = padding + (idx / (timeline.length - 1 || 1)) * (width - padding * 2);
      const yVisitors = height - padding - ((d.visitors || 0) / maxVal) * (height - padding * 2);
      const yViews = height - padding - ((d.pageViews || 0) / maxVal) * (height - padding * 2);
      return { x, yVisitors, yViews, ...d };
    });

    const visitorsLine = coords.map((c: any, i: number) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.yVisitors}`).join(' ');
    const viewsLine = coords.map((c: any, i: number) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.yViews}`).join(' ');
    const viewsArea = `${viewsLine} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

    return { visitorsLine, viewsLine, viewsArea, max: maxVal, coords };
  }, [timeline]);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <SEO 
        title="Analytics & Conversion Intelligence | Peace Haven Admin"
        description="Comprehensive website performance, visitor engagement, service demand, and multi-stage inquiry conversion analytics."
      />

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-sage-500/20">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-700/20 text-champagne-300 text-xs font-mono font-medium border border-champagne-500/30">
              <Activity className="w-3.5 h-3.5 text-champagne-400" />
              Telemetry Engine v1.0
            </span>
            <span className="text-xs font-mono text-slate-400">
              Live Aggregation: {overviewData?.reportingWindow ? `${new Date(overviewData.reportingWindow.start).toLocaleDateString()} — ${new Date(overviewData.reportingWindow.end).toLocaleDateString()}` : 'Past 30 Days'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-warm-100 tracking-tight">
            Analytics & Conversion Intelligence
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Real-time telemetry measuring visitor journeys, high-intent service engagement, portfolio interest, and Phase 6 lead funnel velocity.
          </p>
        </div>

        {/* Global Controls: Period Filters, Refresh & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period Tabs */}
          <div className="inline-flex rounded-xl bg-charcoal-850 p-1 border border-sage-500/20 shadow-inner">
            {(['today', '7d', '30d', '90d'] as PeriodType[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  'px-3 py-1.5 text-xs font-mono rounded-lg transition-all',
                  period === p
                    ? 'bg-teal-700 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-warm-100 hover:bg-charcoal-800'
                )}
              >
                {p === 'today' ? 'Today' : p === '7d' ? '7D' : p === '30d' ? '30D' : '90D'}
              </button>
            ))}
          </div>

          {/* Refresh Action */}
          <button
            onClick={fetchAllAnalytics}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-charcoal-850 border border-sage-500/25 hover:border-champagne-400/40 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            title="Refresh Data"
            aria-label="Refresh telemetry"
          >
            <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin text-champagne-400')} />
          </button>

          {/* Export CSV Dropdown */}
          <div className="relative group">
            <button
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 hover:border-champagne-400 text-champagne-300 hover:text-champagne-200 text-xs font-mono font-medium transition-all shadow-sm"
            >
              <Download className={cn('w-3.5 h-3.5', isExporting && 'animate-bounce')} />
              <span>Export CSV</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-charcoal-900 border border-sage-500/30 shadow-2xl p-1.5 hidden group-hover:block z-30">
              <button
                onClick={() => handleExport('overview')}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-charcoal-800 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>Overview Summary</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => handleExport('services')}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-charcoal-800 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>6 Services Report</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => handleExport('industries')}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-charcoal-800 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>10 Industries Report</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => handleExport('funnel')}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-charcoal-800 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>Conversion Funnel</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Metric 1: Unique Visitors */}
        <div className="rounded-2xl p-4 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Unique Visitors</span>
            <Users className="w-4 h-4 text-champagne-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-white">
              {metrics.uniqueVisitors.toLocaleString()}
            </span>
            <span className={cn(
              'inline-flex items-center text-xs font-mono font-medium',
              metrics.comparisons.visitorsDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {metrics.comparisons.visitorsDelta >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {metrics.comparisons.visitorsDelta > 0 ? `+${metrics.comparisons.visitorsDelta}%` : `${metrics.comparisons.visitorsDelta}%`}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">vs previous period</p>
        </div>

        {/* Metric 2: Total Page Views */}
        <div className="rounded-2xl p-4 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Page Views</span>
            <Eye className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-white">
              {metrics.totalPageViews.toLocaleString()}
            </span>
            <span className={cn(
              'inline-flex items-center text-xs font-mono font-medium',
              metrics.comparisons.pageViewsDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {metrics.comparisons.pageViewsDelta >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {metrics.comparisons.pageViewsDelta > 0 ? `+${metrics.comparisons.pageViewsDelta}%` : `${metrics.comparisons.pageViewsDelta}%`}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total route transitions</p>
        </div>

        {/* Metric 3: Avg Engagement Time */}
        <div className="rounded-2xl p-4 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Avg Engagement</span>
            <Clock className="w-4 h-4 text-champagne-300" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-white">
              {metrics.avgEngagementSecs}s
            </span>
            <span className={cn(
              'inline-flex items-center text-xs font-mono font-medium',
              metrics.comparisons.durationDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {metrics.comparisons.durationDelta >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {metrics.comparisons.durationDelta > 0 ? `+${metrics.comparisons.durationDelta}%` : `${metrics.comparisons.durationDelta}%`}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dwell time per page</p>
        </div>

        {/* Metric 4: Lead Inquiries Submitted */}
        <div className="rounded-2xl p-4 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Inquiries</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-white">
              {metrics.inquirySubmissions}
            </span>
            <span className={cn(
              'inline-flex items-center text-xs font-mono font-medium',
              metrics.comparisons.inquiriesDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {metrics.comparisons.inquiriesDelta >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {metrics.comparisons.inquiriesDelta > 0 ? `+${metrics.comparisons.inquiriesDelta}%` : `${metrics.comparisons.inquiriesDelta}%`}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Phase 6 project intakes</p>
        </div>

        {/* Metric 5: Conversion Rate */}
        <div className="rounded-2xl p-4 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Conversion Rate</span>
            <ArrowUpRight className="w-4 h-4 text-champagne-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-white">
              {metrics.conversionRate}%
            </span>
            <span className={cn(
              'inline-flex items-center text-xs font-mono font-medium',
              metrics.comparisons.conversionRateDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {metrics.comparisons.conversionRateDelta >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {metrics.comparisons.conversionRateDelta > 0 ? `+${metrics.comparisons.conversionRateDelta}%` : `${metrics.comparisons.conversionRateDelta}%`}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Inquiry / Unique Visitors</p>
        </div>

        {/* Metric 6: Visitor Retention */}
        <div className="rounded-2xl p-4 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Retention</span>
            <PieChart className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-white">
              {metrics.uniqueVisitors > 0 ? Math.round((metrics.returningVisitors / metrics.uniqueVisitors) * 100) : 0}%
            </span>
            <span className="text-xs font-mono text-slate-400">
              {metrics.returningVisitors} return
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{metrics.newVisitors} new visitors</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-sage-500/20 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'Traffic & Growth Overview', icon: BarChart3 },
          { id: 'services', label: '6 Service Divisions', icon: Layers },
          { id: 'industries', label: '10 Industry Sectors', icon: Building2 },
          { id: 'portfolio', label: '10 Portfolio Projects', icon: Briefcase },
          { id: 'funnel', label: '8-Stage Conversion Funnel', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTabType)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap',
                active
                  ? 'border-champagne-400 text-champagne-300 font-semibold bg-white/5 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              <Icon className={cn('w-4 h-4', active ? 'text-champagne-400' : 'text-slate-400')} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: OVERVIEW & GROWTH */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Visitor & Page View Growth Chart */}
          <div className="rounded-2xl p-6 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Visitor Growth & Traffic Timeline
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Daily page views and distinct visitor engagement over the selected reporting window
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="text-slate-300">Page Views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-champagne-400" />
                  <span className="text-slate-300">Unique Visitors</span>
                </div>
              </div>
            </div>

            {/* Responsive SVG Chart */}
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 220" className="w-full h-56 min-w-[600px] overflow-visible">
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#344B50" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#17232B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
                  <line
                    key={i}
                    x1="20"
                    y1={20 + pct * 180}
                    x2="780"
                    y2={20 + pct * 180}
                    stroke="#344B50"
                    strokeOpacity="0.3"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Area Fill for Page Views */}
                {chartPoints.viewsArea && (
                  <path d={chartPoints.viewsArea} fill="url(#viewsGradient)" />
                )}

                {/* Line 1: Page Views */}
                {chartPoints.viewsLine && (
                  <path
                    d={chartPoints.viewsLine}
                    fill="none"
                    stroke="#5EEAD4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Line 2: Visitors */}
                {chartPoints.visitorsLine && (
                  <path
                    d={chartPoints.visitorsLine}
                    fill="none"
                    stroke="#C4A77D"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Points */}
                {(chartPoints.coords || []).map((c: any, i: number) => (
                  <g key={i} className="group cursor-pointer">
                    <circle cx={c.x} cy={c.yViews} r="3" fill="#5EEAD4" className="hover:r-5 transition-all" />
                    <circle cx={c.x} cy={c.yVisitors} r="3" fill="#C4A77D" className="hover:r-5 transition-all" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Timeline X-Axis Dates */}
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2 px-4 border-t border-sage-500/10 pt-2">
              <span>{timeline[0]?.date || 'Start'}</span>
              <span>{timeline[Math.floor(timeline.length / 2)]?.date || 'Mid'}</span>
              <span>{timeline[timeline.length - 1]?.date || 'Latest'}</span>
            </div>
          </div>

          {/* Grid: Most Visited Pages & Traffic Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Visited Pages */}
            <div className="rounded-2xl p-6 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-teal-400" />
                  <span>Most Visited URLs</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">Top 10 Routes</span>
              </div>
              <div className="space-y-2.5">
                {topPages.map((page: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-charcoal-900/60 border border-sage-500/10 text-xs">
                    <span className="font-mono text-slate-300 truncate max-w-[280px]">
                      {page.path}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-mono">{page.views} views</span>
                      <span className="text-champagne-300 font-mono font-medium">{page.uniqueVisitors} visitors</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Source Channels */}
            <div className="rounded-2xl p-6 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-champagne-400" />
                  <span>Acquisition Channels & UTM Attribution</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">Inbound Sources</span>
              </div>
              <div className="space-y-3">
                {trafficSources.map((source: any, idx: number) => {
                  const total = trafficSources.reduce((acc: number, cur: any) => acc + (cur.visitors || 0), 0);
                  const pct = total > 0 ? Math.round(((source.visitors || 0) / total) * 100) : 0;

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-200">{source.source}</span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-slate-400">{source.visitors} visitors</span>
                          <span className="text-emerald-400 font-semibold">{source.inquiries || 0} leads</span>
                          <span className="text-champagne-400">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-charcoal-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-700 via-sage-500 to-champagne-400 rounded-full"
                          style={{ width: `${Math.max(5, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid: Device Categories, Browsers & Geography */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Device Categories */}
            <div className="rounded-2xl p-5 bg-charcoal-850/80 border border-sage-500/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-champagne-400" />
                <span>Device Categorization</span>
              </h4>
              <div className="space-y-2">
                {devices.map((d: any, idx: number) => {
                  const Icon = d.category === 'mobile' ? Smartphone : d.category === 'tablet' ? Tablet : Laptop;
                  return (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-charcoal-900/60 text-xs">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="capitalize text-slate-200">{d.category}</span>
                      </div>
                      <span className="font-mono text-champagne-300 font-medium">{d.count} ({d.visitors} v)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Browsers */}
            <div className="rounded-2xl p-5 bg-charcoal-850/80 border border-sage-500/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Top Browsers</span>
              </h4>
              <div className="space-y-2">
                {(overviewData?.browsers || []).map((b: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-charcoal-900/60 text-xs">
                    <span className="text-slate-200">{b.browser}</span>
                    <span className="font-mono text-slate-400">{b.count} sessions</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="rounded-2xl p-5 bg-charcoal-850/80 border border-sage-500/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Geographic Territory</span>
              </h4>
              <div className="space-y-2">
                {countries.slice(0, 5).map((c: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-charcoal-900/60 text-xs">
                    <span className="text-slate-200">{c.country}</span>
                    <span className="font-mono text-champagne-300">{c.visitors} visitors</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: 8 SPECIALIZED SERVICE DIVISIONS */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Six Specialized Service Divisions — Demand Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evaluating visitor engagement, CTA click-through rate, and project inquiry generation per service division.
                </p>
              </div>
              <button
                onClick={() => handleExport('services')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-900 text-xs font-mono text-champagne-300 border border-sage-500/30 hover:border-champagne-400 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-sage-500/20 text-slate-400 font-mono text-[11px] uppercase">
                    <th className="py-3 px-4">Service Division</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4 text-right">Page Views</th>
                    <th className="py-3 px-4 text-right">Unique Visitors</th>
                    <th className="py-3 px-4 text-right">CTA Clicks</th>
                    <th className="py-3 px-4 text-right">Inquiries</th>
                    <th className="py-3 px-4 text-right">Avg Dwell</th>
                    <th className="py-3 px-4 text-right">Conversion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-500/10">
                  {servicesData.map((s: any) => (
                    <tr key={s.id} className="hover:bg-charcoal-800/60 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <span>{s.title}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-700/20 text-champagne-300 font-mono border border-champagne-500/20">
                            /{s.slug}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{s.division}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-white">{s.pageViews}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">{s.uniqueVisitors}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-champagne-300">{s.ctaClicks}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">{s.inquirySubmissions}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400">{s.avgDurationSecs}s</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-champagne-400">
                        {s.conversionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: 10 INDUSTRY SECTORS */}
      {activeTab === 'industries' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Ten Industry Verticals — Market Engagement Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tracking audience sector affinity and inquiry origin across all published industry categories.
                </p>
              </div>
              <button
                onClick={() => handleExport('industries')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-900 text-xs font-mono text-champagne-300 border border-sage-500/30 hover:border-champagne-400 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-sage-500/20 text-slate-400 font-mono text-[11px] uppercase">
                    <th className="py-3 px-4">Industry Sector</th>
                    <th className="py-3 px-4">Focus Area</th>
                    <th className="py-3 px-4 text-right">Page Views</th>
                    <th className="py-3 px-4 text-right">Unique Visitors</th>
                    <th className="py-3 px-4 text-right">CTA Clicks</th>
                    <th className="py-3 px-4 text-right">Inquiries Generated</th>
                    <th className="py-3 px-4 text-right">Sector Conversion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-500/10">
                  {industriesData.map((ind: any) => (
                    <tr key={ind.id} className="hover:bg-charcoal-800/60 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">
                        <span>{ind.title}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{ind.shortDesc}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-white">{ind.pageViews}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">{ind.uniqueVisitors}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-champagne-300">{ind.ctaClicks}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">{ind.inquiriesGenerated}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-champagne-400">
                        {ind.conversionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: 10 PORTFOLIO PROJECTS */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Ten Selected Works & Laboratory Case Studies — Engagement
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evaluating individual project page interest, external live prototype interactions, and consultation triggers.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-sage-500/20 text-slate-400 font-mono text-[11px] uppercase">
                    <th className="py-3 px-4">Project Title</th>
                    <th className="py-3 px-4">Domain Category</th>
                    <th className="py-3 px-4 text-right">Case Views</th>
                    <th className="py-3 px-4 text-right">Visitors</th>
                    <th className="py-3 px-4 text-right">Avg Dwell</th>
                    <th className="py-3 px-4 text-right">External Demos</th>
                    <th className="py-3 px-4 text-right">Service Clicks</th>
                    <th className="py-3 px-4 text-right">Inquiry Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-500/10">
                  {portfolioData.map((p: any) => (
                    <tr key={p.id} className="hover:bg-charcoal-800/60 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">
                        <span>{p.title}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal-900 text-champagne-300 font-mono border border-sage-500/20">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-white">{p.pageViews}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">{p.uniqueVisitors}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400">{p.avgDurationSecs}s</td>
                      <td className="py-3.5 px-4 text-right font-mono text-teal-300">{p.externalClicks}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">{p.serviceClicks}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-champagne-400">{p.inquiryClicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: 8-STAGE INQUIRY CONVERSION FUNNEL */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Eight-Stage Project Inquiry & Lead Management Funnel
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Bridging front-end visitor curiosity with Phase 6 administrative intake, triage, qualification, and project conversion.
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-slate-400">Intake Velocity: <b className="text-white">{funnelData?.summary?.intakeVelocity || 0} leads</b></span>
                <span className="text-slate-400">Qualification: <b className="text-emerald-400">{funnelData?.summary?.adminQualificationRate || 0}%</b></span>
                <span className="text-slate-400">End-to-End: <b className="text-champagne-400">{funnelData?.summary?.endToEndConversionRate || 0}%</b></span>
              </div>
            </div>

            {/* Funnel Visual Stack */}
            <div className="space-y-3.5 pt-2">
              {(funnelData?.stages || []).map((stage: any, idx: number) => {
                const widthPct = Math.max(12, Math.min(100, stage.conversionFromTop));
                const isFinal = idx === (funnelData?.stages?.length || 8) - 1;

                return (
                  <div key={stage.step} className="p-4 rounded-xl bg-charcoal-900/80 border border-sage-500/20 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-teal-700/30 text-champagne-300 font-mono font-bold flex items-center justify-center text-[11px] border border-champagne-500/20">
                          {stage.step}
                        </span>
                        <div>
                          <span className="font-heading font-semibold text-warm-100 text-sm">
                            {stage.stageName}
                          </span>
                          <p className="text-[11px] text-slate-400">{stage.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs">
                        <div>
                          <span className="text-slate-400">Volume: </span>
                          <span className="font-bold text-white text-sm">{stage.count.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Overall: </span>
                          <span className="font-semibold text-champagne-300">{stage.conversionFromTop}%</span>
                        </div>
                        {idx > 0 && (
                          <div>
                            <span className="text-slate-400">Drop-off: </span>
                            <span className="font-semibold text-rose-400">-{stage.stageDropOff}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="h-3 rounded-full bg-charcoal-950 overflow-hidden relative">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          isFinal
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-400'
                            : 'bg-gradient-to-r from-teal-700 via-sage-500 to-champagne-400'
                        )}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;

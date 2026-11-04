import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Briefcase, 
  Clock, 
  AlertCircle,
  Eye,
  RefreshCw,
  Users,
  Shield,
  FileEdit,
  BarChart3,
  ScrollText,
  Settings,
  ShieldAlert,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { ProjectInquiry, AuditLogEntry, AdminDashboardMetrics } from '../../types';
import { projectsData } from '../../data/projectsData';
import { Button } from '../../components/common/Button';

export const AdminDashboardPage: React.FC = () => {
  const { token, user } = useAuth();
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<AdminDashboardMetrics>({
    totalUsers: 6,
    activeUsers: 6,
    inactiveUsers: 0,
    pendingInvitations: 1,
    availableRoles: 7,
  });
  const [recentActivities, setRecentActivities] = useState<AuditLogEntry[]>([]);
  const [securityEvents, setSecurityEvents] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [inquiriesData, statsData] = await Promise.all([
        api.getAdminInquiries(token || ''),
        api.getDashboardStats(token || ''),
      ]);

      if (Array.isArray(inquiriesData)) {
        setInquiries(inquiriesData);
      }
      if (statsData?.metrics) {
        setDashboardMetrics(statsData.metrics);
        setRecentActivities(statsData.recentActivities || []);
        setSecurityEvents(statsData.recentSecurityEvents || []);
      }
    } catch (e) {
      console.warn('Dashboard live refresh fallback', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const newCount = inquiries.filter((i) => (i.status || '').toLowerCase() === 'new').length;
  const inProgressCount = inquiries.filter((i) =>
    ['reviewing', 'in_discussion', 'proposal_sent', 'contacted'].includes((i.status || '').toLowerCase())
  ).length;

  const quickModules = [
    {
      title: 'Users & Staff',
      desc: 'Provision staff, assign roles, and audit invitations.',
      path: '/admin/users',
      icon: Users,
      badge: `${dashboardMetrics.activeUsers} Active`,
      color: 'text-teal-400',
    },
    {
      title: 'Roles & Permissions',
      desc: 'RBAC module matrix and custom access policies.',
      path: '/admin/roles-permissions',
      icon: Shield,
      badge: `${dashboardMetrics.availableRoles} Roles`,
      color: 'text-champagne-400',
    },
    {
      title: 'Project Inquiries',
      desc: 'Triage inbound commercial engineering leads.',
      path: '/admin/inquiries',
      icon: Inbox,
      badge: `${newCount} New`,
      color: 'text-amber-400',
    },
    {
      title: 'Content CMS',
      desc: 'Dynamic pages, services, case studies & blog journal.',
      path: '/admin/cms',
      icon: FileEdit,
      badge: 'Dynamic',
      color: 'text-sky-400',
    },
    {
      title: 'Telemetry Analytics',
      desc: 'Real-time visitor tracking and conversion funnel.',
      path: '/admin/analytics',
      icon: BarChart3,
      badge: 'Live',
      color: 'text-emerald-400',
    },
    {
      title: 'Audit & Compliance',
      desc: 'Immutable append-only administrative event log.',
      path: '/admin/audit-logs',
      icon: ScrollText,
      badge: 'Exportable',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white">Centralized Administration Console</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 uppercase tracking-widest">
              Phase 10 RBAC
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Role-governed operations, user provisioning, commercial inquiry pipeline, and immutable audit logging.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchDashboardData}
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
          <Button to="/admin/users" variant="champagne" size="sm" leftIcon={<Users className="w-3.5 h-3.5" />}>
            Manage Users
          </Button>
        </div>
      </div>

      {/* Primary Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">TOTAL INQUIRIES</span>
            <Inbox className="w-4 h-4 text-champagne-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-white block">{inquiries.length}</span>
          <span className="text-[11px] text-champagne-400 font-mono">Inbound engineering leads</span>
        </div>

        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">NEW ACTION REQUIRED</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-amber-300 block">{newCount}</span>
          <span className="text-[11px] text-slate-400 font-mono">Pending scoping review</span>
        </div>

        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">ACTIVE ADMINISTRATORS</span>
            <UserCheck className="w-4 h-4 text-teal-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-teal-300 block">{dashboardMetrics.activeUsers}</span>
          <span className="text-[11px] text-slate-400 font-mono">
            {dashboardMetrics.pendingInvitations} pending invitations
          </span>
        </div>

        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">GOVERNED ROLES</span>
            <Shield className="w-4 h-4 text-champagne-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-champagne-300 block">{dashboardMetrics.availableRoles}</span>
          <span className="text-[11px] text-slate-400 font-mono">7 Tiered RBAC Hierarchy</span>
        </div>
      </div>

      {/* Quick Access Modules Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono text-champagne-400 uppercase tracking-wider">Administrative Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickModules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.path}
                to={m.path}
                className="group bg-charcoal-850/80 hover:bg-charcoal-800/90 p-5 rounded-2xl border border-sage-700/30 hover:border-champagne-500/40 transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-charcoal-900 border border-sage-700/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className={`w-5 h-5 ${m.color}`} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-slate-300 border border-sage-700/40">
                      {m.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-champagne-300 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-sage-700/20 flex items-center justify-between text-xs text-slate-400 group-hover:text-champagne-300 transition-colors">
                  <span className="font-mono text-[11px]">Open module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activity Feeds: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recent Administrative Activity */}
        <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-sage-700/30 pb-3">
            <div className="flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-champagne-400" />
              <h2 className="font-heading text-base font-bold text-white">Recent Admin Activities</h2>
            </div>
            <Link to="/admin/audit-logs" className="text-xs text-champagne-400 hover:text-champagne-300 font-mono">
              View Audit Log &rarr;
            </Link>
          </div>

          {recentActivities.length === 0 ? (
            <p className="text-slate-500 text-xs py-6 text-center font-mono">No recent activity recorded.</p>
          ) : (
            <div className="divide-y divide-sage-700/20">
              {recentActivities.slice(0, 6).map((log) => (
                <div key={log._id || log.id} className="py-3 flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium truncate">{log.changeSummary}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                      <span>{log.actorEmail}</span>
                      <span>&bull;</span>
                      <span className="uppercase text-champagne-400/90">{log.module}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Security Events & Access Control */}
        <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-sage-700/30 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h2 className="font-heading text-base font-bold text-white">Security & Auth Events</h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-emerald-400 border border-emerald-500/30">
              Active Protection
            </span>
          </div>

          {securityEvents.length === 0 ? (
            <p className="text-slate-500 text-xs py-6 text-center font-mono">No security warnings or lockout events.</p>
          ) : (
            <div className="divide-y divide-sage-700/20">
              {securityEvents.slice(0, 6).map((sec) => (
                <div key={sec._id || sec.id} className="py-3 flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium truncate">{sec.changeSummary}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                      <span>IP: {sec.ipAddress || '127.0.0.1'}</span>
                      <span>&bull;</span>
                      <span className={sec.result === 'failure' ? 'text-red-400' : 'text-amber-400'}>
                        {sec.action}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {new Date(sec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Inquiries Section */}
      <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-sage-700/30 pb-4">
          <div className="space-y-0.5">
            <h2 className="font-heading text-lg font-bold text-white">Recent Project Inquiries</h2>
            <p className="text-slate-400 text-xs">Direct inbound leads submitted via the multi-step intake flow.</p>
          </div>
          <Link to="/admin/inquiries" className="text-xs text-champagne-400 hover:text-champagne-300 font-mono flex items-center gap-1">
            <span>View All &rarr;</span>
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-mono">
            No inquiries recorded yet. Test by submitting one through <Link to="/start-a-project" className="text-champagne-400 underline">Start a Project</Link>.
          </div>
        ) : (
          <div className="divide-y divide-sage-700/20">
            {inquiries.slice(0, 5).map((inquiry) => (
              <div key={inquiry.referenceNumber} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-champagne-400 font-semibold">{inquiry.referenceNumber}</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-900 border border-sage-700/40 text-slate-300 text-[10px] font-mono">
                      {inquiry.service}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      (inquiry.status || '').toLowerCase() === 'new'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : (inquiry.status || '').toLowerCase() === 'won' || (inquiry.status || '').toLowerCase() === 'converted'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium">
                    {inquiry.clientName} &bull; <span className="text-slate-400">{inquiry.companyName}</span>
                  </p>
                  <p className="text-slate-400 text-[11px] line-clamp-1">{inquiry.projectRequirements}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-slate-500 font-mono text-[10px]">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    to="/admin/inquiries"
                    className="p-1.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 border border-sage-700/40 text-slate-300 hover:text-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

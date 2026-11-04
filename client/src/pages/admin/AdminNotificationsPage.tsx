import React, { useState, useEffect } from 'react';
import {
  Bell,
  Mail,
  FileCode,
  Search,
  Check,
  CheckCheck,
  Archive,
  RefreshCw,
  ExternalLink,
  Send,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Inbox,
  FileText,
  UserCheck,
  Calendar,
  ShieldAlert,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { notificationsApi } from '../../services/api/notificationsApi';
import {
  InAppNotification,
  EmailLogEntry,
  EmailTemplateItem,
} from '../../types';

export const AdminNotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'in_app' | 'email_logs' | 'templates'>('in_app');

  // Metrics
  const [metrics, setMetrics] = useState({
    total: 0,
    unread: 0,
    read: 0,
    failedEmails: 0,
  });

  // In-App Notifications State
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // Email Logs State
  const [emailLogs, setEmailLogs] = useState<EmailLogEntry[]>([]);
  const [logStatusFilter, setLogStatusFilter] = useState('all');
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [retryingLogId, setRetryingLogId] = useState<string | null>(null);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Templates State
  const [templates, setTemplates] = useState<EmailTemplateItem[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplateItem | null>(null);
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [previewSubject, setPreviewSubject] = useState('');
  const [previewTab, setPreviewTab] = useState<'html' | 'text'>('html');
  const [testRecipient, setTestRecipient] = useState('');
  const [testSending, setTestSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const res = await notificationsApi.getNotifications({
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        unreadOnly,
        search: searchQuery,
      });
      if (res?.data) {
        setNotifications(res.data.notifications || []);
        if (res.data.metrics) {
          setMetrics(res.data.metrics);
        }
      }
    } catch {
      // Fail safely
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchEmailLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await notificationsApi.getEmailLogs({
        status: logStatusFilter !== 'all' ? logStatusFilter : undefined,
        search: logSearchQuery,
      });
      if (res?.data?.logs) {
        setEmailLogs(res.data.logs);
      }
    } catch {
      // Fail safely
    } finally {
      setLoadingLogs(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const tpls = await notificationsApi.getTemplates();
      setTemplates(tpls || []);
    } catch {
      // Fail safely
    }
  };

  useEffect(() => {
    if (activeTab === 'in_app') {
      fetchNotifications();
    } else if (activeTab === 'email_logs') {
      fetchEmailLogs();
    } else if (activeTab === 'templates') {
      fetchTemplates();
    }
  }, [activeTab, categoryFilter, unreadOnly, searchQuery, logStatusFilter, logSearchQuery]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id || n.id === id ? { ...n, isRead: true } : n))
      );
      setMetrics((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1), read: prev.read + 1 }));
    } catch {
      // Fail safely
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setMetrics((prev) => ({ ...prev, read: prev.read + prev.unread, unread: 0 }));
      showToast('All notifications marked as read.');
    } catch {
      // Fail safely
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await notificationsApi.archiveNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id && n.id !== id));
      showToast('Notification archived.');
    } catch {
      // Fail safely
    }
  };

  const handleRetryEmail = async (logId: string) => {
    setRetryingLogId(logId);
    try {
      await notificationsApi.retryEmail(logId);
      showToast('Email retry executed successfully.');
      fetchEmailLogs();
    } catch {
      showToast('Failed to retry email delivery.');
    } finally {
      setRetryingLogId(null);
    }
  };

  const handleOpenPreview = async (template: EmailTemplateItem) => {
    setPreviewTemplate(template);
    setTestRecipient('');
    try {
      const preview = await notificationsApi.previewTemplate(template.slug);
      setPreviewHtml(preview.html);
      setPreviewText(preview.text);
      setPreviewSubject(preview.subject);
    } catch {
      setPreviewHtml('<p>Error generating preview</p>');
      setPreviewText('Error generating preview');
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipient || !previewTemplate) return;

    setTestSending(true);
    try {
      await notificationsApi.sendTestEmail({
        recipient: testRecipient,
        templateSlug: previewTemplate.slug,
      });
      showToast(`Test email successfully sent to ${testRecipient}`);
    } catch {
      showToast('Failed to send test email.');
    } finally {
      setTestSending(false);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'inquiry':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Inbox className="w-3 h-3" /> Inquiry
          </span>
        );
      case 'cms':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30">
            <FileText className="w-3 h-3" /> CMS
          </span>
        );
      case 'user_management':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <UserCheck className="w-3 h-3" /> User Admin
          </span>
        );
      case 'reminder':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Calendar className="w-3 h-3" /> Reminder
          </span>
        );
      case 'security':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30">
            <ShieldAlert className="w-3 h-3" /> Security
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-500/10 text-slate-300 border border-slate-500/30">
            <AlertTriangle className="w-3 h-3" /> System
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Sent
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      case 'retrying':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <RefreshCw className="w-3 h-3 animate-spin" /> Retrying
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" /> Processing
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
              Phase 11 Production System
            </span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">Centralized Communication & Alerts</h1>
          <p className="text-sm text-slate-400">
            Automated email delivery logs, in-app staff alerts, and email template management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (activeTab === 'in_app') fetchNotifications();
              else if (activeTab === 'email_logs') fetchEmailLogs();
              else fetchTemplates();
            }}
            className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase font-mono">Total Alerts</span>
            <Bell className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-heading">{metrics.total}</div>
          <p className="text-[11px] text-slate-500 mt-1">Logged in-app administrative alerts</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase font-mono">Unread</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-cyan-300 font-heading">{metrics.unread}</div>
          <p className="text-[11px] text-slate-500 mt-1">Awaiting staff review</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase font-mono">Read & Triaged</span>
            <CheckCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-200 font-heading">{metrics.read}</div>
          <p className="text-[11px] text-slate-500 mt-1">Processed notifications</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase font-mono">Failed Deliveries</span>
            <Mail className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 font-heading">{metrics.failedEmails}</div>
          <p className="text-[11px] text-slate-500 mt-1">Emails requiring manual retry</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('in_app')}
          className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'in_app'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>In-App Notifications</span>
          {metrics.unread > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] font-mono rounded-full bg-cyan-500/20 text-cyan-300">
              {metrics.unread}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('email_logs')}
          className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'email_logs'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email Delivery Logs</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'templates'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Email Templates</span>
        </button>
      </div>

      {/* Tab 1: In-App Notifications */}
      {activeTab === 'in_app' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search alert title or body..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-800/80 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Categories</option>
                <option value="inquiry">Inquiries & Leads</option>
                <option value="cms">CMS Publishing</option>
                <option value="user_management">User Management</option>
                <option value="reminder">Reminders</option>
                <option value="security">Security & System</option>
              </select>

              {/* Unread Toggle */}
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={unreadOnly}
                  onChange={(e) => setUnreadOnly(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 bg-slate-800"
                />
                <span>Unread only</span>
              </label>
            </div>

            {/* Batch Action */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleMarkAllAsRead}
                disabled={metrics.unread === 0}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-40 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>

          {/* Notifications Feed */}
          {loadingNotifications ? (
            <div className="py-12 text-center text-sm text-slate-500">Loading administrative alerts...</div>
          ) : notifications.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/40 border border-slate-800 rounded-xl">
              <Bell className="w-10 h-10 text-slate-600 mx-auto mb-3 opacity-40" />
              <h3 className="text-base font-semibold text-slate-300 font-heading">No notifications found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                All caught up. When inquiries arrive, staff are invited, or security alerts fire, they will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {notifications.map((notif) => (
                <div
                  key={notif._id || notif.id}
                  className={`p-4 rounded-xl border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    !notif.isRead
                      ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="mt-0.5">{getCategoryBadge(notif.category)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-semibold truncate ${!notif.isRead ? 'text-white' : 'text-slate-300'}`}>
                          {notif.title}
                        </h4>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-ping" />
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{notif.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 font-mono">
                        <span>{new Date(notif.createdAt).toLocaleString()}</span>
                        {notif.relatedResourceId && (
                          <span>&bull; Ref: {notif.relatedResourceId}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {notif.actionUrl && (
                      <a
                        href={notif.actionUrl}
                        className="px-2.5 py-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <span>Navigate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {!notif.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notif._id || notif.id || '')}
                        className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleArchive(notif._id || notif.id || '')}
                      className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                      title="Archive alert"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Email Delivery Logs */}
      {activeTab === 'email_logs' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search recipient or subject..."
                  value={logSearchQuery}
                  onChange={(e) => setLogSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={logStatusFilter}
                onChange={(e) => setLogStatusFilter(e.target.value)}
                className="bg-slate-800/80 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Delivery States</option>
                <option value="sent">Confirmed Sent</option>
                <option value="failed">Failed / Undelivered</option>
                <option value="retrying">Retrying</option>
                <option value="processing">Processing</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Recipient</th>
                    <th className="px-4 py-3">Subject & Template</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Attempts</th>
                    <th className="px-4 py-3">Last Attempt</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {loadingLogs ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                        Loading email delivery history...
                      </td>
                    </tr>
                  ) : emailLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                        No email logs matching criteria.
                      </td>
                    </tr>
                  ) : (
                    emailLogs.map((log) => (
                      <tr key={log._id || log.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{log.recipient}</div>
                          {log.recipientName && (
                            <div className="text-[11px] text-slate-400">{log.recipientName}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <div className="text-slate-200 font-medium truncate">{log.subject}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{log.templateName || log.templateId}</div>
                          {log.failureReason && (
                            <div className="text-[11px] text-rose-400 font-mono mt-0.5 truncate" title={log.failureReason}>
                              Err: {log.failureReason}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                          {log.category}
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(log.status)}</td>
                        <td className="px-4 py-3 font-mono text-slate-300">{log.attemptCount}</td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                          {new Date(log.lastAttemptAt || log.createdAt).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {log.status === 'failed' && (
                            <button
                              onClick={() => handleRetryEmail(log._id || log.id || '')}
                              disabled={retryingLogId === (log._id || log.id)}
                              className="px-2.5 py-1 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors flex items-center gap-1 ml-auto"
                            >
                              <RefreshCw className={`w-3 h-3 ${retryingLogId === (log._id || log.id) ? 'animate-spin' : ''}`} />
                              <span>Retry</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Email Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.slug}
                className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-cyan-400 border border-slate-700">
                      {tpl.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${tpl.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                      {tpl.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-heading">{tpl.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{tpl.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-500 font-mono block mb-1.5 uppercase">Placeholders:</span>
                    <div className="flex flex-wrap gap-1">
                      {tpl.variables?.map((v) => (
                        <span key={v} className="px-1.5 py-0.5 bg-slate-800 text-[10px] font-mono text-slate-300 rounded">
                          {`{{${v}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{tpl.slug}</span>
                  <button
                    onClick={() => handleOpenPreview(tpl)}
                    className="px-3 py-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview & Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Preview & Test Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-3xl w-full rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div>
                <h3 className="text-base font-bold text-white font-heading">{previewTemplate.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Subject: {previewSubject}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Subnav */}
            <div className="flex items-center justify-between px-6 py-2 border-b border-slate-800 bg-slate-950/20">
              <div className="flex gap-4">
                <button
                  onClick={() => setPreviewTab('html')}
                  className={`text-xs font-medium pb-1 border-b-2 ${
                    previewTab === 'html'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400'
                  }`}
                >
                  Compiled HTML Preview
                </button>
                <button
                  onClick={() => setPreviewTab('text')}
                  className={`text-xs font-medium pb-1 border-b-2 ${
                    previewTab === 'text'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400'
                  }`}
                >
                  Plain-Text Fallback
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-500">
                Peace Haven Charcoal Palette (#17232B)
              </span>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-950/60">
              {previewTab === 'html' ? (
                <div
                  className="rounded-xl overflow-hidden border border-slate-800 shadow-xl"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              ) : (
                <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 whitespace-pre-wrap">
                  {previewText}
                </pre>
              )}
            </div>

            {/* Send Test Dispatch Form */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
              <form onSubmit={handleSendTestEmail} className="flex gap-2 items-center">
                <input
                  type="email"
                  placeholder="Enter authorized test recipient email..."
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  required
                />
                <button
                  type="submit"
                  disabled={testSending}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testSending ? 'Sending...' : 'Send Test Mail'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

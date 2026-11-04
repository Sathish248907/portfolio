import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Check,
  Trash2,
  ExternalLink,
  RefreshCw,
  User,
  Inbox,
  AlertTriangle,
} from 'lucide-react';
import { notificationsApi } from '../../services/api/notificationsApi';
import { ReminderItem, ReminderPriority } from '../../types';

export const AdminRemindersPage: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [metrics, setMetrics] = useState({
    totalPending: 0,
    todayCount: 0,
    upcomingCount: 0,
    overdueCount: 0,
    completedCount: 0,
  });
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'upcoming' | 'overdue' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueAt: '',
    priority: 'medium' as ReminderPriority,
    inquiryReference: '',
    clientName: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getReminders({
        filter: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery,
      });
      if (res?.data) {
        setReminders(res.data.reminders || []);
        if (res.data.metrics) {
          setMetrics(res.data.metrics);
        }
      }
    } catch {
      // Fail safely
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [activeFilter, searchQuery]);

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueAt) return;

    setSubmitting(true);
    try {
      await notificationsApi.createReminder(formData);
      showToast('Follow-up reminder scheduled successfully.');
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        dueAt: '',
        priority: 'medium',
        inquiryReference: '',
        clientName: '',
      });
      fetchReminders();
    } catch {
      showToast('Failed to create reminder.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await notificationsApi.completeReminder(id);
      showToast('Reminder marked as completed.');
      fetchReminders();
    } catch {
      showToast('Failed to update reminder.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) return;
    try {
      await notificationsApi.deleteReminder(id);
      showToast('Reminder deleted.');
      fetchReminders();
    } catch {
      showToast('Failed to delete reminder.');
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">Urgent</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-medium rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Medium</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-medium rounded bg-slate-800 text-slate-400 border border-slate-700">Low</span>;
    }
  };

  const getDueDateLabel = (dueDateStr: string, status: string) => {
    if (status === 'completed') {
      return <span className="text-emerald-400 font-mono text-xs flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>;
    }

    const due = new Date(dueDateStr);
    const now = new Date();
    const isOverdue = due < now;

    if (isOverdue) {
      return (
        <span className="text-rose-400 font-mono text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> Overdue by {Math.ceil((now.getTime() - due.getTime()) / (1000 * 3600))}h
        </span>
      );
    }

    const hoursUntil = Math.ceil((due.getTime() - now.getTime()) / (1000 * 3600));
    if (hoursUntil <= 24) {
      return (
        <span className="text-amber-400 font-mono text-xs flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Due in {hoursUntil}h (Today)
        </span>
      );
    }

    return (
      <span className="text-cyan-400 font-mono text-xs flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5" /> {due.toLocaleDateString([], { month: 'short', day: 'numeric' })} at {due.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
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
            <span className="px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
              Inquiry Pipeline Operations
            </span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">Lead Follow-Up & Reminders</h1>
          <p className="text-sm text-slate-400">
            Schedule enterprise scoping calls, track proposal delivery deadlines, and manage lead reminders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchReminders}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700 rounded-lg transition-colors"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 shadow-lg shadow-amber-900/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Follow-Up</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase text-slate-400 mb-1">Pending</div>
          <div className="text-2xl font-bold text-white font-heading">{metrics.totalPending}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase text-amber-400 mb-1">Due Today</div>
          <div className="text-2xl font-bold text-amber-300 font-heading">{metrics.todayCount}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase text-cyan-400 mb-1">Upcoming</div>
          <div className="text-2xl font-bold text-cyan-300 font-heading">{metrics.upcomingCount}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase text-rose-400 mb-1">Overdue</div>
          <div className="text-2xl font-bold text-rose-400 font-heading">{metrics.overdueCount}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase text-emerald-400 mb-1">Completed</div>
          <div className="text-2xl font-bold text-emerald-300 font-heading">{metrics.completedCount}</div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'today', 'upcoming', 'overdue', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                activeFilter === tab
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/40'
                  : 'text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search lead or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Reminders Feed */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading follow-ups...</div>
      ) : reminders.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 border border-slate-800 rounded-xl">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-semibold text-slate-300 font-heading">No follow-ups found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No reminders match the selected criteria. Use the "Schedule Follow-Up" button above to add one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reminders.map((rem) => (
            <div
              key={rem._id || rem.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                rem.status === 'completed'
                  ? 'bg-slate-900/30 border-slate-800/60 opacity-70'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Complete checkbox */}
                {rem.status === 'pending' ? (
                  <button
                    onClick={() => handleComplete(rem._id || rem.id || '')}
                    className="w-6 h-6 rounded-lg border-2 border-slate-600 hover:border-emerald-400 flex items-center justify-center text-transparent hover:text-emerald-400 transition-colors shrink-0 mt-0.5"
                    title="Mark as completed"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {getPriorityBadge(rem.priority)}
                    {getDueDateLabel(rem.dueAt, rem.status)}
                    {rem.inquiryReference && (
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Ref: {rem.inquiryReference}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-bold font-heading ${rem.status === 'completed' ? 'line-through text-slate-400' : 'text-white'}`}>
                    {rem.title}
                  </h3>

                  {rem.description && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{rem.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400 font-mono">
                    {rem.clientName && (
                      <span>Client: <strong className="text-slate-200">{rem.clientName}</strong></span>
                    )}
                    <span>Assigned: <strong className="text-slate-200">{rem.assignedToName || 'Admin'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {rem.inquiryReference && (
                  <a
                    href={`/admin/inquiries?search=${rem.inquiryReference}`}
                    className="px-2.5 py-1 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>Lead Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  onClick={() => handleDelete(rem._id || rem.id || '')}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Reminder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <h3 className="text-lg font-bold text-white font-heading">Schedule Follow-Up Reminder</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                  Reminder Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Follow-up on pricing proposal"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                  Due Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.dueAt}
                  onChange={(e) => setFormData({ ...formData, dueAt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as ReminderPriority })}
                    className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                    Inquiry Ref
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PH-MW1O-4412"
                    value={formData.inquiryReference}
                    onChange={(e) => setFormData({ ...formData, inquiryReference: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                  Client / Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vanguard Financials"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1">
                  Action Brief / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Details on what needs to be delivered or discussed..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Scheduling...' : 'Save Reminder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  Bell,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Save,
  Inbox,
  UserCheck,
  Calendar,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { notificationsApi } from '../../services/api/notificationsApi';
import { NotificationPreferences } from '../../types';

export const AdminNotificationSettingsPage: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    categories: {
      inquiry: { inApp: true, email: true },
      assignment: { inApp: true, email: true },
      statusUpdate: { inApp: true, email: false },
      cms: { inApp: true, email: false },
      userManagement: { inApp: true, email: true },
      reminder: { inApp: true, email: true },
      security: { inApp: true, email: true },
    },
    frequency: 'immediate',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const fetchPrefs = async () => {
      setLoading(true);
      try {
        const prefs = await notificationsApi.getPreferences();
        if (prefs?.categories) {
          setPreferences(prefs);
        }
      } catch {
        // Fail safely
      } finally {
        setLoading(false);
      }
    };
    fetchPrefs();
  }, []);

  const handleToggle = (
    categoryKey: keyof NotificationPreferences['categories'],
    channel: 'inApp' | 'email'
  ) => {
    // Security notifications cannot be disabled
    if (categoryKey === 'security') return;

    setPreferences((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [categoryKey]: {
          ...prev.categories[categoryKey],
          [channel]: !prev.categories[categoryKey][channel],
        },
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await notificationsApi.updatePreferences(preferences);
      showToast('Notification preferences saved successfully.');
    } catch {
      showToast('Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  const categoryConfigs: {
    key: keyof NotificationPreferences['categories'];
    title: string;
    description: string;
    icon: React.ReactNode;
    isMandatory?: boolean;
  }[] = [
    {
      key: 'inquiry',
      title: 'New Client Inquiries',
      description: 'Receive real-time notifications when a prospective client submits an engineering requirements form.',
      icon: <Inbox className="w-5 h-5 text-cyan-400" />,
    },
    {
      key: 'assignment',
      title: 'Lead Assignments',
      description: 'Alerts when another administrator or lead manager assigns an active client inquiry to you.',
      icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      key: 'statusUpdate',
      title: 'Inquiry Status Updates',
      description: 'Notifications when inquiry progression milestones change (e.g. Scoping, Proposal Sent, Won).',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    },
    {
      key: 'cms',
      title: 'CMS & Editorial Publishing',
      description: 'Alerts when dynamic pages, case studies, or technical insight articles are drafted or published.',
      icon: <FileText className="w-5 h-5 text-blue-400" />,
    },
    {
      key: 'userManagement',
      title: 'User Management & Invitations',
      description: 'Notifications when new administrators are invited, accept staff invites, or update account roles.',
      icon: <UserCheck className="w-5 h-5 text-purple-400" />,
    },
    {
      key: 'reminder',
      title: 'Follow-Up Reminders',
      description: 'Alerts when scheduled inquiry follow-ups and client deliverables are approaching or overdue.',
      icon: <Calendar className="w-5 h-5 text-amber-400" />,
    },
    {
      key: 'security',
      title: 'Security & System Alerts',
      description: 'Critical alerts regarding brute-force lockouts, unauthorized privilege attempts, and server events.',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      isMandatory: true,
    },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
            Preferences & Routing
          </span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-white">Notification & Alert Settings</h1>
        <p className="text-sm text-slate-400">
          Configure which events dispatch in-app notifications and automated emails to your account.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Categories Matrix */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
          <div className="p-4 bg-slate-950/40 flex items-center justify-between text-xs font-mono uppercase text-slate-400">
            <span>Notification Category</span>
            <div className="flex items-center gap-8 pr-4">
              <span className="flex items-center gap-1.5"><Bell className="w-3.5 h-3.5 text-cyan-400" /> In-App</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-400" /> Email</span>
            </div>
          </div>

          {categoryConfigs.map((cat) => {
            const pref = preferences.categories[cat.key];
            return (
              <div
                key={cat.key}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/20 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                    {cat.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white font-heading">{cat.title}</h3>
                      {cat.isMandatory && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.2 rounded-full">
                          <Lock className="w-2.5 h-2.5" /> Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xl">{cat.description}</p>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-8 self-end sm:self-center pr-4 shrink-0">
                  {/* In-App Toggle */}
                  <label
                    className={`relative inline-flex items-center ${
                      cat.isMandatory ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={pref?.inApp}
                      disabled={cat.isMandatory}
                      onChange={() => handleToggle(cat.key, 'inApp')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>

                  {/* Email Toggle */}
                  <label
                    className={`relative inline-flex items-center ${
                      cat.isMandatory ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={pref?.email}
                      disabled={cat.isMandatory}
                      onChange={() => handleToggle(cat.key, 'email')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Frequency Settings Card */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-base font-bold text-white font-heading mb-1">Email Delivery Frequency</h3>
          <p className="text-xs text-slate-400 mb-4">Choose how email alerts are packaged for non-urgent events.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                preferences.frequency === 'immediate'
                  ? 'bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-950/20'
                  : 'bg-slate-800/40 border-slate-700/80 text-slate-400'
              }`}
            >
              <input
                type="radio"
                name="frequency"
                value="immediate"
                checked={preferences.frequency === 'immediate'}
                onChange={() => setPreferences({ ...preferences, frequency: 'immediate' })}
                className="mt-1 text-cyan-500 focus:ring-0 bg-slate-800 border-slate-600"
              />
              <div>
                <strong className="text-sm font-semibold text-white block">Immediate Alerts (Recommended)</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Deliver transactional notifications immediately as events occur across the platform.
                </p>
              </div>
            </label>

            <label
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                preferences.frequency === 'daily_digest'
                  ? 'bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-950/20'
                  : 'bg-slate-800/40 border-slate-700/80 text-slate-400'
              }`}
            >
              <input
                type="radio"
                name="frequency"
                value="daily_digest"
                checked={preferences.frequency === 'daily_digest'}
                onChange={() => setPreferences({ ...preferences, frequency: 'daily_digest' })}
                className="mt-1 text-cyan-500 focus:ring-0 bg-slate-800 border-slate-600"
              />
              <div>
                <strong className="text-sm font-semibold text-white block">Daily Digest Summary</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Aggregate standard editorial and status updates into a consolidated morning briefing.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Notification Preferences'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

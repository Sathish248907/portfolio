import React, { useState, useEffect } from 'react';
import { 
  User, 
  KeyRound, 
  Shield, 
  Laptop, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  LogOut, 
  RefreshCw,
  Save,
  X
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { AdminSessionInfo, AuditLogEntry } from '../../types';
import { Button } from '../../components/common/Button';
import { cn } from '../../lib/utils';

export const AdminProfilePage: React.FC = () => {
  const { token, user: authUser, login } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<AdminSessionInfo[]>([]);
  const [personalActivity, setPersonalActivity] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Forms
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminProfile(token || '');
      if (data) {
        setProfile(data);
        setName(data.name || '');
        setProfileImage(data.profileImage || '');
        setSessions(data.activeSessions || []);
        setPersonalActivity(data.recentActivity || []);
      }
    } catch (e) {
      console.warn('Profile fetch fallback', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const res = await api.updateAdminProfile(token || '', { name, profileImage });
      if (res?.success) {
        showNotification('success', 'Profile updated successfully.');
        if (authUser) {
          login(token || '', { ...authUser, name });
        }
        fetchProfileData();
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showNotification('error', 'New password and confirmation do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      showNotification('error', 'New password must be at least 8 characters long.');
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await api.changeAdminPassword(
        token || '',
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      if (res?.success) {
        showNotification('success', res.message || 'Password changed successfully.');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to change password');
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleRevokeOtherSessions = async () => {
    if (!window.confirm('Terminate all other active administrator sessions?')) return;
    try {
      const res = await api.revokeAllOtherAdminSessions(token || '');
      if (res?.success) {
        showNotification('success', 'All other active sessions have been terminated.');
        fetchProfileData();
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to revoke sessions');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Administrator Profile & Security</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage your personal administrative identity, credentials, active sessions, and verify security permissions.
          </p>
        </div>
        <Button
          onClick={fetchProfileData}
          variant="secondary"
          size="sm"
          leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
        >
          Refresh
        </Button>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={cn(
            'p-4 rounded-xl border text-xs flex items-center justify-between animate-in fade-in duration-200',
            notification.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-red-500/10 border-red-500/40 text-red-300'
          )}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{notification.text}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Profile Card */}
      <div className="bg-charcoal-850/90 p-6 rounded-2xl border border-sage-700/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-700 via-sage-500 to-champagne-400 p-[1.5px] shadow-md shrink-0">
            <div className="w-full h-full bg-charcoal-900 rounded-[14px] flex items-center justify-center font-heading font-bold text-2xl text-champagne-300">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-xl text-white">{profile?.name || 'Administrator'}</h2>
              <span className="capitalize text-xs font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                {profile?.role?.replace(/_/g, ' ') || 'Superadmin'}
              </span>
            </div>
            <p className="text-xs font-mono text-champagne-300">{profile?.email}</p>
            <p className="text-[11px] text-slate-400 font-mono">
              Status: <span className="text-emerald-400 font-semibold">{profile?.status || 'active'}</span> &bull; 
              Last login: {profile?.lastLoginAt ? new Date(profile.lastLoginAt).toLocaleString() : 'Active session'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right font-mono text-[11px] text-slate-400 hidden sm:block">
            <span>Privileges: </span>
            <span className="text-champagne-300 font-bold">{profile?.permissions?.length || 'Full Root'}</span> granted
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Personal Information Form */}
        <div className="bg-charcoal-850/90 p-6 rounded-2xl border border-sage-700/30 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-sage-700/30 pb-3">
            <User className="w-4 h-4 text-champagne-400" />
            <h3 className="font-heading font-bold text-base text-white">Profile Details</h3>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Administrator Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Email Address (Read-only)</label>
              <input
                type="email"
                disabled
                value={profile?.email || ''}
                className="w-full bg-charcoal-900/50 border border-sage-700/20 rounded-lg px-3 py-2 text-slate-400 cursor-not-allowed font-mono"
              />
              <p className="text-[10px] text-slate-500">
                Primary business email can only be altered by a Super Admin through User Management.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Profile Image URL (Optional)</label>
              <input
                type="url"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" variant="champagne" size="sm" disabled={profileSaving} leftIcon={<Save className="w-3.5 h-3.5" />}>
                {profileSaving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Password & Credential Security */}
        <div className="bg-charcoal-850/90 p-6 rounded-2xl border border-sage-700/30 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-sage-700/30 pb-3">
            <KeyRound className="w-4 h-4 text-champagne-400" />
            <h3 className="font-heading font-bold text-base text-white">Change Password</h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Current Password *</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">New Password (Min 8 Characters) *</label>
              <input
                type="password"
                required
                minLength={8}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Confirm New Password *</label>
              <input
                type="password"
                required
                minLength={8}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" variant="secondary" size="sm" disabled={passwordSaving} leftIcon={<KeyRound className="w-3.5 h-3.5" />}>
                {passwordSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Active Sessions Management */}
      <div className="bg-charcoal-850/90 p-6 rounded-2xl border border-sage-700/30 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-sage-700/30 pb-3">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-champagne-400" />
            <h3 className="font-heading font-bold text-base text-white">Active Administrator Sessions</h3>
          </div>
          <button
            onClick={handleRevokeOtherSessions}
            className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Other Sessions</span>
          </button>
        </div>

        <div className="divide-y divide-sage-700/20 text-xs">
          {sessions.length === 0 ? (
            <p className="py-4 text-slate-500 font-mono">Current web session active.</p>
          ) : (
            sessions.map((sess, idx) => (
              <div key={sess._id || idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-700/30 flex items-center justify-center text-champagne-400">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{sess.device || 'Web Browser'}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Current
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      IP: {sess.ipAddress || '127.0.0.1'} &bull; Last active: {new Date(sess.lastActiveAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Personal Activity */}
      <div className="bg-charcoal-850/90 p-6 rounded-2xl border border-sage-700/30 shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-sage-700/30 pb-3">
          <Clock className="w-4 h-4 text-champagne-400" />
          <h3 className="font-heading font-bold text-base text-white">My Recent Activity History</h3>
        </div>

        <div className="divide-y divide-sage-700/20 text-xs">
          {personalActivity.length === 0 ? (
            <p className="py-6 text-center text-slate-500 font-mono">No recent activity recorded for this session.</p>
          ) : (
            personalActivity.slice(0, 5).map((act) => (
              <div key={act._id || act.id} className="py-3 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 font-medium">{act.changeSummary}</p>
                  <span className="text-[10px] font-mono text-slate-400">
                    {act.action} &bull; {new Date(act.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


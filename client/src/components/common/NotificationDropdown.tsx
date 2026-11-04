import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Check,
  CheckCheck,
  ExternalLink,
  ShieldAlert,
  Inbox,
  FileText,
  UserCheck,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { notificationsApi } from '../../services/api/notificationsApi';
import { InAppNotification } from '../../types';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<InAppNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchUnread = async () => {
    try {
      const count = await notificationsApi.getUnreadCount();
      setUnreadCount(count);
    } catch {
      // Fail safely
    }
  };

  const fetchRecent = async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getNotifications({ limit: 5 });
      if (res?.data?.notifications) {
        setRecentNotifications(res.data.notifications);
        if (res.data.metrics?.unread !== undefined) {
          setUnreadCount(res.data.metrics.unread);
        }
      }
    } catch {
      // Fail safely
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnread();
    // Poll every 25 seconds for real-time alerts
    const interval = setInterval(fetchUnread, 25000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchRecent();
    }
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await notificationsApi.markAsRead(id);
      setRecentNotifications((prev) =>
        prev.map((n) => (n._id === id || n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // Fail safely
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setRecentNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // Fail safely
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'inquiry':
        return <Inbox className="w-4 h-4 text-cyan-400" />;
      case 'cms':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'user_management':
        return <UserCheck className="w-4 h-4 text-emerald-400" />;
      case 'reminder':
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span
            data-testid="notification-badge"
            className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold font-mono text-slate-950 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          data-testid="notification-dropdown"
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-500">Loading alerts...</div>
            ) : recentNotifications.length === 0 ? (
              <div className="py-8 text-center">
                <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-slate-400">No recent notifications</p>
              </div>
            ) : (
              recentNotifications.map((notif) => (
                <div
                  key={notif._id || notif.id}
                  className={`p-3.5 transition-colors hover:bg-slate-800/50 flex gap-3 items-start ${
                    !notif.isRead ? 'bg-cyan-950/10' : ''
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 shrink-0">
                    {getCategoryIcon(notif.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium truncate ${!notif.isRead ? 'text-white' : 'text-slate-300'}`}>
                        {notif.title}
                      </p>
                      {!notif.isRead && (
                        <button
                          onClick={(e) => handleMarkAsRead(notif._id || notif.id || '', e)}
                          className="text-slate-500 hover:text-cyan-400 p-0.5 rounded"
                          title="Mark read"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{notif.message}</p>
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {notif.actionUrl && (
                        <Link
                          to={notif.actionUrl}
                          onClick={() => setIsOpen(false)}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 font-medium"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-slate-800 bg-slate-950/60 text-center">
            <Link
              to="/admin/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-block py-1 transition-colors"
            >
              Open Notification Center &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

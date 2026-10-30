import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  Briefcase, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ArrowLeft,
  Sliders
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { Button } from '../common/Button';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4">
        <div className="bg-charcoal-850/90 border border-sage-700/40 max-w-md w-full p-8 rounded-2xl text-center space-y-4 shadow-xl">
          <ShieldCheck className="w-12 h-12 text-champagne-400 mx-auto" />
          <h2 className="text-xl font-bold text-white font-heading">Authentication Required</h2>
          <p className="text-slate-400 text-sm">Please sign in with authorized credentials to access the Peace Haven Administrative Portal.</p>
          <Button to="/admin/login" variant="champagne" className="w-full">
            Go to Admin Login
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
    { label: 'Projects & Case Studies', path: '/admin/projects', icon: Briefcase },
    { label: 'Services & Content', path: '/admin/content', icon: Sliders },
    { label: 'Settings & Security', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-charcoal-900 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal-850 border-r border-sage-700/30 flex flex-col shrink-0">
        <div className="p-5 border-b border-sage-700/30">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-600 via-sage-500 to-champagne-400 p-[1px]">
              <div className="w-full h-full bg-charcoal-900 rounded-[7px] flex items-center justify-center">
                <span className="text-xs font-bold text-champagne-400">PH</span>
              </div>
            </div>
            <div>
              <span className="font-heading font-bold text-sm tracking-wide text-white block">PEACE HAVEN</span>
              <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-widest block">Admin Console</span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-charcoal-900/80 border border-sage-700/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-champagne-400 border border-teal-500/30 flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-champagne-400/90 font-mono truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-champagne-500/10 text-champagne-300 border border-champagne-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-sage-700/30 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-14 border-b border-sage-700/30 bg-charcoal-900/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Environment:</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Live Production
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-mono">
              Role: <span className="text-slate-200 capitalize">{user?.role || 'Superadmin'}</span>
            </span>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { Button } from './Button';
import { servicesList } from './ServicesDropdown';
import { cn } from '../../lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div 
      className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-navy-950/98 backdrop-blur-2xl border-t border-slate-800/80 overflow-y-auto p-5 animate-in slide-in-from-top-4 duration-300 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div className="space-y-6 max-w-md mx-auto">
        
        {/* Quick Main Links */}
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Main Navigation</span>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/industries', label: 'Industries' },
              { path: '/portfolio', label: 'Portfolio' },
              { path: '/about', label: 'About Us' },
              { path: '/careers', label: 'Careers' },
              { path: '/contact', label: 'Contact' },
            ].map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={cn(
                    'px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors',
                    active 
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' 
                      : 'bg-navy-900 border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/30'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 8 Services List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">All Eight Service Divisions</span>
            <Link to="/services" onClick={onClose} className="text-xs text-slate-400 hover:text-cyan-300">Overview</Link>
          </div>
          <div className="space-y-1.5 pt-1">
            {servicesList.map((service) => {
              const Icon = service.icon;
              const active = location.pathname === service.path;
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between p-2.5 rounded-lg border transition-colors',
                    active
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                      : 'bg-navy-900/60 border-slate-800 hover:border-cyan-500/30 text-slate-200 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium">{service.title}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">
                    {service.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Primary CTA */}
        <div className="pt-2">
          <Button
            to="/start-a-project"
            variant="cyan"
            size="lg"
            className="w-full justify-center"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onClose}
          >
            Start a Project
          </Button>
        </div>

      </div>
    </div>
  );
};

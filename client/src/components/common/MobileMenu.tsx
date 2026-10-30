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
      className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-charcoal-900/98 backdrop-blur-2xl border-t border-sage-500/20 overflow-y-auto p-5 animate-in slide-in-from-top-4 duration-300 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div className="space-y-6 max-w-md mx-auto">
        
        {/* Quick Main Links */}
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase text-champagne-400 tracking-wider">Main Navigation</span>
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
                    'px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors',
                    active 
                      ? 'bg-teal-700/20 border-champagne-500/40 text-champagne-300 font-semibold' 
                      : 'bg-charcoal-850/80 border-sage-500/20 text-slate-200 hover:text-white hover:border-sage-400/40'
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
            <span className="text-xs font-mono uppercase text-champagne-400 tracking-wider">All Eight Service Divisions</span>
            <Link to="/services" onClick={onClose} className="text-xs text-slate-400 hover:text-champagne-300">Overview</Link>
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
                    'flex items-center justify-between p-2.5 rounded-xl border transition-colors',
                    active
                      ? 'bg-teal-700/20 border-champagne-500/40 text-champagne-300'
                      : 'bg-charcoal-850/60 border-sage-500/20 hover:border-sage-400/40 text-slate-200 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-champagne-400" />
                    <span className="text-sm font-medium">{service.title}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-warm-200/10 text-champagne-300 font-mono border border-champagne-500/20">
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

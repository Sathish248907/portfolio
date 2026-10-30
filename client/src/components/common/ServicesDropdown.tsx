import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  CreditCard, 
  Cpu, 
  Navigation, 
  HeartPulse, 
  Users, 
  TrendingUp, 
  Megaphone,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const servicesList = [
  {
    id: 'web-development',
    title: 'Web Development',
    shortDesc: 'Responsive websites, web apps & platforms',
    icon: Globe,
    path: '/services/web-development',
    badge: 'Core'
  },
  {
    id: 'fintech',
    title: 'FinTech',
    shortDesc: 'Financial software & transaction workflows',
    icon: CreditCard,
    path: '/services/fintech',
    badge: 'Ledger'
  },
  {
    id: 'robotics',
    title: 'Robotics & Automation',
    shortDesc: 'Robotics apps & automation engineering',
    icon: Cpu,
    path: '/services/robotics',
    badge: 'Automation'
  },
  {
    id: 'drones',
    title: 'Drone Technology',
    shortDesc: 'Aerial data collection, mapping & inspection',
    icon: Navigation,
    path: '/services/drones',
    badge: 'Aerospace'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Solutions',
    shortDesc: 'Healthcare technology & clinic operations',
    icon: HeartPulse,
    path: '/services/healthcare',
    badge: 'Clinical'
  },
  {
    id: 'us-staffing',
    title: 'US Staffing',
    shortDesc: 'Recruitment & candidate talent coordination',
    icon: Users,
    path: '/services/us-staffing',
    badge: 'Talent'
  },
  {
    id: 'trading',
    title: 'Trading',
    shortDesc: 'Trading software & analytics dashboards',
    icon: TrendingUp,
    path: '/services/trading',
    badge: 'Markets'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    shortDesc: 'SEO, campaigns, content & growth services',
    icon: Megaphone,
    path: '/services/digital-marketing',
    badge: 'Growth'
  },
];

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServicesDropdown: React.FC<ServicesDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[740px] rounded-2xl glass-card bg-charcoal-900/98 border border-sage-500/25 shadow-2xl p-5 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
      role="menu"
      aria-label="Services Menu"
    >
      <div className="col-span-2 pb-2 mb-1 border-b border-sage-500/20 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-champagne-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          Eight Specialized Service Divisions
        </span>
        <Link 
          to="/services" 
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-champagne-300 flex items-center gap-1 transition-colors"
        >
          <span>Overview</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {servicesList.map((service) => {
        const Icon = service.icon;
        return (
          <Link
            key={service.id}
            to={service.path}
            onClick={onClose}
            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-charcoal-800/80 border border-transparent hover:border-sage-500/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-champagne-400"
            role="menuitem"
          >
            <div className="w-9 h-9 rounded-lg bg-charcoal-850 border border-sage-500/30 flex items-center justify-center shrink-0 text-champagne-400 group-hover:text-white group-hover:bg-teal-700 transition-colors">
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                  {service.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-warm-200/10 text-champagne-300 font-mono border border-champagne-500/20">
                  {service.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 group-hover:text-slate-300 line-clamp-1 mt-0.5">
                {service.shortDesc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

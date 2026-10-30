import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './Button';
import { servicesList } from './ServicesDropdown';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-charcoal-950 border-t border-sage-500/20 text-slate-300 pt-16 pb-12 overflow-hidden" role="contentinfo">
      
      {/* Subtle background ambient warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-28 bg-gradient-to-b from-teal-900/15 via-charcoal-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pre-Footer Callout Banner */}
        <div className="relative rounded-3xl p-8 sm:p-10 mb-16 glass-card border border-sage-500/25 overflow-hidden bg-charcoal-850/90 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Enterprise Engineering Inquiry</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to build mission-critical technology?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Engage with our senior engineering leads to architect your web platforms, financial ledgers, robotics automation, or aerial systems.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                to="/start-a-project"
                variant="cyan"
                size="lg"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sage-500/20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 via-sage-500 to-champagne-500 p-[1.5px]">
                <div className="w-full h-full bg-charcoal-900 rounded-[10px] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-champagne-400">
                    <path
                      fill="currentColor"
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-warm-100 tracking-wider">
                PEACE HAVEN
              </span>
            </Link>

            <p className="text-champagne-400 font-mono text-sm tracking-wide">
              Engineering Ideas. Empowering Industries.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Integrated engineering and deep technology development. We deliver verified systems across cloud web development, financial ledgers, autonomous mobile robots, aerial robotics, and quantitative systems.
            </p>

            <div className="text-xs text-slate-400 font-mono space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Registered Office</span>
              <p className="text-slate-300">Site No 71, SNV Garden Main Rd, Ramanathapuram, Coimbatore, Tamil Nadu 641036</p>
            </div>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-900/40 border border-teal-600/40 text-teal-300 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 2: Core Services (1-4) */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-warm-100 uppercase tracking-wider">
              Engineering Services
            </h4>
            <ul className="space-y-2 text-sm">
              {servicesList.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link
                    to={s.path}
                    className="text-slate-400 hover:text-champagne-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Solutions (5-8) */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-warm-100 uppercase tracking-wider">
              Specialized Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              {servicesList.slice(4).map((s) => (
                <li key={s.id}>
                  <Link
                    to={s.path}
                    className="text-slate-400 hover:text-champagne-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-champagne-400 hover:text-champagne-300 transition-colors font-medium text-xs pt-1 inline-block"
                >
                  View All 8 Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-warm-100 uppercase tracking-wider">
              Organization
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-champagne-300 transition-colors">
                  About Peace Haven
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 hover:text-champagne-300 transition-colors">
                  Engineering Portfolio
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-slate-400 hover:text-champagne-300 transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-400 hover:text-champagne-300 transition-colors">
                  Careers & Talent
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-champagne-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-champagne-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-champagne-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Peace Haven Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400" />
              Verified Engineering Prototypes
            </span>
            <Link
              to="/admin/login"
              className="text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

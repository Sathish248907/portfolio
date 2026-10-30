import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './Button';
import { servicesList } from './ServicesDropdown';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-navy-950 border-t border-slate-800/80 text-slate-300 pt-16 pb-12 overflow-hidden" role="contentinfo">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-electric-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pre-Footer Callout Banner */}
        <div className="relative rounded-2xl p-8 mb-16 glass-card border border-cyan-500/20 overflow-hidden bg-gradient-to-r from-navy-900/90 via-navy-850/80 to-navy-900/90 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Enterprise Engineering Inquiry</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to build mission-critical technology?
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electric-600 via-cyan-500 to-electric-400 p-[1.5px]">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400">
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
              <span className="font-heading font-bold text-xl text-white tracking-wider">
                PEACE HAVEN
              </span>
            </Link>

            <p className="text-cyan-400 font-mono text-sm tracking-wide">
              Engineering Ideas. Empowering Industries.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Integrated engineering and deep technology development. We deliver verified systems across cloud web development, financial ledgers, autonomous mobile robots, aerial robotics, and quantitative systems.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 2: Core Services (1-4) */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Engineering Services
            </h4>
            <ul className="space-y-2 text-sm">
              {servicesList.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link
                    to={s.path}
                    className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Solutions (5-8) */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Specialized Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              {servicesList.slice(4).map((s) => (
                <li key={s.id}>
                  <Link
                    to={s.path}
                    className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-xs pt-1 inline-block"
                >
                  View All 8 Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Organization
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  About Peace Haven
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Engineering Portfolio
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Careers & Talent
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-cyan-300 transition-colors">
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
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
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

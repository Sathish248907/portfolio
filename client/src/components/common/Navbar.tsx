import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { Button } from './Button';
import { ServicesDropdown, servicesList } from './ServicesDropdown';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export { servicesList as servicesNavItems };

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Handle outside clicks to close services dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/industries', label: 'Industries' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-charcoal-900/95 backdrop-blur-xl border-b border-sage-500/20 shadow-md shadow-black/20 py-3.5'
          : 'bg-transparent py-5 border-b border-transparent'
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 rounded-lg p-1"
            aria-label="Peace Haven Homepage"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 via-sage-500 to-champagne-500 p-[1.5px] shadow-sm transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-charcoal-900 rounded-[10px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-champagne-400 transition-colors group-hover:text-champagne-300" aria-hidden="true">
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
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-wider text-warm-100 group-hover:text-champagne-300 transition-colors">
                PEACE HAVEN
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono -mt-1 group-hover:text-slate-300">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            
            {/* Home link */}
            <Link
              to="/"
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400',
                location.pathname === '/' 
                  ? 'text-champagne-400 bg-white/5 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              )}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              ref={servicesDropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <div
                className={cn(
                  'flex items-center rounded-lg transition-colors group',
                  location.pathname.startsWith('/services') || servicesDropdownOpen
                    ? 'text-champagne-400 bg-white/5 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
              >
                <Link
                  to="/services"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="pl-3 pr-1 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 rounded-l-lg hover:text-champagne-300 transition-colors"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setServicesDropdownOpen((prev) => !prev);
                  }}
                  className="pr-2.5 pl-1 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 rounded-r-lg hover:text-champagne-300 transition-colors"
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Services menu"
                >
                  <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', servicesDropdownOpen && 'rotate-180 text-champagne-400')} />
                </button>
              </div>

              <ServicesDropdown 
                isOpen={servicesDropdownOpen} 
                onClose={() => setServicesDropdownOpen(false)} 
              />
            </div>

            {navLinks.slice(1).map((link) => {
              const active = location.pathname === link.path || (link.path === '/portfolio' && (location.pathname.startsWith('/portfolio') || location.pathname.startsWith('/work')));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400',
                    active 
                      ? 'text-champagne-400 bg-white/5 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={isAuthenticated ? "/admin" : "/admin/login"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-champagne-500/10 hover:bg-champagne-500/20 text-champagne-300 border border-champagne-500/30 text-xs font-mono font-medium transition-colors"
              title={isAuthenticated ? "Go to Admin Console" : "Sign in to Admin Portal"}
            >
              <Lock className="w-3.5 h-3.5 text-champagne-400" />
              <span>{isAuthenticated ? "Admin Console" : "Admin Portal"}</span>
            </Link>
            <Button
              to="/start-a-project"
              variant="cyan"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              to="/start-a-project"
              variant="cyan"
              size="sm"
              className="py-1 px-3 text-xs"
            >
              Start Project
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

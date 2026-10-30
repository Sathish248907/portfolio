import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight
} from 'lucide-react';
import { Button } from './Button';
import { ServicesDropdown, servicesList } from './ServicesDropdown';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../lib/utils';

export { servicesList as servicesNavItems };

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

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
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-navy-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-navy-950/80 py-3'
          : 'bg-transparent py-5 border-b border-transparent'
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="Peace Haven Homepage"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-600 via-cyan-500 to-electric-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" aria-hidden="true">
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
              <span className="font-heading font-bold text-lg tracking-wider text-white group-hover:text-cyan-300 transition-colors">
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
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                location.pathname === '/' 
                  ? 'text-cyan-300 bg-white/5 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              )}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                  location.pathname.startsWith('/services') || servicesDropdownOpen
                    ? 'text-cyan-300 bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', servicesDropdownOpen && 'rotate-180 text-cyan-400')} />
              </button>

              <ServicesDropdown 
                isOpen={servicesDropdownOpen} 
                onClose={() => setServicesDropdownOpen(false)} 
              />
            </div>

            {navLinks.slice(1).map((link) => {
              const active = location.pathname === link.path || (link.path === '/portfolio' && location.pathname.startsWith('/portfolio'));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                    active 
                      ? 'text-cyan-300 bg-white/5 font-semibold' 
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
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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

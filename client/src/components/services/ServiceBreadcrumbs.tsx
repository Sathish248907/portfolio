import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface ServiceBreadcrumbsProps {
  currentTitle: string;
}

export const ServiceBreadcrumbs: React.FC<ServiceBreadcrumbsProps> = ({ currentTitle }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center gap-2 text-xs font-mono text-slate-400 py-2 overflow-x-auto whitespace-nowrap"
    >
      <Link 
        to="/" 
        className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Home</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />

      <Link 
        to="/services" 
        className="hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
      >
        Services
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />

      <span className="text-cyan-400 font-medium px-1 truncate max-w-[240px] sm:max-w-none" aria-current="page">
        {currentTitle}
      </span>
    </nav>
  );
};

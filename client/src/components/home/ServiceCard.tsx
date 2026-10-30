import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ServiceCardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  image: string;
  badge: string;
  route: string;
}

interface ServiceCardProps {
  service: ServiceCardData;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <Link
      to={service.route}
      className={cn(
        'group relative rounded-2xl glass-card overflow-hidden border border-slate-800/80',
        'hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between',
        'hover:-translate-y-1.5 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
        'h-full'
      )}
      aria-label={`Explore ${service.title}`}
    >
      {/* Visual Header with Image and Overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
        <img
          src={service.image}
          alt={`${service.title} engineering capability`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-navy-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            0{index + 1}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-navy-950/90 text-slate-300 border border-slate-700/80 backdrop-blur-md">
            {service.badge}
          </span>
        </div>

        {/* Floating Icon */}
        <div className="absolute -bottom-4 left-5 w-10 h-10 rounded-xl bg-navy-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:bg-electric-600 group-hover:text-white transition-colors shadow-lg shadow-black/60">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 pt-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Interactive Action Link */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
          <span className="font-medium">Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

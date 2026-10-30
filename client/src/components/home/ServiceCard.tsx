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
        'group relative rounded-2xl bg-[#0b1c26]/90 overflow-hidden border border-sage-500/25',
        'hover:border-[#dfa561]/60 transition-all duration-300 flex flex-col justify-between',
        'hover:-translate-y-1.5 shadow-xl hover:shadow-2xl backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400',
        'h-full'
      )}
      aria-label={`Explore ${service.title}`}
    >
      {/* Visual Header with Image and Overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal-900">
        <img
          src={service.image}
          alt={`${service.title} engineering capability`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c26] via-charcoal-950/30 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-charcoal-900/90 text-[#dfa561] border border-sage-500/30 backdrop-blur-md">
            0{index + 1}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-charcoal-900/90 text-warm-200 border border-sage-500/30 backdrop-blur-md">
            {service.badge}
          </span>
        </div>

        {/* Floating Icon */}
        <div className="absolute -bottom-4 left-5 w-10 h-10 rounded-xl bg-teal-700/90 border border-teal-500/40 flex items-center justify-center text-white group-hover:bg-[#07151e] group-hover:text-[#dfa561] group-hover:border-[#dfa561]/50 transition-colors shadow-md">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 pt-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#dfa561] transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
            {service.description}
          </p>
        </div>

        {/* Interactive Action Link */}
        <div className="pt-3 border-t border-sage-500/20 flex items-center justify-between text-xs font-mono text-[#dfa561] group-hover:text-champagne-300 font-medium">
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

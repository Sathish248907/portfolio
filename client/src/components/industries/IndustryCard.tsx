import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  CreditCard, 
  Factory, 
  HeartPulse, 
  Wheat, 
  Building2, 
  Truck, 
  ShoppingBag, 
  Users, 
  GraduationCap, 
  ArrowRight,
  FolderGit2
} from 'lucide-react';
import { IndustryDetail } from '../../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  CreditCard,
  Factory,
  HeartPulse,
  Wheat,
  Building2,
  Truck,
  ShoppingBag,
  Users,
  GraduationCap,
};

interface IndustryCardProps {
  industry: IndustryDetail;
  showProjectBadge?: boolean;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ 
  industry,
  showProjectBadge = true 
}) => {
  const IconComponent = iconMap[industry.iconName] || Building2;
  const hasProjects = industry.relatedProjectSlugs && industry.relatedProjectSlugs.length > 0;

  return (
    <Link
      to={`/industries/${industry.slug}`}
      className="group p-6 sm:p-7 rounded-2xl bg-[#0b1c26]/90 border border-sage-500/25 hover:border-[#dfa561]/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 h-full shadow-xl hover:shadow-2xl backdrop-blur-md"
    >
      <div className="space-y-5">
        
        {/* Top Header: Industry Number & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold tracking-widest text-[#dfa561]/90 px-2.5 py-1 rounded-md bg-charcoal-900/90 border border-sage-500/30">
            {industry.number}
          </span>
          <div className="w-11 h-11 rounded-xl bg-charcoal-850 border border-sage-500/30 flex items-center justify-center text-[#dfa561] group-hover:bg-[#dfa561] group-hover:text-[#08151e] transition-colors shadow-sm">
            <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2.5">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#dfa561] transition-colors leading-snug">
            {industry.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
            {industry.shortDescription}
          </p>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {industry.tags.map((tag) => (
            <span 
              key={tag}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-charcoal-900/90 border border-sage-500/20 text-slate-300 group-hover:border-champagne-500/30 group-hover:text-champagne-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured Project Indicator (if connected) */}
        {showProjectBadge && hasProjects && (
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-lg bg-teal-900/40 border border-teal-500/30 text-teal-300">
              <FolderGit2 className="w-3 h-3 text-teal-400" />
              <span>Verified Portfolio Works Available</span>
            </span>
          </div>
        )}

      </div>

      {/* Card Footer: Explore Link with Animated Arrow */}
      <div className="pt-5 mt-5 border-t border-sage-500/20 flex items-center justify-between text-xs font-mono font-medium text-[#dfa561] group-hover:text-champagne-300">
        <span>Explore Industry</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
      </div>
    </Link>
  );
};


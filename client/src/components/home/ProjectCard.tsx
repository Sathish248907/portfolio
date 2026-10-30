import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectCaseStudy } from '../../types';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className={cn(
        'group rounded-2xl bg-white border border-sage-300/70 overflow-hidden',
        'hover:border-teal-700/50 transition-all duration-300 flex flex-col',
        'hover:-translate-y-1.5 shadow-subtle hover:shadow-card-hover h-full'
      )}
    >
      {/* Project Thumbnail with Prototype Designation */}
      <div className="aspect-[16/9] w-full overflow-hidden bg-charcoal-900 relative">
        <img
          src={project.thumbnail}
          alt={`${project.title} demonstration`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        
        {/* Prototype status badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-charcoal-900/90 text-champagne-300 border border-sage-500/30 backdrop-blur-md">
            {project.statusBadge}
          </span>
        </div>

        {/* Category label */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-charcoal-900/90 text-warm-200 border border-sage-500/30 backdrop-blur-md">
            {project.serviceName}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-teal-700 uppercase tracking-wider font-semibold">
            {project.industry}
          </div>
          <h3 className="font-heading text-lg font-bold text-charcoal-900 group-hover:text-teal-800 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Technology Tags and Detail Link */}
        <div className="space-y-3 pt-3 border-t border-sage-200/80">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm-50 border border-sage-300/80 text-slate-700"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <Link
            to={`/portfolio/${project.slug}`}
            className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-warm-100 hover:bg-teal-50 border border-sage-300 text-xs font-mono text-charcoal-900 group-hover:text-teal-800 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-champagne-400 font-medium"
          >
            <span>Explore Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-700 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { ProjectCaseStudy } from '../../types';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className={cn(
        'group rounded-2xl glass-card border border-slate-800/80 overflow-hidden',
        'hover:border-cyan-500/40 transition-all duration-300 flex flex-col',
        'hover:-translate-y-1.5 shadow-glass hover:shadow-card-hover h-full'
      )}
    >
      {/* Project Thumbnail with Prototype Designation */}
      <div className="aspect-[16/9] w-full overflow-hidden bg-navy-950 relative">
        <img
          src={project.thumbnail}
          alt={`${project.title} demonstration`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Prototype status badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-navy-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {project.statusBadge}
          </span>
        </div>

        {/* Category label */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-navy-900/90 text-slate-300 border border-slate-700/80 backdrop-blur-md">
            {project.serviceName}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
            {project.industry}
          </div>
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Technology Tags and Detail Link */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 border border-slate-800 text-slate-400"
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
            className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-lg bg-navy-850 hover:bg-navy-800 border border-slate-700/70 text-xs font-mono text-slate-200 group-hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <span>Explore Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

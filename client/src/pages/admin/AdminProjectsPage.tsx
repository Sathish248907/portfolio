import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { projectsData as initialProjects } from '../../data/projectsData';
import { ProjectCaseStudy } from '../../types';
import { Button } from '../../components/common/Button';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectCaseStudy[]>(initialProjects);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Laboratory Projects & Case Studies</h1>
          <p className="text-slate-400 text-xs">Manage engineering prototypes, benchmark results, and published architectures.</p>
        </div>

        <Button
          onClick={() => alert('Add Project Modal: Fully supported via database persistence when connected to backend.')}
          variant="cyan"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Publish New Case Study
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">{proj.industry}</span>
                <h3 className="font-heading text-lg font-bold text-white">{proj.title}</h3>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 border border-cyan-500/30 text-cyan-300">
                  {proj.statusBadge}
                </span>
              </div>
              <img src={proj.thumbnail} alt={proj.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-700" />
            </div>

            <p className="text-slate-400 text-xs line-clamp-2">{proj.overview}</p>

            <div className="flex flex-wrap gap-1 pt-1">
              {proj.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 border border-slate-800 text-slate-300">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-500">Slug: /{proj.slug}</span>
              <div className="flex items-center gap-2">
                <a
                  href={`/portfolio/${proj.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-slate-700 text-slate-300 hover:text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => alert(`Edit Case Study: ${proj.title}`)}
                  className="px-2 py-1 rounded bg-navy-850 hover:bg-navy-800 border border-slate-700 text-cyan-400 text-xs font-mono"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

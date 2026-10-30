import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { SEO } from '../components/common/SEO';

export const PortfolioPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'fintech', label: 'FinTech' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'drone-technology', label: 'Drone Tech' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'trading', label: 'Trading Systems' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.serviceId === selectedFilter);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Engineering Portfolio & Case Studies | Peace Haven"
        description="Authentic engineering demonstrations, architectural prototypes, and systems benchmarks engineered by Peace Haven."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5 text-champagne-400" />
          <span>Peace Haven Engineering Laboratory</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Verified Systems & Case Studies
        </h1>
        <p className="text-slate-300 text-base leading-relaxed font-light">
          Explore genuine prototypes and reference architectures engineered by our team. In accordance with our transparency standards, all laboratory builds are explicitly identified.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 ${
              selectedFilter === f.id
                ? 'bg-teal-700 text-white font-bold shadow-sm border border-teal-600/50'
                : 'bg-charcoal-850/80 text-slate-300 border border-sage-500/20 hover:border-sage-500/40 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-card bg-charcoal-850/85 rounded-2xl overflow-hidden border border-sage-500/20 hover:border-champagne-500/40 transition-all duration-300 flex flex-col group shadow-card-dark"
          >
            {/* Thumbnail */}
            <div className="aspect-video w-full overflow-hidden bg-charcoal-900 relative">
              <img
                src={project.thumbnail}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-charcoal-900/90 text-champagne-300 text-[10px] font-mono border border-sage-500/30 backdrop-blur-md">
                  {project.statusBadge}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-champagne-400">
                  <span>{project.industry}</span>
                  <span className="text-slate-400">{project.publishedAt}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-champagne-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 font-light">
                  {project.overview}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-3 pt-2 border-t border-sage-500/20">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20 text-slate-400">
                      {t}
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
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 border border-sage-500/30 text-xs font-mono text-slate-200 group-hover:text-champagne-300 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-champagne-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transparency Note */}
      <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 text-center max-w-2xl mx-auto space-y-2 shadow-card-dark">
        <div className="flex items-center justify-center gap-2 text-champagne-400 text-xs font-mono font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Authentic Engineering Guarantee</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-light">
          Every project listed is accompanied by verifiable architecture diagrams, engineering metrics, and reproducible benchmarks. Peace Haven never fabricates false endorsements or inflated metrics.
        </p>
      </div>
    </div>
  );
};

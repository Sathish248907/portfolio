import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers, ShieldCheck, FolderGit2, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';
import { ServiceId } from '../../types';
import { projectsData } from '../../data/projectsData';

interface RelatedProjectsProps {
  serviceId: ServiceId;
  serviceTitle: string;
  relatedProjectSlugs: string[];
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({ 
  serviceId, 
  serviceTitle,
  relatedProjectSlugs 
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Find related projects by serviceId or explicit slugs
  const related = projectsData.filter(
    (p) => p.serviceId === serviceId || (relatedProjectSlugs && relatedProjectSlugs.includes(p.slug))
  );

  // Extract unique categories from related projects for filtering
  const categories = Array.from(
    new Set(related.map((p) => p.category).filter((c): c is string => Boolean(c)))
  );

  const filteredProjects = selectedCategory === 'all'
    ? related
    : related.filter((p) => p.category === selectedCategory);

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="selected-works" className="py-24 bg-warm-100 border-b border-sage-300/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-300/70 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-200 border border-sage-300 text-teal-800 text-xs font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Selected Works / Our Work</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              Selected Works & Architecture
            </h2>
            
            <p className="text-slate-600 text-base leading-relaxed font-light">
              Explore featured client deployments, verified e-commerce platforms, and architectural benchmarks associated with {serviceTitle}.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              to="/work"
              variant="secondary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Full Portfolio
            </Button>
          </div>
        </div>

        {/* Category Filter Pills (if multiple categories exist) */}
        {categories.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <span className="text-xs font-mono text-slate-500 mr-2">Filter by:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 ${
                selectedCategory === 'all'
                  ? 'bg-teal-700 text-white font-semibold shadow-sm'
                  : 'bg-white text-slate-700 border border-sage-300 hover:border-slate-400'
              }`}
            >
              All Works ({related.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white font-semibold shadow-sm'
                    : 'bg-white text-slate-700 border border-sage-300 hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Project Cards or Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => {
              const isArtistry = project.slug === 'artistry-gold-diamonds';

              return (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className={`bg-white rounded-2xl overflow-hidden border ${
                    isArtistry 
                      ? 'border-champagne-400/80 hover:border-[#B76E79]/80 shadow-subtle hover:shadow-card-hover' 
                      : 'border-sage-300/80 hover:border-teal-700/50 shadow-subtle hover:shadow-card-hover'
                  } flex flex-col justify-between group transition-all duration-300`}
                >
                  {/* Image Banner */}
                  <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-charcoal-900">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-900/25 to-transparent" />
                    
                    {/* Category & Status Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
                      {project.category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-charcoal-900/90 border border-champagne-400/40 text-champagne-300 text-xs font-mono backdrop-blur-md">
                          {project.category}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900/90 border border-sage-500/30 text-warm-200 text-xs font-mono backdrop-blur-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
                        <span>{project.statusBadge}</span>
                      </span>
                    </div>

                    {/* Industry Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-mono text-warm-200 px-2.5 py-1 rounded-md bg-charcoal-900/90 border border-sage-500/30 backdrop-blur-sm">
                        {project.industry}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                        <span className="text-teal-800 font-semibold">{project.category || project.serviceName}</span>
                        <span>{project.publishedAt}</span>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal-900 group-hover:text-teal-900 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {project.shortDescription || project.overview}
                      </p>
                    </div>

                    {/* Tech Stack Tags & Dual CTAs */}
                    <div className="pt-6 border-t border-sage-200/80 space-y-4 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-warm-50 border border-sage-200 text-slate-700 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Dual Action CTAs */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {(project.liveUrl || project.demoUrl) && (
                          <a
                            href={project.liveUrl || project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-mono font-semibold shadow-sm hover:shadow transition-all group/btn"
                          >
                            <span>Visit Live Project</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        )}

                        <Link
                          to={`/work/${project.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-warm-200/70 hover:bg-warm-200 border border-sage-300 text-charcoal-900 hover:text-teal-900 text-xs font-mono font-semibold transition-all group/study"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 text-teal-700 group-hover/study:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Honest, tasteful empty state when no verified case studies exist yet */
          <div className="rounded-2xl p-10 bg-white border border-sage-300 text-center max-w-2xl mx-auto space-y-5 shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-warm-100 border border-sage-300 text-teal-700 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-charcoal-900">
                Selected Works in Preparation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Our engineering team is currently compiling sanitized demonstration prototypes and architectural case studies for {serviceTitle}. We do not publish unverified commercial client logos or fabricated case studies.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                to={`/start-a-project?service=${serviceId}`}
                variant="cyan"
                size="sm"
              >
                Inquire About Custom Architecture
              </Button>

              <Button
                to="/work"
                variant="secondary"
                size="sm"
              >
                Browse Available Prototypes
              </Button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

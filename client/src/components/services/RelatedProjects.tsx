import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers, ExternalLink, ShieldCheck, Sparkles, FolderGit2 } from 'lucide-react';
import { Button } from '../common/Button';
import { ProjectCaseStudy, ServiceId } from '../../types';
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

  // Find related projects by serviceId or explicit slugs
  const related = projectsData.filter(
    (p) => p.serviceId === serviceId || (relatedProjectSlugs && relatedProjectSlugs.includes(p.slug))
  );

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
    <section id="related-work" className="py-20 border-b border-slate-800/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Laboratory Demonstrations</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Related Engineering Work
            </h2>
            
            <p className="text-slate-400 text-base leading-relaxed">
              Explore laboratory prototypes and architectural benchmarks associated with {serviceTitle}.
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

        {/* Project Cards or Empty State */}
        {related.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {related.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800/90 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300"
              >
                {/* Image Banner */}
                <div className="relative aspect-video w-full overflow-hidden bg-navy-950">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  
                  {/* Prototype Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{project.statusBadge}</span>
                    </span>
                  </div>

                  {/* Industry Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-mono text-slate-300 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
                      {project.industry}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 font-light">
                      {project.overview}
                    </p>
                  </div>

                  {/* Tech Stack Tags & Detail Link */}
                  <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 border border-slate-700/80 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Honest, tasteful empty state when no verified case studies exist yet */
          <div className="rounded-2xl p-10 glass-card border border-slate-800 text-center max-w-2xl mx-auto space-y-5 bg-gradient-to-b from-navy-900/60 to-navy-950/80">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-white">
                Laboratory Benchmarks in Preparation
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Our engineering team is currently compiling sanitized demonstration prototypes and architectural whitepapers for {serviceTitle}. We do not publish unverified commercial client logos or fabricated case studies.
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

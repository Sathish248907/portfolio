import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers, ShieldCheck, FolderGit2 } from 'lucide-react';
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
    <section id="related-work" className="py-24 bg-warm-100 border-b border-sage-300/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-300/70 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-200 border border-sage-300 text-teal-800 text-xs font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Laboratory Demonstrations</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              Related Engineering Work
            </h2>
            
            <p className="text-slate-600 text-base leading-relaxed font-light">
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
                className="bg-white rounded-2xl overflow-hidden border border-sage-300/80 flex flex-col justify-between group hover:border-teal-700/50 shadow-subtle hover:shadow-card-hover transition-all duration-300"
              >
                {/* Image Banner */}
                <div className="relative aspect-video w-full overflow-hidden bg-charcoal-900">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-900/30 to-transparent" />
                  
                  {/* Prototype Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900/90 border border-sage-500/30 text-champagne-300 text-xs font-mono backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
                      <span>{project.statusBadge}</span>
                    </span>
                  </div>

                  {/* Industry Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-mono text-warm-200 px-2 py-0.5 rounded bg-charcoal-900/90 border border-sage-500/30 backdrop-blur-sm">
                      {project.industry}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-charcoal-900 group-hover:text-teal-800 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-normal">
                      {project.overview}
                    </p>
                  </div>

                  {/* Tech Stack Tags & Detail Link */}
                  <div className="pt-6 border-t border-sage-200/80 flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm-50 border border-sage-200 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-700 hover:text-teal-900 transition-colors font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-champagne-400 rounded px-1"
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
          <div className="rounded-2xl p-10 bg-white border border-sage-300 text-center max-w-2xl mx-auto space-y-5 shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-warm-100 border border-sage-300 text-teal-700 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-charcoal-900">
                Laboratory Benchmarks in Preparation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
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

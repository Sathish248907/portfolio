import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { ServiceBreadcrumbs } from './ServiceBreadcrumbs';
import { ServiceDetail } from '../../types';

interface ServiceHeroProps {
  service: ServiceDetail;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-slate-800/60" aria-labelledby="service-hero-heading">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-electric-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <ServiceBreadcrumbs currentTitle={service.title} />
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Specialized Discipline &bull; {service.title}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              id="service-hero-heading"
              variants={itemVariants} 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
            >
              {service.title}
            </motion.h1>

            {/* Value Proposition Subtitle */}
            <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-gradient-cyan font-heading font-medium leading-snug">
              {service.tagline}
            </motion.p>

            {/* Comprehensive Description */}
            <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              {service.heroDescription || service.shortDescription}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                to={`/start-a-project?service=${service.slug}`}
                variant="cyan"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                id="hero-discuss-btn"
              >
                Discuss Your Project
              </Button>

              <Button
                onClick={() => handleScrollToSection('capabilities')}
                variant="secondary"
                size="lg"
                rightIcon={<ChevronDown className="w-4 h-4" />}
              >
                Explore Capabilities
              </Button>
            </motion.div>

            {/* Trust / Reliability Micro-Badge */}
            <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Deterministic Engineering</span>
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Custom Architecture</span>
              </span>
            </motion.div>
          </div>

          {/* Right Visual Structure */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl glass-card p-8 border border-cyan-500/25 bg-gradient-to-b from-navy-900/90 via-navy-950/80 to-navy-900/90 shadow-2xl shadow-cyan-950/40 flex flex-col justify-between overflow-hidden group">
              
              {/* Corner decorative accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/20 to-transparent pointer-events-none rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-electric-600/20 to-transparent pointer-events-none rounded-bl-3xl" />

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Practice Specification
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-navy-900 border border-cyan-500/30 text-cyan-300">
                  Active Discipline
                </span>
              </div>

              {/* Abstract Visual Center */}
              <div className="py-8 flex flex-col items-center justify-center space-y-4 relative z-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-electric-600/30 via-cyan-500/20 to-electric-400/30 border border-cyan-400/40 p-4 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                
                <div>
                  <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {service.deliverables.length} Key Architecture Deliverables
                  </p>
                </div>
              </div>

              {/* Core Technologies Pill Cloud */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2 relative z-10">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Engineering Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.slice(0, 6).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-900/90 border border-slate-700/80 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-12 pt-6 flex justify-center">
          <button
            type="button"
            onClick={() => handleScrollToSection('overview')}
            className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded p-1"
            aria-label="Scroll to service overview"
          >
            <span>Overview & Capabilities</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
};

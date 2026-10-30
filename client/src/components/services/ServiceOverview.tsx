import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  Layers
} from 'lucide-react';
import { ServiceDetail } from '../../types';

interface ServiceOverviewProps {
  service: ServiceDetail;
}

export const ServiceOverview: React.FC<ServiceOverviewProps> = ({ service }) => {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="overview" className="py-20 border-b border-slate-800/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Service Overview</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Understanding the Discipline
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {service.overview.summary}
          </p>
        </div>

        {/* 4 Pillars Grid: Problems, Clients, Solutions, Potential Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. Problems Solved */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="glass-card rounded-2xl p-7 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Challenges This Service Solves
                </h3>
                <span className="text-xs font-mono text-slate-400">Common operational friction points</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-300">
              {service.overview.problemsSolved.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 2. Clients Supported */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="glass-card rounded-2xl p-7 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Who We Support
                </h3>
                <span className="text-xs font-mono text-slate-400">Primary client & organizational profiles</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-300">
              {service.overview.clientTypes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. Solutions Offered */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="glass-card rounded-2xl p-7 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Our Engineering Solutions
                </h3>
                <span className="text-xs font-mono text-slate-400">Technical approaches delivered by Peace Haven</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-300">
              {service.overview.solutionsOffered.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. Potential Outcomes */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="glass-card rounded-2xl p-7 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Potential Business Outcomes
                </h3>
                <span className="text-xs font-mono text-slate-400">Realistic results without unsupported guarantees</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-300">
              {service.overview.potentialOutcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

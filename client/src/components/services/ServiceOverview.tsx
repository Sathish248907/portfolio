import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
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
    <section id="overview" className="py-24 bg-warm-200 border-b border-sage-300/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-100 border border-sage-300 text-teal-800 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-teal-700" />
            <span>Service Overview</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Understanding the Discipline
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
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
            className="bg-white rounded-2xl p-7 border border-sage-300/80 space-y-4 shadow-subtle hover:border-teal-700/40 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-champagne-100/70 border border-champagne-300/80 flex items-center justify-center text-champagne-700 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-charcoal-900">
                  Challenges This Service Solves
                </h3>
                <span className="text-xs font-mono text-slate-500">Common operational friction points</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-600">
              {service.overview.problemsSolved.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-500 mt-2 shrink-0" />
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
            className="bg-white rounded-2xl p-7 border border-sage-300/80 space-y-4 shadow-subtle hover:border-teal-700/40 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100/70 border border-teal-300/80 flex items-center justify-center text-teal-700 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-charcoal-900">
                  Who We Support
                </h3>
                <span className="text-xs font-mono text-slate-500">Primary client & organizational profiles</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-600">
              {service.overview.clientTypes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-2 shrink-0" />
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
            className="bg-white rounded-2xl p-7 border border-sage-300/80 space-y-4 shadow-subtle hover:border-teal-700/40 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100/70 border border-teal-300/80 flex items-center justify-center text-teal-700 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-charcoal-900">
                  Our Engineering Solutions
                </h3>
                <span className="text-xs font-mono text-slate-500">Technical approaches delivered by Peace Haven</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-600">
              {service.overview.solutionsOffered.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-2 shrink-0" />
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
            className="bg-white rounded-2xl p-7 border border-sage-300/80 space-y-4 shadow-subtle hover:border-teal-700/40 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-champagne-100/70 border border-champagne-300/80 flex items-center justify-center text-champagne-700 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-charcoal-900">
                  Potential Business Outcomes
                </h3>
                <span className="text-xs font-mono text-slate-500">Realistic results without unsupported guarantees</span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-600">
              {service.overview.potentialOutcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-600 mt-2 shrink-0" />
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

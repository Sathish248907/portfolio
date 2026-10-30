import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Lightbulb } from 'lucide-react';
import { ServiceUseCaseItem } from '../../types';

interface ServiceBenefitsProps {
  benefits: {
    title: string;
    description: string;
    metric?: string;
  }[];
  useCases: ServiceUseCaseItem[];
  serviceTitle: string;
}

export const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({ 
  benefits, 
  useCases, 
  serviceTitle 
}) => {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="benefits" className="py-24 bg-charcoal-900 border-b border-sage-500/20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
            <Lightbulb className="w-3.5 h-3.5 text-champagne-400" />
            <span>Applied Value</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Benefits & Applied Use Cases
          </h2>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            Realistic applications demonstrating how {serviceTitle} addresses operational objectives.
          </p>
        </div>

        {/* Benefits Metric Highlights */}
        {benefits && benefits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="glass-card bg-charcoal-850/90 rounded-2xl p-6 border border-sage-500/25 space-y-3 relative overflow-hidden group hover:border-champagne-500/40 transition-colors shadow-card-dark"
              >
                {b.metric && (
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-champagne-400 block tracking-tight">
                    {b.metric}
                  </span>
                )}
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-champagne-300 transition-colors">
                  {b.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Realistic Use Cases (Scenario -> Solution -> Outcome) */}
        {useCases && useCases.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-sage-500/20 pb-3">
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne-400" />
                <span>Representative Implementation Scenarios</span>
              </h3>
              <span className="text-xs font-mono text-champagne-400 px-2.5 py-1 rounded bg-charcoal-950 border border-sage-500/30">
                Demonstration Models
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((uc, uIdx) => (
                <motion.div
                  key={uIdx}
                  custom={uIdx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="glass-card bg-charcoal-850/85 rounded-2xl p-6 border border-sage-500/25 flex flex-col justify-between space-y-5 hover:border-sage-400/40 transition-colors shadow-card-dark"
                >
                  <div className="space-y-4">
                    {/* Tag + Title */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                        Scenario 0{uIdx + 1}
                      </span>
                      <h4 className="font-heading text-base font-bold text-white leading-snug">
                        {uc.title}
                      </h4>
                    </div>

                    {/* Operational Challenge */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-champagne-400/90 block font-semibold">
                        Challenge Context:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {uc.scenario}
                      </p>
                    </div>

                    {/* Engineered Solution */}
                    <div className="space-y-1 pt-2 border-t border-sage-500/20">
                      <span className="text-[10px] font-mono uppercase text-teal-400 block font-semibold">
                        Engineering Solution:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {uc.solution}
                      </p>
                    </div>
                  </div>

                  {/* Observed / Projected Outcome */}
                  <div className="pt-3 border-t border-sage-500/20 bg-charcoal-950/70 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="text-[10px] font-mono uppercase text-champagne-300 block font-semibold mb-0.5">
                      Target Outcome:
                    </span>
                    <p className="text-xs text-slate-200 leading-snug font-light">
                      {uc.outcome}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

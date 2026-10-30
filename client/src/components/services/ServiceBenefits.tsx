import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Lightbulb, ShieldAlert } from 'lucide-react';
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
    <section id="benefits" className="py-20 border-b border-slate-800/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
            <span>Applied Value</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Benefits & Applied Use Cases
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
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
                className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-3 relative overflow-hidden group hover:border-cyan-500/30 transition-colors"
              >
                {b.metric && (
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-cyan-400 block tracking-tight">
                    {b.metric}
                  </span>
                )}
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
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
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Representative Implementation Scenarios</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-navy-900 border border-cyan-500/20">
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
                  className="glass-card rounded-2xl p-6 border border-slate-800/90 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-colors"
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
                      <span className="text-[10px] font-mono uppercase text-amber-400/90 block font-semibold">
                        Challenge Context:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {uc.scenario}
                      </p>
                    </div>

                    {/* Engineered Solution */}
                    <div className="space-y-1 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 block font-semibold">
                        Engineering Solution:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {uc.solution}
                      </p>
                    </div>
                  </div>

                  {/* Observed / Projected Outcome */}
                  <div className="pt-3 border-t border-slate-800/80 bg-navy-950/60 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold mb-0.5">
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

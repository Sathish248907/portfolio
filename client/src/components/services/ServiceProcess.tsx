import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Workflow, Info } from 'lucide-react';
import { ServiceProcessStep } from '../../types';

interface ServiceProcessProps {
  approach: ServiceProcessStep[];
  serviceTitle: string;
}

export const ServiceProcess: React.FC<ServiceProcessProps> = ({ approach, serviceTitle }) => {
  const shouldReduceMotion = useReducedMotion();

  const defaultSteps: ServiceProcessStep[] = [
    {
      step: '01',
      title: 'Discover',
      phase: 'Requirements Understanding',
      description: 'We meet with your team to analyze goals, technical constraints, existing system touchpoints, and project boundaries.',
      deliverable: 'Scope definition & technical assessment'
    },
    {
      step: '02',
      title: 'Plan',
      phase: 'Architecture & Scoping',
      description: 'We define the sprint milestones, deliverables, data contracts, and architectural blueprint agreed with your stakeholders.',
      deliverable: 'Milestone roadmap & architecture specification'
    },
    {
      step: '03',
      title: 'Design',
      phase: 'Solution & Interface Design',
      description: 'We develop the solution design, component prototypes, interface wireframes, and API contracts for early validation.',
      deliverable: 'Interactive prototypes & interface specifications'
    },
    {
      step: '04',
      title: 'Build',
      phase: 'Implementation & Testing',
      description: 'We implement software, algorithms, and integration bridges, accompanied by rigorous automated testing and staging reviews.',
      deliverable: 'Validated software builds & test report'
    },
    {
      step: '05',
      title: 'Launch',
      phase: 'Deployment & Handover',
      description: 'We deploy the solution into your environment, provide knowledge transfer to your team, and support post-launch stabilization.',
      deliverable: 'Production cutover, documentation & handover'
    }
  ];

  const stepsToRender = approach && approach.length >= 5 ? approach : defaultSteps;

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
    <section id="approach" className="py-24 bg-warm-200 border-b border-sage-300/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-100 border border-sage-300 text-teal-800 text-xs font-mono">
            <Workflow className="w-3.5 h-3.5 text-teal-700" />
            <span>Structured Methodology</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Our Approach
          </h2>

          <p className="text-slate-600 text-base leading-relaxed font-light">
            A disciplined five-stage engineering sequence from initial requirements discovery to production handover.
          </p>
        </div>

        {/* Desktop Connecting Line & 5-Step Cards */}
        <div className="relative">
          
          {/* Subtle connecting line on desktop */}
          <div 
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sage-300 via-teal-700/30 to-sage-300 -translate-y-8 z-0 pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {stepsToRender.map((stepItem, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-white rounded-2xl p-6 border border-sage-300/80 flex flex-col justify-between hover:border-teal-700/50 shadow-subtle hover:shadow-card transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  
                  {/* Step Badge */}
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-warm-100 border border-champagne-400/50 text-champagne-700 font-mono text-xs font-bold flex items-center justify-center group-hover:scale-105 transition-transform">
                      {stepItem.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      Stage 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Phase */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-charcoal-900 group-hover:text-teal-800 transition-colors">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs font-mono text-teal-700 mt-0.5 font-medium">
                      {stepItem.phase}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {stepItem.description}
                  </p>
                </div>

                {/* Deliverable Pill */}
                {stepItem.deliverable && (
                  <div className="pt-4 mt-4 border-t border-sage-200/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      Key Milestone:
                    </span>
                    <span className="text-[11px] text-slate-700 font-mono block leading-snug">
                      {stepItem.deliverable}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>

        {/* Scope Disclaimer Callout */}
        <div className="rounded-2xl p-4 bg-white border border-sage-300 text-slate-600 text-xs font-mono flex items-center gap-3 max-w-2xl mx-auto shadow-subtle">
          <Info className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            Note: Specific engineering deliverables, sprint intervals, and milestones are tailored to the agreed project scope for each engagement.
          </span>
        </div>

      </div>
    </section>
  );
};

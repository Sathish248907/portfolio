import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceFAQItem } from '../../types';

interface ServiceFAQProps {
  faqs: ServiceFAQItem[];
  serviceTitle: string;
}

export const ServiceFAQ: React.FC<ServiceFAQProps> = ({ faqs, serviceTitle }) => {
  // Allow toggling multiple or single accordion items; default open first item
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <section id="faq" className="py-20 border-b border-slate-800/60 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            Key operational, architectural, and engagement details regarding {serviceTitle}.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-4" role="region" aria-label="FAQ Accordion">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            const buttonId = `faq-btn-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-slate-800/90 overflow-hidden transition-colors hover:border-slate-700/80"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleIndex(index);
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>

                  <span className={`w-8 h-8 rounded-lg bg-navy-900 border border-slate-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 border-cyan-500/40 text-cyan-400' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed font-light border-t border-slate-800/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Additional Help Link */}
        <div className="text-center pt-4">
          <p className="text-xs font-mono text-slate-400">
            Have a question specific to your architecture?{' '}
            <Link 
              to="/contact" 
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 inline-flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
            >
              <span>Speak directly with our engineering team</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
};

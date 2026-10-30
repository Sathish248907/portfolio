import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Check, 
  Cpu, 
  Layers, 
  Code2, 
  Server, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Calendar, 
  Search, 
  TrendingUp, 
  Users, 
  Workflow, 
  Zap,
  Layout,
  Gauge
} from 'lucide-react';
import { ServiceCapabilityItem } from '../../types';

interface ServiceCapabilitiesProps {
  capabilities: ServiceCapabilityItem[];
  serviceTitle: string;
}

export const ServiceCapabilities: React.FC<ServiceCapabilitiesProps> = ({ 
  capabilities, 
  serviceTitle 
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Helper to pick an appropriate icon
  const getCapabilityIcon = (index: number) => {
    const icons = [Layers, Code2, Server, ShieldCheck, BarChart3, Gauge, Cpu, Workflow];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-5 h-5 text-cyan-400" />;
  };

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
    <section id="capabilities" className="py-20 border-b border-slate-800/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Capabilities and Solutions
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            Delivering targeted engineering and technical solutions tailored for {serviceTitle}.
          </p>
        </div>

        {/* Capabilities Grid: 4-6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="glass-card rounded-2xl p-6 border border-slate-800/90 flex flex-col justify-between hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 group shadow-lg shadow-black/20"
            >
              <div className="space-y-4">
                
                {/* Header: Icon + Number */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-colors">
                    {getCapabilityIcon(index)}
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Capability Title */}
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>

              {/* Feature Points Checklist */}
              {cap.features && cap.features.length > 0 && (
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Technical Scope:
                  </span>
                  <div className="space-y-1.5">
                    {cap.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

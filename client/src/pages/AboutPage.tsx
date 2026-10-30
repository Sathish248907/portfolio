import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Compass, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const AboutPage: React.FC = () => {
  const principles = [
    {
      title: 'First-Principles Systems Engineering',
      desc: 'We do not wrap superficial wrappers over outdated foundations. From low-level C++ robotics drivers to event-driven cloud systems, we design architectures from root mechanical and algorithmic requirements.',
    },
    {
      title: 'Radical Engineering Transparency',
      desc: 'We present genuine capabilities, reproducible benchmarks, and honest prototype designations. We never invent fake customer logos, fabricated testimonials, or imaginary metrics.',
    },
    {
      title: 'Zero-Downtime & High-Integrity Tolerances',
      desc: 'Whether building double-entry financial ledgers, autonomous obstacle-avoidance firmware, or high-throughput cloud portals, systems are engineered to fail safely under adverse conditions.',
    },
    {
      title: 'Hardware & Software Convergence',
      desc: 'True industrial transformation occurs when physical sensors, actuators, and drones communicate flawlessly with cloud telemetry and distributed databases.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      <SEO
        title="About Peace Haven | Engineering Principles"
        description="Learn about Peace Haven's engineering methodology, cross-disciplinary technical capabilities, and transparency ethos."
      />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>Engineering Organization Overview</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Architecting Systems That <br />
          <span className="text-gradient-champagne">Move Real Industries.</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
          Peace Haven is an integrated technology and engineering firm founded on the principle that the most valuable digital systems are those that securely power physical and commercial infrastructure.
        </p>
      </div>

      {/* Ethos Grid: Warm Off-White Balanced Section */}
      <div className="bg-warm-200 p-8 sm:p-12 rounded-3xl border border-sage-300/80 space-y-10 shadow-card">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-mono text-teal-800 uppercase tracking-widest font-semibold">Our Engineering Creed</span>
          <h2 className="font-heading text-3xl font-bold text-charcoal-900">How We Build</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((p, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-sage-300/80 space-y-3 shadow-subtle hover:border-teal-700/40 hover:shadow-card transition-all">
              <span className="text-xs font-mono text-champagne-600 font-bold">0{i + 1} / PRINCIPLE</span>
              <h3 className="font-heading text-lg font-bold text-charcoal-900">{p.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disciplines Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card bg-charcoal-850/85 p-8 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
          <div className="w-10 h-10 rounded-xl bg-charcoal-900 border border-sage-500/30 flex items-center justify-center text-champagne-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">Industrial Automation</h3>
          <p className="text-slate-300 text-xs leading-relaxed font-light">
            ROS 2 mobile robotics, PLC systems, SCADA, edge vision inference, and autonomous drone thermography inspection.
          </p>
        </div>

        <div className="glass-card bg-charcoal-850/85 p-8 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
          <div className="w-10 h-10 rounded-xl bg-charcoal-900 border border-sage-500/30 flex items-center justify-center text-champagne-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">Financial & Capital Core</h3>
          <p className="text-slate-300 text-xs leading-relaxed font-light">
            Institutional double-entry ledgers, ultra-low latency FIX trading gateways, and compliance reporting pipelines.
          </p>
        </div>

        <div className="glass-card bg-charcoal-850/85 p-8 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
          <div className="w-10 h-10 rounded-xl bg-charcoal-900 border border-sage-500/30 flex items-center justify-center text-champagne-400">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">Cloud Platforms & Talent</h3>
          <p className="text-slate-300 text-xs leading-relaxed font-light">
            Mission-critical web portals, HIPAA clinical telehealth apps, and dedicated US engineering squad augmentation.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card bg-charcoal-850 p-10 rounded-3xl border border-sage-500/25 text-center space-y-4 max-w-4xl mx-auto shadow-xl">
        <h3 className="font-heading text-2xl font-bold text-white">
          Collaborate With Peace Haven Engineers
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Whether you need a dedicated technical squad or a complete end-to-end autonomous robotics build, we are ready to architect your solution.
        </p>
        <Button to="/start-a-project" variant="cyan" size="lg">
          Initiate Engineering Consultation &rarr;
        </Button>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Building2, 
  Factory, 
  HeartPulse, 
  TrendingUp, 
  Zap, 
  Plane, 
  Truck
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const IndustriesPage: React.FC = () => {
  const industries = [
    {
      title: 'Advanced Manufacturing & Robotics',
      icon: Factory,
      description: 'Factory floor automation, ROS 2 autonomous mobile robots, PLC SCADA integration, and optical defect detection.',
      relevance: ['Titan AMR Fleet', 'Edge Vision Sorting', 'Siemens PLC Logic'],
    },
    {
      title: 'Capital Markets & FinTech',
      icon: TrendingUp,
      description: 'Institutional settlement engines, double-entry accounting cores, microsecond order execution, and regulatory KYC/AML pipelines.',
      relevance: ['Strata Ledger Core', 'Vertex FIX Gateway', 'Real-time Risk Checks'],
    },
    {
      title: 'Renewable Energy & Utilities',
      icon: Zap,
      description: 'Autonomous drone thermography for utility-scale solar arrays, wind turbine blade inspection, and smart grid telemetry portals.',
      relevance: ['Skyward Drone Inspector', 'Radiometric Thermal Analysis', 'IEC 62446-3 Reports'],
    },
    {
      title: 'Healthcare & Clinical Systems',
      icon: HeartPulse,
      description: 'HIPAA-compliant telehealth platforms, remote patient monitoring hubs, and HL7 FHIR clinical data interoperability bridges.',
      relevance: ['VitalPulse RPM Hub', 'SMART on FHIR Bridge', 'Encrypted WebRTC Consultations'],
    },
    {
      title: 'Logistics & Supply Chain',
      icon: Truck,
      description: 'Automated warehouse fleet orchestration under VDA 5050, inventory digital twins, and route optimization algorithms.',
      relevance: ['VDA 5050 Fleet Dispatcher', 'Pallet Docking Guidance', 'Real-Time Telemetry'],
    },
    {
      title: 'Defense & Critical Infrastructure',
      icon: Plane,
      description: 'Autonomous perimeter surveillance drones, secure long-range BVLOS telemetry links, and tamper-resistant edge compute nodes.',
      relevance: ['Autonomous Waypoint Patrol', 'Thermal Hotspot Flagging', 'Cellular & Satellite Links'],
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Industries Served & Mission-Critical Sectors | Peace Haven"
        description="Peace Haven engineers advanced systems for manufacturing, capital markets, energy, healthcare, and logistics."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Building2 className="w-3.5 h-3.5" />
          <span>Industrial Sector Coverage</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Engineering for High-Stakes Sectors
        </h1>
        <p className="text-slate-300 text-base leading-relaxed font-light">
          Where zero-downtime, sub-millisecond precision, and rigorous regulatory compliance are operational mandates.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <div
              key={i}
              className="glass-card bg-charcoal-850/85 rounded-2xl p-8 border border-sage-500/20 space-y-4 hover:border-champagne-500/40 transition-all duration-300 group flex flex-col justify-between shadow-card-dark"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-sage-500/30 flex items-center justify-center text-champagne-400 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-champagne-300 transition-colors">
                  {ind.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 border-t border-sage-500/20 space-y-2">
                <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block font-semibold">Key Implementations:</span>
                <div className="flex flex-wrap gap-1.5">
                  {ind.relevance.map((rel, rIdx) => (
                    <span key={rIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20 text-slate-300">
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-sector CTA */}
      <div className="glass-card bg-charcoal-850 p-10 rounded-3xl border border-sage-500/25 text-center space-y-4 max-w-4xl mx-auto shadow-xl">
        <h3 className="font-heading text-2xl font-bold text-white">
          Deploying in a Specialized Industrial Sector?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Our teams bring deep domain experience across ISO standards, FAA airspace regulations, PCI-DSS compliance, and HIPAA mandates.
        </p>
        <Button to="/start-a-project" variant="cyan" size="lg">
          Discuss Your Industry Requirements &rarr;
        </Button>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Users, 
  MapPin, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const CareersPage: React.FC = () => {
  const openings = [
    {
      title: 'Senior Embedded Robotics Engineer (ROS 2 / C++)',
      discipline: 'Robotics & Automation',
      location: 'Remote (US/Global) or On-Site Laboratory',
      type: 'Full-Time',
      tags: ['ROS 2', 'C++20', 'LiDAR SLAM', 'NVIDIA Jetson'],
    },
    {
      title: 'High-Performance Systems Developer (Trading & C++)',
      discipline: 'Trading Systems',
      location: 'Remote (US Timezones)',
      type: 'Full-Time',
      tags: ['C++', 'FIX Protocol', 'Kernel Bypass', 'Low-Latency'],
    },
    {
      title: 'Principal Cloud Architect (Distributed Web & Kafka)',
      discipline: 'Web Development',
      location: 'Remote (US Timezones)',
      type: 'Full-Time',
      tags: ['React', 'TypeScript', 'Node.js', 'Kafka', 'Kubernetes'],
    },
    {
      title: 'Autonomous Flight Firmware Specialist (PX4)',
      discipline: 'Drone Technology',
      location: 'Hybrid / Flight Testing Facility',
      type: 'Full-Time',
      tags: ['PX4 Autopilot', 'MAVLink', 'RTK-GPS', 'Computer Vision'],
    },
    {
      title: 'Healthcare Interoperability Engineer (HL7 / FHIR)',
      discipline: 'Healthcare Technology',
      location: 'Remote (US)',
      type: 'Full-Time',
      tags: ['FHIR R4', 'HIPAA', 'WebRTC', 'PostgreSQL'],
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Careers & Engineering Opportunities | Peace Haven"
        description="Join Peace Haven to build high-stakes technology across robotics, algorithmic trading, and cloud platforms."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Users className="w-3.5 h-3.5" />
          <span>Engineering Careers</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Work at the Frontiers of Engineering
        </h1>
        <p className="text-slate-300 text-base leading-relaxed font-light">
          We solve complex engineering challenges where code impacts physical machines, capital markets, and mission-critical operations.
        </p>
      </div>

      {/* Engineering Culture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2 shadow-card-dark">
          <span className="font-heading text-lg font-bold text-white block">Deep Technical Autonomy</span>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
            Engineers lead system architecture and technical decisions. Minimal bureaucracy, maximum shipping velocity.
          </p>
        </div>

        <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2 shadow-card-dark">
          <span className="font-heading text-lg font-bold text-white block">Hardware & Lab Access</span>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
            Direct access to robotics simulation rigs, drone testbeds, and edge acceleration clusters.
          </p>
        </div>

        <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2 shadow-card-dark">
          <span className="font-heading text-lg font-bold text-white block">Competitive Compensation</span>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
            Top-tier salary, flexible remote arrangements, continuous education stipends, and comprehensive health coverage.
          </p>
        </div>
      </div>

      {/* Open Roles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-white">Active Engineering Openings</h2>
          <span className="text-xs font-mono text-champagne-400">{openings.length} Requisitions Active</span>
        </div>

        <div className="space-y-4">
          {openings.map((role, idx) => (
            <div
              key={idx}
              className="glass-card bg-charcoal-850/85 rounded-2xl p-6 border border-sage-500/20 hover:border-champagne-500/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-card-dark"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-champagne-400 font-medium">{role.discipline}</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" /> {role.type}
                  </span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-slate-400" /> {role.location}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-champagne-300 transition-colors">
                  {role.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {role.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  to="/contact"
                  variant="secondary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 text-champagne-400" />}
                >
                  Apply via Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Application Note */}
      <div className="glass-card bg-charcoal-850/90 p-8 rounded-2xl border border-sage-500/25 text-center max-w-2xl mx-auto space-y-3 shadow-card-dark">
        <h3 className="font-heading text-lg font-bold text-white">Don't see your specific specialty?</h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
          We are always eager to talk with exceptional engineers in C++, Rust, ROS 2, computer vision, and distributed systems. Send your GitHub or code portfolio to careers@peacehaven.tech.
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck, Compass, Search } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { servicesData } from '../data/servicesData';

export const ServicesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  const filterTabs = [
    { id: 'all', label: 'All Disciplines (8)' },
    { id: 'cloud', label: 'Cloud & Software' },
    { id: 'engineering', label: 'Robotics & Aerial' },
    { id: 'business', label: 'Operations & Markets' },
  ];

  const filteredServices = servicesData.filter((service) => {
    // Search query matching
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.capabilities.some((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'cloud') {
      return ['web-development', 'fintech', 'healthcare'].includes(service.id);
    }
    if (selectedFilter === 'engineering') {
      return ['robotics', 'drone-technology'].includes(service.id);
    }
    if (selectedFilter === 'business') {
      return ['us-staffing', 'trading', 'digital-marketing'].includes(service.id);
    }
    return true;
  });

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEO 
        title="Services & Engineering Capabilities | Peace Haven" 
        description="Explore Peace Haven's 8 specialized engineering divisions: Web Development, FinTech, Robotics, Drone Technology, Healthcare, US Staffing, Trading, and Digital Marketing."
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Eight Integrated Engineering Divisions</span>
        </div>
        
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Capabilities Built Around Your Ambition.
        </h1>
        
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
          From full-stack cloud software and financial systems to industrial robotics, aerial workflows, and market technologies — Peace Haven delivers connected capabilities across eight specialized divisions.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Service category filters">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selectedFilter === tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                selectedFilter === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-lg shadow-cyan-950/50'
                  : 'bg-navy-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search capabilities..."
            aria-label="Search service capabilities"
            className="w-full bg-navy-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
          />
        </div>

      </div>

      {/* Services Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="glass-card rounded-2xl p-8 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 group shadow-xl shadow-black/20"
          >
            <div className="space-y-6">
              
              {/* Header: Division Counter + Deliverable Count */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Division 0{index + 1}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-navy-900 border border-slate-700/80 text-slate-300">
                  {service.capabilities.length} Capabilities
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <Link to={`/services/${service.slug}`} className="group-hover:text-cyan-300 transition-colors">
                  <h2 className="font-heading text-2xl font-bold text-white tracking-wide">
                    {service.title}
                  </h2>
                </Link>
                <p className="text-cyan-400/90 font-mono text-xs mt-1">
                  {service.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {service.shortDescription}
              </p>

              {/* Capabilities checklist */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Engineering Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.capabilities.slice(0, 4).map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="truncate">{cap.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions & Technology Tags */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 mt-6">
              <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                {service.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 border border-slate-800 text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>

              <Button
                to={`/services/${service.slug}`}
                variant="cyan"
                size="sm"
                rightIcon={<ArrowRight className="w-3 h-3" />}
              >
                Explore Service
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inquiry Callout Banner */}
      <div className="rounded-3xl p-10 lg:p-12 glass-card border border-cyan-500/30 text-center space-y-6 max-w-4xl mx-auto bg-gradient-to-b from-navy-900/95 to-navy-950/95 shadow-2xl">
        <Sparkles className="w-10 h-10 text-cyan-400 mx-auto" />
        
        <div className="space-y-2">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Need a Cross-Discipline Solution?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto font-light leading-relaxed">
            Many enterprise challenges require combining web platforms with robotics controls, drone data processing, or custom financial ledgers. We architect integrated multi-service systems.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Button to="/start-a-project" variant="cyan" size="lg">
            Start a Custom Project &rarr;
          </Button>
          <Button to="/contact" variant="secondary" size="lg">
            Contact Engineering Team
          </Button>
        </div>
      </div>

    </div>
  );
};

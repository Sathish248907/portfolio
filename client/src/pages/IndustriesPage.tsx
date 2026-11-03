import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  FolderGit2 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { Button } from '../components/common/Button';
import { IndustryCard } from '../components/industries/IndustryCard';
import { industriesData } from '../data/industriesData';

export const IndustriesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  const filterTabs = [
    { id: 'all', label: 'All Industries (10)' },
    { id: 'software', label: 'Software & SaaS (5)' },
    { id: 'engineering', label: 'Robotics & Hardware (2)' },
    { id: 'operations', label: 'Operations & Commerce (3)' },
  ];

  const filteredIndustries = industriesData.filter((ind) => {
    const matchesSearch = 
      ind.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'software') {
      return ['it-software', 'banking-finance', 'healthcare', 'real-estate', 'education'].includes(ind.id);
    }
    if (selectedFilter === 'engineering') {
      return ['manufacturing', 'agriculture'].includes(ind.id);
    }
    if (selectedFilter === 'operations') {
      return ['logistics', 'retail-ecommerce', 'human-resources'].includes(ind.id);
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
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO
        title="Industries We Serve | Technology Solutions Across Industries | Peace Haven"
        description="Discover how Peace Haven delivers technology-driven solutions across finance, healthcare, manufacturing, agriculture, real estate and other industries."
        canonicalUrl="https://peacehaven.tech/industries"
        breadcrumbs={[{ name: 'Industries', url: '/industries' }]}
      />

      {/* Semantic Accessible Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Industries' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Building2 className="w-3.5 h-3.5" />
          <span>INDUSTRIES WE SERVE</span>
        </div>
        
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Technology That Moves Industries Forward.
        </h1>
        
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
          From intelligent software and financial technology to robotics and healthcare innovation, Peace Haven develops technology-driven solutions that help businesses modernize operations, solve complex challenges and explore new opportunities.
        </p>

        {/* Core Pillars Indicator */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-full bg-charcoal-850 border border-sage-500/20 text-champagne-300">Web Development</span>
          <span className="text-slate-600">&bull;</span>
          <span className="px-3 py-1 rounded-full bg-charcoal-850 border border-sage-500/20 text-teal-300">FinTech</span>
          <span className="text-slate-600">&bull;</span>
          <span className="px-3 py-1 rounded-full bg-charcoal-850 border border-sage-500/20 text-[#dfa561]">Robotics & Automation</span>
          <span className="text-slate-600">&bull;</span>
          <span className="px-3 py-1 rounded-full bg-charcoal-850 border border-sage-500/20 text-warm-200">Healthcare Solutions</span>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-sage-500/20 pb-6">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Industry sector filters">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selectedFilter === tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 ${
                selectedFilter === tab.id
                  ? 'bg-teal-700 text-white border border-teal-600/50 font-semibold shadow-sm'
                  : 'bg-charcoal-850/80 text-slate-300 border border-sage-500/20 hover:text-white hover:border-sage-500/40'
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
            placeholder="Search industries & tags..."
            aria-label="Search industries"
            className="w-full bg-charcoal-850/80 border border-sage-500/25 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-warm-100 placeholder-slate-400 focus:outline-none focus:border-champagne-500/60 focus:ring-1 focus:ring-champagne-400"
          />
        </div>

      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredIndustries.map((industry, index) => (
          <motion.div
            key={industry.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <IndustryCard industry={industry} showProjectBadge={true} />
          </motion.div>
        ))}
      </div>

      {filteredIndustries.length === 0 && (
        <div className="rounded-2xl p-12 bg-charcoal-850/80 border border-sage-500/20 text-center max-w-lg mx-auto space-y-3">
          <p className="text-warm-100 font-heading text-lg font-bold">No industries match your search.</p>
          <p className="text-slate-400 text-xs font-mono">Try searching for broader keywords such as "FinTech", "Robotics", "SaaS", or "Healthcare".</p>
          <button
            onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
            className="text-xs font-mono text-champagne-400 hover:underline pt-2 inline-block"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Cross-Sector Technical Capabilities Summary */}
      <div className="glass-card bg-charcoal-850/90 rounded-3xl p-8 sm:p-12 border border-sage-500/25 space-y-8 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-champagne-400 uppercase tracking-widest block">
            Connected Capabilities
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            How Peace Haven Connects Cross-Industry Technologies
          </h2>
          <p className="text-slate-300 text-sm font-light leading-relaxed">
            Rather than relying on single-purpose agencies, Peace Haven delivers cohesive solutions spanning web architecture, embedded firmware, financial settlement, and clinical compliance under one unified technical team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/20 space-y-2">
            <span className="text-xs font-mono text-champagne-400 font-bold block">01 · Web Development</span>
            <h3 className="font-heading text-base font-bold text-white">Cloud & Digital Workspaces</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              High-throughput React/Node architectures, multi-role portals, and custom SaaS platforms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/20 space-y-2">
            <span className="text-xs font-mono text-teal-400 font-bold block">02 · FinTech Solutions</span>
            <h3 className="font-heading text-base font-bold text-white">Financial & Asset Tech</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Real-time bullion pricing, fractional investing, UPI checkouts, and institutional vaulting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/20 space-y-2">
            <span className="text-xs font-mono text-[#dfa561] font-bold block">03 · Robotics & Automation</span>
            <h3 className="font-heading text-base font-bold text-white">Industrial & Edge Vision</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              6-DOF articulated arms, computer vision wildlife deterrents, and assistive robotics.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/20 space-y-2">
            <span className="text-xs font-mono text-warm-200 font-bold block">04 · Healthcare Solutions</span>
            <h3 className="font-heading text-base font-bold text-white">Clinical & Diagnostics</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Doctor appointment scheduling, lateral flow screening prototypes, and patient privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Final Inquiry CTA */}
      <div className="glass-card bg-charcoal-850 p-10 sm:p-14 rounded-3xl border border-sage-500/25 text-center space-y-5 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
        <div className="space-y-3 relative z-10">
          <span className="text-xs font-mono text-[#dfa561] uppercase tracking-widest block">
            Start a Consultation
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Deploying in a Specialized Industry Sector?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Our engineering team assesses your specific operational workflows, regulatory constraints, and architectural requirements to design a tailored technological roadmap.
          </p>
        </div>
        
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4 relative z-10">
          <Button to="/start-a-project" variant="cyan" size="lg">
            Discuss Your Industry Requirements &rarr;
          </Button>
          <Button to="/services" variant="secondary" size="lg">
            Explore All 8 Service Divisions
          </Button>
        </div>
      </div>

    </div>
  );
};

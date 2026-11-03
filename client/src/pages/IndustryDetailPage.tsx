import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  FolderGit2,
  Sparkles,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { Button } from '../components/common/Button';
import { getIndustryBySlug, industriesData } from '../data/industriesData';
import { projectsData } from '../data/projectsData';
import { generateIndustrySchema } from '../utils/seo';

export const IndustryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Ensure scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const industry = getIndustryBySlug(slug || '');

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  // Find linked portfolio projects
  const connectedProjects = projectsData.filter((p) => 
    industry.relatedProjectSlugs.includes(p.slug)
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 selection:bg-teal-700/30 selection:text-champagne-300">
      <SEO
        title={`${industry.title} | Industries We Serve | Peace Haven`}
        description={industry.shortDescription}
        canonicalUrl={`https://peacehaven.tech/industries/${industry.slug}`}
        keywords={industry.tags}
        breadcrumbs={[
          { name: 'Industries', url: '/industries' },
          { name: industry.title, url: `/industries/${industry.slug}` },
        ]}
        schema={generateIndustrySchema(industry)}
      />

      {/* 1. Semantic Accessible Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Industries', href: '/industries' },
          { label: industry.title },
        ]}
      />

      {/* 2. Hero Section */}
      <section aria-labelledby="industry-hero-heading" className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1.5 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-mono font-medium backdrop-blur-md">
            Sector {industry.number}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-300 text-xs font-mono flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-champagne-400" />
            <span>Target Industry Domain</span>
          </span>
        </div>

        <div className="space-y-4 max-w-4xl">
          <h1 
            id="industry-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
          >
            {industry.title}
          </h1>
          <p className="font-mono text-sm sm:text-base text-champagne-400/90 leading-relaxed">
            {industry.heroHeadline}
          </p>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {industry.heroDescription}
          </p>
        </div>

        {/* Technology Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {industry.tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-charcoal-850 border border-sage-500/30 text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Primary CTA Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Button
            to={`/start-a-project?industry=${industry.slug}`}
            variant="cyan"
            size="md"
          >
            Inquire About {industry.title.split('&')[0].trim()} Solutions
          </Button>
          <Button
            to="/industries"
            variant="secondary"
            size="md"
          >
            View All 10 Industries
          </Button>
        </div>
      </section>

      {/* 3. Industry Overview & Strategic Perspective */}
      <section className="glass-card bg-charcoal-850/85 rounded-3xl p-8 sm:p-12 border border-sage-500/20 space-y-8 shadow-card-dark">
        <div className="space-y-3">
          <span className="text-xs font-mono text-champagne-400 uppercase tracking-widest block">
            Domain Architecture & Strategy
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Industry Overview & Technological Landscape
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-300 text-base leading-relaxed font-light">
              {industry.overview.summary}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              {industry.overview.marketContext}
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-charcoal-900/90 border border-sage-500/25 space-y-4">
            <span className="text-xs font-mono text-champagne-400 font-bold uppercase tracking-wider block">
              Core Engineering Deliverables
            </span>
            <ul className="space-y-2.5">
              {industry.overview.keyDeliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                  <CheckCircle2 className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Common Business Challenges */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-champagne-400 uppercase tracking-widest block">
            Operational Friction
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Common Business & Engineering Challenges
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl font-light">
            Critical pain points organizations face when modernizing systems in this sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industry.challenges.map((challenge, idx) => (
            <div 
              key={idx}
              className="glass-card bg-charcoal-850/80 rounded-2xl p-6 sm:p-7 border border-sage-500/20 space-y-3 hover:border-champagne-500/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 text-[#dfa561]">
                <AlertTriangle className="w-4 h-4 text-[#dfa561] shrink-0" />
                <h3 className="font-heading text-base font-bold text-white">
                  {challenge.title}
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Peace Haven's Technology Capabilities */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-champagne-400 uppercase tracking-widest block">
            Technical Capabilities
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Peace Haven's Sector-Specific Engineering Solutions
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl font-light">
            How our engineering team develops reliable, scalable, and secure technologies tailored to this industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industry.capabilities.map((cap, idx) => (
            <div 
              key={idx}
              className="glass-card bg-charcoal-850/80 rounded-2xl p-6 sm:p-7 border border-sage-500/20 space-y-4 hover:border-teal-500/40 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono text-teal-400 font-bold">Pillar 0{idx + 1}</span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {cap.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>

              <div className="pt-3 border-t border-sage-500/15 space-y-1.5">
                {cap.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Applicable Peace Haven Services */}
      <section className="glass-card bg-charcoal-850/70 rounded-3xl p-8 border border-sage-500/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-champagne-400 uppercase tracking-wider block">
              Service Alignment
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Applicable Peace Haven Service Divisions
            </h2>
          </div>
          <Link to="/services" className="text-xs font-mono text-champagne-400 hover:underline flex items-center gap-1">
            <span>Explore All 8 Divisions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industry.applicableServices.map((service, idx) => (
            <Link
              key={idx}
              to={`/services/${service.slug}`}
              className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/20 hover:border-champagne-500/40 transition-all group flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="text-sm font-heading font-bold text-white group-hover:text-champagne-300 transition-colors">
                  {service.title}
                </span>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-champagne-400 group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Connected Portfolio Projects */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Verified Case Studies & Benchmarks</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Related Peace Haven Portfolio Work
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl font-light">
            Genuine applications, prototypes, and platform benchmarks associated with {industry.title}.
          </p>
        </div>

        {connectedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {connectedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-charcoal-850/90 rounded-2xl overflow-hidden border border-sage-500/25 hover:border-champagne-500/40 transition-all duration-300 flex flex-col justify-between group shadow-card-dark"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-charcoal-900">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-900/25 to-transparent" />
                  
                  {/* Status & Category Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900/95 border border-champagne-500/40 text-champagne-300 text-xs font-mono backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
                      <span>{project.statusBadge}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-mono text-warm-200 px-2.5 py-1 rounded-md bg-charcoal-900/90 border border-sage-500/30 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-champagne-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-champagne-400/90 text-xs font-mono">
                      {project.subtitle}
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                      {project.shortDescription || project.overview}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span 
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="pt-4 border-t border-sage-500/20 flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-mono font-medium transition-colors"
                      >
                        <span>Visit Live Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-warm-200/10 hover:bg-warm-200/20 border border-champagne-500/30 text-champagne-300 text-xs font-mono font-medium transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl p-10 bg-charcoal-850/85 border border-sage-500/20 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-sage-500/30 text-champagne-400 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-white">
                Selected Works in Preparation
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Our engineering team is compiling sanitized demonstration prototypes and architectural case studies for {industry.title}. We do not publish unverified commercial logos or fabricated case studies.
              </p>
            </div>
            <div className="pt-2 flex justify-center">
              <Button
                to={`/start-a-project?industry=${industry.slug}`}
                variant="cyan"
                size="sm"
              >
                Inquire About Custom Architecture
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* 8. Business Use Cases */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-champagne-400 uppercase tracking-widest block">
            Real-World Scenarios
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Practical Business & Operational Use Cases
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl font-light">
            Illustrating how organizations leverage our software, robotics, and integrations to solve specific operational mandates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {industry.useCases.map((uc, idx) => (
            <div
              key={idx}
              className="glass-card bg-charcoal-850/85 rounded-2xl p-6 sm:p-7 border border-sage-500/20 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#dfa561] font-bold">Use Case 0{idx + 1}</span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {uc.title}
                </h3>
                
                <div className="space-y-2 text-xs font-light">
                  <div>
                    <span className="font-mono text-slate-400 block font-semibold uppercase text-[10px]">Challenge:</span>
                    <p className="text-slate-300 leading-relaxed">{uc.challenge}</p>
                  </div>
                  <div>
                    <span className="font-mono text-teal-400 block font-semibold uppercase text-[10px]">Solution:</span>
                    <p className="text-slate-300 leading-relaxed">{uc.solution}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-sage-500/20">
                <span className="font-mono text-champagne-400 block font-semibold uppercase text-[10px]">Outcome:</span>
                <p className="text-xs text-warm-100 font-medium leading-relaxed mt-0.5">{uc.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="glass-card bg-charcoal-850 p-10 sm:p-14 rounded-3xl border border-sage-500/25 text-center space-y-6 max-w-4xl mx-auto shadow-2xl">
        <div className="space-y-3">
          <span className="text-xs font-mono text-[#dfa561] uppercase tracking-widest block">
            Initiate Engagement
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Ready to Modernize Your {industry.title.split('&')[0].trim()} Infrastructure?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Collaborate with Peace Haven to design, architect, and deploy reliable digital systems, robotics prototypes, and automated workflows aligned with your industry's exact standards.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Button
            to={`/start-a-project?industry=${industry.slug}`}
            variant="cyan"
            size="lg"
          >
            Start an Industry Project
          </Button>
          <Button
            to="/industries"
            variant="secondary"
            size="lg"
          >
            Browse Other Industries
          </Button>
        </div>
      </section>
    </div>
  );
};


import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  BarChart3, 
  Layers, 
  Code2,
  Calendar,
  Building2
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      <SEO
        title={`${project.title} | Case Study`}
        description={project.overview}
        ogImage={project.heroImage}
      />

      {/* Back button */}
      <div>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            {project.statusBadge}
          </span>
          <span className="px-3 py-1 rounded-full bg-navy-900 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5">
            <Building2 className="w-3 h-3 text-cyan-400" />
            {project.industry}
          </span>
          <span className="px-3 py-1 rounded-full bg-navy-900 border border-slate-700 text-slate-400 text-xs font-mono flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-slate-500" />
            {project.publishedAt}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 font-light">
          {project.subtitle}
        </p>
      </div>

      {/* Hero Image */}
      <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden glass-card border border-slate-800 shadow-2xl relative">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Results / Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {project.resultsOrProjections.map((res, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-1">
            <span className="font-heading text-3xl font-extrabold text-cyan-400 block">
              {res.metric}
            </span>
            <span className="font-mono text-xs text-white font-medium block">
              {res.label}
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              {res.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Challenge & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <span className="text-red-400 font-mono text-sm">[01]</span>
            The Engineering Challenge
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-sm">[02]</span>
            Architectural Solution
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h2 className="font-heading text-xl font-bold text-white">
            Architecture & Implementation Highlights
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.architectureHighlights.map((highlight, idx) => (
            <li key={idx} className="p-4 rounded-xl bg-navy-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies Used */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <h3 className="font-heading text-lg font-bold text-white">Technologies & Systems Deployed</h3>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-lg bg-navy-900 border border-slate-700 text-xs font-mono text-cyan-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Gallery */}
      {project.galleryImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-white">System Visuals & Schematics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.galleryImages.map((img, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden glass-card border border-slate-800">
                <img src={img} alt={`Visual schematic ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="glass-card p-10 rounded-3xl border border-cyan-500/30 text-center space-y-4 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900">
        <h3 className="font-heading text-2xl font-bold text-white">
          Require Similar Engineering Architecture?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Contact our team to review complete technical whitepapers, simulated code repositories, and deployment specifications.
        </p>
        <Button to="/start-a-project" variant="cyan" size="lg">
          Submit System Requirements &rarr;
        </Button>
      </div>
    </div>
  );
};

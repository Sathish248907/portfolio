import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { Button } from '../common/Button';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '../../data/projectsData';

export const FeaturedProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'web-development', label: 'Web Dev' },
    { id: 'fintech', label: 'FinTech' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'drone-technology', label: 'Drones' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'trading', label: 'Trading' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData.slice(0, 3)
    : projectsData.filter((p) => p.serviceId === selectedCategory);

  return (
    <section className="py-20 relative border-t border-slate-800/80" aria-labelledby="portfolio-heading">
      <Container size="lg" className="space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal direction="left">
            <SectionHeading
              align="left"
              eyebrow="Demonstration Prototypes"
              title="Ideas made tangible."
              subtitle="Explore selected work demonstrating how technology and engineering can solve real problems."
            />
          </Reveal>

          <Reveal direction="right">
            <Button
              to="/portfolio"
              variant="secondary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Full Portfolio
            </Button>
          </Reveal>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-navy-950 font-bold shadow-neon-cyan'
                  : 'bg-navy-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} direction="up" delay={idx * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Laboratory Transparency Banner */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Honest Demonstration Designation: Benchmarks & reference prototypes built by Peace Haven engineers.</span>
          </div>
          <Link to="/about" className="text-cyan-400 hover:underline hidden sm:inline-block">
            Our Principles &rarr;
          </Link>
        </div>

      </Container>
    </section>
  );
};

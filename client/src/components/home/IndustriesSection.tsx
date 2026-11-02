import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { Button } from '../common/Button';
import { ParticleBackground } from '../effects/ParticleBackground';
import { IndustryCard } from '../industries/IndustryCard';
import { industriesData } from '../../data/industriesData';

export const IndustriesSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07151e] border-t border-[#1b3240]" aria-labelledby="industries-heading">
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        particleCount={55}
        connectionDistance={115}
        particleSpeed={0.7}
        enableGlow={true}
        enableMouseInteraction={true}
      />

      <Container size="lg" className="space-y-14 relative z-10">
        
        <Reveal direction="up">
          <SectionHeading
            theme="dark"
            eyebrow="INDUSTRIES WE SERVE"
            title="Technology That Moves Industries Forward."
            subtitle="From intelligent software and financial technology to robotics and healthcare innovation, Peace Haven develops technology-driven solutions that help businesses modernize operations, solve complex challenges and explore new opportunities."
          />
        </Reveal>

        {/* 10 Industry Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {industriesData.map((industry, index) => (
            <Reveal key={industry.id} direction="up" delay={Math.min(index * 0.05, 0.4)}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <Reveal direction="up" delay={0.2}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Button
              to="/industries"
              variant="cyan"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Our Solutions
            </Button>
            <Button
              to="/start-a-project"
              variant="secondary"
              size="lg"
            >
              Discuss Your Industry Requirements
            </Button>
          </div>
        </Reveal>

      </Container>
    </section>
  );
};

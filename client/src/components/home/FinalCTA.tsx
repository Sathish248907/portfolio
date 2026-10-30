import React from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { ParticleBackground } from '../effects/ParticleBackground';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07151e] border-t border-[#1b3240]" aria-labelledby="cta-heading">
      {/* Cinematic Animated Particle Constellation Background */}
      <ParticleBackground
        particleCount={45}
        connectionDistance={105}
        particleSpeed={0.7}
        enableGlow={true}
        enableMouseInteraction={true}
      />

      <Container size="lg" className="relative z-10">
        <Reveal direction="up">
          <div className="rounded-3xl p-10 sm:p-16 border border-sage-500/25 text-center space-y-8 bg-[#0c1f2a]/90 backdrop-blur-md shadow-2xl relative overflow-hidden">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-200/10 border border-[#dfa561]/35 text-[#dfa561] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#dfa561]" />
              <span>Start the Conversation</span>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 
                id="cta-heading"
                className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
              >
                Have a challenge worth solving?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                Tell us what you're building, what needs to improve, or where your next opportunity lies. Let's explore the right solution together.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to="/start-a-project"
                variant="champagne"
                size="lg"
                className="bg-[#dfa561] hover:bg-[#d09550] text-[#08151e] font-semibold px-7 py-3.5 rounded-2xl shadow-lg border-0 transition-transform hover:scale-[1.02]"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>

              <Button
                to="/contact"
                variant="secondary"
                size="lg"
                className="bg-[#0b1c26]/90 hover:bg-[#122835] text-white border border-[#213a48] hover:border-[#dfa561]/40 px-7 py-3.5 rounded-2xl transition-transform hover:scale-[1.02]"
                leftIcon={<Mail className="w-4 h-4 text-[#dfa561]" />}
              >
                Contact Our Team
              </Button>
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
};

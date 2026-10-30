import React from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="cta-heading">
      <Container size="lg">
        <Reveal direction="up">
          <div className="glass-card rounded-3xl p-10 sm:p-16 border border-cyan-500/30 text-center space-y-8 bg-gradient-to-b from-navy-900/90 via-navy-850/90 to-navy-900/95 shadow-2xl relative overflow-hidden">
            
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-electric-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
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
                variant="cyan"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>

              <Button
                to="/contact"
                variant="secondary"
                size="lg"
                leftIcon={<Mail className="w-4 h-4 text-cyan-400" />}
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

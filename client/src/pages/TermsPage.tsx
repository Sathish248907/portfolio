import React from 'react';
import { Scale, ShieldAlert, Cpu, Terminal } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SEO title="Terms of Service" description="Peace Haven commercial terms, engineering demonstration disclosures, and usage guidelines." />

      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Scale className="w-3.5 h-3.5" />
          <span>Commercial Terms & Disclosures</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm font-mono">
          Effective Date: January 1, 2026 &bull; Peace Haven Technologies Inc.
        </p>
      </div>

      <div className="bg-charcoal-850/90 p-8 rounded-2xl border border-sage-700/40 space-y-8 text-slate-300 text-sm leading-relaxed shadow-lg">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-champagne-400" />
            1. Scope of Engagement
          </h2>
          <p>
            These terms govern your access to and use of the web platform, portfolio showcases, engineering demonstration prototypes, and inquiry intake workflows operated by Peace Haven Technologies Inc. (&quot;Peace Haven&quot;).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-champagne-400" />
            2. Engineering Demonstrations & Transparency Disclosure
          </h2>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-700/40 text-xs text-slate-300 space-y-2">
            <p className="font-semibold text-champagne-400 uppercase tracking-wider font-mono">
              Genuine Engineering Disclosure
            </p>
            <p>
              In full adherence to our honesty and transparency principles, sample projects displayed on this website marked as &quot;Demonstration Prototype&quot; or &quot;Proof-of-Concept&quot; represent internal engineering laboratory benchmarks and reference architectures built by our team to demonstrate architectural and technical capabilities. Peace Haven never fabricates false third-party client testimonials, false client logos, or unsubstantiated metrics.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-champagne-400" />
            3. Intellectual Property
          </h2>
          <p>
            All custom software architecture, design patterns, branding assets, schematic diagrams, code repositories, and written documentation displayed on this platform are proprietary to Peace Haven Technologies Inc. unless otherwise contracted in a formal Statement of Work (SOW).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white">
            4. Enterprise Statements of Work (SOW)
          </h2>
          <p>
            Formal consulting, bespoke software development, industrial automation deployment, and drone hardware integrations are governed by mutually executed master service agreements (MSAs) and specific Statements of Work containing customized SLAs, warranties, and deliverables.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white">
            5. Governing Law
          </h2>
          <p>
            These terms and any disputes arising out of the website or inquiry system shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
};

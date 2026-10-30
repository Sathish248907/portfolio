import React from 'react';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SEO title="Privacy Policy" description="Peace Haven enterprise data privacy, security, and governance standards." />

      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Data Governance & Security Standard</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm font-mono">
          Last Updated: January 1, 2026 &bull; Peace Haven Technologies Inc.
        </p>
      </div>

      <div className="bg-charcoal-850/90 p-8 rounded-2xl border border-sage-700/40 space-y-8 text-slate-300 text-sm leading-relaxed shadow-lg">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-champagne-400" />
            1. Commitment to Data Integrity & Confidentiality
          </h2>
          <p>
            Peace Haven Technologies (&quot;Peace Haven&quot;, &quot;we&quot;, &quot;our&quot;) is an engineering and technology company serving business clients, industrial enterprises, and research organizations. We adhere strictly to data minimization and privacy-by-design principles across all systems and websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-champagne-400" />
            2. Information We Collect
          </h2>
          <p>
            We collect only information necessary to evaluate, scope, and fulfill engineering project inquiries, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong className="text-slate-200">Contact Information:</strong> Name, work email address, phone number, and organization name.</li>
            <li><strong className="text-slate-200">Project Parameters:</strong> Service requirements, estimated timelines, budget tiers, and technical scope notes.</li>
            <li><strong className="text-slate-200">Technical Telemetry:</strong> Standard non-identifying server logs (IP address, browser user-agent, timestamp) for security monitoring and DDoS mitigation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-champagne-400" />
            3. Use of Information
          </h2>
          <p>
            Your information is utilized solely for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Responding to commercial engineering inquiries and preparing architectural proposals.</li>
            <li>Direct communication regarding active engagements or technical deliverables.</li>
            <li>Ensuring the operational security and availability of our web applications and API endpoints.</li>
          </ul>
          <p className="font-medium text-champagne-300">
            Peace Haven does not sell, rent, monetize, or broker commercial client data to any third-party marketing entities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white">
            4. Security Controls & Encryption
          </h2>
          <p>
            We deploy multi-layered defense-in-depth measures, including TLS 1.3 encryption in transit, AES-256 encryption for persisted databases, strict role-based access control (RBAC), and automated rate limiting to prevent unauthorized tampering or exfiltration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-white">
            5. Contact Information & Data Inquiries
          </h2>
          <p>
            For data privacy inquiries, deletion requests, or compliance audits, contact our security office directly at:
          </p>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-700/40 font-mono text-xs text-slate-200">
            Peace Haven Technologies Inc. &bull; Enterprise Compliance Division<br />
            Email: privacy@peacehaven.tech<br />
            Global Response Time: Within 24-48 business hours
          </div>
        </section>
      </div>
    </div>
  );
};

import React from 'react';
import { Settings, ShieldCheck, Database, Key, Server, Check } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AdminSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">System Settings & Security Policies</h1>
        <p className="text-slate-400 text-xs">Configure database synchronization, audit retention, and API endpoints.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Environment Status */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Server className="w-5 h-5" />
            <h2 className="font-heading text-base font-bold text-white">API Gateway Status</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">BACKEND STATUS</span>
              <span className="text-emerald-400 font-bold">Node.js / Express</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">API VERSION</span>
              <span className="text-cyan-300 font-bold">v1 (/api/v1)</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">DATABASE ENGINE</span>
              <span className="text-cyan-300 font-bold">MongoDB / Mongoose</span>
            </div>
          </div>
        </div>

        {/* Security & Access Policy */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-heading text-base font-bold text-white">Security & Audit Policies</h2>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Public administrator self-registration disabled (Strict zero-trust enforcement)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>JWT Bearer token verification with 24-hour expiration</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Rate limiting enabled: 100 requests / 15 minutes on inquiry endpoints</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Helmet HTTP security headers configured (CSP, X-Frame-Options, HSTS)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

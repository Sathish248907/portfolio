import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

interface AccessDeniedProps {
  moduleName?: string;
  requiredPermission?: string;
  userRole?: string;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  moduleName = 'this administrative module',
  requiredPermission,
  userRole = 'Authorized User',
}) => {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-6">
      <div className="bg-charcoal-850/95 border border-red-500/30 max-w-lg w-full p-8 rounded-2xl text-center space-y-5 shadow-2xl backdrop-blur-md">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-heading font-bold text-white">Access Restricted</h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            Your current assigned administrative role (
            <span className="font-mono text-champagne-300 font-semibold">{userRole}</span>) does not possess permission to access {moduleName}.
          </p>
          {requiredPermission && (
            <p className="text-[11px] font-mono text-slate-500 bg-charcoal-900 py-1.5 px-3 rounded-lg border border-sage-700/20 inline-block">
              Required privilege: <span className="text-amber-400">{requiredPermission}</span>
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/admin" variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Return to Dashboard
          </Button>
          <Link
            to="/admin/profile"
            className="text-xs text-slate-400 hover:text-champagne-300 transition-colors underline"
          >
            Review My Permissions
          </Link>
        </div>
      </div>
    </div>
  );
};

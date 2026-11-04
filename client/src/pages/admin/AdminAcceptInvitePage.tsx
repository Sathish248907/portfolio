import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { api } from '../../lib/api';
import { Button } from '../../components/common/Button';

export const AdminAcceptInvitePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [verifying, setVerifying] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('No invitation token provided. Please check the link from your email.');
      setVerifying(false);
      return;
    }

    const verify = async () => {
      try {
        const data = await api.verifyInvitationToken(token);
        if (data?.email) {
          setInviteData(data);
          setName(data.name || '');
        } else {
          setError('Invitation token is invalid or has expired.');
        }
      } catch (e: any) {
        setError(e.message || 'Invitation token verification failed.');
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await api.acceptInvitation(token, name, password);
      if (res?.success) {
        setCompleted(true);
      } else {
        setError((res as any)?.error || 'Failed to activate account.');
      }
    } catch (e: any) {
      setError(e.message || 'Error accepting invitation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4">
      <div className="bg-charcoal-850/95 border border-sage-700/40 max-w-md w-full p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-700 via-sage-500 to-champagne-400 p-[1.5px] mx-auto">
            <div className="w-full h-full bg-charcoal-900 rounded-[10px] flex items-center justify-center text-champagne-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <h1 className="font-heading font-bold text-xl text-white">Activate Admin Account</h1>
          <p className="text-slate-400 text-xs">Peace Haven Technologies Internal Administrative Portal</p>
        </div>

        {verifying ? (
          <div className="py-8 text-center text-slate-400 text-xs font-mono">
            Verifying single-use invitation credentials...
          </div>
        ) : error && !inviteData ? (
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-center space-y-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
            <p className="text-xs text-red-300">{error}</p>
            <Button to="/admin/login" variant="secondary" size="sm" className="w-full">
              Back to Login
            </Button>
          </div>
        ) : completed ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center space-y-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div>
              <h3 className="font-heading font-bold text-base text-white">Account Activated</h3>
              <p className="text-xs text-slate-300 mt-1">
                Your administrative account has been successfully verified. You may now sign in using your credentials.
              </p>
            </div>
            <Button to="/admin/login" variant="champagne" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Proceed to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="bg-charcoal-900 p-3.5 rounded-xl border border-sage-700/30 space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Email:</span>
                <span className="text-champagne-300 font-semibold">{inviteData?.email}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Assigned Role:</span>
                <span className="capitalize text-teal-300">{inviteData?.role?.replace(/_/g, ' ')}</span>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-[11px]">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Create Secure Password (Min 8 Characters)</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Confirm Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-champagne-400"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="champagne" size="sm" className="w-full" disabled={submitting}>
                {submitting ? 'Activating Credentials...' : 'Set Password & Activate Account'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, ShieldAlert, ArrowRight, KeyRound, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Valid administrator email required'),
  password: z.string().min(6, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@peacehaven.tech',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    try {
      const res = await api.adminLogin(data.email, data.password);
      login(res.token, res.user);
      navigate('/admin');
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <SEO title="Administrative Authentication | Peace Haven" description="Secure staff portal access." />

      <div className="max-w-md w-full bg-charcoal-850/90 p-8 rounded-3xl border border-sage-700/40 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">Administrative Portal</h1>
          <p className="text-slate-400 text-xs">
            Restricted access for Peace Haven engineering leads & operators.
          </p>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-slate-300">
              Admin Email
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="admin@peacehaven.tech"
              className="w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border border-sage-700/50 focus:border-champagne-400 focus:outline-none text-slate-100 text-sm"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-slate-300">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border border-sage-700/50 focus:border-champagne-400 focus:outline-none text-slate-100 text-sm"
            />
            {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
          </div>

          <div className="p-3 rounded-xl bg-charcoal-900 border border-sage-700/30 text-[11px] text-slate-400 font-mono space-y-1">
            <div className="text-champagne-400 font-semibold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Initial Admin Credentials</span>
            </div>
            <div>User: <span className="text-slate-200">admin@peacehaven.tech</span></div>
            <div>Pass: <span className="text-slate-200">PeaceHavenAdmin2026!</span></div>
          </div>

          <Button
            type="submit"
            variant="champagne"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full justify-center"
          >
            Authenticate Session
          </Button>
        </form>

      </div>
    </div>
  );
};

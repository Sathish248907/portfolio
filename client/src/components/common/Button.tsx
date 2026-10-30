import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  to?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  to,
  className,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98] select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-cyan-500 text-white shadow-lg shadow-electric-600/30 hover:shadow-cyan-500/30 border border-electric-400/30',
    secondary: 'bg-navy-900/80 hover:bg-navy-850 text-slate-100 border border-slate-700/60 hover:border-cyan-400/40 shadow-sm backdrop-blur-md',
    cyan: 'bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-electric-400 text-navy-950 font-semibold shadow-lg shadow-cyan-500/25',
    outline: 'border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-500/10 backdrop-blur-sm',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    (disabled || isLoading) && 'opacity-60 cursor-not-allowed pointer-events-none',
    className
  );

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};

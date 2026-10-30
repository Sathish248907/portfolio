import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan' | 'champagne' | 'teal';
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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400/80 active:scale-[0.99] select-none';

  const variants = {
    // Primary: Muted Teal with white text
    primary: 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm border border-teal-600/40',
    // Secondary: Deep Charcoal Navy with subtle sage border
    secondary: 'bg-charcoal-900/90 hover:bg-charcoal-800 text-warm-200 border border-sage-500/30 shadow-sm backdrop-blur-md',
    // Accent CTA: Muted Champagne with dark charcoal text (or backward-compatible 'cyan')
    cyan: 'bg-champagne-500 hover:bg-champagne-400 text-charcoal-900 font-semibold shadow-sm border border-champagne-400/40',
    champagne: 'bg-champagne-500 hover:bg-champagne-400 text-charcoal-900 font-semibold shadow-sm border border-champagne-400/40',
    teal: 'bg-teal-700 hover:bg-teal-600 text-white font-medium shadow-sm border border-teal-500/40',
    // Outline: Subtle Sage/Champagne border
    outline: 'border border-sage-500/40 hover:border-champagne-500/60 text-warm-200 hover:text-white hover:bg-white/5 backdrop-blur-sm',
    // Ghost: Restrained text hover
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

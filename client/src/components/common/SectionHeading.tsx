import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'dark',
  className,
  titleClassName,
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center', align === 'center' ? 'justify-center' : 'justify-start')}>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border transition-colors',
              isLight
                ? 'bg-warm-100 text-teal-800 border-sage-300/80'
                : 'bg-charcoal-850/80 text-champagne-400 border-sage-500/25'
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={cn(
          'font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
          isLight ? 'text-charcoal-900' : 'text-white',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-sm sm:text-base leading-relaxed font-light',
            isLight ? 'text-slate-600' : 'text-slate-300'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

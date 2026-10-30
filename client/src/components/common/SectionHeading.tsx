import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
}) => {
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={cn(
          'font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

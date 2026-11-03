import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  showHomeIcon?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHomeIcon = true,
  className = '',
}) => {
  const fullItems: BreadcrumbCrumb[] = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-mono text-slate-400 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" aria-hidden="true" />
              )}

              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className="text-champagne-400 font-medium truncate max-w-[200px] sm:max-w-none"
                >
                  {index === 0 && showHomeIcon ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      <span>{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-champagne-300 transition-colors flex items-center gap-1 truncate max-w-[150px] sm:max-w-none"
                >
                  {index === 0 && showHomeIcon ? (
                    <>
                      <Home className="w-3 h-3" />
                      <span>{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

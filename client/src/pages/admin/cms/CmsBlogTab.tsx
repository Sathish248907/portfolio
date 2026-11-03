import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ExternalLink, Edit3, Trash2 } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { cn } from '../../../lib/utils';

interface CmsBlogTabProps {
  blogs: any[];
  onNewArticle: () => void;
  onEditArticle: (blog: any) => void;
  onDeleteArticle: (slug: string) => void;
}

export const CmsBlogTab: React.FC<CmsBlogTabProps> = ({
  blogs,
  onNewArticle,
  onEditArticle,
  onDeleteArticle,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-charcoal-850/80 border border-sage-500/20 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-heading font-semibold text-white">
              Technical Blog & Insights Journal
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Publish articles, drafts, categories, and author credits for technical SEO marketing.
            </p>
          </div>
          <Button
            onClick={onNewArticle}
            variant="champagne"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create New Article
          </Button>
        </div>

        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b.slug} className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-700/20 text-champagne-300 font-mono border border-champagne-500/20">
                    {b.category}
                  </span>
                  <span className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full font-mono border',
                    b.status === 'published'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                  )}>
                    {b.status}
                  </span>
                </div>
                <h4 className="text-sm font-heading font-bold text-white">{b.title}</h4>
                <p className="text-xs text-slate-400 font-mono">By {b.author?.name} • {b.readTime || '5 min'}</p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/insights/${b.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg bg-charcoal-800 text-slate-300 hover:text-white"
                  title="Public preview"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => onEditArticle(b)}
                  className="p-2 rounded-lg bg-charcoal-800 text-champagne-400 hover:text-champagne-300"
                  title="Edit article"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteArticle(b.slug)}
                  className="p-2 rounded-lg bg-charcoal-800 text-rose-400 hover:text-rose-300"
                  title="Delete article"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


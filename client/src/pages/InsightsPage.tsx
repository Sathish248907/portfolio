import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  User, 
  Tag, 
  Filter,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { api } from '../lib/api';
import { cn } from '../lib/utils';

const categories = [
  'All',
  'Technology',
  'Artificial Intelligence',
  'FinTech',
  'Robotics & Automation',
  'Healthcare Technology',
  'Web Development',
  'Industry Insights',
];

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      try {
        const res = await api.getPublicInsights({
          category: selectedCategory,
          search: searchQuery,
        });
        if (res?.data) {
          setArticles(res.data);
        }
      } catch (err) {
        console.error('Failed to load insights', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, [selectedCategory, searchQuery]);

  const featured = articles.find((a) => a.isFeatured) || articles[0];
  const list = articles.filter((a) => a._id !== featured?._id);

  return (
    <div className="relative pt-32 pb-24 min-h-screen bg-charcoal-900 text-slate-100">
      <SEO 
        title="Engineering Insights & Perspectives | Peace Haven Technologies"
        description="Technical perspectives, architectural deep-dives, and research updates on edge robotics, digital bullion, and clinical health systems from Peace Haven leads."
        canonicalUrl="https://peacehaven.tech/insights"
      />

      <Container>
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumbs items={[{ label: 'Insights & Perspectives' }]} />
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-champagne-400" />
            <span>Peace Haven Engineering Journal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Engineering Insights & Deep-Tech Perspectives.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Architectural breakdowns, embedded systems blueprints, and strategic technology analyses from Peace Haven engineering leads across our eight multidisciplinary divisions.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-sage-500/20">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap',
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white font-semibold shadow-sm border border-teal-500/40'
                    : 'bg-charcoal-850/80 text-slate-400 hover:text-white border border-sage-500/20 hover:border-sage-400/30'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search perspectives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400"
            />
          </div>
        </div>

        {/* Featured Article Spotlight */}
        {featured && (
          <div className="mb-14 rounded-3xl overflow-hidden bg-charcoal-850/90 border border-sage-500/30 shadow-2xl transition-all group hover:border-champagne-400/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-teal-700/30 border border-champagne-500/40 text-champagne-300 text-xs font-mono font-medium">
                      Featured Analysis
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-champagne-400" />
                      {featured.readTime || '6 min read'}
                    </span>
                  </div>

                  <Link to={`/insights/${featured.slug}`} className="block group-hover:text-champagne-300 transition-colors">
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                      {featured.title}
                    </h2>
                  </Link>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-sage-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-700/40 border border-sage-500/40 flex items-center justify-center text-xs font-bold text-champagne-300">
                      {featured.author?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{featured.author?.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{featured.author?.role}</p>
                    </div>
                  </div>

                  <Link
                    to={`/insights/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-champagne-400 hover:text-champagne-300 transition-colors"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-charcoal-950 relative overflow-hidden min-h-[260px]">
                <img
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-transparent to-transparent lg:bg-gradient-to-l" />
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-heading font-bold text-white">
              Recent Engineering Dispatches
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {articles.length} published {articles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((article) => (
              <article
                key={article._id || article.slug}
                className="rounded-2xl bg-charcoal-850/80 border border-sage-500/20 hover:border-champagne-400/40 transition-all flex flex-col justify-between group overflow-hidden shadow-subtle hover:shadow-card-hover"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-charcoal-950 relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-charcoal-900/90 border border-champagne-500/30 text-champagne-300 text-[11px] font-mono backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-champagne-400" />
                        {article.readTime || '5 min read'}
                      </span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt || Date.now()).toLocaleDateString()}</span>
                    </div>

                    <Link to={`/insights/${article.slug}`} className="block group-hover:text-champagne-300 transition-colors">
                      <h4 className="text-lg font-heading font-bold text-white tracking-tight line-clamp-2">
                        {article.title}
                      </h4>
                    </Link>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sage-500/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">
                      {article.author?.name}
                    </span>
                    <Link
                      to={`/insights/${article.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-champagne-400 hover:text-champagne-300 transition-colors"
                    >
                      <span>Read</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && !isLoading && (
            <div className="rounded-2xl p-12 bg-charcoal-850/60 border border-sage-500/20 text-center max-w-lg mx-auto space-y-3">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="text-base font-heading font-semibold text-white">No articles match your criteria</h4>
              <p className="text-xs text-slate-400">Try adjusting your keyword search or selecting another category.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default InsightsPage;


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Tag, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  Layers
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { api } from '../lib/api';

export const InsightDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.getPublicInsightBySlug(slug);
        if (res?.data) {
          setArticle(res.data);
        } else {
          setError('Article could not be found.');
        }
      } catch (err: any) {
        setError(err.message || 'Article not found.');
      } finally {
        setIsLoading(false);
      }
    }
    loadArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-charcoal-900 text-slate-100 flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-champagne-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Loading perspective...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-charcoal-900 text-slate-100 flex items-center justify-center">
        <div className="p-8 rounded-2xl bg-charcoal-850 border border-sage-500/30 text-center max-w-md space-y-4">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <h2 className="text-xl font-heading font-bold text-white">Article Not Available</h2>
          <p className="text-sm text-slate-400">The requested technical perspective does not exist or has been archived.</p>
          <Button to="/insights" variant="champagne" size="sm">
            Back to All Insights
          </Button>
        </div>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage ? `https://peacehaven.tech${article.featuredImage}` : 'https://peacehaven.tech/og-image.png',
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Peace Haven Engineering Lead',
      jobTitle: article.author?.role || 'Technical Lead',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Peace Haven Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://peacehaven.tech/favicon.svg',
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://peacehaven.tech/insights/${article.slug}`,
    },
  };

  return (
    <article className="relative pt-32 pb-24 min-h-screen bg-charcoal-900 text-slate-100">
      <SEO 
        title={`${article.title} | Peace Haven Insights`}
        description={article.excerpt}
        canonicalUrl={`https://peacehaven.tech/insights/${article.slug}`}
        ogImage={article.featuredImage}
        schema={articleSchema}
      />

      <Container>
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Insights', href: '/insights' },
              { label: article.category, href: `/insights?category=${encodeURIComponent(article.category)}` },
              { label: article.title },
            ]}
          />
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto space-y-6 pb-10 border-b border-sage-500/20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-teal-700/20 border border-champagne-500/40 text-champagne-300 text-xs font-mono font-medium">
              {article.category}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-champagne-400" />
              {article.readTime || '5 min read'}
            </span>
            <span className="text-xs font-mono text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {new Date(article.publishedAt || Date.now()).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Author Byline */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-10 h-10 rounded-full bg-teal-700/30 border border-champagne-500/30 flex items-center justify-center font-bold text-sm text-champagne-300">
              {article.author?.name?.charAt(0) || 'P'}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{article.author?.name}</p>
              <p className="text-xs text-champagne-400 font-mono">{article.author?.role}</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden bg-charcoal-950 border border-sage-500/30 aspect-[16/9] shadow-2xl relative">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="max-w-3xl mx-auto space-y-8 text-slate-200 text-base leading-relaxed">
          <div
            className="prose prose-invert prose-slate max-w-none 
              prose-headings:font-heading prose-headings:text-warm-100 prose-headings:tracking-tight 
              prose-h2:text-2xl prose-h3:text-xl prose-h3:text-champagne-300 prose-p:leading-relaxed 
              prose-a:text-champagne-400 hover:prose-a:text-champagne-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-8 border-t border-sage-500/20">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Key Engineering Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs font-mono text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Consultation CTA Banner */}
          <div className="my-14 p-8 rounded-3xl bg-gradient-to-br from-charcoal-850 via-charcoal-900 to-teal-950 border border-champagne-500/30 shadow-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>Have a Complex Engineering Requirement?</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">
                Turn Architectural Blueprints into Production Reality.
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Connect with our technical leads to scope dedicated engineering squads, distributed system audits, or custom robotics and fintech prototypes.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button to="/start-a-project" variant="champagne" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Start a Project
              </Button>
              <Button to="/services" variant="outline" size="sm">
                Explore All 8 Divisions
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
};

export default InsightDetailPage;

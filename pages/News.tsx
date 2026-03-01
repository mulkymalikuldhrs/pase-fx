import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, Sparkles, TrendingUp, TrendingDown, Clock, Tag, ChevronRight, Lightbulb, Bitcoin, BookOpen, BarChart3 } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { generateDailyAnalysis, generateCryptoUpdate, generateEducationalContent, generateWeeklyReport, getTrendingTopics, NewsArticle } from '../services/newsGenerator';

const News: React.FC = () => {
  useSEO({
    title: 'Berita & Analisis',
    description: 'Berita ekonomi, analisis pasar, dan edukasi trading dari AI. Update harian pasar forex dan crypto.',
    keywords: 'berita forex, analisis pasar, trading, edukasi, crypto, bitcoin'
  });

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);

  // Load initial articles
  useEffect(() => {
    loadArticles();
    loadTrendingTopics();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      // Generate multiple articles
      const [daily, crypto, weekly, edu] = await Promise.all([
        generateDailyAnalysis(),
        generateCryptoUpdate(),
        generateWeeklyReport(),
        generateEducationalContent('SMC ICT Trading')
      ]);

      setArticles([daily, crypto, weekly, edu]);
    } catch (error) {
      console.error('Error generating articles:', error);
      // Fallback articles
      setArticles([
        {
          id: '1',
          title: 'Analisis Pasar Harian',
          summary: 'Update pasar forex dan commodities hari ini.',
          content: 'Market forex menunjukkan volatilitas sedang...',
          category: 'market',
          source: 'AI',
          timestamp: new Date().toISOString(),
          tags: ['analisis', 'forex'],
          sentiment: 'neutral'
        }
      ]);
    }
    setLoading(false);
  };

  const loadTrendingTopics = async () => {
    try {
      const topics = await getTrendingTopics();
      setTrendingTopics(topics);
    } catch {
      setTrendingTopics(['XAUUSD', 'EURUSD', 'BTC', 'Risk Management', 'SMC']);
    }
  };

  const generateNewArticle = async (type: 'daily' | 'crypto' | 'education' | 'weekly') => {
    setGenerating(true);
    try {
      let newArticle: NewsArticle;
      
      switch (type) {
        case 'daily':
          newArticle = await generateDailyAnalysis();
          break;
        case 'crypto':
          newArticle = await generateCryptoUpdate();
          break;
        case 'education':
          const topic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)] || 'Risk Management';
          newArticle = await generateEducationalContent(topic);
          break;
        case 'weekly':
          newArticle = await generateWeeklyReport();
          break;
      }

      setArticles(prev => [newArticle, ...prev]);
    } catch (error) {
      console.error('Error generating article:', error);
    }
    setGenerating(false);
  };

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'market': return <BarChart3 className="w-4 h-4" />;
      case 'crypto': return <Bitcoin className="w-4 h-4" />;
      case 'education': return <BookOpen className="w-4 h-4" />;
      default: return <Newspaper className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market': return 'bg-emerald-500/20 text-emerald-400';
      case 'crypto': return 'bg-orange-500/20 text-orange-400';
      case 'education': return 'bg-blue-500/20 text-blue-400';
      case 'analysis': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'bearish': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <span className="w-4 h-4" />;
    }
  };

  const categories = [
    { id: 'all', label: 'Semua', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'market', label: 'Market', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'crypto', label: 'Crypto', icon: <Bitcoin className="w-4 h-4" /> },
    { id: 'education', label: 'Edukasi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'analysis', label: 'Analisis', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">Berita & Analisis</h1>
          </div>
          <p className="text-slate-400">
            Artikel dan analisis pasar yang di-generate secara otomatis oleh AI
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Generate Buttons */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Generate Artikel Baru</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => generateNewArticle('daily')}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 text-white rounded-lg transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
              Analisis Harian
            </button>
            <button
              onClick={() => generateNewArticle('crypto')}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-700 text-white rounded-lg transition-all"
            >
              <Bitcoin className="w-4 h-4" />
              Update Crypto
            </button>
            <button
              onClick={() => generateNewArticle('education')}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-700 text-white rounded-lg transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              Artikel Edukasi
            </button>
            <button
              onClick={() => generateNewArticle('weekly')}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-700 text-white rounded-lg transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              Weekly Report
            </button>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mb-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white">Trending Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, i) => (
              <button
                key={i}
                onClick={async () => {
                  const article = await generateEducationalContent(topic);
                  setArticles(prev => [article, ...prev]);
                }}
                className="px-3 py-1 bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-full text-sm transition-all"
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeCategory === cat.id 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Generating articles...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <div 
                key={article.id}
                className="bg-slate-900/50 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {getCategoryIcon(article.category)}
                        <span className="ml-1">{article.category.toUpperCase()}</span>
                      </span>
                      {getSentimentIcon(article.sentiment)}
                      <span className="text-xs text-slate-500">• {article.source}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {formatDate(article.timestamp)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  
                  {/* Summary */}
                  <p className="text-slate-400 mb-4">{article.summary}</p>
                  
                  {/* Content Preview */}
                  <div className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.content}
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-slate-500" />
                    {article.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read More */}
                <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-800">
                  <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                    Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Belum ada artikel. Klik tombol di atas untuk generate!</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-400 mb-1">Tentang Artikel AI</h4>
              <p className="text-sm text-slate-400">
                Semua artikel di halaman ini di-generate secara otomatis oleh AI menggunakan teknologi Groq. 
                Artikel bertujuan untuk edukasi dan tidak dapat dianggap sebagai saran finansial. 
                Selalu lakukan riset sendiri sebelum trading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;

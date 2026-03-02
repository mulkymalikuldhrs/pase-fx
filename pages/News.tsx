import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, TrendingUp, TrendingDown, Calendar, AlertTriangle } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { fetchRealNews, fetchEconomicCalendar, getStoredNews, NewsArticle, EconomicEvent } from '../services/realNews';

const News: React.FC = () => {
  useSEO({
    title: 'Berita & Analisis Pasar',
    description: 'Berita ekonomi real-time, analisis pasar, kalender ekonomi, dan edukasi trading.',
    keywords: 'berita forex, analisis pasar, kalender ekonomi, trading, crypto'
  });

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'news' | 'calendar'>('news');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const stored = getStoredNews();
      if (stored.length > 0) setArticles(stored);
      
      const [news, calendar] = await Promise.all([
        fetchRealNews(),
        fetchEconomicCalendar()
      ]);
      
      setArticles(news);
      setEvents(calendar);
      
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    setLoading(true);
    const news = await fetchRealNews();
    setArticles(news);
    setLoading(false);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pase FX - Berita Updated', {
        body: `${news.length} artikel berita terbaru telah ditambahkan`,
        icon: '/logo.png'
      });
    }
  };

  const getCategoryClass = (cat: string) => {
    if (cat === 'crypto') return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
    if (cat === 'forex') return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    if (cat === 'market') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'high') return 'bg-red-500 text-white';
    if (impact === 'medium') return 'bg-yellow-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'bullish') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (sentiment === 'bearish') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-emerald-600" />
              Berita & Analisis
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Berita ekonomi real-time dan analisis pasar
            </p>
          </div>
          
          <button
            onClick={refreshNews}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'news' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            📰 Berita
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'calendar' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            📅 Kalender Ekonomi
          </button>
        </div>

        {activeTab === 'news' ? (
          <div className="grid gap-4">
            {loading && articles.length === 0 ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Memuat berita...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
                <Newspaper className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Belum ada berita</p>
              </div>
            ) : (
              articles.map((article) => (
                <article key={article.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryClass(article.category)}`}>
                          {article.category.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(article.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {getSentimentIcon(article.sentiment)}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{article.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{article.summary}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Sumber: {article.source}</span>
                        {article.tags?.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Kalender Ekonomi
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Event ekonomi berdampak tinggi - trade sesuai news
            </p>
            
            <div className="space-y-3">
              {events.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Memuat kalender...</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400 w-16">{event.time}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getImpactColor(event.impact)}`}>
                      {event.impact.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white flex-1">{event.event}</span>
                    <span className="text-xs text-gray-500">{event.country}</span>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">Trading Saat News</p>
                  <p className="text-yellow-700 dark:text-yellow-300">Tunggu 5-15 menit setelah news rilis sebelum entry. Volatilitas tinggi saat news.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;

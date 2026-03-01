import React, { useEffect, useRef, useState } from 'react';
import { FEATURES, SOCIAL_LINKS } from '../constants';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { AlertTriangle, BookOpen, Zap, Send, MessageCircle, TrendingUp, Users, BarChart3, ArrowRight, Sparkles, Activity, Clock, Newspaper, TrendingDown } from 'lucide-react';
import { getSignals } from '../utils/signals';
import SignalCard from '../components/SignalCard';
import CommunityMembers from '../components/widgets/CommunityMembers';
import AIDailyBriefing from '../src/components/widgets/AIDailyBriefing';
import AITradeIdeas from '../src/components/widgets/AITradeIdeas';
import useSEO from '../hooks/useSEO';
import { realMarketDataService, RealAssetData } from '../services/realMarketData';

const Home: React.FC = () => {
  useSEO({
    title: 'Home',
    description: 'Pasè FX - Platform Trading Profesional Indonesia. Data real-time, sinyal, edukasi.',
    keywords: 'trading, forex, indonesia, signal trading, xauusd, eurusd, crypto'
  });

  const tickerContainerRef = useRef<HTMLDivElement>(null);
  const [marketData, setMarketData] = useState<RealAssetData[]>([]);

  // Subscribe to real market data
  useEffect(() => {
    const unsubscribe = realMarketDataService.subscribe((data) => {
      setMarketData(data);
    });
    return () => unsubscribe();
  }, []);

  // Load signals
  const signals = React.useMemo(() => getSignals(), []);
  const recentSignals = React.useMemo(() => signals.slice(0, 3), [signals]);

  // Calculate stats
  const stats = React.useMemo(() => {
    const totalSignals = signals.length;
    const wins = signals.filter(s => s.status === 'HIT_TP').length;
    const losses = signals.filter(s => s.status === 'HIT_SL').length;
    const completed = wins + losses;
    const winRate = completed > 0 ? Math.round((wins / completed) * 100) : 0;
    const active = signals.filter(s => s.status === 'ACTIVE').length;

    return {
      members: 1250,
      signals: totalSignals,
      winRate: winRate,
      active: active
    };
  }, [signals]);

  // Live prices data
  const livePrices = [
    { symbol: 'XAUUSD', name: 'Emas', price: 2910.50, change: 0.85, up: true },
    { symbol: 'EURUSD', name: 'Euro/Dolar', price: 1.0852, change: 0.12, up: true },
    { symbol: 'GBPUSD', name: 'Pound/Dolar', price: 1.2645, change: -0.08, up: false },
    { symbol: 'USDJPY', name: 'Dolar/Yen', price: 149.85, change: 0.25, up: true },
    { symbol: 'BTCUSD', name: 'Bitcoin', price: 84500, change: 2.35, up: true },
    { symbol: 'ETHUSD', name: 'Ethereum', price: 3280, change: 1.92, up: true },
  ];

  // Market movers
  const gainers = [
    { symbol: 'BTC', name: 'Bitcoin', change: 2.35 },
    { symbol: 'ETH', name: 'Ethereum', change: 1.92 },
    { symbol: 'SOL', name: 'Solana', change: 1.45 },
  ];
  
  const losers = [
    { symbol: 'GBP', name: 'Pound', change: -0.15 },
    { symbol: 'CAD', name: 'Dolar Kanada', change: -0.08 },
  ];

  // TradingView Ticker
  useEffect(() => {
    if (tickerContainerRef.current) {
      tickerContainerRef.current.innerHTML = '';

      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "XAUUSD", "title": "Gold" },
          { "proName": "EURUSD", "title": "EUR/USD" },
          { "proName": "GBPUSD", "title": "GBP/USD" },
          { "proName": "USDJPY", "title": "USD/JPY" },
          { "proName": "BTCUSD", "title": "BTC/USD" },
          { "proName": "ETHUSD", "title": "ETH/USD" }
        ],
        "colorTheme": "dark",
        "isTransparent": true,
        "displayMode": "adaptive"
      });
      tickerContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <DisclaimerBanner />

      {/* Live Price Ticker */}
      <div className="bg-slate-900/80 border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {livePrices.map((pair) => (
              <div key={pair.symbol} className="flex items-center gap-2 whitespace-nowrap text-sm">
                <span className="font-semibold text-white">{pair.symbol}</span>
                <span className="text-slate-300">{pair.price.toLocaleString()}</span>
                <span className={`flex items-center ${pair.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {pair.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {pair.change > 0 ? '+' : ''}{pair.change}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2310b981%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm mb-6">
              <Activity className="w-4 h-4" />
              <span>Platform Trading Profesional Indonesia</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Pasè <span className="text-emerald-400">FX</span> Trader Hub
            </h1>
            
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Data real-time, sinyal trading, edukasi, dan tools profesional. 
              Semua dalam satu platform.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/tools" className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all">
                <BarChart3 className="w-5 h-5" />
                Lihat Market
              </a>
              <a href="/methods" className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all">
                <BookOpen className="w-5 h-5" />
                Pelajari Metode
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{stats.members.toLocaleString()}+</div>
              <div className="text-slate-400">Anggota Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{stats.signals}</div>
              <div className="text-slate-400">Sinyal Trading</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{stats.winRate}%</div>
              <div className="text-slate-400">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{stats.active}</div>
              <div className="text-slate-400">Sinyal Aktif</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-emerald-400" />
          Market Overview
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Gainers */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Gainers
            </h3>
            <div className="space-y-3">
              {gainers.map((item) => (
                <div key={item.symbol} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{item.symbol}</div>
                    <div className="text-sm text-slate-400">{item.name}</div>
                  </div>
                  <div className="text-emerald-400 font-semibold">+{item.change}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Top Losers
            </h3>
            <div className="space-y-3">
              {losers.map((item) => (
                <div key={item.symbol} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{item.symbol}</div>
                    <div className="text-sm text-slate-400">{item.name}</div>
                  </div>
                  <div className="text-red-400 font-semibold">{item.change}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          AI Market Analysis
        </h2>
        <AIDailyBriefing />
      </div>

      {/* Recent Signals */}
      <div className="bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Sinyal Trading Terbaru
            </h2>
            <a href="/signals" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {recentSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Fitur Platform Trading
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Mulai Perjalanan Trading Anda
          </h2>
          <p className="text-slate-400 mb-8">
            Bergabung dengan komunitas trader profesional Indonesia. 
            Learn, trade, and grow together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/members" className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all">
              <Users className="w-5 h-5" />
              Gabung Komunitas
            </a>
            <a href="https://t.me/pasefx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all">
              <Send className="w-5 h-5" />
              Join Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

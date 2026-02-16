import React, { useEffect, useRef } from 'react';
import { FEATURES, SOCIAL_LINKS } from '../constants';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { AlertTriangle, BookOpen, Zap, Send, MessageCircle, TrendingUp, Users, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { getSignals } from '../utils/signals';
import SignalCard from '../components/SignalCard';
import CommunityMembers from '../components/widgets/CommunityMembers';
import AIDailyBriefing from '../src/components/widgets/AIDailyBriefing';
import AITradeIdeas from '../src/components/widgets/AITradeIdeas';

const Home: React.FC = () => {
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  
  // Load signals and calculate stats
  const signals = React.useMemo(() => getSignals(), []);
  const recentSignals = React.useMemo(() => signals.slice(0, 3), [signals]);
  
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

  // TradingView Ticker
  useEffect(() => {
    if (tickerContainerRef.current) {
      tickerContainerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FOREXCOM:SPX500", "title": "S&P 500" },
          { "proName": "FOREXCOM:NSXUSD", "title": "US 100" },
          { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
          { "proName": "FX_IDC:GBPUSD", "title": "GBP/USD" },
          { "proName": "FX_IDC:USDJPY", "title": "USD/JPY" },
          { "proName": "OANDA:XAUUSD", "title": "Gold" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" }
        ],
        "showSymbolLogo": true,
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
      });
      tickerContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <DisclaimerBanner />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Development Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-sm font-medium mb-8 animate-fade-in-up shadow-sm hover:shadow-md transition-shadow">
            <AlertTriangle size={16} />
            <span>Website dalam Pengembangan (Alpha)</span>
          </div>
          
          {/* Logo */}
          <div className="mb-8 animate-float">
            <div className="relative inline-block">
              <img 
                src="/logo.png" 
                alt="Pasè FX Logo" 
                className="h-28 w-auto mx-auto object-contain drop-shadow-2xl bg-white/40 backdrop-blur-md rounded-3xl p-4 border border-white/60"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.logo-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="logo-fallback hidden absolute inset-0 flex items-center justify-center">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-4xl">Pè</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-sm font-medium mb-6 animate-fade-in-up shadow-sm">
            <Zap size={16} />
            <span>Komunitas Trading No. 1 dari Aceh</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
            <span className="text-gray-900">Pasè FX</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Trader Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-3 font-light max-w-2xl mx-auto">
            Trader Waras, Sistematis, Profesional.
          </p>
          <p className="text-lg text-gray-500 mb-10 italic max-w-2xl mx-auto border-l-4 border-emerald-500 pl-4 py-2 bg-gray-50/50 rounded-r-lg">
            "Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#/ebook" className="group px-8 py-4 bg-white hover:bg-gray-50 text-emerald-600 border border-emerald-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md">
              <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
              Ebook (Soon)
            </a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/30">
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              Join Telegram
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/30">
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              Join WhatsApp
            </a>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.members}+</div>
              <div className="text-sm text-gray-500">Anggota Komunitas</div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2">
                <Send className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.signals}</div>
              <div className="text-sm text-gray-500">Sinyal Terkirim</div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.winRate}%</div>
              <div className="text-sm text-gray-500">Win Rate</div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm text-gray-500">Sinyal Aktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* TradingView Ticker Widget */}
      <div className="bg-white border-y border-gray-100">
         <div className="tradingview-widget-container" ref={tickerContainerRef}>
            <div className="tradingview-widget-container__widget"></div>
         </div>
      </div>

      {/* AI Daily Briefing Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <span className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <Sparkles size={24} />
                </span>
                AI Trading Assistant
              </h2>
              <p className="text-gray-500 max-w-xl">
                Dapatkan analisis market harian dan ide trading dari AI gratis. Powered by Puter.js - tanpa API key!
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AIDailyBriefing />
            </div>
            <div className="space-y-6">
              <AITradeIdeas />
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  100% Gratis
                </h3>
                <p className="text-sm text-blue-700">
                  Semua fitur AI di Pasè FX menggunakan Puter.js - platform AI gratis tanpa batasan. 
                  User-Pays model: user bayar sendiri untuk penggunaannya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Preview Section */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                  <BarChart3 size={24} />
                </span>
                Sinyal Terbaru
              </h2>
              <p className="text-gray-500 max-w-xl">
                Pantau peluang trading terbaru dari tim analis kami. Sinyal dilengkapi dengan analisis teknikal dan manajemen risiko.
              </p>
            </div>
            <a href="#/sinyal" className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Lihat Semua Sinyal
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {recentSignals.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentSignals.map(signal => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Belum ada sinyal aktif saat ini.</p>
              <a href="#/sinyal" className="text-emerald-600 font-medium mt-2 inline-block hover:underline">
                Cek Arsip Sinyal
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Community Members Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Users size={24} />
                </span>
                Komunitas Kami
              </h2>
              <p className="text-gray-500 max-w-xl">
                Bergabung dengan 1,250+ trader dari seluruh Indonesia. Belajar, berdiskusi, dan berkembang bersama.
              </p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CommunityMembers />
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Mengapa Join?</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>✓ Signal trading real-time</li>
                  <li>✓ Analisis harian dari expert</li>
                  <li>✓ Diskusi strategi & metode</li>
                  <li>✓ Update market 24/7</li>
                  <li>✓ Support komunitas aktif</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Daily Signals</h3>
                <p className="text-sm text-blue-700 mb-4">Dapatkan 3-5 signal trading berkualitas setiap hari dari tim analyst profesional.</p>
                <a href="#/sinyal" className="text-blue-600 font-semibold text-sm hover:underline">Lihat Signals →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kenapa Memilih Pasè FX?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Kami membangun ekosistem trading yang sehat, transparan, dan berkelanjutan untuk trader Aceh dan Indonesia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Available Now */}
      <section className="py-20 px-4 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Fitur Unggulan</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Tools profesional yang siap membantu trading journey Anda sekarang juga.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-6">📊</div>
              <h3 className="text-xl font-bold mb-3">TradingView Widgets</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Real-time charts, economic calendar, dan market data langsung dari TradingView.
              </p>
              <a href="#/tools" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-2">
                Lihat Tools <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-6">🧮</div>
              <h3 className="text-xl font-bold mb-3">Trading Calculators</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Hitung Pip, Position Size, Risk/Reward, dan Fibonacci dengan akurat dalam hitungan detik.
              </p>
              <a href="#/tools" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-2">
                Coba Kalkulator <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-6">👥</div>
              <h3 className="text-xl font-bold mb-3">Komunitas Aktif</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Diskusi, berbagi analisa, dan belajar bersama trader lain di Telegram & WhatsApp.
              </p>
              <a href="#/komunitas" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-2">
                Gabung Komunitas <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Broker */}
      <section className="py-24 px-4 relative overflow-hidden bg-emerald-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Mulai Trading dengan Broker Terpercaya</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Kami telah mengurasi daftar broker terbaik yang teregulasi dan aman untuk trader Indonesia.
            Dapatkan rebate dan support eksklusif dengan mendaftar melalui link kami.
          </p>
          <a href="#/broker" className="inline-flex items-center justify-center px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Lihat Daftar Broker
          </a>
          <p className="text-sm text-gray-500 mt-6 bg-white/50 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
            🔒 Transparansi: Kami adalah Introducing Broker (IB) resmi
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

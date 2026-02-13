import React, { useEffect, useRef } from 'react';
import { FEATURES, SIGNALS_DATA, EDUCATION_ARTICLES, SOCIAL_LINKS } from '../constants';
import SignalCard from '../components/SignalCard';
import { ArrowRight, BookOpen, Zap, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const tickerContainerRef = useRef<HTMLDivElement>(null);

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
        "colorTheme": "dark",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
      });
      tickerContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-slate-900/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo.png" 
              alt="Pasè FX Logo" 
              className="h-24 w-auto mx-auto object-contain drop-shadow-2xl animate-float"
            />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium mb-8 animate-fade-in-up">
            <Zap size={16} />
            <span>Komunitas Trading No. 1 di Aceh</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-white">Pasè FX</span> <span className="text-gradient">Trader Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-2 font-light">
            Trader Waras, Sistematis, Profesional.
          </p>
          <p className="text-lg text-slate-400 mb-10 italic max-w-2xl mx-auto">
            "Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/ebook" className="glass-button">
              <BookOpen size={20} />
              Request Ebook
            </a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all">
              <Zap size={20} />
              Join Telegram
            </a>
          </div>
        </div>
      </section>

      {/* TradingView Ticker Widget */}
      <div className="bg-slate-950/50 border-b border-slate-800">
         <div className="tradingview-widget-container" ref={tickerContainerRef}>
            <div className="tradingview-widget-container__widget"></div>
         </div>
      </div>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Kenapa Pasè FX?</h2>
            <p className="mt-4 text-slate-400">Kami membangun ekosistem trading yang sehat dan berkelanjutan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <div key={index} className="glass-card p-6 hover:border-emerald-500/50">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Sinyal Terbaru</h2>
              <p className="text-slate-400 mt-2">Analisis teknikal terkini dengan risk reward terukur.</p>
            </div>
            <a href="#/sinyal" className="hidden sm:flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300">
              Lihat Semua <ArrowRight size={18} />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIGNALS_DATA.slice(0, 3).map(signal => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <a href="#/sinyal" className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
              Lihat Semua <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

       {/* Stats Section */}
       <section className="py-16 px-4">
         <div className="max-w-7xl mx-auto">
           <div className="glass-card p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-4xl font-bold text-emerald-400 mb-1">1,250+</div>
                    <div className="text-sm text-slate-400">Total Members</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-emerald-400 mb-1">850+</div>
                    <div className="text-sm text-slate-400">Signals Sent</div>
                </div>
                 <div>
                    <div className="text-4xl font-bold text-emerald-400 mb-1">68%</div>
                    <div className="text-sm text-slate-400">Win Rate (Avg)</div>
                </div>
                 <div>
                    <div className="text-4xl font-bold text-emerald-400 mb-1">300+</div>
                    <div className="text-sm text-slate-400">Active Traders</div>
                </div>
            </div>
           </div>
         </div>
       </section>

      {/* Education Teaser */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Edukasi Pilihan</h2>
            <a href="#/edukasi" className="text-slate-400 hover:text-white text-sm font-medium">Browse All</a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION_ARTICLES.slice(0, 2).map(article => (
              <a key={article.id} href="#/edukasi" className="glass-card group hover:border-emerald-500/50">
                <div className="flex items-center gap-2 mb-3">
                    <span className="glass-badge">
                        {article.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {article.readTime}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2">{article.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Broker */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Mulai Trading di Broker Terpercaya</h2>
          <p className="text-slate-300 text-lg mb-8">
            Kami merekomendasikan broker yang teregulasi dengan spread rendah dan eksekusi cepat untuk mendukung strategi trading Anda.
          </p>
          <a href="#/broker" className="glass-button">
            Lihat Rekomendasi Broker
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

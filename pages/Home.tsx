import React, { useEffect, useRef } from 'react';
import { FEATURES, SOCIAL_LINKS, WEBSITE_STATUS } from '../constants';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { AlertTriangle, BookOpen, Zap, Send, MessageCircle, Clock } from 'lucide-react';

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
      {/* Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <DisclaimerBanner />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-slate-900/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Development Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-medium mb-8 animate-fade-in-up">
            <AlertTriangle size={16} />
            <span>Website dalam Pengembangan</span>
          </div>
          
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo.png" 
              alt="Pasè FX Logo" 
              className="h-24 w-auto mx-auto object-contain drop-shadow-2xl animate-float"
              onError={(e) => {
                // Fallback if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium mb-8 animate-fade-in-up">
            <Zap size={16} />
            <span>Komunitas Trading dari Aceh</span>
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
          
          {/* Status Info */}
          <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700 max-w-2xl mx-auto">
            <p className="text-sm text-slate-400 mb-2">Status Website</p>
            <p className="text-amber-400 font-medium">{WEBSITE_STATUS.message}</p>
            <p className="text-xs text-slate-500 mt-1">Versi {WEBSITE_STATUS.version} | Last Updated: {WEBSITE_STATUS.lastUpdated}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/ebook" className="glass-button">
              <BookOpen size={20} />
              Ebook (Soon)
            </a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all">
              <Send size={20} />
              Join Telegram
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all">
              <MessageCircle size={20} />
              Join WhatsApp
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
            <h2 className="text-3xl font-bold text-white">Fitur yang Sedang Dibangun</h2>
            <p className="mt-4 text-slate-400">Kami sedang mengembangkan ekosistem trading yang komprehensif.</p>
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

      {/* What's Available Now */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Apa yang Tersedia Sekarang?</h2>
            <p className="mt-4 text-slate-400">Meskipun website masih dalam pengembangan, beberapa fitur sudah bisa digunakan:</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">TradingView Widgets</h3>
              <p className="text-slate-400 text-sm mb-4">Real-time charts, economic calendar, dan market data dari TradingView.</p>
              <a href="#/tools" className="text-emerald-400 text-sm hover:underline">Lihat Tools →</a>
            </div>
            
            <div className="glass-card p-6">
              <div className="text-3xl mb-4">🧮</div>
              <h3 className="text-lg font-bold text-white mb-2">Trading Calculators</h3>
              <p className="text-slate-400 text-sm mb-4">Kalkulator Pip, Position Size, dan Risk/Reward untuk estimasi trading.</p>
              <a href="#/tools" className="text-emerald-400 text-sm hover:underline">Coba Kalkulator →</a>
            </div>
            
            <div className="glass-card p-6">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-white mb-2">Komunitas</h3>
              <p className="text-slate-400 text-sm mb-4">Bergabung dengan komunitas trader via Telegram & WhatsApp (REAL).</p>
              <div className="flex gap-2">
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline">Telegram</a>
                <span className="text-slate-600">|</span>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="text-green-400 text-sm hover:underline">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Fitur Akan Datang</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Kami sedang mengerjakan beberapa fitur penting. Join komunitas untuk mendapatkan update perkembangan.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">📡 Sinyal Trading Real-time</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">📚 Artikel Edukasi</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">📖 Ebook Trading</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">🛎️ Notifikasi Market</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">📱 PWA Mobile App</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Broker */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Broker Rekomendasi</h2>
          <p className="text-slate-300 text-lg mb-8">
            Kami merekomendasikan broker yang teregulasi. Kami menerima komisi afiliasi jika Anda mendaftar melalui link kami.
          </p>
          <a href="#/broker" className="glass-button">
            Lihat Daftar Broker
          </a>
          <p className="text-xs text-slate-500 mt-4">Transparansi: Kami adalah Introducing Broker (IB)</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

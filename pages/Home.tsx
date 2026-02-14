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
        "colorTheme": "light",
        "isTransparent": true,
        "displayMode": "adaptive",
        "locale": "en"
      });
      tickerContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <DisclaimerBanner />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Development Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-sm font-medium mb-8 animate-fade-in-up shadow-sm">
            <AlertTriangle size={16} />
            <span>Website dalam Pengembangan</span>
          </div>
          
          {/* Logo */}
          <div className="mb-8">
            <div className="relative inline-block">
              <img 
                src="/logo.png" 
                alt="Pasè FX Logo" 
                className="h-24 w-auto mx-auto object-contain drop-shadow-xl animate-float bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/50"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.logo-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="logo-fallback hidden absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-3xl">Pè</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-sm font-medium mb-8 animate-fade-in-up shadow-sm">
            <Zap size={16} />
            <span>Komunitas Trading dari Aceh</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
            <span className="text-gray-900">Pasè FX</span> <span className="text-emerald-600">Trader Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-2 font-light">
            Trader Waras, Sistematis, Profesional.
          </p>
          <p className="text-lg text-gray-500 mb-10 italic max-w-2xl mx-auto">
            "Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"
          </p>
          
          {/* Status Info */}
          <div className="mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 max-w-2xl mx-auto shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Status Website</p>
            <p className="text-amber-600 font-medium">{WEBSITE_STATUS.message}</p>
            <p className="text-xs text-gray-400 mt-1">Versi {WEBSITE_STATUS.version} | Last Updated: {WEBSITE_STATUS.lastUpdated}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/ebook" className="glass-button bg-white hover:bg-gray-50 text-emerald-600 border-emerald-200">
              <BookOpen size={20} />
              Ebook (Soon)
            </a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/30">
              <Send size={20} />
              Join Telegram
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-green-500/30">
              <MessageCircle size={20} />
              Join WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TradingView Ticker Widget */}
      <div className="bg-white/50 border-b border-gray-100 backdrop-blur-sm">
         <div className="tradingview-widget-container" ref={tickerContainerRef}>
            <div className="tradingview-widget-container__widget"></div>
         </div>
      </div>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Fitur yang Sedang Dibangun</h2>
            <p className="mt-4 text-gray-500">Kami sedang mengembangkan ekosistem trading yang komprehensif.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <div key={index} className="glass-card p-6 hover:border-emerald-200 bg-white/60 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Available Now */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Apa yang Tersedia Sekarang?</h2>
            <p className="mt-4 text-gray-500">Meskipun website masih dalam pengembangan, beberapa fitur sudah bisa digunakan:</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 bg-white/60">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">TradingView Widgets</h3>
              <p className="text-gray-500 text-sm mb-4">Real-time charts, economic calendar, dan market data dari TradingView.</p>
              <a href="#/tools" className="text-emerald-600 text-sm hover:underline font-medium">Lihat Tools →</a>
            </div>
            
            <div className="glass-card p-6 bg-white/60">
              <div className="text-3xl mb-4">🧮</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trading Calculators</h3>
              <p className="text-gray-500 text-sm mb-4">Kalkulator Pip, Position Size, dan Risk/Reward untuk estimasi trading.</p>
              <a href="#/tools" className="text-emerald-600 text-sm hover:underline font-medium">Coba Kalkulator →</a>
            </div>
            
            <div className="glass-card p-6 bg-white/60">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Komunitas</h3>
              <p className="text-gray-500 text-sm mb-4">Bergabung dengan komunitas trader via Telegram & WhatsApp (REAL).</p>
              <div className="flex gap-2">
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="text-blue-600 text-sm hover:underline font-medium">Telegram</a>
                <span className="text-gray-400">|</span>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="text-green-600 text-sm hover:underline font-medium">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 text-center bg-white/70">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fitur Akan Datang</h2>
            <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
              Kami sedang mengerjakan beberapa fitur penting. Join komunitas untuk mendapatkan update perkembangan.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">📡 Sinyal Trading Real-time</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">📚 Artikel Edukasi</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">📖 Ebook Trading</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">🛎️ Notifikasi Market</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">📱 PWA Mobile App</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Broker */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-blue-50/50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Broker Rekomendasi</h2>
          <p className="text-gray-600 text-lg mb-8">
            Kami merekomendasikan broker yang teregulasi. Kami menerima komisi afiliasi jika Anda mendaftar melalui link kami.
          </p>
          <a href="#/broker" className="glass-button bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50">
            Lihat Daftar Broker
          </a>
          <p className="text-xs text-gray-400 mt-4">Transparansi: Kami adalah Introducing Broker (IB)</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect, useRef, useState } from 'react';
import { 
  Calculator, Clock, TrendingUp, TrendingDown, Activity, DollarSign, Globe, 
  BarChart3, Calendar, Sparkles, BarChart2, Bot, BookOpen, 
  HelpCircle, ChevronDown, ChevronUp, Info, Zap, Brain,
  Search, RefreshCw, AlertTriangle, Gauge, Target, LineChart,
  Layers, PieChart, Binary, Wallet, Percent
} from 'lucide-react';
import PipCalculator from '../components/calculators/PipCalculator';
import PositionCalculator from '../components/calculators/PositionCalculator';
import RiskRewardCalculator from '../components/calculators/RiskRewardCalculator';
import FibonacciCalculator from '../components/calculators/FibonacciCalculator';
import MarginCalculator from '../components/calculators/MarginCalculator';
import ProfitCalculator from '../components/calculators/ProfitCalculator';
import DrawdownCalculator from '../components/calculators/DrawdownCalculator';
import PivotPointsCalculator from '../components/calculators/PivotPointsCalculator';
import SessionTimer from '../components/widgets/SessionTimer';
import SessionVolatility from '../components/widgets/SessionVolatility';
import MarketOverview from '../components/widgets/MarketOverview';
import LiveRates from '../components/widgets/LiveRates';
import CurrencyStrengthMeter from '../components/widgets/CurrencyStrengthMeter';
import MarketScreener from '../components/widgets/MarketScreener';
import CorrelationMatrix from '../components/widgets/CorrelationMatrix';
import EconomicCalendarPro from '../components/widgets/EconomicCalendarPro';
import COTAnalysisDashboard from '../components/widgets/COTAnalysisDashboard';
import CurrencyStrengthDashboard from '../components/widgets/CurrencyStrengthDashboard';
import MarketSentimentDashboard from '../components/widgets/MarketSentimentDashboard';
import MultiAssetDashboard from '../components/widgets/MultiAssetDashboard';
import MarketCyclesDashboard from '../components/widgets/MarketCyclesDashboard';
import AIAnalysisWidget from '../src/components/widgets/AIAnalysisWidget';
import TradingAnalysis from '../src/components/widgets/TradingAnalysis';
import AIPatternRecognition from '../src/components/widgets/AIPatternRecognition';
import AITradeIdeas from '../src/components/widgets/AITradeIdeas';

// Tutorial Component - Enhanced with better styling
const TutorialBox: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-6 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-emerald-100 rounded-lg">
            {icon || <BookOpen className="w-4 h-4 text-emerald-600" />}
          </div>
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        <div className={`p-1 bg-emerald-200 rounded-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4 text-emerald-700" />
        </div>
      </button>
      {isOpen && (
        <div className="p-5 bg-white border-t border-gray-100">
          <div className="prose prose-sm max-w-none text-gray-600">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const Tools: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const eurusdRef = useRef<HTMLDivElement>(null);
  const gbpusdRef = useRef<HTMLDivElement>(null);
  const usdjpyRef = useRef<HTMLDivElement>(null);
  const audusdRef = useRef<HTMLDivElement>(null);
  const usdcadRef = useRef<HTMLDivElement>(null);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const sentimentContainerRef = useRef<HTMLDivElement>(null);
  const goldContainerRef = useRef<HTMLDivElement>(null);
  const dxyContainerRef = useRef<HTMLDivElement>(null);
  
  // Candlestick chart refs for major pairs
  const eurusdCandleRef = useRef<HTMLDivElement>(null);
  const gbpusdCandleRef = useRef<HTMLDivElement>(null);
  const usdjpyCandleRef = useRef<HTMLDivElement>(null);
  const audusdCandleRef = useRef<HTMLDivElement>(null);
  const usdcadCandleRef = useRef<HTMLDivElement>(null);
  const eurjpyCandleRef = useRef<HTMLDivElement>(null);
  
  // Technical indicators refs
  const eurusdTechRef = useRef<HTMLDivElement>(null);
  const gbpusdTechRef = useRef<HTMLDivElement>(null);
  const usdjpyTechRef = useRef<HTMLDivElement>(null);
  
  // Additional TradingView widgets refs
  const marketOverviewRef = useRef<HTMLDivElement>(null);
  const tickerTapeRef = useRef<HTMLDivElement>(null);
  const cryptoOverviewRef = useRef<HTMLDivElement>(null);
  const forexCrossRatesRef = useRef<HTMLDivElement>(null);
  const sp500TechRef = useRef<HTMLDivElement>(null);
  const goldTechRef = useRef<HTMLDivElement>(null);

  // Responsive check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Advanced Chart Widget
    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": "OANDA:XAUUSD",
        "interval": "D",
        "timezone": "Asia/Jakarta",
        "theme": "light",
        "style": "1",
        "locale": "id",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      });
      chartContainerRef.current.appendChild(script);
    }

    // Economic Calendar Widget
    if (calendarContainerRef.current) {
      calendarContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "light",
        "isTransparent": false,
        "width": "100%",
        "height": "400",
        "locale": "id",
        "importanceFilter": "0,1",
        "currencyFilter": "USD,EUR,GBP,JPY,AUD,NZD,CAD,CHF",
        "countryFilter": "us,eu,gb,jp,au,nz,ca,ch"
      });
      calendarContainerRef.current.appendChild(script);
    }

    // Forex Heat Map Widget
    if (heatmapContainerRef.current) {
      heatmapContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "width": "100%",
        "height": "400",
        "currencies": ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
        "isTransparent": false,
        "colorTheme": "light",
        "locale": "id"
      });
      heatmapContainerRef.current.appendChild(script);
    }

    // Technical Analysis (Sentiment) Widget
    if (sentimentContainerRef.current) {
      sentimentContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "interval": "1m",
        "width": "100%",
        "isTransparent": false,
        "height": "400",
        "symbol": "FX_IDC:EURUSD",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "id",
        "colorTheme": "light"
      });
      sentimentContainerRef.current.appendChild(script);
    }

    // Gold Price Widget (XAUUSD)
    if (goldContainerRef.current) {
      goldContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": "OANDA:XAUUSD",
        "width": "100%",
        "colorTheme": "light",
        "isTransparent": false,
        "locale": "id"
      });
      goldContainerRef.current.appendChild(script);
    }

    // DXY Index Widget
    if (dxyContainerRef.current) {
      dxyContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": "TVC:DXY",
        "width": "100%",
        "colorTheme": "light",
        "isTransparent": false,
        "locale": "id"
      });
      dxyContainerRef.current.appendChild(script);
    }

    // Major Pairs Charts
    const pairWidgets = [
      { ref: eurusdRef, symbol: 'FX_IDC:EURUSD', name: 'EUR/USD' },
      { ref: gbpusdRef, symbol: 'FX_IDC:GBPUSD', name: 'GBP/USD' },
      { ref: usdjpyRef, symbol: 'FX_IDC:USDJPY', name: 'USD/JPY' },
      { ref: audusdRef, symbol: 'FX_IDC:AUDUSD', name: 'AUD/USD' },
      { ref: usdcadRef, symbol: 'FX_IDC:USDCAD', name: 'USD/CAD' },
    ];

    pairWidgets.forEach(({ ref, symbol }) => {
      if (ref.current) {
        ref.current.innerHTML = '';
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "symbol": symbol,
          "width": "100%",
          "height": 200,
          "colorTheme": "light",
          "isTransparent": false,
          "locale": "id"
        });
        ref.current.appendChild(script);
      }
    });

    // Full Candlestick Charts for Major Pairs
    const candleCharts = [
      { ref: eurusdCandleRef, symbol: 'FX:EURUSD', name: 'EUR/USD', interval: 'D' },
      { ref: gbpusdCandleRef, symbol: 'FX:GBPUSD', name: 'GBP/USD', interval: 'D' },
      { ref: usdjpyCandleRef, symbol: 'FX:USDJPY', name: 'USD/JPY', interval: 'D' },
      { ref: audusdCandleRef, symbol: 'FX:AUDUSD', name: 'AUD/USD', interval: 'D' },
      { ref: usdcadCandleRef, symbol: 'FX:USDCAD', name: 'USD/CAD', interval: 'D' },
      { ref: eurjpyCandleRef, symbol: 'FX:EURJPY', name: 'EUR/JPY', interval: 'D' },
    ];

    candleCharts.forEach(({ ref, symbol, interval }) => {
      if (ref.current) {
        ref.current.innerHTML = '';
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "autosize": true,
          "symbol": symbol,
          "interval": interval,
          "timezone": "Asia/Jakarta",
          "theme": "light",
          "style": "1",
          "locale": "id",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        });
        ref.current.appendChild(script);
      }
    });

    // Technical Analysis Widgets for Major Pairs
    const techAnalysisWidgets = [
      { ref: eurusdTechRef, symbol: 'FX:EURUSD' },
      { ref: gbpusdTechRef, symbol: 'FX:GBPUSD' },
      { ref: usdjpyTechRef, symbol: 'FX:USDJPY' },
      { ref: sp500TechRef, symbol: 'FOREXCOM:SPX500' },
      { ref: goldTechRef, symbol: 'OANDA:XAUUSD' },
    ];

    techAnalysisWidgets.forEach(({ ref, symbol }) => {
      if (ref.current) {
        ref.current.innerHTML = '';
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "interval": "1h",
          "width": "100%",
          "isTransparent": false,
          "height": 300,
          "symbol": symbol,
          "showIntervalTabs": true,
          "displayMode": "single",
          "locale": "id",
          "colorTheme": "light"
        });
        ref.current.appendChild(script);
      }
    });

    // Additional TradingView Widgets
    
    // Market Overview Widget
    if (marketOverviewRef.current) {
      marketOverviewRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "light",
        "dateRange": "12m",
        "showChart": true,
        "locale": "id",
        "width": "100%",
        "height": 400,
        "symbol": [
          "FX:EURUSD",
          "FX:GBPUSD",
          "FX:USDJPY",
          "FX:AUDUSD",
          "OANDA:XAUUSD",
          "TVC:DXY"
        ],
        "tabs": [
          {
            "title": "Forex",
            "symbols": [
              { "s": "FX:EURUSD", "d": "EUR/USD" },
              { "s": "FX:GBPUSD", "d": "GBP/USD" },
              { "s": "FX:USDJPY", "d": "USD/JPY" },
              { "s": "FX:AUDUSD", "d": "AUD/USD" },
              { "s": "FX:USDCAD", "d": "USD/CAD" },
              { "s": "FX:EURJPY", "d": "EUR/JPY" }
            ],
          },
          {
            "title": "Commodities",
            "symbols": [
              { "s": "OANDA:XAUUSD", "d": "Gold" },
              { "s": "OANDA:XAGUSD", "d": "Silver" },
              { "s": "TVC:USOIL", "d": "Crude Oil" },
              { "s": "OANDA:NATGAS", "d": "Natural Gas" }
            ],
          },
          {
            "title": "Indices",
            "symbols": [
              { "s": "FOREXCOM:SPX500", "d": "S&P 500" },
              { "s": "FOREXCOM:NSXUSD", "d": "Nasdaq 100" },
              { "s": "FOREXCOM:US30", "d": "Dow Jones" },
              { "s": "TVC:DE40", "d": "DAX 40" }
            ],
          },
          {
            "title": "Crypto",
            "symbols": [
              { "s": "BITSTAMP:BTCUSD", "d": "Bitcoin" },
              { "s": "BITSTAMP:ETHUSD", "d": "Ethereum" },
              { "s": "BITSTAMP:SOLUSD", "d": "Solana" },
              { "s": "BITSTAMP:XRPUSD", "d": "Ripple" }
            ],
          }
        ]
      });
      marketOverviewRef.current.appendChild(script);
    }

    // Ticker Tape Widget
    if (tickerTapeRef.current) {
      tickerTapeRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FX:EURUSD", "title": "EUR/USD" },
          { "proName": "FX:GBPUSD", "title": "GBP/USD" },
          { "proName": "FX:USDJPY", "title": "USD/JPY" },
          { "proName": "OANDA:XAUUSD", "title": "Gold" },
          { "proName": "TVC:DXY", "title": "DXY" },
          { "proName": "BITSTAMP:BTCUSD", "title": "BTC/USD" },
          { "proName": "BITSTAMP:ETHUSD", "title": "ETH/USD" },
          { "proName": "FOREXCOM:SPX500", "title": "S&P 500" }
        ],
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "id"
      });
      tickerTapeRef.current.appendChild(script);
    }

    // Crypto Overview Widget
    if (cryptoOverviewRef.current) {
      cryptoOverviewRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-overview.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "light",
        "isTransparent": false,
        "locale": "id",
        "width": "100%",
        "height": 450,
        "symbols": [
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
          { "proName": "BITSTAMP:SOLUSD", "title": "Solana" },
          { "proName": "BITSTAMP:XRPUSD", "title": "Ripple" },
          { "proName": "BITSTAMP:ADAUSD", "title": "Cardano" },
          { "proName": "BITSTAMP:DOGEUSD", "title": "Dogecoin" }
        ],
        "tabs": [
          {
            "title": "Top Coins",
            "symbols": [
              { "s": "BITSTAMP:BTCUSD", "d": "Bitcoin" },
              { "s": "BITSTAMP:ETHUSD", "d": "Ethereum" },
              { "s": "BITSTAMP:SOLUSD", "d": "Solana" }
            ]
          },
          {
            "title": "Altcoins",
            "symbols": [
              { "s": "BITSTAMP:XRPUSD", "d": "Ripple" },
              { "s": "BITSTAMP:ADAUSD", "d": "Cardano" },
              { "s": "BITSTAMP:DOGEUSD", "d": "Dogecoin" }
            ]
          }
        ]
      });
      cryptoOverviewRef.current.appendChild(script);
    }

    // Forex Cross Rates Widget
    if (forexCrossRatesRef.current) {
      forexCrossRatesRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "width": "100%",
        "height": 400,
        "colorTheme": "light",
        "locale": "id",
        "currencies": [
          "EUR",
          "USD",
          "JPY",
          "GBP",
          "CHF",
          "AUD",
          "CAD",
          "NZD"
        ],
        "isTransparent": false
      });
      forexCrossRatesRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-2 sm:px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            📊 Tools Trading
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto px-4 text-sm sm:text-base">
            Alat trading lengkap untuk membantu analisis dan pengelolaan risiko. 
            Semua tools gratis dan langsung bisa digunakan. Dilengkapi tutorial untuk pemula!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Info className="w-4 h-4" />
            <span>Klik tombol 📖 untuk melihat tutorial setiap tool</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* AI TRADING TOOLS SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                🤖 AI Trading Assistant
              </h2>
              <p className="text-sm text-gray-500">Analisis market berbasis AI • Gratis tanpa API</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Analisis market otomatis menggunakan AI. Gratis, tanpa API key!
          </p>
          
          <TutorialBox 
            title="📖 Cara Menggunakan AI Trading Assistant" 
            icon={<Zap className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">🎯 Fitur Utama:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>AI Analysis:</strong> Pilih instrumen (XAUUSD, EURUSD, dll) dan timeframe (H1, H4, D1), lalu klik "Analisis". AI akan memberikan rekomendasi BUY/SELL dengan confidence level.</li>
                  <li><strong>Pattern Recognition:</strong> Klik untuk mendeteksi pola chart otomatis seperti Double Top/Bottom, Head & Shoulders, Triangle, dll.</li>
                  <li><strong>Trade Ideas:</strong> Klik "Generate" untuk mendapatkan ide trading hari ini berdasarkan analisis teknikal.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">💡 Tips Penggunaan:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li>Gunakan timeframe yang lebih tinggi (H4/D1) untuk sinyal yang lebih akurat</li>
                  <li>Selalu konfirmasi dengan analisis manual sebelum entry</li>
                  <li>Perhatikan confidence level - semakin tinggi semakin可靠</li>
                  <li>Kombinasikan dengan Support/Resistance untuk konfirmasi</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800"><strong>⚠️ Disclaimer:</strong> AI memberikan rekomendasi berdasarkan pola historis. Selalu gunakan risk management maksimal 2% per trade!</p>
            </div>
          </TutorialBox>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <AIAnalysisWidget instrument={{ symbol: "XAUUSD", name: "Gold", type: "commodity", category: "Precious Metals" }} currentPrice={2910} timeframe="H4" />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <AIPatternRecognition symbol="EUR/USD" />
              <AITradeIdeas />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* MARKET DATA SECTION - Live Rates, Sessions, Overview */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                📈 Data Market Real-Time
              </h2>
              <p className="text-sm text-gray-500">Live rates • Session timer • Market overview</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Cara Membaca Live Rates & Market Overview" 
            icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">📊 Komponen Utama:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Live Rates:</strong> Menampilkan harga terkini pasangan mata uang. <span className="text-emerald-600">Hijau = naik</span>, <span className="text-red-500">merah = turun</span>.</li>
                  <li><strong>Market Overview:</strong> Ringkasan kondisi market hari ini dengan perubahan 24 jam.</li>
                  <li><strong>Session Timer:</strong> Menunjukkan sesi trading yang aktif (Asia/London/NY).</li>
                  <li><strong>Session Volatility:</strong> Tingkat volatilitas setiap sesi.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">💡 Tips Trading:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li>Warna hijau = bullish (naik), merah = bearish (turun)</li>
                  <li>London dan NY adalah sesi paling volatil</li>
                  <li> Hindari trading saat sesi overlap selesai</li>
                  <li>Gunakan live rates untuk entry yang lebih presisi</li>
                </ul>
              </div>
            </div>
          </TutorialBox>
          
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="lg:col-span-2">
              <LiveRates />
            </div>
            <SessionTimer />
          </div>
          <div className="mb-6">
            <SessionVolatility />
          </div>
          <div className="mb-6">
            <MarketOverview />
          </div>
          <div className="mb-6">
            <MultiAssetDashboard />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SESSIONS & TIMING SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                ⏰ Sesi & Timing Trading
              </h2>
              <p className="text-sm text-gray-500">Market cycles • Best trading times • Session volatility</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Cara Memahami Sesi Trading" 
            icon={<Clock className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">🕐 Jadwal Sesi (WIB):</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Asian Session (07:00-10:00):</strong> Volatilitas rendah. Cocok untuk range trading. Pergerakan sekitar 20-30 pips.</li>
                  <li><strong>London Session (13:00-16:00):</strong> Volatilitas tinggi. Sesi paling aktif. Pergerakan 40-80 pips.</li>
                  <li><strong>New York Session (19:00-22:00):</strong> Volatilitas tinggi. Overlap dengan London sangat dinamis.</li>
                  <li><strong>Judas Zone (11:30-12:30):</strong> Hindari trading - sering manipulasi.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">💡 Strategi Sesi:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li>Trading di awal sesi untuk pergerakan terbesar</li>
                  <li>Gunakan strategi breakout di awal London</li>
                  <li>Range trading saat Asian session</li>
                  <li>Follow trend di sesi NY untuk pergerakan lanjutan</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800"><strong>💡 Tip:</strong> Sesi paling baik untuk trading adalah 1-2 jam setelah open London (13:00-14:00) dan saat overlap London-NY (19:00-21:00).</p>
            </div>
          </TutorialBox>
          
          <MarketCyclesDashboard />
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CALCULATORS SECTION - All Trading Calculators */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                🧮 Kalkulator Trading
              </h2>
              <p className="text-sm text-gray-500">Pip • Position Size • Risk/Reward • Margin • Fibonacci • Pivot</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Cara Menggunakan Kalkulator Trading" 
            icon={<Calculator className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">🧮 Kalkulator Dasar:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Pip Calculator:</strong> Hitung nilai pip berdasarkan pair, lot size, dan account currency.</li>
                  <li><strong>Position Size:</strong> Tentukan besar posisi ideal sesuai risk management (default 2%).</li>
                  <li><strong>Profit Calculator:</strong> Estimasi profit/loss berdasarkan entry, exit, dan lot size.</li>
                  <li><strong>Risk/Reward:</strong> Hitung rasio R:R untuk memastikan risk worth taking.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">📈 Kalkulator Lanjutan:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Fibonacci:</strong> Hitung level Fibonacci retracement (23.6%, 38.2%, 50%, 61.8%).</li>
                  <li><strong>Margin:</strong> Hitung margin yang dibutuhkan untuk membuka posisi.</li>
                  <li><strong>Drawdown:</strong> Hitung maksimal drawdown dan recovery needed.</li>
                  <li><strong>Pivot Points:</strong> Hitung level pivot harian (PP, R1, R2, S1, S2).</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800"><strong>⚠️ Penting:</strong> Selalu hitung position size sebelum entry! Jangan pernah risk lebih dari 2% per trade. Gunakan Stop Loss selalu!</p>
            </div>
          </TutorialBox>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <PipCalculator />
            <PositionCalculator />
            <RiskRewardCalculator />
            <FibonacciCalculator />
            <MarginCalculator />
            <ProfitCalculator />
            <DrawdownCalculator />
            <PivotPointsCalculator />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ANALYSIS TOOLS SECTION - SMC/ICT, COT, Trading Analysis */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                🧠 Analisis Profesional (SMC/ICT)
              </h2>
              <p className="text-sm text-gray-500">COT Report • Order Block • Liquidity • Market Structure</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Konsep SMC/ICT untuk Pemula" 
            icon={<Brain className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">🧠 Konsep Dasar SMC/ICT:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Order Block (OB):</strong> Zona di mana institusi besar melakukan buy/sell. Cari candle besar sebelum retracement.</li>
                  <li><strong>Liquidity Zone:</strong> Area stop loss trader retail (target institusi). Biasanya di atas high atau di bawah low.</li>
                  <li><strong>FVG (Fair Value Gap):</strong> Celah harga yang akan ditutupi. Eintrag ke FVG = entry dengan BBF (Break of Fair Value Gap).</li>
                  <li><strong>MSS (Market Structure Shift):</strong> Perubahan tren yang dikonfirmasi saat harga break high/low sebelumnya.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">📊 COT Report (Commitment of Traders):</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Commercials:</strong> Bank & institusi besar - biasanya benar arahnya.</li>
                  <li><strong>Non-Commercials:</strong> Speculator besar (hedge funds).</li>
                  <li><strong>Retail:</strong> Trader kecil - biasanya salah (contrarian indicator).</li>
                  <li><strong>Tip:</strong> Ikuti Commercials, bukan retail! Saat retail SIM, Commercials biasanya LUB.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800"><strong>💡 Cara Pakai COT:</strong> Lihat posisi Commercials di extremes (sangat long/short). Ketika Commercials mulai menutup posisi, bersiap untuk arah berlawanan!</p>
            </div>
          </TutorialBox>
          
          <div className="mb-6">
            <COTAnalysisDashboard />
          </div>
          <div className="mb-6">
            <TradingAnalysis />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CURRENCY STRENGTH & SENTIMENT SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                💱 Kekuatan Mata Uang & Sentimen
              </h2>
              <p className="text-sm text-gray-500">Currency Strength • Correlation • Market Sentiment</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Cara Membaca Kekuatan Mata Uang" 
            icon={<Gauge className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">📊 Indikator Utama:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Currency Strength Meter:</strong> Menunjukkan mata uang terkuat dan terlemah. Semakin panjang bar, semakin kuat.</li>
                  <li><strong>Correlation Matrix:</strong> Hubungan antar pair. +1 = bergerak sama, -1 = bergerak berlawanan.</li>
                  <li><strong>Market Sentiment:</strong> Majority buy = overbought (bisa反转), Majority sell = oversold (bisa rebound).</li>
                  <li><strong>Market Screener:</strong> Filter pair berdasarkan kondisi (Trending, Range, Volatile).</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">💡 Strategi Trading:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li>Trading searah mata uang kuat vs mata uang lemah</li>
                  <li>Contoh: EUR kuat + USD lemah = BUY EUR/USD</li>
                  <li>Hindari pair dengan korelasi negatif di timeframe sama</li>
                  <li>Gunakan sentiment sebagai contrarian indicator</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
              <p className="text-sm text-cyan-800"><strong>💡 Tip:</strong> Fokus pada 2-3 mata uang terkuat vs 2-3 terlemah. Misal: EUR & GBP kuat, JPY & AUD lemah = cari peluang BUY EUR/JPY atau SELL GBP/JPY.</p>
            </div>
          </TutorialBox>
          
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <MarketScreener />
            <CurrencyStrengthMeter />
          </div>
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <CurrencyStrengthDashboard />
            <MarketSentimentDashboard />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* MAJOR PAIRS CHARTS SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <LineChart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                💱 Chart Major Pairs
              </h2>
              <p className="text-sm text-gray-500">EUR/USD • GBP/USD • USD/JPY • AUD/USD • USD/CAD</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Cara Membaca Major Pairs" 
            icon={<LineChart className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">💱 Karakter Major Pairs:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>EUR/USD:</strong> "The Euro" - pair paling liquid, spread rendah. Harga bergerak 30-80 pips/hari.</li>
                  <li><strong>GBP/USD:</strong> "The Cable" - pair paling volatil. Harga bergerak 40-100 pips/hari.</li>
                  <li><strong>USD/JPY:</strong> "The Yen" - pair paling stabil, safe haven. Pergerakan 20-50 pips/hari.</li>
                  <li><strong>AUD/USD:</strong> "The Aussie" - sensitif terhadap commodity prices.</li>
                  <li><strong>USD/CAD:</strong> "The Loonie" - sensitif terhadap oil prices.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">💡 Tips Trading:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li>Perhatikan korelasi antar pairs untuk konfirmasi sinyal</li>
                  <li>EUR/USD dan GBP/USD biasanya bergerak searah</li>
                  <li>USD/JPY sering bergerak berlawanan dengan EUR/USD</li>
                  <li>Gunakan spread sebagai indikator liquiditas</li>
                </ul>
              </div>
            </div>
          </TutorialBox>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">EUR/USD</h3>
              <div className="tradingview-widget-container" ref={eurusdRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">GBP/USD</h3>
              <div className="tradingview-widget-container" ref={gbpusdRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">USD/JPY</h3>
              <div className="tradingview-widget-container" ref={usdjpyRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">AUD/USD</h3>
              <div className="tradingview-widget-container" ref={audusdRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">USD/CAD</h3>
              <div className="tradingview-widget-container" ref={usdcadRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* TRADINGVIEW CHARTS & TOOLS SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                📊 Chart & Kalender (TradingView)
              </h2>
              <p className="text-sm text-gray-500">Gold • DXY • Heat Map • Correlation • Economic Calendar</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Cara Menggunakan TradingView" 
            icon={<BarChart3 className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">📊 Fitur Utama:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Chart:</strong> Gunakan untuk analisis teknikal. Pinch zoom pada mobile, scroll pada desktop. Klik symbol untuk ganti pair.</li>
                  <li><strong>Economic Calendar:</strong> Cek news HIGH IMPACT sebelum trading! Jangan trading 30 menit sebelum/sesudah news.</li>
                  <li><strong>Gold & DXY:</strong> Perhatikan korelasi - biasanya berlawanan. Jika Gold naik, DXY biasanya turun.</li>
                  <li><strong>Heat Map:</strong> Lihat kekuatan semua mata uang sekaligus. Merah = naik, Hijau = turun.</li>
                  <li><strong>Correlation:</strong> Matrix korelasi untuk diversifikasi trades.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">⌨️ Shortcut Keyboard:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Space:</strong> Toggle indikator</li>
                  <li><strong>F:</strong> Fullscreen chart</li>
                  <li><strong>D:</strong> Timeframe Daily</li>
                  <li><strong>H:</strong> Hourly</li>
                  <li><strong>/</strong> Quick indicators</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800"><strong>⚠️ News Trading:</strong> Jangan trading saat ada news HIGH impact! Tunggu 30 menit sebelum dan setelah news untuk volatilitas normal.</p>
            </div>
          </TutorialBox>
          
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" /> Kalender Ekonomi
              </h3>
              <div className="tradingview-widget-container" ref={calendarContainerRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" /> Harga Emas (XAUUSD)
              </h3>
              <div className="tradingview-widget-container" ref={goldContainerRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" /> Indeks DXY
              </h3>
              <div className="tradingview-widget-container" ref={dxyContainerRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" /> Sentimen Market (EURUSD)
              </h3>
              <div className="tradingview-widget-container" ref={sentimentContainerRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <CorrelationMatrix />
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-600" /> Forex Heat Map
              </h3>
              <div className="tradingview-widget-container" ref={heatmapContainerRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <EconomicCalendarPro />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CRYPTO MARKET SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl shadow-lg">
              <Binary className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                ₿ Crypto Market
              </h2>
              <p className="text-sm text-gray-500">Bitcoin • Ethereum • Solana • Ripple</p>
            </div>
          </div>
          
          <TutorialBox 
            title="📖 Cara Membaca Crypto Market" 
            icon={<Binary className="w-4 h-4 text-emerald-600" />}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">₿ Karakter Crypto:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li><strong>Bitcoin (BTC):</strong> Crypto terbesar, sering jadi indikator risk-on/risk-off. "King of Crypto".</li>
                  <li><strong>Ethereum (ETH):</strong> Smart contracts, sensitif terhadap DeFi news. Nomor 2 terbesar.</li>
                  <li><strong>Solana (SOL):</strong> Fast & cheap transactions, volatil. Rising star.</li>
                  <li><strong>Ripple (XRP):</strong> Remittance, ada kasus hukum dengan SEC.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">⚠️ Peringatan:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-sm">
                  <li>Crypto 10x lebih volatil dari forex!</li>
                  <li>Gunakan risk management ketat (max 1-2% per trade)</li>
                  <li>Perhatikan korelasi dengan S&P 500 dan DXY</li>
                  <li>Weekend = volatilitas tinggi + gap bisa besar</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800"><strong>⚠️ Disclaimer:</strong> Trading crypto memiliki risiko EXTREMELY TINGGI. Jangan pernah invest lebih dari yang mampu kehilangan. Crypto tidak cocok untuk pemula!</p>
            </div>
          </TutorialBox>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Bitcoin (BTC)</h3>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                  <script dangerouslySetInnerHTML={{__html: JSON.stringify({
                    "symbol": "BITSTAMP:BTCUSD",
                    "width": "100%",
                    "height": 180,
                    "colorTheme": "light",
                    "isTransparent": false,
                    "locale": "id"
                  })}} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Ethereum (ETH)</h3>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                  <script dangerouslySetInnerHTML={{__html: JSON.stringify({
                    "symbol": "BITSTAMP:ETHUSD",
                    "width": "100%",
                    "height": 180,
                    "colorTheme": "light",
                    "isTransparent": false,
                    "locale": "id"
                  })}} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Solana (SOL)</h3>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                  <script dangerouslySetInnerHTML={{__html: JSON.stringify({
                    "symbol": "BITSTAMP:SOLUSD",
                    "width": "100%",
                    "height": 180,
                    "colorTheme": "light",
                    "isTransparent": false,
                    "locale": "id"
                  })}} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Ripple (XRP)</h3>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                  <script dangerouslySetInnerHTML={{__html: JSON.stringify({
                    "symbol": "BITSTAMP:XRPUSD",
                    "width": "100%",
                    "height": 180,
                    "colorTheme": "light",
                    "isTransparent": false,
                    "locale": "id"
                  })}} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* US INDICES SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl shadow-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                📈 US Indices
              </h2>
              <p className="text-sm text-gray-500">S&P 500 • Nasdaq 100 • Dow Jones</p>
            </div>
          </div>
          
          <TutorialBox title="📖 Cara Membaca Indices">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>S&P 500 (US500):</strong> 500 perusahaan terbesar AS, indikator ekonomi.</li>
              <li><strong>Nasdaq 100 (NAS100):</strong> Tech stocks, sangat volatil.</li>
              <li><strong>Dow Jones (US30):</strong> 30 perusahaan blue-chip.</li>
              <li><strong>Tip:</strong> Indices cocok untuk trading jangka menengah-panjang.</li>
            </ul>
          </TutorialBox>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">S&P 500</h3>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                  <script dangerouslySetInnerHTML={{__html: JSON.stringify({
                    "symbol": "FOREXCOM:SPX500",
                    "width": "100%",
                    "height": 180,
                    "colorTheme": "light",
                    "isTransparent": false,
                    "locale": "id"
                  })}} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Nasdaq 100</h3>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                  <script dangerouslySetInnerHTML={{__html: JSON.stringify({
                    "symbol": "FOREXCOM:NSXUSD",
                    "width": "100%",
                    "height": 180,
                    "colorTheme": "light",
                    "isTransparent": false,
                    "locale": "id"
                  })}} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Dow Jones</h3>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                  <script dangerouslySetInnerHTML={{__html: JSON.stringify({
                    "symbol": "FOREXCOM:US30",
                    "width": "100%",
                    "height": 180,
                    "colorTheme": "light",
                    "isTransparent": false,
                    "locale": "id"
                  })}} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">⚠️ Disclaimer</h4>
              <p className="text-amber-700 text-sm mt-1">
                Semua tools dan informasi di website ini hanya untuk tujuan edukasi. 
                Trading forex memiliki risiko tinggi. Selalu lakukan riset sendiri dan 
                gunakan money management yang ketat (max 2% risk per trade).
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tools;

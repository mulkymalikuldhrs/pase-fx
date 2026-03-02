import React, { useEffect, useRef, useState } from 'react';
import { 
  Calculator, Clock, TrendingUp, Activity, DollarSign, Globe, 
  BarChart3, Calendar, Sparkles, BarChart2, Bot, BookOpen, 
  HelpCircle, ChevronDown, ChevronUp, Info, Zap, Brain,
  Search, RefreshCw, AlertTriangle
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

// Tutorial Component
const TutorialBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4 border border-emerald-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-800">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-emerald-600" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-emerald-100">
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

        {/* AI Trading Tools Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              🤖 AI Trading Assistant
            </h2>
          </div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Analisis market otomatis menggunakan AI. Gratis, tanpa API key!
          </p>
          
          <TutorialBox title="📖 Cara Menggunakan AI Trading Assistant">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>AI Analysis:</strong> Pilih instrumen (XAUUSD, EURUSD, dll) dan timeframe, lalu klik "Analisis". AI akan memberikan rekomendasi BUY/SELL.</li>
              <li><strong>Pattern Recognition:</strong> Klik untuk mendeteksi pola chart seperti Double Top, Head & Shoulders, dll.</li>
              <li><strong>Trade Ideas:</strong> Klik "Generate" untuk mendapatkan ide trading hari ini.</li>
              <li><strong>Tip:</strong> Selalu konfirmasi dengan analisis manual sebelum entry!</li>
            </ul>
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

        {/* Market Data Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              📈 Data Market Real-Time
            </h2>
          </div>
          
          <TutorialBox title="📖 Cara Membaca Live Rates & Market Overview">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Live Rates:</strong> Menampilkan harga terkini pasangan mata uang. Angka hijau = naik, merah = turun.</li>
              <li><strong>Market Overview:</strong> Ringkasan kondisi market hari ini. BUY = mayoritas buy, SELL = mayoritas sell.</li>
              <li><strong>Session Timer:</strong> Menunjukkan sesi trading yang aktif. London dan NY adalah sesi paling volatil.</li>
              <li><strong>Tip:</strong> Perhatikan warna - hijau menunjukkan bullish, merah bearish.</li>
            </ul>
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

        {/* Market Cycles Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              ⏰ Sesi & Timing Trading
            </h2>
          </div>
          
          <TutorialBox title="📖 Cara Memahami Sesi Trading">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Asian Session (07:00-10:00 WIB):</strong> Volatilitas rendah. Cocok untuk range trading.</li>
              <li><strong>London Session (13:00-16:00 WIB):</strong> Volatilitas tinggi. Sesi paling aktif.</li>
              <li><strong>New York Session (19:00-22:00 WIB):</strong> Volatilitas tinggi. Overlap dengan London sangat dinamis.</li>
              <li><strong>Judas Zone (11:30-12:30):</strong> Hindari trading - sering manipulasi.</li>
              <li><strong>Tip:</strong> Trading di awal sesi untuk pergerakan terbesar!</li>
            </ul>
          </TutorialBox>
          
          <MarketCyclesDashboard />
        </section>

        {/* Calculators Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              🧮 Kalkulator Trading
            </h2>
          </div>
          
          <TutorialBox title="📖 Cara Menggunakan Kalkulator">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">Kalkulator Dasar:</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><strong>Pip Calculator:</strong> Hitung nilai pip berdasarkan pair dan lot size.</li>
                  <li><strong>Position Size:</strong> Tentukan besar posisi sesuai risk management.</li>
                  <li><strong>Profit Calculator:</strong> Estimasi profit/loss berdasarkan entry dan exit.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">Kalkulator Lanjutan:</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><strong>Risk/Reward:</strong> Hitung rasio risk:reward.</li>
                  <li><strong>Fibonacci:</strong> Hitung level Fibonacci retracement.</li>
                  <li><strong>Margin:</strong> Hitung margin yang dibutuhkan.</li>
                  <li><strong>Drawdown:</strong> Hitung maksimal drawdown.</li>
                  <li><strong>Pivot Points:</strong> Hitung level pivot harian.</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm"><strong>Tip:</strong> Selalu hitung position size sebelum entry! Jangan pernah risk lebih dari 2% per trade.</p>
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

        {/* Professional Analysis Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              🧠 Analisis Profesional (SMC/ICT)
            </h2>
          </div>
          
          <TutorialBox title="📖 Konsep SMC/ICT untuk Pemula">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">Konsep Dasar:</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><strong>Order Block:</strong> Zona di mana institusi besar melakukan buy/sell.</li>
                  <li><strong>Liquidity Zone:</strong> Area stop loss trader retail (target institusi).</li>
                  <li><strong>FVG (Fair Value Gap):</strong> Celah harga yang akan ditutupi.</li>
                  <li><strong>MSS (Market Structure Shift):</strong> Perubahan tren yang dikonfirmasi.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">COT Report:</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><strong>Commercials:</strong> Bank & institusi - biasanya benar.</li>
                  <li><strong>Non-Commercials:</strong> Speculator besar.</li>
                  <li><strong>Retail:</strong> Trader kecil - biasanya salah.</li>
                  <li><strong>Tip:</strong> Ikuti Commercials, bukan retail!</li>
                </ul>
              </div>
            </div>
          </TutorialBox>
          
          <div className="mb-6">
            <COTAnalysisDashboard />
          </div>
          <div className="mb-6">
            <TradingAnalysis />
          </div>
        </section>

        {/* Currency & Sentiment Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              💱 Kekuatan Mata Uang & Sentimen
            </h2>
          </div>
          
          <TutorialBox title="📖 Cara Membaca Kekuatan Mata Uang">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Currency Strength Meter:</strong> Menunjukkan mata uang terkuat dan terlemah. Semakin panjang bar, semakin kuat.</li>
              <li><strong>Correlation Matrix:</strong> Hubungan antar pair. +1 = bergerak sama, -1 = bergerak berlawanan.</li>
              <li><strong>Market Sentiment:</strong> Majority buy = overbought (可能反转), Majority sell = oversold (bisa rebound).</li>
              <li><strong>Tip:</strong> Trading searah mata uang kuat vs mata uang lemah!</li>
            </ul>
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

        {/* Major Pairs Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              💱 Chart Major Pairs
            </h2>
          </div>
          
          <TutorialBox title="📖 Cara Membaca Major Pairs">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>EUR/USD:</strong> "The Euro" - pair paling volatil, paling banyak ditradingkan.</li>
              <li><strong>GBP/USD:</strong> "The Cable" - pair paling volatil karena ekonomi UK.</li>
              <li><strong>USD/JPY:</strong> "The Yen" - pair paling stabil, sering safe haven.</li>
              <li><strong>AUD/USD:</strong> "The Aussie" - sensitif terhadapcommodity prices.</li>
              <li><strong>USD/CAD:</strong> "The Loonie" - sensitif terhadap oil prices.</li>
              <li><strong>Tip:</strong> Perhatikan korelasi antar pairs untuk konfirmasi sinyal!</li>
            </ul>
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

        {/* TradingView Widgets Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              📊 Chart & Kalender (TradingView)
            </h2>
          </div>
          
          <TutorialBox title="📖 Cara Menggunakan TradingView">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Chart:</strong> Gunakan untuk analisis teknikal. Pinch zoom pada mobile, scroll pada desktop.</li>
              <li><strong>Economic Calendar:</strong>cek news HIGH IMPACT sebelum trading! Jangan trading 30 menit sebelum/sesudah news.</li>
              <li><strong>Gold & DXY:</strong> Perhatikan korelasi - biasanya berlawanan.</li>
              <li><strong>Tip:</strong> Gunakan keyboard shortcut di desktop: Space = indikator, F = fullscreen.</li>
            </ul>
          </TutorialBox>
          
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" /> Kalender Ekonomi
              </h3>
              <div className="tradingview-widget-container" ref={calendarContainerRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" /> Harga Emas (XAUUSD)
              </h3>
              <div className="tradingview-widget-container" ref={goldContainerRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" /> Indeks DXY
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
                <Activity className="w-5 h-5 text-emerald-600" /> Forex Heat Map
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

        {/* Crypto Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              ₿ Crypto Market
            </h2>
          </div>
          
          <TutorialBox title="📖 Cara Membaca Crypto">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Bitcoin (BTC):</strong> Crypto terbesar, sering jadi indikator risk-on/risk-off.</li>
              <li><strong>Ethereum (ETH):</strong> Smart contracts, sensitif terhadap DeFi news.</li>
              <li><strong>Solana (SOL):</strong> Fast & cheap transactions, volatil.</li>
              <li><strong>Tip:</strong> Crypto lebih volatil dari forex - gunakan risk management ketat!</li>
            </ul>
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

        {/* Indices Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              📈 US Indices
            </h2>
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

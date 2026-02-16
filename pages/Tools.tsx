import React, { useEffect, useRef } from 'react';
import { Calendar, Activity, DollarSign, Globe, TrendingUp, BarChart3, Calculator, Clock, ExternalLink, Sparkles, BarChart2, Brain, Bot } from 'lucide-react';
import PipCalculator from '../components/calculators/PipCalculator';
import PositionCalculator from '../components/calculators/PositionCalculator';
import RiskRewardCalculator from '../components/calculators/RiskRewardCalculator';
import FibonacciCalculator from '../components/calculators/FibonacciCalculator';
import SessionTimer from '../components/widgets/SessionTimer';
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
import AIPatternRecognition from '../src/components/widgets/AIPatternRecognition';
import AITradeIdeas from '../src/components/widgets/AITradeIdeas';
import { TRADING_INSTRUMENTS } from '../src/constants/instruments';

const Tools: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const sentimentContainerRef = useRef<HTMLDivElement>(null);
  const goldContainerRef = useRef<HTMLDivElement>(null);
  const dxyContainerRef = useRef<HTMLDivElement>(null);

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
              "locale": "en",
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
            "locale": "en",
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
            "isTransparent": false,
            "colorTheme": "light",
            "locale": "en"
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
            "locale": "en",
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
            "locale": "en"
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
            "locale": "en"
          });
          dxyContainerRef.current.appendChild(script);
      }

  }, []);

  // Resources for COT analysis
  const cotResources = [
    {
      name: "Tradingster COT Report",
      url: "https://www.tradingster.com/cot",
      desc: "Visualisasi laporan COT yang mudah dibaca dengan chart interaktif.",
      icon: BarChart3,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      name: "Market Bulls COT Report",
      url: "https://market-bulls.com/cot-report/",
      desc: "Analisis mendalam laporan COT untuk berbagai pasangan mata uang.",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      name: "Market Bulls Gold COT",
      url: "https://market-bulls.com/cot-report-gold/",
      desc: "Spesifik untuk analisis Commitment of Traders pada Gold (XAUUSD).",
      icon: DollarSign,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      name: "CME Group QuikStrike",
      url: "https://www.cmegroup.com/tools-information/quikstrike/commitment-of-traders.html",
      desc: "Data resmi dari CME Group dengan tools analisis profesional.",
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      name: "CFTC Official Reports",
      url: "https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm",
      desc: "Sumber data primer dari Commodity Futures Trading Commission (CFTC).",
      icon: Globe,
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tools Trading</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai alat trading untuk membantu analisis dan pengelolaan risiko Anda. 
            Semua tools ini gratis dan bisa langsung digunakan.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <span>ℹ️</span>
            <span>Kalkulator untuk estimasi. Selalu verifikasi dengan platform trading Anda.</span>
          </div>
        </div>

        {/* AI Trading Tools Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Bot className="text-purple-600" /> AI Trading Assistant (Powered by Puter.js)
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Fitur AI gratis tanpa API key. Gunakan Puter.js untuk analisis market otomatis, pattern recognition, dan trade ideas.
            <span className="text-purple-600 font-medium"> 100% Gratis!</span>
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* AI Analysis Widget */}
            <div className="lg:col-span-2">
              <AIAnalysisWidget 
                instrument={TRADING_INSTRUMENTS[0]} 
                currentPrice={1.0850}
                timeframe="H4"
              />
            </div>
            
            {/* AI Pattern Recognition */}
            <div className="space-y-6">
              <AIPatternRecognition symbol="EUR/USD" />
              <AITradeIdeas />
            </div>
          </div>
        </section>

        {/* Live Rates, Market Overview & Session Timer */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <LiveRates />
          </div>
          <SessionTimer />
        </div>
         <div className="mb-8">
           <MarketOverview />
         </div>

         {/* Multi-Asset Dashboard - All Markets */}
         <div className="mb-12">
           <MultiAssetDashboard />
         </div>

         {/* Market Cycles Analysis */}
         <div className="mb-12">
           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Clock className="text-indigo-600" /> Market Cycles & Timing
           </h2>
           <MarketCyclesDashboard />
         </div>
 
         {/* Calculators Section */}
         <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="text-emerald-500" /> Trading Calculators
          </h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <PipCalculator />
            <PositionCalculator />
            <RiskRewardCalculator />
            <FibonacciCalculator />
          </div>
        </div>

        {/* Professional Market Analysis */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="text-purple-500" /> Professional Market Analysis
        </h2>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <MarketScreener />
          <CurrencyStrengthMeter />
        </div>

        {/* Institutional Grade Tools */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart2 className="text-indigo-500" /> Institutional Grade Analysis (COT & Smart Money)
        </h2>

        <div className="mb-8">
          <COTAnalysisDashboard />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <CurrencyStrengthDashboard />
          <MarketSentimentDashboard />
        </div>

        <div className="mb-8">
          <EconomicCalendarPro />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <CorrelationMatrix />
          
          {/* Currency Strength / Heat Map */}
          <div className="glass-card bg-white p-6 overflow-hidden border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                <Activity className="text-emerald-500" /> Forex Heat Map
              </h3>
            </div>
            <div className="tradingview-widget-container" ref={heatmapContainerRef}>
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>
        </div>

        {/* Trading Widgets Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="text-emerald-500" /> TradingView Widgets
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Economic Calendar */}
            <div className="glass-card bg-white p-6 overflow-hidden border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <Calendar className="text-emerald-500" /> Economic Calendar (TradingView)
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={calendarContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
            
            {/* Gold Price (XAUUSD) */}
            <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <TrendingUp className="text-yellow-500" /> Gold Price (XAUUSD)
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={goldContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>

            {/* DXY Index */}
            <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <DollarSign className="text-green-600" /> DXY Index
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={dxyContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
            
            {/* Market Sentiment */}
            <div className="glass-card bg-white p-6 overflow-hidden border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <Globe className="text-blue-500" /> Market Sentiment (EURUSD)
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={sentimentContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>

            {/* COT Analysis Tools */}
            <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <BarChart3 className="text-purple-500" /> COT Analysis Tools
                    </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Analisis sentimen institusi (Smart Money) menggunakan data Commitment of Traders (COT).
                  Gunakan link sumber berikut untuk data lengkap:
                </p>
                
                <div className="space-y-3">
                  {cotResources.map((resource, idx) => (
                    <a 
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <div className={`p-2 rounded-lg ${resource.bgColor} ${resource.color} shrink-0`}>
                        <resource.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
                          {resource.name}
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{resource.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
            </div>

            {/* TradingView Advanced Chart - Full Width */}
            <div className="glass-card bg-white p-6 lg:col-span-2 border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <DollarSign className="text-emerald-500" /> Advanced Chart
                    </h3>
                </div>
                <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                    <div className="tradingview-widget-container h-full w-full" ref={chartContainerRef}>
                        <div className="tradingview-widget-container__widget h-full w-full"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Tip */}
        <div className="mt-12 p-6 glass-card bg-white/80 border-l-4 border-emerald-500 rounded-r-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Clock className="text-emerald-500" />
            Tips Trading
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• Selalu gunakan Position Calculator sebelum trading untuk manajemen risiko yang tepat</li>
            <li>• Periksa Market Sessions untuk trading di saat volatilitas tinggi</li>
            <li>• Pantau Economic Calendar untuk berita berdampak tinggi</li>
            <li>• Selalu pertahankan minimal 1:1.5 Risk:Reward ratio</li>
            <li>• Jangan pernah risiko lebih dari 2% modal per trade</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tools;

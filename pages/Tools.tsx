import React, { useEffect, useRef } from 'react';
import { Calendar, Activity, DollarSign, Globe, TrendingUp, BarChart3, Calculator, Clock } from 'lucide-react';
import PipCalculator from '../components/calculators/PipCalculator';
import PositionCalculator from '../components/calculators/PositionCalculator';
import RiskRewardCalculator from '../components/calculators/RiskRewardCalculator';
import SessionTimer from '../components/widgets/SessionTimer';
import MarketOverview from '../components/widgets/MarketOverview';

const Tools: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const sentimentContainerRef = useRef<HTMLDivElement>(null);
  const goldContainerRef = useRef<HTMLDivElement>(null);
  const dxyContainerRef = useRef<HTMLDivElement>(null);
  const cotContainerRef = useRef<HTMLDivElement>(null);

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

      // COT Data Widget (using Symbol Info for now as placeholder)
      if (cotContainerRef.current) {
          cotContainerRef.current.innerHTML = '';
          const script = document.createElement('script');
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
          script.async = true;
          script.innerHTML = JSON.stringify({
            "symbol": "CFTC:EUR_NET",
            "width": "100%",
            "locale": "en",
            "colorTheme": "light"
          });
          cotContainerRef.current.appendChild(script);
      }

  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tools Trading</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Kalkulator dan widget untuk membantu analisis dan manajemen trading Anda.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <span>ℹ️</span>
            <span>Kalkulator untuk estimasi. Selalu verifikasi dengan platform trading Anda.</span>
          </div>
        </div>

        {/* Market Overview & Session Timer */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <MarketOverview />
          <SessionTimer />
        </div>

        {/* Calculators Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="text-emerald-500" /> Trading Calculators
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <PipCalculator />
            <PositionCalculator />
            <RiskRewardCalculator />
          </div>
        </div>

        {/* Trading Widgets Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="text-emerald-500" /> Market Widgets
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Economic Calendar */}
            <div className="glass-card bg-white/60 p-6 overflow-hidden border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <Calendar className="text-emerald-500" /> Economic Calendar
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={calendarContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>

            {/* Currency Strength / Heat Map */}
            <div className="glass-card bg-white/60 p-6 overflow-hidden border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <Activity className="text-emerald-500" /> Forex Heat Map
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={heatmapContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
            
            {/* Gold Price (XAUUSD) */}
            <div className="glass-card bg-white/60 p-6 border-gray-200">
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
            <div className="glass-card bg-white/60 p-6 border-gray-200">
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
            <div className="glass-card bg-white/60 p-6 overflow-hidden border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <Globe className="text-blue-500" /> Market Sentiment (EURUSD)
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={sentimentContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>

            {/* COT Data (Commitment of Traders) */}
            <div className="glass-card bg-white/60 p-6 border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <BarChart3 className="text-purple-500" /> COT Data (EUR)
                    </h3>
                </div>
                <div className="tradingview-widget-container" ref={cotContainerRef}>
                    <div className="tradingview-widget-container__widget"></div>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                    *Commitment of Traders data shows net positions of institutional traders. Updated weekly (Friday).
                </p>
            </div>

            {/* TradingView Advanced Chart - Full Width */}
            <div className="glass-card bg-white/60 p-6 lg:col-span-2 border-gray-200">
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
        <div className="mt-12 p-6 glass-card bg-white/80 border-l-4 border-emerald-500">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Clock className="text-emerald-500" />
            Trading Tips
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• Use the Position Calculator before every trade to ensure proper risk management</li>
            <li>• Check Market Sessions to trade during high volatility periods</li>
            <li>• Monitor Economic Calendar for high-impact news events</li>
            <li>• Always maintain minimum 1:1.5 Risk:Reward ratio</li>
            <li>• Never risk more than 2% of your account per trade</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tools;

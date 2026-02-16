import React, { useState } from 'react';
import { Activity, AlertTriangle, Bell, Info } from 'lucide-react';

interface SentimentData {
  pair: string;
  retailSentiment: number; // 0-100 (bullish)
  institutionalBias: 'bullish' | 'bearish' | 'neutral';
  technicalScore: number; // 0-100
  fundamentalScore: number; // 0-100
  overallSignal: 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
  keyEvents: string[];
}

const SENTIMENT_DATA: SentimentData[] = [
  {
    pair: 'EURUSD',
    retailSentiment: 68,
    institutionalBias: 'bullish',
    technicalScore: 72,
    fundamentalScore: 65,
    overallSignal: 'buy',
    keyEvents: ['ECB hawkish tone', 'US inflation cooling', 'Eurozone PMI beat']
  },
  {
    pair: 'GBPUSD',
    retailSentiment: 45,
    institutionalBias: 'neutral',
    technicalScore: 58,
    fundamentalScore: 62,
    overallSignal: 'neutral',
    keyEvents: ['BoE rate decision pending', 'UK GDP data mixed']
  },
  {
    pair: 'USDJPY',
    retailSentiment: 32,
    institutionalBias: 'bearish',
    technicalScore: 38,
    fundamentalScore: 45,
    overallSignal: 'sell',
    keyEvents: ['BoJ intervention fears', 'Yen safe-haven demand', 'Carry trade unwinding']
  },
  {
    pair: 'XAUUSD',
    retailSentiment: 78,
    institutionalBias: 'bullish',
    technicalScore: 82,
    fundamentalScore: 75,
    overallSignal: 'strong_buy',
    keyEvents: ['Geopolitical tensions', 'USD weakness', 'Central bank buying']
  },
  {
    pair: 'AUDUSD',
    retailSentiment: 28,
    institutionalBias: 'bearish',
    technicalScore: 35,
    fundamentalScore: 40,
    overallSignal: 'sell',
    keyEvents: ['China slowdown concerns', 'Commodity prices down', 'RBA dovish pivot']
  }
];

const INITIAL_NOTIFICATIONS = [
  '📊 EURUSD: Institutional positioning turned bullish',
  '⚠️ USDJPY: Intervention risk elevated',
  '📈 XAUUSD: Safe-haven demand increasing',
  '🔔 US CPI data release in 2 hours'
];

const MarketSentimentDashboard: React.FC = () => {
  const [sentiments] = useState<SentimentData[]>(SENTIMENT_DATA);
  const [selectedPair, setSelectedPair] = useState('EURUSD');
  const [notifications] = useState<string[]>(INITIAL_NOTIFICATIONS);

  const currentSentiment = sentiments.find(s => s.pair === selectedPair);

  const getSignalBadge = (signal: string) => {
    const styles = {
      strong_buy: 'bg-emerald-600 text-white',
      buy: 'bg-emerald-500 text-white',
      neutral: 'bg-gray-500 text-white',
      sell: 'bg-red-500 text-white',
      strong_sell: 'bg-red-600 text-white'
    };
    const labels = {
      strong_buy: 'STRONG BUY',
      buy: 'BUY',
      neutral: 'NEUTRAL',
      sell: 'SELL',
      strong_sell: 'STRONG SELL'
    };
    return (
      <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${styles[signal as keyof typeof styles]}`}>
        {labels[signal as keyof typeof labels]}
      </span>
    );
  };

  const getGaugeColor = (value: number) => {
    if (value >= 70) return 'text-emerald-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-lg">
            <Activity className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Market Sentiment</h3>
            <p className="text-sm text-gray-500">Retail vs Institutional positioning</p>
          </div>
        </div>
        
        <select
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {sentiments.map(s => (
            <option key={s.pair} value={s.pair}>{s.pair}</option>
          ))}
        </select>
      </div>

      {currentSentiment && (
        <div className="space-y-6">
          {/* Main Signal */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-1">Overall Signal</h4>
              {getSignalBadge(currentSentiment.overallSignal)}
            </div>
            <div className="text-right">
              <h4 className="text-sm font-medium text-gray-600 mb-1">Institutional Bias</h4>
              <span className={`text-lg font-bold ${
                currentSentiment.institutionalBias === 'bullish' ? 'text-emerald-600' : 
                currentSentiment.institutionalBias === 'bearish' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {currentSentiment.institutionalBias.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Score Gauges */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getGaugeColor(currentSentiment.retailSentiment)}`}>
                {currentSentiment.retailSentiment}%
              </div>
              <div className="text-xs text-gray-500">Retail Bullish</div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${currentSentiment.retailSentiment >= 50 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                     style={{ width: `${currentSentiment.retailSentiment}%` }} />
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getGaugeColor(currentSentiment.technicalScore)}`}>
                {currentSentiment.technicalScore}%
              </div>
              <div className="text-xs text-gray-500">Technical Score</div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${currentSentiment.technicalScore}%` }} />
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getGaugeColor(currentSentiment.fundamentalScore)}`}>
                {currentSentiment.fundamentalScore}%
              </div>
              <div className="text-xs text-gray-500">Fundamental Score</div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${currentSentiment.fundamentalScore}%` }} />
              </div>
            </div>
          </div>

          {/* Key Events */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Key Market Events
            </h4>
            <ul className="space-y-2">
              {currentSentiment.keyEvents.map((event, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-amber-800">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  {event}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-red-500" />
          Recent Alerts & Notifications
        </h4>
        <div className="space-y-2">
          {notifications.map((notif, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-sm text-gray-700">{notif}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contrarian Warning */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Sentiment Analysis Tips
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Contrarian approach:</strong> When retail is 70%+ bullish, institutions often sell</li>
          <li>• <strong>Confirmation needed:</strong> Sentiment works best with price action confirmation</li>
          <li>• <strong>Extreme levels:</strong> Above 80% or below 20% often signal reversals</li>
        </ul>
      </div>
    </div>
  );
};

export default MarketSentimentDashboard;

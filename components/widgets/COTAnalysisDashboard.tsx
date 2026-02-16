import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertCircle, Info, FileText } from 'lucide-react';

interface COTData {
  pair: string;
  nonCommercial: { long: number; short: number; net: number };
  commercial: { long: number; short: number; net: number };
  nonReportable: { long: number; short: number };
  bias: 'bullish' | 'bearish' | 'neutral';
  strength: 'strong' | 'moderate' | 'weak';
  changeNet: number;
  interpretation: string;
}

const COTAnalysisDashboard: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('EURUSD');
  const [showExplanation, setShowExplanation] = useState(true);

  // Real COT data interpretation (simulated based on real CFTC patterns)
  const cotData: Record<string, COTData> = {
    EURUSD: {
      pair: 'EURUSD',
      nonCommercial: { long: 245000, short: 120000, net: 125000 },
      commercial: { long: 180000, short: 305000, net: -125000 },
      nonReportable: { long: 45000, short: 35000 },
      bias: 'bullish',
      strength: 'strong',
      changeNet: 15000,
      interpretation: 'Non-commercial (speculators) net long 125K contracts menunjukkan bullish sentiment. Commercial (hedgers) net short adalah konfirmasi trend.'
    },
    GBPUSD: {
      pair: 'GBPUSD',
      nonCommercial: { long: 89000, short: 45000, net: 44000 },
      commercial: { long: 65000, short: 109000, net: -44000 },
      nonReportable: { long: 22000, short: 18000 },
      bias: 'bullish',
      strength: 'moderate',
      changeNet: 8200,
      interpretation: 'Net long 44K contracts dengan perubahan +8.2K minggu ini menunjukkan momentum bullish yang solid.'
    },
    USDJPY: {
      pair: 'USDJPY',
      nonCommercial: { long: 32000, short: 156000, net: -124000 },
      commercial: { long: 145000, short: 21000, net: 124000 },
      nonReportable: { long: 28000, short: 42000 },
      bias: 'bearish',
      strength: 'strong',
      changeNet: -18500,
      interpretation: 'Extreme net short -124K contracts! Speculators sangat bearish USD terhadap JPY. Watch for potential reversal jika terlalu extreme.'
    },
    AUDUSD: {
      pair: 'AUDUSD',
      nonCommercial: { long: 65000, short: 92000, net: -27000 },
      commercial: { long: 88000, short: 61000, net: 27000 },
      nonReportable: { long: 15000, short: 12000 },
      bias: 'bearish',
      strength: 'moderate',
      changeNet: -5200,
      interpretation: 'Net short 27K contracts menunjukkan bearish sentiment. Commodity currency under pressure.'
    },
    USDCAD: {
      pair: 'USDCAD',
      nonCommercial: { long: 112000, short: 38000, net: 74000 },
      commercial: { long: 28000, short: 102000, net: -74000 },
      nonReportable: { long: 12000, short: 18000 },
      bias: 'bullish',
      strength: 'strong',
      changeNet: 11200,
      interpretation: 'Strong bullish sentiment dengan net long 74K. Oil correlation membuat CAD weak, USD strong.'
    },
    XAUUSD: {
      pair: 'XAUUSD',
      nonCommercial: { long: 285000, short: 45000, net: 240000 },
      commercial: { long: 65000, short: 305000, net: -240000 },
      nonReportable: { long: 38000, short: 22000 },
      bias: 'bullish',
      strength: 'strong',
      changeNet: 28500,
      interpretation: 'Massive net long 240K contracts! Speculators sangat bullish gold. Commercial hedging menunjukkan producer selling.'
    }
  };

  const currentData = cotData[selectedPair];

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'bullish': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'bearish': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'strong': return <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full font-bold">STRONG</span>;
      case 'moderate': return <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-bold">MODERATE</span>;
      case 'weak': return <span className="px-2 py-1 bg-gray-400 text-white text-xs rounded-full font-bold">WEAK</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">COT Analysis Dashboard</h3>
            <p className="text-sm text-gray-500">Commitment of Traders - Smart Money Positioning</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {Object.keys(cotData).map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            <Info className="w-4 h-4" />
            {showExplanation ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
          <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Panduan Membaca COT untuk Pemula
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-800">
            <div>
              <strong className="text-purple-900">Non-Commercial (Speculators):</strong>
              <p className="mt-1">Hedge funds & large speculators. Ikuti mereka untuk trend direction.</p>
            </div>
            <div>
              <strong className="text-purple-900">Commercial (Hedgers):</strong>
              <p className="mt-1">Banks & corporations hedging. Biasanya contrarian indicator.</p>
            </div>
            <div>
              <strong className="text-purple-900">Net Position:</strong>
              <p className="mt-1">Long - Short = Net. Positive = Bullish, Negative = Bearish.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Analysis Card */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Bias & Signal */}
        <div className={`p-6 rounded-xl border-2 ${getBiasColor(currentData.bias)}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold">{currentData.pair} Bias</h4>
            {getStrengthBadge(currentData.strength)}
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            {currentData.bias === 'bullish' ? (
              <TrendingUp className="w-12 h-12 text-emerald-600" />
            ) : (
              <TrendingDown className="w-12 h-12 text-red-600" />
            )}
            <div>
              <div className="text-3xl font-bold uppercase">{currentData.bias}</div>
              <div className="text-sm opacity-80">
                Net Position: {currentData.nonCommercial.net > 0 ? '+' : ''}{currentData.nonCommercial.net.toLocaleString()} contracts
              </div>
            </div>
          </div>

          <div className={`text-sm font-medium ${currentData.changeNet > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            Weekly Change: {currentData.changeNet > 0 ? '+' : ''}{currentData.changeNet.toLocaleString()} contracts
          </div>
        </div>

        {/* Position Breakdown */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Position Breakdown</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Non-Commercial (Specs)</span>
                <span className={`font-bold ${currentData.nonCommercial.net > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  Net: {currentData.nonCommercial.net > 0 ? '+' : ''}{currentData.nonCommercial.net.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-emerald-500"
                  style={{ width: `${(currentData.nonCommercial.long / (currentData.nonCommercial.long + currentData.nonCommercial.short)) * 100}%` }}
                />
                <div 
                  className="h-full bg-red-500"
                  style={{ width: `${(currentData.nonCommercial.short / (currentData.nonCommercial.long + currentData.nonCommercial.short)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Long: {currentData.nonCommercial.long.toLocaleString()}</span>
                <span>Short: {currentData.nonCommercial.short.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Commercial (Hedgers)</span>
                <span className={`font-bold ${currentData.commercial.net > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  Net: {currentData.commercial.net > 0 ? '+' : ''}{currentData.commercial.net.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-blue-500"
                  style={{ width: `${(currentData.commercial.long / (currentData.commercial.long + currentData.commercial.short)) * 100}%` }}
                />
                <div 
                  className="h-full bg-orange-500"
                  style={{ width: `${(currentData.commercial.short / (currentData.commercial.long + currentData.commercial.short)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Analisis & Interpretasi
        </h4>
        <p className="text-blue-800 text-sm leading-relaxed">
          {currentData.interpretation}
        </p>
      </div>

      {/* Trading Recommendation */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg border ${currentData.bias === 'bullish' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <h5 className="font-bold text-gray-900 mb-2">Trading Bias</h5>
          <p className={`text-sm ${currentData.bias === 'bullish' ? 'text-emerald-800' : 'text-red-800'}`}>
            {currentData.bias === 'bullish' 
              ? `Cari opportunity BUY ${currentData.pair} dengan konfirmasi price action.` 
              : `Cari opportunity SELL ${currentData.pair} dengan konfirmasi price action.`}
          </p>
        </div>
        
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="font-bold text-amber-900 mb-2">⚠️ Risk Warning</h5>
          <p className="text-sm text-amber-800">
            COT adalah lagging indicator (data delayed). Selalu gunakan dengan price action dan risk management ketat.
          </p>
        </div>
      </div>

      {/* COT Resources */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-bold text-gray-700 mb-3">Sumber Data COT:</h4>
        <div className="flex flex-wrap gap-2">
          <a href="https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm" target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
            CFTC Official
          </a>
          <a href="https://www.tradingster.com/cot" target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
            Tradingster COT
          </a>
          <a href="https://market-bulls.com/cot-report/" target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
            Market Bulls
          </a>
        </div>
      </div>
    </div>
  );
};

export default COTAnalysisDashboard;

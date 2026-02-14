import React, { useState } from 'react';
import { Target, TrendingUp, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';

interface RRResult {
  riskReward: number;
  riskAmount: number;
  rewardAmount: number;
  riskPips: number;
  rewardPips: number;
}

const RiskRewardCalculator: React.FC = () => {
  const [entry, setEntry] = useState<string>('1.0850');
  const [stopLoss, setStopLoss] = useState<string>('1.0820');
  const [takeProfit, setTakeProfit] = useState<string>('1.0900');
  const [lotSize, setLotSize] = useState<string>('1.0');
  const [result, setResult] = useState<RRResult | null>(null);

  const calculateRR = () => {
    const entryPrice = parseFloat(entry) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;
    const lots = parseFloat(lotSize) || 0;

    if (entryPrice === 0 || sl === 0 || tp === 0) return;

    const riskPips = Math.abs(entryPrice - sl) * 10000;
    const rewardPips = Math.abs(tp - entryPrice) * 10000;
    const rr = rewardPips / riskPips;
    
    const pipValue = 10 * lots;
    const riskAmount = riskPips * pipValue;
    const rewardAmount = rewardPips * pipValue;

    setResult({
      riskReward: parseFloat(rr.toFixed(2)),
      riskAmount: parseFloat(riskAmount.toFixed(2)),
      rewardAmount: parseFloat(rewardAmount.toFixed(2)),
      riskPips: parseFloat(riskPips.toFixed(1)),
      rewardPips: parseFloat(rewardPips.toFixed(1))
    });
  };

  const getRRColor = (rr: number) => {
    if (rr >= 2) return 'text-emerald-600';
    if (rr >= 1.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRRBgColor = (rr: number) => {
    if (rr >= 2) return 'bg-emerald-50 border-emerald-200';
    if (rr >= 1.5) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="glass-card p-6 bg-white/70 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <Target className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Risk/Reward Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Entry</label>
            <input
              type="number"
              step="0.0001"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">SL</label>
            <input
              type="number"
              step="0.0001"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">TP</label>
            <input
              type="number"
              step="0.0001"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2 font-medium">Lot Size</label>
          <input
            type="number"
            step="0.01"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
          />
        </div>

        <button
          onClick={calculateRR}
          className="w-full py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          Calculate R:R
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`text-center p-4 rounded-lg border ${getRRBgColor(result.riskReward)}`}>
              <p className="text-sm text-gray-600 mb-1">Risk:Reward Ratio</p>
              <p className={`text-4xl font-bold ${getRRColor(result.riskReward)}`}>
                1:{result.riskReward}
              </p>
              <div className="flex justify-center gap-4 mt-2 text-sm">
                <span className="text-gray-600">{result.riskPips} pips risk</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{result.rewardPips} pips reward</span>
              </div>
              {result.riskReward < 1.5 && (
                <p className="text-xs text-red-600 mt-2 flex items-center justify-center gap-1">
                  <AlertCircle size={12} />
                  R:R too low. Minimum 1:1.5 recommended.
                </p>
              )}
              {result.riskReward >= 2 && (
                <p className="text-xs text-emerald-600 mt-2 flex items-center justify-center gap-1">
                  <CheckCircle size={12} />
                  Excellent R:R ratio!
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">Risk</span>
                </div>
                <p className="text-xl font-bold text-gray-900">${result.riskAmount}</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">Reward</span>
                </div>
                <p className="text-xl font-bold text-gray-900">${result.rewardAmount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskRewardCalculator;

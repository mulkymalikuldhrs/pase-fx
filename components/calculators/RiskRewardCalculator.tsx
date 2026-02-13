import React, { useState } from 'react';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';

interface RRResult {
  riskReward: number;
  riskAmount: number;
  rewardAmount: number;
  riskPercent: number;
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

    const isBuy = tp > entryPrice;
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
      riskPercent: parseFloat(((riskAmount / 10000) * 100).toFixed(2))
    });
  };

  const getRRColor = (rr: number) => {
    if (rr >= 2) return 'text-emerald-400';
    if (rr >= 1.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Target className="w-6 h-6 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Risk/Reward Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Entry</label>
            <input
              type="number"
              step="0.0001"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="glass-input"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">SL</label>
            <input
              type="number"
              step="0.0001"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="glass-input"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">TP</label>
            <input
              type="number"
              step="0.0001"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="glass-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Lot Size</label>
          <input
            type="number"
            step="0.01"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            className="glass-input"
          />
        </div>

        <button
          onClick={calculateRR}
          className="w-full glass-button"
        >
          Calculate R:R
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Risk:Reward Ratio</p>
              <p className={`text-4xl font-bold ${getRRColor(result.riskReward)}`}>
                1:{result.riskReward}
              </p>
              {result.riskReward < 1.5 && (
                <p className="text-xs text-red-400 mt-2">
                  ⚠️ R:R too low. Minimum 1:1.5 recommended.
                </p>
              )}
              {result.riskReward >= 2 && (
                <p className="text-xs text-emerald-400 mt-2">
                  ✅ Excellent R:R ratio!
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Risk</span>
                </div>
                <p className="text-xl font-bold text-white">${result.riskAmount}</p>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">Reward</span>
                </div>
                <p className="text-xl font-bold text-white">${result.rewardAmount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskRewardCalculator;

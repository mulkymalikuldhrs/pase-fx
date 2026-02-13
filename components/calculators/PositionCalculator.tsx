import React, { useState } from 'react';
import { Scale, AlertTriangle } from 'lucide-react';

interface PositionResult {
  positionSize: number;
  lots: number;
  riskAmount: number;
}

const PositionCalculator: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercent, setRiskPercent] = useState<string>('2');
  const [stopLoss, setStopLoss] = useState<string>('50');
  const [pair, setPair] = useState<string>('EURUSD');
  const [result, setResult] = useState<PositionResult | null>(null);

  const calculatePosition = () => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const sl = parseFloat(stopLoss) || 0;

    if (sl === 0) return;

    const riskAmount = balance * (risk / 100);
    const pipValue = 10;
    const positionSize = riskAmount / (sl * pipValue);
    const lots = positionSize / 100000;

    setResult({
      positionSize: Math.floor(positionSize),
      lots: parseFloat(lots.toFixed(2)),
      riskAmount: parseFloat(riskAmount.toFixed(2))
    });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Scale className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Position Size Calculator</h3>
      </div>

      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-200">
            Risk max 1-2% per trade. Never risk more than you can afford to lose.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Account Balance ($)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="glass-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Risk %</label>
            <input
              type="number"
              step="0.1"
              max="5"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              className="glass-input"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Stop Loss (pips)</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="glass-input"
            />
          </div>
        </div>

        <button
          onClick={calculatePosition}
          className="w-full glass-button"
        >
          Calculate Position Size
        </button>

        {result && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-xs text-slate-400">Recommended Lot Size</p>
              <p className="text-2xl font-bold text-emerald-400">{result.lots} lots</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-400">Position Size</p>
                <p className="text-lg font-semibold text-white">{result.positionSize.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-400">Risk Amount</p>
                <p className="text-lg font-semibold text-white">${result.riskAmount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionCalculator;

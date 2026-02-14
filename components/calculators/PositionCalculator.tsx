import React, { useState } from 'react';
import { Scale, AlertTriangle, Info } from 'lucide-react';

interface PositionResult {
  positionSize: number;
  lots: number;
  riskAmount: number;
  recommendedRisk: number;
}

const PositionCalculator: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercent, setRiskPercent] = useState<string>('2');
  const [stopLoss, setStopLoss] = useState<string>('50');
  const [pair, setPair] = useState<string>('EURUSD');
  const [result, setResult] = useState<PositionResult | null>(null);

  const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'XAUUSD'];

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
      riskAmount: parseFloat(riskAmount.toFixed(2)),
      recommendedRisk: balance * 0.02
    });
  };

  return (
    <div className="glass-card p-6 bg-white/70 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Scale className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Position Size Calculator</h3>
      </div>

      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Risk max 1-2% per trade. Never risk more than you can afford to lose.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2 font-medium">Currency Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            {pairs.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2 font-medium">Account Balance ($)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Risk %</label>
            <input
              type="number"
              step="0.1"
              max="5"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">Rekomendasi: 1-2%</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Stop Loss (pips)</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            />
          </div>
        </div>

        <button
          onClick={calculatePosition}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Calculate Position Size
        </button>

        {result && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Recommended Lot Size</p>
              <p className="text-2xl font-bold text-emerald-600">{result.lots} lots</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Position Size</p>
                <p className="text-lg font-semibold text-gray-900">{result.positionSize.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Risk Amount</p>
                <p className="text-lg font-semibold text-gray-900">${result.riskAmount}</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <Info size={12} />
                Max recommended risk: ${result.recommendedRisk.toFixed(2)} (2%)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionCalculator;

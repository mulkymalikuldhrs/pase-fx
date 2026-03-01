import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, AlertTriangle, Info } from 'lucide-react';

interface DrawdownResult {
  currentDrawdown: number;
  maxDrawdown: number;
  currentBalance: number;
  requiredRecovery: number;
  riskOfRuin: number;
}

const DrawdownCalculator: React.FC = () => {
  const [startingBalance, setStartingBalance] = useState<string>('10000');
  const [currentBalance, setCurrentBalance] = useState<string>('8000');
  const [winRate, setWinRate] = useState<string>('50');
  const [riskReward, setRiskReward] = useState<string>('2');
  const [trades, setTrades] = useState<string>('10');
  const [result, setResult] = useState<DrawdownResult | null>(null);

  const calculate = () => {
    const start = parseFloat(startingBalance) || 1;
    const current = parseFloat(currentBalance) || 0;
    const win = parseFloat(winRate) / 100 || 0.5;
    const rr = parseFloat(riskReward) || 2;
    const nTrades = parseInt(trades) || 10;
    
    // Drawdown calculations
    const drawdown = ((start - current) / start) * 100;
    const maxDD = drawdown; // Simplified
    
    // Recovery calculation
    // To recover from X% loss, you need more than X% gain
    // Recovery = (Start - Current) / Current * 100
    const recovery = ((start - current) / current) * 100;
    
    // Risk of ruin calculation (simplified)
    // Using Kelly criterion approximation
    const edge = (win * rr) - ((1 - win) * 1);
    const kelly = win - ((1 - win) / rr);
    
    // Risk of ruin estimation (simplified)
    let riskOfRuin = 0;
    if (kelly > 0) {
      // With positive edge, risk is lower
      riskOfRuin = Math.max(0, 100 - (kelly * 100 * 2));
    } else {
      // With negative edge, risk increases
      riskOfRuin = Math.min(100, 100 + (kelly * 100 * 2));
    }
    
    setResult({
      currentDrawdown: drawdown,
      maxDrawdown: maxDD,
      currentBalance: current,
      requiredRecovery: recovery,
      riskOfRuin: Math.max(0, Math.min(100, riskOfRuin))
    });
  };

  useEffect(() => {
    calculate();
  }, [startingBalance, currentBalance, winRate, riskReward, trades]);

  return (
    <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <TrendingDown className="text-red-500" /> Drawdown Calculator
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Starting Balance ($)
          </label>
          <input
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Balance ($)
          </label>
          <input
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="8000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Win Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={winRate}
            onChange={(e) => setWinRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average Risk:Reward Ratio
          </label>
          <input
            type="number"
            step="0.1"
            value={riskReward}
            onChange={(e) => setRiskReward(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Trades
          </label>
          <input
            type="number"
            value={trades}
            onChange={(e) => setTrades(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="10"
          />
        </div>

        {result && (
          <div className="mt-4 space-y-3">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Current Drawdown:</span>
                <span className={`font-bold text-xl ${result.currentDrawdown > 20 ? 'text-red-600' : 'text-orange-600'}`}>
                  {result.currentDrawdown.toFixed(1)}%
                </span>
              </div>
              {result.currentDrawdown > 20 && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertTriangle size={14} />
                  <span>Drawdown di atas 20% - pertimbangkan untuk暂停交易</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Recovery Required:</span>
                <span className="font-bold text-emerald-600">{result.requiredRecovery.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Risk of Ruin:</span>
                <span className={`font-bold ${result.riskOfRuin > 50 ? 'text-red-600' : result.riskOfRuin > 20 ? 'text-orange-600' : 'text-green-600'}`}>
                  {result.riskOfRuin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>Recovery drawdown membutuhkan gain LEBIH BESAR dari persentase drawdown. Contoh: Dari 50% DD, butuh 100% gain untuk recovery.</p>
        </div>
      </div>
    </div>
  );
};

export default DrawdownCalculator;

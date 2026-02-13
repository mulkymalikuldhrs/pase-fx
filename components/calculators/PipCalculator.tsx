import React, { useState } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';

interface PipResult {
  pipValue: number;
  totalValue: number;
}

const PipCalculator: React.FC = () => {
  const [lotSize, setLotSize] = useState<string>('1.0');
  const [pipCount, setPipCount] = useState<string>('50');
  const [pair, setPair] = useState<string>('EURUSD');
  const [result, setResult] = useState<PipResult | null>(null);

  const pairs: Record<string, number> = {
    'EURUSD': 10,
    'GBPUSD': 10,
    'USDJPY': 9.09,
    'USDCHF': 11.11,
    'AUDUSD': 10,
    'NZDUSD': 10,
    'USDCAD': 7.69,
    'XAUUSD': 10,
    'XAGUSD': 50,
  };

  const calculatePip = () => {
    const lots = parseFloat(lotSize) || 0;
    const pips = parseFloat(pipCount) || 0;
    const valuePerPip = pairs[pair] || 10;
    
    const pipValue = valuePerPip * lots;
    const totalValue = pipValue * pips;
    
    setResult({
      pipValue: parseFloat(pipValue.toFixed(2)),
      totalValue: parseFloat(totalValue.toFixed(2))
    });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Calculator className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Pip Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Currency Pair</label>
          <select 
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="glass-input"
          >
            {Object.keys(pairs).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Lot Size</label>
            <input
              type="number"
              step="0.01"
              value={lotSize}
              onChange={(e) => setLotSize(e.target.value)}
              className="glass-input"
              placeholder="1.0"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Pip Count</label>
            <input
              type="number"
              value={pipCount}
              onChange={(e) => setPipCount(e.target.value)}
              className="glass-input"
              placeholder="50"
            />
          </div>
        </div>

        <button
          onClick={calculatePip}
          className="w-full glass-button mt-4"
        >
          <ArrowRightLeft className="w-4 h-4 inline mr-2" />
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Value per Pip</p>
                <p className="text-lg font-bold text-emerald-400">${result.pipValue}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Value</p>
                <p className="text-lg font-bold text-emerald-400">${result.totalValue}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipCalculator;

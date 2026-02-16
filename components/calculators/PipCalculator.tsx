import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Info } from 'lucide-react';

interface PipResult {
  pipValue: number;
  totalValue: number;
}

const PipCalculator: React.FC = () => {
  const [lotSize, setLotSize] = useState<string>('1.0');
  const [pipCount, setPipCount] = useState<string>('50');
  const [pair, setPair] = useState<string>('EURUSD');
  const [result, setResult] = useState<PipResult | null>(null);

  const pairs: Record<string, { value: number; description: string }> = {
    'EURUSD': { value: 10, description: '$10 per pip untuk 1 lot' },
    'GBPUSD': { value: 10, description: '$10 per pip untuk 1 lot' },
    'USDJPY': { value: 9.09, description: '~$9.09 per pip untuk 1 lot' },
    'USDCHF': { value: 11.11, description: '~$11.11 per pip untuk 1 lot' },
    'AUDUSD': { value: 10, description: '$10 per pip untuk 1 lot' },
    'NZDUSD': { value: 10, description: '$10 per pip untuk 1 lot' },
    'USDCAD': { value: 7.69, description: '~$7.69 per pip untuk 1 lot' },
    'XAUUSD': { value: 10, description: '$10 per pip untuk 1 lot' },
    'XAGUSD': { value: 50, description: '$50 per pip untuk 1 lot' },
  };

  const calculatePip = () => {
    const lots = parseFloat(lotSize) || 0;
    const pips = parseFloat(pipCount) || 0;
    const valuePerPip = pairs[pair].value * lots;
    
    const pipValue = valuePerPip;
    const totalValue = pipValue * pips;
    
    setResult({
      pipValue: parseFloat(pipValue.toFixed(2)),
      totalValue: parseFloat(totalValue.toFixed(2))
    });
  };

  return (
    <div className="glass-card p-6 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-700 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Calculator className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">Pip Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-slate-400 mb-2 font-medium">Currency Pair</label>
          <select 
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100"
          >
            {Object.keys(pairs).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-slate-500 mt-1 flex items-center gap-1">
            <Info size={12} />
            {pairs[pair].description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-400 mb-2 font-medium">Lot Size</label>
            <input
              type="number"
              step="0.01"
              value={lotSize}
              onChange={(e) => setLotSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100"
              placeholder="1.0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-400 mb-2 font-medium">Pip Count</label>
            <input
              type="number"
              value={pipCount}
              onChange={(e) => setPipCount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100"
              placeholder="50"
            />
          </div>
        </div>

        <button
          onClick={calculatePip}
          className="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium flex items-center justify-center gap-2"
        >
          <ArrowRightLeft className="w-4 h-4" />
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Value per Pip</p>
                <p className="text-lg font-bold text-emerald-600">${result.pipValue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Total Value</p>
                <p className="text-lg font-bold text-emerald-600">${result.totalValue}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipCalculator;

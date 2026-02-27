import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown, Info } from 'lucide-react';

interface PivotLevels {
  pp: number;
  r1: number;
  r2: number;
  r3: number;
  s1: number;
  s2: number;
  s3: number;
}

const PIVOT_INSTRUMENTS = [
  'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 
  'NZDUSD', 'EURJPY', 'GBPJPY', 'XAUUSD', 'XAGUSD'
];

const PivotPointsCalculator: React.FC = () => {
  const [high, setHigh] = useState<string>('1.0900');
  const [low, setLow] = useState<string>('1.0800');
  const [close, setClose] = useState<string>('1.0850');
  const [pivotType, setPivotType] = useState<'standard' | 'fibonacci' | 'woodie' | 'camarilla'>('standard');
  const [result, setResult] = useState<PivotLevels | null>(null);

  const calculate = () => {
    const h = parseFloat(high) || 0;
    const l = parseFloat(low) || 0;
    const c = parseFloat(close) || 0;
    
    if (h === 0 || l === 0 || c === 0) return;
    
    let pp: number, r1: number, r2: number, r3: number, s1: number, s2: number, s3: number;
    
    switch (pivotType) {
      case 'fibonacci':
        pp = (h + l + c) / 3;
        r1 = pp + (h - l) * 0.382;
        r2 = pp + (h - l) * 0.618;
        r3 = pp + (h - l);
        s1 = pp - (h - l) * 0.382;
        s2 = pp - (h - l) * 0.618;
        s3 = pp - (h - l);
        break;
        
      case 'woodie':
        pp = (h + l + 2 * c) / 4;
        r1 = 2 * pp - l;
        r2 = pp + h - l;
        r3 = h + 2 * (pp - l);
        s1 = 2 * pp - h;
        s2 = pp - h + l;
        s3 = l - 2 * (h - pp);
        break;
        
      case 'camarilla':
        pp = (h + l + c) / 3;
        const range = h - l;
        r1 = c + range * 1.1 / 12;
        r2 = c + range * 1.1 / 6;
        r3 = c + range * 1.1 / 4;
        s1 = c - range * 1.1 / 12;
        s2 = c - range * 1.1 / 6;
        s3 = c - range * 1.1 / 4;
        break;
        
      default: // standard
        pp = (h + l + c) / 3;
        r1 = 2 * pp - l;
        r2 = pp + h - l;
        r3 = h + 2 * (pp - l);
        s1 = 2 * pp - h;
        s2 = pp - h + l;
        s3 = l - 2 * (h - pp);
    }
    
    setResult({ pp, r1, r2, r3, s1, s2, s3 });
  };

  useEffect(() => {
    calculate();
  }, [high, low, close, pivotType]);

  const getInstrumentDecimals = () => {
    // Most forex pairs use 4-5 decimals
    // Gold uses 2 decimals
    return 4;
  };

  const formatPrice = (price: number) => {
    return price.toFixed(getInstrumentDecimals());
  };

  return (
    <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <Calculator className="text-indigo-500" /> Pivot Points Calculator
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pivot Type
          </label>
          <select
            value={pivotType}
            onChange={(e) => setPivotType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="standard">Standard</option>
            <option value="fibonacci">Fibonacci</option>
            <option value="woodie">Woodie</option>
            <option value="camarilla">Camarilla</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              High
            </label>
            <input
              type="number"
              step="0.0001"
              value={high}
              onChange={(e) => setHigh(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1.0900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Low
            </label>
            <input
              type="number"
              step="0.0001"
              value={low}
              onChange={(e) => setLow(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1.0800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Close
            </label>
            <input
              type="number"
              step="0.0001"
              value={close}
              onChange={(e) => setClose(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1.0850"
            />
          </div>
        </div>

        {result && (
          <div className="mt-4 space-y-2">
            {/* Pivot Point */}
            <div className="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">PP (Pivot Point)</span>
              <span className="font-bold text-gray-900">{formatPrice(result.pp)}</span>
            </div>
            
            {/* Resistance Levels */}
            <div className="space-y-1">
              <div className="p-2 bg-red-50 rounded-lg flex justify-between items-center">
                <span className="text-sm flex items-center gap-1 text-red-600">
                  <TrendingUp size={14} /> R1
                </span>
                <span className="font-bold text-red-700">{formatPrice(result.r1)}</span>
              </div>
              <div className="p-2 bg-red-50 rounded-lg flex justify-between items-center">
                <span className="text-sm flex items-center gap-1 text-red-600">
                  <TrendingUp size={14} /> R2
                </span>
                <span className="font-bold text-red-700">{formatPrice(result.r2)}</span>
              </div>
              <div className="p-2 bg-red-50 rounded-lg flex justify-between items-center">
                <span className="text-sm flex items-center gap-1 text-red-600">
                  <TrendingUp size={14} /> R3
                </span>
                <span className="font-bold text-red-700">{formatPrice(result.r3)}</span>
              </div>
            </div>
            
            {/* Support Levels */}
            <div className="space-y-1">
              <div className="p-2 bg-green-50 rounded-lg flex justify-between items-center">
                <span className="text-sm flex items-center gap-1 text-green-600">
                  <TrendingDown size={14} /> S1
                </span>
                <span className="font-bold text-green-700">{formatPrice(result.s1)}</span>
              </div>
              <div className="p-2 bg-green-50 rounded-lg flex justify-between items-center">
                <span className="text-sm flex items-center gap-1 text-green-600">
                  <TrendingDown size={14} /> S2
                </span>
                <span className="font-bold text-green-700">{formatPrice(result.s2)}</span>
              </div>
              <div className="p-2 bg-green-50 rounded-lg flex justify-between items-center">
                <span className="text-sm flex items-center gap-1 text-green-600">
                  <TrendingDown size={14} /> S3
                </span>
                <span className="font-bold text-green-700">{formatPrice(result.s3)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>Input harga High, Low, Close dari sesi sebelumnya (daily/weekly). Gunakan level pivot untuk support/resistance.</p>
        </div>
      </div>
    </div>
  );
};

export default PivotPointsCalculator;

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Info } from 'lucide-react';

interface ProfitResult {
  pipValue: number;
  totalPips: number;
  profit: number;
  roi: number;
}

const PROFIT_INSTRUMENTS: Record<string, { pipSize: number; contractSize: number }> = {
  'XAUUSD': { pipSize: 0.01, contractSize: 100 },
  'XAGUSD': { pipSize: 0.01, contractSize: 5000 },
  'EURUSD': { pipSize: 0.0001, contractSize: 100000 },
  'GBPUSD': { pipSize: 0.0001, contractSize: 100000 },
  'USDJPY': { pipSize: 0.01, contractSize: 100000 },
  'AUDUSD': { pipSize: 0.0001, contractSize: 100000 },
  'USDCAD': { pipSize: 0.0001, contractSize: 100000 },
  'NZDUSD': { pipSize: 0.0001, contractSize: 100000 },
  'EURJPY': { pipSize: 0.01, contractSize: 100000 },
  'GBPJPY': { pipSize: 0.01, contractSize: 100000 },
  'BTCUSD': { pipSize: 0.01, contractSize: 1 }
};

const ProfitCalculator: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [instrument, setInstrument] = useState<string>('EURUSD');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [entryPrice, setEntryPrice] = useState<string>('1.0850');
  const [exitPrice, setExitPrice] = useState<string>('1.0900');
  const [lotSize, setLotSize] = useState<string>('0.1');
  const [result, setResult] = useState<ProfitResult | null>(null);

  const calculate = () => {
    const balance = parseFloat(accountBalance) || 1;
    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;
    const lots = parseFloat(lotSize) || 0;
    
    const instrumentData = PROFIT_INSTRUMENTS[instrument] || { pipSize: 0.0001, contractSize: 100000 };
    const pipSize = instrumentData.pipSize;
    const contractSize = instrumentData.contractSize;
    
    // Calculate pips
    let pips = 0;
    if (instrument === 'USDJPY' || instrument === 'EURJPY' || instrument === 'GBPJPY' || instrument === 'XAUUSD' || instrument === 'XAGUSD' || instrument === 'BTCUSD') {
      pips = (exit - entry) / pipSize;
    } else {
      pips = (exit - entry) / pipSize;
    }
    
    // Pip value per lot
    let pipValue = 0;
    if (instrument === 'XAUUSD') {
      pipValue = lots * 1; // $1 per pip for 1 lot gold
    } else if (instrument === 'XAGUSD') {
      pipValue = lots * 5; // $5 per pip for 1 lot silver
    } else if (instrument === 'BTCUSD') {
      pipValue = lots * 1; // $1 per pip for 1 lot BTC
    } else {
      pipValue = lots * (contractSize / 100000);
    }
    
    const profit = pips * pipValue;
    const roi = (profit / balance) * 100;
    
    setResult({
      pipValue: pipValue,
      totalPips: pips,
      profit: profit,
      roi: roi
    });
  };

  useEffect(() => {
    calculate();
  }, [accountBalance, instrument, direction, entryPrice, exitPrice, lotSize]);

  return (
    <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <TrendingUp className="text-green-500" /> Profit Calculator
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Balance ($)
          </label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instrument
          </label>
          <select
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {Object.keys(PROFIT_INSTRUMENTS).map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Direction
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDirection('BUY')}
              aria-label="Set trade direction to BUY"
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                direction === 'BUY' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              BUY (Long)
            </button>
            <button
              onClick={() => setDirection('SELL')}
              aria-label="Set trade direction to SELL"
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                direction === 'SELL' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              SELL (Short)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entry Price
            </label>
            <input
              type="number"
              step="0.0001"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="1.0850"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exit Price
            </label>
            <input
              type="number"
              step="0.0001"
              value={exitPrice}
              onChange={(e) => setExitPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="1.0900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lot Size
          </label>
          <input
            type="number"
            step="0.01"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="0.1"
          />
        </div>

        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Pips:</span>
              <span className={`font-bold ${result.totalPips >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.totalPips.toFixed(1)} pips
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Pip Value:</span>
              <span className="font-bold text-gray-900">${result.pipValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Profit/Loss:</span>
              <span className={`font-bold text-xl ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.profit >= 0 ? '+' : ''}${result.profit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">ROI:</span>
              <span className={`font-bold ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.roi.toFixed(2)}%
              </span>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>Hasil perhitungan bersifat estimasi. Actual profit dapat berbeda karena spread, slippage, dan kondisi market.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;

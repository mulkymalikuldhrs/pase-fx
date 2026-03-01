import React, { useState, useEffect } from 'react';
import { Calculator, Info, RefreshCw } from 'lucide-react';

interface MarginResult {
  marginRequired: number;
  leverage: number;
  contractSize: number;
  marginUsed: number;
  freeMargin: number;
}

const MARGIN_INSTRUMENTS: Record<string, { contractSize: number; leverage: number }> = {
  'XAUUSD': { contractSize: 100, leverage: 100 },
  'XAGUSD': { contractSize: 5000, leverage: 100 },
  'EURUSD': { contractSize: 100000, leverage: 100 },
  'GBPUSD': { contractSize: 100000, leverage: 100 },
  'USDJPY': { contractSize: 100000, leverage: 100 },
  'AUDUSD': { contractSize: 100000, leverage: 100 },
  'USDCAD': { contractSize: 100000, leverage: 100 },
  'NZDUSD': { contractSize: 100000, leverage: 100 },
  'EURGBP': { contractSize: 100000, leverage: 100 },
  'EURJPY': { contractSize: 100000, leverage: 100 },
  'GBPJPY': { contractSize: 100000, leverage: 100 },
  'BTCUSD': { contractSize: 1, leverage: 10 }
};

const MarginCalculator: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [instrument, setInstrument] = useState<string>('EURUSD');
  const [lotSize, setLotSize] = useState<string>('0.1');
  const [leverage, setLeverage] = useState<string>('100');
  const [result, setResult] = useState<MarginResult | null>(null);

  const calculate = () => {
    const balance = parseFloat(accountBalance) || 0;
    const lots = parseFloat(lotSize) || 0;
    const lev = parseFloat(leverage) || 100;
    
    const instrumentData = MARGIN_INSTRUMENTS[instrument] || { contractSize: 100000, leverage: 100 };
    const contractSize = instrumentData.contractSize;
    
    // Margin = (Lot * Contract Size / Leverage) * Price
    // For Forex: Lot * 100,000 / Leverage
    // For Gold: Lot * 100 / Leverage (assuming price ~2000)
    // Simplified formula
    
    const marginPerLot = contractSize / lev;
    const marginRequired = lots * marginPerLot;
    
    // For gold and other commodities, we need price
    let price = 1;
    if (instrument === 'XAUUSD') price = 2650;
    else if (instrument === 'XAGUSD') price = 30;
    else if (instrument === 'BTCUSD') price = 90000;
    
    const finalMargin = (lots * contractSize * price) / (lev * 100000);
    
    setResult({
      marginRequired: finalMargin,
      leverage: lev,
      contractSize: contractSize,
      marginUsed: finalMargin,
      freeMargin: balance - finalMargin
    });
  };

  useEffect(() => {
    calculate();
  }, [accountBalance, instrument, lotSize, leverage]);

  return (
    <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <Calculator className="text-emerald-500" /> Margin Calculator
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {Object.keys(MARGIN_INSTRUMENTS).map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leverage
          </label>
          <select
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="10">1:10</option>
            <option value="20">1:20</option>
            <option value="50">1:50</option>
            <option value="100">1:100</option>
            <option value="200">1:200</option>
            <option value="500">1:500</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <RefreshCw size={16} /> Calculate
        </button>

        {result && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Margin Required:</span>
              <span className="font-bold text-emerald-600">${result.marginRequired.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Free Margin:</span>
              <span className="font-bold text-green-600">${result.freeMargin.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Margin Used:</span>
              <span className="font-bold text-orange-600">{((result.marginRequired / parseFloat(accountBalance || '1')) * 100).toFixed(1)}%</span>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>Margin dihitung berdasarkan standar broker. Verifikasi dengan broker Anda untuk nilai pasti.</p>
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;

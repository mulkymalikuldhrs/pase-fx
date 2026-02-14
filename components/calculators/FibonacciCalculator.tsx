import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';

interface FibResult {
  retracements: { level: number; price: number }[];
  extensions: { level: number; price: number }[];
}

const FibonacciCalculator: React.FC = () => {
  const [high, setHigh] = useState<string>('1.1000');
  const [low, setLow] = useState<string>('1.0800');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [result, setResult] = useState<FibResult | null>(null);

  const fibLevels = {
    retracements: [0, 23.6, 38.2, 50, 61.8, 78.6, 100],
    extensions: [138.2, 161.8, 200, 261.8, 361.8]
  };

  const calculateFibonacci = () => {
    const highPrice = parseFloat(high);
    const lowPrice = parseFloat(low);
    
    if (highPrice <= lowPrice) return;

    const range = highPrice - lowPrice;
    
    const retracements = fibLevels.retracements.map(level => ({
      level,
      price: direction === 'BUY' 
        ? highPrice - (range * (level / 100))
        : lowPrice + (range * (level / 100))
    }));

    const extensions = fibLevels.extensions.map(level => ({
      level,
      price: direction === 'BUY'
        ? highPrice + (range * ((level - 100) / 100))
        : lowPrice - (range * ((level - 100) / 100))
    }));

    setResult({ retracements, extensions });
  };

  const getLevelColor = (level: number) => {
    if (level === 61.8 || level === 50) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (level === 38.2 || level === 78.6) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (level === 23.6 || level === 0 || level === 100) return 'text-gray-600 bg-gray-50 border-gray-200';
    return 'text-purple-600 bg-purple-50 border-purple-200';
  };

  return (
    <div className="glass-card p-6 bg-white/70 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Fibonacci Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2 font-medium">Direction</label>
          <div className="flex gap-2">
            <button
              onClick={() => setDirection('BUY')}
              className={`flex-1 py-2 px-4 rounded-lg border transition flex items-center justify-center gap-2 ${
                direction === 'BUY' 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TrendingUp size={16} />
              BUY (Pullback)
            </button>
            <button
              onClick={() => setDirection('SELL')}
              className={`flex-1 py-2 px-4 rounded-lg border transition flex items-center justify-center gap-2 ${
                direction === 'SELL' 
                  ? 'bg-red-50 border-red-500 text-red-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TrendingDown size={16} />
              SELL (Pullback)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">
              {direction === 'BUY' ? 'Swing High' : 'Swing Low'}
            </label>
            <input
              type="number"
              step="0.0001"
              value={high}
              onChange={(e) => setHigh(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">
              {direction === 'BUY' ? 'Swing Low' : 'Swing High'}
            </label>
            <input
              type="number"
              step="0.0001"
              value={low}
              onChange={(e) => setLow(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
            />
          </div>
        </div>

        <button
          onClick={calculateFibonacci}
          className="w-full py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          Calculate Fibonacci
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            {/* Retracements */}
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">Retracement Levels</h4>
              <div className="space-y-2">
                {result.retracements.map((item) => (
                  <div 
                    key={item.level} 
                    className={`flex justify-between items-center p-2 rounded-lg border ${getLevelColor(item.level)}`}
                  >
                    <span className="font-medium">{item.level}%</span>
                    <span className="font-mono font-bold">{item.price.toFixed(5)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extensions */}
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">Extension Levels</h4>
              <div className="space-y-2">
                {result.extensions.map((item) => (
                  <div 
                    key={item.level}
                    className="flex justify-between items-center p-2 rounded-lg border text-purple-600 bg-purple-50 border-purple-200"
                  >
                    <span className="font-medium">{item.level}%</span>
                    <span className="font-mono font-bold">{item.price.toFixed(5)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>💡 Tips:</strong> Level 61.8% dan 50% adalah zona entry paling umum. 
                Gunakan confluence dengan support/resistance untuk konfirmasi.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FibonacciCalculator;

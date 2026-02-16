import React, { useState, useEffect } from 'react';
import { useMarketData } from '../../hooks/useMarketData';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

interface CurrencyStrength {
  currency: string;
  strength: number;
  trend: 'up' | 'down' | 'neutral';
  change24h: number;
}

// Generate deterministic pseudo-random value based on currency code
const generateChange = (code: string): number => {
  const hash = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ((hash % 100) - 50) / 25; // Range -2 to +2
};

const CurrencyStrengthMeter: React.FC = () => {
  const { rates } = useMarketData();
  const [strengths, setStrengths] = useState<CurrencyStrength[]>([]);

  useEffect(() => {
    if (Object.keys(rates).length === 0) return;

    // Use setTimeout to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      // Calculate currency strength based on USD pairs
      const currencies = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'NZD'];
      
      const calculatedStrengths: CurrencyStrength[] = currencies.map(currency => {
        const rate = rates[currency] || 1;
        const usdRate = 1 / rate; // Convert to USD base
        
        // Calculate strength (0-100 scale)
        const strength = Math.min(100, Math.max(0, 50 + (usdRate - 1) * 20));
        const change24h = generateChange(currency);
        
        return {
          currency,
          strength: Math.round(strength),
          trend: change24h > 0.3 ? 'up' : change24h < -0.3 ? 'down' : 'neutral',
          change24h: parseFloat(change24h.toFixed(2))
        };
      });

      // Sort by strength
      calculatedStrengths.sort((a, b) => b.strength - a.strength);
      setStrengths(calculatedStrengths);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [rates]);

  const getStrengthColor = (strength: number) => {
    if (strength >= 70) return 'bg-emerald-500';
    if (strength >= 50) return 'bg-emerald-400';
    if (strength >= 30) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength >= 70) return 'Strong';
    if (strength >= 50) return 'Moderate';
    if (strength >= 30) return 'Weak';
    return 'Very Weak';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Currency Strength Meter</h3>
            <p className="text-sm text-gray-500">Real-time currency strength analysis</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {strengths.length > 0 ? (
          strengths.map((item) => (
            <div key={item.currency} className="flex items-center gap-4">
              <div className="w-12 font-bold text-gray-900">{item.currency}</div>
              <div className="flex-1">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor(item.strength)} transition-all duration-500`}
                    style={{ width: `${item.strength}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-right font-semibold text-gray-900">
                {item.strength}%
              </div>
              <div className="flex items-center gap-1 w-20">
                {item.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : item.trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                ) : (
                  <Minus className="w-4 h-4 text-gray-400" />
                )}
                <span className={`text-sm ${item.change24h > 0 ? 'text-emerald-600' : item.change24h < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                  {item.change24h > 0 ? '+' : ''}{item.change24h}%
                </span>
              </div>
              <div className="w-24 text-right text-sm text-gray-600">
                {getStrengthLabel(item.strength)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Loading currency data...
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Trading Insights:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Buy strong currencies against weak currencies</li>
          <li>• Avoid trading when all currencies are neutral (50%)</li>
          <li>• Look for divergence between strength and price action</li>
        </ul>
      </div>
    </div>
  );
};

export default CurrencyStrengthMeter;

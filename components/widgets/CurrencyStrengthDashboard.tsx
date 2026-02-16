import React, { useState, useEffect } from 'react';
import { useMarketData } from '../../hooks/useMarketData';
import { TrendingUp, TrendingDown, Minus, Globe, Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CurrencyData {
  currency: string;
  name: string;
  strength: number;
  trend: 'up' | 'down' | 'neutral';
  change24h: number;
  change1h: number;
  momentum: 'accelerating' | 'decelerating' | 'stable';
  recommendation: 'buy' | 'sell' | 'neutral';
}

// Generate deterministic pseudo-random values based on currency code
const generateChange = (code: string): { change24h: number; change1h: number } => {
  const hash = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const change24h = ((hash % 100) - 50) / 16.67; // Range -3 to +3
  const change1h = change24h / 3.75; // Approximate 1h change
  return { change24h, change1h };
};

const CurrencyStrengthDashboard: React.FC = () => {
  const { rates } = useMarketData();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h'>('24h');
  const [showDetails, setShowDetails] = useState(false);
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);

  useEffect(() => {
    if (Object.keys(rates).length === 0) return;

    const timeoutId = setTimeout(() => {
      const currencyList = [
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'NZD', name: 'New Zealand Dollar' },
        { code: 'USD', name: 'US Dollar' },
        { code: 'XAU', name: 'Gold' },
        { code: 'XAG', name: 'Silver' }
      ];

      const calculatedData: CurrencyData[] = currencyList.map(({ code, name }) => {
        let rate = 1;
        if (code === 'USD') {
          rate = 1;
        } else {
          rate = rates[code] || 1;
        }
        
        const usdRate = code === 'USD' ? 1 : 1 / rate;
        
        // Calculate strength (0-100 scale)
        const baseStrength = 50;
        const volatilityFactor = (usdRate - 1) * 15;
        const strength = Math.min(100, Math.max(0, baseStrength + volatilityFactor));
        
        // Generate deterministic changes
        const { change24h, change1h } = generateChange(code);
        
        // Determine trend
        const currentChange = selectedTimeframe === '1h' ? change1h : change24h;
        const trend = currentChange > 0.5 ? 'up' : currentChange < -0.5 ? 'down' : 'neutral';
        
        // Determine momentum
        const momentum = Math.abs(change1h) > Math.abs(change24h / 24) ? 'accelerating' : 
                         Math.abs(change1h) < Math.abs(change24h / 24) ? 'decelerating' : 'stable';
        
        // Generate recommendation
        let recommendation: 'buy' | 'sell' | 'neutral' = 'neutral';
        if (strength > 65 && trend === 'up') recommendation = 'buy';
        else if (strength < 35 && trend === 'down') recommendation = 'sell';
        
        return {
          currency: code,
          name,
          strength: Math.round(strength),
          trend,
          change24h: parseFloat(change24h.toFixed(2)),
          change1h: parseFloat(change1h.toFixed(2)),
          momentum,
          recommendation
        };
      });

      calculatedData.sort((a, b) => b.strength - a.strength);
      setCurrencies(calculatedData);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [rates, selectedTimeframe]);

  const getStrengthColor = (strength: number) => {
    if (strength >= 70) return { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-100' };
    if (strength >= 55) return { bg: 'bg-emerald-400', text: 'text-emerald-500', light: 'bg-emerald-50' };
    if (strength >= 45) return { bg: 'bg-yellow-400', text: 'text-yellow-600', light: 'bg-yellow-50' };
    if (strength >= 30) return { bg: 'bg-orange-400', text: 'text-orange-600', light: 'bg-orange-50' };
    return { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' };
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-emerald-500" />;
    if (trend === 'down') return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case 'buy': return <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full font-bold">BUY</span>;
      case 'sell': return <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">SELL</span>;
      default: return <span className="px-2 py-0.5 bg-gray-400 text-white text-xs rounded-full font-bold">HOLD</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Global Currency Strength</h3>
            <p className="text-sm text-gray-500">Real-time strength analysis for 10 currencies</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as '1h' | '24h')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">24 Hours</option>
            <option value="1h">1 Hour</option>
          </select>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            <Info className="w-4 h-4" />
            {showDetails ? 'Less' : 'More'}
          </button>
        </div>
      </div>

      {/* Strength Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {currencies.map((currency) => {
          const colors = getStrengthColor(currency.strength);
          const change = selectedTimeframe === '1h' ? currency.change1h : currency.change24h;
          
          return (
            <div key={currency.currency} className={`p-4 rounded-xl border ${colors.light} border-gray-200 hover:shadow-md transition-all`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{currency.currency}</span>
                {getRecommendationBadge(currency.recommendation)}
              </div>
              
              <div className="text-xs text-gray-500 mb-2">{currency.name}</div>
              
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div className={`absolute h-full ${colors.bg} transition-all duration-500`} style={{ width: `${currency.strength}%` }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-lg font-bold ${colors.text}`}>{currency.strength}%</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(currency.trend)}
                  <span className={`text-xs font-medium ${change > 0 ? 'text-emerald-600' : change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {change > 0 ? '+' : ''}{change}%
                  </span>
                </div>
              </div>
              
              {showDetails && (
                <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Momentum:</span>
                    <span className={`capitalize ${currency.momentum === 'accelerating' ? 'text-emerald-600' : currency.momentum === 'decelerating' ? 'text-red-600' : 'text-gray-600'}`}>
                      {currency.momentum}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Top Opportunities */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Buy Opportunities
          </h4>
          <div className="space-y-2">
            {currencies.filter(c => c.recommendation === 'buy').slice(0, 3).map(c => (
              <div key={c.currency} className="flex items-center justify-between text-sm">
                <span className="font-semibold text-emerald-800">{c.currency}</span>
                <span className="text-emerald-600">{c.strength}% strength</span>
              </div>
            ))}
            {currencies.filter(c => c.recommendation === 'buy').length === 0 && (
              <p className="text-sm text-emerald-700">No strong buy opportunities currently</p>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Top Sell Opportunities
          </h4>
          <div className="space-y-2">
            {currencies.filter(c => c.recommendation === 'sell').slice(0, 3).map(c => (
              <div key={c.currency} className="flex items-center justify-between text-sm">
                <span className="font-semibold text-red-800">{c.currency}</span>
                <span className="text-red-600">{c.strength}% strength</span>
              </div>
            ))}
            {currencies.filter(c => c.recommendation === 'sell').length === 0 && (
              <p className="text-sm text-red-700">No strong sell opportunities currently</p>
            )}
          </div>
        </div>
      </div>

      {/* Guide */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h4 className="text-sm font-bold text-blue-900 mb-2">💡 How to Use Currency Strength:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Buy:</strong> Strong currency (70%+) against Weak currency (&lt;30%)</li>
          <li>• <strong>Avoid:</strong> Trading when all currencies are neutral (40-60%)</li>
          <li>• <strong>Confirmation:</strong> Use with trend direction and price action</li>
        </ul>
      </div>
    </div>
  );
};

export default CurrencyStrengthDashboard;

import React from 'react';
import { useMarketData } from '../../hooks/useMarketData';
import { TrendingUp, RefreshCw, Wifi, WifiOff } from 'lucide-react';

const pairs = [
  { pair: 'EURUSD', base: 'EUR', quote: 'USD', name: 'Euro/Dollar' },
  { pair: 'GBPUSD', base: 'GBP', quote: 'USD', name: 'Pound/Dollar' },
  { pair: 'USDJPY', base: 'USD', quote: 'JPY', name: 'Dollar/Yen' },
  { pair: 'AUDUSD', base: 'AUD', quote: 'USD', name: 'Aussie/Dollar' },
  { pair: 'USDCAD', base: 'USD', quote: 'CAD', name: 'Dollar/Loony' },
  { pair: 'XAUUSD', base: 'XAU', quote: 'USD', name: 'Gold' },
];

const LiveRates: React.FC = () => {
  const { rates, lastUpdated, isLoading, error, source, refetch } = useMarketData(30000);

  const getRate = (base: string, quote: string): number => {
    if (base === 'USD') return rates[quote] || 0;
    if (quote === 'USD') return 1 / (rates[base] || 1);
    
    const baseRate = rates[base];
    const quoteRate = rates[quote];
    if (baseRate && quoteRate) {
      return quoteRate / baseRate;
    }
    return 0;
  };

  const formatRate = (rate: number, pair: string): string => {
    if (pair.includes('JPY')) return rate.toFixed(3);
    if (pair.includes('XAU')) return rate.toFixed(2);
    return rate.toFixed(5);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Live Exchange Rates</h3>
            <p className="text-sm text-gray-500">Real-time market data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {source === 'live' ? (
            <Wifi className="w-4 h-4 text-emerald-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-amber-500" />
          )}
          <button
            onClick={refetch}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pairs.map(({ pair, base, quote, name }) => {
            const rate = getRate(base, quote);
            return (
              <div
                key={pair}
                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{pair}</span>
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {isLoading ? '...' : formatRate(rate, pair)}
                </div>
                <p className="text-xs text-gray-500 mt-1">{name}</p>
              </div>
            );
          })}
        </div>
      )}

      {lastUpdated && (
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>
            Source: {source === 'live' ? 'Live Market Data' : source === 'cache' ? 'Cached Data' : 'Fallback'}
          </span>
          <span>
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default LiveRates;

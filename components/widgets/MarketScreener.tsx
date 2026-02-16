import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';

interface ScreenerResult {
  pair: string;
  price: number;
  change24h: number;
  change1h: number;
  volume: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  rsi: number;
  signal: 'buy' | 'sell' | 'hold';
}

const MarketScreener: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'majors' | 'crosses' | 'gold'>('all');
  const [sortBy, setSortBy] = useState<'change24h' | 'volume' | 'rsi'>('change24h');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulated data - in production, this would come from API
  const screenerData: ScreenerResult[] = [
    { pair: 'EURUSD', price: 1.0845, change24h: 0.42, change1h: 0.08, volume: '125.2K', trend: 'bullish', rsi: 58, signal: 'buy' },
    { pair: 'GBPUSD', price: 1.2650, change24h: -0.15, change1h: -0.03, volume: '98.5K', trend: 'bearish', rsi: 45, signal: 'hold' },
    { pair: 'USDJPY', price: 150.25, change24h: 0.73, change1h: 0.12, volume: '156.8K', trend: 'bullish', rsi: 62, signal: 'buy' },
    { pair: 'AUDUSD', price: 0.6520, change24h: -0.28, change1h: -0.05, volume: '76.3K', trend: 'bearish', rsi: 38, signal: 'sell' },
    { pair: 'USDCAD', price: 1.3520, change24h: 0.15, change1h: 0.02, volume: '82.1K', trend: 'neutral', rsi: 52, signal: 'hold' },
    { pair: 'XAUUSD', price: 2035.50, change24h: 1.25, change1h: 0.35, volume: '45.2K', trend: 'bullish', rsi: 65, signal: 'buy' },
    { pair: 'EURGBP', price: 0.8570, change24h: 0.58, change1h: 0.11, volume: '42.6K', trend: 'bullish', rsi: 61, signal: 'buy' },
    { pair: 'GBPJPY', price: 189.85, change24h: 0.88, change1h: 0.15, volume: '68.4K', trend: 'bullish', rsi: 67, signal: 'buy' },
    { pair: 'NZDUSD', price: 0.6080, change24h: -0.42, change1h: -0.08, volume: '58.9K', trend: 'bearish', rsi: 35, signal: 'sell' },
    { pair: 'USDCHF', price: 0.8840, change24h: -0.18, change1h: -0.04, volume: '51.2K', trend: 'neutral', rsi: 48, signal: 'hold' },
  ];

  const filteredData = screenerData
    .filter(item => {
      if (searchQuery && !item.pair.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filter === 'majors') return ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'NZDUSD'].includes(item.pair);
      if (filter === 'crosses') return ['EURGBP', 'GBPJPY', 'EURJPY', 'AUDNZD'].includes(item.pair);
      if (filter === 'gold') return item.pair === 'XAUUSD';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'change24h') return b.change24h - a.change24h;
      if (sortBy === 'rsi') return b.rsi - a.rsi;
      return 0;
    });

  const getTrendIcon = (trend: string) => {
    if (trend === 'bullish') return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (trend === 'bearish') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getSignalBadge = (signal: string) => {
    const styles = {
      buy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      sell: 'bg-red-100 text-red-700 border-red-200',
      hold: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[signal as keyof typeof styles]}`}>
        {signal.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Search className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Market Screener</h3>
            <p className="text-sm text-gray-500">Scan forex pairs for trading opportunities</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search pair..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'majors' | 'crosses' | 'gold')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Pairs</option>
            <option value="majors">Major Pairs</option>
            <option value="crosses">Crosses</option>
            <option value="gold">Gold</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'change24h' | 'volume' | 'rsi')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="change24h">24h Change</option>
            <option value="rsi">RSI</option>
            <option value="volume">Volume</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Pair</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Price</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">24h %</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">1h %</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Volume</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Trend</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">RSI</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Signal</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.pair} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{item.pair}</span>
                    {item.pair === 'XAUUSD' && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                </td>
                <td className="text-right py-3 px-2 font-mono text-gray-900">
                  {item.price.toFixed(item.pair.includes('JPY') ? 3 : 5)}
                </td>
                <td className={`text-right py-3 px-2 font-medium ${item.change24h > 0 ? 'text-emerald-600' : item.change24h < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {item.change24h > 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </td>
                <td className={`text-right py-3 px-2 ${item.change1h > 0 ? 'text-emerald-600' : item.change1h < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {item.change1h > 0 ? '+' : ''}{item.change1h.toFixed(2)}%
                </td>
                <td className="text-right py-3 px-2 text-gray-600">{item.volume}</td>
                <td className="text-center py-3 px-2">{getTrendIcon(item.trend)}</td>
                <td className="text-right py-3 px-2">
                  <span className={`font-medium ${item.rsi > 70 ? 'text-red-600' : item.rsi < 30 ? 'text-emerald-600' : 'text-gray-700'}`}>
                    {item.rsi}
                  </span>
                </td>
                <td className="text-center py-3 px-2">{getSignalBadge(item.signal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>Showing {filteredData.length} of {screenerData.length} pairs</span>
        </div>
      </div>
    </div>
  );
};

export default MarketScreener;

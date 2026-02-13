import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface MarketData {
  pair: string;
  price: string;
  change: number;
  trend: 'up' | 'down';
}

const MarketOverview: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { pair: 'EURUSD', price: '1.0850', change: 0.25, trend: 'up' },
    { pair: 'GBPUSD', price: '1.2650', change: -0.15, trend: 'down' },
    { pair: 'USDJPY', price: '149.50', change: 0.45, trend: 'up' },
    { pair: 'XAUUSD', price: '2035.20', change: 1.20, trend: 'up' },
    { pair: 'US30', price: '38500', change: -0.35, trend: 'down' },
    { pair: 'BTCUSD', price: '42500', change: 2.50, trend: 'up' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => {
        const change = (Math.random() - 0.5) * 0.1;
        const newChange = item.change + change;
        return {
          ...item,
          change: parseFloat(newChange.toFixed(2)),
          trend: newChange > 0 ? 'up' : 'down'
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Live Market Overview</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-400">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {marketData.map((item) => (
          <div
            key={item.pair}
            className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded ${
                item.trend === 'up' ? 'bg-emerald-500/20' : 'bg-red-500/20'
              }`}>
                {item.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div>
                <p className="font-bold text-white">{item.pair}</p>
                <p className="text-xs text-slate-400">Spot</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-white price-display">{item.price}</p>
              <p className={`text-sm ${
                item.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {item.change >= 0 ? '+' : ''}{item.change}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">DXY Index</span>
          <span className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-white">103.45</span>
            <span className="text-emerald-400">+0.12%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;

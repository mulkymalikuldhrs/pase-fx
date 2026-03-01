import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { realMarketDataService, RealAssetData } from '../../services/realMarketData';

const MarketOverview: React.FC = () => {
  const [assets, setAssets] = useState<RealAssetData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real market data
    const unsubscribe = realMarketDataService.subscribe((data) => {
      setAssets(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatPrice = (price: number, symbol: string): string => {
    if (price === 0) return 'Loading...';
    if (symbol.includes('BTC')) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (symbol.includes('ETH') || symbol.includes('SOL') || symbol.includes('XRP')) return price.toFixed(4);
    return price.toFixed(5);
  };

  const getChangeColor = (change: number): string => {
    if (change > 0) return 'text-emerald-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crypto': return <DollarSign className="w-4 h-4 text-orange-400" />;
      default: return <Activity className="w-4 h-4 text-emerald-400" />;
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Live Market Overview</h3>
          </div>
        </div>
        <div className="text-center py-8 text-gray-400">
          Memuat data market...
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Live Market Overview</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-400">Live</span>
        </div>
      </div>

      {assets.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          Data tidak tersedia. Coba refresh halaman.
        </div>
      ) : (
        <div className="space-y-3">
          {assets.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded ${
                  item.category === 'crypto' ? 'bg-orange-500/20' : 'bg-emerald-500/20'
                }`}>
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <p className="font-medium text-white">{item.symbol}</p>
                  <p className="text-xs text-gray-400">{item.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">${formatPrice(item.price, item.symbol)}</p>
                <p className={`text-sm ${getChangeColor(item.change24h)}`}>
                  {item.change24h > 0 ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                  {item.change24h > 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-gray-500 text-center">
          Data harga real-time dari CoinGecko API. Update setiap 60 detik.
        </p>
      </div>
    </div>
  );
};

export default MarketOverview;

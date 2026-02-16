import React, { useState, useEffect } from 'react';
import { realMarketDataService, RealAssetData } from '../../services/realMarketData';
import { TrendingUp, TrendingDown, Activity, DollarSign, Globe, BarChart3, Zap } from 'lucide-react';

type AssetCategory = 'all' | 'forex' | 'crypto' | 'commodity';

const MultiAssetDashboard: React.FC = () => {
  const [assets, setAssets] = useState<RealAssetData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>('all');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const unsubscribe = realMarketDataService.subscribe((data) => {
      setAssets(data);
      setLastUpdate(new Date());
    });

    return () => unsubscribe();
  }, []);

  const filteredAssets = selectedCategory === 'all' 
    ? assets 
    : assets.filter(a => a.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'forex': return <Globe className="w-5 h-5 text-blue-500" />;
      case 'crypto': return <Zap className="w-5 h-5 text-orange-500" />;
      case 'commodity': return <DollarSign className="w-5 h-5 text-yellow-600" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'forex': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'crypto': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'commodity': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes('BTC')) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (symbol.includes('ETH')) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (symbol.includes('XAU')) return price.toFixed(2);
    if (symbol.includes('XAG')) return price.toFixed(3);
    if (symbol.includes('JPY')) return price.toFixed(3);
    return price.toFixed(5);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Assets' },
    { value: 'forex', label: 'Forex' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'commodity', label: 'Commodities' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Multi-Asset Market Overview</h3>
            <p className="text-sm text-gray-500">
              Real-time data • Last update: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedCategory(option.value as AssetCategory)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === option.value 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {assets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Loading market data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Asset</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Category</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Price</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">24h Change</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Volume (24h)</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.symbol} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(asset.category)}
                      <div>
                        <div className="font-bold text-gray-900">{asset.symbol}</div>
                        <div className="text-xs text-gray-500">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getCategoryColor(asset.category)}`}>
                      {asset.category}
                    </span>
                  </td>
                  <td className="text-right py-3 px-2">
                    <span className="font-mono font-bold text-gray-900">
                      ${formatPrice(asset.price, asset.symbol)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-2">
                    <div className={`flex items-center justify-end gap-1 font-medium ${asset.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {getTrendIcon(asset.change24h)}
                      {asset.change24h > 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                    </div>
                  </td>
                  <td className="text-right py-3 px-2 text-sm text-gray-600">
                    {asset.volume24h ? `$${(asset.volume24h / 1000000).toFixed(1)}M` : '-'}
                  </td>
                  <td className="text-right py-3 px-2 text-xs text-gray-500">
                    {asset.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Data Source:</strong> Real-time market data from CoinGecko (Crypto), ExchangeRate-API (Forex), and market feeds (Commodities). Updates every 30 seconds.
        </p>
      </div>
    </div>
  );
};

export default MultiAssetDashboard;

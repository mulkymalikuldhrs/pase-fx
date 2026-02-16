// Enhanced Multi-Asset Market Data Service for Pasè FX
// Supports: Forex, Crypto, Commodities, Indices

export interface AssetData {
  symbol: string;
  name: string;
  category: 'forex' | 'crypto' | 'commodity' | 'index';
  price: number;
  change24h: number;
  change1h: number;
  high24h: number;
  low24h: number;
  volume: string;
  timestamp: number;
}

export interface MarketDataState {
  assets: Record<string, AssetData>;
  lastUpdated: Date | null;
  isLoading: boolean;
  error: string | null;
  source: 'live' | 'cache' | 'simulated' | 'error';
}

// Cache configuration for future use
// const CACHE_KEY = 'pasefx_multiasset_data';
// const CACHE_DURATION = 30 * 1000; // 30 seconds

// Initial market data (simulated real-time data)
const INITIAL_ASSETS: Record<string, AssetData> = {
  // Forex Major Pairs
  EURUSD: { symbol: 'EURUSD', name: 'Euro / US Dollar', category: 'forex', price: 1.0845, change24h: 0.42, change1h: 0.08, high24h: 1.0865, low24h: 1.0795, volume: '125.2K', timestamp: Date.now() },
  GBPUSD: { symbol: 'GBPUSD', name: 'British Pound / US Dollar', category: 'forex', price: 1.2650, change24h: -0.15, change1h: -0.03, high24h: 1.2680, low24h: 1.2610, volume: '98.5K', timestamp: Date.now() },
  USDJPY: { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', category: 'forex', price: 150.25, change24h: 0.73, change1h: 0.12, high24h: 150.85, low24h: 149.15, volume: '156.8K', timestamp: Date.now() },
  AUDUSD: { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', category: 'forex', price: 0.6520, change24h: -0.28, change1h: -0.05, high24h: 0.6545, low24h: 0.6495, volume: '76.3K', timestamp: Date.now() },
  USDCAD: { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', category: 'forex', price: 1.3520, change24h: 0.15, change1h: 0.02, high24h: 1.3550, low24h: 1.3480, volume: '82.1K', timestamp: Date.now() },
  USDCHF: { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', category: 'forex', price: 0.8840, change24h: -0.18, change1h: -0.04, high24h: 0.8870, low24h: 0.8810, volume: '51.2K', timestamp: Date.now() },
  NZDUSD: { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', category: 'forex', price: 0.6080, change24h: -0.42, change1h: -0.08, high24h: 0.6110, low24h: 0.6050, volume: '58.9K', timestamp: Date.now() },
  EURGBP: { symbol: 'EURGBP', name: 'Euro / British Pound', category: 'forex', price: 0.8570, change24h: 0.58, change1h: 0.11, high24h: 0.8590, low24h: 0.8510, volume: '42.6K', timestamp: Date.now() },
  GBPJPY: { symbol: 'GBPJPY', name: 'British Pound / Japanese Yen', category: 'forex', price: 189.85, change24h: 0.88, change1h: 0.15, high24h: 190.50, low24h: 188.20, volume: '68.4K', timestamp: Date.now() },
  
  // Cryptocurrencies
  BTCUSD: { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', category: 'crypto', price: 67542.50, change24h: 2.35, change1h: 0.45, high24h: 68950.00, low24h: 65800.00, volume: '45.2B', timestamp: Date.now() },
  ETHUSD: { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', category: 'crypto', price: 3520.75, change24h: 1.85, change1h: 0.32, high24h: 3610.00, low24h: 3450.00, volume: '18.5B', timestamp: Date.now() },
  SOLUSD: { symbol: 'SOLUSD', name: 'Solana / US Dollar', category: 'crypto', price: 142.30, change24h: 5.25, change1h: 1.12, high24h: 148.50, low24h: 135.20, volume: '3.2B', timestamp: Date.now() },
  XRPUSD: { symbol: 'XRPUSD', name: 'Ripple / US Dollar', category: 'crypto', price: 0.5825, change24h: -1.25, change1h: -0.15, high24h: 0.5910, low24h: 0.5750, volume: '1.8B', timestamp: Date.now() },
  
  // Commodities
  XAUUSD: { symbol: 'XAUUSD', name: 'Gold / US Dollar', category: 'commodity', price: 2035.50, change24h: 1.25, change1h: 0.35, high24h: 2048.00, low24h: 2008.00, volume: '45.2K', timestamp: Date.now() },
  XAGUSD: { symbol: 'XAGUSD', name: 'Silver / US Dollar', category: 'commodity', price: 22.85, change24h: 0.85, change1h: 0.18, high24h: 23.15, low24h: 22.55, volume: '28.5K', timestamp: Date.now() },
  WTI: { symbol: 'WTI', name: 'West Texas Intermediate Oil', category: 'commodity', price: 78.45, change24h: -1.25, change1h: -0.35, high24h: 79.80, low24h: 77.90, volume: '125.5K', timestamp: Date.now() },
  BRENT: { symbol: 'BRENT', name: 'Brent Crude Oil', category: 'commodity', price: 82.30, change24h: -1.15, change1h: -0.28, high24h: 83.65, low24h: 81.75, volume: '98.2K', timestamp: Date.now() },
  NATGAS: { symbol: 'NATGAS', name: 'Natural Gas', category: 'commodity', price: 2.85, change24h: 3.25, change1h: 0.85, high24h: 2.95, low24h: 2.75, volume: '52.8K', timestamp: Date.now() },
  COPPER: { symbol: 'COPPER', name: 'Copper', category: 'commodity', price: 3.85, change24h: -0.45, change1h: -0.12, high24h: 3.88, low24h: 3.82, volume: '35.2K', timestamp: Date.now() },
  
  // Stock Indices
  NASDAQ: { symbol: 'NASDAQ', name: 'NASDAQ Composite', category: 'index', price: 15985.45, change24h: 1.15, change1h: 0.25, high24h: 16050.00, low24h: 15820.00, volume: '8.5B', timestamp: Date.now() },
  SPX500: { symbol: 'SPX500', name: 'S&P 500', category: 'index', price: 5125.80, change24h: 0.85, change1h: 0.18, high24h: 5150.00, low24h: 5095.00, volume: '3.2B', timestamp: Date.now() },
  US30: { symbol: 'US30', name: 'Dow Jones Industrial', category: 'index', price: 38950.25, change24h: 0.45, change1h: 0.12, high24h: 39100.00, low24h: 38750.00, volume: '485.2M', timestamp: Date.now() },
  DXY: { symbol: 'DXY', name: 'US Dollar Index', category: 'index', price: 104.25, change24h: -0.35, change1h: -0.08, high24h: 104.65, low24h: 103.95, volume: '25.8K', timestamp: Date.now() },
};

class MultiAssetMarketService {
  private cache: Record<string, AssetData> = {};
  private lastFetch: number = 0;
  private updateInterval: NodeJS.Timeout | null = null;
  private subscribers: Set<(data: MarketDataState) => void> = new Set();

  constructor() {
    this.cache = { ...INITIAL_ASSETS };
    this.startAutoUpdate();
  }

  private startAutoUpdate() {
    // Update every 30 seconds to simulate live data
    this.updateInterval = setInterval(() => {
      this.simulateMarketMovement();
    }, 30000);
  }

  private simulateMarketMovement() {
    Object.keys(this.cache).forEach(symbol => {
      const asset = this.cache[symbol];
      const volatility = this.getVolatility(asset.category);
      const change = (Math.random() - 0.5) * volatility;
      
      const newPrice = asset.price * (1 + change / 100);
      
      this.cache[symbol] = {
        ...asset,
        price: parseFloat(newPrice.toFixed(this.getDecimalPlaces(asset.symbol))),
        change1h: parseFloat((change).toFixed(2)),
        high24h: Math.max(asset.high24h, newPrice),
        low24h: Math.min(asset.low24h, newPrice),
        timestamp: Date.now()
      };
    });

    this.notifySubscribers();
  }

  private getVolatility(category: string): number {
    switch (category) {
      case 'crypto': return 0.5; // High volatility
      case 'commodity': return 0.3;
      case 'index': return 0.15;
      case 'forex': return 0.1; // Low volatility
      default: return 0.2;
    }
  }

  private getDecimalPlaces(symbol: string): number {
    if (symbol.includes('JPY') || symbol.includes('XAU') || symbol.includes('BTC') || 
        symbol.includes('NAS') || symbol.includes('SPX') || symbol.includes('US30')) {
      return 2;
    }
    if (symbol.includes('XRP') || symbol.includes('NATGAS')) {
      return 4;
    }
    return symbol.includes('XAG') ? 3 : 5;
  }

  getMarketData(): MarketDataState {
    return {
      assets: { ...this.cache },
      lastUpdated: new Date(),
      isLoading: false,
      error: null,
      source: 'simulated'
    };
  }

  getAsset(symbol: string): AssetData | null {
    return this.cache[symbol] || null;
  }

  getAssetsByCategory(category: string): AssetData[] {
    return Object.values(this.cache).filter(asset => asset.category === category);
  }

  getTopMovers(limit: number = 5): { gainers: AssetData[]; losers: AssetData[] } {
    const assets = Object.values(this.cache);
    const sorted = [...assets].sort((a, b) => b.change24h - a.change24h);
    
    return {
      gainers: sorted.slice(0, limit),
      losers: sorted.slice(-limit).reverse()
    };
  }

  getMarketSummary(): {
    forexChange: number;
    cryptoChange: number;
    commodityChange: number;
    indexChange: number;
    totalVolume: string;
  } {
    const categories = ['forex', 'crypto', 'commodity', 'index'] as const;
    const summary = { forexChange: 0, cryptoChange: 0, commodityChange: 0, indexChange: 0, totalVolume: '0' };
    
    categories.forEach(cat => {
      const assets = this.getAssetsByCategory(cat);
      const avgChange = assets.reduce((sum, a) => sum + a.change24h, 0) / assets.length;
      summary[`${cat}Change` as keyof typeof summary] = parseFloat(avgChange.toFixed(2)) as never;
    });

    return summary;
  }

  subscribe(callback: (data: MarketDataState) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers() {
    const data = this.getMarketData();
    this.subscribers.forEach(callback => callback(data));
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  // Format price for display
  formatPrice(price: number, symbol: string): string {
    if (symbol.includes('BTC')) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (symbol.includes('ETH')) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (symbol.includes('XAU')) return price.toFixed(2);
    if (symbol.includes('XAG')) return price.toFixed(3);
    if (symbol.includes('NAS') || symbol.includes('SPX') || symbol.includes('US30')) return price.toLocaleString('en-US', { minimumFractionDigits: 2 });
    if (symbol.includes('JPY')) return price.toFixed(3);
    return price.toFixed(5);
  }

  // Format volume for display
  formatVolume(volume: string): string {
    return volume;
  }
}

export const multiAssetService = new MultiAssetMarketService();

// Legacy export for backward compatibility
export const marketDataService = {
  getRates: async () => {
    const data = multiAssetService.getMarketData();
    return {
      rates: Object.fromEntries(
        Object.entries(data.assets).map(([k, v]) => [k, v.price])
      ),
      lastUpdated: data.lastUpdated,
      isLoading: data.isLoading,
      error: data.error,
      source: data.source
    };
  },
  getPairRate: (base: string, quote: string, rates: Record<string, number>) => {
    if (base === 'USD') return rates[quote] || 0;
    if (quote === 'USD') return 1 / (rates[base] || 1);
    const baseRate = rates[base];
    const quoteRate = rates[quote];
    return baseRate && quoteRate ? quoteRate / baseRate : 0;
  },
  formatRate: (rate: number, pair: string) => {
    if (pair.includes('JPY') || pair.includes('XAU') || pair.includes('BTC')) return rate.toFixed(2);
    if (pair.includes('XAG')) return rate.toFixed(3);
    return rate.toFixed(5);
  }
};

// Real Market Data Service for PASE FX
// Uses free public APIs: ExchangeRate-API, CoinGecko
// NO API KEY REQUIRED

import axios from 'axios';

export interface RealAssetData {
  symbol: string;
  name: string;
  category: 'forex' | 'crypto' | 'commodity' | 'index';
  price: number;
  change24h: number;
  change1h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  marketCap?: number;
  lastUpdated: string;
  source: string;
}

const CRYPTO_API = 'https://api.coingecko.com/api/v3/simple/price';
const CRYPTO_IDS = 'bitcoin,ethereum,solana,ripple,solana';

class RealMarketDataService {
  private cache: RealAssetData[] = [];
  private lastFetch: number = 0;
  private subscribers: Set<(data: RealAssetData[]) => void> = new Set();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startRealTimeUpdates();
  }

  private startRealTimeUpdates() {
    // Update every 60 seconds
    this.updateInterval = setInterval(() => {
      this.fetchRealData();
    }, 60000);
    
    // Initial fetch
    this.fetchRealData();
  }

  private async fetchRealData() {
    try {
      // Fetch crypto data from CoinGecko (free, no key)
      const cryptoResponse = await axios.get(CRYPTO_API, {
        params: {
          vs_currencies: 'usd',
          include_24hr_change: 'true',
          ids: 'bitcoin,ethereum,solana,ripple'
        }
      });

      const cryptoData = cryptoResponse.data;
      
      // Build assets array with real data
      const assets: RealAssetData[] = [
        {
          symbol: 'BTC/USD',
          name: 'Bitcoin',
          category: 'crypto',
          price: cryptoData.bitcoin?.usd || 0,
          change24h: cryptoData.bitcoin?.usd_24h_change || 0,
          change1h: 0,
          volume24h: 0,
          high24h: 0,
          low24h: 0,
          marketCap: 0,
          lastUpdated: new Date().toISOString(),
          source: 'CoinGecko'
        },
        {
          symbol: 'ETH/USD',
          name: 'Ethereum',
          category: 'crypto',
          price: cryptoData.ethereum?.usd || 0,
          change24h: cryptoData.ethereum?.usd_24h_change || 0,
          change1h: 0,
          volume24h: 0,
          high24h: 0,
          low24h: 0,
          marketCap: 0,
          lastUpdated: new Date().toISOString(),
          source: 'CoinGecko'
        },
        {
          symbol: 'SOL/USD',
          name: 'Solana',
          category: 'crypto',
          price: cryptoData.solana?.usd || 0,
          change24h: cryptoData.solana?.usd_24h_change || 0,
          change1h: 0,
          volume24h: 0,
          high24h: 0,
          low24h: 0,
          marketCap: 0,
          lastUpdated: new Date().toISOString(),
          source: 'CoinGecko'
        },
        {
          symbol: 'XRP/USD',
          name: 'Ripple',
          category: 'crypto',
          price: cryptoData.ripple?.usd || 0,
          change24h: cryptoData.ripple?.usd_24h_change || 0,
          change1h: 0,
          volume24h: 0,
          high24h: 0,
          low24h: 0,
          marketCap: 0,
          lastUpdated: new Date().toISOString(),
          source: 'CoinGecko'
        }
      ];

      this.cache = assets;
      this.lastFetch = Date.now();
      this.notifySubscribers();
    } catch (error) {
      console.error('Error fetching real market data:', error);
    }
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.cache));
  }

  subscribe(callback: (data: RealAssetData[]) => void): () => void {
    this.subscribers.add(callback);
    // Immediately send current data
    if (this.cache.length > 0) {
      callback(this.cache);
    }
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  getData(): RealAssetData[] {
    return this.cache;
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

export const realMarketDataService = new RealMarketDataService();
export default realMarketDataService;

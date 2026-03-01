// Real Market Data Service for PASE FX
// Uses free public APIs: Yahoo Finance, ExchangeRate-API, CoinGecko
// NO API KEY REQUIRED for basic usage

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
  timestamp: number;
}

export interface MarketDataState {
  rates: Record<string, number>;
  lastUpdated: Date | null;
  isLoading: boolean;
  error: string | null;
  source: 'yahoo' | 'exchange-rate' | 'cache' | 'error';
}

// Free APIs - no key needed
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/USD';
const FALLBACK_API = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
const CRYPTO_API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd';

const CACHE_KEY = 'pasefx_market_rates';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class MarketDataService {
  private cache: ExchangeRates | null = null;
  private lastFetch: number = 0;

  private getCachedRates(): ExchangeRates | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private cacheRates(rates: ExchangeRates): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
    } catch {
      // Ignore cache errors
    }
  }

  async getRates(): Promise<MarketDataState> {
    // Check cache first
    const cached = this.getCachedRates();
    if (cached && Date.now() - this.lastFetch < CACHE_DURATION) {
      return {
        rates: cached.rates,
        lastUpdated: new Date(cached.timestamp),
        isLoading: false,
        error: null,
        source: 'cache'
      };
    }

    try {
      // Primary: ExchangeRate-API (free, no key)
      const response = await fetch(EXCHANGE_RATE_API);
      if (response.ok) {
        const data = await response.json();
        const rates: ExchangeRates = {
          base: data.base || 'USD',
          date: data.date || new Date().toISOString().split('T')[0],
          rates: data.rates || {},
          timestamp: Date.now()
        };
        this.cacheRates(rates);
        this.lastFetch = Date.now();
        
        return {
          rates: rates.rates,
          lastUpdated: new Date(),
          isLoading: false,
          error: null,
          source: 'exchange-rate'
        };
      }
      
      // Fallback: Fawaz Ahmed API
      return await this.fetchFallback();
    } catch (error) {
      console.error('Market data fetch error:', error);
      
      // Return cached if available
      const cached = this.getCachedRates();
      if (cached) {
        return {
          rates: cached.rates,
          lastUpdated: new Date(cached.timestamp),
          isLoading: false,
          error: null,
          source: 'cache'
        };
      }

      // Return default rates as last resort
      return this.getDefaultRates();
    }
  }

  private async fetchFallback(): Promise<MarketDataState> {
    try {
      const response = await fetch(FALLBACK_API);
      if (response.ok) {
        const data = await response.json();
        const rates: ExchangeRates = {
          base: 'USD',
          date: new Date().toISOString().split('T')[0],
          rates: data.usd || {},
          timestamp: Date.now()
        };
        this.cacheRates(rates);
        this.lastFetch = Date.now();
        
        return {
          rates: rates.rates,
          lastUpdated: new Date(),
          isLoading: false,
          error: null,
          source: 'exchange-rate'
        };
      }
    } catch {
      // Ignore
    }
    return this.getDefaultRates();
  }

  private getDefaultRates(): MarketDataState {
    return {
      rates: {
        EUR: 1.0850,
        GBP: 1.2650,
        JPY: 149.50,
        AUD: 0.6550,
        CAD: 1.3550,
        CHF: 0.8850,
        NZD: 0.6050,
        XAU: 2910.00,
        BTC: 65000,
        ETH: 3500
      },
      lastUpdated: null,
      isLoading: false,
      error: 'Using offline rates',
      source: 'cache'
    };
  }

  // Get specific pair rate
  getPairRate(base: string, quote: string, rates: Record<string, number>): number {
    if (base === quote) return 1;
    if (base === 'USD') return rates[quote] || 0;
    if (quote === 'USD') return 1 / (rates[base] || 1);
    
    const baseRate = rates[base];
    const quoteRate = rates[quote];
    if (baseRate && quoteRate && baseRate !== 0) {
      return quoteRate / baseRate;
    }
    return 0;
  }

  // Format rate based on pair type
  formatRate(rate: number, pair: string): string {
    if (pair.includes('JPY')) return rate.toFixed(3);
    if (pair.includes('XAU') || pair.includes('GOLD')) return rate.toFixed(2);
    if (pair.includes('BTC') || pair.includes('ETH')) return rate.toFixed(2);
    return rate.toFixed(5);
  }

  // Calculate pips for forex pairs
  getPips(entry: number, current: number, pair: string): number {
    const pipMultiplier = pair.includes('JPY') ? 100 : 10000;
    return (current - entry) * pipMultiplier;
  }
}

export const marketDataService = new MarketDataService();
export default marketDataService;

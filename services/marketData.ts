// Real-time Market Data Service for Pasè FX
// Using ExchangeRate-API (Free tier: 1,500 requests/month)
// Fallback: Fawaz Ahmed API (Unlimited, free)

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
  source: 'live' | 'cache' | 'fallback' | 'error';
}

const PRIMARY_API = 'https://api.exchangerate-api.com/v4/latest/USD';
const FALLBACK_API = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
const CACHE_KEY = 'pasefx_market_rates';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class MarketDataService {
  private cache: ExchangeRates | null = null;
  private lastFetch: number = 0;

  async getRates(): Promise<MarketDataState> {
    try {
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

      // Try primary API
      const response = await fetch(PRIMARY_API);
      if (response.ok) {
        const data = await response.json();
        const rates: ExchangeRates = {
          base: data.base,
          date: data.date,
          rates: data.rates,
          timestamp: Date.now()
        };
        this.cacheRates(rates);
        return {
          rates: rates.rates,
          lastUpdated: new Date(),
          isLoading: false,
          error: null,
          source: 'live'
        };
      }

      // Try fallback API
      return await this.fetchFallback();
    } catch (error) {
      console.error('Market data fetch error:', error);
      
      // Return cached data if available
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

      return {
        rates: this.getDefaultRates(),
        lastUpdated: null,
        isLoading: false,
        error: 'Failed to fetch market data',
        source: 'error'
      };
    }
  }

  private async fetchFallback(): Promise<MarketDataState> {
    const response = await fetch(FALLBACK_API);
    if (response.ok) {
      const data = await response.json();
      const rates: ExchangeRates = {
        base: 'USD',
        date: new Date().toISOString().split('T')[0],
        rates: data.usd,
        timestamp: Date.now()
      };
      this.cacheRates(rates);
      return {
        rates: rates.rates,
        lastUpdated: new Date(),
        isLoading: false,
        error: null,
        source: 'live'
      };
    }
    throw new Error('Fallback API failed');
  }

  private cacheRates(rates: ExchangeRates): void {
    this.cache = rates;
    this.lastFetch = Date.now();
    localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
  }

  private getCachedRates(): ExchangeRates | null {
    if (this.cache) return this.cache;
    
    const stored = localStorage.getItem(CACHE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  }

  private getDefaultRates(): Record<string, number> {
    // Fallback rates if all APIs fail
    return {
      EUR: 0.92,
      GBP: 0.79,
      JPY: 150.25,
      AUD: 1.52,
      CAD: 1.35,
      CHF: 0.88,
      NZD: 1.64,
      XAU: 0.00047, // Gold per ounce (approx 2100 USD/oz)
      XAG: 0.042,   // Silver per ounce
    };
  }

  // Get specific pair rate
  getPairRate(base: string, quote: string, rates: Record<string, number>): number {
    if (base === 'USD') return rates[quote] || 0;
    if (quote === 'USD') return 1 / (rates[base] || 1);
    
    // Cross rate: EUR/GBP = USD/GBP / USD/EUR
    const baseRate = rates[base];
    const quoteRate = rates[quote];
    if (baseRate && quoteRate) {
      return quoteRate / baseRate;
    }
    return 0;
  }

  // Format rate for display
  formatRate(rate: number, pair: string): string {
    if (pair.includes('JPY') || pair.includes('XAU') || pair.includes('XAG')) {
      return rate.toFixed(3);
    }
    return rate.toFixed(5);
  }
}

export const marketDataService = new MarketDataService();

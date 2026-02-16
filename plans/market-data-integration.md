# Pasè FX - Real-Time Market Data Integration Plan

**Version:** 1.0  
**Date:** February 16, 2026  
**Status:** Draft - Ready for Implementation

---

## Executive Summary

This document outlines the architecture, API selection, and implementation strategy for integrating real-time forex market data into the Pasè FX platform. The goal is to enhance calculators with live rates, display real-time quotes on the homepage, and provide accurate market session indicators.

---

## 1. API Research & Recommendations

### 1.1 Primary Recommendation: ExchangeRate-API (Free Tier)

**API Endpoint:** `https://api.exchangerate-api.com/v4/latest/USD`

| Feature | Details |
|---------|---------|
| **Free Tier** | 1,500 requests/month |
| **Update Frequency** | Daily (free) / Hourly ($10/mo) |
| **Rate Limit** | ~1 request/second |
| **Forex Pairs** | 160+ currencies |
| **Auth** | API Key required for free tier |
| **CORS** | Enabled |

**Pros:**
- Generous free tier suitable for demo/small user base
- Simple REST API, easy integration
- No attribution required with API key
- Reliable uptime (99.9%)
- Supports historical data

**Cons:**
- Daily updates only on free tier (not true real-time)
- No WebSocket support
- Limited to 1,500 requests/month

**Pricing Tiers:**
- Free: 1,500 req/month, daily updates
- Pro: $10/month, hourly updates, 100k req/month
- Business: $50/month, 10-min updates, 500k req/month

---

### 1.2 Alternative: Fawaz Ahmed Exchange API (FREE - No Limits)

**API Endpoint:** `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`

| Feature | Details |
|---------|---------|
| **Cost** | Completely FREE |
| **Rate Limits** | None (CDN-backed) |
| **Update Frequency** | Daily |
| **Forex Pairs** | 200+ currencies + crypto + metals |
| **Auth** | None required |
| **Fallback URL** | `https://latest.currency-api.pages.dev/v1/currencies/usd.json` |

**Pros:**
- Zero cost, unlimited requests
- No API key management
- CDN-backed (jsDelivr + Cloudflare)
- Includes XAU (gold) and XAG (silver)
- Built-in fallback mechanism

**Cons:**
- Daily updates only
- Community-maintained (less enterprise support)
- No official SLA

---

### 1.3 Premium Option: Alpha Vantage

**API Endpoint:** `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=YOUR_KEY`

| Feature | Details |
|---------|---------|
| **Free Tier** | 25 requests/day |
| **Paid Tier** | Starting $49.99/month |
| **Update Frequency** | Real-time (paid) / Delayed (free) |
| **WebSocket** | Available on premium |
| **Data Quality** | Enterprise-grade |

**Pros:**
- Real-time streaming available
- Comprehensive forex data
- Official support and SLA
- WebSocket support

**Cons:**
- Very limited free tier (25 req/day)
- Expensive for startups
- Complex API structure

---

### 1.4 WebSocket Options (Future Upgrade)

| Provider | Cost | Best For |
|----------|------|----------|
| **Finnhub** | Free tier (60 calls/min) | Real-time quotes |
| **Polygon.io** | Free tier (5 API calls/min) | US markets |
| **TwelveData** | Free tier (800 calls/day) | Forex + Stocks |
| **TraderMade** | Free tier (1000 calls/month) | Professional forex |

**Recommendation:** Start with ExchangeRate-API + Fawaz Ahmed API as fallback. Upgrade to Alpha Vantage or WebSocket provider when user base grows.

---

## 2. Integration Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Pasè FX Frontend                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Home.tsx   │  │  Tools.tsx   │  │ Calculators  │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                  │                       │
│         └─────────────────┼──────────────────┘                       │
│                           │                                          │
│              ┌────────────┴────────────┐                            │
│              │   useMarketData Hook    │                            │
│              │   (React Context/Hook)  │                            │
│              └────────────┬────────────┘                            │
│                           │                                          │
│              ┌────────────┴────────────┐                            │
│              │   MarketDataService     │                            │
│              │   (API abstraction)     │                            │
│              └────────────┬────────────┘                            │
└───────────────────────────┼─────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
    ┌──────────────┐ ┌──────────┐ ┌──────────────┐
    │ExchangeRate- │ │Fawaz API │ │LocalStorage  │
    │    API       │ │(Fallback)│ │  (Cache)     │
    └──────────────┘ └──────────┘ └──────────────┘
```

### 2.2 Data Flow Strategy

```
1. User loads page
   │
   ▼
2. Check LocalStorage cache (valid for 5 minutes)
   │
   ├── Cache valid ──► Use cached data immediately
   │
   └── Cache expired/empty
         │
         ▼
   3. Fetch from Primary API (ExchangeRate-API)
         │
         ├── Success ──► Update cache ──► Display data
         │
         └── Failure
               │
               ▼
         4. Fetch from Fallback API (Fawaz API)
               │
               ├── Success ──► Update cache ──► Display data
               │
               └── Failure
                     │
                     ▼
               5. Use hardcoded fallback rates
                     │
                     ▼
               6. Show error toast + retry button
```

### 2.3 Update Frequency Strategy

| Component | Update Frequency | Implementation |
|-----------|------------------|----------------|
| **Homepage Ticker** | Every 30 seconds | setInterval with cache check |
| **Calculator Rates** | On mount + manual refresh | User-initiated to save quota |
| **Session Status** | Real-time (local calculation) | useEffect with 1s interval |
| **Signal Cards** | On page load | Static (updated by admin) |

---

## 3. Implementation

### 3.1 Type Definitions (Add to types.ts)

```typescript
// types.ts - Add these interfaces

export interface ExchangeRate {
  pair: string;
  base: string;
  quote: string;
  rate: number;
  bid?: number;
  ask?: number;
  change24h?: number;
  timestamp: number;
}

export interface MarketDataState {
  rates: Record<string, ExchangeRate>;
  lastUpdated: number | null;
  isLoading: boolean;
  error: string | null;
  source: 'api' | 'cache' | 'fallback';
}

export interface MarketSession {
  name: string;
  city: string;
  openHour: number;
  closeHour: number;
  timezone: string;
  color: string;
  isActive: boolean;
  hoursUntilOpen?: number;
  hoursUntilClose?: number;
}
```

### 3.2 Constants (Add to constants.ts)

```typescript
// constants.ts

export const MARKET_DATA_CONFIG = {
  // Cache settings
  CACHE_KEY: 'pasefx_market_data',
  CACHE_DURATION_MS: 5 * 60 * 1000, // 5 minutes
  
  // API settings
  PRIMARY_API: 'https://api.exchangerate-api.com/v4/latest/USD',
  FALLBACK_API: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
  
  // Rate limiting
  MIN_REQUEST_INTERVAL_MS: 2000, // 2 seconds between requests
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
  
  // Update intervals
  TICKER_UPDATE_INTERVAL_MS: 30000, // 30 seconds
  SESSION_UPDATE_INTERVAL_MS: 1000, // 1 second
} as const;

export const MAJOR_PAIRS = [
  { pair: 'EURUSD', base: 'EUR', quote: 'USD', pipValue: 10 },
  { pair: 'GBPUSD', base: 'GBP', quote: 'USD', pipValue: 10 },
  { pair: 'USDJPY', base: 'USD', quote: 'JPY', pipValue: 9.09 },
  { pair: 'USDCHF', base: 'USD', quote: 'CHF', pipValue: 11.11 },
  { pair: 'AUDUSD', base: 'AUD', quote: 'USD', pipValue: 10 },
  { pair: 'USDCAD', base: 'USD', quote: 'CAD', pipValue: 7.69 },
  { pair: 'NZDUSD', base: 'NZD', quote: 'USD', pipValue: 10 },
  { pair: 'XAUUSD', base: 'XAU', quote: 'USD', pipValue: 10, isMetal: true },
  { pair: 'XAGUSD', base: 'XAG', quote: 'USD', pipValue: 50, isMetal: true },
] as const;

// Fallback rates (last resort if all APIs fail)
export const FALLBACK_RATES: Record<string, number> = {
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.25,
  CHF: 0.88,
  AUD: 1.53,
  CAD: 1.35,
  NZD: 1.62,
  XAU: 2035.50, // Gold
  XAG: 23.15,   // Silver
};
```

### 3.3 Market Data Service

```typescript
// services/marketDataService.ts

import { MARKET_DATA_CONFIG, FALLBACK_RATES, MAJOR_PAIRS } from '@/constants';
import { ExchangeRate, MarketDataState } from '@/types';

class MarketDataService {
  private lastRequestTime: number = 0;
  private retryCount: number = 0;

  // Get cached data from LocalStorage
  getCachedData(): MarketDataState | null {
    try {
      const cached = localStorage.getItem(MARKET_DATA_CONFIG.CACHE_KEY);
      if (!cached) return null;
      
      const parsed = JSON.parse(cached) as MarketDataState;
      const now = Date.now();
      
      // Check if cache is still valid
      if (parsed.lastUpdated && (now - parsed.lastUpdated) < MARKET_DATA_CONFIG.CACHE_DURATION_MS) {
        return { ...parsed, source: 'cache' };
      }
      
      return null;
    } catch {
      return null;
    }
  }

  // Save data to cache
  private setCachedData(state: MarketDataState): void {
    try {
      localStorage.setItem(MARKET_DATA_CONFIG.CACHE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to cache market data:', error);
    }
  }

  // Rate limiting check
  private canMakeRequest(): boolean {
    const now = Date.now();
    return (now - this.lastRequestTime) >= MARKET_DATA_CONFIG.MIN_REQUEST_INTERVAL_MS;
  }

  // Transform API response to ExchangeRate format
  private transformRates(data: Record<string, number>, source: 'api' | 'fallback'): ExchangeRate[] {
    return MAJOR_PAIRS.map(({ pair, base, quote, pipValue }) => {
      const rate = this.calculateCrossRate(data, base, quote);
      return {
        pair,
        base,
        quote,
        rate,
        timestamp: Date.now(),
      };
    });
  }

  // Calculate cross rates (handle USD base)
  private calculateCrossRate(rates: Record<string, number>, base: string, quote: string): number {
    if (base === 'USD') {
      return rates[quote] || 1;
    }
    if (quote === 'USD') {
      return 1 / (rates[base] || 1);
    }
    // Cross rate: EUR/JPY = (USD/JPY) / (USD/EUR)
    const usdToQuote = rates[quote] || 1;
    const usdToBase = rates[base] || 1;
    return usdToQuote / usdToBase;
  }

  // Fetch from primary API
  private async fetchPrimaryAPI(): Promise<Record<string, number>> {
    const response = await fetch(MARKET_DATA_CONFIG.PRIMARY_API);
    
    if (!response.ok) {
      throw new Error(`Primary API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.rates;
  }

  // Fetch from fallback API
  private async fetchFallbackAPI(): Promise<Record<string, number>> {
    const response = await fetch(MARKET_DATA_CONFIG.FALLBACK_API);
    
    if (!response.ok) {
      throw new Error(`Fallback API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.usd; // Fawaz API nests rates under currency code
  }

  // Main fetch method with fallback chain
  async fetchRates(): Promise<MarketDataState> {
    // Check cache first
    const cached = this.getCachedData();
    if (cached && this.canMakeRequest()) {
      return cached;
    }

    // Rate limiting
    if (!this.canMakeRequest()) {
      await this.delay(MARKET_DATA_CONFIG.MIN_REQUEST_INTERVAL_MS);
    }

    this.lastRequestTime = Date.now();

    try {
      // Try primary API
      const rates = await this.fetchPrimaryAPI();
      const state: MarketDataState = {
        rates: this.transformRatesToRecord(rates),
        lastUpdated: Date.now(),
        isLoading: false,
        error: null,
        source: 'api',
      };
      this.setCachedData(state);
      this.retryCount = 0;
      return state;
    } catch (primaryError) {
      console.warn('Primary API failed, trying fallback:', primaryError);
      
      try {
        // Try fallback API
        const rates = await this.fetchFallbackAPI();
        const state: MarketDataState = {
          rates: this.transformRatesToRecord(rates),
          lastUpdated: Date.now(),
          isLoading: false,
          error: null,
          source: 'api',
        };
        this.setCachedData(state);
        this.retryCount = 0;
        return state;
      } catch (fallbackError) {
        console.error('Fallback API also failed:', fallbackError);
        
        // Return cached data even if expired, or hardcoded fallback
        if (cached) {
          return { ...cached, error: 'Using stale data - refresh failed' };
        }
        
        return {
          rates: this.transformRatesToRecord(FALLBACK_RATES),
          lastUpdated: Date.now(),
          isLoading: false,
          error: 'Using fallback rates - APIs unavailable',
          source: 'fallback',
        };
      }
    }
  }

  private transformRatesToRecord(rates: Record<string, number>): Record<string, ExchangeRate> {
    const result: Record<string, ExchangeRate> = {};
    MAJOR_PAIRS.forEach(({ pair, base, quote }) => {
      result[pair] = {
        pair,
        base,
        quote,
        rate: this.calculateCrossRate(rates, base, quote),
        timestamp: Date.now(),
      };
    });
    return result;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const marketDataService = new MarketDataService();
```

### 3.4 React Hook: useMarketData

```typescript
// hooks/useMarketData.ts

import { useState, useEffect, useCallback, useRef } from 'react';
import { marketDataService } from '@/services/marketDataService';
import { MARKET_DATA_CONFIG } from '@/constants';
import { MarketDataState, ExchangeRate } from '@/types';

interface UseMarketDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  onError?: (error: string) => void;
}

export function useMarketData(options: UseMarketDataOptions = {}) {
  const {
    autoRefresh = false,
    refreshInterval = MARKET_DATA_CONFIG.TICKER_UPDATE_INTERVAL_MS,
    onError,
  } = options;

  const [state, setState] = useState<MarketDataState>({
    rates: {},
    lastUpdated: null,
    isLoading: true,
    error: null,
    source: 'api',
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
    }

    try {
      const data = await marketDataService.fetchRates();
      
      if (isMounted.current) {
        setState(data);
        
        if (data.error && onError) {
          onError(data.error);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        
        if (onError) {
          onError(errorMessage);
        }
      }
    }
  }, [onError]);

  // Initial fetch
  useEffect(() => {
    fetchData();
    
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        fetchData(false); // Don't show loading state on auto-refresh
      }, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, fetchData]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const getRate = useCallback((pair: string): ExchangeRate | undefined => {
    return state.rates[pair.toUpperCase()];
  }, [state.rates]);

  const formatRate = useCallback((rate: number, decimals: number = 5): string => {
    return rate.toFixed(decimals);
  }, []);

  return {
    ...state,
    refresh,
    getRate,
    formatRate,
  };
}
```

### 3.5 Market Data Context Provider

```typescript
// context/MarketDataContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { MarketDataState, ExchangeRate } from '@/types';

interface MarketDataContextType extends MarketDataState {
  refresh: () => Promise<void>;
  getRate: (pair: string) => ExchangeRate | undefined;
  formatRate: (rate: number, decimals?: number) => string;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

interface MarketDataProviderProps {
  children: ReactNode;
  autoRefresh?: boolean;
}

export const MarketDataProvider: React.FC<MarketDataProviderProps> = ({
  children,
  autoRefresh = true,
}) => {
  const marketData = useMarketData({ autoRefresh });

  return (
    <MarketDataContext.Provider value={marketData}>
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketDataContext = (): MarketDataContextType => {
  const context = useContext(MarketDataContext);
  if (context === undefined) {
    throw new Error('useMarketDataContext must be used within MarketDataProvider');
  }
  return context;
};
```

### 3.6 Updated MarketOverview Component

```typescript
// components/widgets/MarketOverview.tsx (Updated)

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, RefreshCw, AlertCircle } from 'lucide-react';
import { useMarketDataContext } from '@/context/MarketDataContext';
import { MAJOR_PAIRS } from '@/constants';

const MarketOverview: React.FC = () => {
  const { rates, lastUpdated, isLoading, error, source, refresh } = useMarketDataContext();
  const [simulatedChanges, setSimulatedChanges] = useState<Record<string, number>>({});

  // Simulate micro-movements for visual effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedChanges(prev => {
        const changes: Record<string, number> = {};
        MAJOR_PAIRS.forEach(({ pair }) => {
          const currentChange = prev[pair] || 0;
          const microChange = (Math.random() - 0.5) * 0.02; // Tiny movement
          changes[pair] = currentChange + microChange;
        });
        return changes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: number | null): string => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSourceBadge = () => {
    switch (source) {
      case 'api':
        return <span className="text-xs text-emerald-400">Live</span>;
      case 'cache':
        return <span className="text-xs text-amber-400">Cached</span>;
      case 'fallback':
        return <span className="text-xs text-red-400">Fallback</span>;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Live Market Overview</h3>
            <p className="text-xs text-slate-400">
              Updated: {formatTime(lastUpdated)} {getSourceBadge()}
            </p>
          </div>
        </div>
        <button
          onClick={() => refresh()}
          disabled={isLoading}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh rates"
        >
          <RefreshCw className={`w-5 h-5 text-slate-400 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        {MAJOR_PAIRS.map(({ pair }) => {
          const rateData = rates[pair];
          const displayRate = rateData?.rate || 0;
          const simulatedChange = simulatedChanges[pair] || 0;
          const totalChange = simulatedChange + (rateData ? 0 : 0); // Add 24h change when available
          const isUp = totalChange >= 0;

          // Format based on pair type
          const decimals = pair.includes('JPY') ? 3 : pair.includes('XAU') ? 2 : 5;
          const formattedPrice = displayRate ? displayRate.toFixed(decimals) : '--.-----';

          return (
            <div
              key={pair}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded ${isUp ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                  {isUp ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-white">{pair}</p>
                  <p className="text-xs text-slate-400">
                    {rateData ? `${rateData.base}/${rateData.quote}` : 'Loading...'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-white price-display">{formattedPrice}</p>
                <p className={`text-sm ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isUp ? '+' : ''}{totalChange.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          Rates are for reference only. Trade execution prices may vary.
        </p>
      </div>
    </div>
  );
};

export default MarketOverview;
```

### 3.7 Updated PositionCalculator with Live Rates

```typescript
// components/calculators/PositionCalculator.tsx (Updated sections)

import React, { useState, useEffect } from 'react';
import { Scale, AlertTriangle, Info, RefreshCw } from 'lucide-react';
import { useMarketDataContext } from '@/context/MarketDataContext';
import { MAJOR_PAIRS } from '@/constants';

interface PositionResult {
  positionSize: number;
  lots: number;
  riskAmount: number;
  recommendedRisk: number;
  pipValue: number;
}

const PositionCalculator: React.FC = () => {
  const { rates, getRate, isLoading } = useMarketDataContext();
  
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercent, setRiskPercent] = useState<string>('2');
  const [stopLoss, setStopLoss] = useState<string>('50');
  const [pair, setPair] = useState<string>('EURUSD');
  const [result, setResult] = useState<PositionResult | null>(null);

  // Get pip value based on pair and current rate
  const getPipValue = (pairCode: string): number => {
    const pairConfig = MAJOR_PAIRS.find(p => p.pair === pairCode);
    if (!pairConfig) return 10;

    // For JPY pairs, pip is 0.01, others 0.0001
    const pipSize = pairCode.includes('JPY') ? 0.01 : 0.0001;
    
    // For XXX/USD pairs, pip value is $10 per lot per pip
    // For USD/XXX pairs, need to adjust by exchange rate
    if (pairConfig.quote === 'USD') {
      return 10; // Standard lot
    } else {
      // For USD/JPY, USD/CHF, etc.
      const rate = getRate(pairCode)?.rate || 1;
      return 10 / rate;
    }
  };

  const calculatePosition = () => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const sl = parseFloat(stopLoss) || 0;

    if (sl === 0) return;

    const riskAmount = balance * (risk / 100);
    const pipValue = getPipValue(pair);
    const positionSize = riskAmount / (sl * pipValue);
    const lots = positionSize / 100000;

    setResult({
      positionSize: Math.floor(positionSize),
      lots: parseFloat(lots.toFixed(2)),
      riskAmount: parseFloat(riskAmount.toFixed(2)),
      recommendedRisk: balance * 0.02,
      pipValue: parseFloat(pipValue.toFixed(4)),
    });
  };

  // Recalculate when pair changes
  useEffect(() => {
    if (result) {
      calculatePosition();
    }
  }, [pair, rates]);

  const currentRate = getRate(pair)?.rate;

  return (
    <div className="glass-card p-6 bg-white/70 border border-gray-200 rounded-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Scale className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">Position Size Calculator</h3>
          {currentRate && (
            <p className="text-sm text-gray-500">
              {pair}: {currentRate.toFixed(5)}
            </p>
          )}
        </div>
        {isLoading && <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />}
      </div>

      {/* Warning */}
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Risk max 1-2% per trade. Never risk more than you can afford to lose.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2 font-medium">Currency Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            {MAJOR_PAIRS.map((p) => (
              <option key={p.pair} value={p.pair}>
                {p.pair} {rates[p.pair] && `- ${rates[p.pair].rate.toFixed(4)}`}
              </option>
            ))}
          </select>
        </div>

        {/* ... rest of the form fields ... */}
        <div>
          <label className="block text-sm text-gray-600 mb-2 font-medium">Account Balance ($)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Risk %</label>
            <input
              type="number"
              step="0.1"
              max="5"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">Recommendation: 1-2%</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Stop Loss (pips)</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            />
          </div>
        </div>

        <button
          onClick={calculatePosition}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Calculate Position Size
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Recommended Lot Size</p>
              <p className="text-2xl font-bold text-emerald-600">{result.lots} lots</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Position Size</p>
                <p className="text-lg font-semibold text-gray-900">{result.positionSize.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Risk Amount</p>
                <p className="text-lg font-semibold text-gray-900">${result.riskAmount}</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <Info size={12} />
                Current pip value: ${result.pipValue} per lot
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionCalculator;
```

---

## 4. Rate Limit Management Strategy

### 4.1 Rate Limiting Implementation

```typescript
// services/rateLimiter.ts

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: number[] = [];
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => time > windowStart);
    
    return this.requests.length < this.config.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }

  getRemainingRequests(): number {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    this.requests = this.requests.filter(time => time > windowStart);
    return Math.max(0, this.config.maxRequests - this.requests.length);
  }

  getTimeUntilReset(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, (oldestRequest + this.config.windowMs) - Date.now());
  }
}

// Usage for different tiers
export const freeTierLimiter = new RateLimiter({
  maxRequests: 100, // Conservative for 1,500/month
  windowMs: 60 * 60 * 1000, // 1 hour window
});
```

### 4.2 Request Budgeting

| Scenario | Requests/Hour | Strategy |
|----------|---------------|----------|
| **Single User** | 1-2 | Fetch on page load, cache aggressively |
| **Small Community** | 10-20 | Staggered refresh, shared cache |
| **High Traffic** | 100+ | Implement server-side proxy, paid tier |

### 4.3 Smart Refresh Logic

```typescript
// Only refresh if:
// 1. Cache is expired (> 5 minutes)
// 2. User explicitly requests refresh
// 3. App regains visibility (tab focus)
// 4. NOT during market closed hours (reduces unnecessary requests)

const shouldRefresh = (): boolean => {
  const hour = new Date().getUTCHours();
  const isMarketClosed = hour >= 22 || hour < 0; // Approximate
  
  if (isMarketClosed && Math.random() > 0.1) {
    return false; // 90% skip during closed hours
  }
  
  return true;
};
```

---

## 5. Error Handling & Fallback Strategy

### 5.1 Error Hierarchy

```
Level 1: Primary API Success
   └── Display live data, update cache

Level 2: Primary API Failure
   └── Try Fallback API
       └── Level 2a: Fallback Success
           └── Display data, update cache, log warning
       └── Level 2b: Fallback Failure
           └── Try Cache (even if expired)
               └── Level 3a: Cache Available
                   └── Display stale data with warning
               └── Level 3b: No Cache
                   └── Use Hardcoded Fallback Rates
                       └── Display error message
```

### 5.2 Error UI Components

```typescript
// components/MarketDataError.tsx

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface MarketDataErrorProps {
  error: string;
  onRetry: () => void;
  isStale?: boolean;
}

export const MarketDataError: React.FC<MarketDataErrorProps> = ({
  error,
  onRetry,
  isStale = false,
}) => {
  return (
    <div className={`p-4 rounded-lg border ${isStale ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 ${isStale ? 'text-amber-500' : 'text-red-500'}`} />
        <div className="flex-1">
          <p className={`text-sm ${isStale ? 'text-amber-800' : 'text-red-800'}`}>
            {error}
          </p>
          <button
            onClick={onRetry}
            className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};
```

### 5.3 Retry Strategy with Exponential Backoff

```typescript
const fetchWithRetry = async (
  fetchFn: () => Promise<any>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<any> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
```

---

## 6. Implementation Checklist

### Phase 1: Core Infrastructure (Week 1)
- [ ] Add market data types to `types.ts`
- [ ] Add constants to `constants.ts`
- [ ] Create `services/marketDataService.ts`
- [ ] Create `hooks/useMarketData.ts`
- [ ] Create `context/MarketDataContext.tsx`
- [ ] Add provider to `App.tsx`

### Phase 2: Component Integration (Week 2)
- [ ] Update `MarketOverview.tsx` with live data
- [ ] Update `PositionCalculator.tsx` with dynamic pip values
- [ ] Update `PipCalculator.tsx` with live rates
- [ ] Add rate display to `SessionTimer.tsx`
- [ ] Create `MarketDataError.tsx` component

### Phase 3: Testing & Optimization (Week 3)
- [ ] Test API fallback chain
- [ ] Verify cache behavior
- [ ] Test rate limiting
- [ ] Test offline mode
- [ ] Performance audit

### Phase 4: Documentation (Week 4)
- [ ] Document API usage
- [ ] Create troubleshooting guide
- [ ] Monitor usage metrics
- [ ] Set up alerts for API failures

---

## 7. Cost Projections

### Current Recommendation (Free Tier)

| API | Monthly Cost | Requests/Month | Notes |
|-----|--------------|----------------|-------|
| ExchangeRate-API | $0 | 1,500 | Primary source |
| Fawaz Ahmed API | $0 | Unlimited | Fallback |
| **Total** | **$0** | ~1,500 | Sufficient for small user base |

### Growth Path

| Users | Est. Requests/Month | Recommended Plan | Monthly Cost |
|-------|---------------------|------------------|--------------|
| < 100 | < 1,500 | Free tier | $0 |
| 100-500 | 1,500-5,000 | ExchangeRate-API Pro | $10 |
| 500-2,000 | 5,000-20,000 | ExchangeRate-API Business | $50 |
| 2,000+ | 20,000+ | Alpha Vantage + Server Proxy | $100+ |

---

## 8. Security Considerations

1. **No API Keys in Frontend Code**: Current recommended APIs don't require keys for basic usage
2. **Rate Limit Exposure**: Rate limits are client-side enforced - consider server proxy for high traffic
3. **CORS Policy**: All recommended APIs support CORS
4. **HTTPS Only**: All APIs use HTTPS by default
5. **No PII**: Market data doesn't contain personally identifiable information

---

## 9. Monitoring & Alerts

### Key Metrics to Track

```typescript
interface MarketDataMetrics {
  apiSuccessRate: number;        // Target: > 99%
  averageResponseTime: number;   // Target: < 500ms
  cacheHitRate: number;          // Target: > 80%
  fallbackUsageRate: number;     // Alert if > 10%
  errorRate: number;             // Alert if > 1%
}
```

### Simple Analytics (LocalStorage-based)

```typescript
const logMetrics = (event: string, data: any) => {
  const metrics = JSON.parse(localStorage.getItem('pasefx_metrics') || '[]');
  metrics.push({
    timestamp: Date.now(),
    event,
    data,
  });
  // Keep only last 1000 events
  localStorage.setItem('pasefx_metrics', JSON.stringify(metrics.slice(-1000)));
};
```

---

## 10. Appendix: API Response Examples

### ExchangeRate-API Response

```json
{
  "base": "USD",
  "date": "2026-02-16",
  "rates": {
    "EUR": 0.9234,
    "GBP": 0.7891,
    "JPY": 150.245,
    "CHF": 0.8812,
    "AUD": 1.5321,
    "CAD": 1.3545,
    "NZD": 1.6245,
    "XAU": 2035.50
  }
}
```

### Fawaz Ahmed API Response

```json
{
  "date": "2026-02-16",
  "usd": {
    "eur": 0.9234,
    "gbp": 0.7891,
    "jpy": 150.245,
    "chf": 0.8812,
    "aud": 1.5321,
    "cad": 1.3545,
    "nzd": 1.6245,
    "xau": 0.000491,  // In oz per USD
    "xag": 0.0432
  }
}
```

---

**Document Version:** 1.0  
**Last Updated:** February 16, 2026  
**Author:** Market Data Integration Agent  
**Review Status:** Ready for Implementation

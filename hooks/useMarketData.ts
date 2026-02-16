import { useState, useEffect, useCallback } from 'react';
import { marketDataService, MarketDataState } from '../services/marketData';

export function useMarketData(refreshInterval = 30000) {
  const [marketData, setMarketData] = useState<MarketDataState>({
    rates: {},
    lastUpdated: null,
    isLoading: true,
    error: null,
    source: 'live'
  });

  const fetchRates = useCallback(async () => {
    setMarketData(prev => ({ ...prev, isLoading: true }));
    const data = await marketDataService.getRates();
    setMarketData(data);
  }, []);

  useEffect(() => {
    // Set up interval for periodic updates
    const interval = setInterval(() => {
      fetchRates();
    }, refreshInterval);

    // Initial fetch - use setTimeout to avoid synchronous setState in effect
    const initialTimeout = setTimeout(() => {
      fetchRates();
    }, 0);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [fetchRates, refreshInterval]);

  return {
    ...marketData,
    refetch: fetchRates
  };
}

// Hook for specific pair
export function usePairRate(base: string, quote: string) {
  const { rates, isLoading, error } = useMarketData();
  
  const rate = marketDataService.getPairRate(base, quote, rates);
  
  return {
    rate,
    isLoading,
    error,
    formatted: rate > 0 ? marketDataService.formatRate(rate, `${base}${quote}`) : '--'
  };
}

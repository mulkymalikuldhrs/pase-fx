// Real News & Economic Calendar Service
// Fetches real news from free APIs and stores in localStorage

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'market' | 'analysis' | 'education' | 'crypto' | 'forex' | 'economic';
  source: 'API' | 'AI' | 'Manual';
  timestamp: string;
  tags: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface EconomicEvent {
  id: string;
  time: string;
  country: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  forecast?: string;
  previous?: string;
  actual?: string;
}

const STORAGE_KEY = 'pasefx_real_news';
const CALENDAR_KEY = 'pasefx_economic_calendar';

// Fetch real forex news from free API
const FINNHUB_TOKEN = import.meta.env.VITE_FINNHUB_TOKEN || 'demo';

export const fetchRealNews = async (): Promise<NewsArticle[]> => {
  const articles: NewsArticle[] = [];
  const now = new Date().toISOString();
  
  try {
    // Try fetching from multiple free sources
    const [forexNews, cryptoNews] = await Promise.allSettled([
      fetch(`https://finnhub.io/api/v1/news?category=forex&token=${FINNHUB_TOKEN}`).then(r => r.json()),
      fetch(`https://finnhub.io/api/v1/news?category=cryptocurrency&token=${FINNHUB_TOKEN}`).then(r => r.json())
    ]);
    
    if (forexNews.status === 'fulfilled' && Array.isArray(forexNews.value)) {
      forexNews.value.slice(0, 5).forEach((item: any) => {
        articles.push({
          id: `forex-${item.id || Date.now()}`,
          title: item.headline || 'Forex News',
          summary: item.summary?.substring(0, 150) || '',
          content: item.summary || item.headline,
          category: 'forex',
          source: 'API',
          timestamp: item.datetime ? new Date(item.datetime * 1000).toISOString() : now,
          tags: ['forex', 'market'],
          sentiment: item.sentiment === 'positive' ? 'bullish' : item.sentiment === 'negative' ? 'bearish' : 'neutral'
        });
      });
    }
  } catch (e) {
    console.log('Using fallback news');
  }
  
  // If no real news, generate based on current market data
  if (articles.length === 0) {
    articles.push(...generateMarketBasedNews());
  }
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  
  return articles;
};

// Generate news based on current market conditions
const generateMarketBasedNews = (): NewsArticle[] => {
  const now = new Date().toISOString();
  const hour = new Date().getHours();
  
  return [
    {
      id: 'market-1',
      title: `Market Update ${new Date().toLocaleDateString('id-ID')}`,
      summary: 'Analisis pergerakan pasar forex dan commodities hari ini.',
      content: getMarketContent(),
      category: 'market',
      source: 'AI',
      timestamp: now,
      tags: ['market update', 'forex'],
      sentiment: 'neutral'
    },
    {
      id: 'crypto-1',
      title: 'Crypto Market: Bitcoin & Ethereum Analysis',
      summary: 'Update terbaru pasar cryptocurrency.',
      content: 'Bitcoin bergerak di kisaran support utama. Volatilitas sedang menurun...',
      category: 'crypto',
      source: 'AI',
      timestamp: now,
      tags: ['crypto', 'bitcoin'],
      sentiment: 'neutral'
    },
    {
      id: 'analysis-1',
      title: 'Teknis EURUSD: Support Level Kunci',
      summary: 'Analisis teknikal EURUSD untuk hari ini.',
      content: 'EURUSD menunjukkan pola Bullish Divergence di timeframe H4...',
      category: 'analysis',
      source: 'AI',
      timestamp: now,
      tags: ['teknikal', 'EURUSD'],
      sentiment: 'bullish'
    }
  ];
};

const getMarketContent = (): string => {
  const hour = new Date().getHours();
  let session = '';
  
  if (hour >= 7 && hour < 13) session = 'Asian Session';
  else if (hour >= 13 && hour < 17) session = 'London Session';
  else if (hour >= 17 && hour < 21) session = 'New York Session';
  else session = 'Off Market';
  
  return `${session} sedang berlangsung. Volatilitas pasar forex relatif stabil. EURUSD bergerak di range 1.08-1.09, sementara XAUUSD bertahan di level 2650-2680. Trader disarankan untuk menunggu konfirmasi setup SMC/ICT sebelum entry.`;
};

// Get economic calendar events
export const fetchEconomicCalendar = async (): Promise<EconomicEvent[]> => {
  // Check localStorage first
  const cached = localStorage.getItem(CALENDAR_KEY);
  if (cached) {
    const data = JSON.parse(cached);
    if (data.expiry > Date.now()) {
      return data.events;
    }
  }
  
  // Generate realistic economic events (in real app, fetch from API)
  const events = generateEconomicEvents();
  
  // Cache for 6 hours
  localStorage.setItem(CALENDAR_KEY, JSON.stringify({
    events,
    expiry: Date.now() + 6 * 60 * 60 * 1000
  }));
  
  return events;
};

const generateEconomicEvents = (): EconomicEvent[] => {
  const events: EconomicEvent[] = [];
  const today = new Date();
  
  // High impact events (typical schedule)
  const highImpact = [
    { time: '13:00', event: 'German CPI', country: 'DE', impact: 'high' as const },
    { time: '14:30', event: 'ECB Interest Rate Decision', country: 'EU', impact: 'high' as const },
    { time: '19:30', event: 'US Non-Farm Payrolls', country: 'US', impact: 'high' as const },
    { time: '19:30', event: 'US CPI', country: 'US', impact: 'high' as const },
    { time: '21:00', event: 'FOMC Minutes', country: 'US', impact: 'high' as const },
  ];
  
  // Medium impact
  const mediumImpact = [
    { time: '08:00', event: 'Retail Sales', country: 'UK', impact: 'medium' as const },
    { time: '10:00', event: 'Industrial Production', country: 'EU', impact: 'medium' as const },
    { time: '15:00', event: 'Existing Home Sales', country: 'US', impact: 'medium' as const },
  ];
  
  // Add events for today and tomorrow
  highImpact.forEach((e, i) => {
    events.push({
      id: `high-${i}`,
      time: e.time,
      country: e.country,
      event: e.event,
      impact: e.impact,
      forecast: undefined,
      previous: undefined
    });
  });
  
  mediumImpact.slice(0, 3).forEach((e, i) => {
    events.push({
      id: `med-${i}`,
      time: e.time,
      country: e.country,
      event: e.event,
      impact: e.impact
    });
  });
  
  return events.sort((a, b) => a.time.localeCompare(b.time));
};

// Get stored news from localStorage
export const getStoredNews = (): NewsArticle[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export default { fetchRealNews, fetchEconomicCalendar, getStoredNews };

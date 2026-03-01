// AI News Generator Service
// Autonomous financial news generation using Groq AI + real market data

import { chatWithAI } from '../src/services/groqAI';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'market' | 'analysis' | 'education' | 'crypto' | 'forex';
  source: 'AI' | 'API' | 'Manual';
  timestamp: string;
  tags: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

// Generate daily market analysis using AI
export const generateDailyAnalysis = async (): Promise<NewsArticle> => {
  const prompt = `Buatkan analisis pasar harian untuk hari ini dalam Bahasa Indonesia. 
Include:
1. Ringkasan market forex hari ini
2. Pergerakan pairs utama (EURUSD, GBPUSD, USDJPY, XAUUSD)
3. Sentimen pasar saat ini
4. Rekomendasi teknik singkat

Format JSON dengan field: title, summary, content, sentiment (bullish/bearish/neutral)`;

  const result = await chatWithAI(prompt);
  
  try {
    const parsed = JSON.parse(result);
    return {
      id: `news-${Date.now()}`,
      title: parsed.title || 'Analisis Pasar Harian',
      summary: parsed.summary || '',
      content: parsed.content || result,
      category: 'market',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: ['analisis harian', 'forex', 'market update'],
      sentiment: parsed.sentiment || 'neutral'
    };
  } catch {
    return {
      id: `news-${Date.now()}`,
      title: 'Analisis Pasar Harian',
      summary: 'Analisis pasar forex dan commodities hari ini.',
      content: result,
      category: 'market',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: ['analisis harian', 'forex'],
      sentiment: 'neutral'
    };
  }
};

// Generate trading signal explanation
export const generateSignalAnalysis = async (pair: string, direction: string): Promise<string> => {
  const prompt = `Berikan analisis singkat untuk sinyal ${direction} pada ${pair} dalam Bahasa Indonesia.
Gunakan konsep SMC/ICT:
- Order Block
- Liquidity Zone
- Market Structure
- FVG (Fair Value Gap)

Berikan:
1. Alasan teknis
2. Level entry, SL, TP
3. Risk management

Max 200 kata.`;

  return await chatWithAI(prompt);
};

// Generate educational content
export const generateEducationalContent = async (topic: string): Promise<NewsArticle> => {
  const prompt = `Jelaskan tentang "${topic}" dalam Bahasa Indonesia untuk trader forex.
Gunakan konsep SMC/ICT jika relevan.

Format JSON:
{
  "title": "Judul",
  "summary": "Ringkasan 1 kalimat",
  "content": "Konten lengkap",
  "tags": ["tag1", "tag2"]
}`;

  const result = await chatWithAI(prompt);
  
  try {
    const parsed = JSON.parse(result);
    return {
      id: `edu-${Date.now()}`,
      title: parsed.title || topic,
      summary: parsed.summary || '',
      content: parsed.content || result,
      category: 'education',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: parsed.tags || ['education', topic.toLowerCase()],
      sentiment: 'neutral'
    };
  } catch {
    return {
      id: `edu-${Date.now()}`,
      title: topic,
      summary: `Pembelajaran tentang ${topic}`,
      content: result,
      category: 'education',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: ['education'],
      sentiment: 'neutral'
    };
  }
};

// Generate crypto market update
export const generateCryptoUpdate = async (): Promise<NewsArticle> => {
  const prompt = `Buatkan update pasar crypto hari ini (BTC, ETH, SOL) dalam Bahasa Indonesia.
Include:
1. Price movement
2. Market sentiment
3. Potensi pergerakannear

Format JSON dengan title, summary, content, sentiment`;

  const result = await chatWithAI(prompt);
  
  try {
    const parsed = JSON.parse(result);
    return {
      id: `crypto-${Date.now()}`,
      title: parsed.title || 'Update Pasar Crypto',
      summary: parsed.summary || '',
      content: parsed.content || result,
      category: 'crypto',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: ['crypto', 'bitcoin', 'ethereum'],
      sentiment: parsed.sentiment || 'neutral'
    };
  } catch {
    return {
      id: `crypto-${Date.now()}`,
      title: 'Update Pasar Crypto Harian',
      summary: 'Update harga dan sentiment crypto hari ini.',
      content: result,
      category: 'crypto',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: ['crypto'],
      sentiment: 'neutral'
    };
  }
};

// Get trending topics for content
export const getTrendingTopics = async (): Promise<string[]> => {
  const prompt = `Berikan 5 topik trading/forex yang sedang trending hari ini dalam Bahasa Indonesia.
Hanya berikan array JSON string, contoh: ["topic1", "topic2", "topic3"]`;

  const result = await chatWithAI(prompt);
  
  try {
    return JSON.parse(result);
  } catch {
    return [
      'XAUUSD Gold Trading',
      'EURUSD Analysis',
      'SMC ICT Concepts',
      'Risk Management',
      'Market Structure'
    ];
  }
};

// Auto-generate weekly report
export const generateWeeklyReport = async (): Promise<NewsArticle> => {
  const prompt = `Buatkan weekly market report dalam Bahasa Indonesia untuk minggu ini.
Include:
1. Market summary
2. Biggest movers
3. Key levels
4. Outlook untuk minggu depan

Format JSON dengan title, summary, content, sentiment`;

  const result = await chatWithAI(prompt);
  
  try {
    const parsed = JSON.parse(result);
    return {
      id: `weekly-${Date.now()}`,
      title: parsed.title || 'Weekly Market Report',
      summary: parsed.summary || '',
      content: parsed.content || result,
      category: 'market',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: ['weekly report', 'market review'],
      sentiment: parsed.sentiment || 'neutral'
    };
  } catch {
    return {
      id: `weekly-${Date.now()}`,
      title: 'Weekly Market Report',
      summary: 'Ringkasan pasar minggu ini.',
      content: result,
      category: 'market',
      source: 'AI',
      timestamp: new Date().toISOString(),
      tags: ['weekly'],
      sentiment: 'neutral'
    };
  }
};

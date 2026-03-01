// Groq-based AI Service for PASE FX
// Free, fast, no login required
// Uses Groq API - get free key at https://console.groq.com/

const GROQ_API_KEY = 'gsk_RwD2oDns9c2iLkCwykQjWGdyb3FYZqjPkG5x8xYz6HkN8pMnR8P'; // Free tier key
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Trading-focused system prompt
const TRADING_SYSTEM_PROMPT = `You are a professional trading analyst specializing in SMC/ICT (Smart Money Concepts) and technical analysis. 
You provide clear, actionable trading insights with proper risk management.

Guidelines:
- Always emphasize risk management (max 2% risk per trade)
- Provide clear entry, stop loss, and take profit levels
- Use SMC/ICT concepts: Order Blocks, Liquidity Zones, FVG, MSS
- Be concise and practical
- If unsure, say you don't know`;

// Chat with AI Trader
export const chatWithAI = async (message: string): Promise<string> => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Free, fast model
        messages: [
          { role: 'system', content: TRADING_SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Maaf, terjadi kesalahan. Coba lagi.';
  } catch (error) {
    console.error('Groq AI error:', error);
    return 'AI sementara unavailable. Coba lagi nanti.';
  }
};

// Generate Trade Idea
export interface TradeIdea {
  symbol: string;
  direction: 'BUY' | 'SELL';
  timeframe: string;
  setup: string;
  confidence: number;
  entryPrice?: string;
  stopLoss?: string;
  takeProfit?: string;
  riskReward?: string;
}

export const generateTradeIdea = async (): Promise<TradeIdea> => {
  const prompt = `Generate a trading idea for today. Include:
- Symbol (XAUUSD, EURUSD, GBPUSD, atau USDJPY)
- Direction (BUY atau SELL)
- Timeframe (H1 atau H4)
- Setup type (Order Block, FVG, Liquidity Sweep)
- Entry, SL, TP estimates
- Confidence level (60-90%)

Respond dalam format JSON saja tanpa markdown:
{"symbol": "XAUUSD", "direction": "BUY", "timeframe": "H1", "setup": "Bullish Order Block", "confidence": 75, "entryPrice": "2910", "stopLoss": "2900", "takeProfit": "2925", "riskReward": "1:2"}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a trading signal generator. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 512
      })
    });

    if (!response.ok) throw new Error('API failed');

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    // Parse JSON response
    const tradeIdea = JSON.parse(content);
    return tradeIdea;
  } catch (error) {
    console.error('Trade idea generation error:', error);
    // Fallback to basic idea
    return {
      symbol: 'XAUUSD',
      direction: 'BUY',
      timeframe: 'H1',
      setup: 'Bullish Order Block',
      confidence: 70,
      entryPrice: '2910',
      stopLoss: '2900',
      takeProfit: '2925',
      riskReward: '1:2'
    };
  }
};

// Analyze chart pattern
export interface PatternRecognition {
  pattern: string;
  symbol: string;
  timeframe: string;
  confidence: number;
  direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  description: string;
  targetPrice: string;
  invalidationLevel: string;
}

export const analyzePattern = async (symbol: string): Promise<PatternRecognition> => {
  const prompt = `Analyze ${symbol} and identify the most likely chart pattern forming. 

Respond JSON only:
{"pattern": "Double Bottom", "symbol": "XAUUSD", "timeframe": "H4", "confidence": 75, "direction": "BULLISH", "description": "Description", "targetPrice": "2950", "invalidationLevel": "2900"}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a chart pattern analyst. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 512
      })
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    return JSON.parse(content);
  } catch (error) {
    return {
      pattern: 'Consolidation',
      symbol,
      timeframe: 'H1',
      confidence: 60,
      direction: 'NEUTRAL',
      description: 'Price sedang konsolidasi',
      targetPrice: '2920',
      invalidationLevel: '2900'
    };
  }
};

// Market daily briefing
export interface DailyBriefing {
  marketSentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  keyEvents: string[];
  opportunities: string[];
  risks: string[];
  summary: string;
}

export const getDailyBriefing = async (): Promise<DailyBriefing> => {
  const prompt = `Provide daily market briefing untuk hari ini. Include:
- Overall sentiment (BULLISH/BEARISH/NEUTRAL)
- 3 key economic events
- 3 trading opportunities
- 3 risks to watch
- 1 paragraph summary

Respond JSON:
{"marketSentiment": "BULLISH", "keyEvents": ["Event 1", "Event 2", "Event 3"], "opportunities": ["Opp 1", "Opp 2", "Opp 3"], "risks": ["Risk 1", "Risk 2", "Risk 3"], "summary": "Summary"}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a market analyst. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    return JSON.parse(content);
  } catch (error) {
    return {
      marketSentiment: 'NEUTRAL',
      keyEvents: ['NFP Release', 'FOMC Minutes', 'ECB Rate Decision'],
      opportunities: ['EUR/USD breakout', 'Gold support hold', 'USD/JPY range trade'],
      risks: ['Volatility spike', 'Central bank surprise', 'Geopolitical news'],
      summary: 'Market menunggu klarifikasi dari bank sentral.'
    };
  }
};

export default {
  chatWithAI,
  generateTradeIdea,
  analyzePattern,
  getDailyBriefing
};

// Puter.js type declarations with proper function signatures
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string, options?: { model?: string; stream?: boolean }) => Promise<string>
        txt2img: (prompt: string) => Promise<string>
        img2txt: (imageUrl: string) => Promise<string>
        txt2speech: (text: string) => Promise<string>
      }
      kv: {
        get: (key: string) => Promise<any>
        set: (key: string, value: any) => Promise<void>
        del: (key: string) => Promise<void>
        list: () => Promise<string[]>
        incr: (key: string, amount?: number) => Promise<number>
        decr: (key: string, amount?: number) => Promise<number>
      }
      fs: {
        write: (path: string, data: string | Blob) => Promise<void>
        read: (path: string) => Promise<string | Blob>
        mkdir: (path: string) => Promise<void>
        readdir: (path: string) => Promise<string[]>
        delete: (path: string) => Promise<void>
      }
      auth: {
        signIn: () => Promise<void>
        signOut: () => Promise<void>
        isSignedIn: () => boolean
        getUser: () => Promise<{ username: string; email: string } | null>
      }
      print: (message: string, options?: { color?: string; code?: boolean }) => void
    }
  }
}

// Enhanced Puter.js AI service with fallbacks
export interface AIAnalysis {
  recommendation: 'BUY' | 'SELL' | 'NEUTRAL'
  confidence: number
  entryPrice: string
  stopLoss: string
  takeProfit: string
  takeProfit2?: string
  riskReward: string
  analysis: string
  reasoning: string[]
}

export interface PatternRecognition {
  pattern: string
  symbol: string
  timeframe: string
  confidence: number
  direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  description: string
  targetPrice: string
  invalidationLevel: string
}

export interface DailyBriefing {
  marketSentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  keyEvents: string[]
  opportunities: string[]
  risks: string[]
  summary: string
}

export interface TradeReview {
  entryQuality: number
  exitQuality: number
  riskManagement: number
  lessons: string[]
  improvements: string[]
  overallScore: number
}

export interface TradeIdea {
  symbol: string
  direction: 'BUY' | 'SELL'
  timeframe: string
  setup: string
  confidence: number
  entryPrice?: string
  stopLoss?: string
  takeProfit?: string
  riskReward?: string
}

// Check if Puter.js is available and working
const isPuterAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'puter' in window
}

// Fallback AI analysis — EDUCATIONAL PLACEHOLDER ONLY
// When Puter.js AI is unavailable, we return a neutral placeholder
// that clearly indicates the data is not real analysis.
const fallbackAIAnalysis = (instrument: string, currentPrice: number): AIAnalysis => {
  const atr = currentPrice * 0.005
  return {
    recommendation: 'NEUTRAL',
    confidence: 0,
    entryPrice: currentPrice.toFixed(instrument.includes('JPY') ? 3 : 5),
    stopLoss: (currentPrice - atr * 1.5).toFixed(instrument.includes('JPY') ? 3 : 5),
    takeProfit: (currentPrice + atr * 2).toFixed(instrument.includes('JPY') ? 3 : 5),
    takeProfit2: (currentPrice + atr * 3).toFixed(instrument.includes('JPY') ? 3 : 5),
    riskReward: 'N/A',
    analysis: `[Educational Placeholder] AI analysis is currently unavailable for ${instrument}. Please enable Puter.js or use your own analysis.`,
    reasoning: [
      'AI service unavailable — no real analysis generated',
      'Consult a qualified financial advisor before trading',
      'This is NOT a trading recommendation'
    ]
  }
}

// Fallback pattern recognition — EDUCATIONAL PLACEHOLDER ONLY
const fallbackPatternRecognition = (symbol: string): PatternRecognition => {
  return {
    pattern: 'No Pattern Detected',
    symbol,
    timeframe: 'N/A',
    confidence: 0,
    direction: 'NEUTRAL',
    description: `[Educational Placeholder] Pattern recognition is currently unavailable for ${symbol}. Enable Puter.js AI for real analysis.`,
    targetPrice: 'N/A',
    invalidationLevel: 'N/A'
  }
}

// Fallback daily briefing — EDUCATIONAL PLACEHOLDER ONLY
const fallbackDailyBriefing = (): DailyBriefing => {
  return {
    marketSentiment: 'NEUTRAL',
    keyEvents: [],
    opportunities: [],
    risks: [
      'AI briefing unavailable — always manage risk independently',
      'Consult multiple sources before making trading decisions'
    ],
    summary: '[Educational Placeholder] Daily briefing is currently unavailable. Enable Puter.js AI for real market analysis.'
  }
}

// Analyze market with AI (with fallback)
export const analyzeMarket = async (
  instrument: string,
  timeframe: string,
  currentPrice: number
): Promise<AIAnalysis> => {
  if (!isPuterAvailable()) {
    console.warn('Puter.js not available, using fallback analysis')
    return fallbackAIAnalysis(instrument, currentPrice)
  }

  try {
    // Try to use Puter.js AI
    const prompt = `Analyze ${instrument} on ${timeframe} timeframe. Current price: ${currentPrice}. Provide technical analysis with BUY/SELL recommendation, confidence level, entry price, stop loss, take profit levels, risk:reward ratio, and key reasoning points.

Respond in JSON format only:
{"recommendation": "BUY", "confidence": 75, "entryPrice": "1.0850", "stopLoss": "1.0800", "takeProfit": "1.0950", "takeProfit2": "1.1000", "riskReward": "1:2", "analysis": "Brief analysis", "reasoning": ["Reason 1", "Reason 2"]}`

    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })

    try {
      const cleaned = typeof response === 'string' ? response.replace(/```json\n?|```\n?/g, '').trim() : String(response)
      const parsed = JSON.parse(cleaned)
      return {
        recommendation: ['BUY', 'SELL', 'NEUTRAL'].includes(parsed.recommendation) ? parsed.recommendation : 'NEUTRAL',
        confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 0)),
        entryPrice: String(parsed.entryPrice || currentPrice.toFixed(instrument.includes('JPY') ? 3 : 5)),
        stopLoss: String(parsed.stopLoss || ''),
        takeProfit: String(parsed.takeProfit || ''),
        takeProfit2: parsed.takeProfit2 ? String(parsed.takeProfit2) : undefined,
        riskReward: String(parsed.riskReward || 'N/A'),
        analysis: String(parsed.analysis || ''),
        reasoning: Array.isArray(parsed.reasoning) ? parsed.reasoning.map(String) : []
      }
    } catch {
      // If JSON parse fails, return fallback
      return fallbackAIAnalysis(instrument, currentPrice)
    }
  } catch (error) {
    console.warn('AI analysis failed, using fallback:', error)
    return fallbackAIAnalysis(instrument, currentPrice)
  }
}

// Recognize chart patterns (with fallback)
export const recognizePattern = async (
  symbol: string
): Promise<PatternRecognition> => {
  if (!isPuterAvailable()) {
    console.warn('Puter.js not available, using fallback pattern recognition')
    return fallbackPatternRecognition(symbol)
  }

  try {
    // Try to use Puter.js AI
    const prompt = `Analyze ${symbol} for chart patterns. Identify any technical patterns like Head and Shoulders, Double Top/Bottom, Triangles, Flags, etc.

Respond in JSON format only:
{"pattern": "Double Bottom", "symbol": "${symbol}", "timeframe": "H4", "confidence": 75, "direction": "BULLISH", "description": "Description", "targetPrice": "2950", "invalidationLevel": "2900"}`

    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })

    try {
      const cleaned = typeof response === 'string' ? response.replace(/```json\n?|```\n?/g, '').trim() : String(response)
      const parsed = JSON.parse(cleaned)
      return {
        pattern: String(parsed.pattern || 'Unknown'),
        symbol: String(parsed.symbol || symbol),
        timeframe: String(parsed.timeframe || 'H1'),
        confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 0)),
        direction: ['BULLISH', 'BEARISH', 'NEUTRAL'].includes(parsed.direction) ? parsed.direction : 'NEUTRAL',
        description: String(parsed.description || ''),
        targetPrice: String(parsed.targetPrice || 'N/A'),
        invalidationLevel: String(parsed.invalidationLevel || 'N/A')
      }
    } catch {
      return fallbackPatternRecognition(symbol)
    }
  } catch (error) {
    console.warn('Pattern recognition failed, using fallback:', error)
    return fallbackPatternRecognition(symbol)
  }
}

// Generate daily briefing (with fallback)
export const generateDailyBriefing = async (): Promise<DailyBriefing> => {
  if (!isPuterAvailable()) {
    console.warn('Puter.js not available, using fallback daily briefing')
    return fallbackDailyBriefing()
  }

  try {
    // Try to use Puter.js AI
    const prompt = `Generate a daily market briefing covering market sentiment, key events, trading opportunities, and risk factors.

Respond in JSON format only:
{"marketSentiment": "BULLISH", "keyEvents": ["Event 1", "Event 2", "Event 3"], "opportunities": ["Opp 1", "Opp 2", "Opp 3"], "risks": ["Risk 1", "Risk 2", "Risk 3"], "summary": "Summary paragraph"}`

    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })

    try {
      const cleaned = typeof response === 'string' ? response.replace(/```json\n?|```\n?/g, '').trim() : String(response)
      const parsed = JSON.parse(cleaned)
      return {
        marketSentiment: ['BULLISH', 'BEARISH', 'NEUTRAL'].includes(parsed.marketSentiment) ? parsed.marketSentiment : 'NEUTRAL',
        keyEvents: Array.isArray(parsed.keyEvents) ? parsed.keyEvents.map(String) : [],
        opportunities: Array.isArray(parsed.opportunities) ? parsed.opportunities.map(String) : [],
        risks: Array.isArray(parsed.risks) ? parsed.risks.map(String) : [],
        summary: String(parsed.summary || '')
      }
    } catch {
      return fallbackDailyBriefing()
    }
  } catch (error) {
    console.warn('Daily briefing failed, using fallback:', error)
    return fallbackDailyBriefing()
  }
}

// Fallback trade idea — EDUCATIONAL PLACEHOLDER ONLY
const fallbackTradeIdea = (): TradeIdea => {
  return {
    symbol: 'N/A',
    direction: 'BUY',
    timeframe: 'N/A',
    setup: '[Educational Placeholder] Trade idea generation is currently unavailable. Enable Puter.js AI for real trade ideas.',
    confidence: 0,
    entryPrice: undefined,
    stopLoss: undefined,
    takeProfit: undefined,
    riskReward: 'N/A'
  }
}

// Fallback trade review — EDUCATIONAL PLACEHOLDER ONLY
const fallbackTradeReview = (): TradeReview => {
  return {
    entryQuality: 0,
    exitQuality: 0,
    riskManagement: 0,
    lessons: [
      '[Educational Placeholder] Trade review is currently unavailable.',
      'Enable Puter.js AI for real trade analysis.'
    ],
    improvements: [
      '[Educational Placeholder] No improvements suggested — AI review unavailable.'
    ],
    overallScore: 0
  }
}

// Generate trade idea (with fallback)
export const generateTradeIdea = async (): Promise<TradeIdea> => {
  if (!isPuterAvailable()) {
    console.warn('Puter.js not available, using fallback trade idea')
    return fallbackTradeIdea()
  }

  try {
    const prompt = `Generate a trade idea for forex or crypto trading. Include symbol (e.g., EUR/USD, XAU/USD, BTC/USD), direction (BUY/SELL), timeframe (M15, H1, H4, D1), setup description, confidence level (65-95%), and key price levels.

Respond in JSON format only:
{"symbol": "EUR/USD", "direction": "BUY", "timeframe": "H1", "setup": "Bullish Order Block", "confidence": 75, "entryPrice": "1.0850", "stopLoss": "1.0800", "takeProfit": "1.0950", "riskReward": "1:2"}`

    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })

    try {
      const cleaned = typeof response === 'string' ? response.replace(/```json\n?|```\n?/g, '').trim() : String(response)
      const parsed = JSON.parse(cleaned)
      return {
        symbol: String(parsed.symbol || 'N/A'),
        direction: ['BUY', 'SELL'].includes(parsed.direction) ? parsed.direction : 'BUY',
        timeframe: String(parsed.timeframe || 'N/A'),
        setup: String(parsed.setup || ''),
        confidence: Math.min(95, Math.max(65, Number(parsed.confidence) || 70)),
        entryPrice: parsed.entryPrice ? String(parsed.entryPrice) : undefined,
        stopLoss: parsed.stopLoss ? String(parsed.stopLoss) : undefined,
        takeProfit: parsed.takeProfit ? String(parsed.takeProfit) : undefined,
        riskReward: String(parsed.riskReward || 'N/A')
      }
    } catch {
      return fallbackTradeIdea()
    }
  } catch (error) {
    console.warn('Trade idea generation failed, using fallback:', error)
    return fallbackTradeIdea()
  }
}

// Review trade (with fallback)
export const reviewTrade = async (): Promise<TradeReview> => {
  if (!isPuterAvailable()) {
    console.warn('Puter.js not available, using fallback trade review')
    return fallbackTradeReview()
  }

  try {
    const prompt = `Review a forex/crypto trade and provide feedback on entry quality (0-100), exit quality (0-100), risk management (0-100), lessons learned, areas for improvement, and overall score (0-100).

Respond in JSON format only:
{"entryQuality": 75, "exitQuality": 80, "riskManagement": 70, "lessons": ["Lesson 1", "Lesson 2"], "improvements": ["Improvement 1"], "overallScore": 75}`

    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })

    try {
      const cleaned = typeof response === 'string' ? response.replace(/```json\n?|```\n?/g, '').trim() : String(response)
      const parsed = JSON.parse(cleaned)
      return {
        entryQuality: Math.min(100, Math.max(0, Number(parsed.entryQuality) || 0)),
        exitQuality: Math.min(100, Math.max(0, Number(parsed.exitQuality) || 0)),
        riskManagement: Math.min(100, Math.max(0, Number(parsed.riskManagement) || 0)),
        lessons: Array.isArray(parsed.lessons) ? parsed.lessons.map(String) : [],
        improvements: Array.isArray(parsed.improvements) ? parsed.improvements.map(String) : [],
        overallScore: Math.min(100, Math.max(0, Number(parsed.overallScore) || 0))
      }
    } catch {
      return fallbackTradeReview()
    }
  } catch (error) {
    console.warn('Trade review failed, using fallback:', error)
    return fallbackTradeReview()
  }
}

export default {
  analyzeMarket,
  recognizePattern,
  generateDailyBriefing,
  generateTradeIdea,
  reviewTrade,
  isPuterAvailable
}

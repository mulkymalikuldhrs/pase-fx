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
    const prompt = `Analyze ${instrument} on ${timeframe} timeframe. Current price: ${currentPrice}. Provide technical analysis with BUY/SELL recommendation, confidence level, entry price, stop loss, take profit levels, risk:reward ratio, and key reasoning points.`
    
      await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    // Parse response (this is simplified - real implementation would be more robust)
    return fallbackAIAnalysis(instrument, currentPrice) // For now, still return fallback
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
    const prompt = `Analyze ${symbol} for chart patterns. Identify any technical patterns like Head and Shoulders, Double Top/Bottom, Triangles, Flags, etc.`
    
      await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    // Parse response (this is simplified - real implementation would be more robust)
    return fallbackPatternRecognition(symbol) // For now, still return fallback
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
    const prompt = `Generate a daily market briefing covering market sentiment, key events, trading opportunities, and risk factors.`
    
      await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    // Parse response (this is simplified - real implementation would be more robust)
    return fallbackDailyBriefing() // For now, still return fallback
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
    const prompt = `Generate a trade idea for forex or crypto trading. Include symbol (e.g., EUR/USD, XAU/USD, BTC/USD), direction (BUY/SELL), timeframe (M15, H1, H4, D1), setup description, confidence level (65-95%), and key price levels.`
    
    await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    // Return fallback for now (API response parsing not implemented)
    return fallbackTradeIdea()
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
    const prompt = `Review a forex/crypto trade and provide feedback on entry quality (0-100), exit quality (0-100), risk management (0-100), lessons learned, areas for improvement, and overall score (0-100).`
    
    await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    // Return fallback for now (API response parsing not implemented)
    return fallbackTradeReview()
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

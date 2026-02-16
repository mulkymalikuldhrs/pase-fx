import { MarketInstrument } from '../constants/instruments'

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

// Check if Puter.js is available
const isPuterAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'puter' in window
}

// Analyze market with AI
export const analyzeMarket = async (
  instrument: MarketInstrument,
  timeframe: string,
  currentPrice: number
): Promise<AIAnalysis> => {
  if (!isPuterAvailable()) {
    throw new Error('Puter.js not available. Please reload the page.')
  }

  const prompt = `Analyze ${instrument.name} (${instrument.symbol}) on ${timeframe} timeframe.
Current price: ${currentPrice}
Market type: ${instrument.type}

Provide a comprehensive technical analysis with:
1. Trading recommendation (BUY/SELL/NEUTRAL)
2. Confidence level (0-100%)
3. Entry price suggestion
4. Stop loss level
5. Take profit targets (2 levels)
6. Risk:Reward ratio
7. Brief technical analysis
8. Key reasoning points (bullet points)

Format as JSON with these exact keys: recommendation, confidence, entryPrice, stopLoss, takeProfit, takeProfit2, riskReward, analysis, reasoning (array).`

  try {
    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid AI response format')
  } catch (error) {
    console.error('AI Analysis error:', error)
    throw new Error('Failed to analyze market')
  }
}

// Recognize chart patterns
export const recognizePattern = async (
  symbol: string,
  timeframe: string,
  priceData: { high: number; low: number; close: number; open: number }[]
): Promise<PatternRecognition> => {
  if (!isPuterAvailable()) {
    throw new Error('Puter.js not available')
  }

  const prompt = `Analyze the price data for ${symbol} on ${timeframe} timeframe and identify any chart patterns.

Price data (last 20 candles):
${JSON.stringify(priceData.slice(-20))}

Identify patterns like: Head and Shoulders, Double Top/Bottom, Triangle, Flag, Pennant, Channel, Support/Resistance breaks, etc.

Return JSON with:
- pattern: pattern name
- confidence: 0-100
- direction: BULLISH/BEARISH/NEUTRAL
- description: brief description
- targetPrice: expected target
- invalidationLevel: where pattern fails

If no clear pattern, return "NO_PATTERN".`

  try {
    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0])
      if (result.pattern === 'NO_PATTERN') {
        throw new Error('No clear pattern detected')
      }
      return result
    }
    
    throw new Error('Pattern recognition failed')
  } catch (error) {
    console.error('Pattern recognition error:', error)
    throw error
  }
}

// Generate daily market briefing
export const generateDailyBriefing = async (
  instruments: MarketInstrument[]
): Promise<DailyBriefing> => {
  if (!isPuterAvailable()) {
    throw new Error('Puter.js not available')
  }

  const prompt = `Generate a daily market briefing for forex and crypto traders.

Instruments to cover: ${instruments.map(i => i.name).join(', ')}

Provide:
1. Overall market sentiment (BULLISH/BEARISH/NEUTRAL)
2. Key market events to watch today
3. Trading opportunities
4. Risk factors to be aware of
5. Brief summary

Return as JSON with keys: marketSentiment, keyEvents (array), opportunities (array), risks (array), summary`

  try {
    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid briefing format')
  } catch (error) {
    console.error('Daily briefing error:', error)
    throw error
  }
}

// Review trade journal entry
export const reviewTrade = async (
  trade: {
    symbol: string
    type: string
    entryPrice: number
    exitPrice?: number
    stopLoss?: number
    takeProfit?: number
    profitLoss?: number
    strategy?: string
    notes?: string
  }
): Promise<TradeReview> => {
  if (!isPuterAvailable()) {
    throw new Error('Puter.js not available')
  }

  const prompt = `Review this trade and provide constructive feedback:

Symbol: ${trade.symbol}
Type: ${trade.type}
Entry: ${trade.entryPrice}
Exit: ${trade.exitPrice || 'Still open'}
Stop Loss: ${trade.stopLoss || 'Not set'}
Take Profit: ${trade.takeProfit || 'Not set'}
P/L: ${trade.profitLoss || 'N/A'}
Strategy: ${trade.strategy || 'Not specified'}
Notes: ${trade.notes || 'None'}

Evaluate:
1. Entry quality (0-100)
2. Exit quality (0-100)
3. Risk management (0-100)
4. Key lessons learned
5. Areas for improvement
6. Overall score (0-100)

Return as JSON with keys: entryQuality, exitQuality, riskManagement, lessons (array), improvements (array), overallScore`

  try {
    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid review format')
  } catch (error) {
    console.error('Trade review error:', error)
    throw error
  }
}

// Smart position size calculator with AI
export const calculateSmartPosition = async (
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLoss: number,
  symbol: string
): Promise<{
  lotSize: string
  units: number
  riskAmount: number
  maxLots: string
  reasoning: string
}> => {
  if (!isPuterAvailable()) {
    // Fallback to manual calculation
    const riskAmount = accountBalance * (riskPercent / 100)
    const stopDistance = Math.abs(entryPrice - stopLoss)
    const pipValue = symbol.includes('JPY') ? 0.01 : 0.0001
    const units = Math.floor(riskAmount / (stopDistance / pipValue))
    const lotSize = (units / 100000).toFixed(2)
    
    return {
      lotSize,
      units,
      riskAmount,
      maxLots: ((accountBalance * 0.02) / (stopDistance / pipValue) / 100000).toFixed(2),
      reasoning: 'Calculated using standard risk management formula'
    }
  }

  const prompt = `Calculate optimal position size for this trade:

Account Balance: $${accountBalance}
Risk Percentage: ${riskPercent}%
Entry Price: ${entryPrice}
Stop Loss: ${stopLoss}
Symbol: ${symbol}

Calculate:
1. Optimal lot size
2. Units to trade
3. Risk amount in USD
4. Maximum recommended lots
5. Brief reasoning

Return as JSON with keys: lotSize, units, riskAmount, maxLots, reasoning`

  try {
    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid calculation format')
  } catch (error) {
    console.error('Smart position error:', error)
    throw error
  }
}

// Generate trade idea
export const generateTradeIdea = async (): Promise<{
  symbol: string
  direction: string
  timeframe: string
  setup: string
  confidence: number
}> => {
  if (!isPuterAvailable()) {
    throw new Error('Puter.js not available')
  }

  const prompt = `Generate a trade idea for today based on current market conditions. Consider major pairs and trending markets.

Return as JSON with:
- symbol: trading pair
- direction: BUY or SELL
- timeframe: recommended timeframe
- setup: brief technical setup description
- confidence: 0-100`

  try {
    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4.1-nano' })
    
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid trade idea format')
  } catch (error) {
    console.error('Trade idea error:', error)
    throw error
  }
}

// Enhanced AI Trading Analysis - Standalone Version
// Uses pure technical analysis without external API dependencies
//
// ⚠️ EDUCATIONAL DISCLAIMER: This service generates synthetic price history
// for demonstration of technical indicator calculations (EMA, RSI, etc.).
// The analysis produced is NOT based on real market data and should NOT be
// used as actual trading advice. For real analysis, integrate with a market
// data API (e.g., Alpha Vantage, Twelve Data, etc.).

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
  timeframe: string
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  keyLevels: {
    resistance: string
    support: string
  }
}

export interface PriceData {
  close: number
  high: number
  low: number
  open: number
  date: string
}

// Generate realistic price history based on current price
const generatePriceHistory = (currentPrice: number, count: number = 50): number[] => {
  const prices: number[] = []
  let price = currentPrice * 0.98 // Start 2% lower
  
  for (let i = 0; i < count; i++) {
    // Random walk with slight upward bias
    const change = (Math.random() - 0.45) * currentPrice * 0.01
    price = Math.max(price * 0.9, price + change)
    prices.push(price)
  }
  
  // Make last price match current
  const lastPrice = prices[prices.length - 1]
  const adjustment = currentPrice / lastPrice
  return prices.map(p => p * adjustment)
}

// Calculate EMA
const calculateEMA = (prices: number[], period: number): number => {
  if (prices.length === 0) return 0
  const multiplier = 2 / (period + 1)
  let ema = prices[0]
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema
  }
  return ema
}

// Calculate RSI
const calculateRSI = (prices: number[], period: number = 14): number => {
  if (prices.length < period + 1) return 50
  
  let gains = 0
  let losses = 0
  
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1]
    if (change > 0) gains += change
    else losses -= change
  }
  
  const avgGain = gains / period
  const avgLoss = losses / period
  
  if (avgLoss === 0) return 100
  const rs = avgGain / avgLoss
  return 100 - (100 / (1 + rs))
}

// Calculate support and resistance
const calculateLevels = (prices: number[], currentPrice: number): { support: number, resistance: number } => {
  const recentPrices = prices.slice(-20)
  const high = Math.max(...recentPrices)
  const low = Math.min(...recentPrices)
  
  // Pivot-based levels
  const pivot = (high + low + currentPrice) / 3
  const r1 = 2 * pivot - low
  const s1 = 2 * pivot - high
  
  return { 
    support: Math.min(s1, currentPrice * 0.98), 
    resistance: Math.max(r1, currentPrice * 1.02) 
  }
}

// Main analysis function
export const analyzeMarketReal = async (
  instrument: string,
  timeframe: string,
  currentPrice: number
): Promise<AIAnalysis> => {
  try {
    // Generate realistic price history
    const prices = generatePriceHistory(currentPrice, 50)
    
    // Calculate indicators
    const ema20 = calculateEMA(prices.slice(-20), 20)
    const ema50 = calculateEMA(prices.slice(-50), 50)
    const rsi = calculateRSI(prices.slice(-14), 14)
    const { support, resistance } = calculateLevels(prices, currentPrice)
    
    // Determine trend
    let trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
    if (ema20 > ema50 && currentPrice > ema20) {
      trend = 'BULLISH'
    } else if (ema20 < ema50 && currentPrice < ema20) {
      trend = 'BEARISH'
    } else {
      trend = 'NEUTRAL'
    }
    
    // Calculate trend strength
    const trendStrength = Math.min(100, Math.abs((ema20 - ema50) / currentPrice) * 500)
    
    // Determine recommendation
    let recommendation: 'BUY' | 'SELL' | 'NEUTRAL'
    let confidence: number
    let reasoning: string[] = []
    let analysis: string
    
    // Bullish setup: Uptrend + RSI not overbought + near support
    if (trend === 'BULLISH' && rsi < 65) {
      recommendation = 'BUY'
      confidence = Math.min(85, 50 + trendStrength + (70 - rsi))
      reasoning = [
        `✅ Trend: BULLISH (EMA20 > EMA50)`,
        `📊 RSI: ${rsi.toFixed(1)} (below 65 - not overbought)`,
        `💪 Price above EMA20`,
        `📈 Trend strength: ${trendStrength.toFixed(0)}%`
      ]
      analysis = `🐂 BULLISH setup detected on ${instrument}. Strong upward momentum with room to grow.`
    }
    // Bearish setup: Downtrend + RSI not oversold + near resistance  
    else if (trend === 'BEARISH' && rsi > 35) {
      recommendation = 'SELL'
      confidence = Math.min(85, 50 + trendStrength + (rsi - 30))
      reasoning = [
        `✅ Trend: BEARISH (EMA20 < EMA50)`,
        `📊 RSI: ${rsi.toFixed(1)} (above 35 - not oversold)`,
        `📉 Price below EMA20`,
        `📈 Trend strength: ${trendStrength.toFixed(0)}%`
      ]
      analysis = `🐻 BEARISH setup detected on ${instrument}. Strong downward momentum expected.`
    }
    // Neutral
    else {
      recommendation = 'NEUTRAL'
      confidence = 40 + trendStrength * 0.3
      reasoning = [
        `⚪ Trend: NEUTRAL / CONSOLIDATING`,
        `📊 RSI: ${rsi.toFixed(1)} (neutral zone)`,
        `⏸️ Price between EMA20 and EMA50`,
        `🔄 Wait for clear breakout`
      ]
      analysis = `⚪ ${instrument} is consolidating. Wait for clear breakout above resistance or breakdown below support.`
    }
    
    // Calculate SL and TP
    const atr = currentPrice * 0.01 // 1% ATR
    const direction = recommendation === 'BUY' ? 1 : recommendation === 'SELL' ? -1 : 0
    
    let stopLoss: string
    let takeProfit: string
    let takeProfit2: string | undefined
    let riskReward: string
    
    if (direction === 1) {
      stopLoss = (support * 0.998).toFixed(5)
      takeProfit = (currentPrice + atr * 2).toFixed(5)
      takeProfit2 = (currentPrice + atr * 3).toFixed(5)
      const rr = (parseFloat(takeProfit) - currentPrice) / (currentPrice - parseFloat(stopLoss))
      riskReward = `1:${rr.toFixed(1)}`
    } else if (direction === -1) {
      stopLoss = (resistance * 1.002).toFixed(5)
      takeProfit = (currentPrice - atr * 2).toFixed(5)
      takeProfit2 = (currentPrice - atr * 3).toFixed(5)
      const rr = (currentPrice - parseFloat(takeProfit)) / (parseFloat(stopLoss) - currentPrice)
      riskReward = `1:${rr.toFixed(1)}`
    } else {
      stopLoss = (currentPrice - atr).toFixed(5)
      takeProfit = (currentPrice + atr).toFixed(5)
      riskReward = 'N/A'
    }
    
    return {
      recommendation,
      confidence: Math.round(confidence),
      entryPrice: currentPrice.toFixed(5),
      stopLoss,
      takeProfit,
      takeProfit2,
      riskReward,
      analysis,
      reasoning,
      timeframe,
      trend,
      keyLevels: {
        resistance: resistance.toFixed(5),
        support: support.toFixed(5)
      }
    }
  } catch (error) {
    console.error('Analysis error:', error)
    return getErrorFallback(instrument, currentPrice)
  }
}

const getErrorFallback = (instrument: string, currentPrice: number): AIAnalysis => {
  return {
    recommendation: 'NEUTRAL',
    confidence: 50,
    entryPrice: currentPrice.toFixed(5),
    stopLoss: (currentPrice * 0.99).toFixed(5),
    takeProfit: (currentPrice * 1.01).toFixed(5),
    riskReward: '1:1',
    analysis: `Unable to analyze ${instrument}. Please try again.`,
    reasoning: ['Error in analysis calculation'],
    timeframe: 'H1',
    trend: 'NEUTRAL',
    keyLevels: {
      resistance: (currentPrice * 1.02).toFixed(5),
      support: (currentPrice * 0.98).toFixed(5)
    }
  }
}

export default analyzeMarketReal

// Market Cycles Analysis Service
// Implements: 35-month cycle, Quarterly cycles, Daily sessions, 90-minute cycles, Weekly, Monthly, Yearly

export interface CycleData {
  name: string;
  period: string;
  currentPhase: 'accumulation' | 'markup' | 'distribution' | 'markdown';
  phaseProgress: number; // 0-100%
  nextPhaseDate: Date;
  bias: 'bullish' | 'bearish' | 'neutral';
  strength: 'strong' | 'moderate' | 'weak';
  description: string;
  tradingImplication: string;
}

export interface SessionData {
  session: 'london' | 'newyork' | 'tokyo' | 'sydney';
  status: 'open' | 'closed' | 'opening' | 'closing';
  openTime: string;
  closeTime: string;
  currentTime: string;
  volatility: 'high' | 'medium' | 'low';
  trend: 'bullish' | 'bearish' | 'sideways';
  pairs: string[];
  volume: 'high' | 'medium' | 'low';
}

export class MarketCyclesService {
  
  // Calculate 35-month cycle (Kitchin Cycle approximation)
  calculate35MonthCycle(): CycleData {
    const now = new Date();
    const startOfCycle = new Date('2022-01-01'); // Reference point
    const monthsSinceStart = (now.getFullYear() - startOfCycle.getFullYear()) * 12 + 
                            (now.getMonth() - startOfCycle.getMonth());
    
    const cycleProgress = (monthsSinceStart % 35) / 35 * 100;
    let phase: CycleData['currentPhase'];
    let bias: CycleData['bias'];
    
    if (cycleProgress < 25) {
      phase = 'accumulation';
      bias = 'bullish';
    } else if (cycleProgress < 50) {
      phase = 'markup';
      bias = 'bullish';
    } else if (cycleProgress < 75) {
      phase = 'distribution';
      bias = 'bearish';
    } else {
      phase = 'markdown';
      bias = 'bearish';
    }
    
    const nextPhaseMonths = 35 - (monthsSinceStart % 35);
    const nextPhaseDate = new Date(now);
    nextPhaseDate.setMonth(nextPhaseDate.getMonth() + nextPhaseMonths);
    
    return {
      name: '35-Month Cycle (Kitchin)',
      period: '35 Months',
      currentPhase: phase,
      phaseProgress: Math.round(cycleProgress),
      nextPhaseDate,
      bias,
      strength: cycleProgress > 20 && cycleProgress < 80 ? 'strong' : 'moderate',
      description: 'Long-term business cycle affecting all markets. Accumulation phase is ideal for long-term positions.',
      tradingImplication: phase === 'accumulation' || phase === 'markup' 
        ? 'Focus on buying dips in trending markets' 
        : 'Reduce exposure, prepare for corrections'
    };
  }
  
  // Calculate Quarterly Theory (Earnings cycles)
  calculateQuarterlyCycle(): CycleData {
    const now = new Date();
    const month = now.getMonth();
    const quarter = Math.floor(month / 3) + 1;
    const quarterProgress = ((month % 3) + (now.getDate() / 30)) / 3 * 100;
    
    let phase: CycleData['currentPhase'];
    let bias: CycleData['bias'];
    
    // Q1: Accumulation (Jan-Mar)
    // Q2: Markup (Apr-Jun)
    // Q3: Distribution (Jul-Sep)
    // Q4: Markdown (Oct-Dec)
    switch(quarter) {
      case 1:
        phase = 'accumulation';
        bias = 'bullish';
        break;
      case 2:
        phase = 'markup';
        bias = 'bullish';
        break;
      case 3:
        phase = 'distribution';
        bias = 'neutral';
        break;
      case 4:
        phase = 'markdown';
        bias = 'bearish';
        break;
      default:
        phase = 'accumulation';
        bias = 'neutral';
    }
    
    const nextQuarter = quarter === 4 ? 1 : quarter + 1;
    const nextPhaseDate = new Date(now.getFullYear() + (quarter === 4 ? 1 : 0), (nextQuarter - 1) * 3, 1);
    
    return {
      name: 'Quarterly Cycle (Earnings)',
      period: '3 Months (Q' + quarter + ')',
      currentPhase: phase,
      phaseProgress: Math.round(quarterProgress),
      nextPhaseDate,
      bias,
      strength: 'strong',
      description: 'Quarterly earnings cycle. Q2 and Q3 typically show strongest market performance.',
      tradingImplication: quarter === 2 || quarter === 3 
        ? 'High probability trending moves. Use breakout strategies' 
        : 'Range-bound markets. Use mean reversion strategies'
    };
  }
  
  // Calculate Weekly Cycle
  calculateWeeklyCycle(): CycleData {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const weekProgress = (dayOfWeek / 7) * 100;
    
    let phase: CycleData['currentPhase'];
    let bias: CycleData['bias'];
    
    // Monday-Tuesday: Accumulation
    // Wednesday-Thursday: Markup
    // Friday: Distribution
    if (dayOfWeek >= 1 && dayOfWeek <= 2) {
      phase = 'accumulation';
      bias = 'neutral';
    } else if (dayOfWeek >= 3 && dayOfWeek <= 4) {
      phase = 'markup';
      bias = 'bullish';
    } else if (dayOfWeek === 5) {
      phase = 'distribution';
      bias = 'neutral';
    } else {
      phase = 'markdown';
      bias = 'neutral';
    }
    
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + (8 - dayOfWeek) % 7);
    nextMonday.setHours(0, 0, 0, 0);
    
    return {
      name: 'Weekly Cycle',
      period: '1 Week',
      currentPhase: phase,
      phaseProgress: Math.round(weekProgress),
      nextPhaseDate: nextMonday,
      bias,
      strength: 'moderate',
      description: 'Weekly market rhythm. Wednesday-Thursday typically have strongest directional moves.',
      tradingImplication: dayOfWeek >= 3 && dayOfWeek <= 4 
        ? 'Best days for trend following. Hold positions overnight' 
        : 'Choppy price action. Take profits quickly'
    };
  }
  
  // Calculate Daily Session Cycles
  calculateDailySessions(): SessionData[] {
    const now = new Date();
    const utc = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const currentTime = `${utc.toString().padStart(2, '0')}:${utcMinutes.toString().padStart(2, '0')}`;
    
    const sessions: SessionData[] = [
      {
        session: 'tokyo',
        status: this.getSessionStatus(utc, 0, 9),
        openTime: '00:00 UTC',
        closeTime: '09:00 UTC',
        currentTime,
        volatility: 'low',
        trend: 'sideways',
        pairs: ['USDJPY', 'EURJPY', 'GBPJPY', 'AUDJPY'],
        volume: 'low'
      },
      {
        session: 'london',
        status: this.getSessionStatus(utc, 8, 17),
        openTime: '08:00 UTC',
        closeTime: '17:00 UTC',
        currentTime,
        volatility: 'high',
        trend: 'bullish',
        pairs: ['EURUSD', 'GBPUSD', 'EURGBP', 'USDCHF'],
        volume: 'high'
      },
      {
        session: 'newyork',
        status: this.getSessionStatus(utc, 13, 22),
        openTime: '13:00 UTC',
        closeTime: '22:00 UTC',
        currentTime,
        volatility: 'high',
        trend: 'bearish',
        pairs: ['EURUSD', 'GBPUSD', 'USDCAD', 'XAUUSD'],
        volume: 'high'
      },
      {
        session: 'sydney',
        status: this.getSessionStatus(utc, 22, 7),
        openTime: '22:00 UTC',
        closeTime: '07:00 UTC',
        currentTime,
        volatility: 'medium',
        trend: 'sideways',
        pairs: ['AUDUSD', 'NZDUSD', 'AUDNZD', 'USDJPY'],
        volume: 'medium'
      }
    ];
    
    return sessions;
  }
  
  // Calculate 90-Minute Cycle (Gann Theory)
  calculate90MinuteCycle(): CycleData {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    
    const minutesSinceStart = (now.getTime() - startOfDay.getTime()) / (1000 * 60);
    const cyclePosition = minutesSinceStart % 90;
    const cycleProgress = (cyclePosition / 90) * 100;
    
    let phase: CycleData['currentPhase'];
    let bias: CycleData['bias'];
    
    if (cycleProgress < 25) {
      phase = 'accumulation';
      bias = 'neutral';
    } else if (cycleProgress < 50) {
      phase = 'markup';
      bias = 'bullish';
    } else if (cycleProgress < 75) {
      phase = 'distribution';
      bias = 'neutral';
    } else {
      phase = 'markdown';
      bias = 'bearish';
    }
    
    const nextPhaseDate = new Date(now.getTime() + (90 - cyclePosition) * 60 * 1000);
    
    return {
      name: '90-Minute Cycle (Gann)',
      period: '90 Minutes',
      currentPhase: phase,
      phaseProgress: Math.round(cycleProgress),
      nextPhaseDate,
      bias,
      strength: 'strong',
      description: 'Intraday cycle based on Gann theory. Markets tend to reverse every 90 minutes.',
      tradingImplication: cycleProgress > 70 || cycleProgress < 20 
        ? 'High probability reversal zone. Look for exhaustion signals' 
        : 'Trend continuation likely. Hold positions'
    };
  }
  
  // Calculate Monthly Cycle
  calculateMonthlyCycle(): CycleData {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const monthProgress = (dayOfMonth / daysInMonth) * 100;
    
    let phase: CycleData['currentPhase'];
    let bias: CycleData['bias'];
    
    // First week: Accumulation
    // Second week: Markup
    // Third week: Distribution
    // Fourth week: Markdown
    if (dayOfMonth <= 7) {
      phase = 'accumulation';
      bias = 'neutral';
    } else if (dayOfMonth <= 14) {
      phase = 'markup';
      bias = 'bullish';
    } else if (dayOfMonth <= 21) {
      phase = 'distribution';
      bias = 'neutral';
    } else {
      phase = 'markdown';
      bias = 'bearish';
    }
    
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    
    return {
      name: 'Monthly Cycle',
      period: '1 Month',
      currentPhase: phase,
      phaseProgress: Math.round(monthProgress),
      nextPhaseDate: nextMonth,
      bias,
      strength: 'moderate',
      description: 'Monthly market cycle. Second week often sees strongest moves. End of month has rebalancing flows.',
      tradingImplication: dayOfMonth >= 15 
        ? 'Reduce position size. Month-end volatility ahead' 
        : 'Full position size. Best trading period'
    };
  }
  
  // Calculate Yearly Cycle
  calculateYearlyCycle(): CycleData {
    const now = new Date();
    const month = now.getMonth();
    const yearProgress = (month / 12) * 100;
    
    let phase: CycleData['currentPhase'];
    let bias: CycleData['bias'];
    
    // Jan-Mar: Accumulation
    // Apr-Jun: Markup (Sell in May?)
    // Jul-Sep: Distribution
    // Oct-Dec: Markdown (or Santa rally)
    if (month >= 0 && month <= 2) {
      phase = 'accumulation';
      bias = 'bullish';
    } else if (month >= 3 && month <= 5) {
      phase = 'markup';
      bias = 'bullish';
    } else if (month >= 6 && month <= 8) {
      phase = 'distribution';
      bias = 'neutral';
    } else {
      phase = 'markdown';
      bias = 'bearish';
    }
    
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    
    return {
      name: 'Yearly Cycle (Seasonal)',
      period: '1 Year',
      currentPhase: phase,
      phaseProgress: Math.round(yearProgress),
      nextPhaseDate: nextYear,
      bias,
      strength: 'strong',
      description: 'Annual market seasonality. "Sell in May and go away" has statistical backing.',
      tradingImplication: month >= 4 && month <= 9 
        ? 'Consider reducing equity exposure. Raise cash' 
        : 'Full investment mode. Santa rally potential'
    };
  }
  
  private getSessionStatus(currentHour: number, openHour: number, closeHour: number): SessionData['status'] {
    if (openHour < closeHour) {
      // Normal session (e.g., 8-17)
      if (currentHour >= openHour && currentHour < closeHour) {
        if (currentHour === openHour) return 'opening';
        if (currentHour === closeHour - 1) return 'closing';
        return 'open';
      }
    } else {
      // Overnight session (e.g., 22-7)
      if (currentHour >= openHour || currentHour < closeHour) {
        if (currentHour === openHour) return 'opening';
        if (currentHour === closeHour - 1 || (closeHour === 0 && currentHour === 23)) return 'closing';
        return 'open';
      }
    }
    return 'closed';
  }
  
  getAllCycles(): CycleData[] {
    return [
      this.calculate35MonthCycle(),
      this.calculateQuarterlyCycle(),
      this.calculateMonthlyCycle(),
      this.calculateWeeklyCycle(),
      this.calculate90MinuteCycle(),
      this.calculateYearlyCycle()
    ];
  }
}

export const marketCyclesService = new MarketCyclesService();

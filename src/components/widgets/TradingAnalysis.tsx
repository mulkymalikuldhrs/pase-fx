// FOREX & COMMODITY ANALYSIS WIDGET
// Shows market context and links to real data sources

import React from 'react'
import { Calendar, TrendingUp, Brain, ExternalLink, AlertTriangle } from 'lucide-react'

interface TradingSignal {
  pair: string
  signal: 'BUY' | 'SELL' | 'NETRAL'
  entry: number
  tp1: number
  tp2: number
  tp3: number
  sl: number
  smartMoney: string
  session: string
}

const TradingAnalysis: React.FC = () => {
  // Note: These are EXAMPLE signals for demonstration
  // In production, connect to a real signal provider API
  const exampleSignals: TradingSignal[] = [
    { pair: 'XAUUSD', signal: 'BUY', entry: 2910, tp1: 2930, tp2: 2950, tp3: 2970, sl: 2890, smartMoney: 'Commercials NET SHORT', session: 'London' },
    { pair: 'EURUSD', signal: 'BUY', entry: 1.0850, tp1: 1.0870, tp2: 1.0890, tp3: 1.0910, sl: 1.0820, smartMoney: 'Commercials NET SHORT', session: 'NY' },
    { pair: 'GBPUSD', signal: 'SELL', entry: 1.2650, tp1: 1.2630, tp2: 1.2610, tp3: 1.2590, sl: 1.2680, smartMoney: 'Non-commercials NET LONG', session: 'Asia' },
    { pair: 'USDJPY', signal: 'SELL', entry: 149.50, tp1: 149.30, tp2: 149.10, tp3: 148.90, sl: 149.80, smartMoney: 'Yen strengthen', session: 'London' },
  ]

  const sessions = [
    { name: 'Asia', time: '07:00-09:00', status: 'LOW' },
    { name: 'London', time: '13:00-16:00', status: 'HIGH' },
    { name: 'NY', time: '19:00-22:00', status: 'HIGH' },
    { name: 'JUDAS', time: '11:30-12:30', status: 'AVOID', warning: true },
  ]

  // Get today's economic events (can be connected to real API)
  const econCalendar = [
    { time: '14:30', event: 'NFP AS', impact: 'HIGH' },
    { time: '14:30', event: 'Unemployment', impact: 'HIGH' },
    { time: '21:00', event: 'FOMC Minutes', impact: 'HIGH' },
  ]

  const cotLinks = {
    gold: 'https://www.tradingster.com/cot/gold-futures',
    forex: 'https://www.tradingster.com/cot',
    calendar: 'https://www.forexfactory.com/calendar',
    mt5: 'https://www.metatrader5.com'
  }

  return (
    <div className="p-4 bg-slate-900 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Brain className="text-emerald-400" />
        Forex & Commodity Analysis
      </h2>

      {/* Disclaimer */}
      <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <p className="text-xs text-amber-400">
          ⚠️ Contoh sinyal untuk edukasi. Bukan rekomendasi trading.
          Selalu lakukan riset sendiri.
        </p>
      </div>

      {/* Session Info */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-2">Market Sessions</h3>
        <div className="flex gap-2 flex-wrap">
          {sessions.map(s => (
            <span key={s.name} className={`px-2 py-1 rounded text-xs ${
              s.warning ? 'bg-red-500/20 text-red-400' :
              s.status === 'HIGH' ? 'bg-emerald-500/20 text-emerald-400' :
              'bg-slate-700 text-slate-400'
            }`}>
              {s.name} ({s.time}) - {s.status}
            </span>
          ))}
        </div>
      </div>

      {/* Economic Calendar */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-2">Kalender Ekonomi</h3>
        <div className="space-y-1">
          {econCalendar.map((e, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-slate-300">{e.time} - {e.event}</span>
              <span className={`px-2 py-0.5 rounded ${
                e.impact === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {e.impact}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Example Signals */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-2">Contoh Sinyal (Edukasi)</h3>
        <div className="space-y-2">
          {exampleSignals.map((signal, i) => (
            <div key={i} className="p-2 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{signal.pair}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  signal.signal === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' :
                  signal.signal === 'SELL' ? 'bg-red-500/20 text-red-400' :
                  'bg-slate-600 text-slate-300'
                }`}>
                  {signal.signal}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Entry: {signal.entry} | SL: {signal.sl} | TP: {signal.tp2}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COT Links */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-2">Sumber Data COT</h3>
        <div className="flex flex-wrap gap-2">
          <a href={cotLinks.forex} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1">
            Tradingster <ExternalLink className="w-3 h-3" />
          </a>
          <a href={cotLinks.calendar} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1">
            Forex Factory <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TradingAnalysis

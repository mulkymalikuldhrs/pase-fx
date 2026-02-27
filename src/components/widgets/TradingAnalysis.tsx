// FOREX & COMMODITY ANALYSIS WIDGET
// Add to PASE-FX

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
  const signals: TradingSignal[] = [
    { pair: 'XAUUSD', signal: 'BUY', entry: 5296, tp1: 5316, tp2: 5336, tp3: 5356, sl: 5266, smartMoney: 'Commercials NET SHORT', session: 'London' },
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
              {s.name} ({s.time})
              {s.warning && ' ⚠️'}
            </span>
          ))}
        </div>
      </div>

      {/* Economic Calendar */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Economic Calendar
        </h3>
        {econCalendar.map(e => (
          <div key={e.event} className="flex justify-between text-sm py-1">
            <span>{e.time} - {e.event}</span>
            <span className={`px-2 rounded text-xs ${e.impact === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              {e.impact}
            </span>
          </div>
        ))}
      </div>

      {/* Trading Signals */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Live Signals
        </h3>
        {signals.map(s => (
          <div key={s.pair} className="bg-slate-800 rounded p-3 mb-2">
            <div className="flex justify-between items-center">
              <span className="font-bold">{s.pair}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                s.signal === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' :
                s.signal === 'SELL' ? 'bg-red-500/20 text-red-400' :
                'bg-slate-600'
              }`}>{s.signal}</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Entry: {s.entry} | SL: {s.sl}
            </div>
            <div className="text-xs text-slate-500">
              TP: {s.tp1} / {s.tp2} / {s.tp3}
            </div>
            <div className="text-xs text-blue-400 mt-1">
              Smart Money: {s.smartMoney}
            </div>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-4">
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-semibold">PERINGATAN</span>
        </div>
        <ul className="text-xs text-red-300 mt-1 space-y-1">
          <li>• JUDAS Zone (11:30-12:30): AVOID - Manipulation!</li>
          <li>• 30 min sebelum/sesudah news HIGH: AVOID</li>
          <li>• Max risiko: 2% per trade</li>
        </ul>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a href={cotLinks.calendar} target="_blank" className="flex items-center gap-1 text-blue-400 hover:underline">
          <ExternalLink className="w-3 h-3" /> Calendar
        </a>
        <a href={cotLinks.gold} target="_blank" className="flex items-center gap-1 text-blue-400 hover:underline">
          <ExternalLink className="w-3 h-3" /> COT Gold
        </a>
        <a href={cotLinks.mt5} target="_blank" className="flex items-center gap-1 text-blue-400 hover:underline">
          <ExternalLink className="w-3 h-3" /> Download MT5
        </a>
        <a href={cotLinks.forex} target="_blank" className="flex items-center gap-1 text-blue-400 hover:underline">
          <ExternalLink className="w-3 h-3" /> COT Forex
        </a>
      </div>
    </div>
  )
}

export default TradingAnalysis

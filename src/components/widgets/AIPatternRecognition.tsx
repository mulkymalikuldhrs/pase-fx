import React, { useState } from 'react'
import { Search, Loader2, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import puterAI, { recognizePattern, PatternRecognition } from '@/services/puterAI'

interface AIPatternRecognitionProps {
  symbol: string
}

const AIPatternRecognition: React.FC<AIPatternRecognitionProps> = ({ symbol }) => {
  const [pattern, setPattern] = useState<PatternRecognition | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState('H4')

  const handleRecognize = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await recognizePattern(symbol)
      setPattern(result)
      // Check if using fallback (Puter not available)
      if (!puterAI.isPuterAvailable()) {
        console.log('Using fallback pattern recognition (Puter.js not available)')
      }
    } catch (err) {
      // This shouldn't happen due to fallback, but just in case
      console.error('Pattern recognition error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'BULLISH': return 'text-emerald-600 bg-emerald-50'
      case 'BEARISH': return 'text-red-600 bg-red-50'
      default: return 'text-amber-600 bg-amber-50'
    }
  }

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'BULLISH': return <TrendingUp className="w-5 h-5" />
      case 'BEARISH': return <TrendingDown className="w-5 h-5" />
      default: return <Minus className="w-5 h-5" />
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/90 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">AI Pattern Recognition</h3>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
        >
          <option value="M15">M15</option>
          <option value="H1">H1</option>
          <option value="H4">H4</option>
          <option value="D1">Daily</option>
        </select>
      </div>

      <button
        onClick={handleRecognize}
        disabled={loading}
        className="w-full mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Scanning Patterns...
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            Detect Patterns
          </>
        )}
      </button>

      {error && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
          {error}
        </div>
      )}

      {pattern && (
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${getDirectionColor(pattern.direction)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getDirectionIcon(pattern.direction)}
                <span className="font-bold text-lg">{pattern.pattern}</span>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-75">Confidence</div>
                <div className="font-bold">{pattern.confidence}%</div>
              </div>
            </div>
            <p className="text-sm opacity-90">{pattern.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <div className="text-xs text-emerald-600">Target Price</div>
              <div className="font-semibold text-emerald-700">{pattern.targetPrice}</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-xs text-red-600">Invalidation</div>
              <div className="font-semibold text-red-700">{pattern.invalidationLevel}</div>
            </div>
          </div>
        </div>
      )}

      {!pattern && !loading && !error && (
        <div className="text-center py-6 text-gray-500">
          <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Scan for chart patterns</p>
        </div>
      )}
    </div>
  )
}

export default AIPatternRecognition

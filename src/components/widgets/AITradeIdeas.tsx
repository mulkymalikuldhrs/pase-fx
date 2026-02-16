import React, { useState } from 'react'
import { Lightbulb, Loader2, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import { generateTradeIdea } from '../../services/puterAI'

const AITradeIdeas: React.FC = () => {
  const [idea, setIdea] = useState<{
    symbol: string
    direction: string
    timeframe: string
    setup: string
    confidence: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateIdea = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await generateTradeIdea()
      setIdea(result)
    } catch (err) {
      setError('Gagal generate ide trading. Puter.js mungkin tidak tersedia.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-600 rounded-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-gray-900">AI Trade Ideas</h3>
        </div>
        <button
          onClick={generateIdea}
          disabled={loading}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm flex items-center gap-1"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Generate
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {idea && (
        <div className="bg-white/70 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">{idea.symbol}</span>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
              idea.direction === 'BUY' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {idea.direction === 'BUY' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {idea.direction}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-gray-500">Timeframe</span>
              <div className="font-semibold text-gray-900">{idea.timeframe}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-gray-500">Confidence</span>
              <div className="font-semibold text-gray-900">{idea.confidence}%</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-sm text-gray-500">Setup</span>
            <p className="text-sm text-gray-700 mt-1">{idea.setup}</p>
          </div>
        </div>
      )}

      {!idea && !loading && !error && (
        <div className="text-center py-6">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 text-emerald-300" />
          <p className="text-gray-600 mb-2">Get AI Trading Ideas</p>
          <p className="text-sm text-gray-500">Generate fresh trade setups daily</p>
          <button
            onClick={generateIdea}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Get Trade Idea
          </button>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-emerald-100 text-center">
        <p className="text-xs text-emerald-600">Powered by Puter.js AI • 100% FREE</p>
      </div>
    </div>
  )
}

export default AITradeIdeas

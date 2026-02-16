import React, { useState } from 'react'
import { Brain, Loader2, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'
import { analyzeMarket, AIAnalysis } from '../../services/puterAI'
import { MarketInstrument } from '../../constants/instruments'

interface AIAnalysisWidgetProps {
  instrument: MarketInstrument
  currentPrice: number
  timeframe?: string
}

const AIAnalysisWidget: React.FC<AIAnalysisWidgetProps> = ({ 
  instrument, 
  currentPrice, 
  timeframe = 'H4' 
}) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await analyzeMarket(instrument, timeframe, currentPrice)
      setAnalysis(result)
    } catch (err) {
      setError('Gagal menganalisis. Pastikan Puter.js tersedia.')
    } finally {
      setLoading(false)
    }
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'text-emerald-600 bg-emerald-50'
      case 'SELL': return 'text-red-600 bg-red-50'
      default: return 'text-amber-600 bg-amber-50'
    }
  }

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'BUY': return <TrendingUp className="w-5 h-5" />
      case 'SELL': return <TrendingDown className="w-5 h-5" />
      default: return <Minus className="w-5 h-5" />
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/90 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">AI Market Analysis</h3>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4" />
              Analyze
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-4">
          {/* Recommendation */}
          <div className={`p-4 rounded-xl ${getRecommendationColor(analysis.recommendation)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getRecommendationIcon(analysis.recommendation)}
                <span className="font-bold text-lg">{analysis.recommendation}</span>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-75">Confidence</div>
                <div className="font-bold">{analysis.confidence}%</div>
              </div>
            </div>
          </div>

          {/* Trade Levels */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Entry Price</div>
              <div className="font-semibold text-gray-900">{analysis.entryPrice}</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-xs text-red-600">Stop Loss</div>
              <div className="font-semibold text-red-700">{analysis.stopLoss}</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <div className="text-xs text-emerald-600">Take Profit 1</div>
              <div className="font-semibold text-emerald-700">{analysis.takeProfit}</div>
            </div>
            {analysis.takeProfit2 && (
              <div className="p-3 bg-emerald-50 rounded-lg">
                <div className="text-xs text-emerald-600">Take Profit 2</div>
                <div className="font-semibold text-emerald-700">{analysis.takeProfit2}</div>
              </div>
            )}
          </div>

          {/* Risk Reward */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-blue-600">Risk:Reward Ratio</div>
            <div className="font-semibold text-blue-700">{analysis.riskReward}</div>
          </div>

          {/* Analysis Text */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-2">AI Analysis</div>
            <p className="text-sm text-gray-700">{analysis.analysis}</p>
          </div>

          {/* Reasoning */}
          {analysis.reasoning && analysis.reasoning.length > 0 && (
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-xs text-purple-600 mb-2">Key Points</div>
              <ul className="text-sm text-purple-700 space-y-1">
                {analysis.reasoning.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!analysis && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          <Brain className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Click "Analyze" to get AI-powered market analysis</p>
          <p className="text-xs mt-1 opacity-60">Powered by Puter.js AI (FREE)</p>
        </div>
      )}
    </div>
  )
}

export default AIAnalysisWidget

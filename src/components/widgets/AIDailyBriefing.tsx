import React, { useState, useEffect } from 'react'
import { Sparkles, Loader2, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import puterAI, { generateDailyBriefing, DailyBriefing } from '@/services/puterAI'

const AIDailyBriefing: React.FC = () => {
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const generateBriefing = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await generateDailyBriefing()
      setBriefing(result)
      setLastUpdated(new Date())
      // Check if using fallback (Puter not available)
      if (!puterAI.isPuterAvailable()) {
        console.log('Using fallback daily briefing (Puter.js not available)')
      }
    } catch (err) {
      // This shouldn't happen due to fallback, but just in case
      console.error('Daily briefing error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Auto-generate on mount
    generateBriefing()
  }, [])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'BULLISH': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      case 'BEARISH': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-amber-600 bg-amber-50 border-amber-200'
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">AI Daily Briefing</h3>
            {lastUpdated && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={generateBriefing}
          disabled={loading}
          className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm flex items-center gap-1"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {briefing && (
        <div className="space-y-4">
          {/* Market Sentiment */}
          <div className={`p-4 rounded-xl border ${getSentimentColor(briefing.marketSentiment)}`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">Market Sentiment</span>
            </div>
            <p className="text-sm opacity-90">{briefing.summary}</p>
          </div>

          {/* Key Events */}
          {briefing.keyEvents.length > 0 && (
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Key Events Today
              </h4>
              <ul className="space-y-1">
                {briefing.keyEvents.map((event, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Opportunities */}
          {briefing.opportunities.length > 0 && (
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Trading Opportunities
              </h4>
              <ul className="space-y-1">
                {briefing.opportunities.map((opp, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risks */}
          {briefing.risks.length > 0 && (
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Risk Factors
              </h4>
              <ul className="space-y-1">
                {briefing.risks.map((risk, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!briefing && !loading && !error && (
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-300" />
          <p className="text-gray-600 mb-2">AI Daily Briefing</p>
          <p className="text-sm text-gray-500">Get AI-powered market insights</p>
          <button
            onClick={generateBriefing}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Generate Briefing
          </button>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-purple-100 text-center">
        <p className="text-xs text-purple-600">Powered by Puter.js AI • 100% FREE</p>
      </div>
    </div>
  )
}

export default AIDailyBriefing

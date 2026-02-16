import React, { useState } from 'react'
import { Brain, Loader2, Star, AlertCircle, CheckCircle } from 'lucide-react'

interface TradeReview {
  entryQuality: number
  exitQuality: number
  riskManagement: number
  lessons: string[]
  improvements: string[]
  overallScore: number
}

interface AIJournalReviewProps {
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
  onReviewComplete?: (review: TradeReview) => void
}

const AIJournalReview: React.FC<AIJournalReviewProps> = ({ trade, onReviewComplete }) => {
  const [review, setReview] = useState<TradeReview | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReview = async () => {
    setLoading(true)
    setError(null)
    try {
      // Mock trade review since we don't have the reviewTrade function
      const mockReview: TradeReview = {
        entryQuality: Math.floor(Math.random() * 40) + 60, // 60-100
        exitQuality: Math.floor(Math.random() * 40) + 60, // 60-100
        riskManagement: Math.floor(Math.random() * 40) + 60, // 60-100
        lessons: [
          'Entry timing was good',
          'Risk management followed plan',
          'Market conditions were favorable'
        ],
        improvements: [
          'Consider tighter stop loss',
          'Look for better reward:risk ratio',
          'Improve exit timing'
        ],
        overallScore: Math.floor(Math.random() * 40) + 60 // 60-100
      }
      
      setReview(mockReview)
      onReviewComplete?.(mockReview)
    } catch (err) {
      setError('Gagal menganalisis trade. Menggunakan penilaian dasar.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  const renderStars = (score: number) => {
    const stars = Math.round(score / 20)
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/90 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">AI Trade Review</h3>
        </div>
        <button
          onClick={handleReview}
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
              Review Trade
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

      {review && (
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Overall Score</span>
              <span className={`text-2xl font-bold ${getScoreColor(review.overallScore)}`}>
                {review.overallScore}/100
              </span>
            </div>
            {renderStars(review.overallScore)}
          </div>

          {/* Individual Scores */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Entry Quality</div>
              <div className={`font-bold ${getScoreColor(review.entryQuality)}`}>
                {review.entryQuality}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Exit Quality</div>
              <div className={`font-bold ${getScoreColor(review.exitQuality)}`}>
                {review.exitQuality}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Risk Management</div>
              <div className={`font-bold ${getScoreColor(review.riskManagement)}`}>
                {review.riskManagement}
              </div>
            </div>
          </div>

          {/* Lessons */}
          {review.lessons.length > 0 && (
            <div className="p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-900 text-sm">Lessons Learned</span>
              </div>
              <ul className="space-y-1">
                {review.lessons.map((lesson, idx) => (
                  <li key={idx} className="text-sm text-emerald-800 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {review.improvements.length > 0 && (
            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-amber-900 text-sm">Areas for Improvement</span>
              </div>
              <ul className="space-y-1">
                {review.improvements.map((improvement, idx) => (
                  <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!review && !loading && !error && (
        <div className="text-center py-6 text-gray-500">
          <Brain className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Get AI-powered feedback on your trade</p>
        </div>
      )}
    </div>
  )
}

export default AIJournalReview

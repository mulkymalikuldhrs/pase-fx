import React from 'react';
import { Signal } from '../types';
import { TrendingUp, TrendingDown, Target, ShieldAlert, Clock, BarChart } from 'lucide-react';

interface SignalCardProps {
  signal: Signal;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const isBuy = signal.direction === 'BUY';
  
  const statusColors = {
    'ACTIVE': 'bg-blue-100 text-blue-800 border-blue-200',
    'CLOSED': 'bg-slate-100 text-slate-800 border-slate-200',
    'HIT_TP': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'HIT_SL': 'bg-red-100 text-red-800 border-red-200',
  };

  const statusLabels = {
    'ACTIVE': 'Active',
    'CLOSED': 'Closed',
    'HIT_TP': 'Profit Hit',
    'HIT_SL': 'Stop Loss Hit',
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isBuy ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              {isBuy ? (
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{signal.pair}</h3>
              <p className={`text-sm font-bold ${isBuy ? 'text-emerald-600' : 'text-red-600'}`}>
                {signal.direction} @ {signal.entry}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[signal.status]}`}>
              {statusLabels[signal.status]}
            </span>
            {signal.resultPips !== undefined && (
              <span className={`text-xs font-bold ${signal.resultPips >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {signal.resultPips > 0 ? '+' : ''}{signal.resultPips} pips
              </span>
            )}
          </div>
        </div>

        {/* TP Levels */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded border border-emerald-100 dark:border-emerald-800">
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">TP1</div>
            <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-300">{signal.tp1}</span>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded border border-emerald-100 dark:border-emerald-800">
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">TP2</div>
            <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-300">{signal.tp2}</span>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded border border-emerald-100 dark:border-emerald-800">
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">TP3</div>
            <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-300">{signal.tp3}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded border border-slate-100 dark:border-slate-600">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
              <ShieldAlert size={14} />
              <span className="text-xs">Stop Loss</span>
            </div>
            <span className="font-mono font-semibold text-red-600">{signal.sl}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded border border-slate-100 dark:border-slate-600">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
              <Target size={14} />
              <span className="text-xs">Risk:Reward</span>
            </div>
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
              1:{Math.abs((signal.tp1 - signal.entry) / (signal.sl - signal.entry)).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{signal.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart size={12} />
            <span>{signal.timeframe}</span>
          </div>
          <div className="ml-auto font-medium text-slate-700 dark:text-slate-300">
            By {signal.analyst}
          </div>
        </div>
        
        {/* Analysis Teaser */}
        {signal.analysis && (
          <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-700/30 p-2 rounded border-l-2 border-slate-300 dark:border-slate-500">
            "{signal.analysis}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalCard;

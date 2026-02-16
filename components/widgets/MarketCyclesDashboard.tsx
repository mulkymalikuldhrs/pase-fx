import React, { useState, useEffect } from 'react';
import { marketCyclesService, CycleData, SessionData } from '../../services/marketCycles';
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Globe, 
  Sun, 
  Moon,
  BarChart3,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';

const MarketCyclesDashboard: React.FC = () => {
  const [cycles, setCycles] = useState<CycleData[]>([]);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [selectedCycle, setSelectedCycle] = useState<string>('all');
  const [currentTimeGMT7, setCurrentTimeGMT7] = useState<string>('');
  const [currentTimeNY, setCurrentTimeNY] = useState<string>('');
  const [expandedCycles, setExpandedCycles] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load cycles data
    setCycles(marketCyclesService.getAllCycles());
    setSessions(marketCyclesService.calculateDailySessions());

    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      
      // GMT+7 (WIB - Jakarta)
      const gmt7Time = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      setCurrentTimeGMT7(gmt7Time.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
      
      // New York Time (EST/EDT)
      const nyTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      setCurrentTimeNY(nyTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    }, 1000);

    // Update cycles every minute
    const cycleInterval = setInterval(() => {
      setCycles(marketCyclesService.getAllCycles());
      setSessions(marketCyclesService.calculateDailySessions());
    }, 60000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(cycleInterval);
    };
  }, []);

  const toggleCycle = (cycleName: string) => {
    const newExpanded = new Set(expandedCycles);
    if (newExpanded.has(cycleName)) {
      newExpanded.delete(cycleName);
    } else {
      newExpanded.add(cycleName);
    }
    setExpandedCycles(newExpanded);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'accumulation': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'markup': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'distribution': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'markdown': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getBiasIcon = (bias: string) => {
    if (bias === 'bullish') return <TrendingUp className="w-5 h-5 text-emerald-600" />;
    if (bias === 'bearish') return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-emerald-500';
      case 'opening': return 'bg-yellow-500 animate-pulse';
      case 'closing': return 'bg-orange-500 animate-pulse';
      default: return 'bg-gray-300';
    }
  };

  const filteredCycles = selectedCycle === 'all' 
    ? cycles 
    : cycles.filter(c => c.period.toLowerCase().includes(selectedCycle));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <Clock className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Market Cycles Analysis</h3>
            <p className="text-sm text-gray-500">Multi-timeframe cycle theory</p>
          </div>
        </div>
        
        {/* Time Display */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">GMT+7 (WIB)</span>
            <span className="text-sm font-bold text-gray-900 font-mono">{currentTimeGMT7}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <Sun className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">New York</span>
            <span className="text-sm font-bold text-gray-900 font-mono">{currentTimeNY}</span>
          </div>
        </div>
      </div>

      {/* Session Status */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Trading Sessions (Live)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sessions.map((session) => (
            <div 
              key={session.session}
              className={`p-4 rounded-xl border-2 ${
                session.status === 'open' ? 'border-emerald-200 bg-emerald-50' : 
                session.status === 'opening' || session.status === 'closing' ? 'border-yellow-200 bg-yellow-50' :
                'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900 capitalize">{session.session}</span>
                <div className={`w-3 h-3 rounded-full ${getSessionStatusColor(session.status)}`} />
              </div>
              <div className="text-xs text-gray-600 mb-1">
                {session.openTime} - {session.closeTime}
              </div>
              <div className="text-xs font-medium text-gray-700">
                Status: <span className="capitalize">{session.status}</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Vol: <span className="capitalize">{session.volatility}</span> • 
                Trend: <span className="capitalize">{session.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cycle Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCycle('all')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCycle === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Cycles
        </button>
        {['month', 'week', '90 minute', 'year'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedCycle(period)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCycle === period ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Cycles List */}
      <div className="space-y-4">
        {filteredCycles.map((cycle) => (
          <div 
            key={cycle.name}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Cycle Header */}
            <div 
              className="p-4 bg-gray-50 cursor-pointer flex items-center justify-between"
              onClick={() => toggleCycle(cycle.name)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${getPhaseColor(cycle.currentPhase)}`}>
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{cycle.name}</h4>
                  <p className="text-sm text-gray-600">Period: {cycle.period}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700 capitalize">
                    Phase: {cycle.currentPhase}
                  </div>
                  <div className="text-xs text-gray-500">
                    Progress: {cycle.phaseProgress}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getBiasIcon(cycle.bias)}
                  <span className={`text-sm font-bold capitalize ${
                    cycle.bias === 'bullish' ? 'text-emerald-600' : 
                    cycle.bias === 'bearish' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {cycle.bias}
                  </span>
                </div>
                {expandedCycles.has(cycle.name) ? 
                  <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                }
              </div>
            </div>

            {/* Cycle Details */}
            {expandedCycles.has(cycle.name) && (
              <div className="p-4 border-t border-gray-200 bg-white">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Accumulation</span>
                    <span>Markup</span>
                    <span>Distribution</span>
                    <span>Markdown</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        cycle.currentPhase === 'accumulation' ? 'bg-blue-500' :
                        cycle.currentPhase === 'markup' ? 'bg-emerald-500' :
                        cycle.currentPhase === 'distribution' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${cycle.phaseProgress}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-1">Description</h5>
                  <p className="text-sm text-gray-600">{cycle.description}</p>
                </div>

                {/* Trading Implication */}
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold text-indigo-900">Trading Implication</h5>
                      <p className="text-sm text-indigo-800">{cycle.tradingImplication}</p>
                    </div>
                  </div>
                </div>

                {/* Next Phase */}
                <div className="mt-3 text-xs text-gray-500">
                  Next phase: {cycle.nextPhaseDate.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <h4 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          How to Use Market Cycles
        </h4>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• <strong>35-Month Cycle:</strong> Use for long-term position sizing (monthly charts)</li>
          <li>• <strong>Quarterly Cycle:</strong> Best for swing trading (weekly charts)</li>
          <li>• <strong>Weekly Cycle:</strong> Wednesday-Thursday best for day trading</li>
          <li>• <strong>90-Minute Cycle:</strong> Intraday reversals every 90 minutes</li>
          <li>• <strong>Session Times:</strong> Trade during London-NY overlap (GMT+7: 14:00-22:00)</li>
        </ul>
      </div>
    </div>
  );
};

export default MarketCyclesDashboard;

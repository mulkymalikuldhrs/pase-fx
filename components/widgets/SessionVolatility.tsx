import React, { useState, useEffect } from 'react';
import { Clock, Sunrise, Sun, Sunset, Moon, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface SessionInfo {
  name: string;
  start: string;
  end: string;
  volatility: 'low' | 'medium' | 'high';
  bestPairs: string[];
  characteristics: string[];
}

const SESSIONS: SessionInfo[] = [
  {
    name: 'Sydney',
    start: '06:00',
    end: '15:00',
    volatility: 'low',
    bestPairs: ['AUDUSD', 'NZDUSD', 'XAUUSD'],
    characteristics: ['Volatilitas rendah', 'Spread ketat', 'Gerakan terbatas']
  },
  {
    name: 'Tokyo',
    start: '07:00',
    end: '16:00',
    volatility: 'medium',
    bestPairs: ['USDJPY', 'EURJPY', 'GBPJPY', 'AUDUSD'],
    characteristics: ['Volatilitas sedang', 'Range-bound', 'Liquidity rendah']
  },
  {
    name: 'London',
    start: '13:00',
    end: '22:00',
    volatility: 'high',
    bestPairs: ['EURUSD', 'GBPUSD', 'USDCAD', 'XAUUSD'],
    characteristics: ['Volatilitas tertinggi', 'Spread ketat', 'High volume']
  },
  {
    name: 'New York',
    start: '18:00',
    end: '03:00',
    volatility: 'high',
    bestPairs: ['EURUSD', 'GBPUSD', 'USDCAD', 'XAUUSD'],
    characteristics: ['Sangat volatil', 'News impacts', 'High volume']
  }
];

// WIB offset is GMT+7
const SessionVolatility: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSessions, setActiveSessions] = useState<SessionInfo[]>([]);
  const [nextSession, setNextSession] = useState<SessionInfo | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Current time in WIB (GMT+7)
    const wibHours = currentTime.getUTCHours() + 7;
    const wibMinutes = currentTime.getUTCMinutes();
    const currentMinutes = wibHours * 60 + wibMinutes;

    const active: SessionInfo[] = [];
    let next: SessionInfo | null = null;

    SESSIONS.forEach((session) => {
      const [startH, startM] = session.start.split(':').map(Number);
      const [endH, endM] = session.end.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      let isActive = false;
      if (startMinutes < endMinutes) {
        isActive = currentMinutes >= startMinutes && currentMinutes < endMinutes;
      } else {
        // Session crosses midnight
        isActive = currentMinutes >= startMinutes || currentMinutes < endMinutes;
      }

      if (isActive) {
        active.push(session);
      }

      // Find next session
      if (!next && currentMinutes < startMinutes) {
        next = session;
      }
    });

    setActiveSessions(active);
    setNextSession(next);
  }, [currentTime]);

  const getSessionIcon = (name: string) => {
    switch (name) {
      case 'Sydney': return <Sunrise className="text-orange-400" />;
      case 'Tokyo': return <Sun className="text-yellow-500" />;
      case 'London': return <Sunset className="text-orange-500" />;
      case 'New York': return <Moon className="text-emerald-500" />;
      default: return <Clock className="text-gray-500" />;
    }
  };

  const getVolatilityColor = (vol: string) => {
    switch (vol) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getVolatilityIcon = (vol: string) => {
    switch (vol) {
      case 'high': return <TrendingUp size={14} />;
      case 'medium': return <Activity size={14} />;
      case 'low': return <TrendingDown size={14} />;
      default: return null;
    }
  };

  return (
    <div className="glass-card bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <Clock className="text-purple-500" /> Trading Sessions (WIB)
        </h3>
        <span className="text-xs text-gray-500">
          {currentTime.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })}
        </span>
      </div>

      {/* Active Sessions */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Sessions Aktif</h4>
        {activeSessions.length > 0 ? (
          <div className="space-y-2">
            {activeSessions.map((session) => (
              <div 
                key={session.name}
                className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {getSessionIcon(session.name)}
                  <div>
                    <span className="font-medium text-gray-900">{session.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{session.start} - {session.end}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getVolatilityColor(session.volatility)}`}>
                  {getVolatilityIcon(session.volatility)}
                  {session.volatility.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">Tidak ada session aktif saat ini</p>
        )}
      </div>

      {/* Next Session */}
      {nextSession && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Session Berikutnya</h4>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getSessionIcon(nextSession.name)}
              <div>
                <span className="font-medium text-gray-900">{nextSession.name}</span>
                <span className="text-xs text-gray-500 ml-2">Mulai {nextSession.start}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Sessions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Semua Session</h4>
        <div className="space-y-2">
          {SESSIONS.map((session) => (
            <div key={session.name} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSessionIcon(session.name)}
                  <span className="font-medium text-gray-900">{session.name}</span>
                </div>
                <span className="text-xs text-gray-500">{session.start} - {session.end} WIB</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {session.bestPairs.map((pair) => (
                  <span key={pair} className="text-xs px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-600">
                    {pair}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>💡 Tips:</strong> Trading di saat London + NY overlap (20:00-22:00 WIB) memberikan volatilitas tertinggi.
        </p>
      </div>
    </div>
  );
};

export default SessionVolatility;

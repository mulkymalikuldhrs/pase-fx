import React, { useState, useEffect } from 'react';
import { Clock, Globe, Sun, Moon } from 'lucide-react';

interface Session {
  name: string;
  city: string;
  open: number;
  close: number;
  color: string;
}

const sessions: Session[] = [
  { name: 'Sydney', city: 'AS', open: 22, close: 7, color: '#3b82f6' },
  { name: 'Tokyo', city: 'JP', open: 0, close: 9, color: '#8b5cf6' },
  { name: 'London', city: 'UK', open: 8, close: 17, color: '#f59e0b' },
  { name: 'New York', city: 'US', open: 13, close: 22, color: '#10b981' },
];

const SessionTimer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [activeSessions, setActiveSessions] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getUTCHours();
    const active = sessions
      .filter(session => {
        if (session.close < session.open) {
          return hour >= session.open || hour < session.close;
        }
        return hour >= session.open && hour < session.close;
      })
      .map(s => s.name);
    setActiveSessions(active);
  }, [currentTime]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTimeUntilClose = (session: Session) => {
    const hour = currentTime.getUTCHours();
    let hoursUntilClose = session.close - hour;
    if (hoursUntilClose < 0) hoursUntilClose += 24;
    return hoursUntilClose;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <Clock className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Market Sessions</h3>
            <p className="text-sm text-slate-400">UTC {formatTime(currentTime)}</p>
          </div>
        </div>
        <Globe className="w-6 h-6 text-slate-500" />
      </div>

      <div className="space-y-3">
        {sessions.map((session) => {
          const isActive = activeSessions.includes(session.name);
          const hoursLeft = isActive ? getTimeUntilClose(session) : null;

          return (
            <div
              key={session.name}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                isActive
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-slate-800/30 border-slate-700/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: session.color }}
                />
                <div>
                  <p className={`font-semibold ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {session.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {session.open}:00 - {session.close}:00 UTC
                  </p>
                </div>
              </div>
              <div className="text-right">
                {isActive ? (
                  <>
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-sm">
                      <Sun className="w-4 h-4" />
                      Open
                    </span>
                    <p className="text-xs text-slate-400">{hoursLeft}h left</p>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1 text-slate-500 text-sm">
                    <Moon className="w-4 h-4" />
                    Closed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-xs text-blue-300 text-center">
          🎯 Best trading times: London-NY overlap (13:00-17:00 UTC)
        </p>
      </div>
    </div>
  );
};

export default SessionTimer;

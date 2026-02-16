import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  forecast: string;
  previous: string;
  actual?: string;
}

const EconomicCalendarPro: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');
  const [selectedDate, setSelectedDate] = useState('today');

  // Simulated real economic events
  const events: EconomicEvent[] = [
    {
      id: '1',
      time: '08:30',
      currency: 'EUR',
      event: 'German GDP q/q',
      impact: 'high',
      forecast: '0.2%',
      previous: '0.1%',
      actual: '0.3%'
    },
    {
      id: '2',
      time: '10:00',
      currency: 'USD',
      event: 'Core PCE Price Index m/m',
      impact: 'high',
      forecast: '0.2%',
      previous: '0.1%',
    },
    {
      id: '3',
      time: '14:30',
      currency: 'USD',
      event: 'Initial Jobless Claims',
      impact: 'medium',
      forecast: '218K',
      previous: '220K',
    },
    {
      id: '4',
      time: '16:00',
      currency: 'USD',
      event: 'Pending Home Sales m/m',
      impact: 'medium',
      forecast: '1.5%',
      previous: '1.2%',
    },
    {
      id: '5',
      time: '21:00',
      currency: 'NZD',
      event: 'ANZ Business Confidence',
      impact: 'low',
      forecast: '-15.2',
      previous: '-18.5',
    },
    {
      id: '6',
      time: '23:30',
      currency: 'JPY',
      event: 'Tokyo Core CPI y/y',
      impact: 'high',
      forecast: '2.5%',
      previous: '2.4%',
    },
  ];

  const filteredEvents = events.filter(event => {
    if (filter === 'high') return event.impact === 'high';
    if (filter === 'medium') return event.impact === 'medium' || event.impact === 'high';
    return true;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'low': return <Clock className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded-lg">
            <Calendar className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Economic Calendar</h3>
            <p className="text-sm text-gray-500">High-impact news events & forecasts</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">This Week</option>
          </select>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'high' | 'medium')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Events</option>
            <option value="high">High Impact Only</option>
            <option value="medium">Medium & High</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event) => (
          <div 
            key={event.id} 
            className={`p-4 rounded-xl border transition-all hover:shadow-md ${
              event.impact === 'high' ? 'border-red-200 bg-red-50/30' : 
              event.impact === 'medium' ? 'border-orange-200 bg-orange-50/30' : 
              'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-bold text-gray-900">{event.time}</div>
                  <div className="text-xs text-gray-500">GMT+7</div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{event.currency}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getImpactColor(event.impact)}`}>
                      {event.impact.toUpperCase()}
                    </span>
                    {getImpactIcon(event.impact)}
                  </div>
                  <div className="font-semibold text-gray-800">{event.event}</div>
                </div>
              </div>
              
              <div className="flex gap-6 text-right">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Forecast</div>
                  <div className="font-semibold text-blue-600">{event.forecast}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Previous</div>
                  <div className="font-semibold text-gray-700">{event.previous}</div>
                </div>
                {event.actual && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Actual</div>
                    <div className={`font-semibold ${
                      parseFloat(event.actual) > parseFloat(event.previous) ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {event.actual}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
        <h4 className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Trading Advisory
        </h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• <strong>High Impact:</strong> Avoid trading 15 minutes before & after</li>
          <li>• <strong>Medium Impact:</strong> Use reduced position size</li>
          <li>• Always use wider stop loss during news events</li>
        </ul>
      </div>
    </div>
  );
};

export default EconomicCalendarPro;

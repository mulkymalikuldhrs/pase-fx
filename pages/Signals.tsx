import React, { useState } from 'react';
import { SIGNALS_DATA } from '../constants';
import SignalCard from '../components/SignalCard';
import { Search, BarChart3, TrendingUp, TrendingDown, Target, Shield } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartsBar, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

const Signals: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSignals = SIGNALS_DATA.filter(signal => {
    const matchesStatus = filterStatus === 'ALL' || signal.status === filterStatus;
    const matchesSearch = signal.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.analyst.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate real stats
  const totalSignals = SIGNALS_DATA.length;
  const activeSignals = SIGNALS_DATA.filter(s => s.status === 'ACTIVE').length;
  const hitTP = SIGNALS_DATA.filter(s => s.status === 'HIT_TP').length;
  const hitSL = SIGNALS_DATA.filter(s => s.status === 'HIT_SL').length;
  const totalPips = SIGNALS_DATA.reduce((acc, s) => acc + (s.resultPips || 0), 0);
  const winRate = hitTP + hitSL > 0 ? Math.round((hitTP / (hitTP + hitSL)) * 100) : 0;

  // Performance data by month
  const performanceData = [
    { name: 'Jan', pips: 120, win: true },
    { name: 'Feb', pips: totalPips, win: totalPips > 0 },
  ];

  const statusFilters = [
    { key: 'ALL', label: 'Semua', count: totalSignals },
    { key: 'ACTIVE', label: 'Aktif', count: activeSignals },
    { key: 'HIT_TP', label: 'Profit', count: hitTP },
    { key: 'HIT_SL', label: 'Loss', count: hitSL },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Sinyal Trading</h1>
          <p className="text-slate-600">Arsip sinyal trading (DEMO - Data simulasi untuk pengembangan)</p>
          <div className="mt-2 inline-flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <span>⚠️</span>
            <span>DATA SIMULASI - Bukan sinyal real-time</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="text-emerald-500" size={20} />
              <span className="text-sm text-slate-500">Win Rate</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{winRate}%</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-blue-500" size={20} />
              <span className="text-sm text-slate-500">Total Pips</span>
            </div>
            <div className={`text-2xl font-bold ${totalPips >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {totalPips > 0 ? '+' : ''}{totalPips}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-emerald-500" size={20} />
              <span className="text-sm text-slate-500">Profit</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600">{hitTP}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-red-500" size={20} />
              <span className="text-sm text-slate-500">Loss</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{hitSL}</div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 className="text-emerald-500" /> Performance
            </h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBar data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            cursor={{fill: '#f1f5f9'}} 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="pips" radius={[4, 4, 0, 0]}>
                          {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.win ? '#10b981' : '#ef4444'} />
                          ))}
                        </Bar>
                    </RechartsBar>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
             {statusFilters.map(({ key, label, count }) => (
                 <button
                    key={key}
                    onClick={() => setFilterStatus(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                        filterStatus === key 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                 >
                    {label}
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      filterStatus === key ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}>
                      {count}
                    </span>
                 </button>
             ))}
           </div>
           <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Cari pair atau analyst..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
               />
           </div>
        </div>

        {/* Signals List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map(signal => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
        
        {filteredSignals.length === 0 && (
            <div className="text-center py-20 text-slate-500">
                <TrendingDown className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p>Tidak ada sinyal ditemukan dengan filter ini.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Signals;

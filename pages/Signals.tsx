import React, { useState } from 'react';
import { SIGNALS_DATA } from '../constants';
import SignalCard from '../components/SignalCard';
import { Search, BarChart3, TrendingUp, TrendingDown, Target, Shield, AlertTriangle, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONTACTS } from '../constants';

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

  const statusFilters = [
    { key: 'ALL', label: 'Semua', count: totalSignals },
    { key: 'ACTIVE', label: 'Aktif', count: 0 },
    { key: 'HIT_TP', label: 'Profit', count: 0 },
    { key: 'HIT_SL', label: 'Loss', count: 0 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Sinyal Trading</h1>
          <p className="text-slate-600">Arsip sinyal trading Pasè FX</p>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg flex items-start gap-3">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="font-bold text-amber-800 text-sm uppercase mb-1">Fitur Belum Tersedia</h4>
            <p className="text-sm text-amber-800/80 mb-2">
              Sistem sinyal trading masih dalam pengembangan. Belum ada sinyal real-time yang tersedia saat ini.
            </p>
            <p className="text-sm text-amber-800/80">
              Untuk update sinyal dan analisis, silakan bergabung dengan komunitas kami:
            </p>
            <div className="flex gap-2 mt-2">
              <a 
                href={`https://wa.me/${WHATSAPP_CONTACTS.azil.phone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                <MessageCircle size={12} />
                WhatsApp Azil
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_CONTACTS.mulky.phone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                <MessageCircle size={12} />
                WhatsApp Mulky
              </a>
            </div>
          </div>
        </div>

        {/* Stats Cards - Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="text-slate-400" size={20} />
              <span className="text-sm text-slate-500">Win Rate</span>
            </div>
            <div className="text-2xl font-bold text-slate-400">--</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-slate-400" size={20} />
              <span className="text-sm text-slate-500">Total Pips</span>
            </div>
            <div className="text-2xl font-bold text-slate-400">--</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-slate-400" size={20} />
              <span className="text-sm text-slate-500">Profit</span>
            </div>
            <div className="text-2xl font-bold text-slate-400">--</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-slate-400" size={20} />
              <span className="text-sm text-slate-500">Loss</span>
            </div>
            <div className="text-2xl font-bold text-slate-400">--</div>
          </div>
        </div>

        {/* Filters - Disabled */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200 opacity-50">
           <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
             {statusFilters.map(({ key, label, count }) => (
                 <button
                    key={key}
                    disabled
                    className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-slate-100 text-slate-400 cursor-not-allowed"
                 >
                    {label}
                    <span className="text-xs px-1.5 py-0.5 rounded bg-slate-200 ml-1">
                      {count}
                    </span>
                 </button>
             ))}
           </div>
           <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                 type="text" 
                 placeholder="Cari pair..."
                 disabled
                 className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm cursor-not-allowed"
               />
           </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <TrendingDown className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Sinyal</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            Fitur sinyal trading masih dalam tahap pengembangan. Sinyal real-time akan tersedia setelah integrasi sistem backend selesai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="https://t.me/pasefx"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Join Telegram
            </a>
            <a 
              href="https://chat.whatsapp.com/EqEhHNB1tuaCyQy0bVyOnZ"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signals;

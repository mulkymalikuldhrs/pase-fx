import React, { useState, useEffect } from 'react';
import { Signal, SignalStatus } from '../types';
import SignalCard from '../components/SignalCard';
import { 
  getSignals, 
  addSignal, 
  updateSignalStatus, 
  deleteSignal,
  calculateSignalStats,
  initializeDemoSignals 
} from '../utils/signals';
import { 
  Search, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Shield, 
  Plus,
  Trash2,
  X,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartsBar, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SignalFormData {
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: string;
  sl: string;
  tp1: string;
  tp2: string;
  tp3: string;
  analyst: string;
  timeframe: string;
  analysis: string;
}

const Signals: React.FC = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [filterStatus, setFilterStatus] = useState<SignalStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form state
  const [formData, setFormData] = useState<SignalFormData>({
    pair: '',
    direction: 'BUY',
    entry: '',
    sl: '',
    tp1: '',
    tp2: '',
    tp3: '',
    analyst: '',
    timeframe: 'H1',
    analysis: '',
  });

  // Load signals on mount
  useEffect(() => {
    initializeDemoSignals();
    setSignals(getSignals());
  }, []);

  // Filter signals
  const filteredSignals = signals.filter(signal => {
    const matchesStatus = filterStatus === 'ALL' || signal.status === filterStatus;
    const matchesSearch = signal.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.analyst.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = calculateSignalStats(signals);

  // Calculate monthly performance for chart
  const calculatePerformanceData = () => {
    const monthlyData: Record<string, number> = {};
    
    signals.forEach(signal => {
      if (signal.status === 'HIT_TP' || signal.status === 'HIT_SL') {
        const date = new Date(signal.date);
        const monthYear = date.toLocaleString('default', { month: 'short' });
        
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = 0;
        }
        
        if (signal.resultPips) {
          monthlyData[monthYear] += signal.resultPips;
        }
      }
    });

    // If no data, provide placeholder
    if (Object.keys(monthlyData).length === 0) {
      return [
        { name: 'Jan', pips: 0 },
        { name: 'Feb', pips: 0 },
        { name: 'Mar', pips: 0 },
      ];
    }

    return Object.entries(monthlyData).map(([name, pips]) => ({
      name,
      pips
    }));
  };

  const performanceData = calculatePerformanceData();

  // Handle add signal
  const handleAddSignal = (e: React.FormEvent) => {
    e.preventDefault();
    const newSignal = addSignal({
      pair: formData.pair.toUpperCase(),
      direction: formData.direction,
      entry: parseFloat(formData.entry),
      sl: parseFloat(formData.sl),
      tp1: parseFloat(formData.tp1),
      tp2: parseFloat(formData.tp2) || parseFloat(formData.tp1),
      tp3: parseFloat(formData.tp3) || parseFloat(formData.tp1),
      status: 'ACTIVE',
      analyst: formData.analyst,
      timeframe: formData.timeframe,
      analysis: formData.analysis,
    });
    setSignals(getSignals());
    setShowAddForm(false);
    setFormData({
      pair: '',
      direction: 'BUY',
      entry: '',
      sl: '',
      tp1: '',
      tp2: '',
      tp3: '',
      analyst: '',
      timeframe: 'H1',
      analysis: '',
    });
  };

  // Handle update status
  const handleUpdateStatus = (id: string, status: SignalStatus, resultPips?: number) => {
    updateSignalStatus(id, status, resultPips);
    setSignals(getSignals());
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus sinyal ini?')) {
      deleteSignal(id);
      setSignals(getSignals());
    }
  };

  // Handle reset to demo
  const handleReset = () => {
    if (confirm('Reset ke data demo? Semua sinyal akan dihapus.')) {
      localStorage.removeItem('pasefx_signals');
      initializeDemoSignals();
      setSignals(getSignals());
    }
  };

  const statusFilters: { key: SignalStatus | 'ALL'; label: string; count: number }[] = [
    { key: 'ALL', label: 'Semua', count: stats.total },
    { key: 'ACTIVE', label: 'Aktif', count: stats.active },
    { key: 'HIT_TP', label: 'Profit', count: stats.hitTP },
    { key: 'HIT_SL', label: 'Loss', count: stats.hitSL },
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sinyal Trading</h1>
            <p className="text-gray-600">Arsip sinyal trading Pasè FX - Data tersimpan lokal</p>
          </div>
          
          {/* Admin Toggle */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              Mode Admin
            </label>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm"
              >
                <Plus size={18} />
                Tambah Sinyal
              </button>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg flex items-start gap-3 shadow-sm">
          <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="font-bold text-blue-800 text-sm uppercase mb-1">Catatan Penting</h4>
            <p className="text-sm text-blue-800/80">
              Sinyal trading ini bersifat edukasi dan demonstrasi. Data tersimpan di browser Anda (localStorage). 
              Keputusan trading sepenuhnya tanggung jawab masing-masing trader.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="text-blue-500" size={20} />
              <span className="text-sm text-gray-500 font-medium">Win Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total > 0 ? `${stats.winRate}%` : '--'}</div>
          </div>
          <div className="glass-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-purple-500" size={20} />
              <span className="text-sm text-gray-500 font-medium">Total Pips</span>
            </div>
            <div className={`text-2xl font-bold ${stats.totalPips >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.total > 0 ? `${stats.totalPips > 0 ? '+' : ''}${stats.totalPips}` : '--'}
            </div>
          </div>
          <div className="glass-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-emerald-500" size={20} />
              <span className="text-sm text-gray-500 font-medium">Profit</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600">{stats.hitTP || '--'}</div>
          </div>
          <div className="glass-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-red-500" size={20} />
              <span className="text-sm text-gray-500 font-medium">Loss</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.hitSL || '--'}</div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="text-emerald-600" /> 
                Performance Analysis (Pips)
            </h3>
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBar data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="name" 
                          tick={{fontSize: 12, fill: '#6b7280'}} 
                          axisLine={false} 
                          tickLine={false}
                          dy={10}
                        />
                        <YAxis 
                          tick={{fontSize: 12, fill: '#6b7280'}} 
                          axisLine={false} 
                          tickLine={false}
                          dx={-10}
                        />
                        <Tooltip 
                            cursor={{fill: '#f9fafb'}} 
                            contentStyle={{
                              borderRadius: '12px', 
                              border: '1px solid #e5e7eb', 
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              backdropFilter: 'blur(4px)'
                            }}
                        />
                        <Bar 
                          dataKey="pips" 
                          fill="#10b981" 
                          radius={[4, 4, 0, 0]} 
                          barSize={40}
                        />
                    </RechartsBar>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
            <Filter size={18} className="text-gray-400 shrink-0" />
            {statusFilters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filterStatus === key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
                <span className={`text-xs px-1.5 py-0.5 rounded ml-1.5 ${
                  filterStatus === key ? 'bg-emerald-500/20 text-emerald-50' : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari pair atau analyst..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Add Signal Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-gray-900">Tambah Sinyal Baru</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleAddSignal} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Pair</label>
                    <input
                      type="text"
                      required
                      placeholder="EURUSD"
                      value={formData.pair}
                      onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Direction</label>
                    <select
                      value={formData.direction}
                      onChange={(e) => setFormData({ ...formData, direction: e.target.value as 'BUY' | 'SELL' })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    >
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Entry</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={formData.entry}
                      onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Stop Loss</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={formData.sl}
                      onChange={(e) => setFormData({ ...formData, sl: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Take Profit 1</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={formData.tp1}
                      onChange={(e) => setFormData({ ...formData, tp1: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Take Profit 2 (Optional)</label>
                    <input
                      type="number"
                      step="0.00001"
                      value={formData.tp2}
                      onChange={(e) => setFormData({ ...formData, tp2: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Take Profit 3 (Optional)</label>
                    <input
                      type="number"
                      step="0.00001"
                      value={formData.tp3}
                      onChange={(e) => setFormData({ ...formData, tp3: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Analyst</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama analyst"
                      value={formData.analyst}
                      onChange={(e) => setFormData({ ...formData, analyst: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeframe</label>
                    <select
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    >
                      <option value="M5">M5</option>
                      <option value="M15">M15</option>
                      <option value="H1">H1</option>
                      <option value="H4">H4</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Analisis</label>
                  <textarea
                    rows={3}
                    placeholder="Penjelasan setup trading..."
                    value={formData.analysis}
                    onChange={(e) => setFormData({ ...formData, analysis: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium shadow-md hover:shadow-lg"
                  >
                    Simpan Sinyal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Signals Grid */}
        {filteredSignals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredSignals.map((signal) => (
              <div key={signal.id} className="relative group">
                <SignalCard signal={signal} />
                
                {/* Admin Actions */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/90 p-1.5 rounded-lg shadow-sm backdrop-blur-sm border border-gray-100">
                    {signal.status === 'ACTIVE' && (
                      <>
                        <button
                          onClick={() => {
                            const pips = prompt('Berapa pips profit?');
                            if (pips) handleUpdateStatus(signal.id, 'HIT_TP', parseFloat(pips));
                          }}
                          className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md hover:bg-emerald-200 transition"
                          title="Mark as Profit"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            const pips = prompt('Berapa pips loss? (masukkan angka negatif)');
                            if (pips) handleUpdateStatus(signal.id, 'HIT_SL', parseFloat(pips));
                          }}
                          className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                          title="Mark as Loss"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(signal.id)}
                      className="p-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 text-center animate-fade-in">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingDown className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Sinyal</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              {searchQuery || filterStatus !== 'ALL' 
                ? 'Tidak ada sinyal yang cocok dengan filter Anda.' 
                : 'Belum ada sinyal trading. Aktifkan mode admin untuk menambah sinyal demo.'}
            </p>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-md hover:shadow-lg font-medium"
              >
                <Plus size={20} />
                Tambah Sinyal
              </button>
            )}
          </div>
        )}

        {/* Reset Demo Button (Admin Only) */}
        {isAdmin && signals.length > 0 && (
          <div className="mt-12 text-center border-t border-gray-200 pt-8">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition px-4 py-2 hover:bg-red-50 rounded-lg"
            >
              <RotateCcw size={16} />
              Reset ke Data Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signals;

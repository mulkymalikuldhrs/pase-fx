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
import { WHATSAPP_CONTACTS } from '../constants';

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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sinyal Trading</h1>
            <p className="text-gray-600">Arsip sinyal trading Pasè FX - Data tersimpan lokal</p>
          </div>
          
          {/* Admin Toggle */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="rounded border-gray-300"
              />
              Mode Admin
            </label>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                <Plus size={18} />
                Tambah Sinyal
              </button>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg flex items-start gap-3">
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
          <div className="glass-card bg-white/70 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="text-blue-500" size={20} />
              <span className="text-sm text-gray-500">Win Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total > 0 ? `${stats.winRate}%` : '--'}</div>
          </div>
          <div className="glass-card bg-white/70 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-purple-500" size={20} />
              <span className="text-sm text-gray-500">Total Pips</span>
            </div>
            <div className={`text-2xl font-bold ${stats.totalPips >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.total > 0 ? `${stats.totalPips > 0 ? '+' : ''}${stats.totalPips}` : '--'}
            </div>
          </div>
          <div className="glass-card bg-white/70 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-emerald-500" size={20} />
              <span className="text-sm text-gray-500">Profit</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600">{stats.hitTP || '--'}</div>
          </div>
          <div className="glass-card bg-white/70 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-red-500" size={20} />
              <span className="text-sm text-gray-500">Loss</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.hitSL || '--'}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white/60 p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
            <Filter size={18} className="text-gray-400 shrink-0" />
            {statusFilters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filterStatus === key
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
                <span className={`text-xs px-1.5 py-0.5 rounded ml-1 ${
                  filterStatus === key ? 'bg-emerald-500' : 'bg-gray-200'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari pair atau analyst..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Add Signal Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Tambah Sinyal Baru</h2>
                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddSignal} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pair</label>
                    <input
                      type="text"
                      required
                      placeholder="EURUSD"
                      value={formData.pair}
                      onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                    <select
                      value={formData.direction}
                      onChange={(e) => setFormData({ ...formData, direction: e.target.value as 'BUY' | 'SELL' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entry</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={formData.entry}
                      onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stop Loss</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={formData.sl}
                      onChange={(e) => setFormData({ ...formData, sl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Take Profit 1</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={formData.tp1}
                      onChange={(e) => setFormData({ ...formData, tp1: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Take Profit 2 (opsional)</label>
                    <input
                      type="number"
                      step="0.00001"
                      value={formData.tp2}
                      onChange={(e) => setFormData({ ...formData, tp2: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Take Profit 3 (opsional)</label>
                    <input
                      type="number"
                      step="0.00001"
                      value={formData.tp3}
                      onChange={(e) => setFormData({ ...formData, tp3: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Analyst</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama analyst"
                      value={formData.analyst}
                      onChange={(e) => setFormData({ ...formData, analyst: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
                    <select
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Analisis</label>
                  <textarea
                    rows={3}
                    placeholder="Penjelasan setup trading..."
                    value={formData.analysis}
                    onChange={(e) => setFormData({ ...formData, analysis: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSignals.map((signal) => (
              <div key={signal.id} className="relative group">
                <SignalCard signal={signal} />
                
                {/* Admin Actions */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {signal.status === 'ACTIVE' && (
                      <>
                        <button
                          onClick={() => {
                            const pips = prompt('Berapa pips profit?');
                            if (pips) handleUpdateStatus(signal.id, 'HIT_TP', parseFloat(pips));
                          }}
                          className="p-1.5 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"
                          title="Mark as Profit"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            const pips = prompt('Berapa pips loss? (masukkan angka negatif)');
                            if (pips) handleUpdateStatus(signal.id, 'HIT_SL', parseFloat(pips));
                          }}
                          className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          title="Mark as Loss"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(signal.id)}
                      className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <TrendingDown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Sinyal</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {searchQuery || filterStatus !== 'ALL' 
                ? 'Tidak ada sinyal yang cocok dengan filter Anda.' 
                : 'Belum ada sinyal trading. Aktifkan mode admin untuk menambah sinyal demo.'}
            </p>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                <Plus size={18} />
                Tambah Sinyal
              </button>
            )}
          </div>
        )}

        {/* Reset Demo Button (Admin Only) */}
        {isAdmin && signals.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
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

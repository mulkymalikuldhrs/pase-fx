import React, { useState } from 'react';
import { Signal, SignalStatus } from '../types';
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
  Plus,
  Trash2,
  X,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Edit3,
  History,
  Shield,
  Table,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

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

interface FormErrors {
  pair?: string;
  entry?: string;
  sl?: string;
  tp1?: string;
  analyst?: string;
  general?: string;
}

// Calculate Risk/Reward and Risk %
const calculateRiskReward = (direction: 'BUY' | 'SELL', entry: number, sl: number, tp1: number) => {
  const risk = Math.abs(entry - sl);
  const reward = Math.abs(tp1 - entry);
  const riskReward = risk > 0 ? (reward / risk).toFixed(2) : '0.00';
  const riskPercent = ((risk / entry) * 100).toFixed(2);
  return { riskReward, riskPercent };
};

const Signals: React.FC = () => {
  useSEO({
    title: 'Sinyal Trading',
    description: 'Arsip sinyal trading Pasè FX - Dapatkan peluang trading forex dan komoditas terbaik dengan analisis teknikal lengkap.',
    keywords: 'sinyal forex, trading signal, eurusd, gold, xauusd, analisis teknikal'
  });

  const [signals, setSignals] = useState<Signal[]>(() => {
    initializeDemoSignals();
    return getSignals();
  });
  const [filterStatus, setFilterStatus] = useState<SignalStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'history'>('table');
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);

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

  // Form errors and loading state
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Pair validation
    if (!formData.pair.trim()) {
      errors.pair = 'Pair wajib diisi';
    } else if (!/^[A-Z]{3}[A-Z0-9]{0,7}$/.test(formData.pair.trim().toUpperCase())) {
      errors.pair = 'Format pair tidak valid (contoh: EURUSD, XAUUSD)';
    }

    // Entry validation
    if (!formData.entry.trim()) {
      errors.entry = 'Entry wajib diisi';
    } else {
      const entry = parseFloat(formData.entry);
      if (isNaN(entry) || entry <= 0) {
        errors.entry = 'Entry harus angka positif';
      }
    }

    // Stop Loss validation
    if (!formData.sl.trim()) {
      errors.sl = 'Stop Loss wajib diisi';
    } else {
      const sl = parseFloat(formData.sl);
      if (isNaN(sl) || sl <= 0) {
        errors.sl = 'Stop Loss harus angka positif';
      }
    }

    // Take Profit validation
    if (!formData.tp1.trim()) {
      errors.tp1 = 'Take Profit wajib diisi';
    } else {
      const tp1 = parseFloat(formData.tp1);
      if (isNaN(tp1) || tp1 <= 0) {
        errors.tp1 = 'Take Profit harus angka positif';
      }
    }

    // Analyst validation
    if (!formData.analyst.trim()) {
      errors.analyst = 'Analyst wajib diisi';
    } else if (formData.analyst.trim().length < 2) {
      errors.analyst = 'Nama analyst minimal 2 karakter';
    }

    // Logic validation: Check if TP is on correct side of entry
    if (!errors.entry && !errors.sl && !errors.tp1) {
      const entry = parseFloat(formData.entry);
      const sl = parseFloat(formData.sl);
      const tp1 = parseFloat(formData.tp1);

      if (formData.direction === 'BUY') {
        if (sl >= entry) {
          errors.sl = 'Stop Loss harus di bawah Entry untuk BUY';
        }
        if (tp1 <= entry) {
          errors.tp1 = 'Take Profit harus di atas Entry untuk BUY';
        }
      } else {
        if (sl <= entry) {
          errors.sl = 'Stop Loss harus di atas Entry untuk SELL';
        }
        if (tp1 >= entry) {
          errors.tp1 = 'Take Profit harus di bawah Entry untuk SELL';
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
  const handleAddSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    // Simulate a small delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      addSignal({
        pair: formData.pair.toUpperCase().trim(),
        direction: formData.direction,
        entry: parseFloat(formData.entry),
        sl: parseFloat(formData.sl),
        tp1: parseFloat(formData.tp1),
        tp2: formData.tp2 ? parseFloat(formData.tp2) : parseFloat(formData.tp1),
        tp3: formData.tp3 ? parseFloat(formData.tp3) : parseFloat(formData.tp1),
        status: 'ACTIVE',
        analyst: formData.analyst.trim(),
        timeframe: formData.timeframe,
        analysis: formData.analysis,
      });
      setSignals(getSignals());
      setShowAddForm(false);
      resetForm();
      setSubmitSuccess(true);
    } catch (error) {
      setFormErrors({ general: 'Gagal menyimpan sinyal. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle update signal
  const handleUpdateSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!editingSignal) return;
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    // Simulate a small delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const signalsList = getSignals();
      const index = signalsList.findIndex(s => s.id === editingSignal.id);
      if (index !== -1) {
        signalsList[index] = {
          ...signalsList[index],
          pair: formData.pair.toUpperCase().trim(),
          direction: formData.direction,
          entry: parseFloat(formData.entry),
          sl: parseFloat(formData.sl),
          tp1: parseFloat(formData.tp1),
          tp2: formData.tp2 ? parseFloat(formData.tp2) : parseFloat(formData.tp1),
          tp3: formData.tp3 ? parseFloat(formData.tp3) : parseFloat(formData.tp1),
          analyst: formData.analyst.trim(),
          timeframe: formData.timeframe,
          analysis: formData.analysis,
        };
        localStorage.setItem('pasefx_signals', JSON.stringify(signalsList));
        setSignals(getSignals());
      }
      setEditingSignal(null);
      setShowAddForm(false);
      resetForm();
      setSubmitSuccess(true);
    } catch (error) {
      setFormErrors({ general: 'Gagal memperbarui sinyal. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
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

  // Handle edit - populate form
  const handleEdit = (signal: Signal) => {
    setFormData({
      pair: signal.pair,
      direction: signal.direction,
      entry: signal.entry.toString(),
      sl: signal.sl.toString(),
      tp1: signal.tp1.toString(),
      tp2: signal.tp2.toString(),
      tp3: signal.tp3.toString(),
      analyst: signal.analyst,
      timeframe: signal.timeframe,
      analysis: signal.analysis,
    });
    setEditingSignal(signal);
    setShowAddForm(true);
  };

  // Reset form
  const resetForm = () => {
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
    setFormErrors({});
    setSubmitSuccess(false);
  };

  // Handle reset to initial data
  const handleReset = () => {
    if (confirm('Reset ke data awal? Semua sinyal akan dihapus dan diganti dengan data dari tim analis.')) {
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

  const getStatusBadge = (status: SignalStatus) => {
    const styles = {
      ACTIVE: 'bg-blue-100 text-blue-700',
      HIT_TP: 'bg-emerald-100 text-emerald-700',
      HIT_SL: 'bg-red-100 text-red-700',
      CLOSED: 'bg-gray-100 text-gray-700',
    };
    const labels = {
      ACTIVE: 'Aktif',
      HIT_TP: 'Profit',
      HIT_SL: 'Loss',
      CLOSED: 'Tutup',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

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
                onClick={() => {
                  resetForm();
                  setEditingSignal(null);
                  setShowAddForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm"
              >
                <Plus size={18} />
                Tambah Sinyal
              </button>
            )}
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg flex items-start gap-3 shadow-sm">
          <Shield className="text-amber-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="font-bold text-amber-800 text-sm uppercase mb-1">Peringatan Risiko</h4>
            <p className="text-sm text-amber-800/80">
              Trading forex dan komoditas melibatkan risiko tinggi. Sinyal trading disediakan untuk edukasi dan referensi analisis saja. 
              Keputusan trading sepenuhnya tanggung jawab masing-masing trader. Selalu gunakan manajemen risiko yang ketat 
              dan hanya trade dengan modal yang siap Anda rugikan.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 font-medium mb-1">Total Sinyal</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 font-medium mb-1">Win Rate</div>
            <div className="text-2xl font-bold text-emerald-600">{stats.total > 0 ? `${stats.winRate}%` : '--'}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 font-medium mb-1">Total Pips</div>
            <div className={`text-2xl font-bold ${stats.totalPips >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.total > 0 ? `${stats.totalPips > 0 ? '+' : ''}${stats.totalPips}` : '--'}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 font-medium mb-1">Sinyal Aktif</div>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <Filter size={18} className="text-gray-400 shrink-0" />
            {statusFilters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${filterStatus === key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {label}
                <span className={`text-xs px-1.5 py-0.5 rounded ml-1.5 ${filterStatus === key ? 'bg-emerald-500/20 text-emerald-50' : 'bg-gray-200 text-gray-600'
                  }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Table size={16} />
                Tabel
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${viewMode === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <History size={16} />
                Riwayat
              </button>
            </div>
            
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari pair atau analyst..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Add/Edit Signal Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingSignal ? 'Edit Sinyal' : 'Tambah Sinyal Baru'}
                </h2>
                <button 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingSignal(null);
                    resetForm();
                  }} 
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              <form onSubmit={editingSignal ? handleUpdateSignal : handleAddSignal} className="p-6 space-y-5">
                {/* General Error Message */}
                {formErrors.general && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <AlertTriangle size={18} />
                    {formErrors.general}
                  </div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
                    <CheckCircle2 size={18} />
                    Sinyal berhasil disimpan!
                  </div>
                )}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Pair</label>
                    <input
                      type="text"
                      required
                      placeholder="EURUSD"
                      value={formData.pair}
                      onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        formErrors.pair 
                          ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                          : 'border-gray-300 focus:ring-emerald-500'
                      }`}
                    />
                    {formErrors.pair && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.pair}
                      </p>
                    )}
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
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingSignal(null);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium shadow-md hover:shadow-lg"
                  >
                    {editingSignal ? 'Update Sinyal' : 'Simpan Sinyal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Signal Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pair</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Direction</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Entry</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SL</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TP1</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TP2</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TP3</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">R/R</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Risk %</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    {isAdmin && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSignals.length > 0 ? (
                    filteredSignals.map((signal) => {
                      const { riskReward, riskPercent } = calculateRiskReward(signal.direction, signal.entry, signal.sl, signal.tp1);
                      return (
                        <tr key={signal.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-900">{signal.pair}</div>
                            <div className="text-xs text-gray-500">{signal.timeframe} • {signal.analyst}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                              signal.direction === 'BUY' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {signal.direction === 'BUY' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                              {signal.direction}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-900 font-mono">{signal.entry.toFixed(5)}</td>
                          <td className="px-4 py-3 text-red-600 font-mono">{signal.sl.toFixed(5)}</td>
                          <td className="px-4 py-3 text-emerald-600 font-mono">{signal.tp1.toFixed(5)}</td>
                          <td className="px-4 py-3 text-emerald-600 font-mono">{signal.tp2.toFixed(5)}</td>
                          <td className="px-4 py-3 text-emerald-600 font-mono">{signal.tp3.toFixed(5)}</td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-purple-600">1:{riskReward}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{riskPercent}%</td>
                          <td className="px-4 py-3">{getStatusBadge(signal.status)}</td>
                          {isAdmin && (
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
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
                                      <CheckCircle2 size={16} />
                                    </button>
                                    <button
                                      onClick={() => {
                                        const pips = prompt('Berapa pips loss? (masukkan angka negatif)');
                                        if (pips) handleUpdateStatus(signal.id, 'HIT_SL', parseFloat(pips));
                                      }}
                                      className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                                      title="Mark as Loss"
                                    >
                                      <XCircle size={16} />
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleEdit(signal)}
                                  className="p-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition"
                                  title="Edit"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(signal.id)}
                                  className="p-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={isAdmin ? 11 : 10} className="px-4 py-12 text-center text-gray-500">
                        Tidak ada sinyal yang ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Signal History View */}
        {viewMode === 'history' && (
          <div className="space-y-4">
            {filteredSignals.filter(s => s.status !== 'ACTIVE').length > 0 ? (
              filteredSignals
                .filter(s => s.status !== 'ACTIVE')
                .map((signal) => {
                  const { riskReward, riskPercent } = calculateRiskReward(signal.direction, signal.entry, signal.sl, signal.tp1);
                  return (
                    <div key={signal.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            signal.status === 'HIT_TP' ? 'bg-emerald-100' : 'bg-red-100'
                          }`}>
                            {signal.status === 'HIT_TP' ? (
                              <CheckCircle2 className="text-emerald-600" size={24} />
                            ) : (
                              <XCircle className="text-red-600" size={24} />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">{signal.pair}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                signal.direction === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {signal.direction}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                signal.status === 'HIT_TP' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {signal.status === 'HIT_TP' ? `+${signal.resultPips} pips` : `${signal.resultPips} pips`}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Entry: {signal.entry.toFixed(5)} • SL: {signal.sl.toFixed(5)} • TP: {signal.tp1.toFixed(5)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-gray-500">Risk/Reward:</span>
                            <span className="ml-1 font-semibold text-purple-600">1:{riskReward}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Risk:</span>
                            <span className="ml-1 font-semibold">{riskPercent}%</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-1 font-semibold">{signal.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Analyst:</span>
                            <span className="ml-1 font-semibold">{signal.analyst}</span>
                          </div>
                        </div>
                      </div>
                      {signal.analysis && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600">{signal.analysis}</p>
                        </div>
                      )}
                    </div>
                  );
                })
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500">Belum ada riwayat sinyal</p>
              </div>
            )}
          </div>
        )}

        {/* Reset to Initial Data Button (Admin Only) */}
        {isAdmin && signals.length > 0 && (
          <div className="mt-12 text-center border-t border-gray-200 pt-8">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition px-4 py-2 hover:bg-red-50 rounded-lg"
            >
              <RotateCcw size={16} />
              Reset ke Data Awal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signals;

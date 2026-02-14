import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, Plus, Trash2, TrendingUp, TrendingDown, Calendar, Target, 
  Download, Upload, Filter, BarChart3, PieChart, ChevronDown, ChevronUp,
  FileSpreadsheet, AlertTriangle
} from 'lucide-react';

interface Trade {
  id: string;
  date: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  exit: number;
  sl: number;
  tp: number;
  lots: number;
  result: 'WIN' | 'LOSS' | 'BE';
  pips: number;
  profit: number;
  notes: string;
  method?: string;
}

const TRADING_METHODS = ['SNR', 'SMC', 'ICT', 'Price Action', 'Breakout', 'Fundamental', 'Lainnya'];

const TradeJournal: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [filterResult, setFilterResult] = useState<string>('all');
  const [showStats, setShowStats] = useState(true);
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    date: new Date().toISOString().split('T')[0],
    direction: 'BUY',
    result: 'WIN',
    method: 'SNR'
  });

  // Load trades from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pasè_fx_trades');
    if (saved) {
      try {
        setTrades(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load trades:', e);
      }
    }
  }, []);

  // Save to localStorage whenever trades change
  useEffect(() => {
    localStorage.setItem('pasè_fx_trades', JSON.stringify(trades));
  }, [trades]);

  const addTrade = () => {
    if (!newTrade.pair || !newTrade.entry || !newTrade.exit) return;
    
    const entry = newTrade.entry || 0;
    const exit = newTrade.exit || 0;
    const direction = newTrade.direction || 'BUY';
    
    // Calculate pips
    let pips = 0;
    if (newTrade.pair.includes('JPY')) {
      pips = direction === 'BUY' ? (exit - entry) * 100 : (entry - exit) * 100;
    } else {
      pips = direction === 'BUY' ? (exit - entry) * 10000 : (entry - exit) * 10000;
    }
    
    // Calculate profit (simplified)
    const lots = newTrade.lots || 0.1;
    const profit = pips * 10 * lots;
    
    // Determine result
    let result: 'WIN' | 'LOSS' | 'BE' = 'BE';
    if (profit > 0) result = 'WIN';
    else if (profit < 0) result = 'LOSS';

    const trade: Trade = {
      id: Date.now().toString(),
      date: newTrade.date || new Date().toISOString().split('T')[0],
      pair: newTrade.pair.toUpperCase(),
      direction,
      entry,
      exit,
      sl: newTrade.sl || 0,
      tp: newTrade.tp || 0,
      lots,
      result,
      pips: Math.round(pips * 10) / 10,
      profit: Math.round(profit * 100) / 100,
      notes: newTrade.notes || '',
      method: newTrade.method || 'Lainnya'
    };

    setTrades([trade, ...trades]);
    setShowForm(false);
    setNewTrade({
      date: new Date().toISOString().split('T')[0],
      direction: 'BUY',
      result: 'WIN',
      method: 'SNR'
    });
  };

  const deleteTrade = (id: string) => {
    if (window.confirm('Hapus trade ini?')) {
      setTrades(trades.filter(t => t.id !== id));
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Pair', 'Direction', 'Entry', 'Exit', 'SL', 'TP', 'Lots', 'Result', 'Pips', 'Profit', 'Method', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...trades.map(t => [
        t.date, t.pair, t.direction, t.entry, t.exit, t.sl, t.tp, t.lots, 
        t.result, t.pips, t.profit, t.method, `"${t.notes}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trade-journal-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Import from CSV
  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      // Skip header and parse
      const importedTrades: Trade[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const parts = line.split(',');
        if (parts.length >= 10) {
          importedTrades.push({
            id: Date.now().toString() + i,
            date: parts[0],
            pair: parts[1],
            direction: parts[2] as 'BUY' | 'SELL',
            entry: parseFloat(parts[3]),
            exit: parseFloat(parts[4]),
            sl: parseFloat(parts[5]) || 0,
            tp: parseFloat(parts[6]) || 0,
            lots: parseFloat(parts[7]) || 0.1,
            result: parts[8] as 'WIN' | 'LOSS' | 'BE',
            pips: parseFloat(parts[9]),
            profit: parseFloat(parts[10]) || 0,
            method: parts[11] || 'Lainnya',
            notes: parts[12]?.replace(/"/g, '') || ''
          });
        }
      }
      
      if (importedTrades.length > 0 && confirm(`Import ${importedTrades.length} trades?`)) {
        setTrades([...importedTrades, ...trades]);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Statistics
  const stats = useMemo(() => {
    const total = trades.length;
    const wins = trades.filter(t => t.result === 'WIN').length;
    const losses = trades.filter(t => t.result === 'LOSS').length;
    const be = trades.filter(t => t.result === 'BE').length;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
    const totalPips = trades.reduce((acc, t) => acc + t.pips, 0);
    const totalProfit = trades.reduce((acc, t) => acc + t.profit, 0);
    const avgProfit = total > 0 ? totalProfit / total : 0;
    const avgWin = wins > 0 ? trades.filter(t => t.result === 'WIN').reduce((a, t) => a + t.profit, 0) / wins : 0;
    const avgLoss = losses > 0 ? trades.filter(t => t.result === 'LOSS').reduce((a, t) => a + t.profit, 0) / losses : 0;
    
    // Method stats
    const methodStats = TRADING_METHODS.map(method => {
      const methodTrades = trades.filter(t => t.method === method);
      return {
        method,
        count: methodTrades.length,
        winRate: methodTrades.length > 0 
          ? Math.round((methodTrades.filter(t => t.result === 'WIN').length / methodTrades.length) * 100)
          : 0
      };
    }).filter(m => m.count > 0).sort((a, b) => b.count - a.count);
    
    return { total, wins, losses, be, winRate, totalPips, totalProfit, avgProfit, avgWin, avgLoss, methodStats };
  }, [trades]);

  // Filtered trades
  const filteredTrades = trades.filter(trade => {
    const matchesMethod = filterMethod === 'all' || trade.method === filterMethod;
    const matchesResult = filterResult === 'all' || trade.result === filterResult;
    return matchesMethod && matchesResult;
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading Journal</h1>
            <p className="text-gray-600">Catat dan evaluasi setiap trade Anda untuk improvement berkelanjutan.</p>
            <div className="mt-2 inline-flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <span>💾</span>
              <span>Data tersimpan secara lokal di browser Anda (localStorage)</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
            >
              <Plus size={18} />
              Tambah Trade
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {showStats && (
          <div className="mb-8 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card bg-white/70 p-4 text-center border border-gray-200 rounded-xl">
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Trades</p>
              </div>
              <div className="glass-card bg-white/70 p-4 text-center border border-gray-200 rounded-xl">
                <p className="text-2xl font-bold text-emerald-600">{stats.winRate}%</p>
                <p className="text-xs text-gray-500">Win Rate</p>
              </div>
              <div className="glass-card bg-white/70 p-4 text-center border border-gray-200 rounded-xl">
                <p className={`text-2xl font-bold ${stats.totalPips >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stats.totalPips > 0 ? '+' : ''}{stats.totalPips}
                </p>
                <p className="text-xs text-gray-500">Total Pips</p>
              </div>
              <div className="glass-card bg-white/70 p-4 text-center border border-gray-200 rounded-xl">
                <p className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  ${stats.totalProfit > 0 ? '+' : ''}{stats.totalProfit.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">Total Profit</p>
              </div>
            </div>
            
            {/* Extended Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card bg-white/50 p-3 text-center border border-gray-200 rounded-xl">
                <p className="text-lg font-bold text-gray-900">${stats.avgProfit.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Avg Profit/Trade</p>
              </div>
              <div className="glass-card bg-white/50 p-3 text-center border border-gray-200 rounded-xl">
                <p className="text-lg font-bold text-emerald-600">${stats.avgWin.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Avg Win</p>
              </div>
              <div className="glass-card bg-white/50 p-3 text-center border border-gray-200 rounded-xl">
                <p className="text-lg font-bold text-red-600">${stats.avgLoss.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Avg Loss</p>
              </div>
              <div className="glass-card bg-white/50 p-3 text-center border border-gray-200 rounded-xl">
                <p className="text-lg font-bold text-gray-900">{(stats.avgWin / Math.abs(stats.avgLoss || 1)).toFixed(2)}</p>
                <p className="text-xs text-gray-500">Win/Loss Ratio</p>
              </div>
            </div>

            {/* Method Performance */}
            {stats.methodStats.length > 0 && (
              <div className="glass-card bg-white/70 p-4 border border-gray-200 rounded-xl">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 size={16} className="text-emerald-600" />
                  Performance by Method
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stats.methodStats.map(stat => (
                    <div key={stat.method} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs font-medium text-gray-700">{stat.method}</span>
                      <span className="text-xs text-gray-500">({stat.count})</span>
                      <span className={`text-xs font-bold ${stat.winRate >= 50 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.winRate}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filters & Export/Import */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
            >
              <option value="all">All Methods</option>
              {TRADING_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
            >
              <option value="all">All Results</option>
              <option value="WIN">Win</option>
              <option value="LOSS">Loss</option>
              <option value="BE">Break Even</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              disabled={trades.length === 0}
              className="px-3 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition flex items-center gap-2 text-sm disabled:opacity-50"
            >
              <Download size={16} />
              Export CSV
            </button>
            <label className="px-3 py-2 bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition flex items-center gap-2 text-sm cursor-pointer">
              <Upload size={16} />
              Import CSV
              <input
                type="file"
                accept=".csv"
                onChange={importFromCSV}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-3 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 text-sm"
            >
              <BarChart3 size={16} />
              {showStats ? 'Hide' : 'Show'} Stats
            </button>
          </div>
        </div>

        {/* Add Trade Form */}
        {showForm && (
          <div className="glass-card bg-white/90 p-6 mb-8 border border-emerald-200 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tambah Trade Baru</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Tanggal</label>
                <input
                  type="date"
                  value={newTrade.date}
                  onChange={(e) => setNewTrade({...newTrade, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Pair</label>
                <input
                  type="text"
                  placeholder="EURUSD"
                  value={newTrade.pair || ''}
                  onChange={(e) => setNewTrade({...newTrade, pair: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Direction</label>
                <select
                  value={newTrade.direction}
                  onChange={(e) => setNewTrade({...newTrade, direction: e.target.value as 'BUY' | 'SELL'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Method</label>
                <select
                  value={newTrade.method}
                  onChange={(e) => setNewTrade({...newTrade, method: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {TRADING_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Entry Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.entry || ''}
                  onChange={(e) => setNewTrade({...newTrade, entry: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Exit Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.exit || ''}
                  onChange={(e) => setNewTrade({...newTrade, exit: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Stop Loss</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.sl || ''}
                  onChange={(e) => setNewTrade({...newTrade, sl: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Take Profit</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.tp || ''}
                  onChange={(e) => setNewTrade({...newTrade, tp: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Lot Size</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTrade.lots || ''}
                  onChange={(e) => setNewTrade({...newTrade, lots: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-1 font-medium">Catatan</label>
              <textarea
                value={newTrade.notes || ''}
                onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                rows={2}
                placeholder="Setup, emosi, lesson learned..."
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={addTrade}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                Simpan Trade
              </button>
            </div>
          </div>
        )}

        {/* Trades List */}
        <div className="space-y-3">
          {filteredTrades.length === 0 ? (
            <div className="glass-card bg-white/70 p-12 text-center border border-gray-200 rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada trade. Mulai catat trading Anda!</p>
            </div>
          ) : (
            filteredTrades.map((trade) => (
              <div key={trade.id} className="glass-card bg-white/80 p-4 hover:border-emerald-300 transition-all shadow-sm border border-gray-200 rounded-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      trade.result === 'WIN' ? 'bg-emerald-100 text-emerald-600' : 
                      trade.result === 'LOSS' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {trade.result === 'WIN' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : trade.result === 'LOSS' ? (
                        <TrendingDown className="w-5 h-5" />
                      ) : (
                        <Target className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{trade.pair}</span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          trade.direction === 'BUY' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
                        }`}>
                          {trade.direction}
                        </span>
                        {trade.method && (
                          <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                            {trade.method}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {trade.date}
                        </span>
                        <span>{trade.lots} lots</span>
                        <span>Entry: {trade.entry}</span>
                        <span>Exit: {trade.exit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-xl font-bold ${
                      trade.profit > 0 ? 'text-emerald-600' : trade.profit < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {trade.profit > 0 ? '+' : ''}{trade.profit.toFixed(2)} USD
                    </div>
                    <div className={`text-sm ${
                      trade.pips > 0 ? 'text-emerald-600' : trade.pips < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {trade.pips > 0 ? '+' : ''}{trade.pips} pips
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTrade(trade.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {trade.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 italic">{trade.notes}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeJournal;

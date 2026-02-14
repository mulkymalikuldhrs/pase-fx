import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react';

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
}

const TradeJournal: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    date: new Date().toISOString().split('T')[0],
    direction: 'BUY',
    result: 'WIN'
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
      notes: newTrade.notes || ''
    };

    setTrades([trade, ...trades]);
    setShowForm(false);
    setNewTrade({
      date: new Date().toISOString().split('T')[0],
      direction: 'BUY',
      result: 'WIN'
    });
  };

  const deleteTrade = (id: string) => {
    if (window.confirm('Hapus trade ini?')) {
      setTrades(trades.filter(t => t.id !== id));
    }
  };

  const stats = {
    total: trades.length,
    wins: trades.filter(t => t.result === 'WIN').length,
    losses: trades.filter(t => t.result === 'LOSS').length,
    be: trades.filter(t => t.result === 'BE').length,
    winRate: trades.length > 0 ? Math.round((trades.filter(t => t.result === 'WIN').length / trades.length) * 100) : 0,
    totalPips: trades.reduce((acc, t) => acc + t.pips, 0),
    totalProfit: trades.reduce((acc, t) => acc + t.profit, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Trading Journal</h1>
          <p className="text-slate-400">Catat dan evaluasi setiap trade Anda untuk improvement berkelanjutan.</p>
          <div className="mt-2 inline-flex items-center gap-2 text-xs text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
            <span>💾</span>
            <span>Data tersimpan secara lokal di browser Anda (localStorage)</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-slate-400">Total Trades</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{stats.winRate}%</p>
            <p className="text-xs text-slate-400">Win Rate</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className={`text-2xl font-bold ${stats.totalPips >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {stats.totalPips > 0 ? '+' : ''}{stats.totalPips}
            </p>
            <p className="text-xs text-slate-400">Total Pips</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${stats.totalProfit > 0 ? '+' : ''}{stats.totalProfit.toFixed(2)}
            </p>
            <p className="text-xs text-slate-400">Total Profit</p>
          </div>
        </div>

        {/* Add Trade Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="glass-button"
          >
            <Plus size={20} className="inline mr-2" />
            {showForm ? 'Tutup Form' : 'Tambah Trade'}
          </button>
        </div>

        {/* Add Trade Form */}
        {showForm && (
          <div className="glass-card p-6 mb-8 animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-4">Tambah Trade Baru</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Tanggal</label>
                <input
                  type="date"
                  value={newTrade.date}
                  onChange={(e) => setNewTrade({...newTrade, date: e.target.value})}
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Pair</label>
                <input
                  type="text"
                  placeholder="EURUSD"
                  value={newTrade.pair || ''}
                  onChange={(e) => setNewTrade({...newTrade, pair: e.target.value})}
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Direction</label>
                <select
                  value={newTrade.direction}
                  onChange={(e) => setNewTrade({...newTrade, direction: e.target.value as 'BUY' | 'SELL'})}
                  className="glass-input"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Entry Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.entry || ''}
                  onChange={(e) => setNewTrade({...newTrade, entry: parseFloat(e.target.value)})}
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Exit Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.exit || ''}
                  onChange={(e) => setNewTrade({...newTrade, exit: parseFloat(e.target.value)})}
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Lot Size</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTrade.lots || ''}
                  onChange={(e) => setNewTrade({...newTrade, lots: parseFloat(e.target.value)})}
                  className="glass-input"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-slate-400 mb-1">Catatan</label>
              <textarea
                value={newTrade.notes || ''}
                onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
                className="glass-input"
                rows={2}
                placeholder="Setup, emosi, dll..."
              />
            </div>
            <button
              onClick={addTrade}
              className="mt-4 glass-button"
            >
              Simpan Trade
            </button>
          </div>
        )}

        {/* Trades List */}
        <div className="space-y-4">
          {trades.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Belum ada trade. Mulai catat trading Anda!</p>
            </div>
          ) : (
            trades.map((trade) => (
              <div key={trade.id} className="glass-card p-4 hover:border-emerald-500/30 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      trade.result === 'WIN' ? 'bg-emerald-500/20' : 
                      trade.result === 'LOSS' ? 'bg-red-500/20' : 'bg-slate-700/50'
                    }`}>
                      {trade.result === 'WIN' ? (
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      ) : trade.result === 'LOSS' ? (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      ) : (
                        <Target className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{trade.pair}</span>
                        <span className={`text-sm px-2 py-0.5 rounded ${
                          trade.direction === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {trade.direction}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {trade.date}
                        </span>
                        <span>{trade.lots} lots</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-xl font-bold ${
                      trade.profit > 0 ? 'text-emerald-400' : trade.profit < 0 ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {trade.profit > 0 ? '+' : ''}{trade.profit.toFixed(2)} USD
                    </div>
                    <div className={`text-sm ${
                      trade.pips > 0 ? 'text-emerald-400' : trade.pips < 0 ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {trade.pips > 0 ? '+' : ''}{trade.pips} pips
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTrade(trade.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {trade.notes && (
                  <div className="mt-3 pt-3 border-t border-slate-700/50">
                    <p className="text-sm text-slate-400">{trade.notes}</p>
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

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
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading Journal</h1>
          <p className="text-gray-600">Catat dan evaluasi setiap trade Anda untuk improvement berkelanjutan.</p>
          <div className="mt-2 inline-flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <span>💾</span>
            <span>Data tersimpan secara lokal di browser Anda (localStorage)</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card bg-white/60 p-4 text-center border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500">Total Trades</p>
          </div>
          <div className="glass-card bg-white/60 p-4 text-center border-gray-200">
            <p className="text-2xl font-bold text-emerald-600">{stats.winRate}%</p>
            <p className="text-xs text-gray-500">Win Rate</p>
          </div>
          <div className="glass-card bg-white/60 p-4 text-center border-gray-200">
            <p className={`text-2xl font-bold ${stats.totalPips >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.totalPips > 0 ? '+' : ''}{stats.totalPips}
            </p>
            <p className="text-xs text-gray-500">Total Pips</p>
          </div>
          <div className="glass-card bg-white/60 p-4 text-center border-gray-200">
            <p className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              ${stats.totalProfit > 0 ? '+' : ''}{stats.totalProfit.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Total Profit</p>
          </div>
        </div>

        {/* Add Trade Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="glass-button bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50"
          >
            <Plus size={20} className="inline mr-2" />
            {showForm ? 'Tutup Form' : 'Tambah Trade'}
          </button>
        </div>

        {/* Add Trade Form */}
        {showForm && (
          <div className="glass-card bg-white/80 p-6 mb-8 animate-fade-in-up border-emerald-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tambah Trade Baru</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tanggal</label>
                <input
                  type="date"
                  value={newTrade.date}
                  onChange={(e) => setNewTrade({...newTrade, date: e.target.value})}
                  className="glass-input bg-white border-gray-200 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Pair</label>
                <input
                  type="text"
                  placeholder="EURUSD"
                  value={newTrade.pair || ''}
                  onChange={(e) => setNewTrade({...newTrade, pair: e.target.value})}
                  className="glass-input bg-white border-gray-200 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Direction</label>
                <select
                  value={newTrade.direction}
                  onChange={(e) => setNewTrade({...newTrade, direction: e.target.value as 'BUY' | 'SELL'})}
                  className="glass-input bg-white border-gray-200 focus:border-emerald-500"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Entry Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.entry || ''}
                  onChange={(e) => setNewTrade({...newTrade, entry: parseFloat(e.target.value)})}
                  className="glass-input bg-white border-gray-200 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Exit Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={newTrade.exit || ''}
                  onChange={(e) => setNewTrade({...newTrade, exit: parseFloat(e.target.value)})}
                  className="glass-input bg-white border-gray-200 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Lot Size</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTrade.lots || ''}
                  onChange={(e) => setNewTrade({...newTrade, lots: parseFloat(e.target.value)})}
                  className="glass-input bg-white border-gray-200 focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-1">Catatan</label>
              <textarea
                value={newTrade.notes || ''}
                onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
                className="glass-input bg-white border-gray-200 focus:border-emerald-500"
                rows={2}
                placeholder="Setup, emosi, dll..."
              />
            </div>
            <button
              onClick={addTrade}
              className="mt-4 glass-button bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
            >
              Simpan Trade
            </button>
          </div>
        )}

        {/* Trades List */}
        <div className="space-y-4">
          {trades.length === 0 ? (
            <div className="glass-card bg-white/60 p-12 text-center border-gray-200">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada trade. Mulai catat trading Anda!</p>
            </div>
          ) : (
            trades.map((trade) => (
              <div key={trade.id} className="glass-card bg-white/80 p-4 hover:border-emerald-300 transition-all shadow-sm">
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
                        <span className={`text-sm px-2 py-0.5 rounded font-medium ${
                          trade.direction === 'BUY' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {trade.direction}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
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
                    <p className="text-sm text-gray-600">{trade.notes}</p>
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

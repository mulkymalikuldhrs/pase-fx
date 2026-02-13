import React, { useState } from 'react';
import { BookOpen, Search, GraduationCap, Target, ExternalLink, Users, Clock, BarChart3 } from 'lucide-react';
import { TRADING_METHODS } from '../constants';

const Methods: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState<typeof TRADING_METHODS[0] | null>(null);

  const categories = ['all', 'Technical', 'Fundamental', 'Hybrid'];

  const filteredMethods = TRADING_METHODS.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         method.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         method.keyConcepts.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || method.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-500/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/10';
      case 'Advanced': return 'text-red-400 bg-red-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Library <span className="text-gradient">Metode Trading</span>
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Pelajari berbagai metode trading dari seluruh dunia. Setiap metode memiliki keunggulan masing-masing. 
            Temukan yang paling cocok dengan gaya trading Anda.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">{TRADING_METHODS.length}</div>
            <div className="text-sm text-slate-400">Total Metode</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{TRADING_METHODS.filter(m => m.category === 'Technical').length}</div>
            <div className="text-sm text-slate-400">Technical</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{TRADING_METHODS.filter(m => m.category === 'Fundamental').length}</div>
            <div className="text-sm text-slate-400">Fundamental</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{TRADING_METHODS.filter(m => m.difficulty === 'Beginner').length}</div>
            <div className="text-sm text-slate-400">Untuk Pemula</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="glass-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Cari metode, konsep, atau teknik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Semua' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMethods.map((method) => (
            <div 
              key={method.id}
              className="glass-card hover:border-emerald-500/30 cursor-pointer transition-all"
              onClick={() => setSelectedMethod(method)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  method.category === 'Technical' ? 'bg-blue-500/20 text-blue-400' :
                  method.category === 'Fundamental' ? 'bg-green-500/20 text-green-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  <BookOpen size={20} />
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(method.difficulty)}`}>
                  {method.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{method.name}</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{method.description}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {method.timeframe}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 size={12} />
                  {method.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {method.keyConcepts.slice(0, 3).map((concept, idx) => (
                  <span key={idx} className="glass-badge text-[10px]">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedMethod(null)}>
            <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedMethod.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(selectedMethod.difficulty)}`}>
                        {selectedMethod.difficulty}
                      </span>
                      <span className="text-xs text-slate-400">{selectedMethod.category}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMethod(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <GraduationCap size={18} className="text-emerald-400" />
                      Deskripsi
                    </h3>
                    <p className="text-slate-300">{selectedMethod.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Target size={18} className="text-emerald-400" />
                      Konsep Kunci
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedMethod.keyConcepts.map((concept, idx) => (
                        <div key={idx} className="bg-slate-800/50 p-3 rounded-lg text-sm text-slate-300">
                          {concept}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 mb-2">Timeframe</h4>
                      <p className="text-white">{selectedMethod.timeframe}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 mb-2">Metode Terkait</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedMethod.relatedMethods.map((rel, idx) => (
                          <span key={idx} className="glass-badge text-[10px]">
                            {rel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <ExternalLink size={18} className="text-emerald-400" />
                      Sumber Belajar
                    </h3>
                    <ul className="space-y-2">
                      {selectedMethod.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                          <span className="text-emerald-400">→</span>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                      <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                        <Users size={16} />
                        Tips dari Komunitas
                      </h4>
                      <p className="text-sm text-slate-300">
                        Setiap metode memiliki kelebihan dan kekurangan. Kombinasikan dengan manajemen risiko yang baik 
                        dan jangan mencampuradukkan terlalu banyak indikator. Fokus pada 1-2 metode hingga master.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Philosophy Section */}
        <div className="mt-12 glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Filosofi Pasè FX</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Fokus, Bukan Campur Aduk</h3>
              <p className="text-sm text-slate-400">
                Pilih 1-2 metode yang cocok dengan karakter Anda dan dalami hingga master. 
                Jangan gunakan semua indikator sekaligus.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Respect All Methods</h3>
              <p className="text-sm text-slate-400">
                Setiap metode ada yang pakai dan profitable. Hargai pilihan trader lain 
                meskipun berbeda dengan metode Anda.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Continuous Learning</h3>
              <p className="text-sm text-slate-400">
                Market selalu berubah. Terus belajar dan adaptasi. 
                Bahkan master tetap belajar setiap hari.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methods;

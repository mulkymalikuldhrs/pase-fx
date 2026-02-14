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
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Library <span className="text-emerald-600">Metode Trading</span>
          </h1>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Pelajari berbagai metode trading dari seluruh dunia. Setiap metode memiliki keunggulan masing-masing. 
            Temukan yang paling cocok dengan gaya trading Anda.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-emerald-500">{TRADING_METHODS.length}</div>
            <div className="text-sm text-gray-500">Total Metode</div>
          </div>
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">{TRADING_METHODS.filter(m => m.category === 'Technical').length}</div>
            <div className="text-sm text-gray-500">Technical</div>
          </div>
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-green-500">{TRADING_METHODS.filter(m => m.category === 'Fundamental').length}</div>
            <div className="text-sm text-gray-500">Fundamental</div>
          </div>
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-purple-500">{TRADING_METHODS.filter(m => m.difficulty === 'Beginner').length}</div>
            <div className="text-sm text-gray-500">Untuk Pemula</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="glass-card bg-white/80 p-4 mb-8 border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari metode, konsep, atau teknik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10 w-full bg-white border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              className="glass-card bg-white/60 hover:bg-white/80 hover:border-emerald-300 cursor-pointer transition-all"
              onClick={() => setSelectedMethod(method)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  method.category === 'Technical' ? 'bg-blue-50 text-blue-500' :
                  method.category === 'Fundamental' ? 'bg-green-50 text-green-500' :
                  'bg-purple-50 text-purple-500'
                }`}>
                  <BookOpen size={20} />
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(method.difficulty)}`}>
                  {method.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{method.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{method.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
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
                  <span key={idx} className="glass-badge text-[10px] bg-gray-50 text-gray-600 border-gray-100">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm" onClick={() => setSelectedMethod(null)}>
            <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMethod.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(selectedMethod.difficulty)}`}>
                        {selectedMethod.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{selectedMethod.category}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMethod(null)}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <GraduationCap size={18} className="text-emerald-500" />
                      Deskripsi
                    </h3>
                    <p className="text-gray-600">{selectedMethod.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Target size={18} className="text-emerald-500" />
                      Konsep Kunci
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedMethod.keyConcepts.map((concept, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 border border-gray-100">
                          {concept}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Timeframe</h4>
                      <p className="text-gray-900">{selectedMethod.timeframe}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Metode Terkait</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedMethod.relatedMethods.map((rel, idx) => (
                          <span key={idx} className="glass-badge text-[10px] bg-gray-50 text-gray-600 border-gray-100">
                            {rel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ExternalLink size={18} className="text-emerald-500" />
                      Sumber Belajar
                    </h3>
                    <ul className="space-y-2">
                      {selectedMethod.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                          <span className="text-emerald-500">→</span>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
                      <h4 className="text-emerald-600 font-semibold mb-2 flex items-center gap-2">
                        <Users size={16} />
                        Tips dari Komunitas
                      </h4>
                      <p className="text-sm text-gray-600">
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
        <div className="mt-12 glass-card bg-white/80 p-8 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Filosofi Pasè FX</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fokus, Bukan Campur Aduk</h3>
              <p className="text-sm text-gray-500">
                Pilih 1-2 metode yang cocok dengan karakter Anda dan dalami hingga master. 
                Jangan gunakan semua indikator sekaligus.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Respect All Methods</h3>
              <p className="text-sm text-gray-500">
                Setiap metode ada yang pakai dan profitable. Hargai pilihan trader lain 
                meskipun berbeda dengan metode Anda.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-4 text-purple-500">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Continuous Learning</h3>
              <p className="text-sm text-gray-500">
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

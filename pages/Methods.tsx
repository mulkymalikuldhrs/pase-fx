import React, { useState } from 'react';
import { BookOpen, Search, GraduationCap, Target, ExternalLink, Users, Clock, BarChart3, PlayCircle, ChevronDown, ChevronUp, Lightbulb, TrendingUp, Brain, Video, Bookmark } from 'lucide-react';
import { TRADING_METHODS } from '../constants';

// Tutorial Component
const TutorialBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4 border border-emerald-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-800">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-emerald-600" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-emerald-100">
          <div className="prose prose-sm max-w-none text-gray-600">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// Method Detail Component
const MethodDetail: React.FC<{ method: typeof TRADING_METHODS[0]; onClose: () => void }> = ({ method, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-emerald-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{method.name}</h2>
                <p className="text-emerald-100 mt-1">{method.description}</p>
              </div>
              <button onClick={onClose} className="text-white hover:bg-emerald-700 p-2 rounded-lg">
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{method.category}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{method.timeframe}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{method.difficulty}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            
            {/* Quick Tutorial */}
            <TutorialBox title="📖 Tutorial Cepat: Apa itu {method.name}?">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">🎯 Tujuan Utama</h4>
                  <p className="text-sm">
                    Metode ini bertujuan untuk {method.id === 'ict' ? 'mengidentifikasi di mana institusi besar melakukan transaksi' : 
                      method.id === 'smc' ? 'mengikuti arah smart money/bank besar' :
                      method.id === 'snr' ? 'menemukan level harga di mana harga berpotensi berbalik' :
                      'mengidentifikasi pola harga untuk memprediksi arah market'}.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">⏰ Timeframe Terbaik</h4>
                  <p className="text-sm">{method.timeframe}</p>
                </div>
              </div>
            </TutorialBox>

            {/* Key Concepts */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-500" /> Konsep Utama
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {method.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tutorial */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-500" /> Video Pembelajaran
              </h3>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <p className="text-sm text-gray-600 mb-3">
                  Tonton video di bawah untuk memahami {method.name}:
                </p>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <PlayCircle className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">Video tutorial akan dimuat di sini</p>
                    <p className="text-xs opacity-50 mt-1">(Hubungi admin untuk request video)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Example Placeholder */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" /> Contoh Chart
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 text-center">
                <TrendingUp className="w-12 h-12 mx-auto text-emerald-400 mb-2" />
                <p className="text-gray-600">Contoh chart untuk {method.name}</p>
                <p className="text-sm text-gray-400 mt-1">Chart interaktif dapat ditambahkan</p>
              </div>
            </div>

            {/* Related Methods */}
            {method.relatedMethods && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-emerald-500" /> Metode Terkait
                </h3>
                <div className="flex flex-wrap gap-2">
                  {method.relatedMethods.map((related, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {related}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {method.resources && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-emerald-500" /> Sumber Belajar
                </h3>
                <ul className="space-y-2">
                  {method.resources.map((resource, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen py-8 px-2 sm:px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            📚 Library <span className="text-emerald-600">Metode Trading</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto px-4 text-sm sm:text-base">
            Pelajari berbagai metode trading dengan tutorial lengkap. 
            Cocok untuk pemula hingga advanced. Klik kartu untuk melihat detail lengkap!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <BookOpen className="w-4 h-4" />
            <span>Klik metode untuk lihat tutorial & video</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 px-2">
          <div className="bg-white p-3 sm:p-4 text-center rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{TRADING_METHODS.length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Total Metode</div>
          </div>
          <div className="bg-white p-3 sm:p-4 text-center rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{TRADING_METHODS.filter(m => m.category === 'Technical').length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Technical</div>
          </div>
          <div className="bg-white p-3 sm:p-4 text-center rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-green-500">{TRADING_METHODS.filter(m => m.category === 'Fundamental').length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Fundamental</div>
          </div>
          <div className="bg-white p-3 sm:p-4 text-center rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-purple-500">{TRADING_METHODS.filter(m => m.difficulty === 'Beginner').length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Untuk Pemula</div>
          </div>
        </div>

        {/* Tutorial Guide */}
        <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Cara Menggunakan Library
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 text-sm text-emerald-700">
            <div className="flex items-start gap-2">
              <span className="w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <p>Cari metode yang ingin dipelajari</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <p>Klik kartu untuk lihat detail</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <p>Pelajari tutorial & tonton video</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 mb-6 rounded-xl border border-gray-200">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" size={20} />
              <input
                type="text"
                placeholder="Cari metode, konsep, atau teknik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-emerald-500 text-white' 
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMethods.map((method) => (
            <div 
              key={method.id}
              onClick={() => setSelectedMethod(method)}
              className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{method.category}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(method.difficulty)}`}>
                  {method.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {method.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {method.keyConcepts.slice(0, 3).map((concept, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    {concept}
                  </span>
                ))}
                {method.keyConcepts.length > 3 && (
                  <span className="px-2 py-0.5 text-gray-400 text-xs">
                    +{method.keyConcepts.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{method.timeframe}</span>
                </div>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lihat Tutorial <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMethods.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Metode tidak ditemukan</h3>
            <p className="text-gray-500">Coba kata kunci lain atau pilih kategori yang berbeda</p>
          </div>
        )}

        {/* Method Detail Modal */}
        {selectedMethod && (
          <MethodDetail method={selectedMethod} onClose={() => setSelectedMethod(null)} />
        )}

        {/* CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl text-white text-center">
          <h3 className="text-xl font-bold mb-2">Siap Memulai Perjalanan Trading?</h3>
          <p className="text-emerald-100 mb-4">
            Bergabung dengan komunitas Pasè FX untuk belajar bareng sama trader lain.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/tools" className="px-6 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
              Lihat Tools Trading
            </a>
            <a href="/members" className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors">
              Join Komunitas
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Methods;

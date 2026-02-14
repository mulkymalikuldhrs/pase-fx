import React, { useState } from 'react';
import { EDUCATION_ARTICLES } from '../constants';
import { Clock, BookOpen, AlertTriangle, Send } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Education: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All']; // Empty for now

  const filteredArticles = EDUCATION_ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pusat Edukasi</h1>
          <p className="text-slate-600">Belajar trading dari nol sampai mahir dengan kurikulum sistematis.</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
            <AlertTriangle className="text-amber-500" size={16} />
            <span className="text-sm text-amber-700 font-medium">Konten dalam pengembangan</span>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg flex items-start gap-3">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="font-bold text-amber-800 text-sm uppercase mb-1">Artikel Belum Tersedia</h4>
            <p className="text-sm text-amber-800/80 mb-2">
              Konten edukasi masih dalam proses penulisan. Kami sedang menyiapkan materi-materi berkualitas untuk komunitas.
            </p>
            <p className="text-sm text-amber-800/80">
              Sementara ini, Anda bisa belajar langsung di komunitas Telegram atau WhatsApp kami.
            </p>
          </div>
        </div>

        {/* Search and Filter - Disabled */}
        <div className="mb-8 space-y-4 opacity-50">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Cari artikel..."
              disabled
              className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              disabled
              className="px-4 py-2 rounded-full text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed"
            >
              All
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Artikel</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            Konten edukasi masih dalam tahap penulisan. Artikel-artikel akan ditambahkan secara bertahap.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Send size={18} />
              Join Telegram
            </a>
            <a 
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Join WhatsApp Group
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-400 mb-4">Topik yang akan datang:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Trading Plan', 'Risk Management', 'SMC', 'ICT', 'Price Action', 'Psychology'].map((topic) => (
                <span key={topic} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;

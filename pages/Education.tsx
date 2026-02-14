import React, { useState } from 'react';
import { EDUCATION_ARTICLES } from '../constants';
import { Clock, BookOpen, ArrowLeft, ChevronRight } from 'lucide-react';

const Education: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<typeof EDUCATION_ARTICLES[0] | null>(null);

  const categories = ['All', ...Array.from(new Set(EDUCATION_ARTICLES.map(a => a.category)))];

  const filteredArticles = EDUCATION_ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedArticle) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Artikel
          </button>
          
          <article className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock size={14} />
                  {selectedArticle.readTime}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{selectedArticle.title}</h1>
              <p className="text-lg text-slate-600">{selectedArticle.summary}</p>
            </div>
            
            <div className="p-8 prose prose-slate max-w-none">
              {selectedArticle.content ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: selectedArticle.content
                    .replace(/# (.*)/g, '<h1 class="text-3xl font-bold text-slate-900 mt-8 mb-4">$1</h1>')
                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-slate-800 mt-6 mb-3">$1</h2>')
                    .replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-slate-800 mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n\n/g, '</p><p class="mb-4 text-slate-700 leading-relaxed">')
                    .replace(/- (.*)/g, '<li class="ml-6 mb-2 text-slate-700">$1</li>')
                    .replace(/✅ (.*)/g, '<div class="flex items-start gap-2 mb-2"><span class="text-emerald-500 mt-1">✓</span><span class="text-slate-700">$1</span></div>')
                    .replace(/❌ (.*)/g, '<div class="flex items-start gap-2 mb-2"><span class="text-red-500 mt-1">✗</span><span class="text-slate-700">$1</span></div>')
                    .replace(/```(.*?)```/gs, '<pre class="bg-slate-100 p-4 rounded-lg overflow-x-auto mb-4"><code>$1</code></pre>')
                    .replace(/> (.*)/g, '<blockquote class="border-l-4 border-emerald-500 pl-4 italic text-slate-600 my-4">$1</blockquote>')
                    .replace(/---/g, '<hr class="my-8 border-slate-200" />')
                }} />
              ) : (
                <p className="text-slate-600">Konten artikel sedang disiapkan...</p>
              )}
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4">Artikel ini ditulis oleh:</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  Pè
                </div>
                <div>
                  <p className="font-medium text-slate-900">Pasè FX Education Team</p>
                  <p className="text-sm text-slate-500">Komunitas Trading Indonesia</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pusat Edukasi</h1>
          <p className="text-slate-600">Belajar trading dari nol sampai mahir dengan kurikulum sistematis.</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200">
            <BookOpen className="text-emerald-600" size={16} />
            <span className="text-sm text-emerald-700 font-medium">{EDUCATION_ARTICLES.length} Artikel Tersedia</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                    Baca Artikel
                    <ChevronRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">Tidak Ada Artikel</h3>
            <p className="text-slate-500">
              Tidak ada artikel yang cocok dengan pencarian Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;

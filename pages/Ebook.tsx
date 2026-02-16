import React, { useState } from 'react';
import { BookOpen, Check, MessageCircle, Users, Download, Clock, Star, FileText, ChevronRight, Lock, Unlock } from 'lucide-react';
import { getWhatsAppEbookLink, WHATSAPP_CONTACTS } from '../constants';

const Ebook: React.FC = () => {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('pasefx_ebook_downloaded') === 'true';
  });
  const [activeChapter, setActiveChapter] = useState<number | null>(null);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsDownloaded(true);
          localStorage.setItem('pasefx_ebook_downloaded', 'true');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const chapters = [
    { 
      id: 1, 
      title: "Filosofi Trader Waras", 
      preview: "Mengapa kebanyakan trader gagal dan mindset apa yang diperlukan untuk sukses...",
      pages: 45,
      locked: false
    },
    { 
      id: 2, 
      title: "Manajemen Risiko Anti MC", 
      preview: "Teknik position sizing dan money management yang melindungi akun Anda...",
      pages: 62,
      locked: true
    },
    { 
      id: 3, 
      title: "Analisis Teknikal Fundamental", 
      preview: "Memahami supply, demand, dan struktur market secara mendalam...",
      pages: 78,
      locked: true
    },
    { 
      id: 4, 
      title: "Psikologi Trading", 
      preview: "Mengendalikan emosi dan membangun disiplin trading...",
      pages: 55,
      locked: true
    },
    { 
      id: 5, 
      title: "Trading Plan & Jurnal", 
      preview: "Cara membuat trading plan yang efektif dan evaluasi berkala...",
      pages: 48,
      locked: true
    },
    { 
      id: 6, 
      title: "Studi Kasus Real", 
      preview: "Analisis trade nyata dari tim Pasè FX dengan berbagai skenario...",
      pages: 92,
      locked: true
    },
  ];

  const benefits = [
    { icon: Star, text: "500+ Halaman Konten Berkualitas" },
    { icon: FileText, text: "Template Trading Plan Siap Pakai" },
    { icon: Users, text: "Akses Komunitas Eksklusif" },
    { icon: Clock, text: "Update Gratis Seumur Hidup" },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold mb-4 border border-emerald-200">
            📚 EBOOK GRATIS
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Day Trading Untuk <span className="text-emerald-600">Orang Waras</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Panduan lengkap trading forex dari dasar hingga advanced. 
            Ditulis oleh trader berpengalaman untuk trader yang serius.
          </p>
          
          {/* Download Status */}
          {isDownloaded ? (
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-xl border border-emerald-200">
              <Check className="w-5 h-5" />
              <span className="font-semibold">Ebook telah didownload</span>
            </div>
          ) : isDownloading ? (
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full h-4 mb-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              <p className="text-gray-600">Downloading... {downloadProgress}%</p>
            </div>
          ) : (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download Ebook Gratis
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Ebook Cover & Info */}
          <div className="glass-card bg-white/80 p-8 border border-gray-200 rounded-2xl">
            <div className="aspect-[3/4] bg-gradient-to-br from-emerald-50 via-white to-blue-50 rounded-xl mb-8 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <BookOpen className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-gray-900 text-3xl font-bold mb-2">Day Trading</h3>
                  <p className="text-emerald-600 font-bold text-xl mb-4">Untuk Orang Waras</p>
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <span>By Azil & Mulky</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-gray-400 text-sm mt-2">500+ Halaman</p>
                </div>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                    <benefit.icon size={18} />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chapters Preview */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Isi Bab Ebook</h3>
            {chapters.map((chapter) => (
              <div 
                key={chapter.id}
                className={`glass-card p-4 border rounded-xl cursor-pointer transition-all ${
                  activeChapter === chapter.id 
                    ? 'border-emerald-300 bg-emerald-50/50' 
                    : 'border-gray-200 bg-white/80 hover:border-emerald-200'
                }`}
                onClick={() => setActiveChapter(activeChapter === chapter.id ? null : chapter.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    chapter.locked ? 'bg-gray-100 text-gray-400' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {chapter.locked ? <Lock size={16} /> : <Unlock size={16} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900">
                        Bab {chapter.id}: {chapter.title}
                      </h4>
                      <span className="text-xs text-gray-500">{chapter.pages} hal</span>
                    </div>
                    {activeChapter === chapter.id && (
                      <div className="mt-2 text-sm text-gray-600 animate-fade-in">
                        <p className="mb-2">{chapter.preview}</p>
                        {chapter.locked && (
                          <p className="text-xs text-amber-600 flex items-center gap-1">
                            <Lock size={12} />
                            Konten lengkap tersedia setelah download
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={`text-gray-400 transition-transform ${
                      activeChapter === chapter.id ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Contact */}
        <div className="glass-card bg-white/80 p-8 border border-gray-200 rounded-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Butuh Bantuan atau Diskusi?</h2>
            <p className="text-gray-600">Hubungi langsung founder kami untuk tanya-tanya seputar ebook atau trading.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Azil */}
            <a 
              href={getWhatsAppEbookLink('azil')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md">
                A
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {WHATSAPP_CONTACTS.azil.name}
                </h3>
                <p className="text-sm text-gray-500">{WHATSAPP_CONTACTS.azil.role}</p>
                <p className="text-xs text-emerald-600 mt-1">
                  {WHATSAPP_CONTACTS.azil.specialties.join(' • ')}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full text-green-500">
                <MessageCircle size={20} />
              </div>
            </a>

            {/* Mulky */}
            <a 
              href={getWhatsAppEbookLink('mulky')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md">
                M
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {WHATSAPP_CONTACTS.mulky.name}
                </h3>
                <p className="text-sm text-gray-500">{WHATSAPP_CONTACTS.mulky.role}</p>
                <p className="text-xs text-emerald-600 mt-1">
                  {WHATSAPP_CONTACTS.mulky.specialties.join(' • ')}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full text-green-500">
                <MessageCircle size={20} />
              </div>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-700 text-center">
            <strong>📚 Catatan:</strong> Ebook ini bersifat edukatif. Hasil trading dipengaruhi oleh banyak faktor 
            dan tidak ada jaminan profit. Selalu lakukan riset dan manajemen risiko yang baik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ebook;

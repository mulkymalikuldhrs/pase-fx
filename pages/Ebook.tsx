import React from 'react';
import { BookOpen, Check, MessageCircle, Users } from 'lucide-react';
import { getWhatsAppEbookLink, WHATSAPP_CONTACTS } from '../constants';

const Ebook: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-50 text-amber-600 text-sm font-bold mb-6 border border-amber-200">
            🚧 COMING SOON
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Day Trading Untuk <span className="text-emerald-600">Orang Waras</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Ebook dalam tahap penulisan. Target rilis: 2026.
            <br/>
            <span className="text-sm text-amber-600 mt-2 inline-block">⚠️ Buku belum tersedia - Join komunitas untuk update perkembangan</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ebook Details */}
          <div className="glass-card bg-white/80 p-8 border-gray-200">
            <div className="aspect-[3/4] bg-gray-100 rounded-xl mb-8 relative overflow-hidden group shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <BookOpen className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-gray-900 text-3xl font-bold mb-2">Day Trading</h3>
                  <p className="text-emerald-600 font-bold text-xl mb-4">Untuk Orang Waras</p>
                  <p className="text-gray-500 text-sm">By Azil & Mulky</p>
                  <p className="text-gray-400 text-xs mt-2">500+ Halaman</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Apa yang akan Anda pelajari?</h3>
            <ul className="space-y-3">
              {[
                "Filosofi 'Trader Waras' dan mindset disiplin",
                "Sistem trading teknikal berbasis Supply & Demand",
                "Manajemen risiko anti MC (Margin Call)",
                "Cara membaca sentimen market fundamental",
                "Trading plan template siap pakai",
                "Psikologi trading dan kontrol emosi",
                "Berbagai metode: SNR, SMC, ICT, dan lainnya"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600">
                  <div className="mt-1 bg-emerald-50 p-0.5 rounded-full text-emerald-500">
                    <Check size={14} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Request */}
          <div className="space-y-6">
            <div className="glass-card bg-white/80 p-6 border-gray-200">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Ebook Gratis</h2>
                <p className="text-gray-500">Hubungi langsung founder kami via WhatsApp untuk request ebook.</p>
              </div>

              <div className="space-y-4">
                {/* Azil */}
                <a 
                  href={getWhatsAppEbookLink('azil')}
                  target="_blank"
                  rel="noreferrer"
                  className="block glass-card bg-white/60 p-4 hover:border-emerald-300 hover:bg-white/90 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md">
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
                  </div>
                </a>

                {/* Mulky */}
                <a 
                  href={getWhatsAppEbookLink('mulky')}
                  target="_blank"
                  rel="noreferrer"
                  className="block glass-card bg-white/60 p-4 hover:border-emerald-300 hover:bg-white/90 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md">
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
                  </div>
                </a>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-sm text-amber-700 text-center">
                  <strong>📚 Coming Soon!</strong> Ebook masih dalam tahap penulisan. 
                  Hubungi kami untuk join komunitas dan dapatkan update perkembangan buku.
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="glass-card bg-white/80 p-6 border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="text-emerald-500" size={18} />
                Tentang Buku
              </h3>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>Ebook "Day Trading Untuk Orang Waras" sedang dalam proses penulisan oleh tim Pasè FX.</p>
                <p className="text-amber-600 font-semibold">📌 Target selesai: 2026</p>
                <p>Buku akan mencakup:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-500">
                  <li>Filosofi trading tanpa sensasi</li>
                  <li>Manajemen risiko praktis</li>
                  <li>Strategi teknikal & fundamental</li>
                  <li>Psikologi trading</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ebook;

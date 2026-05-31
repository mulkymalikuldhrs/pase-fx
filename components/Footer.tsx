import React from 'react';
import { APP_NAME, SOCIAL_LINKS, AFFILIATE_LINKS } from '../constants';
import { 
  Instagram, Send, Mail, Phone, Youtube, 
  TrendingUp, BookOpen, Calculator, Users, 
  Shield, FileText, ExternalLink
} from 'lucide-react';

// Automatic copyright year
const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-t border-gray-200 dark:border-slate-800 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center overflow-hidden border border-emerald-100 dark:border-emerald-800 shadow-sm">
                <img 
                  src="/logo.png" 
                  alt="Pasè FX Logo" 
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.logo-fallback-footer');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="logo-fallback-footer hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold text-sm">
                  Pè
                </div>
              </div>
              <h3 className="text-gray-900 dark:text-slate-100 text-lg font-bold">{APP_NAME}</h3>
            </div>
            <p className="text-sm italic mb-3 text-gray-600 dark:text-slate-400 leading-relaxed">"Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"</p>
            <p className="text-sm text-gray-500 dark:text-slate-500 mb-5">Disiplin bertahap, sabar, jangan rakus.</p>
            
            {/* Social Media Icons - Enhanced */}
            <div className="flex flex-wrap gap-2">
              <a 
                href={SOCIAL_LINKS.telegram} 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#229ED9] hover:text-white text-slate-600 dark:text-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Telegram"
              >
                <Send size={18} className="transition-transform group-hover:scale-110" />
              </a>
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white text-slate-600 dark:text-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Instagram"
              >
                <Instagram size={18} className="transition-transform group-hover:scale-110" />
              </a>
              <a 
                href={SOCIAL_LINKS.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-green-500 hover:text-white text-slate-600 dark:text-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="WhatsApp"
              >
                <Phone size={18} className="transition-transform group-hover:scale-110" />
              </a>
              <a 
                href={`mailto:${SOCIAL_LINKS.email}`} 
                className="group flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-600 dark:text-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Email"
              >
                <Mail size={18} className="transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://youtube.com/@pasefx" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-slate-600 dark:text-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="YouTube"
              >
                <Youtube size={18} className="transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Trading Tools */}
          <div>
            <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-4 flex items-center gap-2">
              <Calculator size={16} className="text-emerald-500" />
              Tools Trading
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#/calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Kalkulator Pip<span className="opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={10} /></span></a></li>
              <li><a href="#/position-size" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Position Size</a></li>
              <li><a href="#/risk-reward" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Risk/Reward</a></li>
              <li><a href="#/fibonacci" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Fibonacci</a></li>
              <li><a href="#/jurnal" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Jurnal Trading</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-emerald-500" />
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#/sinyal" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Sinyal Trading</a></li>
              <li><a href="#/metode" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Library Metode</a></li>
              <li><a href="#/edukasi" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Artikel Edukasi</a></li>
              <li><a href="#/broker" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Rekomendasi Broker</a></li>
              <li><a href="#/tools" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Tools Lainnya</a></li>
            </ul>
          </div>

          {/* Komunitas */}
          <div>
            <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-4 flex items-center gap-2">
              <Users size={16} className="text-emerald-500" />
              Komunitas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#/members" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Anggota</a></li>
              <li><a href="#/komunitas" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Tentang Kami</a></li>
              <li><a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Grup Telegram</a></li>
              <li><a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Grup WhatsApp</a></li>
              <li><a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Hubungi Admin</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-4 flex items-center gap-2">
              <Shield size={16} className="text-emerald-500" />
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Disclaimer</a></li>
              <li><a href="/terms-of-service.html" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Syarat Layanan</a></li>
              <li><a href="/privacy-policy.html" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Kebijakan Privasi</a></li>
              <li><a href="#/risk-warning" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">Peringatan Risiko</a></li>
              <li><a href="#/faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider">Partner:</span>
              <a 
                href="https://tradersfamily.id" 
                target="_blank" 
                rel="noreferrer"
                className="text-sm text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Traders Family
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <TrendingUp size={12} className="text-emerald-500" />
                MRG Mega Berjangka
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Exness</span>
              <span className="hidden sm:inline">•</span>
              <span>FundingPips</span>
              <span className="hidden sm:inline">•</span>
              <span>The 5%ers</span>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 text-center">
          <p className="text-sm text-gray-500 dark:text-slate-500">
            © {CURRENT_YEAR} <span className="font-semibold text-gray-700 dark:text-slate-300">{APP_NAME}</span> Trader Hub. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-400 dark:text-slate-600 max-w-2xl mx-auto">
            Trading Forex/CFD melibatkan risiko tinggi. Pastikan Anda memahami risiko dan modal yang Anda siap kehilangan. 
            Kami tidak menjamin profit dan tidak bertanggung jawab atas kerugian Anda.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

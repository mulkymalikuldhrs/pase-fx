import React from 'react';
import { APP_NAME, SOCIAL_LINKS } from '../constants';
import { Instagram, Send, Mail, Phone } from 'lucide-react';

// Automatic copyright year
const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-t border-gray-100 dark:border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center overflow-hidden border border-emerald-100 dark:border-emerald-800">
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
            <p className="text-sm italic mb-4 text-gray-600 dark:text-slate-400">"Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"</p>
            <p className="text-sm text-gray-500 dark:text-slate-500">Disiplin bertahap, sabar, jangan rakus.</p>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/sinyal" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Sinyal Trading</a></li>
              <li><a href="#/metode" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Library Metode</a></li>
              <li><a href="#/members" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Anggota Komunitas</a></li>
              <li><a href="#/tools" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Tools Trading</a></li>
              <li><a href="#/komunitas" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Tentang Komunitas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-4">Legal & Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Disclaimer & Risiko</a></li>
              <li><a href="/terms-of-service.html" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Syarat & Ketentuan</a></li>
              <li><a href="/privacy-policy.html" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#/jurnal" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Jurnal Trading</a></li>
              <li><a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Hubungi Admin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full hover:bg-emerald-500 hover:text-white text-gray-600 dark:text-slate-400 transition shadow-sm">
                <Send size={18} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full hover:bg-pink-600 hover:text-white text-gray-600 dark:text-slate-400 transition shadow-sm">
                <Instagram size={18} />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full hover:bg-green-500 hover:text-white text-gray-600 dark:text-slate-400 transition shadow-sm">
                <Phone size={18} />
              </a>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full hover:bg-blue-500 hover:text-white text-gray-600 dark:text-slate-400 transition shadow-sm">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-slate-800 mt-12 pt-8 text-center text-xs">
          <p className="text-gray-500 dark:text-slate-500">&copy; {CURRENT_YEAR} {APP_NAME} Trader Hub. All rights reserved.</p>
          <p className="mt-2 text-gray-400 dark:text-slate-600">Trading Forex melibatkan risiko tinggi. Pastikan Anda memahami risiko sebelum bertransaksi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

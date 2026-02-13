import React from 'react';
import { APP_NAME, SOCIAL_LINKS } from '../constants';
import { Instagram, Send, Mail, Phone } from 'lucide-react';

// Automatic copyright year
const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="Pasè FX Logo" 
                className="h-8 w-auto object-contain"
              />
              <h3 className="text-white text-lg font-bold">{APP_NAME}</h3>
            </div>
            <p className="text-sm italic mb-4">"Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"</p>
            <p className="text-sm">Disiplin bertahap, sabar, jangan rakus.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/sinyal" className="hover:text-emerald-400 transition">Sinyal Trading</a></li>
              <li><a href="#/metode" className="hover:text-emerald-400 transition">Library Metode</a></li>
              <li><a href="#/members" className="hover:text-emerald-400 transition">Anggota Komunitas</a></li>
              <li><a href="#/tools" className="hover:text-emerald-400 transition">Tools Trading</a></li>
              <li><a href="#/komunitas" className="hover:text-emerald-400 transition">Tentang Komunitas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/disclaimer" className="hover:text-emerald-400 transition">Disclaimer & Risiko</a></li>
              <li><a href="#/jurnal" className="hover:text-emerald-400 transition">Jurnal Trading</a></li>
              <li><a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">Hubungi Admin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition">
                <Send size={18} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition">
                <Instagram size={18} />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition">
                <Phone size={18} />
              </a>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="bg-slate-800 p-2 rounded-full hover:bg-blue-500 hover:text-white transition">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-12 pt-8 text-center text-xs">
          <p>&copy; {CURRENT_YEAR} {APP_NAME} Trader Hub. All rights reserved.</p>
          <p className="mt-2 text-slate-600">Trading Forex melibatkan risiko tinggi. Pastikan Anda memahami risiko sebelum bertransaksi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

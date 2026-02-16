import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Signals from './pages/Signals';
import Ebook from './pages/Ebook';
import Brokers from './pages/Brokers';
import Tools from './pages/Tools';
import Education from './pages/Education';
import Community from './pages/Community';
import Founders from './pages/Founders';
import TradeJournal from './pages/TradeJournal';
import Members from './pages/Members';
import Methods from './pages/Methods';
import { AFFILIATE_LINKS } from './constants';
import { ShieldAlert } from 'lucide-react';

// Current Year for Copyright
const CURRENT_YEAR = new Date().getFullYear();

// Disclaimer Page with Liquid Glass Design
const Disclaimer = () => (
  <div className="min-h-screen bg-gray-50 py-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="glass-card bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
          <div className="p-3 bg-yellow-50 rounded-xl">
            <ShieldAlert className="text-yellow-500 w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Disclaimer & Risk Warning</h1>
            <p className="text-gray-500 mt-1">Harap baca dengan seksama sebelum menggunakan layanan kami.</p>
          </div>
        </div>
        
        <div className="space-y-8 text-gray-700">
          <div className="p-5 bg-red-50 border border-red-100 rounded-xl flex gap-4">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="text-red-800 font-bold mb-1">Peringatan Risiko Tinggi</h3>
              <p className="text-red-700 text-sm leading-relaxed">
                Perdagangan mata uang (Forex) dan komoditas memiliki tingkat risiko yang tinggi dan mungkin tidak cocok untuk semua investor.
                Leverage yang tinggi dapat bekerja melawan Anda maupun untuk Anda.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">1</span>
                Bukan Nasihat Keuangan
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-8">
                Semua konten di website Pasè FX, termasuk sinyal, artikel, dan ebook, hanya untuk tujuan edukasi dan informasi. 
                Tidak ada jaminan profit. Keputusan trading sepenuhnya tanggung jawab masing-masing trader.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">2</span>
                Risiko Modal
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-8">
                Sebelum memutuskan untuk berinvestasi, pertimbangkan tujuan investasi, tingkat pengalaman, dan selera risiko Anda. 
                <strong className="text-gray-900 font-semibold"> Jangan pernah trading dengan uang yang Anda tidak mampu kehilangannya.</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">3</span>
                Afiliasi (IB)
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-8">
                Pasè FX beroperasi sebagai Introducing Broker (IB). Kami menerima komisi dari broker mitra kami ketika Anda mendaftar melalui link referral kami. 
                Hal ini tidak membebankan biaya tambahan kepada Anda dan tidak mempengaruhi rekomendasi kami.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">
              © {CURRENT_YEAR} Pasè FX Trader Hub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Redirect component for premium
const PremiumRedirect = () => {
    React.useEffect(() => {
        window.location.href = AFFILIATE_LINKS.traderFamilyPremium;
    }, []);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-900 font-medium">Redirecting to Trader Family Premium...</p>
        </div>
      </div>
    );
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? (window.location.hash.substring(1) || '/') : '/');

  useEffect(() => {
      const handleHashChange = () => {
          const path = window.location.hash.substring(1) || '/';
          setCurrentPath(path);
          window.scrollTo(0, 0);
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
      // Normalize path (ignore query params for matching)
      const path = currentPath.split('?')[0];

      switch(path) {
          case '/': return <Home />;
          case '/sinyal': return <Signals />;
          case '/ebook': return <Ebook />;
          case '/broker': return <Brokers />;
          case '/tools': return <Tools />;
          case '/edukasi': return <Education />;
          case '/komunitas': return <Community />;
          case '/founders': return <Founders />;
          case '/jurnal': return <TradeJournal />;
          case '/members': return <Members />;
          case '/metode': return <Methods />;
          case '/disclaimer': return <Disclaimer />;
          case '/premium': return <PremiumRedirect />;
          default: return <Home />;
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 font-sans text-gray-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
};

export default App;

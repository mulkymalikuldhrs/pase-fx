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
  <div className="min-h-screen bg-white py-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <ShieldAlert className="text-yellow-400 w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Disclaimer & Risk Warning</h1>
        </div>
        
        <div className="space-y-6 text-gray-700">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-semibold mb-2">⚠️ Peringatan Risiko Tinggi</p>
            <p className="text-gray-700">Perdagangan mata uang (Forex) dan komoditas memiliki tingkat risiko yang tinggi dan mungkin tidak cocok untuk semua investor.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Bukan Nasihat Keuangan</h3>
            <p className="text-gray-700">Semua konten di website Pasè FX, termasuk sinyal, artikel, dan ebook, hanya untuk tujuan edukasi dan informasi. Tidak ada jaminan profit. Keputusan trading sepenuhnya tanggung jawab masing-masing trader.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Risiko Modal</h3>
            <p className="text-gray-700">Leverage yang tinggi dapat bekerja melawan Anda maupun untuk Anda. Sebelum memutuskan untuk berinvestasi dalam valuta asing, Anda harus mempertimbangkan tujuan investasi, tingkat pengalaman, dan selera risiko Anda dengan hati-hati. <strong className="text-gray-900">Jangan pernah trading dengan uang yang Anda tidak mampu kehilangannya.</strong></p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Afiliasi (IB)</h3>
            <p className="text-gray-700">Pasè FX beroperasi sebagai Introducing Broker (IB). Kami menerima komisi dari broker mitra kami ketika Anda mendaftar melalui link referral kami. Hal ini tidak membebankan biaya tambahan kepada Anda dan tidak mempengaruhi rekomendasi kami.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Hasil Masa Lalu</h3>
            <p className="text-gray-700">Hasil trading masa lalu tidak menjamin hasil di masa depan. Trading melibatkan risiko kerugian yang signifikan. Statistik win rate dan performa yang ditampilkan adalah historis dan tidak merepresentasikan jaminan performa di masa depan.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">5. Data Real-time</h3>
            <p className="text-gray-700">Data market yang ditampilkan di website ini bersumber dari third-party providers (TradingView, dll) dan mungkin memiliki delay. Selalu verifikasi data dengan platform trading Anda sebelum mengambil keputusan.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
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
          <p className="text-black">Redirecting to Trader Family Premium...</p>
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
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
};

export default App;

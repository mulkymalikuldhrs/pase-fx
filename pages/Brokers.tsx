import React from 'react';
import { BROKERS_DATA, AFFILIATE_LINKS, MRG_LOGO_URL } from '../constants';
import BrokerCard from '../components/BrokerCard';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const Brokers: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Broker & Prop Firm Rekomendasi</h1>
          <p className="text-gray-600 text-lg">
            Kami telah menyeleksi partner terbaik yang mendukung gaya trading profesional. Aman, regulasi jelas, dan kondisi trading yang fair.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-12 rounded-r-lg flex items-start gap-3 shadow-sm">
            <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" />
            <div>
                <h4 className="font-bold text-yellow-800 text-sm uppercase mb-1">Peringatan Risiko</h4>
                <p className="text-sm text-yellow-800/80">
                    Trading forex berisiko tinggi. 70-80% trader retail kehilangan uang. Pastikan Anda memahami risiko dan peraturan di negara Anda sebelum membuka akun.
                </p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BROKERS_DATA.map(broker => (
            <BrokerCard key={broker.id} broker={broker} />
          ))}
        </div>

        {/* Traders Family Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Partner Utama Kami</h3>
            <p className="text-blue-100 mb-6">
              Kami bekerja sama dengan Traders Family untuk memberikan layanan broker terbaik
            </p>
            <a 
              href={AFFILIATE_LINKS.mrg}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-blue-800 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg hover:shadow-xl"
            >
              <img 
                src={MRG_LOGO_URL} 
                alt="Traders Family" 
                className="h-8 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <span>Daftar MRG via Traders Family</span>
              <ExternalLink size={18} />
            </a>
            <p className="text-xs text-blue-200 mt-4">
              Klik logo di atas untuk mendaftar akun trading MRG melalui Traders Family
            </p>
          </div>
        </div>

        <div className="mt-16 glass-card bg-white/70 p-8 border-gray-200 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Transparansi Afiliasi (IB)</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Kami menerima komisi ketika Anda mendaftar melalui link di atas. Komisi ini digunakan 100% untuk operasional komunitas, pengembangan website, dan donasi sosial. Harga/spread yang Anda dapatkan TIDAK menjadi lebih mahal.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Brokers;
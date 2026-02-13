import React from 'react';
import { BROKERS_DATA } from '../constants';
import BrokerCard from '../components/BrokerCard';
import { AlertTriangle } from 'lucide-react';

const Brokers: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Broker & Prop Firm Rekomendasi</h1>
          <p className="text-slate-600 text-lg">
            Kami telah menyeleksi partner terbaik yang mendukung gaya trading profesional. Aman, regulasi jelas, dan kondisi trading yang fair.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-12 rounded-r-lg flex items-start gap-3">
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

        <div className="mt-16 bg-white p-8 rounded-xl border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Transparansi Afiliasi (IB)</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
                Kami menerima komisi ketika Anda mendaftar melalui link di atas. Komisi ini digunakan 100% untuk operasional komunitas, pengembangan website, dan donasi sosial. Harga/spread yang Anda dapatkan TIDAK menjadi lebih mahal.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Brokers;
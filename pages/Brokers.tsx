import React, { useState, useEffect } from 'react';
import { BROKERS_DATA, AFFILIATE_LINKS, MRG_LOGO_URL } from '../constants';
import BrokerCard from '../components/BrokerCard';
import { AlertTriangle, ExternalLink, Star, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { BrokerCardSkeleton, LoadingSpinner } from '../components/ui/LoadingSkeleton';

const Brokers: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
  const [isLoading, setIsLoading] = useState(true);

  useSEO({
    title: 'Broker Rekomendasi',
    description: 'Daftar broker dan prop firm rekomendasi Pasè FX. Aman, teregulasi, dan kondisi trading terbaik.',
    keywords: 'broker forex, prop firm, traders family, mrg, broker terpercaya'
  });

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Sort brokers by selected criteria
  const sortedBrokers = [...BROKERS_DATA].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  // Get unique features across all brokers for comparison
  const allFeatures = Array.from(
    new Set(BROKERS_DATA.flatMap(b => b.features))
  );

  // Check if broker has a specific feature
  const hasFeature = (broker: typeof BROKERS_DATA[0], feature: string) => {
    return broker.features.some(f => f.toLowerCase().includes(feature.toLowerCase()));
  };

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

        {/* Sorting Controls */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Broker Rekomendasi</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'name')}
              className="bg-white/80 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="rating">Rating Tertinggi</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
        </div>

        {/* Broker Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sortedBrokers.map(broker => (
            <BrokerCard key={broker.id} broker={broker} />
          ))}
        </div>

        {/* Broker Comparison Table */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Perbandingan Broker</h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition"
            >
              {showComparison ? (
                <>
                  <ChevronUp size={20} />
                  <span>Sembunyikan Tabel</span>
                </>
              ) : (
                <>
                  <ChevronDown size={20} />
                  <span>Lihat Perbandingan</span>
                </>
              )}
            </button>
          </div>

          {showComparison && (
            <div className="overflow-x-auto">
              <table className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="text-left p-4 font-bold">Broker</th>
                    <th className="text-center p-4 font-bold">Tipe</th>
                    <th className="text-center p-4 font-bold">Rating</th>
                    <th className="text-center p-4 font-bold">Regulasi</th>
                    <th className="text-center p-4 font-bold">Rekomendasi</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBrokers.map((broker, index) => (
                    <tr 
                      key={broker.id} 
                      className={`border-b border-gray-100 hover:bg-emerald-50/50 transition ${index % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/30'}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            broker.type === 'Local' ? 'bg-blue-100 text-blue-700' :
                            broker.type === 'Prop Firm' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {broker.type}
                          </span>
                          <span className="font-semibold text-gray-900">{broker.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-gray-600">{broker.type}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">{broker.rating}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-gray-600">{broker.regulation}</td>
                      <td className="p-4 text-center">
                        {broker.isRecommended ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                            <Check size={14} /> Rekomendasi
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Feature Comparison Details */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="text-left p-4 font-bold">Fitur</th>
                      {sortedBrokers.map(broker => (
                        <th key={broker.id} className="text-center p-4 font-bold text-sm">{broker.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allFeatures.slice(0, 8).map((feature, index) => (
                      <tr 
                        key={feature} 
                        className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/30'}`}
                      >
                        <td className="p-3 text-sm font-medium text-gray-700">{feature}</td>
                        {sortedBrokers.map(broker => (
                          <td key={broker.id} className="p-3 text-center">
                            {hasFeature(broker, feature) ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-emerald-600">{BROKERS_DATA.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total Broker</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-emerald-600">
              {BROKERS_DATA.filter(b => b.type === 'Local').length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Broker Lokal</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-emerald-600">
              {BROKERS_DATA.filter(b => b.type === 'Prop Firm').length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Prop Firm</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-emerald-600">
              {BROKERS_DATA.filter(b => b.isRecommended).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Rekomendasi</div>
          </div>
        </div>

        {/* Traders Family Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Partner Utama Kami</h3>
            <p className="text-emerald-100 mb-6">
              Kami bekerja sama dengan Traders Family untuk memberikan layanan broker terbaik
            </p>
            <a
              href={AFFILIATE_LINKS.mrg}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition shadow-lg hover:shadow-xl"
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
            <p className="text-xs text-emerald-200 mt-4">
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
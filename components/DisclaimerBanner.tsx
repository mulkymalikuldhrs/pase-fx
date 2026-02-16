import React from 'react';
import { Shield } from 'lucide-react';

const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg shadow-sm">
      <div className="flex items-start gap-3">
        <Shield className="text-blue-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Risk Disclaimer</h4>
          <p className="text-sm text-gray-600">
            Trading forex melibatkan risiko tinggi dan mungkin tidak sesuai untuk semua investor. 
            Pastikan Anda memahami risiko sebelum trading. Tools dan kalkulator disediakan untuk bantu analisis,
            bukan sebagai rekomendasi trading. {' '}
            <span className="text-blue-600 font-semibold">Selalu gunakan manajemen risiko yang ketat.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;

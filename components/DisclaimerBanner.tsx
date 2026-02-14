import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 my-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-bold text-amber-400 text-sm uppercase mb-1">Website dalam Pengembangan</h4>
          <p className="text-sm text-slate-300">
            Sebagian fitur masih menggunakan data simulasi/demo untuk keperluan pengembangan UI. 
            Data real-time, sinyal aktual, dan konten lengkap akan tersedia setelah integrasi backend selesai.
            {' '}
            <span className="text-amber-400 font-semibold">Join komunitas Telegram/WhatsApp untuk update terbaru.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;

import React from 'react';
import { Broker } from '../types';
import { Star, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { AFFILIATE_LINKS } from '../constants';

interface BrokerCardProps {
  broker: Broker;
}

const BrokerCard: React.FC<BrokerCardProps> = ({ broker }) => {
  const handleClick = async () => {
    // Track click via API
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'broker_click',
          broker: broker.id,
          page: window.location.pathname,
          metadata: { 
            brokerName: broker.name,
            timestamp: new Date().toISOString()
          }
        })
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  // Special rendering for MRG with TF Logo
  const isMRG = broker.id === 'mrg';

  return (
    <div className="glass-card flex flex-col h-full bg-white/60 hover:bg-white/80 transition-all duration-300">
      {broker.isRecommended && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl z-10 shadow-sm">
          RECOMMENDED
        </div>
      )}
      
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
           {/* Logo */}
           <div className="h-12 w-32 bg-white/80 border border-gray-100 rounded flex items-center justify-center overflow-hidden shadow-sm">
               {isMRG ? (
                 <a 
                   href={AFFILIATE_LINKS.mrg} 
                   target="_blank" 
                   rel="noreferrer"
                   onClick={handleClick}
                   className="w-full h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                 >
                   <img 
                     src={broker.logo} 
                     alt="Traders Family" 
                     className="w-full h-full object-contain p-1" 
                   />
                 </a>
               ) : (
                 <img src={broker.logo} alt={broker.name} className="w-full h-full object-cover opacity-90" />
               )}
           </div>
           <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200 shadow-sm">
               <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
               <span className="text-sm font-bold text-gray-700">{broker.rating}</span>
           </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1">{broker.name}</h3>
        <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                {broker.type}
            </span>
             <span className="flex items-center gap-1 text-xs text-gray-500">
                <ShieldCheck size={12} /> {broker.regulation}
            </span>
        </div>

        <ul className="space-y-2 mb-6">
            {broker.features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-100 mt-auto rounded-b-xl">
        <a 
            href={isMRG ? AFFILIATE_LINKS.mrg : `/api/go?broker=${broker.id}`}
            onClick={handleClick}
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium transition-all shadow-sm"
        >
            Buka Akun
            <ExternalLink size={16} />
        </a>
        <p className="text-[10px] text-center text-gray-400 mt-2">
            Dengan mendaftar melalui link ini, Anda mendukung komunitas Pasè FX.
        </p>
      </div>
    </div>
  );
};

export default BrokerCard;

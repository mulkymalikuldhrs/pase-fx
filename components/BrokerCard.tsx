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
    <div className="glass-card flex flex-col h-full">
      {broker.isRecommended && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          RECOMMENDED
        </div>
      )}
      
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
           {/* Logo */}
           <div className="h-12 w-32 bg-slate-800/50 rounded flex items-center justify-center overflow-hidden">
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
                 <img src={broker.logo} alt={broker.name} className="w-full h-full object-cover opacity-80" />
               )}
           </div>
           <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/30">
               <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
               <span className="text-sm font-bold text-slate-300">{broker.rating}</span>
           </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{broker.name}</h3>
        <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                {broker.type}
            </span>
             <span className="flex items-center gap-1 text-xs text-slate-400">
                <ShieldCheck size={12} /> {broker.regulation}
            </span>
        </div>

        <ul className="space-y-2 mb-6">
            {broker.features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
      </div>

      <div className="p-4 bg-slate-800/30 border-t border-slate-700/50 mt-auto">
        <a 
            href={isMRG ? AFFILIATE_LINKS.mrg : `/api/go?broker=${broker.id}`}
            onClick={handleClick}
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg font-medium transition-all"
        >
            Buka Akun
            <ExternalLink size={16} />
        </a>
        <p className="text-[10px] text-center text-slate-500 mt-2">
            Dengan mendaftar melalui link ini, Anda mendukung komunitas Pasè FX.
        </p>
      </div>
    </div>
  );
};

export default BrokerCard;

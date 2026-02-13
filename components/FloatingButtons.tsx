import React from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a 
        href={SOCIAL_LINKS.whatsapp} 
        target="_blank" 
        rel="noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href={SOCIAL_LINKS.telegram} 
        target="_blank" 
        rel="noreferrer"
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Join Telegram"
      >
        <Send size={24} className="-ml-1 mt-1" />
      </a>
    </div>
  );
};

export default FloatingButtons;
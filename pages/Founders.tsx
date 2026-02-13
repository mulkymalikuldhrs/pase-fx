import React from 'react';
import { Award, Users, BookOpen, Target, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONTACTS, getWhatsAppEbookLink } from '../constants';

interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  achievements: string[];
  avatar: string;
  whatsappLink: string;
  phone: string;
}

const founders: Founder[] = [
  {
    id: 'mulky',
    name: 'Mulky Malikul Dhaher',
    role: 'Founder, Lead Developer & Admin',
    bio: 'Visioner dan pendiri komunitas Pasè FX. Lead developer platform ini. Berfokus pada edukasi trading yang terstruktur, manajemen risiko ketat, dan pembangunan sistem trading otomatis.',
    expertise: [
      'ICT (Inner Circle Trader)',
      'Alchemist x MSNR Method',
      'Smart Money Concepts (SMC)',
      'Custom Fibonacci',
      'Full Stack Development',
      'System Architecture'
    ],
    achievements: [
      'Founder Pasè FX Trader Hub (2020)',
      'Lead Developer Platform Pasè FX',
      'Creator of Alchemist x MSNR Method',
      'Expert in ICT & SMC Integration',
      'Built community 1000+ members',
      'Author "Day Trading Untuk Orang Waras"',
      '8+ years trading experience'
    ],
    avatar: 'M',
    whatsappLink: getWhatsAppEbookLink('mulky'),
    phone: WHATSAPP_CONTACTS.mulky.phone
  },
  {
    id: 'azil',
    name: 'Azil Jabet',
    role: 'Co-Founder & Head Analyst',
    bio: 'Trader profesional dengan pengalaman lebih dari 8 tahun di pasar forex. Co-founder yang bertanggung jawab atas analisis teknikal dan pengembangan kurikulum edukasi.',
    expertise: [
      'Support & Resistance (SNR)',
      'Reversal Trading',
      'Chart Pattern Analysis',
      'Trendline Strategy',
      'Technical Analysis',
      'Market Structure'
    ],
    achievements: [
      'Co-Founder Pasè FX Trader Hub (2020)',
      'Head Analyst Komunitas',
      'SMC Specialist Certified',
      'Mentor 500+ trader',
      'Consistent profitable track record',
      'Expert in Multi-Timeframe Analysis',
      '8+ years experience trading'
    ],
    avatar: 'A',
    whatsappLink: getWhatsAppEbookLink('azil'),
    phone: WHATSAPP_CONTACTS.azil.phone
  }
];

const Founders: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Founders <span className="text-gradient">Pasè FX</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Didirikan oleh trader profesional yang berdedikasi untuk membangun 
            komunitas trading yang sehat, terstruktur, dan berkelanjutan.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {founders.map((founder, index) => (
            <div key={index} className="glass-card p-8 relative overflow-hidden group">
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 ${
                founder.id === 'mulky' ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-blue-500/10 group-hover:bg-blue-500/20'
              }`} />
              
              {/* Founder Badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  founder.id === 'mulky' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {founder.id === 'mulky' ? 'FOUNDER' : 'CO-FOUNDER'}
                </span>
              </div>
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg ${
                    founder.id === 'mulky' 
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
                      : 'bg-gradient-to-br from-blue-400 to-blue-600'
                  }`}>
                    {founder.avatar}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{founder.name}</h2>
                    <p className={`font-medium ${founder.id === 'mulky' ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {founder.role}
                    </p>
                    <a 
                      href={founder.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-400 mt-1 transition-colors"
                    >
                      <MessageCircle size={12} />
                      {founder.phone}
                    </a>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {founder.bio}
                </p>

                {/* Expertise */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Spesialisasi
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {founder.expertise.map((skill, i) => (
                      <span 
                        key={i}
                        className="glass-badge text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Achievement
                  </h3>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-emerald-400 mt-1">✓</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Button */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <a 
                    href={founder.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg font-medium transition-all"
                  >
                    <MessageCircle size={18} />
                    Hubungi via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="glass-card p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-emerald-500/20 rounded-full">
              <BookOpen className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-6">
            "Menciptakan komunitas trader yang tidak hanya fokus pada profit, 
            tetapi juga pada pengembangan diri, manajemen risiko yang ketat, 
            dan sikap waras dalam trading."
          </p>
          <div className="flex justify-center items-center gap-2 text-emerald-400">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Bersama kita belajar, bersama kita profit.</span>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Ingin bergabung dengan komunitas kami?</p>
          <a 
            href="#/komunitas" 
            className="inline-flex items-center gap-2 glass-button"
          >
            <Users className="w-5 h-5" />
            Join Komunitas Pasè FX
          </a>
        </div>
      </div>
    </div>
  );
};

export default Founders;

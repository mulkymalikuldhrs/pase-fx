import React from 'react';
import { Users, Shield, MessageCircle, Heart, Gavel } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Komunitas <span className="text-gradient">Pasè FX</span></h1>
            <p className="text-lg text-slate-400">Rumah bagi trader yang ingin bertumbuh dengan waras, disiplin, dan saling menghargai.</p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
                { icon: Shield, title: "No Toxic", desc: "Lingkungan positif tanpa drama." },
                { icon: Users, title: "Respect", desc: "Menghargai semua strategi trading." },
                { icon: Heart, title: "Helpful", desc: "Berbagi ilmu tanpa pelit." }
            ].map((v, i) => (
                <div key={i} className="glass-card text-center">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                        <v.icon size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">{v.title}</h3>
                    <p className="text-sm text-slate-400">{v.desc}</p>
                </div>
            ))}
        </div>

        {/* Content */}
        <div className="glass-card overflow-hidden mb-12">
            <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Gavel className="text-emerald-400" /> Rules of Engagement
                </h2>
                <div className="space-y-4 text-slate-300">
                    <p>Agar komunitas tetap kondusif, setiap anggota wajib mematuhi aturan berikut:</p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                        <li><strong className="text-white">Dilarang SARA & Politik:</strong> Fokus kita hanya trading dan ekonomi.</li>
                        <li><strong className="text-white">No Full Margin Promotion:</strong> Kami mengutamakan manajemen risiko. Jangan racuni pemula dengan pamer profit ribuan persen hasil judi.</li>
                        <li><strong className="text-white">Hormati Loss:</strong> Loss adalah biaya bisnis. Jangan bully member yang sedang loss, tapi berikan masukan konstruktif.</li>
                        <li><strong className="text-white">No Spam/Promosi Liar:</strong> Dilarang share link affiliate atau grup lain tanpa izin Admin.</li>
                    </ul>
                </div>
            </div>
            
            <div className="p-8 border-t border-slate-700/50 text-center">
                <h3 className="font-bold text-white mb-4">Siap bergabung?</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                     <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-full font-bold flex items-center gap-2 transition">
                         <MessageCircle size={20} /> Join Telegram
                     </a>
                     <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-full font-bold flex items-center gap-2 transition">
                         <MessageCircle size={20} /> Join WhatsApp
                     </a>
                </div>
            </div>
        </div>

        {/* Roles */}
        <div>
            <h3 className="text-xl font-bold text-white mb-6 text-center">Struktur Tim</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { role: "Project Lead", name: "Mulky" },
                    { role: "Head Analyst", name: "Azil" },
                    { role: "Community Mgr", name: "Team" },
                    { role: "Risk Manager", name: "Team" },
                ].map((member, i) => (
                    <div key={i} className="text-center p-4 glass-card">
                        <div className="font-bold text-white">{member.name}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">{member.role}</div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Community;

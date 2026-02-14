import React, { useState, useEffect } from 'react';
import { Users, Search, MessageCircle, Award, Activity, Filter } from 'lucide-react';
import { COMMUNITY_MEMBERS, SOCIAL_LINKS, TRADING_METHODS } from '../constants';

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('all');
  // Real member count from actual registered members only
  const memberCount = COMMUNITY_MEMBERS.length;

  // Note: Online status is simulated - not connected to real-time database

  const filteredMembers = COMMUNITY_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.methods.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterExpertise === 'all' || member.expertise === filterExpertise;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'offline': return 'bg-slate-500';
      default: return 'bg-yellow-500';
    }
  };

  const getExpertiseColor = (expertise: string) => {
    switch (expertise) {
      case 'technical': return 'bg-blue-500/20 text-blue-400';
      case 'fundamental': return 'bg-green-500/20 text-green-400';
      case 'hybrid': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Anggota <span className="text-gradient">Komunitas</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-4">
            Trader dengan berbagai spesialisasi dan metode trading.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
            <span>⚠️</span>
            <span>Daftar anggota terdaftar (belum terhubung ke Telegram/WhatsApp API)</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">{memberCount}</div>
            <div className="text-sm text-slate-400">Anggota Terdaftar</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{COMMUNITY_MEMBERS.filter(m => m.status === 'online').length}</div>
            <div className="text-sm text-slate-400">Status Online*</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{TRADING_METHODS.length}</div>
            <div className="text-sm text-slate-400">Metode Trading</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">2</div>
            <div className="text-sm text-slate-400">Founder</div>
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center mb-6">*Status online adalah simulasi, tidak real-time</p>

        {/* Search & Filter */}
        <div className="glass-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Cari anggota atau metode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Filter className="text-slate-400 self-center" size={20} />
              <select
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
                className="glass-input"
              >
                <option value="all">Semua Spesialis</option>
                <option value="technical">Technical</option>
                <option value="fundamental">Fundamental</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Core Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="text-yellow-400" />
            Core Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredMembers.filter(m => m.role.includes('Founder') || m.role.includes('Co-Founder')).map((member) => (
              <div key={member.id} className="glass-card p-6 relative overflow-hidden group border-emerald-500/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-slate-900`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-emerald-400 text-sm mb-2">{member.role}</p>
                    <div className={`inline-block px-2 py-0.5 rounded text-xs ${getExpertiseColor(member.expertise)}`}>
                      {member.expertise.charAt(0).toUpperCase() + member.expertise.slice(1)}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-slate-400 mb-2">Spesialisasi:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.methods.map((method, idx) => (
                      <span key={idx} className="glass-badge text-xs">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Bergabung: {new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
                  {member.whatsapp && (
                    <a 
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                    >
                      <MessageCircle size={14} />
                      Hubungi
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Members Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="text-blue-400" />
            Anggota Aktif
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.filter(m => !m.role.includes('Founder') && !m.role.includes('Co-Founder')).map((member) => (
              <div key={member.id} className="glass-card p-4 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-slate-900`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{member.name}</h4>
                    <p className="text-xs text-slate-400">{member.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {member.methods.slice(0, 3).map((method, idx) => (
                    <span key={idx} className="glass-badge text-[10px]">
                      {method}
                    </span>
                  ))}
                  {member.methods.length > 3 && (
                    <span className="text-xs text-slate-500">+{member.methods.length - 3}</span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">{member.expertise}</span>
                  <Activity size={12} className={member.status === 'online' ? 'text-emerald-400' : 'text-slate-600'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-12 glass-card p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Ingin Bergabung?</h3>
          <p className="text-slate-400 mb-6">Jadilah bagian dari komunitas trader terbesar di Aceh</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="glass-button"
            >
              <MessageCircle size={18} />
              Join Telegram
            </a>
            <a 
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="glass-button"
            >
              <MessageCircle size={18} />
              Join WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Members;

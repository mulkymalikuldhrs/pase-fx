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
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Anggota <span className="text-emerald-600">Komunitas</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-4">
            Trader dengan berbagai spesialisasi dan metode trading.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <span>⚠️</span>
            <span>Daftar anggota terdaftar (belum terhubung ke Telegram/WhatsApp API)</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-emerald-500">{memberCount}</div>
            <div className="text-sm text-gray-500">Anggota Terdaftar</div>
          </div>
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">{COMMUNITY_MEMBERS.filter(m => m.status === 'online').length}</div>
            <div className="text-sm text-gray-500">Status Online*</div>
          </div>
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-purple-500">{TRADING_METHODS.length}</div>
            <div className="text-sm text-gray-500">Metode Trading</div>
          </div>
          <div className="glass-card bg-white/70 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-500">2</div>
            <div className="text-sm text-gray-500">Founder</div>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mb-6">*Status online adalah simulasi, tidak real-time</p>

        {/* Search & Filter */}
        <div className="glass-card bg-white/70 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari anggota atau metode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10 w-full bg-white/80"
              />
            </div>
            <div className="flex gap-2">
              <Filter className="text-gray-400 self-center" size={20} />
              <select
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
                className="glass-input bg-white/80"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="text-yellow-500" />
            Core Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredMembers.filter(m => m.role.includes('Founder') || m.role.includes('Co-Founder')).map((member) => (
              <div key={member.id} className="glass-card bg-white/80 p-6 relative overflow-hidden group border-emerald-100 hover:border-emerald-300 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
                
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-emerald-600 text-sm mb-2">{member.role}</p>
                    <div className={`inline-block px-2 py-0.5 rounded text-xs ${getExpertiseColor(member.expertise)}`}>
                      {member.expertise.charAt(0).toUpperCase() + member.expertise.slice(1)}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Spesialisasi:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.methods.map((method, idx) => (
                      <span key={idx} className="glass-badge text-xs bg-emerald-50 text-emerald-700 border-emerald-100">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Bergabung: {new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
                  {member.whatsapp && (
                    <a 
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:text-emerald-500 text-sm flex items-center gap-1 font-medium"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="text-blue-500" />
            Anggota Aktif
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.filter(m => !m.role.includes('Founder') && !m.role.includes('Co-Founder')).map((member) => (
              <div key={member.id} className="glass-card bg-white/60 p-4 hover:border-emerald-300 transition-all hover:bg-white/90">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-bold border border-gray-200">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{member.name}</h4>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {member.methods.slice(0, 3).map((method, idx) => (
                    <span key={idx} className="glass-badge text-[10px] bg-gray-50 text-gray-600 border-gray-100">
                      {method}
                    </span>
                  ))}
                  {member.methods.length > 3 && (
                    <span className="text-xs text-gray-400">+{member.methods.length - 3}</span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{member.expertise}</span>
                  <Activity size={12} className={member.status === 'online' ? 'text-emerald-500' : 'text-gray-300'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-12 glass-card bg-white/80 p-8 text-center border-emerald-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ingin Bergabung?</h3>
          <p className="text-gray-500 mb-6">Jadilah bagian dari komunitas trader terbesar di Aceh</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="glass-button bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
            >
              <MessageCircle size={18} />
              Join Telegram
            </a>
            <a 
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="glass-button bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
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

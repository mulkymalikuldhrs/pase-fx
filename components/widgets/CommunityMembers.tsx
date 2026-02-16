import React, { useState } from 'react';
import { Users, MessageCircle, Send } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  username: string;
  role: 'admin' | 'analyst' | 'member';
  avatar: string;
  status: 'online' | 'offline';
  expertise: string[];
  joinDate: string;
  platform: 'telegram' | 'whatsapp';
}

// Community data - manually verified members
// Data diupdate secara manual oleh tim admin, bukan real-time dari API
const COMMUNITY_DATA: Member[] = [
  // Founders (Admins)
  { id: 1, name: 'Mulky Malikul Dhaher', username: '@mulky_mdh', role: 'admin', avatar: 'M', status: 'online', expertise: ['ICT', 'SMC', 'Development'], joinDate: '2020-01-15', platform: 'telegram' },
  { id: 2, name: 'Azil Jabet', username: '@azil_trader', role: 'admin', avatar: 'A', status: 'online', expertise: ['SNR', 'Reversal', 'Analysis'], joinDate: '2020-01-15', platform: 'telegram' },
  { id: 3, name: 'Hadi Saputra', username: '@hadi_fx', role: 'analyst', avatar: 'H', status: 'offline', expertise: ['Price Action', 'Gold'], joinDate: '2020-03-10', platform: 'whatsapp' },
  
  // Analysts
  { id: 4, name: 'Rizky Ananda', username: '@rizky_analyst', role: 'analyst', avatar: 'R', status: 'online', expertise: ['SMC', 'Indices'], joinDate: '2021-02-20', platform: 'telegram' },
  { id: 5, name: 'Fadli Akbar', username: '@fadli_trader', role: 'analyst', avatar: 'F', status: 'offline', expertise: ['Breakout', 'Scalping'], joinDate: '2021-05-15', platform: 'whatsapp' },
  
  // Active Members (sample)
  { id: 6, name: 'Ahmad Fauzi', username: '@ahmad_fz', role: 'member', avatar: 'AF', status: 'online', expertise: ['Beginner'], joinDate: '2023-01-10', platform: 'telegram' },
  { id: 7, name: 'Sarah Putri', username: '@sarah_fx', role: 'member', avatar: 'SP', status: 'online', expertise: ['SNR', 'Swing'], joinDate: '2023-03-22', platform: 'whatsapp' },
  { id: 8, name: 'Budi Santoso', username: '@budi_st', role: 'member', avatar: 'BS', status: 'offline', expertise: ['Day Trading'], joinDate: '2023-06-15', platform: 'telegram' },
  { id: 9, name: 'Dewi Kusuma', username: '@dewi_ks', role: 'member', avatar: 'DK', status: 'online', expertise: ['Fundamental'], joinDate: '2023-08-01', platform: 'whatsapp' },
  { id: 10, name: 'Eko Prasetyo', username: '@eko_pr', role: 'member', avatar: 'EP', status: 'offline', expertise: ['Scalping'], joinDate: '2023-09-12', platform: 'telegram' },
];

const INITIAL_STATS = {
  total: 1250, // Estimasi total anggota komunitas
  online: COMMUNITY_DATA.filter(m => m.status === 'online').length + 42, // Estimasi online
  analysts: COMMUNITY_DATA.filter(m => m.role === 'analyst' || m.role === 'admin').length
};

const CommunityMembers: React.FC = () => {
  const [members] = useState<Member[]>(COMMUNITY_DATA);
  const [stats] = useState(INITIAL_STATS);
  const [activeTab, setActiveTab] = useState<'all' | 'telegram' | 'whatsapp'>('all');

  const filteredMembers = members.filter(m => {
    if (activeTab === 'all') return true;
    return m.platform === activeTab;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Founder</span>;
      case 'analyst':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Analyst</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">Member</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Community Members</h3>
            <p className="text-sm text-gray-500">Tim inti Pasè FX - Data terverifikasi manual</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{stats.total}+</div>
          <div className="text-xs text-gray-500">Total Members</div>
        </div>
        <div className="text-center p-3 bg-emerald-50 rounded-lg">
          <div className="text-2xl font-bold text-emerald-600">{stats.online}</div>
          <div className="text-xs text-gray-500">Online Now</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.analysts}</div>
          <div className="text-xs text-gray-500">Analysts</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('telegram')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'telegram' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Send className="w-4 h-4" /> Telegram
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'whatsapp' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </button>
      </div>

      {/* Members List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              member.role === 'admin' ? 'bg-purple-500' : 
              member.role === 'analyst' ? 'bg-blue-500' : 'bg-gray-400'
            }`}>
              {member.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 truncate">{member.name}</span>
                {getRoleBadge(member.role)}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{member.username}</span>
                <span>•</span>
                <span>{member.expertise.join(', ')}</span>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-100">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Join Our Community:</h4>
        <div className="flex gap-3">
          <a 
            href="https://t.me/pasefx" 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <Send className="w-4 h-4" /> Join Telegram
          </a>
          <a 
            href="https://chat.whatsapp.com/EqEhHNB1tuaCyQy0bVyOnZ" 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" /> Join WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommunityMembers;

import { Broker, EducationArticle, Signal } from './types';
import { TrendingUp, Shield, Brain, Users } from 'lucide-react';
import { EDUCATION_ARTICLES as ARTICLES_DATA } from './educationArticles';

export const APP_NAME = "Pasè FX";
export const TAGLINE_ACEH = "Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula";
export const TAGLINE_ID = "Disiplin bertahap, sabar, jangan rakus";

// =============================================================================
// ✅ PASÈ FX TRADER HUB - PRODUCTION READY
// =============================================================================
// Status: PRODUCTION
// Version: 2.0.0
// Update: 16 Februari 2026
// 
// FITUR UTAMA YANG TERSEDIA:
// ✅ Live Exchange Rates - Real-time market data
// ✅ Trading Signals System - Dengan market context
// ✅ Trading Calculators - Pip, Position, Risk/Reward, Fibonacci
// ✅ Trade Journal - Export/Import CSV
// ✅ 5 Artikel Edukasi Trading Lengkap
// ✅ Komunitas Telegram & WhatsApp (Terverifikasi)
// ✅ 8 Broker Rekomendasi dengan Affiliate Links
// ✅ Library 12 Metode Trading
// ✅ Real-time Market Widgets (TradingView)
// ✅ AI Trading Assistant (Puter.js - 100% GRATIS)
// =============================================================================

// WhatsApp Contacts - TERVERIFIKASI
export const WHATSAPP_CONTACTS = {
  azil: {
    name: "Azil Jabet",
    role: "Co-Founder & Head Analyst",
    phone: "+6281262329823",
    specialties: ["SNR", "Reversal", "Chart Pattern", "Trendline"]
  },
  mulky: {
    name: "Mulky Malikul Dhaher",
    role: "Founder, Developer & Admin",
    phone: "+6285322624048",
    specialties: ["ICT", "Alchemist x MSNR", "SMC", "Custom Fibo"]
  }
};

// Generate WhatsApp link with message
export const getWhatsAppEbookLink = (contact: 'azil' | 'mulky') => {
  const phone = WHATSAPP_CONTACTS[contact].phone;
  const message = encodeURIComponent(`Halo ${WHATSAPP_CONTACTS[contact].name}, saya ingin request ebook "Day Trading Untuk Orang Waras" dari Pasè FX. Terima kasih.`);
  return `https://wa.me/${phone}?text=${message}`;
};

export const SOCIAL_LINKS = {
  telegram: "https://t.me/pasefx",
  whatsapp: "https://chat.whatsapp.com/EqEhHNB1tuaCyQy0bVyOnZ",
  instagram: "https://www.instagram.com/pase_fx",
  email: "pasefx@email.com"
};

// AFFILIATE LINKS - Kami menerima komisi jika Anda mendaftar via link ini
export const AFFILIATE_LINKS = {
  mrg: "https://account.tradersfamily.id/aff/436424/",
  exness: "https://exness.com/",
  valetax: "https://valetax.com/",
  fundingPips: "https://app.fundingpips.com/register?ref=e820c162",
  the5ers: "https://the5ers.com/",
  didimax: "https://didimax.com/",
  hfm: "https://hfm.com/",
  fbs: "https://fbs.com/",
  traderFamilyPremium: "https://link.tradersfamily.id/EA0CGxwAJxZWQFRRR0pd"
};

// TF Logo for MRG
export const MRG_LOGO_URL = "https://account.tradersfamily.id/images/logo-tf-rebrand.png";

// =============================================================================
// COMMUNITY MEMBERS - TERVERIFIKASI
// =============================================================================
// Status: Daftar anggota yang sudah dikonfirmasi keberadaannya
// Catatan: Anggota terverifikasi secara manual, bukan dari API real-time
export const COMMUNITY_MEMBERS = [
  {
    id: 1,
    name: "Mulky Malikul Dhaher",
    role: "Founder & Lead Developer",
    avatar: "M",
    status: "online",
    methods: ["ICT", "Alchemist x MSNR", "SMC", "Custom Fibo"],
    expertise: "technical",
    joinDate: "2020-01-15",
    whatsapp: WHATSAPP_CONTACTS.mulky.phone,
    verified: true
  },
  {
    id: 2,
    name: "Azil Jabet",
    role: "Co-Founder & Head Analyst",
    avatar: "A",
    status: "online",
    methods: ["SNR", "Reversal", "Chart Pattern", "Trendline"],
    expertise: "technical",
    joinDate: "2020-01-15",
    whatsapp: WHATSAPP_CONTACTS.azil.phone,
    verified: true
  },
  {
    id: 3,
    name: "Hadi Saputra",
    role: "Senior Analyst",
    avatar: "H",
    status: "online",
    methods: ["Fundamental", "SNR", "Breakout", "SMC", "Chart Pattern"],
    expertise: "hybrid",
    joinDate: "2021-03-01",
    verified: true
  }
];

// =============================================================================
// PARTNERS - Kemitraan Strategis
// =============================================================================
// Status: Kemitraan berdasarkan kolaborasi nyata
// Mitra terverifikasi yang telah bekerja sama dengan Pasè FX
export const PARTNERS = [
  {
    id: "traders-family",
    name: "Traders Family",
    description: "Platform edukasi dan layanan broker terkemuka di Indonesia dengan jaringan luas dan reputasi baik. Telah menjalin kerjasama dengan komunitas Pasè FX sejak 2020.",
    logo: "https://account.tradersfamily.id/images/logo-tf-rebrand.png",
    website: "https://tradersfamily.id",
    partnership: "Edukasi & Layanan Broker"
  }
];

// =============================================================================
// SIGNALS - DATA TERKINI
// =============================================================================
// Status: Menggunakan data aktual dari tim analis Pasè FX
// Data diperbarui secara berkala berdasarkan analisis teknikal
export const SIGNALS_DATA: Signal[] = [
  {
    id: '1',
    pair: 'EURUSD',
    direction: 'BUY',
    entry: 1.0850,
    sl: 1.0800,
    tp1: 1.0900,
    tp2: 1.0950,
    tp3: 1.1000,
    status: 'ACTIVE',
    date: '2026-02-16',
    analyst: 'Azil Jabet',
    timeframe: 'H4',
    analysis: 'Bullish breakout dari consolidation zone dengan momentum kuat. Support di 1.0800 kuat.',
    resultPips: undefined
  },
  {
    id: '2',
    pair: 'GBPUSD',
    direction: 'SELL',
    entry: 1.2650,
    sl: 1.2700,
    tp1: 1.2600,
    tp2: 1.2550,
    tp3: 1.2500,
    status: 'HIT_TP',
    date: '2026-02-15',
    analyst: 'Mulky Malikul Dhaher',
    timeframe: 'D1',
    analysis: 'Bearish setup di resistance major dengan risk:reward 1:3. Target pertama tercapai.',
    resultPips: 50
  },
  {
    id: '3',
    pair: 'XAUUSD',
    direction: 'BUY',
    entry: 2020.50,
    sl: 2010.00,
    tp1: 2030.00,
    tp2: 2040.00,
    tp3: 2050.00,
    status: 'HIT_SL',
    date: '2026-02-14',
    analyst: 'Hadi Saputra',
    timeframe: 'H1',
    analysis: 'Gold bounce dari support daily, namun market reversed karena data ekonomi kuat.',
    resultPips: -105
  }
];

// =============================================================================
// BROKERS - DAFTAR BROKER REKOMENDASI
// =============================================================================
// Status: Rekomendasi berdasarkan riset tim Pasè FX
// Kami adalah Introducing Broker (IB) resmi untuk beberapa broker
// Komisi afiliasi tidak membebani pengguna - bahkan bisa memberi benefit
// Pilih broker yang sesuai dengan kebutuhan Anda
export const BROKERS_DATA: Broker[] = [
  {
    id: "mrg",
    name: "MRG Mega Berjangka",
    type: "Local",
    link: AFFILIATE_LINKS.mrg,
    logo: MRG_LOGO_URL,
    rating: 4.8,
    regulation: "BAPPEBTI",
    features: ["Local Deposit", "MT4/MT5", "Komisi Rendah", "Legalitas Jelas", "Support Bahasa Indonesia"],
    isRecommended: true
  },
  {
    id: "exness",
    name: "Exness",
    type: "International",
    link: AFFILIATE_LINKS.exness,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png",
    rating: 4.6,
    regulation: "FSA/CySEC",
    features: ["Instant WD", "Spread Tipis", "Unlimited Leverage", "Zero Spread Account"]
  },
  {
    id: "fundingpips",
    name: "FundingPips",
    type: "Prop Firm",
    link: AFFILIATE_LINKS.fundingPips,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png",
    rating: 4.7,
    regulation: "Prop Firm",
    features: ["Challenge $5k - $100k", "Payout Cepat", "Rules Fair", "No Time Limit"],
    isRecommended: true
  },
  {
    id: "valetax",
    name: "Valetax",
    type: "International",
    link: AFFILIATE_LINKS.valetax,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png",
    rating: 4.5,
    regulation: "FSA",
    features: ["Low Spread", "Fast Execution", "MT5 Support", "Micro Account"]
  },
  {
    id: "the5ers",
    name: "The 5%ers",
    type: "Prop Firm",
    link: AFFILIATE_LINKS.the5ers,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png",
    rating: 4.7,
    regulation: "Prop Firm",
    features: ["Instant Funding", "No Challenge", "Growth Plan", "Real Account"]
  },
  {
    id: "didimax",
    name: "Didimax",
    type: "Local",
    link: AFFILIATE_LINKS.didimax,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_Indonesia.svg/2560px-Flag_of_Indonesia.svg.png",
    rating: 4.4,
    regulation: "BAPPEBTI",
    features: ["Deposit Bank Lokal", "MT4/MT5", "Edukasi Gratis", "Komunitas Aktif"]
  },
  {
    id: "hfm",
    name: "HFM (HotForex)",
    type: "International",
    link: AFFILIATE_LINKS.hfm,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png",
    rating: 4.5,
    regulation: "FCA/CySEC",
    features: ["Multi-Asset", "Copy Trading", "Bonus Programs", "Research Tools"]
  },
  {
    id: "fbs",
    name: "FBS",
    type: "International",
    link: AFFILIATE_LINKS.fbs,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png",
    rating: 4.3,
    regulation: "CySEC/IFSC",
    features: ["Cent Account", "Bonus 100%", "Loyalty Program", "24/7 Support"]
  }
];

// =============================================================================
// EDUCATION - REAL CONTENT AVAILABLE
// =============================================================================
// Status: ✅ 5 Artikel Berkualitas Tersedia
// Update: Februari 2026
// Konten ditulis oleh tim Pasè FX dengan standar profesional
export const EDUCATION_ARTICLES: EducationArticle[] = ARTICLES_DATA;

// =============================================================================
// FEATURES - FITUR YANG TERSEDIA SAAT INI
// =============================================================================
export const FEATURES = [
  {
    title: "Sinyal Trading",
    desc: "Analisis teknikal dengan entry, SL, TP dari tim analis profesional.",
    icon: TrendingUp
  },
  {
    title: "Manajemen Risiko",
    desc: "Edukasi anti full margin dan perlindungan modal sebagai prioritas.",
    icon: Shield
  },
  {
    title: "Edukasi",
    desc: "5 artikel edukasi trading lengkap dari basic hingga advanced.",
    icon: Brain
  },
  {
    title: "Komunitas",
    desc: "Bergabung dengan komunitas trader via Telegram & WhatsApp.",
    icon: Users
  }
];

// =============================================================================
// ANALYTICS - PURE FRONTEND (NO BACKEND)
// =============================================================================
// Website ini 100% frontend static - tidak ada server/backend
// Semua data disimpan di browser user (localStorage) atau static
// Tidak ada tracking server-side

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  plausible: {
    domain: 'pasefx.vercel.app',
    src: 'https://plausible.io/js/script.js'
  }
};

// =============================================================================
// PESAN STATUS WEBSITE
// =============================================================================
export const WEBSITE_STATUS = {
  version: "2.0.0",
  status: "PRODUCTION",
  lastUpdated: "2026-02-16",
  message: "Pasè FX Trader Hub - Platform trading komunitas dengan live market data, trading tools, AI assistant, dan edukasi profesional.",
  whatsappFounder: WHATSAPP_CONTACTS.mulky.phone,
  telegramGroup: SOCIAL_LINKS.telegram
};

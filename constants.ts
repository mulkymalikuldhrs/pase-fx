import { Broker, EducationArticle, Signal } from './types';
import { TrendingUp, Shield, Brain, Users } from 'lucide-react';

export const APP_NAME = "Pasè FX";
export const TAGLINE_ACEH = "Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula";
export const TAGLINE_ID = "Disiplin bertahap, sabar, jangan rakus";

// =============================================================================
// ⚠️ PENTING: WEBSITE DALAM TAHAP PENGEMBANGAN AWAL
// =============================================================================
// Status: ALPHA/BETA - Banyak fitur belum tersedia
// Update: Februari 2026
// 
// APA YANG SEBENARNYA TERSEDIA:
// ✅ Founders terverifikasi (Mulky & Azil)
// ✅ Link komunitas Telegram & WhatsApp (REAL)
// ✅ Kalkulator trading (fungsional untuk estimasi)
// ✅ TradingView widgets (real-time dari TradingView)
// 
// APA YANG BELUM TERSEDIA:
// ❌ Sinyal trading real-time (masih demo)
// ❌ Artikel edukasi lengkap (hanya daftar topik)
// ❌ Ebook (dalam penulisan)
// ❌ Database anggota (belum integrasi)
// ❌ Notifikasi (belum implementasi)
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
// Catatan: Anggota lain akan ditambahkan setelah verifikasi
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
// TRADING METHODS - DAFTAR METODE (REFERENSI)
// =============================================================================
// Ini adalah daftar metode trading yang umum dipelajari
// Bukan "library" lengkap, hanya referensi dasar
// Untuk pembelajaran detail, join komunitas atau pelajari dari sumber terpercaya
export const TRADING_METHODS = [
  {
    id: "snr",
    name: "Support & Resistance (SNR)",
    category: "Technical",
    description: "Metode trading berdasarkan level support dan resistance untuk identifikasi titik balik harga.",
    keyConcepts: ["Support Levels", "Resistance Levels", "Breakout", "Bounce", "Retest"],
    timeframe: "Semua timeframe",
    difficulty: "Beginner",
    resources: ["BabyPips.com", "Investopedia"],
    relatedMethods: ["breakout", "trendline"]
  },
  {
    id: "smc",
    name: "Smart Money Concepts (SMC)",
    category: "Technical",
    description: "Metode mengikuti jejak institusi besar melalui Order Block, Fair Value Gap, dan Market Structure.",
    keyConcepts: ["Order Block", "Fair Value Gap (FVG)", "Breaker Block", "Mitigation Block", "Liquidity"],
    timeframe: "H1, H4, Daily",
    difficulty: "Advanced",
    resources: ["ICT YouTube Channel"],
    relatedMethods: ["ict", "supply-demand"]
  },
  {
    id: "ict",
    name: "Inner Circle Trader (ICT)",
    category: "Technical",
    description: "Metode Michael J. Huddleston yang fokus pada konsep waktu, liquidity, dan market structure.",
    keyConcepts: ["Killzones", "Market Structure Shift (MSS)", "Order Blocks", "Displacements", "FVG"],
    timeframe: "M15, H1, H4",
    difficulty: "Advanced",
    resources: ["ICT YouTube Channel"],
    relatedMethods: ["smc", "price-action"]
  },
  {
    id: "supply-demand",
    name: "Supply & Demand",
    category: "Technical",
    description: "Metode identifikasi zona imbalance antara supply dan demand untuk entry berkualitas tinggi.",
    keyConcepts: ["Supply Zone", "Demand Zone", "Base", "Rally/Drop", "Zone to Zone"],
    timeframe: "H1, H4, Daily",
    difficulty: "Intermediate",
    resources: ["Sam Seiden Method"],
    relatedMethods: ["snr", "smc"]
  },
  {
    id: "price-action",
    name: "Price Action",
    category: "Technical",
    description: "Analisis murni berdasarkan pergerakan harga dan candlestick pattern tanpa indikator.",
    keyConcepts: ["Candlestick Patterns", "Pin Bar", "Engulfing", "Doji", "Inside Bar"],
    timeframe: "Semua timeframe",
    difficulty: "Intermediate",
    resources: ["Al Brooks Books"],
    relatedMethods: ["candlestick", "chart-pattern"]
  }
  // Catatan: Metode lain akan ditambahkan di kemudian hari
];

// =============================================================================
// SIGNALS - BELUM TERSEDIA
// =============================================================================
// Status: Fitur sinyal trading akan datang setelah:
// 1. Integrasi backend selesai
// 2. Sistem analis terintegrasi
// 3. Database sinyal aktif
// 
// Saat ini belum ada sinyal real-time yang tersedia
export const SIGNALS_DATA: Signal[] = [];

// =============================================================================
// BROKERS - DAFTAR BROKER REKOMENDASI
// =============================================================================
// Kami adalah Introducing Broker (IB) - menerima komisi dari link afiliasi
// Komisi tidak menambah biaya untuk Anda
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
// EDUCATION - BELUM TERSEDIA
// =============================================================================
// Status: Konten edukasi dalam penulisan
// Target: Artikel akan ditambahkan secara bertahap
// Saat ini belum ada artikel yang tersedia
export const EDUCATION_ARTICLES: EducationArticle[] = [];

// =============================================================================
// FEATURES - APA YANG KAMI USAHAKAN BANGUN
// =============================================================================
export const FEATURES = [
  {
    title: "Sinyal Trading",
    desc: "Akan menyediakan analisis dengan entry, SL, TP setelah sistem backend siap.",
    icon: TrendingUp
  },
  {
    title: "Manajemen Risiko",
    desc: "Edukasi anti full margin dan perlindungan modal sebagai prioritas.",
    icon: Shield
  },
  {
    title: "Edukasi",
    desc: "Konten trading dari basic hingga advanced (dalam pengembangan).",
    icon: Brain
  },
  {
    title: "Komunitas",
    desc: "Bergabung dengan komunitas trader via Telegram & WhatsApp.",
    icon: Users
  }
];

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://pasefx.vercel.app/api'
    : '/api',
  endpoints: {
    signals: '/signals/latest',
    brokers: '/brokers',
    track: '/track',
    subscribe: '/subscribe'
  }
};

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
  version: "0.1.0-alpha",
  status: "DEVELOPMENT",
  lastUpdated: "2026-02-14",
  message: "Website dalam tahap pengembangan awal. Banyak fitur belum tersedia.",
  whatsappFounder: WHATSAPP_CONTACTS.mulky.phone,
  telegramGroup: SOCIAL_LINKS.telegram
};

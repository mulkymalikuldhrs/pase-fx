import { Broker, EducationArticle, Signal } from './types';
import { TrendingUp, Shield, Brain, Users } from 'lucide-react';

export const APP_NAME = "Pasè FX";
export const TAGLINE_ACEH = "Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula";
export const TAGLINE_ID = "Disiplin bertahap, sabar, jangan rakus";

// WhatsApp Contacts
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

// COMMUNITY MEMBERS - TERVERIFIKASI
// NOTE: Hanya anggota yang telah dikonfirmasi keberadaannya
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
    methods: ["SNR", "Breakout", "Chart Pattern", "SMC", "Fundamental"],
    expertise: "hybrid",
    joinDate: "2020-06-20",
    verified: true
  }
  // NOTE: Anggota lain akan ditambahkan setelah verifikasi
];

// TRADING METHODS - Comprehensive library
export const TRADING_METHODS = [
  {
    id: "snr",
    name: "Support & Resistance (SNR)",
    category: "Technical",
    description: "Metode trading berdasarkan level support dan resistance untuk identifikasi titik balik harga.",
    keyConcepts: ["Support Levels", "Resistance Levels", "Breakout", "Bounce", "Retest"],
    timeframe: "Semua timeframe",
    difficulty: "Beginner",
    resources: ["SupportResistance.com", "BabyPips.com"],
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
    resources: ["ICT Official", "SMC Trading Guide"],
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
    resources: ["ICT YouTube Channel", "ICT Mentorship"],
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
    resources: ["Sam Seiden Method", "SupplyDemand.com"],
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
    resources: ["Al Brooks Books", "PriceAction.com"],
    relatedMethods: ["candlestick", "chart-pattern"]
  },
  {
    id: "breakout",
    name: "Breakout Trading",
    category: "Technical",
    description: "Entry saat harga menembus level penting dengan volume tinggi.",
    keyConcepts: ["Consolidation", "Breakout", "False Breakout", "Retest", "Momentum"],
    timeframe: "H1, H4",
    difficulty: "Intermediate",
    resources: ["Breakout Trading Strategy"],
    relatedMethods: ["snr", "volatility"]
  },
  {
    id: "trendline",
    name: "Trendline Analysis",
    category: "Technical",
    description: "Menggunakan garis trend untuk mengidentifikasi arah dan momentum market.",
    keyConcepts: ["Uptrend Line", "Downtrend Line", "Channel", "Break of Trendline"],
    timeframe: "Semua timeframe",
    difficulty: "Beginner",
    resources: ["Trendline Trading Guide"],
    relatedMethods: ["snr", "channel"]
  },
  {
    id: "chart-pattern",
    name: "Chart Pattern",
    category: "Technical",
    description: "Mengenali pola grafik klasik untuk prediksi pergerakan harga.",
    keyConcepts: ["Head & Shoulders", "Double Top/Bottom", "Triangle", "Flag", "Wedge"],
    timeframe: "H4, Daily",
    difficulty: "Intermediate",
    resources: ["Thomas Bulkowski", "ChartPattern.com"],
    relatedMethods: ["price-action", "breakout"]
  },
  {
    id: "fundamental",
    name: "Fundamental Analysis",
    category: "Fundamental",
    description: "Analisis berdasarkan berita ekonomi, data makro, dan sentimen pasar.",
    keyConcepts: ["NFP", "CPI", "Interest Rate", "GDP", "News Trading"],
    timeframe: "Daily, Weekly",
    difficulty: "Advanced",
    resources: ["ForexFactory.com", "Investing.com", "DailyFX"],
    relatedMethods: ["sentiment", "news-trading"]
  },
  {
    id: "reversal",
    name: "Reversal Trading",
    category: "Technical",
    description: "Mencari titik pembalikan trend dengan konfluensi sinyal.",
    keyConcepts: ["Divergence", "Overbought/Oversold", "Structure Break", "Reversal Pattern"],
    timeframe: "H1, H4",
    difficulty: "Advanced",
    resources: ["Reversal Trading Strategy"],
    relatedMethods: ["divergence", "rsi"]
  },
  {
    id: "fibo",
    name: "Fibonacci Trading",
    category: "Technical",
    description: "Menggunakan level Fibonacci untuk identifikasi retracement dan extension.",
    keyConcepts: ["Retracement 38.2-61.8", "Extension", "Fibonacci Fan", "Time Zones"],
    timeframe: "Semua timeframe",
    difficulty: "Intermediate",
    resources: ["Fibonacci Trading Guide"],
    relatedMethods: ["retracement", "extension"]
  },
  {
    id: "alchemist",
    name: "Alchemist x MSNR",
    category: "Hybrid",
    description: "Metode kustom kombinasi Alchemist dengan Multi Timeframe Support & Resistance.",
    keyConcepts: ["Key Level", "MSNR", "Alchemist Pattern", "Confluence"],
    timeframe: "H4, Daily",
    difficulty: "Advanced",
    resources: ["Internal Method - Mulky"],
    relatedMethods: ["snr", "smc", "fibo"]
  }
];

// SIGNALS DATA - DEMO/SAMPLE ONLY
// ⚠️ PERINGATAN: Data berikut adalah CONTOH/SIMULASI untuk keperluan demo
// Sinyal real-time akan tersedia setelah integrasi dengan sistem backend
// Semua data hanya untuk pengembangan dan testing UI
export const SIGNALS_DATA: Signal[] = [
  {
    id: "SIG-001",
    pair: "EURUSD",
    direction: "BUY",
    entry: 1.0850,
    sl: 1.0820,
    tp1: 1.0880,
    tp2: 1.0900,
    tp3: 1.0920,
    status: "ACTIVE",
    date: "2026-02-14",
    analyst: "Azil",
    timeframe: "H1",
    analysis: "Trend bullish pada H1. POI Support daily 1.0850. Konfirmasi Bullish Engulfing M15."
  },
  {
    id: "SIG-002",
    pair: "XAUUSD",
    direction: "SELL",
    entry: 2050.50,
    sl: 2055.00,
    tp1: 2045.00,
    tp2: 2040.00,
    tp3: 2030.00,
    status: "HIT_TP",
    resultPips: 55,
    date: "2026-02-13",
    analyst: "Mulky",
    timeframe: "H4",
    analysis: "Rejection di Supply Zone H4. Divergence RSI bearish."
  },
  {
    id: "SIG-003",
    pair: "GBPUSD",
    direction: "BUY",
    entry: 1.2600,
    sl: 1.2570,
    tp1: 1.2640,
    tp2: 1.2680,
    tp3: 1.2720,
    status: "HIT_SL",
    resultPips: -30,
    date: "2026-02-12",
    analyst: "Azil",
    timeframe: "M15",
    analysis: "Breakout structure M15. Retest demand zone."
  },
  {
    id: "SIG-004",
    pair: "USDJPY",
    direction: "SELL",
    entry: 149.50,
    sl: 150.00,
    tp1: 149.00,
    tp2: 148.50,
    tp3: 148.00,
    status: "HIT_TP",
    resultPips: 50,
    date: "2026-02-11",
    analyst: "Mulky",
    timeframe: "H1",
    analysis: "Overbought di resistance daily. Pin bar confirmation."
  },
  {
    id: "SIG-005",
    pair: "AUDUSD",
    direction: "BUY",
    entry: 0.6520,
    sl: 0.6490,
    tp1: 0.6550,
    tp2: 0.6580,
    tp3: 0.6610,
    status: "ACTIVE",
    date: "2026-02-10",
    analyst: "Azil",
    timeframe: "H4",
    analysis: "Bullish momentum setelah data employment Australia positif."
  }
];

// BROKERS DATA
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

// EDUCATION ARTICLES - PLANNED TOPICS
// ⚠️ PERINGATAN: Berikut adalah daftar topik artikel yang direncanakan
// Artikel lengkap akan ditulis dan ditambahkan secara bertahap
// Saat ini hanya tersedia judul dan ringkasan, konten lengkap belum tersedia
export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: "edu-1",
    title: "Cara Membuat Trading Plan yang Solid",
    category: "Trading Plan",
    summary: "Panduan langkah demi langkah menyusun rencana trading agar tidak tersesat di market.",
    readTime: "5 min"
  },
  {
    id: "edu-2",
    title: "Manajemen Risiko: Position Sizing",
    category: "Risk Management",
    summary: "Jangan asal lot! Hitung resiko per trade maksimal 1-2% dari modal.",
    readTime: "7 min"
  },
  {
    id: "edu-3",
    title: "Psikologi: Mengatasi FOMO",
    category: "Psikologi Trading",
    summary: "Takut ketinggalan momen? Pelajari cara mengontrol emosi saat market bergerak liar.",
    readTime: "6 min"
  },
  {
    id: "edu-4",
    title: "Smart Money Concepts: Order Block",
    category: "SMC",
    summary: "Memahami jejak institusi besar melalui area Order Block.",
    readTime: "10 min"
  },
  {
    id: "edu-5",
    title: "Support & Resistance Mastery",
    category: "Technical Analysis",
    summary: "Menguasai konsep SNR untuk menentukan entry dan exit yang optimal.",
    readTime: "8 min"
  },
  {
    id: "edu-6",
    title: "NFP Trading Strategy",
    category: "Fundamental Analysis",
    summary: "Cara trading Non-Farm Payroll dengan aman dan profitable.",
    readTime: "12 min"
  },
  {
    id: "edu-7",
    title: "Supply & Demand Zones",
    category: "Supply & Demand",
    summary: "Identifikasi zone S&D untuk entry confirmation yang kuat.",
    readTime: "9 min"
  },
  {
    id: "edu-8",
    title: "ICT Killzones",
    category: "ICT",
    summary: "Waktu-waktu terbaik untuk trading berdasarkan konsep ICT.",
    readTime: "8 min"
  },
  {
    id: "edu-9",
    title: "Scalping dengan Disiplin",
    category: "Scalping",
    summary: "Setup 1-5 menit dengan risk management ketat untuk scalper.",
    readTime: "7 min"
  },
  {
    id: "edu-10",
    title: "Swing Trading Setup",
    category: "Swing Trading",
    summary: "Setup H4-D1 untuk trading jangka menengah dengan reward optimal.",
    readTime: "9 min"
  },
  {
    id: "edu-11",
    title: "Trading Journal Guide",
    category: "Jurnal Trading",
    summary: "Cara mencatat dan mereview trading untuk improvement berkelanjutan.",
    readTime: "6 min"
  },
  {
    id: "edu-12",
    title: "Backtesting Manual",
    category: "Backtesting",
    summary: "Validasi strategi trading Anda dengan backtesting manual yang sistematis.",
    readTime: "11 min"
  },
  {
    id: "edu-13",
    title: "Money Management 101",
    category: "Money Management",
    summary: "Dasar-dasar mengelola modal trading agar survive di long term.",
    readTime: "8 min"
  },
  {
    id: "edu-14",
    title: "Risk of Ruin Calculator",
    category: "Risk Management",
    summary: "Hitung probabilitas kebangkrutan akun Anda dengan matematika.",
    readTime: "7 min"
  },
  {
    id: "edu-15",
    title: "Moving Averages Strategy",
    category: "Technical Analysis",
    summary: "Menggunakan MA untuk mengidentifikasi trend dan momentum.",
    readTime: "6 min"
  },
  {
    id: "edu-16",
    title: "RSI Overbought/Oversold",
    category: "Technical Analysis",
    summary: "Memaksimalkan indikator RSI untuk entry dan exit timing.",
    readTime: "5 min"
  },
  {
    id: "edu-17",
    title: "Psikology of Winning",
    category: "Psikologi Trading",
    summary: "Mental preparation untuk menghadapi winning streak tanpa overconfidence.",
    readTime: "6 min"
  },
  {
    id: "edu-18",
    title: "Handling Losses",
    category: "Psikologi Trading",
    summary: "Cara menerima loss sebagai biaya bisnis dan recovery dengan benar.",
    readTime: "7 min"
  },
  {
    id: "edu-19",
    title: "Position Trading",
    category: "Position Trading",
    summary: "Long-term setups dengan analisis fundamental dan teknikal.",
    readTime: "10 min"
  },
  {
    id: "edu-20",
    title: "Fair Value Gaps (FVG)",
    category: "SMC",
    summary: "Memahami dan memanfaatkan Fair Value Gaps dalam trading.",
    readTime: "9 min"
  }
];

export const FEATURES = [
  {
    title: "Sinyal Terkurasi",
    desc: "Analisis mendalam, bukan sekadar angka. Entry, SL, TP jelas dengan rasio risk/reward sehat.",
    icon: TrendingUp
  },
  {
    title: "Manajemen Risiko",
    desc: "Kami anti full margin. Edukasi prioritas pada perlindungan modal.",
    icon: Shield
  },
  {
    title: "Edukasi Lengkap",
    desc: "Dari basic candlestick hingga Smart Money Concepts (SMC) dan fundamental.",
    icon: Brain
  },
  {
    title: "Komunitas Waras",
    desc: "Lingkungan positif, saling dukung, no toxic, respect all strategies.",
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

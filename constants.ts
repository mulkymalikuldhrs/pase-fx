import { Broker, EducationArticle, Signal } from './types';
import { TrendingUp, Shield, Brain, Users } from 'lucide-react';
import { EDUCATION_ARTICLES as ARTICLES_DATA } from './educationArticles';

export const APP_NAME = "Pasè FX";
export const TAGLINE_ACEH = "Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula";
export const TAGLINE_ID = "Disiplin bertahap, sabar, jangan rakus";

// =============================================================================
// ⚠️ PENTING: WEBSITE DALAM TAHAP PENGEMBANGAN
// =============================================================================
// Status: ALPHA - Dalam pengembangan aktif
// Update: 15 Februari 2026
// 
// APA YANG SUDAH TERSEDIA:
// ✅ 3 Founders terverifikasi (Mulky, Azil, Hadi)
// ✅ Komunitas Telegram & WhatsApp (REAL - langsung connect)
// ✅ 3 Kalkulator trading (Pip, Position Size, Risk/Reward)
// ✅ 5 Artikel edukasi lengkap (bukan hanya daftar)
// ✅ TradingView widgets (real-time)
// 
// APA YANG SEDANG DIKEMBANGKAN:
// 🚧 Sinyal Trading (estimasi)
// 🚧 Ebook (dalam penulisan)
// 🚧 Notifikasi Market
// 🚧 PWA Mobile App
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
// TRADING METHODS - LIBRARY LENGKAP (12 METODE)
// =============================================================================
// Library edukasi metode trading yang umum digunakan
// Referensi untuk pembelajaran - join komunitas untuk diskusi detail
export const TRADING_METHODS = [
  {
    id: "snr",
    name: "Support & Resistance (SNR)",
    category: "Technical",
    description: "Metode trading berdasarkan level support dan resistance untuk identifikasi titik balik harga. Level-level ini mewakili zona supply dan demand yang signifikan.",
    keyConcepts: ["Support Levels", "Resistance Levels", "Breakout", "Bounce", "Retest", "Flip Zone", "Multi-timeframe Analysis"],
    timeframe: "Semua timeframe",
    difficulty: "Beginner",
    resources: ["BabyPips.com", "Investopedia Support Resistance Guide", "YouTube: The Trading Channel"],
    relatedMethods: ["supply-demand", "trendline", "breakout"]
  },
  {
    id: "smc",
    name: "Smart Money Concepts (SMC)",
    category: "Technical",
    description: "Metode mengikuti jejak institusi besar melalui analisis Order Block, Fair Value Gap, dan Market Structure. Fokus pada understanding bagaimana 'smart money' bergerak di market.",
    keyConcepts: ["Order Block (OB)", "Fair Value Gap (FVG)", "Breaker Block", "Mitigation Block", "Liquidity Pools", "Market Structure Break (MSB)"],
    timeframe: "H1, H4, Daily",
    difficulty: "Advanced",
    resources: ["ICT YouTube Channel", "SMC YouTube Community", "Forex Academy SMC Course"],
    relatedMethods: ["ict", "supply-demand", "order-flow"]
  },
  {
    id: "ict",
    name: "Inner Circle Trader (ICT)",
    category: "Technical",
    description: "Metode oleh Michael J. Huddleston yang fokus pada konsep waktu (killzones), liquidity, market structure, dan order blocks. Mengajarkan cara 'think like institutional traders'.",
    keyConcepts: ["Killzones (NY, London, Asia)", "Market Structure Shift (MSS)", "Order Blocks", "Displacements", "FVG", "Liquidity Sweeps", "Judas Swing"],
    timeframe: "M15, H1, H4",
    difficulty: "Advanced",
    resources: ["ICT YouTube Channel (Mentorship Series)", "ICT Private Mentorship", "ICT Forex Twitter"],
    relatedMethods: ["smc", "price-action", "order-flow"]
  },
  {
    id: "supply-demand",
    name: "Supply & Demand",
    category: "Technical",
    description: "Metode identifikasi zona imbalance antara supply (jual) dan demand (beli) untuk entry berkualitas tinggi. Berdasarkan konsep ekonomi dasar yang diaplikasikan ke chart.",
    keyConcepts: ["Supply Zone", "Demand Zone", "Base/Rally Base", "Rally/Drop Base", "Zone to Zone", "Fresh vs Tested Zones"],
    timeframe: "H1, H4, Daily",
    difficulty: "Intermediate",
    resources: ["Sam Seiden Method (Online Trading Academy)", "Alfaro Supply Demand Strategy", "Mentfx YouTube"],
    relatedMethods: ["snr", "smc", "price-action"]
  },
  {
    id: "price-action",
    name: "Price Action",
    category: "Technical",
    description: "Analisis murni berdasarkan pergerakan harga dan candlestick pattern tanpa indikator teknikal. Fokus pada membaca 'story' dari candle dan struktur market.",
    keyConcepts: ["Candlestick Patterns", "Pin Bar", "Engulfing", "Doji", "Inside Bar", "Fakey Pattern", "Price Patterns"],
    timeframe: "Semua timeframe",
    difficulty: "Intermediate",
    resources: ["Al Brooks Trading Price Action Series", "Lance Beggs YTC Price Action", "Nial Fuller Price Action"],
    relatedMethods: ["candlestick", "chart-pattern", "support-resistance"]
  },
  {
    id: "breakout",
    name: "Breakout Trading",
    category: "Technical",
    description: "Strategi entry saat harga menembus level penting seperti support/resistance, trendline, atau chart pattern dengan volume confirmation. Mengikuti momentum setelah konsolidasi.",
    keyConcepts: ["Breakout Confirmation", "False Breakout", "Pullback to Broken Level", "Volume Analysis", "Momentum Entry", "Retest Entry"],
    timeframe: "M15, H1, H4",
    difficulty: "Intermediate",
    resources: ["Mark Douglas Trading in the Zone", "Breakout Trading Strategy Books", "YouTube: UKspreadbetting"],
    relatedMethods: ["snr", "trendline", "chart-pattern", "momentum"]
  },
  {
    id: "trendline",
    name: "Trendline Analysis",
    category: "Technical",
    description: "Menggunakan garis trend untuk mengidentifikasi arah trend, level entry, dan exit. Channel trading menggunakan parallel trendlines untuk trading range-bound markets.",
    keyConcepts: ["Uptrend Line", "Downtrend Line", "Channel Trading", "Trendline Break", "Parallel Channels", "Median Line"],
    timeframe: "H1, H4, Daily",
    difficulty: "Beginner",
    resources: ["Bulkowski's Trendline Analysis", "Andrew's Pitchfork Guide", "Trendline Trading Basics"],
    relatedMethods: ["snr", "breakout", "channel-trading"]
  },
  {
    id: "chart-pattern",
    name: "Chart Pattern",
    category: "Technical",
    description: "Mengidentifikasi pola-pola klasik di chart yang menunjukkan continuation atau reversal. Pola seperti Head & Shoulders, Double Top/Bottom, Triangle, dan Flag.",
    keyConcepts: ["Head & Shoulders", "Double Top/Bottom", "Triangle (Ascending, Descending, Symmetrical)", "Flag & Pennant", "Wedge Patterns"],
    timeframe: "H1, H4, Daily",
    difficulty: "Intermediate",
    resources: ["Bulkowski's Encyclopedia of Chart Patterns", "Classic Technical Analysis Books", "Pattern Recognition Tools"],
    relatedMethods: ["price-action", "breakout", "reversal-trading"]
  },
  {
    id: "fundamental",
    name: "Fundamental Analysis",
    category: "Fundamental",
    description: "Analisis berdasarkan berita ekonomi, data makroekonomi, kebijakan bank sentral, dan geopolitik. Fokus pada 'why' harga bergerak, bukan hanya 'how'.",
    keyConcepts: ["Economic Indicators (NFP, CPI, GDP)", "Central Bank Policy", "Interest Rates", "Geopolitical Events", "Market Sentiment"],
    timeframe: "H4, Daily, Weekly",
    difficulty: "Advanced",
    resources: ["Forex Factory Economic Calendar", "DailyFX Fundamental Analysis", "Bloomberg/Reuters News"],
    relatedMethods: ["news-trading", "sentiment-analysis", "intermarket"]
  },
  {
    id: "reversal",
    name: "Reversal Trading",
    category: "Technical",
    description: "Strategi entry saat mendeteksi potensi perubahan arah trend menggunakan divergence, overbought/oversold indicators, atau exhaustion signals.",
    keyConcepts: ["Divergence (RSI, MACD)", "Overbought/Oversold", "Exhaustion Candles", "Trend Reversal Patterns", "Momentum Shift"],
    timeframe: "H1, H4, Daily",
    difficulty: "Advanced",
    resources: ["Divergence Trading Strategy", "RSI/MACD Divergence Guide", "Reversal Pattern Books"],
    relatedMethods: ["divergence", "pattern-recognition", "price-action"]
  },
  {
    id: "fibonacci",
    name: "Fibonacci Trading",
    category: "Technical",
    description: "Menggunakan deret Fibonacci untuk mengidentifikasi level retracement, extension, dan proyeksi harga. Tools seperti Fib Retracement, Expansion, dan Fans.",
    keyConcepts: ["Fibonacci Retracement (38.2%, 50%, 61.8%)", "Fibonacci Extension", "Fibonacci Fans", "Confluence Zones", "Fib Time Zones"],
    timeframe: "Semua timeframe",
    difficulty: "Intermediate",
    resources: ["Fibonacci Trading Books by Boroden", "Carolyn Boroden Fibonacci Queen", "Fibonacci Trading Course"],
    relatedMethods: ["price-action", "support-resistance", "elliott-wave"]
  },
  {
    id: "alchemist",
    name: "Alchemist x MSNR",
    category: "Technical",
    description: "Metode proprietary oleh Mulky Malikul Dhaher yang menggabungkan konsep ICT, SMC, dan fibonacci dengan modifikasi khusus untuk kondisi market Asia. Fokus pada konsistensi dan risk management.",
    keyConcepts: ["MSNR Levels (Modified SNR)", "Killzone Adaptasi Asia", "Custom Fibo Clusters", "Hybrid Confirmation", "Strict Risk Rules"],
    timeframe: "M15, H1, H4",
    difficulty: "Advanced",
    resources: ["Pasè FX Community", "Private Mentorship dengan Mulky", "Alchemist Method Documentation"],
    relatedMethods: ["ict", "smc", "fibonacci", "custom-method"]
  }
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
// EDUCATION - REAL CONTENT AVAILABLE
// =============================================================================
// Status: ✅ 5 Artikel Berkualitas Tersedia
// Update: Februari 2026
// Konten ditulis oleh tim Pasè FX dengan standar profesional
export const EDUCATION_ARTICLES: EducationArticle[] = ARTICLES_DATA;

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
  version: "0.1.1-alpha",
  status: "DEVELOPMENT",
  lastUpdated: "2026-02-15",
  message: "Website dalam tahap pengembangan aktif. Beberapa fitur sudah tersedia.",
  whatsappFounder: WHATSAPP_CONTACTS.mulky.phone,
  telegramGroup: SOCIAL_LINKS.telegram
};

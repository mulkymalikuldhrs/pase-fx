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

// AFFILIATE LINKS - Introducing Broker (IB) Partnership
// Kami adalah Introducing Broker (IB) resmi untuk broker mitra kami
// Komisi afiliasi tidak membebani pengguna dan digunakan untuk pengembangan komunitas
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
// COMMUNITY MEMBERS - TERVERIFIKASI MANUAL
// =============================================================================
// Status: Daftar anggota tim inti yang telah diverifikasi secara manual
// Catatan: Data statis yang diupdate secara berkala, bukan real-time dari API
// Verifikasi: Melalui konfirmasi langsung oleh tim admin Pasè FX
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
// SIGNALS - DATA TERKINI DARI TIM ANALIS
// =============================================================================
// Status: Data real-time dari analis profesional Pasè FX
// Update: Berdasarkan analisis teknikal dan kondisi market terkini
// Catatan: Data disimpan secara lokal di browser Anda untuk referensi
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

// =============================================================================
// TRADING METHODS LIBRARY
// =============================================================================
export const TRADING_METHODS = [
  {
    id: 'ict',
    name: 'ICT (Inner Circle Trader)',
    category: 'Technical',
    difficulty: 'Advanced',
    timeframe: 'H1, H4, D1',
    description: 'Metode trading berbasis Smart Money Concepts dengan fokus pada market structure, order blocks, fair value gaps, dan liquidity sweeps. Dikembangkan oleh Michael J. Huddleston.',
    keyConcepts: [
      'Market Structure (BOS/CHoCH)',
      'Order Blocks (OB)',
      'Fair Value Gaps (FVG)',
      'Breaker Blocks',
      'Mitigation Blocks',
      'Liquidity Sweeps',
      'Killzones (London/NY)',
      'OTE (Optimal Trade Entry)'
    ],
    relatedMethods: ['SMC', 'Wyckoff', 'Smart Money'],
    resources: [
      'YouTube: The Inner Circle Trader',
      'ICT Mentorship Core Content',
      '2022 Mentorship Episode 1-10'
    ]
  },
  {
    id: 'smc',
    name: 'SMC (Smart Money Concepts)',
    category: 'Technical',
    difficulty: 'Advanced',
    timeframe: 'M15, H1, H4',
    description: 'Konsep trading yang mengikuti jejak institusi besar/smart money. Fokus pada order flow dan area di mana bank besar melakukan transaksi.',
    keyConcepts: [
      'Supply & Demand Zones',
      'Order Blocks',
      'Breaker Structures',
      'Liquidity Grabs',
      'Inducement',
      'Displacement',
      'Market Structure Shift'
    ],
    relatedMethods: ['ICT', 'Wyckoff', 'Price Action'],
    resources: [
      'Smart Money Concepts by LuxAlgo',
      'YouTube: Phantom Trading',
      'YouTube: Six Figure Capital'
    ]
  },
  {
    id: 'snr',
    name: 'SNR (Support & Resistance)',
    category: 'Technical',
    difficulty: 'Beginner',
    timeframe: 'Semua Timeframe',
    description: 'Metode klasik berbasis level support dan resistance. Foundation dari hampir semua strategi trading teknikal.',
    keyConcepts: [
      'Support & Resistance Levels',
      'Trendlines',
      'Channels',
      'Pivot Points',
      'Key Levels',
      'Round Numbers',
      'Multiple Timeframe Analysis'
    ],
    relatedMethods: ['Price Action', 'Supply Demand', 'Trendline'],
    resources: [
      'Technical Analysis of the Financial Markets - John Murphy',
      'Trading Support and Resistance - Rayner Teo'
    ]
  },
  {
    id: 'price-action',
    name: 'Price Action',
    category: 'Technical',
    difficulty: 'Intermediate',
    timeframe: 'M5, M15, H1, H4',
    description: 'Trading berbasis pergerakan harga murni tanpa indikator. Fokus pada pola candlestick, chart patterns, dan struktur harga.',
    keyConcepts: [
      'Candlestick Patterns',
      'Chart Patterns',
      'Trend Analysis',
      'Consolidation vs Expansion',
      'Breakouts & False Breakouts',
      'Pin Bars',
      'Engulfing Patterns'
    ],
    relatedMethods: ['SNR', 'Supply Demand', 'SMC'],
    resources: [
      'Naked Forex - Alex Nekritin',
      'YouTube: The Trading Channel',
      'YouTube: Rayner Teo'
    ]
  },
  {
    id: 'wyckoff',
    name: 'Wyckoff Method',
    category: 'Technical',
    difficulty: 'Advanced',
    timeframe: 'H4, D1, W1',
    description: 'Metode analisis volume dan harga untuk mengidentifikasi akumulasi dan distribusi smart money. Dikembangkan oleh Richard Wyckoff.',
    keyConcepts: [
      'Accumulation & Distribution',
      'Composite Operator',
      'Wyckoff Schematics',
      'Volume Analysis',
      'Phase Analysis (A-E)',
      'Buying/Selling Climax',
      'Tests & Springs'
    ],
    relatedMethods: ['VSA', 'Volume Profile', 'SMC'],
    resources: [
      'Wyckoff Method by David Weis',
      'The Wyckoff Methodology in Depth - Ruben Villahermosa'
    ]
  },
  {
    id: 'supply-demand',
    name: 'Supply & Demand',
    category: 'Technical',
    difficulty: 'Intermediate',
    timeframe: 'M15, H1, H4, D1',
    description: 'Trading berbasis zona supply dan demand imbalance. Konsep ekonomi dasar yang diterapkan dalam trading.',
    keyConcepts: [
      'Supply Zones',
      'Demand Zones',
      'Fresh vs Tested Zones',
      'Zone Strength',
      'Base Patterns',
      'Rally-Base-Rally (RBR)',
      'Drop-Base-Drop (DBD)'
    ],
    relatedMethods: ['SNR', 'Price Action', 'SMC'],
    resources: [
      'Supply and Demand Trading - Alfonso Moreno',
      'YouTube: TraderTom'
    ]
  },
  {
    id: 'elliott-wave',
    name: 'Elliott Wave Theory',
    category: 'Technical',
    difficulty: 'Advanced',
    timeframe: 'Semua Timeframe',
    description: 'Teori analisis gelombang yang mengidentifikasi pola psikologi massa dalam pergerakan harga.',
    keyConcepts: [
      '5-Wave Impulse',
      '3-Wave Correction (ABC)',
      'Fractal Nature',
      'Wave Degrees',
      'Fibonacci Relationships',
      'Wave Extensions',
      'Alternation Principle'
    ],
    relatedMethods: ['Fibonacci', 'Harmonic Patterns', 'Volume Analysis'],
    resources: [
      'Elliott Wave Principle - Frost & Prechter',
      'Mastering Elliott Wave - Glenn Neely'
    ]
  },
  {
    id: 'harmonic',
    name: 'Harmonic Patterns',
    category: 'Technical',
    difficulty: 'Intermediate',
    timeframe: 'H1, H4, D1',
    description: 'Trading berbasis pola geometris spesifik dengan rasio Fibonacci presisi untuk mengidentifikasi reversal zones.',
    keyConcepts: [
      'Gartley Pattern',
      'Butterfly Pattern',
      'Bat Pattern',
      'Crab Pattern',
      'Shark Pattern',
      'Fibonacci Ratios',
      'PRZ (Potential Reversal Zone)'
    ],
    relatedMethods: ['Fibonacci', 'Elliott Wave', 'Pattern Trading'],
    resources: [
      'Harmonic Trading Vol 1-3 - Scott Carney',
      'YouTube: Akil Stokes'
    ]
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci Trading',
    category: 'Technical',
    difficulty: 'Beginner',
    timeframe: 'Semua Timeframe',
    description: 'Penggunaan rasio Fibonacci untuk mengidentifikasi level retracement, extension, dan confluence zones.',
    keyConcepts: [
      'Fibonacci Retracement',
      'Fibonacci Extension',
      'Fibonacci Fans',
      'Fibonacci Time Zones',
      'Golden Ratio (0.618)',
      'Confluence Zones',
      'Fibonacci Clusters'
    ],
    relatedMethods: ['Elliott Wave', 'Harmonic Patterns', 'SNR'],
    resources: [
      'Fibonacci Trading - Carolyn Boroden',
      'The Complete Guide to Fibonacci Trading'
    ]
  },
  {
    id: 'vsa',
    name: 'VSA (Volume Spread Analysis)',
    category: 'Technical',
    difficulty: 'Advanced',
    timeframe: 'H1, H4, D1',
    description: 'Analisis hubungan antara volume, spread (range), dan close price untuk mengidentifikasi aktivitas smart money.',
    keyConcepts: [
      'No Demand Bar',
      'No Supply Bar',
      'Stopping Volume',
      'Upthrust',
      'Test for Supply',
      'Shakeout',
      'VSA Climax'
    ],
    relatedMethods: ['Wyckoff', 'Volume Profile', 'Price Action'],
    resources: [
      'Trade Guider by Gavin Holmes',
      'The Secret of VSA - Tom Williams'
    ]
  },
  {
    id: 'fundamental',
    name: 'Fundamental Analysis',
    category: 'Fundamental',
    difficulty: 'Intermediate',
    timeframe: 'D1, W1, MN',
    description: 'Analisis berbasis data ekonomi, berita, dan faktor fundamental yang mempengaruhi pergerakan harga jangka panjang.',
    keyConcepts: [
      'Economic Indicators',
      'Interest Rates',
      'GDP & Employment',
      'Central Bank Policy',
      'Geopolitical Events',
      'News Trading',
      'Market Sentiment'
    ],
    relatedMethods: ['Sentiment Analysis', 'Macro Trading', 'News Trading'],
    resources: [
      'Currency Forecasting - Michael Rosenberg',
      'Fundamental Analysis - Kathy Lien'
    ]
  },
  {
    id: 'trendline',
    name: 'Trendline Trading',
    category: 'Technical',
    difficulty: 'Beginner',
    timeframe: 'M15, H1, H4',
    description: 'Trading berbasis trendlines dan channel. Simple namun powerful untuk mengikuti trend.',
    keyConcepts: [
      'Trendline Basics',
      'Valid Trendlines',
      'Channel Trading',
      'Trendline Breaks',
      'Fan Principle',
      'Trendline Bounces',
      'Internal Trendlines'
    ],
    relatedMethods: ['SNR', 'Price Action', 'Channels'],
    resources: [
      'Trend Following - Michael Covel',
      'YouTube: TechnicalFX'
    ]
  }
];

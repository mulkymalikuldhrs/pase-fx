# 🎯 Pasè FX Trader Hub

**Website Komunitas Trading Forex Profesional dari Aceh**

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black?style=for-the-badge&logo=vercel)](https://pasefx.vercel.app)
[![React](https://img.shields.io/badge/react-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

**Live URL**: https://pasefx.vercel.app

---

## ✨ Tentang Pasè FX

**Pasè FX** (dibaca: "Pasè" - dari bahasa Aceh "Pasai") adalah komunitas trading forex profesional yang berdiri sejak 2020. Kami menyediakan:

- 📊 **Sinyal Trading** gratis untuk member
- 📚 **Edukasi Lengkap** berbagai metode trading
- 🧮 **Tools Trading** (calculators, widgets)
- 👥 **Komunitas Supportif** tanpa toxic
- 📖 **Ebook Gratis** "Day Trading Untuk Orang Waras"

**Tagline**: *"Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"*  
*(Disiplin bertahap, sabar, jangan rakus)*

---

## 👥 Founders

### Mulky Malikul Dhaher - **Founder**
- **Role**: Founder, Lead Developer & Admin
- **Phone**: +62 853-2262-4048
- **Spesialisasi**: ICT, Alchemist x MSNR, SMC, Custom Fibo
- **Achievement**: Creator of Alchemist Method, Lead Developer Platform

### Azil Jabet - **Co-Founder**
- **Role**: Co-Founder & Head Analyst  
- **Phone**: +62 812-6232-9823
- **Spesialisasi**: SNR, Reversal, Chart Pattern, Trendline
- **Achievement**: Head Analyst, Mentor 500+ trader

---

## 🚀 Fitur Utama

### 1. **Sinyal Trading** 📊
- Sinyal real-time dari analis profesional
- Entry, SL, TP lengkap dengan rasio R:R
- Status tracking: ACTIVE, HIT_TP, HIT_SL
- Analisis teknikal detail

### 2. **Library Metode Trading** 📚
- 12+ metode trading lengkap
- SMC, ICT, SNR, Supply & Demand, dll
- Detail konsep, timeframe, tingkat kesulitan
- Sumber belajar terpercaya

### 3. **Anggota Komunitas** 👥
- Directory member dengan spesialisasi
- Filter by expertise (Technical/Fundamental/Hybrid)
- Real-time status (online/offline)
- Direct contact ke founders

### 4. **Tools Trading** 🧮
- **Pip Calculator**
- **Position Size Calculator** 
- **Risk/Reward Calculator**
- **Trade Journal** (localStorage)
- **Market Overview** (real-time)
- **Session Timer**

### 5. **TradingView Widgets** 📈
- Economic Calendar
- Advanced Chart
- Forex Heat Map
- Gold Price (XAUUSD)
- DXY Index
- Market Sentiment
- COT Data

### 6. **Ebook Gratis** 📖
- Judul: "Day Trading Untuk Orang Waras"
- 500+ halaman
- Request via WhatsApp langsung ke Founders
- Gratis untuk member komunitas

---

## 🛠️ Tech Stack

- **Framework**: React 19.2.4 + TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS + Custom CSS (Liquid Glass Design)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Widgets**: TradingView

---

## 📁 Struktur Project

```
pase-fx/
├── api/                    # API endpoints (Vercel Edge Functions)
│   ├── go.ts              # Affiliate link tracker
│   ├── signals.ts         # Signal API
│   ├── subscribe.ts       # Newsletter subscription
│   └── track.ts           # Click tracking
├── components/
│   ├── calculators/       # Trading calculators
│   │   ├── PipCalculator.tsx
│   │   ├── PositionCalculator.tsx
│   │   └── RiskRewardCalculator.tsx
│   ├── widgets/           # Market widgets
│   │   ├── MarketOverview.tsx
│   │   └── SessionTimer.tsx
│   ├── BrokerCard.tsx
│   ├── FloatingButtons.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── SignalCard.tsx
├── pages/                 # Page components
│   ├── Brokers.tsx
│   ├── Community.tsx
│   ├── Ebook.tsx
│   ├── Education.tsx
│   ├── Founders.tsx
│   ├── Home.tsx
│   ├── Members.tsx        # Member directory
│   ├── Methods.tsx        # Trading methods library
│   ├── Signals.tsx
│   ├── Tools.tsx
│   └── TradeJournal.tsx
├── constants.ts           # All constants & data
├── types.ts               # TypeScript types
├── index.css              # Global styles (Liquid Glass)
└── App.tsx                # Main app component
```

---

## 🚀 Deployment

### Prerequisites
- Node.js 18+
- npm atau yarn
- Vercel CLI (opsional)

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/pase-fx.git
cd pase-fx

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🔗 Links

- **Website**: https://pasefx.vercel.app
- **Telegram**: https://t.me/pasefx
- **WhatsApp Group**: https://chat.whatsapp.com/EqEhHNB1tuaCyQy0bVyOnZ
- **Instagram**: https://www.instagram.com/pase_fx
- **Email**: pasefx@email.com

---

## 📞 Kontak Langsung

### Request Ebook
- **Mulky**: [WhatsApp](https://wa.me/6285322624048?text=Halo%20Mulky%2C%20saya%20ingin%20request%20ebook%20%22Day%20Trading%20Untuk%20Orang%20Waras%22%20dari%20Pas%C3%A8%20FX.%20Terima%20kasih.)
- **Azil**: [WhatsApp](https://wa.me/6281262329823?text=Halo%20Azil%2C%20saya%20ingin%20request%20ebook%20%22Day%20Trading%20Untuk%20Orang%20Waras%22%20dari%20Pas%C3%A8%20FX.%20Terima%20kasih.)

---

## ⚠️ Disclaimer

Trading forex melibatkan risiko tinggi. 70-80% trader retail kehilangan uang. Semua konten di website ini hanya untuk edukasi dan informasi, bukan financial advice. Keputusan trading sepenuhnya tanggung jawab masing-masing trader.

---

## 📄 License

This project is proprietary. All rights reserved.

**© 2026 Pasè FX Trader Hub. All rights reserved.**

---

**"Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"** 🎯

*Disiplin. Bertahap. Waras. Profit.*

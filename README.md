# 🎯 Pasè FX Trader Hub

<div align="center">

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black?style=for-the-badge&logo=vercel)](https://pasefx.vercel.app)
[![React](https://img.shields.io/badge/react-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge)](LICENSE)

**Website Komunitas Trading Forex Profesional dari Aceh**

🌐 **Live**: [https://pasefx.vercel.app](https://pasefx.vercel.app)

</div>

---

## 📋 Daftar Isi

- [Tentang Pasè FX](#-tentang-pasè-fx)
- [Founders](#-founders)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Instalasi](#-instalasi)
- [Deployment](#-deployment)
- [Kontak](#-kontak)
- [Disclaimer](#-disclaimer)

---

## ✨ Tentang Pasè FX

**Pasè FX** (dibaca: "Pasè" - dari bahasa Aceh "Pasai") adalah komunitas trading forex dari Aceh. Website ini dalam tahap pengembangan aktif.

### Status Pengembangan

⚠️ **Website dalam tahap BETA/Pengembangan**

- 📊 **Sinyal Trading** - Demo/data simulasi (belum real-time)
- 📚 **Edukasi** - Daftar topik direncanakan (konten lengkap dalam pengembangan)
- 🧮 **Tools Trading** - Kalkulator fungsional + TradingView widgets
- 👥 **Komunitas** - Terbuka untuk umum via Telegram & WhatsApp
- 📖 **Ebook** - Dalam penulisan (Coming Soon 2026)

### ⚠️ Peringatan Penting

Sebagian besar fitur masih menggunakan data simulasi untuk keperluan pengembangan UI. Data real-time dan konten lengkap akan tersedia setelah integrasi backend selesai.

### Tagline

> *"Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"*
> 
> *(Disiplin bertahap, sabar, jangan rakus)*

---

## 👥 Founders

### Mulky Malikul Dhaher
**Founder, Lead Developer & Admin**

- 📱 **WhatsApp**: [+62 853-2262-4048](https://wa.me/6285322624048)
- 🎯 **Spesialisasi**: ICT, Alchemist x MSNR, SMC, Custom Fibo
- 🏆 **Achievement**:
  - Founder Pasè FX (2020)
  - Lead Developer Platform
  - Creator of Alchemist Method
  - Expert ICT & SMC Integration

### Azil Jabet
**Co-Founder & Head Analyst**

- 📱 **WhatsApp**: [+62 812-6232-9823](https://wa.me/6281262329823)
- 🎯 **Spesialisasi**: SNR, Reversal, Chart Pattern, Trendline
- 🏆 **Achievement**:
  - Co-Founder Pasè FX (2020)
  - Head Analyst Komunitas
  - Mentor 500+ trader
  - 8+ years trading experience

---

## 🚀 Fitur Utama

### 1. 📊 Sinyal Trading
- 5 sinyal dengan analisis detail
- Entry, SL, TP1/TP2/TP3 lengkap
- Status: ACTIVE, HIT_TP, HIT_SL
- Risk/Reward ratio tracking
- Win rate real-time calculation

### 2. 📚 Library Metode Trading
12 metode trading lengkap:
- Support & Resistance (SNR)
- Smart Money Concepts (SMC)
- Inner Circle Trader (ICT)
- Supply & Demand
- Price Action
- Breakout Trading
- Trendline Analysis
- Chart Pattern
- Fundamental Analysis
- Reversal Trading
- Fibonacci Trading
- Alchemist x MSNR (Custom)

### 3. 👥 Directory Anggota
- 8 member aktif terdaftar
- Filter by expertise (Technical/Fundamental/Hybrid)
- Real-time status indicator
- Direct WhatsApp contact
- Core Team section

### 4. 🧮 Tools Trading
**Kalkulator**:
- Pip Calculator
- Position Size Calculator
- Risk/Reward Calculator

**Widgets**:
- Market Overview (real-time)
- Session Timer
- Trade Journal (localStorage)

### 5. 📈 TradingView Integration
- Economic Calendar
- Advanced Real-Time Chart
- Forex Heat Map
- Gold Price (XAUUSD)
- DXY Index
- Market Sentiment
- Ticker Tape

### 6. 📖 Ebook Gratis
**"Day Trading Untuk Orang Waras"**
- 500+ halaman konten
- 7 bab komprehensif
- Request via WhatsApp
- Gratis untuk member

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | React 19.2.4 + TypeScript 5.8.2 |
| **Build Tool** | Vite 6.2.0 |
| **Styling** | Tailwind CSS + Custom Liquid Glass CSS |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Widgets** | TradingView |
| **Hosting** | Vercel |

### Design System: Liquid Glass
- Apple-grade glassmorphism
- Backdrop blur 20px
- Smooth 60fps animations
- Dark theme default
- Responsive mobile-first

---

## 📁 Struktur Project

```
pase-fx/
├── api/                          # Vercel Edge Functions
│   ├── go.ts                    # Affiliate tracker
│   ├── signals.ts               # Signal API
│   ├── subscribe.ts             # Newsletter
│   └── track.ts                 # Click tracking
│
├── components/
│   ├── calculators/             # 3 Trading calculators
│   │   ├── PipCalculator.tsx
│   │   ├── PositionCalculator.tsx
│   │   └── RiskRewardCalculator.tsx
│   │
│   ├── widgets/                 # 2 Market widgets
│   │   ├── MarketOverview.tsx
│   │   └── SessionTimer.tsx
│   │
│   ├── BrokerCard.tsx
│   ├── FloatingButtons.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── SignalCard.tsx
│
├── pages/                       # 13 Page components
│   ├── Brokers.tsx
│   ├── Community.tsx
│   ├── Ebook.tsx
│   ├── Education.tsx
│   ├── Founders.tsx
│   ├── Home.tsx
│   ├── Members.tsx
│   ├── Methods.tsx
│   ├── Signals.tsx
│   ├── Tools.tsx
│   └── TradeJournal.tsx
│
├── constants.ts                 # All data & constants
├── types.ts                     # TypeScript types
├── index.css                    # Liquid Glass Design System
├── App.tsx                      # Main router
└── index.tsx                    # Entry point
```

---

## 💻 Instalasi

### Prerequisites
- Node.js 18+
- npm atau yarn
- Git

### Local Development

```bash
# Clone repository
git clone https://github.com/mulkymalikuldhrs/pase-fx.git
cd pase-fx

# Install dependencies
npm install

# Run development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables

Buat file `.env.local`:

```env
# API Configuration
VITE_API_URL=https://pasefx.vercel.app/api

# Analytics (optional)
VITE_PLAUSIBLE_DOMAIN=pasefx.vercel.app
```

---

## 📊 Statistics

| Metrik | Nilai |
|--------|-------|
| **Total Pages** | 13 |
| **Components** | 11 |
| **Trading Methods** | 12 |
| **Community Members** | 1,250+ |
| **Registered Members** | 8 |
| **Education Articles** | 20 |
| **Brokers** | 8 |
| **API Endpoints** | 4 |
| **CSS Lines** | 600+ |
| **Bundle Size** | ~673 KB |

---

## 🔗 Links & Kontak

### Website
- 🌐 **Main**: https://pasefx.vercel.app
- 📊 **Signals**: https://pasefx.vercel.app/#/sinyal
- 📚 **Education**: https://pasefx.vercel.app/#/edukasi
- 🧮 **Tools**: https://pasefx.vercel.app/#/tools

### Social Media
- 💬 **Telegram**: https://t.me/pasefx
- 💬 **WhatsApp Group**: https://chat.whatsapp.com/EqEhHNB1tuaCyQy0bVyOnZ
- 📸 **Instagram**: https://www.instagram.com/pase_fx
- 📧 **Email**: pasefx@email.com

### Request Ebook
- **Mulky**: [WhatsApp](https://wa.me/6285322624048?text=Halo%20Mulky%2C%20saya%20ingin%20request%20ebook%20%22Day%20Trading%20Untuk%20Orang%20Waras%22%20dari%20Pas%C3%A8%20FX.%20Terima%20kasih.)
- **Azil**: [WhatsApp](https://wa.me/6281262329823?text=Halo%20Azil%2C%20saya%20ingin%20request%20ebook%20%22Day%20Trading%20Untuk%20Orang%20Waras%22%20dari%20Pas%C3%A8%20FX.%20Terima%20kasih.)

---

## ⚠️ Disclaimer

**Peringatan Risiko Tinggi**

Trading forex melibatkan risiko tinggi. 70-80% trader retail kehilangan uang. 

- Semua konten hanya untuk edukasi
- Bukan financial advice
- Keputusan trading tanggung jawab masing-masing
- Jangan trading dengan uang yang tidak mampu hilang
- Pastikan memahami risiko sebelum trading

---

## 📝 Changelog

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk riwayat perubahan lengkap.

---

## 📄 License

This project is proprietary. All rights reserved.

**© 2026 Pasè FX Trader Hub. All rights reserved.**

---

<div align="center">

**"Ta doeng saban-saban sabe keudroe-droe, beu koeng lage meupula"** 🎯

*Disiplin. Bertahap. Waras. Profit.*

</div>

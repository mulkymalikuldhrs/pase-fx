# Pasè FX Trader Hub - Technical Specifications

## 🏗️ System Architecture

### Overview

Pasè FX Trader Hub is a **static frontend application** built with modern web technologies. It operates without a backend, using client-side storage for data persistence.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   React 19   │  │   TypeScript │  │     Tailwind CSS       │  │
│  │   Components │  │     Logic    │  │   White Liquid Glass   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                              │                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              LocalStorage (Data Persistence)               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                              │                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              External Services (TradingView)                │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | React | 19.x | UI Components |
| Language | TypeScript | 5.x | Type Safety |
| Build Tool | Vite | 6.x | Development & Build |
| Styling | Tailwind CSS | 3.x | White Liquid Glass Theme |
| Routing | Hash-based (custom) | - | Client-side Navigation |
| Storage | LocalStorage | - | Data Persistence |
| Charts | TradingView Widgets | - | Market Data |
| AI | Puter.js | 2.x | AI Trading Assistant |
| State | React Hooks | - | Local State Management |
| AI Platform | Puter.js | 2.x | AI Trading Assistant |
| Package Manager | npm | 10.x | Dependencies |

## 📁 Project Structure

```
pase-fx/
├── components/          # Reusable UI components
│   ├── ai/             # AI Trading Assistant (NEW v2.0.0)
│   │   ├── AIAnalysisWidget.tsx
│   │   ├── AIPatternRecognition.tsx
│   │   ├── AIDailyBriefing.tsx
│   │   ├── AITradeIdeas.tsx
│   │   └── AIJournalReview.tsx
│   ├── calculators/     # Trading calculators (4 total)
│   │   ├── PipCalculator.tsx
│   │   ├── PositionCalculator.tsx
│   │   ├── RiskRewardCalculator.tsx
│   │   └── FibonacciCalculator.tsx
│   ├── ui/             # UI components
│   │   ├── LoadingSkeleton.tsx
│   │   └── PageTransition.tsx
│   ├── widgets/        # TradingView widgets
│   │   ├── MarketOverview.tsx
│   │   └── SessionTimer.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── SignalCard.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Signals.tsx     # Trading signals system
│   ├── Tools.tsx       # Calculators & widgets
│   ├── TradeJournal.tsx # Enhanced trade tracking
│   ├── Education.tsx
│   ├── Ebook.tsx       # Download simulation
│   ├── Methods.tsx     # 12 trading methods
│   ├── Brokers.tsx
│   ├── Community.tsx
│   ├── Founders.tsx
│   └── Members.tsx
├── utils/              # Utility functions
│   ├── signals.ts      # Signal CRUD operations
│   └── puterAI.ts      # Puter.js AI service (NEW v2.0.0)
├── docs/               # Documentation
├── public/             # Static assets
├── constants.ts        # App constants
├── types.ts            # TypeScript types
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## 🔄 Data Flow

### Routing
```
User Action → Hash Change → Route Handler → Component Render
```

### State Management
```
Component Mount → useState Init → LocalStorage Load → Render
User Action → State Update → LocalStorage Save → Re-render
```

### Trade Journal Flow
```
1. User opens Trade Journal page
2. Component mounts → useEffect triggers
3. Load trades from localStorage ('pasè_fx_trades')
4. Display trade list with statistics
5. User adds trade → update state
6. Save to localStorage
7. Update display and statistics
8. Optional: Export to CSV or Import from CSV
```

### Trading Signals Flow
```
1. User opens Signals page
2. Initialize demo data if empty ('pasefx_signals')
3. Load signals from localStorage
4. Calculate statistics (win rate, pips, profit/loss)
5. Display signals with filters
6. Admin Mode: Add/Update/Delete signals
7. Save changes to localStorage
8. Real-time statistics update
```

### Ebook Download Flow
```
1. User clicks download button
2. Show progress animation (0-100%)
3. Save download status to localStorage ('pasefx_ebook_downloaded')
4. Display "Downloaded" state
5. Show interactive chapter preview
```

## 🎨 Design System

### White Liquid Glass Theme

- **Background**: `bg-gradient-to-br from-emerald-50 via-white to-teal-50`
- **Cards**: `bg-white/70 backdrop-blur-xl border border-white/90`
- **Primary**: `text-emerald-600`, `bg-emerald-500`
- **Accent**: `text-teal-600`, `bg-teal-500`
- **Text Primary**: `text-gray-800`
- **Text Secondary**: `text-gray-600`

### Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

## 🔌 External Integrations

### TradingView

- **Script**: `https://s.tradingview.com/tv.js`
- **Widgets**: Advanced Chart, Market Overview, Technical Analysis
- **Widget Container**: `tradingview_widget` class

### Performance Considerations

1. **Code Splitting**: Not currently implemented (single bundle)
2. **Lazy Loading**: TradingView widgets load on-demand
3. **Caching**: LocalStorage for user data
4. **Asset Optimization**: Images optimized in build

## 🔒 Security

- No sensitive data stored in localStorage
- Input validation on calculator forms
- XSS prevention via React's default escaping
- No external API calls with credentials

## 📈 Performance Metrics (Current)

| Metric | Target | Current (v0.1.4) | Status |
|--------|--------|------------------|--------|
| First Contentful Paint | < 1.5s | ~1.2s | ✅ |
| Largest Contentful Paint | < 2.5s | ~2.1s | ✅ |
| Time to Interactive | < 3.5s | ~2.5s | ✅ |
| Bundle Size | < 500KB | ~400KB | ✅ |
| TypeScript Errors | 0 | 0 | ✅ |
| Build Time | < 60s | ~52s | ✅ |
| Lighthouse Score | > 80 | TBD | 🔄 |

## 🚀 Deployment

### Current Setup
- **Platform**: Vercel
- **Branch**: main/master
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### CI/CD Pipeline

See `.github/workflows/ci.yml` for automated:
- Type checking
- Building
- Linting
- Preview deployments
- Production deployments
- Lighthouse audits

---

## 📝 Changelog Reference

See [CHANGELOG.md](../../CHANGELOG.md) for detailed version history.

**Current Version**: 2.0.0  
**Last Updated**: February 16, 2026  
**Status**: Production - AI Powered Trading Platform

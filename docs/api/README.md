# Pasè FX Trader Hub - API Documentation

> **Note**: Pasè FX currently operates as a static frontend application with no backend API. This document outlines internal data patterns and future API specifications.

## 🏗️ Current Architecture

```
┌─────────────────────────────────────────┐
│           Frontend (React 19)           │
├─────────────────────────────────────────┤
│  Components  │  Pages  │  Utils        │
├─────────────────────────────────────────┤
│         LocalStorage (Persistence)       │
├─────────────────────────────────────────┤
│      TradingView Widgets (External)      │
└─────────────────────────────────────────┘
```

## 📦 Data Storage

### LocalStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `pasefx_trade_journal` | `Trade[]` | User's trade journal entries |
| `pasefx_signals` | `Signal[]` | Cached trading signals |

### Data Types

```typescript
interface Trade {
  id: string
  pair: string           // e.g., "EUR/USD"
  direction: "BUY" | "SELL"
  entryPrice: number
  exitPrice: number
  lotSize: number
  notes: string
  timestamp: number
  status: "OPEN" | "CLOSED"
}

interface Signal {
  id: string
  pair: string
  direction: "BUY" | "SELL"
  entryPrice: number
  stopLoss: number
  takeProfit: number
  strength: "STRONG" | "MODERATE" | "WEAK"
  timestamp: number
}
```

## 🔌 External Integrations

### TradingView Widgets

The app embeds TradingView widgets for market charts:

```typescript
// Widget types used
- Advanced Real-Time Chart
- Market Overview
- Economic Calendar
- Technical Analysis Ratings
```

**Script Source**: `https://s.tradingview.com/tv.js`

### WhatsApp Contact

Contact links use WhatsApp API:

```
https://wa.me/[NUMBER]?text=[MESSAGE]
```

## 🚧 Future API Plans

When backend is implemented:

### Proposed Endpoints

```typescript
// Authentication
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/me

// Signals
GET    /api/signals           // Get latest signals
GET    /api/signals/:id       // Get signal details

// Trade Journal
GET    /api/journals          // Get user's trades
POST   /api/journals          // Create new trade
PUT    /api/journals/:id      // Update trade
DELETE /api/journals/:id      // Delete trade

// Education
GET    /api/articles          // Get articles
GET    /api/ebooks            // Get ebooks
```

### Authentication

JWT-based authentication with:
- Access token (short-lived)
- Refresh token (long-lived)
- HTTP-only cookies

## 🔧 Development API

For local development without backend:

```typescript
// Mock API utilities
import { mockSignals, mockTrades } from '@/utils/mockData'

// Use localStorage for persistence
const saveTrades = (trades: Trade[]) => {
  localStorage.setItem('pasefx_trade_journal', JSON.stringify(trades))
}
```

---

*Last Updated: February 2026*
*Version: 0.1.5-alpha*

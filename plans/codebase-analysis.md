# Pasè FX Codebase Analysis Report
## Backend API Integration Assessment

**Date:** February 16, 2026  
**Version:** 0.1.6-alpha  
**Prepared for:** Backend API Integration Planning

---

## EXECUTIVE SUMMARY

The current Pasè FX application is a **100% frontend static application** built with React + Vite. It has **no backend integration** and relies entirely on:
- localStorage for data persistence
- Static data in constants.ts
- Third-party TradingView widgets for market data
- No authentication system

This document provides a complete inventory of all localStorage usage, static data, and identifies exactly what needs to change for backend API integration.

---

## 1. LOCALSTORAGE USAGE INVENTORY

### 1.1 Complete List of localStorage Keys

| Key | File | Purpose | Data Type | Migration Priority |
|-----|------|---------|-----------|-------------------|
| `pasefx_signals` | `utils/signals.ts` | Stores trading signals | Signal[] | CRITICAL |
| `pasè_fx_trades` | `pages/TradeJournal.tsx` | Stores user trade journal | Trade[] | CRITICAL |
| `pasefx_ebook_downloaded` | `pages/Ebook.tsx` | Tracks ebook download status | boolean | LOW |
| `pasefx_dark_mode` | `components/Navbar.tsx` | UI theme preference | boolean | UI ONLY |
| `pasefx_cookie_consent` | `components/CookieConsent.tsx` | Cookie consent status | string | UI ONLY |

### 1.2 Files with localStorage Access

#### A. CRITICAL - Data Persistence Files

**File: `/home/mulky/Desktop/pase-fx/utils/signals.ts`**
```typescript
const STORAGE_KEY = 'pasefx_signals';

// Functions:
- getSignals(): Signal[]           // Reads from localStorage
- saveSignals(signals): void       // Writes to localStorage  
- addSignal(signal): Signal        // Creates new signal
- updateSignalStatus(id, status, resultPips): Signal | null  // Updates status
- deleteSignal(id): boolean        // Removes signal
- calculateSignalStats(signals): Stats  // Calculates statistics
- initializeDemoSignals(): void    // Seeds demo data
```

**File: `/home/mulky/Desktop/pase-fx/pages/TradeJournal.tsx`**
```typescript
const STORAGE_KEY = 'pasè_fx_trades';

// Operations:
- Load trades on mount (lazy initialization)
- Save trades on every change (useEffect)
- Export to CSV functionality
- Import from CSV functionality
```

#### B. UI PREFERENCE - Non-Critical Files

**File: `/home/mulky/Desktop/pase-fx/components/Navbar.tsx`**
```typescript
Key: 'pasefx_dark_mode'
- Read: Initialize dark mode state
- Write: On dark mode toggle
- Note: Can remain client-side (theme preference)
```

**File: `/home/mulky/Desktop/pase-fx/components/CookieConsent.tsx`**
```typescript
Key: 'pasefx_cookie_consent'
- Values: 'accepted' | 'declined'
- Read: Check if banner should show
- Write: On user choice
- Note: Can remain client-side
```

**File: `/home/mulky/Desktop/pase-fx/pages/Ebook.tsx`**
```typescript
Key: 'pasefx_ebook_downloaded'
- Read: Initialize download status
- Write: On download completion
- Note: Low priority - tracks UI state only
```

**File: `/home/mulky/Desktop/pase-fx/pages/Signals.tsx`**
```typescript
// Uses signals.ts utils, plus direct access:
- localStorage.removeItem('pasefx_signals')  // Reset demo data
```

**File: `/home/mulky/Desktop/pase-fx/pages/Home.tsx`**
```typescript
// Read-only access via getSignals()
- Displays signal stats and recent signals
```

**File: `/home/mulky/Desktop/pase-fx/src/test/utils/signals.test.ts`**
```typescript
- localStorage.clear()  // Test cleanup
// Tests localStorage-based signal operations
```

### 1.3 Data Structures

#### Signal Interface (types.ts)
```typescript
interface Signal {
  id: string;              // Auto-generated (Date.now())
  pair: string;            // e.g., "EURUSD"
  direction: 'BUY' | 'SELL';
  entry: number;
  sl: number;              // Stop Loss
  tp1: number;             // Take Profit 1
  tp2: number;
  tp3: number;
  status: SignalStatus;    // 'ACTIVE' | 'CLOSED' | 'HIT_TP' | 'HIT_SL'
  resultPips?: number;     // Final result in pips
  date: string;            // ISO date string
  analyst: string;
  timeframe: string;       // 'M5' | 'M15' | 'H1' | 'H4' | 'Daily'
  analysis: string;        // Text analysis
}
```

#### Trade Interface (TradeJournal.tsx - inline)
```typescript
interface Trade {
  id: string;
  date: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  exit: number;
  sl: number;
  tp: number;
  lots: number;
  result: 'WIN' | 'LOSS' | 'BE';
  pips: number;
  profit: number;          // Calculated: pips * 10 * lots
  notes: string;
  method?: string;         // Trading method used
}
```

---

## 2. STATIC DATA IN CONSTANTS.TS

### 2.1 Data That Should Move to Database

| Data | Current Location | Reason for Migration |
|------|-----------------|---------------------|
| Trading Signals | `SIGNALS_DATA: Signal[]` | Currently empty array, needs backend |
| Community Members | `COMMUNITY_MEMBERS` | User profiles should be dynamic |
| Education Articles | `EDUCATION_ARTICLES` | Content management via CMS |

### 2.2 Data That Should Remain Static

| Data | Reason |
|------|--------|
| `WHATSAPP_CONTACTS` | Business contact info |
| `SOCIAL_LINKS` | External links |
| `AFFILIATE_LINKS` | IB referral links |
| `TRADING_METHODS` | Educational reference library |
| `BROKERS_DATA` | Curated broker list |
| `FEATURES` | Marketing copy |
| `WEBSITE_STATUS` | App metadata |

### 2.3 Static Data Inventory

```typescript
// WhatsApp Configuration
WHATSAPP_CONTACTS = {
  azil: { name, role, phone, specialties },
  mulky: { name, role, phone, specialties }
}

// Social Media Links
SOCIAL_LINKS = {
  telegram, whatsapp, instagram, email
}

// Affiliate/IB Links  
AFFILIATE_LINKS = {
  mrg, exness, valetax, fundingPips,
  the5ers, didimax, hfm, fbs, traderFamilyPremium
}

// Community Members (3 verified members)
COMMUNITY_MEMBERS = [{
  id, name, role, avatar, status,
  methods[], expertise, joinDate, whatsapp, verified
}]

// Trading Methods Library (12 methods)
TRADING_METHODS = [{
  id, name, category, description,
  keyConcepts[], timeframe, difficulty,
  resources[], relatedMethods[]
}]

// Broker Recommendations (8 brokers)
BROKERS_DATA = [{
  id, name, type, link, logo, rating,
  features[], regulation, isRecommended?
}]

// Features Marketing
FEATURES = [{ title, desc, icon }]

// App Metadata
WEBSITE_STATUS = {
  version, status, lastUpdated,
  message, whatsappFounder, telegramGroup
}
```

---

## 3. API INTEGRATION POINTS

### 3.1 Simulated Operations Requiring Real API Calls

#### A. Signals Management (`utils/signals.ts`)
```typescript
// CURRENT: Local-only CRUD
getSignals()      ->  GET  /api/signals
saveSignals()     ->  POST /api/signals (bulk update)
addSignal()       ->  POST /api/signals
updateSignalStatus() -> PATCH /api/signals/:id
deleteSignal()    ->  DELETE /api/signals/:id
calculateSignalStats() -> GET /api/signals/stats (or compute client-side)
```

#### B. Trade Journal (`pages/TradeJournal.tsx`)
```typescript
// CURRENT: LocalStorage-based with CSV export/import
// Target: User-specific persisted data

Load trades       ->  GET  /api/trades
Add trade         ->  POST /api/trades
Delete trade      ->  DELETE /api/trades/:id
Export CSV        ->  GET  /api/trades/export (or client-side)
Import CSV        ->  POST /api/trades/import
```

#### C. Authentication Points
```typescript
// CURRENT: "Admin Mode" is just a checkbox (isAdmin state)
// Target: Real authentication

Signals.tsx: isAdmin toggle -> JWT token validation
Admin actions (add/update/delete signals) -> Role-based access control
```

### 3.2 Components Requiring API Integration

| Component | Current Data Source | Target API Endpoint |
|-----------|-------------------|-------------------|
| `Signals.tsx` | `utils/signals.ts` + localStorage | `/api/signals` |
| `TradeJournal.tsx` | localStorage (`pasè_fx_trades`) | `/api/trades` |
| `Home.tsx` | `getSignals()` | `/api/signals?limit=3` |
| `Members.tsx` | `COMMUNITY_MEMBERS` constant | `/api/members` |
| `Education.tsx` | `EDUCATION_ARTICLES` | `/api/articles` |

---

## 4. STATE MANAGEMENT CHANGES

### 4.1 Current Architecture
```
Current: useState + localStorage
┌─────────────────────────────────────┐
│  Component State (useState)         │
│  ├─ signals: Signal[]               │
│  ├─ trades: Trade[]                 │
│  └─ isAdmin: boolean                │
│                                     │
│  Side Effects (useEffect)           │
│  ├─ Load from localStorage          │
│  └─ Save to localStorage on change  │
└─────────────────────────────────────┘
```

### 4.2 Target Architecture (React Query/SWR)
```
Target: React Query + API Integration
┌─────────────────────────────────────┐
│  Server State (React Query)         │
│  ├─ useSignals() -> /api/signals    │
│  ├─ useTrades() -> /api/trades      │
│  └─ useUser() -> /api/auth/me       │
│                                     │
│  Client State (useState)            │
│  ├─ UI filters, search queries      │
│  └─ Form data                       │
│                                     │
│  Cache Management                   │
│  ├─ Stale-while-revalidate          │
│  ├─ Optimistic updates              │
│  └─ Background refetching           │
└─────────────────────────────────────┘
```

### 4.3 Components Requiring State Management Refactoring

#### A. `pages/Signals.tsx`
```typescript
// CURRENT
const [signals, setSignals] = useState<Signal[]>(() => {
  initializeDemoSignals();
  return getSignals();
});

// TARGET (React Query)
const { data: signals, isLoading } = useQuery({
  queryKey: ['signals'],
  queryFn: fetchSignals
});

const addSignalMutation = useMutation({
  mutationFn: createSignal,
  onSuccess: () => queryClient.invalidateQueries(['signals'])
});
```

#### B. `pages/TradeJournal.tsx`
```typescript
// CURRENT  
const [trades, setTrades] = useState<Trade[]>(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
}, [trades]);

// TARGET (React Query)
const { data: trades } = useQuery({
  queryKey: ['trades'],
  queryFn: fetchTrades
});
```

#### C. `pages/Home.tsx`
```typescript
// CURRENT
const signals = React.useMemo(() => getSignals(), []);

// TARGET
const { data: recentSignals } = useQuery({
  queryKey: ['signals'],
  queryFn: () => fetchSignals({ limit: 3 })
});
```

---

## 5. DATA FLOW DIAGRAMS

### 5.1 Current Signal Data Flow
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  User Action │────>│  Component   │────>│  localStorage │
│  (Add Signal)│     │  State Update│     │  (Persistence)│
└──────────────┘     └──────────────┘     └──────────────┘
        │                                         │
        │                                         │
        v                                         v
┌──────────────┐                       ┌──────────────┐
│  SignalCard  │<──────────────────────│  getSignals()│
│  (Display)   │                       │  (Retrieve)  │
└──────────────┘                       └──────────────┘
```

### 5.2 Target Signal Data Flow (with API)
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  User Action │────>│  React Query │────>│  POST /api/  │
│  (Add Signal)│     │  Mutation    │     │  signals     │
└──────────────┘     └──────────────┘     └──────────────┘
        │                                         │
        │         ┌──────────────┐               │
        └────────>│  Optimistic  │<──────────────┘
                  │  UI Update   │    (Response)
                  └──────────────┘
                        │
                        v
               ┌──────────────┐
               │  SignalCard  │
               │  (Display)   │
               └──────────────┘
```

### 5.3 Authentication Flow (New)
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Login Page │────>│  POST /api/  │────>│   Backend    │
│   (Credentials)    │  auth/login  │     │   Validation │
└──────────────┘     └──────────────┘     └──────────────┘
                             │                     │
                             v                     v
                      ┌──────────────┐     ┌──────────────┐
                      │  JWT Token   │<────│  User Record │
                      │  (stored in  │     │  (Database)  │
                      │   httpOnly   │     │              │
                      │   cookie)    │     │              │
                      └──────────────┘     └──────────────┘
```

---

## 6. MIGRATION STRATEGY

### 6.1 Phase 1: Foundation (Week 1)

**Setup & Dependencies**
```bash
# Install React Query
npm install @tanstack/react-query @tanstack/react-query-devtools

# Install axios for API client
npm install axios

# Install auth library (if needed)
npm install @auth0/auth0-react  # OR custom JWT solution
```

**Create API Client Structure**
```
src/
├── api/
│   ├── client.ts           # Axios instance with interceptors
│   ├── signals.ts          # Signal API methods
│   ├── trades.ts           # Trade journal API methods
│   ├── auth.ts             # Authentication API methods
│   └── index.ts            # Exports
├── hooks/
│   ├── useSignals.ts       # React Query hooks
│   ├── useTrades.ts
│   └── useAuth.ts
└── providers/
    └── QueryProvider.tsx   # React Query provider
```

### 6.2 Phase 2: Signals Migration (Week 2)

1. **Create API Layer**
   - `src/api/signals.ts` with CRUD operations
   - Error handling and types

2. **Create React Query Hooks**
   - `useSignals()` - fetch all signals
   - `useAddSignal()` - mutation for adding
   - `useUpdateSignal()` - mutation for updating
   - `useDeleteSignal()` - mutation for deleting

3. **Refactor Components**
   - Update `Signals.tsx` to use React Query
   - Update `Home.tsx` for signal display
   - Update `SignalCard.tsx` (props only, no changes needed)

4. **Migration Path**
   - Feature flag to toggle between localStorage and API
   - Gradual rollout with fallback

### 6.3 Phase 3: Trade Journal Migration (Week 3)

1. **API Layer**
   - `src/api/trades.ts`
   - Keep CSV export/import client-side

2. **React Query Hooks**
   - `useTrades()`
   - `useAddTrade()`
   - `useDeleteTrade()`

3. **Refactor `TradeJournal.tsx`**
   - Replace localStorage with API calls
   - Maintain CSV functionality

### 6.4 Phase 4: Authentication (Week 4)

1. **Backend Requirements**
   - JWT-based authentication
   - User roles (admin, user)
   - Secure password hashing

2. **Frontend Changes**
   - Login/Register pages
   - Protected routes
   - Admin-only signal management
   - Replace `isAdmin` checkbox with real auth

3. **Components to Update**
   - `Signals.tsx` - Admin actions require auth
   - `Navbar.tsx` - Show login/user menu
   - Create `Login.tsx`, `Register.tsx`

### 6.5 Phase 5: Data Migration (Week 5)

**LocalStorage to Database Migration**
```typescript
// Migration utility
const migrateLocalStorageData = async () => {
  const localSignals = getSignals(); // from localStorage
  const localTrades = getLocalTrades(); // from localStorage
  
  if (localSignals.length > 0) {
    await api.importSignals(localSignals);
    localStorage.removeItem('pasefx_signals');
  }
  
  if (localTrades.length > 0) {
    await api.importTrades(localTrades);
    localStorage.removeItem('pasè_fx_trades');
  }
};
```

---

## 7. API ENDPOINT SPECIFICATION

### 7.1 Signals API

```typescript
// GET /api/signals
interface GetSignalsResponse {
  signals: Signal[];
  meta: {
    total: number;
    active: number;
    hitTP: number;
    hitSL: number;
    winRate: number;
  };
}

// POST /api/signals
interface CreateSignalRequest {
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  sl: number;
  tp1: number;
  tp2?: number;
  tp3?: number;
  analyst: string;
  timeframe: string;
  analysis?: string;
}

// PATCH /api/signals/:id
interface UpdateSignalRequest {
  status?: SignalStatus;
  resultPips?: number;
}

// DELETE /api/signals/:id
// Response: 204 No Content
```

### 7.2 Trade Journal API

```typescript
// GET /api/trades
interface GetTradesResponse {
  trades: Trade[];
  stats: {
    total: number;
    wins: number;
    losses: number;
    winRate: number;
    totalPips: number;
    totalProfit: number;
  };
}

// POST /api/trades
interface CreateTradeRequest {
  date: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  exit: number;
  sl?: number;
  tp?: number;
  lots: number;
  notes?: string;
  method?: string;
}

// POST /api/trades/import
// Content-Type: multipart/form-data
// File: CSV file
```

### 7.3 Authentication API

```typescript
// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
  token: string;  // JWT
}

// POST /api/auth/register
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// GET /api/auth/me
interface MeResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
}
```

---

## 8. COMPONENT MIGRATION CHECKLIST

### High Priority (Data Persistence)

| Component | File | Changes Required | Effort |
|-----------|------|-----------------|--------|
| Signals | `pages/Signals.tsx` | Replace localStorage with API + React Query | 2 days |
| TradeJournal | `pages/TradeJournal.tsx` | Replace localStorage with API + React Query | 2 days |
| signals.ts | `utils/signals.ts` | Deprecate/Remove localStorage functions | 1 day |

### Medium Priority (Read-Only Display)

| Component | File | Changes Required | Effort |
|-----------|------|-----------------|--------|
| Home | `pages/Home.tsx` | Use React Query for signal stats | 4 hours |
| SignalCard | `components/SignalCard.tsx` | No changes (pure component) | 0 |

### Low Priority (UI Preferences)

| Component | File | Changes Required | Effort |
|-----------|------|-----------------|--------|
| Navbar | `components/Navbar.tsx` | Keep localStorage for dark mode | None |
| CookieConsent | `components/CookieConsent.tsx` | Keep localStorage for consent | None |
| Ebook | `pages/Ebook.tsx` | Keep localStorage for download state | None |

### New Components Required

| Component | Purpose | Location |
|-----------|---------|----------|
| Login.tsx | User authentication | `pages/Login.tsx` |
| Register.tsx | User registration | `pages/Register.tsx` |
| ProtectedRoute.tsx | Auth guard wrapper | `components/ProtectedRoute.tsx` |
| QueryProvider.tsx | React Query setup | `providers/QueryProvider.tsx` |

---

## 9. TESTING CONSIDERATIONS

### 9.1 Unit Tests to Update

**File: `/home/mulky/Desktop/pase-fx/src/test/utils/signals.test.ts`**
- Currently tests localStorage operations
- Needs mocking for API calls
- Update to test API integration

```typescript
// New test structure
describe('Signals API', () => {
  beforeEach(() => {
    // Mock API responses
    jest.spyOn(api, 'fetchSignals').mockResolvedValue(mockSignals);
  });
  
  it('should fetch signals from API', async () => {
    // Test API integration
  });
});
```

### 9.2 E2E Testing Requirements

- Test signal CRUD operations
- Test trade journal persistence
- Test authentication flow
- Test admin-only actions
- Test offline behavior (if implementing PWA)

---

## 10. SECURITY CONSIDERATIONS

### 10.1 Current Vulnerabilities

1. **No Authentication**: Admin mode is just a checkbox
2. **Client-Side Data**: All data can be manipulated by user
3. **No Data Validation**: No server-side validation of signals/trades

### 10.2 Required Security Measures

1. **Authentication**: JWT tokens in httpOnly cookies
2. **Authorization**: Role-based access control (RBAC)
3. **Input Validation**: Zod schemas for API validation
4. **Rate Limiting**: Prevent API abuse
5. **CORS**: Proper cross-origin configuration

---

## 11. RISK ASSESSMENT

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Medium | High | Backup localStorage before migration |
| User resistance to login requirement | High | Medium | Keep demo mode available |
| API downtime affecting UX | Medium | High | Implement optimistic updates + offline queue |
| Performance degradation | Low | Medium | Proper caching strategies |
| Auth system complexity | Medium | Medium | Use established auth libraries |

---

## 12. SUMMARY & RECOMMENDATIONS

### Critical Changes Required

1. **Remove localStorage dependencies** for:
   - Signals (`pasefx_signals`)
   - Trade Journal (`pasè_fx_trades`)

2. **Implement backend API** for:
   - Signal CRUD operations
   - Trade journal persistence
   - User authentication

3. **Adopt React Query** for:
   - Server state management
   - Caching and background updates
   - Optimistic updates

4. **Add authentication system**:
   - Replace checkbox admin with real roles
   - Protect sensitive operations

### Estimated Effort

- **Total Development Time**: 4-5 weeks
- **Developer Resources**: 1-2 developers
- **Backend Requirements**: Node.js/Express API + PostgreSQL database

### Next Steps

1. Set up backend API project structure
2. Design database schema
3. Implement authentication endpoints
4. Create API client layer in frontend
5. Migrate Signals feature
6. Migrate Trade Journal feature
7. Implement auth flow
8. Deploy and test

---

**Document Version:** 1.0  
**Last Updated:** February 16, 2026  
**Author:** Code Analysis Agent

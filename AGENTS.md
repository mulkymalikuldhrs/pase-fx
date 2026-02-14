# AGENTS.md - Codebase Guidelines for AI Agents

## Build, Lint, and Test Commands

### Core Commands (from package.json)
```bash
npm run dev          # Start Vite development server
npm run build        # Build for production (vite build)
npm run preview      # Preview production build locally
```

### TypeScript Type Checking
```bash
npx tsc --noEmit     # Run TypeScript compiler without emitting files
```

### Testing (Not Yet Configured)
```bash
# To add testing framework:
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
# Then run: npm run test (single test: npm run test -- --run <pattern>)
```

### Project Configuration
- **Framework**: Vite + React 19
- **Language**: TypeScript (ES2022 target)
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Path Alias**: `@/*` maps to `./*`

---

## Code Style Guidelines

### TypeScript Rules
- Use strict TypeScript (check tsconfig.json for settings)
- Prefer explicit types over `any`
- Use interfaces for object shapes in `types.ts`
- Leverage path alias `@/` for imports

### React Components
- Use functional components with `React.FC` type
- Components go in `components/` or `pages/` directories
- Use `.tsx` extension for components, `.ts` for utilities
- Export components as named exports
- Props interface defined inline or in `types.ts`

### Import Conventions
```typescript
// Standard import order
import React, { useState, useEffect } from 'react'
import { IconName } from 'lucide-react'
import { CONSTANT_NAME } from '@/constants'
import { SomeType } from '@/types'
import MyComponent from '@/components/MyComponent'
```

### Naming Conventions
- **Components**: PascalCase (`Button`, `UserProfile`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/Functions**: camelCase (`userName`, `fetchData`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRIES`)
- **Types/Interfaces**: PascalCase (`UserType`, `BrokerProps`)

### Styling with Tailwind CSS
- Use utility classes from Tailwind
- Follow mobile-first responsive design
- Use CSS variables from `index.css` for theme consistency
- White Liquid Glass design system:
  - Glass cards: `bg-white/70 backdrop-blur-xl`
  - Emerald primary: `text-emerald-600`, `bg-emerald-500`
  - Borders: `border-white/90` or `border-gray-200`

### Error Handling
- Wrap async operations in try/catch blocks
- Provide user-friendly error messages
- Use `onError` handlers for images (see Footer.tsx pattern)
- Never expose sensitive information in errors

### State Management
- Use `useState` for local component state
- Use `useEffect` for side effects with proper cleanup
- Use `useRef` for DOM references (e.g., TradingView widgets)
- Keep state as close to usage as possible
- LocalStorage for data persistence (see TradeJournal pattern)

### Performance
- Memoize expensive computations with `useMemo` when needed
- Clean up event listeners in useEffect return functions
- Lazy load heavy components if needed

---

## Communication Style

- **Direct and concise**: Get to the solution immediately
- **Complete solutions**: Provide A-Z solutions, not hints
- **Honest feedback**: Be direct even if uncomfortable
- **Time-efficient**: No unnecessary fluff or preamble
- **Production-ready code**: Include error handling and edge cases

## Mode Prefixes
- `[DEV]` - Developer mode for code implementation
- `[SOLVE]` - Problem solving and debugging
- `[ADVISOR]` - Technical recommendations
- `[AUTO]` - Autonomous execution mode

## Existing Documentation
This codebase references comprehensive documentation:
- `README.md` - Project overview and features
- `CHANGELOG.md` - Version history
- `AUDIT_COMPLETE_REPORT.md` - Bug fixes and status
- `STRATEGIC_BLUEPRINT_360.md` - Strategic planning
- `MASTER_BLUEPRINT_EXECUTIVE.md` - Executive summary
- `Blueprint_Awal.md` - Initial concept

---

## Key Technical Details

### Routing
- Hash-based routing (e.g., `/#/sinyal`)
- Check `window.location.hash` for current path
- Use `hashchange` event listener for navigation

### Data Patterns
- Types defined in `types.ts`
- Constants in `constants.ts`
- Local storage keys: Use descriptive names with prefix (e.g., `pasefx_trade_journal`)

### External Integrations
- TradingView widgets via script injection
- WhatsApp API for contact links
- No backend API currently

### Security
- No sensitive data in localStorage
- Input validation for calculator inputs
- XSS prevention when injecting scripts

---

## 4-AGENT COLLABORATION PLAN

### AGENT 1: Core Features & Components
**Scope**: Functional development, logic implementation, feature completion

**Current Tasks**:
- [x] Implement real trading signals system (localStorage-based simulation)
- [x] Upgrade all calculators to white theme with better UX
- [x] Add Fibonacci Calculator
- [x] Enhance TradeJournal with export/import and advanced stats
- [x] Complete ebook page with download simulation
- [ ] Add more education articles (5 more articles)
- [ ] Add error boundaries to all pages
- [ ] Implement service worker for offline capability

**Status**: ✅ PHASE 1 COMPLETED - Major feature upgrades done

**COMPLETED WORK (2026-02-15)**:

### 1. Trading Signals System - FULL IMPLEMENTATION
- Created `utils/signals.ts` - Full CRUD operations with localStorage persistence
- Rewrote `pages/Signals.tsx` - Complete signal management interface with:
  - Add signal modal form (pair, direction, entry, SL, TP1/2/3, analyst, timeframe, analysis)
  - Real statistics calculation (win rate, total pips, profit/loss count)
  - Filter by status (ALL, ACTIVE, HIT_TP, HIT_SL)
  - Search by pair or analyst
  - Admin mode with toggle checkbox
  - Demo data initialization (3 sample signals)
  - Reset to demo data function
- Enhanced `components/SignalCard.tsx` - Added:
  - Display all 3 TP levels
  - Show result pips when available
  - Risk:Reward calculation display

### 2. Calculator Upgrades - THEME CONSISTENCY
- `PipCalculator.tsx` - Updated to white theme, added pair descriptions
- `PositionCalculator.tsx` - Updated to white theme, added currency pairs dropdown
- `RiskRewardCalculator.tsx` - Updated to white theme, color-coded R:R ratios
- `FibonacciCalculator.tsx` - NEW calculator with:
  - Full retracement levels (0%, 23.6%, 38.2%, 50%, 61.8%, 78.6%, 100%)
  - Extension levels (138.2%, 161.8%, 200%, 261.8%, 361.8%)
  - BUY/SELL direction support
  - Visual color coding

### 3. TradeJournal - MAJOR ENHANCEMENT
- Export/Import CSV functionality
- Extended statistics:
  - Average profit per trade
  - Average win/loss amounts
  - Win/Loss ratio
  - Performance by trading method
- Method tracking (SNR, SMC, ICT, etc.)
- Advanced filtering by method and result
- Better UI with rounded corners

### 4. Ebook Page - DOWNLOAD SIMULATION
- Progress bar animation for download
- LocalStorage tracking (pasefx_ebook_downloaded)
- "Already downloaded" state
- Interactive chapter preview with expand/collapse
- Benefits section with icons
- Enhanced WhatsApp contact cards

### 5. Tools Page Update
- Added Fibonacci Calculator to grid
- Updated to 4-column layout on XL screens

**Files Created/Modified**:
- NEW: `utils/signals.ts`
- NEW: `components/calculators/FibonacciCalculator.tsx`
- REWRITTEN: `pages/Signals.tsx`
- UPGRADED: `pages/TradeJournal.tsx`
- UPGRADED: `pages/Ebook.tsx`
- UPDATED: All calculator components
- UPDATED: `pages/Tools.tsx`
- UPDATED: `components/SignalCard.tsx`
- UPDATED: `CHANGELOG.md`

**Build Status**: ✅ Build successful (npm run build)
**Bundle Size**: ~400 KB (increased with new features)

**Report to**: User - All major features upgraded and consistent

---

### AGENT 2: Testing & Quality Assurance
**Scope**: Test coverage, bug fixes, TypeScript strictness, linting

**Current Tasks**:
- [ ] Setup Vitest testing framework
- [ ] Write unit tests for calculators (Pip, Position, RiskReward)
- [ ] Write tests for utility functions
- [ ] Add ESLint configuration
- [ ] Fix all TypeScript strict errors
- [ ] Cross-browser testing checklist

**File Focus**:
- `vitest.config.ts` - Create test config
- `*.test.tsx` - Component tests
- `*.test.ts` - Utility tests
- `.eslintrc.cjs` - ESLint config

**Report to**: User when test coverage > 70%

---

### AGENT 3: UI/UX & Design System ✅ COMPLETE
**Scope**: Visual improvements, accessibility, responsive design, animations

**Current Tasks**: ALL COMPLETED
- [x] Add dark mode toggle - ✅ COMPLETED (Navbar.tsx with localStorage + data-theme)
- [x] Improve mobile navigation UX - ✅ COMPLETED (better aria attributes, close on nav)
- [x] Add loading skeletons for async content - ✅ COMPLETED (components/ui/LoadingSkeleton.tsx)
- [x] Add page transition CSS - ✅ COMPLETED (index.css with .page-wrapper)
- [x] Add accessibility attributes (aria-labels, roles) - ✅ COMPLETED (Navbar, skeleton components)
- [x] Create design system documentation - ✅ COMPLETED (docs/DESIGN_SYSTEM.md)
- [x] Update CHANGELOG - ✅ COMPLETED (v0.1.1-alpha added)
- [x] Audit - ✅ COMPLETED (no TODO/FIXME in source)
- [x] Update AUDIT report - ✅ COMPLETED (v0.1.1-alpha)

**NEW FILES CREATED**:
- `components/ui/LoadingSkeleton.tsx` - Reusable loading skeleton components
- `docs/DESIGN_SYSTEM.md` - Design system documentation

**File Focus**:
- `components/Navbar.tsx` - Mobile menu improvements
- `index.css` - Dark mode variables
- `components/ui/` - Reusable UI components
- All pages - Accessibility improvements

**Report to**: User when design system documented

---

### AGENT 4: Documentation & DevOps
**Scope**: Documentation, deployment, CI/CD, analytics, SEO

**Current Tasks**:
- [x] Create comprehensive API documentation
- [x] Setup GitHub Actions for CI/CD
- [ ] Add Google Analytics / Plausible
- [x] Optimize SEO meta tags
- [x] Create user guide/wiki
- [x] Setup automated deployment

**Status**: ✅ COMPLETED - All tasks done except analytics

**File Focus**:
- `.github/workflows/ci.yml` - ✅ CI/CD pipeline created
- `docs/` - ✅ Documentation folder with user guide, API docs, tech specs
- `index.html` - ✅ SEO structured data added
- `CHANGELOG.md` - ✅ Updated to v0.1.2-alpha

**Report to**: User when CI/CD operational - ✅ COMPLETED

---

### AGENT COORDINATION RULES

1. **Always check AGENTS.md first** before starting work
2. **Update task status** using [ ], [/], [x] notation
3. **Never conflict** - check other agents' current tasks
4. **Communication**: Use comments in code for coordination
5. **File locking**: When working on critical files, note it in AGENTS.md
6. **Daily sync**: Each agent reports progress before ending session

### CURRENT PRIORITY
**Phase 1: Foundation (Week 1-2)**
- Agent 1: Complete Signals page + Ebook download
- Agent 2: Setup testing framework + initial tests
- Agent 3: Dark mode + mobile improvements
- Agent 4: CI/CD pipeline + documentation structure

### STATUS UPDATE FORMAT
```
Agent [N] - [Name] - [Date]
Completed: [list]
In Progress: [list]
Blocked: [list]
Next: [list]
```

---

*Last Updated: February 15, 2026*
*Version: 0.1.5-alpha*
*Agents Active: 4/4*

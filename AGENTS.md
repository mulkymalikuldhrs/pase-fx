# AGENTS.md - Codebase Guidelines for AI Agents

## Build, Lint, and Test Commands

```bash
# Development
npm run dev              # Start Vite dev server (port 3000)
npm run build            # Build for production (includes type check)
npm run preview          # Preview production build locally

# Type Checking
npm run typecheck        # Run TypeScript compiler without emitting files

# Linting
npm run lint             # Run ESLint on all .ts and .tsx files
npm run lint:fix         # Run ESLint and fix auto-fixable issues

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once (for CI/CD)
# Run single test: npm run test:run -- <pattern>
# Example: npm run test:run -- signals
```

## Project Configuration
- **Framework**: Vite + React 19
- **Language**: TypeScript (ES2022 target)
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Path Alias**: `@/*` maps to `./*`

---

## Code Style Guidelines

### TypeScript Rules
- Use strict TypeScript (check tsconfig.json)
- Prefer explicit types over `any`
- Define interfaces in `types.ts`
- Use path alias `@/` for imports

### React Components
- Use functional components with `React.FC` type
- Components go in `components/` or `pages/`
- Use `.tsx` for components, `.ts` for utilities
- Export components as named exports
- Props interface defined inline or in `types.ts`

### Import Conventions
```typescript
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
- Use `useEffect` with proper cleanup
- Use `useRef` for DOM references
- LocalStorage for persistence (prefix: `pasefx_`)

### Performance
- Memoize with `useMemo` when needed
- Clean up event listeners in useEffect return
- Lazy load heavy components if needed

---

## Communication Style
- **Direct and concise**: Get to the solution immediately
- **Complete solutions**: Provide A-Z solutions, not hints
- **Production-ready code**: Include error handling and edge cases

## Mode Prefixes
- `[DEV]` - Developer mode for code implementation
- `[SOLVE]` - Problem solving and debugging
- `[ADVISOR]` - Technical recommendations
- `[AUTO]` - Autonomous execution mode

---

## Key Technical Details

### Routing
- Hash-based routing (e.g., `/#/sinyal`)
- Check `window.location.hash` for current path
- Use `hashchange` event listener for navigation

### Data Patterns
- Types defined in `types.ts`
- Constants in `constants.ts`
- LocalStorage keys: Use descriptive names with prefix (e.g., `pasefx_trade_journal`)

### External Integrations
- TradingView widgets via script injection
- WhatsApp API for contact links
- No backend API currently

### Security
- No sensitive data in localStorage
- Input validation for calculator inputs
- XSS prevention when injecting scripts

---

## Reference Documentation
- `README.md` - Project overview and features
- `CHANGELOG.md` - Version history
- `docs/DESIGN_SYSTEM.md` - Design system documentation

---

*Last Updated: February 16, 2026*

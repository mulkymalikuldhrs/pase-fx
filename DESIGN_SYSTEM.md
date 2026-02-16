# 🎨 DESIGN SYSTEM - Pasè FX Trader Hub

## Overview

This document describes the design system for Pasè FX Trader Hub, a React + Tailwind CSS web application with a White Liquid Glass theme.

---

## Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#059669` | Main actions, links |
| Primary Light | `#10b981` | Hover states |
| Primary Dark | `#047857` | Active states |

### Gray Scale (Light Mode)
| Color | Hex | Usage |
|-------|-----|-------|
| Gray 50 | `#f9fafb` | Backgrounds |
| Gray 100 | `#f3f4f6` | Cards |
| Gray 200 | `#e5e7eb` | Borders |
| Gray 300 | `#d1d5db` | Dividers |
| Gray 400 | `#9ca3af` | Placeholders |
| Gray 500 | `#6b7280` | Secondary text |
| Gray 600 | `#4b5563` | Body text |
| Gray 700 | `#374151` | Headings |
| Gray 800 | `#1f2937` | Dark headings |
| Gray 900 | `#111827` | Primary text |

### Gray Scale (Dark Mode)
| Color | Hex | Usage |
|-------|-----|-------|
| Gray 50 | `#0f172a` | Dark backgrounds |
| Gray 100 | `#1e293b` | Dark cards |
| Gray 200 | `#334155` | Dark borders |
| Gray 300 | `#475569` | Dark dividers |
| Gray 400 | `#64748b` | Dark placeholders |
| Gray 500 | `#94a3b8` | Dark secondary text |
| Gray 600 | `#cbd5e1` | Dark body text |
| Gray 700 | `#e2e8f0` | Dark headings |
| Gray 800 | `#f1f5f9` | Dark primary text |
| Gray 900 | `#f8fafc` | Bright text |

---

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Font Sizes
| Size | Value | Usage |
|------|-------|-------|
| xs | 0.75rem | Labels, badges |
| sm | 0.875rem | Secondary text |
| base | 1rem | Body text |
| lg | 1.125rem | Lead text |
| xl | 1.25rem | Subheadings |
| 2xl | 1.5rem | Section titles |
| 3xl | 1.875rem | Page titles |
| 4xl | 2.25rem | Hero text |
| 5xl | 3rem | Landing hero |

---

## Spacing System

Based on 4px base unit:
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 3rem (48px)
- `3xl`: 4rem (64px)

---

## Border Radius

| Name | Value | Usage |
|------|-------|-------|
| sm | 0.5rem | Buttons, inputs |
| md | 0.75rem | Cards |
| lg | 1rem | Modals |
| xl | 1.5rem | Large cards |
| full | 9999px | Pills, avatars |

---

## Glass Effects

### Glass Card (Light)
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(0, 0, 0, 0.08);
border-radius: 1.5rem;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
```

### Glass Card (Dark)
```css
background: rgba(30, 41, 59, 0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Glass Button
```css
background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(16, 185, 129, 0.05));
backdrop-filter: blur(10px);
border: 1px solid rgba(5, 150, 105, 0.3);
border-radius: 1rem;
color: #059669;
```

### Glass Input
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 1rem;
```

---

## Component Library

### UI Components

#### Button
```tsx
<button className="glass-button">
  Action
</button>
```

#### Card
```tsx
<div className="glass-card">
  Content
</div>
```

#### Input
```tsx
<input className="glass-input" placeholder="Enter text" />
```

#### Badge
```tsx
<span className="glass-badge">Label</span>
```

### Custom Components

#### Loading Skeletons (`components/ui/LoadingSkeleton.tsx`)
- `LoadingSkeleton` - Base skeleton
- `CardSkeleton` - Card placeholder
- `TableRowSkeleton` - Table row placeholder
- `WidgetSkeleton` - TradingView widget placeholder
- `CalculatorInputSkeleton` - Calculator input placeholder

#### Page Transitions (`components/ui/PageTransition.tsx`)
- `FadeIn` - Fade in animation
- `SlideIn` - Slide in from right
- `StaggerContainer` - Container for staggered animations
- `StaggerItem` - Individual staggered item
- `PageWrapper` - Page wrapper with scroll to top

---

## Animations

### Keyframes

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(5, 150, 105, 0.2); }
  50% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.4); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Animation Classes
- `animate-fade-in-up` - Fade in from bottom
- `animate-slide-in-right` - Slide in from left
- `animate-pulse-glow` - Pulsing glow effect
- `animate-float` - Floating animation

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

---

## Dark Mode

Dark mode is implemented using:
1. CSS variables in `:root` and `[data-theme="dark"]`
2. Tailwind's `.dark` class
3. localStorage persistence (`pasefx_dark_mode`)
4. System preference detection (`prefers-color-scheme`)

### Toggle Component
The Navbar includes a dark mode toggle button with:
- Sun icon for light mode
- Moon icon for dark mode
- localStorage persistence
- System preference detection

---

## Accessibility

### ARIA Attributes
All interactive elements include proper ARIA attributes:
- `role="navigation"` for nav elements
- `aria-label` for buttons and links
- `aria-expanded` for collapsible menus
- `aria-current` for active navigation items

### Focus States
All interactive elements have visible focus states:
```css
:focus-visible {
  outline: 2px solid #059669;
  outline-offset: 2px;
}
```

### Reduced Motion
Animations are disabled for users who prefer reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

---

## Best Practices

1. **Use CSS Variables** - Always use CSS variables for colors and spacing
2. **Mobile First** - Design for mobile first, then add desktop styles
3. **Accessibility** - Include ARIA labels and focus states
4. **Dark Mode** - Test all components in both light and dark modes
5. **Consistency** - Use the component library for consistent UI

---

## File Structure

```
components/
├── ui/
│   ├── LoadingSkeleton.tsx
│   └── PageTransition.tsx
├── Navbar.tsx
├── Footer.tsx
└── ...
```

---

*Last Updated: February 2026*
*Version: 2.0.0*

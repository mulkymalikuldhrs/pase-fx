# PASE FX DESIGN SYSTEM
## Unified Color Palette - Emerald & White

---

## PRIMARY COLORS (Emerald Green)

| Name | Hex | Usage |
|------|-----|-------|
| emerald-50 | #ecfdf5 | Backgrounds, cards |
| emerald-100 | #d1fae5 | Hover states, highlights |
| emerald-200 | #a7f3d0 | Active states |
| emerald-300 | #6ee7b7 | Borders |
| emerald-400 | #34d399 | Icons, accents |
| emerald-500 | #10b981 | Primary buttons, links |
| emerald-600 | #059669 | Primary hover |
| emerald-700 | #047857 | Active/pressed |
| emerald-800 | #065f46 | Text on light bg |
| emerald-900 | #064e3b | Dark text |

---

## NEUTRAL COLORS (White/Gray)

| Name | Hex | Usage |
|------|-----|-------|
| white | #ffffff | Main background |
| gray-50 | #f9fafb | Card backgrounds |
| gray-100 | #f3f4f6 | Borders, dividers |
| gray-200 | #e5e7eb | Disabled states |
| gray-300 | #d1d5db | Placeholders |
| gray-400 | #9ca3af | Secondary text |
| gray-500 | #6b7280 | Muted text |
| gray-600 | #4b5563 | Body text |
| gray-700 | #374151 | Headings |
| gray-800 | #1f2937 | Dark text |
| gray-900 | #111827 | Primary text |

---

## ACCENT COLORS

| Name | Hex | Usage |
|------|-----|-------|
| red-500 | #ef4444 | Sell, loss, errors |
| red-600 | #dc2626 | Sell hover |
| green-500 | #22c55e | Buy, profit |
| green-600 | #16a34a | Buy hover |
| amber-500 | #f59e0b | Warnings, pending |
| blue-500 | #3b82f6 | Info, links |
| purple-500 | #8b5cf6 | Premium features |

---

## STATUS COLORS

| Status | Background | Text |
|--------|------------|------|
| BUY | emerald-100 | emerald-700 |
| SELL | red-100 | red-700 |
| NEUTRAL | gray-100 | gray-600 |
| ACTIVE | amber-100 | amber-700 |
| HIT_TP | green-100 | green-700 |
| HIT_SL | red-100 | red-700 |

---

## USAGE GUIDELINES

### Backgrounds
- Main: `bg-white`
- Cards: `bg-gray-50` or `bg-white`
- Section: `bg-emerald-50` (subtle)
- Dark mode: `bg-gray-900`

### Buttons
- Primary: `bg-emerald-500 hover:bg-emerald-600 text-white`
- Secondary: `bg-white border border-emerald-500 text-emerald-600`
- Danger: `bg-red-500 hover:bg-red-600 text-white`

### Text
- Primary: `text-gray-900`
- Secondary: `text-gray-600`
- Muted: `text-gray-400`
- Accent: `text-emerald-600`

### Borders
- Subtle: `border-gray-100`
- Default: `border-gray-200`
- Strong: `border-emerald-200`

---

## TAILWIND CLASS REFERENCE

```jsx
// Backgrounds
<div className="bg-white">Main content</div>
<div className="bg-gray-50">Cards</div>
<div className="bg-emerald-50">Highlights</div>

// Text
<p className="text-gray-900">Primary</p>
<p className="text-gray-600">Secondary</p>
<p className="text-emerald-600">Accent</p>

// Buttons
<button className="bg-emerald-500 text-white px-4 py-2 rounded-lg">
  Primary
</button>

// Borders
<div className="border border-gray-200 rounded-lg">
  Card
</div>
```

---

*Updated: 2026-03-01*

---

> **Contact:** Mulky Malikul Dhaher — [mulkymalikuldhaher@email.com](mailto:mulkymalikuldhaher@email.com)
>
> **Disclaimer:** This project is for Education Purpose only. Risiko apapun tidak kita tanggung. (We are not responsible for any risks or damages.)

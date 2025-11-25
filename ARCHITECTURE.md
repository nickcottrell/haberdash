# Haberdash Architecture

## Design Philosophy

**Semantic HTML first. CSS for presentation. JavaScript for enhancement.**

Haberdash uses a **Spectra-first architecture** where all styling is driven by color-space theme encoding.

## Theme System

All pages are styled via the Spectra theme system. There are two modes:

### 1. **BASE Theme (Craigslist Mode)**
- Node ID: `BASE`
- Minimal styling preset built into Spectra
- No animations, shadows, or rounded corners
- Browser-default aesthetic (black & white, high contrast)
- Zero visual polish - perfect for development and debugging
- Fast, functional, accessible

### 2. **Live Spectra Themes**
- Any other node ID (e.g., `haberdash-ui-theme`)
- Color-space driven design tokens from API
- Dynamic calculations based on F1-F4 color dimensions
- Beautiful, polished UI with animations and effects
- Real-time theme updates

---

## Layer Separation

```
┌─────────────────────────────────────────┐
│  HTML (Semantic Structure)              │
│  - Native elements: <button>, <input>   │
│  - ARIA attributes                      │
│  - Data attributes for JS hooks         │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  CSS Base Layer (Structure)             │
│  - Layout (flexbox, grid)               │
│  - Component relationships              │
│  - No colors, no shadows, no radius     │
│  - Works with browser defaults          │
└─────────────────────────────────────────┘
           ↓ (optional)
┌─────────────────────────────────────────┐
│  CSS Theme Layer (Appearance)           │
│  - CSS variables from Spectra           │
│  - Colors, shadows, borders, radius     │
│  - Typography scales                    │
│  - Transitions and animations           │
└─────────────────────────────────────────┘
           ↓ (optional)
┌─────────────────────────────────────────┐
│  JavaScript (Behavior Enhancement)      │
│  - Auto-initialization                  │
│  - Interactive components               │
│  - Spectra theme injection              │
│  - State management                     │
└─────────────────────────────────────────┘
```

---

## File Structure

```
css/
├── haberdash.css              # Base layer import only
├── base/
│   ├── reset.css              # Minimal browser normalization
│   ├── layout.css             # Grid, flex, containers
│   ├── typography.css         # Semantic HTML tags
│   ├── button.css             # Button structure
│   ├── form.css               # Form structure
│   ├── card.css               # Card structure
│   ├── slider.css             # Slider structure
│   └── upload.css             # Upload structure
├── themes/
│   └── spectra.css            # Spectra theme layer
└── utilities/
    ├── accessibility.css      # a11y helpers
    └── states.css             # State classes

js/
├── haberdash.js               # Component behavior library
├── spectra-theme.js           # Color-space theme engine
└── spectra-bridge.js          # Maps Spectra → Haberdash tokens
```

---

## Usage

All pages use Spectra. Choose BASE for minimal styling or a live node for full theming:

### BASE Theme (Development/Craigslist Mode)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="css/haberdash-base.css">
  <link rel="stylesheet" href="css/themes/spectra.css">
</head>
<body>
  <button class="btn btn--primary">Submit</button>

  <script src="js/haberdash.js"></script>
  <script src="js/spectra-theme.js" data-node-id="BASE"></script>
  <script src="js/spectra-bridge.js"></script>
</body>
</html>
```

**Result:** Minimal styling. No animations, shadows, or rounded corners. Browser-default aesthetic.

---

### Live Spectra Theme (Production)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="css/haberdash-base.css">
  <link rel="stylesheet" href="css/themes/spectra.css">
</head>
<body>
  <button class="btn btn--primary">Submit</button>

  <script src="js/haberdash.js"></script>
  <script src="js/spectra-theme.js"
          data-node-id="haberdash-ui-theme"
          data-api="https://zf8klzvd4k.execute-api.us-east-2.amazonaws.com/prod/blend">
  </script>
  <script src="js/spectra-bridge.js"></script>
</body>
</html>
```

**Result:** Beautiful, themed, dynamic. Full Spectra-driven aesthetics.

---

## Component Contract

### Base Layer Responsibilities
✅ Semantic HTML structure
✅ Accessibility (ARIA, keyboard nav)
✅ Layout and spacing relationships
✅ State management (`.is-active`, `.is-loading`)
✅ Works without JavaScript
❌ NO colors (except browser defaults)
❌ NO shadows
❌ NO border-radius
❌ NO transitions

### Theme Layer Responsibilities
✅ All visual styling (colors, shadows, gradients)
✅ CSS variables from Spectra
✅ Typography scales
✅ Border styling and radius
✅ Transitions and animations
❌ NO structural changes
❌ NO breaking base functionality

### JavaScript Responsibilities
✅ Behavior enhancement (drag-drop, modals)
✅ Auto-initialization via `[data-component]`
✅ State class toggling
✅ Spectra theme injection
❌ NO inline styles
❌ NO required for basic functionality

---

## Spectra Integration

Spectra is a **color-space encoding system** for design tokens.

### BASE Theme

The BASE theme is a built-in preset in `spectra-theme.js`:
- When `data-node-id="BASE"`, no API call is made
- Minimal CSS variables are set directly
- Simulates browser-default styling
- Useful for development and debugging

### Live Spectra Themes

For any other node ID, the full Spectra system activates:

- **F1 (Origin):** Chromatic base → Primary colors
- **F2 (Contrast):** Edge definition → Borders, shadows
- **F3 (Density):** Spatial field → Spacing, radius
- **F4 (Hierarchy):** Visual impact → Typography scale

### How It Works

1. `spectra-theme.js` fetches color data from API (or uses BASE preset)
2. Extracts HSL values for F1-F4 dimensions
3. Calculates design tokens via color-space math
4. `spectra-bridge.js` maps to CSS variables
5. `themes/spectra.css` uses those variables
6. Components update in real-time

### All Pages Use Spectra

Every page in Haberdash uses the Spectra system. There is no "CSS-only" mode.

---

## Class Naming Convention

**BEM (Block Element Modifier):**

```css
.block              /* .card, .btn, .slider */
.block__element     /* .card__header, .btn__icon */
.block--modifier    /* .card--featured, .btn--primary */
```

**State classes:**
```css
.is-active
.is-loading
.is-disabled
.has-error
.has-value
```

---

## Development Commands

```bash
# Start development server
npm run dev

# Visit demo index (themable)
http://localhost:8000/demo-index.html

# View BASE theme (Craigslist mode)
http://localhost:8000/craigslist.html

# View live Spectra theme
http://localhost:8000/spectra-live.html
```

---

## Benefits

### 1. Unified Architecture
Everything uses Spectra - one system, consistent API.

### 2. Separation of Concerns
HTML, CSS, and JS each have clear boundaries.

### 3. Progressive Enhancement
Components work without JavaScript enhancement.

### 4. Infinite Themes
Create unlimited themes via Spectra nodes or use BASE preset.

### 5. Development Speed
BASE theme = instant iteration without visual distraction.

### 6. Accessibility First
Semantic HTML ensures accessibility by default.

### 7. Dynamic Theming
Real-time theme updates via color-space calculations.

### 8. No Lock-In
BASE theme provides escape hatch from API dependency.

---

## Next Steps

See `REFACTORING.md` for implementation plan.

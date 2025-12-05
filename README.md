# Haberdash

A modular CSS component library with clean separation of concerns. Pure HTML and CSS. Zero JavaScript. Built for composability.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## Philosophy

**Minimal surface area. Maximum control.**

- **Single source of truth** → Design tokens in `lib/tokens.css`
- **Zero duplication** → Components reference tokens, not hardcoded values
- **Clean ontology** → Reset, tokens, utilities, components
- **Auto-discovery** → Add a component folder, it just works
- **Pure CSS** → No JavaScript required
- **Themable** → Change one variable, update entire system

## Quick Start

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/haberdash.git
cd haberdash

# Start development server
./hooks.sh serve
```

Visit **http://localhost:8080/** to see all components.

### Use in Your Project

```html
<link rel="stylesheet" href="haberdash.css">

<button class="btn btn--primary">Click me</button>
<div class="alert alert--success">Success!</div>
```

## Architecture

The tightest possible control surface:

```
lib/
├── tokens.css     ← CONTROL EVERYTHING FROM HERE
├── reset.css      ← Browser normalization
└── utilities.css  ← Token access layer

components/        ← Add folders here, auto-discovered
├── alert/
│   ├── alert.css
│   ├── alert.html
│   └── alert.meta.json
├── button/
├── form/
└── ...

build.py          ← Bundles everything
haberdash.css     ← Single output file
```

### The Pipe

```
lib/tokens.css (define variables)
      ↓
lib/utilities.css (expose as classes)
      ↓
components/*.css (consume tokens)
      ↓
build.py (bundle)
      ↓
haberdash.css (ONE FILE)
```

**Change `--primary` once → Buttons, text, borders, everything updates.**

## Components

13 production-ready components:

| Component | Description | Category |
|-----------|-------------|----------|
| **Alert** | Contextual feedback messages | Feedback |
| **Badge** | Status indicators and labels | Display |
| **Button** | Buttons with variants and sizes | Actions |
| **Card** | Content containers with actions | Display |
| **Form** | Inputs, selects, checkboxes, radios | Forms |
| **List Card** | Lists with titles and status | Display |
| **Progress** | Progress bars and spinners | Feedback |
| **Result Card** | Metrics and analysis display | Display |
| **Slider** | Range inputs | Forms |
| **Toast** | Notification messages | Feedback |
| **Toggle** | On/off switches | Forms |
| **Typography** | Heading hierarchy and text styles | Typography |
| **Upload** | File upload with drag-drop | Forms |

View live examples at **http://localhost:8080/preview/**

## Adding Components

Components auto-discover. Just add a folder:

```bash
mkdir components/mycomponent
```

Create three files:

**`mycomponent.css`**
```css
.mycomponent {
  background: var(--surface);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
}
```

**`mycomponent.html`**
```html
<div class="mycomponent">
  <h3>My Component</h3>
  <p>Content here</p>
</div>
```

**`mycomponent.meta.json`**
```json
{
  "name": "My Component",
  "description": "What it does",
  "category": "Display"
}
```

Build:

```bash
python3 build.py
```

**Done.** Component is now:
- ✅ Bundled into `haberdash.css`
- ✅ Live at `preview/mycomponent.html`
- ✅ Shown in system showcase
- ✅ Listed in main index

## Design Tokens

All components use tokens from `lib/tokens.css`. This is your **single control point**.

### Colors
```css
--primary, --secondary, --success, --warning, --error, --info
--background, --surface, --text, --text-heading, --text-secondary
--border, --border-light
```

### Spacing
```css
--space-2xs, --space-xs, --space-sm, --space-md, --space-lg,
--space-xl, --space-2xl, --space-3xl
```

### Typography
```css
--font-size-sm, --font-size-base, --font-size-lg, --font-size-xl,
--font-size-2xl, --font-size-3xl
--font-weight-normal, --font-weight-medium, --font-weight-bold
```

### Radius & Shadows
```css
--radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full
--shadow-sm, --shadow-md, --shadow-lg
```

### Theming

Change tokens to theme the entire system:

```css
:root {
  --primary: hsl(280, 100%, 70%);
  --background: hsl(0, 0%, 10%);
  --text: hsl(0, 0%, 95%);
}
```

Everything updates automatically. No overrides needed.

## Utility Classes

Direct access to all tokens via classes:

```html
<!-- Colors -->
<div class="text-primary bg-surface">Colored text on surface</div>

<!-- Spacing -->
<div class="p-lg mb-md gap-sm">Padded with margin and gap</div>

<!-- Typography -->
<h1 class="font-2xl font-bold">Big bold heading</h1>

<!-- Layout -->
<div class="flex gap-md items-center">Flexbox layout</div>

<!-- Borders & Shadows -->
<div class="border radius-lg shadow-md">Styled card</div>
```

See `lib/utilities.css` for complete list.

## Build System

### Commands

```bash
# Development server (auto-builds)
./hooks.sh serve

# Manual build
python3 build.py

# Deploy to GitHub Pages
./hooks.sh deploy
```

### What Gets Built

```
haberdash.css       ← All CSS bundled (lib + components)
index.html          ← Simple component list
preview/
  ├── index.html    ← System showcase (3-column layout)
  ├── alert.html    ← Individual component previews
  ├── button.html
  └── ...
```

## Usage Examples

### Basic Button

```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--success">Success</button>
```

### Alert Messages

```html
<div class="alert alert--success">
  <p class="alert__title">Success!</p>
  <p class="alert__message">Your changes have been saved.</p>
</div>
```

### Form Elements

```html
<div class="form-group">
  <label class="form__label">Email</label>
  <input type="email" class="form__input" placeholder="you@example.com">
</div>
```

### Cards

```html
<article class="card">
  <header class="card__header">
    <h3 class="card__title">Title</h3>
  </header>
  <div class="card__body">
    <p class="card__description">Description here</p>
  </div>
  <footer class="card__actions">
    <button class="btn btn--primary">Action</button>
  </footer>
</article>
```

## Development

### File Structure

Components follow BEM naming:

```css
.component { }              /* Block */
.component__element { }     /* Element */
.component--modifier { }    /* Modifier */
```

All values use tokens:

```css
/* ❌ Don't */
.component {
  padding: 16px;
  color: #3b82f6;
}

/* ✅ Do */
.component {
  padding: var(--space-lg);
  color: var(--primary);
}
```

### Preview System

Each component gets:
- **Individual preview** - `preview/component.html`
- **Metadata display** - Name, description, category
- **Edit links** - Click to copy file paths
- **Back to system** - Link to main showcase

Click component names in the system showcase to view isolated.

## Deployment

### GitHub Pages

```bash
./hooks.sh deploy
```

This builds and commits to your repo. Enable GitHub Pages in repo settings, then your site is live at:

**https://yourusername.github.io/haberdash/**

### CDN

Use the bundled CSS directly:

```html
<link rel="stylesheet" href="https://yourusername.github.io/haberdash/haberdash.css">
```

### NPM (Coming Soon)

```bash
npm install haberdash
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Uses modern CSS (custom properties, flexbox, grid). No IE11 support.

## Contributing

1. Fork the repo
2. Create a component in `components/`
3. Follow existing patterns (BEM, tokens)
4. Test with `./hooks.sh serve`
5. Submit PR

## License

Apache 2.0 - See [LICENSE](LICENSE)

Free for commercial use, modification, distribution.

## Credits

Built by [@nickcottrell](https://github.com/nickcottrell) for clean, modular design systems.

---

**Haberdash** - Because your UI deserves a proper hat. 🎩

# **Haberdash**  
*A modular, deterministic design system built on pure CSS — one set of tokens, many surfaces.*

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

---

# **Overview**

Haberdash is a design system implemented in pure CSS with a single aim:

> **Provide precise, predictable control of the UI surface from one source of truth.**

Every part of the system follows one principle:

- **Tokens define meaning**  
- **Utilities express intent**  
- **Components define structure**  
- **Themes apply context**

No JavaScript, no overrides, no cascade fights — just a clean, stable system.

---

# **Design Principles**

### **1. Determinism**  
All components resolve to predictable output. No hidden styling or side effects.

### **2. Semantic Tokens**  
Tokens represent intent (e.g., primary action, surface layer, rhythm spacing), not raw values.

### **3. Single Source of Truth**  
All color, spacing, type, and radius values originate from `lib/tokens.css`.

### **4. Modularity**  
Each component lives in its own folder with `.css`, `.html`, and `.meta.json`. New components register automatically.

### **5. Context-Agnostic**  
Pure CSS ensures the system works anywhere CSS does — including embedded or constrained environments.

### **6. Predictable Theming**  
Themes are token maps. Update meaning → the entire system adapts without overrides.

---

# **Why This System Exists**

UI systems tend to decay over time due to:

- hardcoded values  
- inconsistent spacing and type  
- dependency chains  
- competing overrides  
- unpredictable theming behavior

Haberdash avoids this by:

- enforcing a token → utility → component pipeline  
- prohibiting hardcoded values  
- maintaining structural and visual consistency  
- ensuring all styling is traceable to a single source

---

# **Architecture**

```
lib/
  tokens.css       ← Source of truth
  reset.css        ← Baseline normalization
  utilities.css    ← Utility classes mapped to tokens

components/
  component-name/
    component.css
    component.html
    component.meta.json

build.py           ← Bundles everything
haberdash.css      ← Final compiled CSS
```

### **Pipeline**

```
tokens.css → utilities.css → components/*.css → build.py → haberdash.css
```

Each stage is intentionally constrained so the next stage stays stable.

---

# **Design-Control Surfaces (“The Levers”)**

## **1. Tokens — meaning layer (`lib/tokens.css`)**

Changing a token updates the entire system.

### **Color Tokens**
```css
--primary
--secondary
--success
--warning
--error
--surface
--background
--text
--text-secondary
```

### **Spacing Tokens**
```css
--space-xs
--space-sm
--space-md
--space-lg
--space-xl
```

### **Typography Tokens**
```css
--font-size-base
--font-size-xl
--font-weight-bold
```

### **Radii & Shadows**
```css
--radius-md
--radius-lg
--shadow-md
```

---

## **2. Utilities — intent layer (`lib/utilities.css`)**

Utilities expose tokens as classes:

```html
<div class="p-lg mb-md text-primary bg-surface radius-lg shadow-sm flex gap-md">
```

Utilities never define new values — they only surface what tokens already define.

---

## **3. Components — structure layer (`components/*`)**

Components reference tokens and utilities only.

```css
.alert {
  padding: var(--space-lg);
  background: var(--surface);
  border-radius: var(--radius-md);
}
```

Components stay themeable, consistent, and easy to extend.

---

## **4. Themes — context layer**

A theme is just a new token set:

```css
:root {
  --primary: hsl(280, 100%, 70%);
  --background: hsl(210, 20%, 10%);
  --text: hsl(0, 0%, 98%);
}
```

No overrides required.  
Change meaning → new surface.

---

# **Quick Start**

### **Install**
```bash
git clone https://github.com/yourusername/haberdash.git
cd haberdash
./hooks.sh serve
```

Preview at: **http://localhost:8080/**

### **Use**
```html
<link rel="stylesheet" href="haberdash.css">
<button class="btn btn--primary">Click me</button>
```

---

# **Adding Components**

```bash
mkdir components/mycomponent
```

Inside:

**CSS** (`mycomponent.css`)
```css
.mycomponent {
  background: var(--surface);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
}
```

**HTML** (`mycomponent.html`)
```html
<div class="mycomponent">
  <h3>My Component</h3>
  <p>Content goes here.</p>
</div>
```

**Metadata** (`mycomponent.meta.json`)
```json
{
  "name": "My Component",
  "description": "Description here",
  "category": "Display"
}
```

Build:
```bash
python3 build.py
```

---

# **Build System**

### **Commands**
```bash
./hooks.sh serve     # dev server
python3 build.py     # build bundle
./hooks.sh deploy    # GitHub Pages deploy
```

### **Output**
```
haberdash.css        ← bundled system
preview/index.html   ← showcase
preview/*.html       ← component previews
```

---

# **Browser Support**
- Chrome / Edge (latest)  
- Firefox (latest)  
- Safari (latest)  

Uses modern CSS features (custom properties, flexbox, grid).

---

# **Contributing**

1. Add a folder to `components/`  
2. Include `.css`, `.html`, `.meta.json`  
3. Use tokens exclusively  
4. Test locally  
5. Open a PR  

---

# **License**

Apache 2.0  
See [LICENSE](LICENSE)

---

# **Haberdash**  
*One set of tokens, many expressions.*

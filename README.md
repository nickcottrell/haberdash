# Haberdash

A modular, composable UI component library with clean separation of concerns. Built with pure HTML and CSS, designed to work anywhere.

## Philosophy

- **Modular**: Each component lives in its own directory with isolated CSS
- **Composable**: Components can be mixed and matched freely
- **Portable**: Works on GitHub Pages, CDN, or any static host
- **Clean**: Strict separation between structure (HTML), style (CSS), and metadata (JSON)

## Architecture

```
haberdash/
├── lib/                    # Global CSS (shared across all components)
│   ├── tokens.css         # Design tokens (colors, spacing, etc.)
│   ├── base.css           # Reset and base styles
│   └── utilities.css      # Utility classes
├── components/            # Individual components
│   ├── button/
│   │   ├── button.css     # Component-specific styles
│   │   ├── button.html    # Component HTML template
│   │   └── button.meta.json  # Metadata
│   ├── form/
│   ├── alert/
│   └── ...
├── build.py               # Build script
└── dist/                  # Generated output (gitignored)
    ├── haberdash.css      # Bundled CSS
    └── index.html         # Generated showcase page
```

## Quick Start

### Development

Start local server with auto-build:

```bash
bash hooks.sh serve
```

Then open [http://localhost:8080](http://localhost:8080)

### Adding a New Component

1. Create a new directory in `components/`:

```bash
mkdir components/mycomponent
```

2. Create the component files:

```bash
# Component CSS
touch components/mycomponent/mycomponent.css

# Component HTML template
touch components/mycomponent/mycomponent.html

# Component metadata (optional)
touch components/mycomponent/mycomponent.meta.json
```

3. Build:

```bash
python3 build.py
```

The component will automatically be included in the bundled CSS and showcase page!

### Component Structure

**mycomponent.css** - Component-specific styles
```css
.mycomponent {
  /* Use design tokens for themability */
  background: var(--surface, #f5f5f5);
  padding: var(--space-lg, 1rem);
  border-radius: var(--radius-md, 8px);
}
```

**mycomponent.html** - Component markup
```html
<div class="mycomponent">
  <h3>My Component</h3>
  <p>Component content here</p>
</div>
```

**mycomponent.meta.json** - Component metadata
```json
{
  "name": "My Component",
  "description": "A simple example component",
  "category": "Layout"
}
```

## Build System

The build system (`build.py`) does three things:

1. **Bundles CSS**: Combines `lib/*` (globals) + `components/*/*.css` into one file
2. **Generates HTML**: Creates showcase pages from component templates
3. **Outputs to dist/**: Everything goes into `dist/` ready for deployment

### Build Command

```bash
python3 build.py
```

Output:
- `dist/haberdash.css` - Complete bundled stylesheet
- `dist/index.html` - Generated showcase page

## Deployment

### GitHub Pages

The `deploy` command builds and copies files to root for GitHub Pages:

```bash
bash hooks.sh deploy
```

This will:
1. Run the build
2. Copy `dist/haberdash.css` and `dist/index.html` to root
3. Commit and push to GitHub

Your site will be live at: `https://yourusername.github.io/haberdash/`

### CDN Usage

Use the bundled CSS directly:

```html
<link rel="stylesheet" href="https://yourusername.github.io/haberdash/haberdash.css">
```

## Design Tokens

All components use CSS custom properties (design tokens) defined in `lib/tokens.css`:

- **Colors**: `--primary`, `--secondary`, `--success`, `--warning`, `--error`
- **Spacing**: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
- **Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### Theming

Override tokens to create custom themes:

```css
:root {
  --primary: #ff6b6b;
  --secondary: #4ecdc4;
  --background: #1a1a2e;
  --text: #ffffff;
}
```

## Available Components

- **Button** - Versatile buttons with variants and sizes
- **Form** - Input fields, selects, textareas, checkboxes, radios
- **Alert** - Contextual feedback messages
- *(More components coming soon)*

## Development Workflow

1. Edit components in `components/`
2. Run `bash hooks.sh serve` to see changes
3. Build updates automatically on serve
4. Deploy with `bash hooks.sh deploy`

## License

MIT

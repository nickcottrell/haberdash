# Haberdash

A modular UI component library for building beautiful dashboards and panel-based interfaces with HTML, CSS, and JavaScript. Features a unique **Spectra** theme system that uses color encoding to control design parameters across all your applications.

**[View Component Library Demo](https://nickcottrell.github.io/haberdash/)** - Browse all UI components
**[Portfolio Showcase Demo](https://nickcottrell.github.io/haberdash/portfolio-showcase.html)** - 16:9 scaled component showcase
**[Login to Spectra Theme Editor](https://d1dys716o168zx.cloudfront.net/)** - Adjust the visual theme in real-time across all demos

## Features

- 🎨 **Clean Design** - Minimalist aesthetic with smooth animations
- 📱 **Mobile-First & Responsive** - Works seamlessly from 320px to 4K displays
- 🧩 **Modular Components** - Use only what you need
- 🎯 **Zero Dependencies** - Pure HTML, CSS, and vanilla JavaScript
- ♿ **Accessible** - Built with accessibility in mind
- 🎭 **Dynamic Theming** - Spectra system for real-time theme changes
- ⚡ **Lightweight** - Minimal CSS and JS footprint

## What is Spectra?

**Spectra** is a unique theme system that uses color encoding to control visual design parameters. Instead of manually setting dozens of CSS variables, you adjust just **4 color dimensions** that automatically generate:

- **Color Palette** - Primary, accent, and semantic colors
- **Border Radius & Contrast** - Sharp vs. soft edges
- **Spacing Scale** - Compact vs. spacious layouts
- **Type Hierarchy** - Subtle vs. strong typography scale

### How It Works

1. Four abstract color dimensions (D1-D4) serve as input parameters
2. Each dimension encodes multiple design decisions through color relationships
3. The system uses **vector mathematics** in color space to generate CSS variables
4. All applications using Haberdash respond to theme changes in real-time

### Live Demo

**[Login to Spectra](https://d1dys716o168zx.cloudfront.net/)** - Adjust the 4 color sliders to see instant theme changes across all demo applications.

**Example Applications:**
- Magic Fridge - Recipe filtering with preference encoding
- Property Finder - Real estate investment analysis
- Blood Scanner - Health data visualization

All three applications share the same visual theme controlled through Spectra.

### Integrating Spectra Theme System

Add these scripts to any HTML page to enable dynamic theming:

```html
<!-- Spectra Theme System -->
<script src="https://nickcottrell.github.io/haberdash/js/spectra-theme.js?v=3"
        data-node-id="haberdash-ui-theme"
        data-api="https://zf8klzvd4k.execute-api.us-east-2.amazonaws.com/prod/blend">
</script>
<script src="https://nickcottrell.github.io/haberdash/js/spectra-bridge.js?v=3"></script>

<link rel="stylesheet" href="https://nickcottrell.github.io/haberdash/css/haberdash.css?v=5">
```

When a user adjusts the theme in the Spectra Editor, all pages using these scripts will automatically update to reflect the new theme.

### How Spectra Uses Color

The system interprets color values as **semantic encodings**, not just visual styling. Four fundamental parameters (F1-F4) define the complete design system:

- **F1 Origin** - Chromatic base: source of hue from which all palette relationships derive
- **F2 Contrast** - Edge definition: saturation and luminance variance controlling surface sharpness and border clarity
- **F3 Density** - Spatial field: hue and saturation dispersion determining object packing and spacing
- **F4 Hierarchy** - Scale weight: lightness variance defining size progression and visual hierarchy strength

This approach allows **4 fundamental signals to control dozens of design parameters** through mathematical relationships rather than manual configuration.

## Quick Start

### Installation

1. Clone or download this repository
2. Include the CSS and JS files in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="path/to/haberdash/css/haberdash.css">
</head>
<body>
    <!-- Your content here -->

    <script src="path/to/haberdash/js/haberdash.js"></script>
</body>
</html>
```

### Using Individual Modules

If you don't need all components, import only what you need:

```html
<link rel="stylesheet" href="path/to/haberdash/css/theme.css">
<link rel="stylesheet" href="path/to/haberdash/css/buttons.css">
<link rel="stylesheet" href="path/to/haberdash/css/forms.css">
```

## Components

### Buttons

Three button styles with multiple variants:

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-tertiary">Tertiary</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- States -->
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
```

### Form Elements

Complete form component set:

```html
<!-- Text Input -->
<div class="form-group">
    <label class="form-label">Label</label>
    <input type="text" class="input" placeholder="Enter text">
    <span class="form-hint">Helpful hint</span>
</div>

<!-- Textarea -->
<textarea class="textarea" placeholder="Message"></textarea>

<!-- Select Dropdown -->
<select class="select">
    <option>Choose option</option>
</select>

<!-- Checkbox -->
<label class="checkbox">
    <input type="checkbox">
    <span>Checkbox label</span>
</label>

<!-- Radio -->
<label class="radio">
    <input type="radio" name="group">
    <span>Radio label</span>
</label>

<!-- Toggle Switch -->
<label class="toggle">
    <input type="checkbox">
    <span>Toggle label</span>
</label>
```

### Cards

Four card types for different use cases:

```html
<!-- Dashboard Card -->
<div class="dashboard-card">
    <div class="card-icon">📊</div>
    <h3>Title</h3>
    <p>Description</p>
    <button class="btn btn-primary">Action</button>
</div>

<!-- Dimension Card (for settings) -->
<div class="dimension-card">
    <div class="dimension-header">
        <div class="dimension-info">
            <h2 class="dimension-title">Title</h2>
            <p class="dimension-description">Description</p>
        </div>
        <div class="dimension-icon">⚙️</div>
    </div>
    <!-- Content -->
</div>

<!-- Result Card -->
<div class="result-card">
    <h2>Results</h2>
    <div class="detail-grid">
        <div class="detail-item">
            <div class="detail-label">Label</div>
            <div class="detail-value">Value</div>
        </div>
    </div>
</div>

<!-- List Card -->
<div class="list-card">
    <div class="list-card-header">
        <div class="list-card-title">Title</div>
        <span class="badge badge-success">Status</span>
    </div>
    <div class="list-card-content">Content</div>
</div>
```

### Sliders

Gradient sliders with preset buttons:

```html
<div class="slider-container">
    <div class="slider-label">
        <span>Min</span>
        <span>Mid</span>
        <span>Max</span>
    </div>
    <div class="slider-track">
        <div class="slider-gradient gradient-primary"></div>
        <div class="slider-wrapper">
            <input type="range" id="my-slider" min="0" max="100" value="50">
        </div>
    </div>
    <div class="value-display" id="my-slider-display">50</div>
</div>

<!-- Available gradients -->
<!-- gradient-primary, gradient-spectrum, gradient-cool, -->
<!-- gradient-warm, gradient-risk, gradient-investment -->
```

### Utilities

```html
<!-- Badges -->
<span class="badge badge-primary">Badge</span>
<span class="status-badge status-completed">Status</span>
<span class="rank-badge rank-1">1</span>

<!-- Loading Spinner -->
<div class="spinner"></div>

<!-- Progress Bar -->
<div class="progress">
    <div class="progress-bar" style="width: 65%"></div>
</div>

<!-- Alerts -->
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-error">Error message</div>
<div class="alert alert-info">Info message</div>
```

## JavaScript API

### Toast Notifications

```javascript
// Show toast notifications
Haberdash.toast.success('Success message');
Haberdash.toast.error('Error message');
Haberdash.toast.warning('Warning message');
Haberdash.toast.info('Info message');

// Custom duration (default: 3000ms)
Haberdash.toast.success('Message', 5000);
```

### Slider Controls

```javascript
// Initialize slider with value display mapping
Haberdash.slider.init('slider-id', (value) => {
    if (value < 50) return 'Low';
    if (value < 75) return 'Medium';
    return 'High';
});

// Set preset values
Haberdash.slider.setPreset({
    'slider-1': 25,
    'slider-2': 75
});
```

### Form Validation

```javascript
// Set error state
const input = document.querySelector('#email');
Haberdash.form.setError(input, 'Invalid email address');

// Clear error
Haberdash.form.clearError(input);

// Validate entire form
const isValid = Haberdash.form.validate('#my-form');
```

### Loading States

```javascript
// Show/hide loading
Haberdash.loading.show('#loading');
Haberdash.loading.hide('#loading');

// Toggle between loading and content
Haberdash.loading.toggle(true, '#loading', '#content');
```

### Utilities

```javascript
// Debounce function
const handleSearch = Haberdash.utils.debounce((query) => {
    // Search logic
}, 300);

// Format dates
Haberdash.utils.formatDate(new Date()); // "November 16, 2025"
Haberdash.utils.formatTime(new Date()); // "08:30 PM"

// Copy to clipboard
Haberdash.utils.copyToClipboard('Text to copy');
```

## Layout System

### Container

```html
<div class="container">Content</div>
<div class="container container-sm">Smaller container</div>
<div class="container container-lg">Larger container</div>
```

### Grid System

```html
<!-- Auto-responsive grid -->
<div class="grid-auto">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>

<!-- Fixed columns -->
<div class="grid-2">...</div>  <!-- 2 columns -->
<div class="grid-3">...</div>  <!-- 3 columns -->
<div class="grid-4">...</div>  <!-- 4 columns -->
```

### Flexbox Utilities

```html
<div class="flex justify-between items-center">
    <div>Left</div>
    <div>Right</div>
</div>
```

## CSS Variables

### Static Customization

Customize the theme by overriding CSS variables:

```css
:root {
    --primary: #5b6ef5;
    --background: #0b0d12;
    --text: #f5f5f7;
    --radius-md: 8px;
    /* See theme.css for all available variables */
}
```

### Dynamic Theming with Spectra

When using the Spectra system, these CSS variables are **automatically generated** from the 4 color dimensions. The system calculates:

- Color palette (primary, accent, background, surface)
- Spacing scale (--space-xs through --space-2xl)
- Border radius (--radius-sm through --radius-xl)
- Typography scale (--text-xs through --text-2xl)
- Shadows, borders, and semantic colors

All values update in real-time when theme settings change in the Spectra Editor.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use in your projects!

## Contributing

This is a personal project, but suggestions and feedback are welcome.

## Architecture Philosophy

Haberdash + Spectra demonstrates a novel approach to theme management:

**Traditional Approach:**
- Manually set 50+ CSS variables
- Changes require updating multiple values
- Inconsistencies creep in over time
- Hard to maintain design system coherence

**Spectra Approach:**
- Define 4 color dimensions as input
- Mathematical relationships generate all CSS variables
- Single source of truth for design decisions
- Color space encodes semantic meaning, not just appearance

The system uses **low-dimensional scaffolding** - a minimal set of abstract parameters that expand into a full design system through mathematical transformation. This is similar to how neural networks compress high-dimensional data into latent representations.

### Key Insight

**Color is used as an encoding mechanism**, not just for visual styling. The hue, saturation, and lightness relationships between the 4 dimensions encode design decisions (spacing, borders, typography) that get decoded into CSS variables. This allows:

- Consistent design systems that maintain mathematical relationships
- Theme changes that preserve design coherence
- Single-point control over complex multi-parameter systems
- A/B testing design variations with 4 parameters instead of 50+

## Credits

Built by analyzing and consolidating UI patterns from multiple demo applications to create a unified, reusable component system. The Spectra theme system extends this with a novel approach to design parameter encoding using color space mathematics.

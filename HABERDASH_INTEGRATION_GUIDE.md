# Haberdash UI Integration Guide

## Overview

Haberdash is a semantic-first UI component library with a layered CSS architecture that separates structure from style. It uses the Spectra color-space theme system for dynamic theming.

## Quick Start

### 1. Include CSS Files

Add these two CSS files to your HTML `<head>`:

```html
<!-- Base layer: structural CSS only -->
<link rel="stylesheet" href="path/to/haberdash/css/haberdash-base.css">

<!-- Theme layer: visual styling via CSS variables -->
<link rel="stylesheet" href="path/to/haberdash/css/themes/spectra.css">
```

### 2. Add Spectra Theme Integration (Optional)

For dynamic Spectra-based theming:

```html
<!-- Add data-theme attribute to html tag -->
<html lang="en" data-theme="live">

<!-- Include Spectra scripts at end of body -->
<script src="path/to/haberdash/js/spectra-theme.js" data-node-id="your-node-id"></script>
<script src="path/to/haberdash/js/spectra-bridge.js"></script>
```

**Node ID Options:**
- `"BASE"` - Unstyled Craigslist mode (browser defaults)
- `"haberdash-ui-theme"` - Default Haberdash theme
- Any custom Spectra node ID from your color system

### 3. Use Semantic HTML with BEM Classes

Haberdash uses semantic HTML with BEM (Block Element Modifier) naming:

```html
<!-- Button -->
<button class="btn btn--primary">Click Me</button>

<!-- Form Input -->
<div class="form-group">
  <label class="form__label">Email</label>
  <input type="email" class="form__input" placeholder="email@example.com">
</div>

<!-- Alert -->
<div class="alert alert--success">
  <p class="alert__title">Success!</p>
  <p class="alert__message">Your changes have been saved.</p>
</div>
```

## Architecture

### Two-Tier CSS System

1. **Base Layer** (`haberdash-base.css`)
   - Structural CSS only: layout, spacing, relationships
   - No colors, shadows, or rounded corners
   - Works standalone as "Craigslist mode"

2. **Theme Layer** (`themes/spectra.css`)
   - Visual styling via CSS variables
   - Colors, shadows, typography scales, border radii
   - Applied when `data-theme="live"` is set

### Typography System

Headers use REM-based sizing with configurable CSS variables:

```css
/* Default scale */
--font-size-h1: 2.5rem;
--font-size-h2: 2rem;
--font-size-h3: 1.75rem;
--font-size-h4: 1.5rem;
--font-size-h5: 1.25rem;
--font-size-h6: 1rem;

/* Progressive weights */
--font-weight-h1: 800;
--font-weight-h2: 700;
--font-weight-h3: 700;
--font-weight-h4: 600;
--font-weight-h5: 600;
--font-weight-h6: 600;
```

Use semantic HTML tags - they automatically use the typography scale:

```html
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
```

## Available Components

### Buttons

```html
<!-- Variants -->
<button class="btn">Default</button>
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--error">Error</button>

<!-- Sizes -->
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary">Default</button>
<button class="btn btn--primary btn--lg">Large</button>
```

### Form Elements

```html
<!-- Text Input -->
<div class="form-group">
  <label class="form__label">Name</label>
  <input type="text" class="form__input" placeholder="Enter your name">
</div>

<!-- Select -->
<div class="form-group">
  <label class="form__label">Choose Option</label>
  <select class="form__select">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<!-- Textarea -->
<div class="form-group">
  <label class="form__label">Message</label>
  <textarea class="form__textarea" rows="4"></textarea>
</div>

<!-- Checkbox -->
<label class="form__choice">
  <input type="checkbox">
  <span>I agree to terms</span>
</label>

<!-- Radio -->
<label class="form__choice">
  <input type="radio" name="choice">
  <span>Option A</span>
</label>
```

### Toggle Switch

```html
<label class="toggle">
  <input type="checkbox" class="toggle__input" checked>
  <span class="toggle__track">
    <span class="toggle__thumb"></span>
  </span>
  <span class="toggle__label">Enable feature</span>
</label>
```

### Badges

```html
<!-- Semantic badges -->
<span class="badge badge--primary">Primary</span>
<span class="badge badge--success">Success</span>
<span class="badge badge--warning">Warning</span>
<span class="badge badge--error">Error</span>

<!-- Rank badges -->
<span class="badge badge--rank">1</span>
<span class="badge badge--rank">2</span>
```

### Alerts

```html
<div class="alert alert--success">
  <p class="alert__title">Success!</p>
  <p class="alert__message">Your changes have been saved.</p>
</div>

<div class="alert alert--warning">
  <p class="alert__title">Warning</p>
  <p class="alert__message">Please review your settings.</p>
</div>

<div class="alert alert--error">
  <p class="alert__title">Error</p>
  <p class="alert__message">Something went wrong.</p>
</div>

<div class="alert alert--info">
  <p class="alert__title">Info</p>
  <p class="alert__message">New features available!</p>
</div>
```

### Progress Bars

```html
<div class="progress">
  <div class="progress__bar" style="width: 65%;"></div>
</div>

<div class="progress progress--success">
  <div class="progress__bar" style="width: 100%;"></div>
</div>

<div class="progress progress--warning">
  <div class="progress__bar" style="width: 45%;"></div>
</div>
```

### Spinners

```html
<div class="spinner spinner--sm"></div>
<div class="spinner"></div>
<div class="spinner spinner--lg"></div>
```

### Sliders

```html
<div class="slider">
  <label class="slider__label">Volume Control</label>
  <div class="slider__track">
    <input type="range" id="volume" class="slider__input" min="0" max="100" value="50">
  </div>
  <div class="slider__labels">
    <span>Low</span>
    <span>High</span>
  </div>
  <output for="volume" class="slider__output">50</output>
</div>
```

### File Upload (with drag-and-drop)

```html
<div class="upload" id="file-upload">
  <input type="file" id="file-input" class="upload__input" multiple>
  <label for="file-input" class="upload__label">
    <span class="upload__icon">📁</span>
    <span class="upload__text">Drop your file here</span>
    <span class="upload__hint">or click to browse</span>
    <button type="button" class="btn btn--primary upload__button">Choose File</button>
  </label>
  <div class="upload__file-list" id="file-list"></div>
</div>
```

**Required JavaScript for file upload:**

```javascript
const uploadArea = document.getElementById('file-upload');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const uploadButton = uploadArea.querySelector('.upload__button');
let selectedFiles = [];

// Make button trigger file input
uploadButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  fileInput.click();
});

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  uploadArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Highlight drop area when dragging over it
['dragenter', 'dragover'].forEach(eventName => {
  uploadArea.addEventListener(eventName, () => {
    uploadArea.classList.add('upload--dragover');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  uploadArea.addEventListener(eventName, () => {
    uploadArea.classList.remove('upload--dragover');
  }, false);
});

// Handle dropped files
uploadArea.addEventListener('drop', (e) => {
  const files = e.dataTransfer.files;
  handleFiles(files);
}, false);

// Handle selected files
fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  selectedFiles = Array.from(files);
  displayFiles();
}

function displayFiles() {
  fileList.innerHTML = '';
  selectedFiles.forEach((file, index) => {
    const fileItem = document.createElement('div');
    fileItem.className = 'upload__file';
    fileItem.innerHTML = `
      <span class="upload__file-name">${file.name}</span>
      <span class="upload__file-size">${formatBytes(file.size)}</span>
      <button class="upload__file-remove" onclick="removeFile(${index})">&times;</button>
    `;
    fileList.appendChild(fileItem);
  });
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  displayFiles();
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
```

### Result Card

```html
<div class="result-card">
  <div class="result-card__header">
    <h3 class="result-card__title">Analysis Results</h3>
    <p class="result-card__subtitle">Processing completed on Nov 25, 2025</p>
  </div>
  <div class="result-card__metrics">
    <div class="result-card__metric">
      <span class="result-card__metric-label">Total Items</span>
      <span class="result-card__metric-value">1,247</span>
    </div>
    <div class="result-card__metric">
      <span class="result-card__metric-label">Success Rate</span>
      <span class="result-card__metric-value">98.5%</span>
    </div>
    <div class="result-card__metric">
      <span class="result-card__metric-label">Time</span>
      <span class="result-card__metric-value">3.2s</span>
    </div>
    <div class="result-card__metric">
      <span class="result-card__metric-label">Status</span>
      <span class="result-card__metric-value">✓ Done</span>
    </div>
  </div>
  <div class="result-card__footer">
    <button class="btn btn--primary">View Details</button>
  </div>
</div>
```

### List Card

```html
<div class="list-card">
  <div class="list-card__header">
    <h4 class="list-card__title">Recent Reports</h4>
  </div>
  <ul class="list-card__list">
    <li class="list-card__item">
      <div class="list-card__item-content">
        <p class="list-card__item-title">Q4 Report</p>
        <p class="list-card__item-subtitle">2 hours ago</p>
      </div>
      <div class="list-card__item-meta">
        <span class="list-card__item-status list-card__item-status--success">Complete</span>
      </div>
    </li>
    <li class="list-card__item">
      <div class="list-card__item-content">
        <p class="list-card__item-title">User Analysis</p>
        <p class="list-card__item-subtitle">5 hours ago</p>
      </div>
      <div class="list-card__item-meta">
        <span class="list-card__item-status list-card__item-status--warning">Pending</span>
      </div>
    </li>
    <li class="list-card__item">
      <div class="list-card__item-content">
        <p class="list-card__item-title">Security Audit</p>
        <p class="list-card__item-subtitle">3 days ago</p>
      </div>
      <div class="list-card__item-meta">
        <span class="list-card__item-status list-card__item-status--error">Failed</span>
      </div>
    </li>
  </ul>
</div>
```

Status modifier classes: `--success`, `--warning`, `--error`, `--info`

## Utility Classes

### Spacing

```html
<!-- Margins -->
<div class="mt-sm">margin-top: 0.5em</div>
<div class="mt-md">margin-top: 1em</div>
<div class="mt-lg">margin-top: 1.5em</div>
<div class="mt-xl">margin-top: 2em</div>

<div class="mb-sm">margin-bottom: 0.5em</div>
<div class="mb-md">margin-bottom: 1em</div>
<div class="mb-lg">margin-bottom: 1.5em</div>

<div class="ml-sm">margin-left: 0.5em</div>

<!-- Sizing -->
<div class="w-full">width: 100%</div>
```

### Layout

```html
<!-- Flexbox -->
<div class="flex">display: flex</div>
<div class="flex gap-sm">flex with small gap</div>
<div class="flex gap-md">flex with medium gap</div>
<div class="flex gap-lg">flex with large gap</div>
<div class="flex flex--wrap">flex with wrap</div>
```

### Text

```html
<p class="text-secondary">Secondary text color</p>
<p class="text-error">Error text color</p>
<p class="text--gradient">Gradient text</p>
```

## NO Inline CSS

**IMPORTANT:** Haberdash is designed to be completely stylesheet-based. Do not use inline CSS for styling. The only acceptable inline styles are:

1. Dynamic color swatches with `background: #HEXCODE`
2. Dynamic width values for progress bars: `style="width: 65%;"`

All other styling should use CSS classes from the Haberdash system.

## Integration Example

Here's a complete example for Magic Fridge Spectra:

```html
<!DOCTYPE html>
<html lang="en" data-theme="live">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magic Fridge Spectra</title>

  <!-- Haberdash CSS -->
  <link rel="stylesheet" href="../haberdash/css/haberdash-base.css">
  <link rel="stylesheet" href="../haberdash/css/themes/spectra.css">

  <style>
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 2em 1em;
    }
  </style>
</head>
<body>
  <header>
    <h1>Magic Fridge Spectra</h1>
    <p class="text-secondary">Color-space theme control</p>
  </header>

  <!-- Your content with Haberdash components -->
  <section>
    <h2>Controls</h2>

    <div class="form-group">
      <label class="form__label">Hue</label>
      <div class="slider">
        <div class="slider__track">
          <input type="range" class="slider__input" min="0" max="360" value="180">
        </div>
      </div>
    </div>

    <button class="btn btn--primary">Apply Theme</button>
  </section>

  <!-- Spectra Integration -->
  <script src="../haberdash/js/spectra-theme.js" data-node-id="magic-fridge-theme"></script>
  <script src="../haberdash/js/spectra-bridge.js"></script>
</body>
</html>
```

## File Structure

When integrating Haberdash, ensure your file paths point to:

```
haberdash/
├── css/
│   ├── haberdash-base.css (imports all base components)
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   ├── button.css
│   │   ├── form.css
│   │   ├── slider.css
│   │   ├── upload.css
│   │   ├── result-card.css
│   │   ├── list-card.css
│   │   └── ... (all other components)
│   ├── themes/
│   │   └── spectra.css
│   └── utilities/
│       ├── spacing.css
│       ├── text.css
│       └── ...
└── js/
    ├── spectra-theme.js
    └── spectra-bridge.js
```

## Progressive Enhancement

All Haberdash components work without JavaScript. JS is only required for:
- File upload drag-and-drop functionality
- Toast notifications
- Slider value display updates
- Theme switching

Forms submit, buttons click, and sliders slide even with JS disabled.

## Demo Pages

Reference these files in the Haberdash repo:
- `spectra-live.html` - Complete component showcase with Live Spectra theme
- `craigslist.html` - Same components in BASE theme (unstyled mode)
- `theme-switcher-demo.html` - Interactive theme switching
- `portfolio-showcase.html` - 16:9 scaled showcase of all components

## Key Principles

1. **Semantic HTML first** - Use native elements with proper attributes
2. **BEM naming** - `.block__element--modifier` pattern throughout
3. **No inline CSS** - Everything uses stylesheets
4. **Progressive enhancement** - Works without JavaScript
5. **Two-tier architecture** - Base structure + Theme styling
6. **REM-based typography** - Configurable via CSS variables
7. **Accessibility** - Keyboard navigation, screen reader friendly

## Questions?

Check the demo pages in the Haberdash repo for working examples of every component.

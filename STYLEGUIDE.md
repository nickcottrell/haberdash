# Haberdash Implementation Styleguide

A comprehensive guide for building applications with Haberdash. This guide covers markup patterns, component composition, layout strategies, and best practices for humans and LLMs.

---

## Philosophy

### Core Principles

1. **Separation of Concerns** - Keep structure (HTML), presentation (CSS), and behavior (JS) strictly separate
2. **Semantic Markup** - HTML should describe content meaning, not appearance
3. **Token-Driven Design** - All styling values come from design tokens, never hardcoded
4. **Composability** - Build complex UIs by combining simple, single-purpose components
5. **Zero Inline Styles** - Use utility classes instead of `style="..."` attributes
6. **BEM Naming** - Component classes follow Block Element Modifier pattern

### The LEGO Approach

Think of Haberdash as a box of LEGO bricks. Each component and utility class is a single brick. Complex UIs emerge from composing these simple pieces together, not from creating complex custom components.

**Good:** Combining existing utilities and components
```html
<div class="container container--sm">
  <div class="card mb-lg">
    <div class="card__body text-center">
      <h2 class="mb-sm">Title</h2>
      <p class="text-secondary mb-lg">Description</p>
      <button class="btn btn--primary btn--lg">Action</button>
    </div>
  </div>
</div>
```

**Bad:** Creating custom wrapper components
```html
<div class="custom-centered-card-with-button">
  ...
</div>
```

---

## BEM Naming Convention

All Haberdash components follow BEM (Block Element Modifier):

### Block
The standalone component:
```css
.card { }
.alert { }
.upload { }
```

### Element
A part of the component (uses double underscore):
```css
.card__header { }
.card__body { }
.card__actions { }

.alert__title { }
.alert__message { }

.upload__icon { }
.upload__label { }
```

### Modifier
A variant of the component or element (uses double dash):
```css
.btn--primary { }
.btn--secondary { }
.btn--lg { }

.alert--success { }
.alert--error { }
```

### Combining Modifiers
Multiple modifiers can be applied together:
```html
<button class="btn btn--primary btn--lg">Large Primary Button</button>
<div class="alert alert--success alert--dismissible">Success message</div>
```

**Never use:**
- Single dashes for elements: `.card-body` ❌
- Nested BEM: `.card__header__title` ❌
- Modifiers without base class: `<button class="btn--primary">` ❌

**Always use:**
- Double underscores for elements: `.card__body` ✅
- Double dashes for modifiers: `.btn--primary` ✅
- Base class + modifiers: `<button class="btn btn--primary">` ✅

---

## Layout Patterns

### Centered Container

The most common layout pattern - a centered, max-width container:

```html
<div class="container container--sm">
  <!-- Content stays centered and never too wide -->
</div>
```

**Container sizes:**
- `.container` - Default max-width (1200px)
- `.container--sm` - Small max-width (600px) - **Use this for most single-column layouts**
- `.container--lg` - Large max-width (1400px)

**Common pattern for full pages:**
```html
<body>
  <div class="main-content">
    <div class="container container--sm">
      <!-- Your cards, forms, content here -->
    </div>
  </div>
</body>
```

### Full-Screen Centering

For landing pages, login screens, or loading states:

```html
<div class="flex flex--column items-center justify-center h-screen p-2xl">
  <div class="text-center" style="max-width: 500px;">
    <h1 class="mb-md">Magic Fridge</h1>
    <p class="text-secondary mb-2xl">Recipe suggestions from your ingredients</p>
    <button class="btn btn--primary btn--lg w-full">Get Started</button>
  </div>
</div>
```

**Breakdown:**
- `flex flex--column` - Vertical flex container
- `items-center` - Center horizontally
- `justify-center` - Center vertically
- `h-screen` - Full viewport height
- `p-2xl` - Generous padding on all sides
- `text-center` - Center text content inside

### Flexbox Layouts

```html
<!-- Horizontal row with gap -->
<div class="flex gap-md items-center">
  <img src="avatar.jpg" class="w-12 h-12 radius-full">
  <div>
    <h4>John Doe</h4>
    <p class="text-secondary">Designer</p>
  </div>
</div>

<!-- Vertical stack -->
<div class="flex flex--column gap-lg">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<!-- Space between (header pattern) -->
<div class="flex items-center justify-between">
  <h2>Dashboard</h2>
  <button class="btn btn--primary">New Item</button>
</div>
```

### Grid Layouts

```html
<!-- Two-column grid -->
<div class="grid grid--2col gap-lg">
  <div class="card">Column 1</div>
  <div class="card">Column 2</div>
</div>

<!-- Responsive grid (auto-fill) -->
<div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))">
  <div class="card">Auto-sized card</div>
  <div class="card">Auto-sized card</div>
  <div class="card">Auto-sized card</div>
</div>
```

---

## Spacing System

### Margin and Padding Utilities

Use token-based spacing classes instead of custom values:

```html
<!-- Margin -->
<div class="mb-lg">Margin bottom large</div>
<div class="mt-md">Margin top medium</div>
<div class="mx-auto">Margin horizontal auto (centering)</div>

<!-- Padding -->
<div class="p-2xl">Padding all sides 2xl</div>
<div class="px-lg py-md">Padding horizontal lg, vertical md</div>

<!-- Gap (flexbox/grid) -->
<div class="flex gap-md">Items with medium gap</div>
```

**Scale:**
- `2xs` - 0.25rem (4px)
- `xs` - 0.5rem (8px)
- `sm` - 0.75rem (12px)
- `md` - 1rem (16px)
- `lg` - 1.5rem (24px)
- `xl` - 2rem (32px)
- `2xl` - 3rem (48px)
- `3xl` - 4rem (64px)

**Common patterns:**
```html
<!-- Card stack with spacing -->
<div class="card mb-lg">First card</div>
<div class="card mb-lg">Second card</div>
<div class="card">Last card (no margin)</div>

<!-- Section spacing -->
<section class="p-2xl mb-3xl">
  <h2 class="mb-lg">Section Title</h2>
  <p class="mb-md">Content here</p>
</section>
```

---

## Component Patterns

### Cards

Cards are the primary content container. Always use BEM structure:

```html
<!-- Basic card -->
<div class="card">
  <div class="card__body">
    <p>Simple content</p>
  </div>
</div>

<!-- Full card structure -->
<article class="card">
  <header class="card__header">
    <h3 class="card__title">Upload Fridge Photo</h3>
  </header>
  <div class="card__body">
    <p class="card__description">Upload a photo to receive AI-powered recipe suggestions</p>
  </div>
  <footer class="card__actions">
    <button class="btn btn--primary">Upload Photo</button>
    <button class="btn btn--tertiary">Cancel</button>
  </footer>
</article>

<!-- Centered card content (common pattern) -->
<div class="card">
  <div class="card__body text-center">
    <div class="font-3xl mb-md">📤</div>
    <h2 class="mb-sm">Upload Fridge Photo</h2>
    <p class="text-secondary mb-lg">Upload a photo to receive AI-powered recipe suggestions</p>
    <a href="/upload" class="btn btn--primary btn--lg">Upload Photo</a>
  </div>
</div>
```

### Buttons

```html
<!-- Variants -->
<button class="btn btn--primary">Primary Action</button>
<button class="btn btn--secondary">Secondary Action</button>
<button class="btn btn--tertiary">Tertiary Action</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--error">Delete</button>

<!-- Sizes -->
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary">Default</button>
<button class="btn btn--primary btn--lg">Large</button>

<!-- Full width -->
<button class="btn btn--primary w-full">Full Width Button</button>

<!-- Button group -->
<div class="flex gap-sm">
  <button class="btn btn--primary">Save</button>
  <button class="btn btn--tertiary">Cancel</button>
</div>
```

### Forms

```html
<!-- Form group pattern -->
<div class="form-group">
  <label class="form__label" for="email">Email</label>
  <input type="email" id="email" class="form__input" placeholder="you@example.com">
</div>

<div class="form-group">
  <label class="form__label" for="message">Message</label>
  <textarea id="message" class="form__textarea" rows="4"></textarea>
</div>

<!-- Full form example -->
<form class="container container--sm">
  <div class="form-group">
    <label class="form__label" for="name">Name</label>
    <input type="text" id="name" class="form__input" required>
  </div>

  <div class="form-group">
    <label class="form__label" for="email">Email</label>
    <input type="email" id="email" class="form__input" required>
  </div>

  <div class="form-group">
    <label class="form__label" for="role">Role</label>
    <select id="role" class="form__select">
      <option>Designer</option>
      <option>Developer</option>
      <option>Manager</option>
    </select>
  </div>

  <button type="submit" class="btn btn--primary btn--lg w-full">Submit</button>
</form>
```

### Upload Component

```html
<div class="upload" id="file-upload">
  <input type="file" id="file-input" class="upload__input" accept="image/*">
  <label for="file-input" class="upload__label">
    <span class="upload__icon">📤</span>
    <span class="upload__text">Drop your file here</span>
    <span class="upload__hint">or click to browse</span>
    <button type="button" class="btn btn--primary upload__button">Choose File</button>
  </label>
  <div class="upload__file-list" id="file-list"></div>
</div>
```

### Alerts

```html
<div class="alert alert--success">
  <p class="alert__title">Success!</p>
  <p class="alert__message">Your changes have been saved.</p>
</div>

<div class="alert alert--error">
  <p class="alert__title">Error</p>
  <p class="alert__message">Something went wrong. Please try again.</p>
</div>

<div class="alert alert--info">
  <p class="alert__message">New features are now available.</p>
</div>
```

---

## Typography

### Headings

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
```

### Text Utilities

```html
<!-- Size -->
<p class="font-sm">Small text</p>
<p class="font-base">Base text (default)</p>
<p class="font-lg">Large text</p>
<p class="font-xl">Extra large text</p>
<p class="font-2xl">2x large text</p>
<p class="font-3xl">3x large text</p>

<!-- Weight -->
<p class="font-normal">Normal weight</p>
<p class="font-medium">Medium weight</p>
<p class="font-bold">Bold weight</p>

<!-- Color -->
<p class="text-primary">Primary color text</p>
<p class="text-secondary">Secondary/muted text</p>
<p class="text-success">Success text</p>
<p class="text-error">Error text</p>

<!-- Alignment -->
<p class="text-center">Centered text</p>
<p class="text-left">Left aligned text</p>
<p class="text-right">Right aligned text</p>
```

### Common Typography Patterns

```html
<!-- Icon + heading + description pattern -->
<div class="text-center">
  <div class="font-4xl mb-2xl">🧊</div>
  <h1 class="mb-md">Magic Fridge</h1>
  <p class="text-secondary mb-2xl">Recipe suggestions from your ingredients</p>
</div>

<!-- Title + subtitle pattern -->
<div>
  <h2 class="mb-sm">Upload Fridge Photo</h2>
  <p class="text-secondary mb-lg">Upload a photo of your fridge to receive AI-powered recipe suggestions</p>
</div>
```

---

## Color System

### Background Colors

```html
<div class="bg-surface">Surface background (cards, modals)</div>
<div class="bg-primary">Primary color background</div>
<div class="bg-secondary">Secondary color background</div>
```

### Text Colors

```html
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary/muted text</p>
<p class="text-success">Success text</p>
<p class="text-warning">Warning text</p>
<p class="text-error">Error text</p>
```

### Border Colors

```html
<div class="border border-primary">Primary border</div>
<div class="border border-light">Light border</div>
```

---

## Common Utility Classes

### Display

```html
<div class="hidden">Not visible</div>
<div class="block">Block display</div>
<div class="flex">Flex container</div>
<div class="grid">Grid container</div>
```

### Width & Height

```html
<div class="w-full">Full width</div>
<div class="h-screen">Full viewport height</div>
<img class="w-12 h-12">Fixed size (48px)</div>
```

### Borders & Radius

```html
<div class="border">Default border</div>
<div class="border-top">Top border only</div>

<div class="radius-sm">Small radius</div>
<div class="radius-md">Medium radius</div>
<div class="radius-lg">Large radius</div>
<div class="radius-full">Full radius (circle)</div>
```

### Shadows

```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
```

---

## Page Structure Patterns

### Landing Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Name</title>
  <link rel="stylesheet" href="https://nickcottrell.github.io/haberdash/haberdash.css">
</head>
<body>
  <div class="flex flex--column items-center justify-center h-screen p-2xl">
    <div class="text-center" style="max-width: 500px;">
      <div class="font-4xl mb-2xl">🎨</div>
      <h1 class="mb-md">App Name</h1>
      <p class="text-secondary mb-2xl">Your tagline here</p>
      <button class="btn btn--primary btn--lg w-full">Get Started</button>
    </div>
  </div>
</body>
</html>
```

### Dashboard Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link rel="stylesheet" href="https://nickcottrell.github.io/haberdash/haberdash.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: var(--background);
    }
    .main-content {
      padding: var(--space-2xl);
    }
  </style>
</head>
<body>
  <!-- Header component would go here -->

  <div class="main-content">
    <div class="container container--sm">

      <div class="card mb-lg">
        <div class="card__body text-center">
          <div class="font-3xl mb-md">📤</div>
          <h2 class="mb-sm">Upload Photo</h2>
          <p class="text-secondary mb-lg">Upload a photo to get started</p>
          <a href="/upload" class="btn btn--primary btn--lg">Upload</a>
        </div>
      </div>

      <div class="card">
        <div class="card__body text-center">
          <div class="font-3xl mb-md">🎨</div>
          <h2 class="mb-sm">Preferences</h2>
          <p class="text-secondary mb-lg">Customize your preferences</p>
          <a href="/settings" class="btn btn--secondary btn--lg">Configure</a>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
```

### Form Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
  <link rel="stylesheet" href="https://nickcottrell.github.io/haberdash/haberdash.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: var(--background);
    }
    .main-content {
      padding: var(--space-2xl);
    }
  </style>
</head>
<body>
  <div class="main-content">
    <div class="container container--sm">

      <div class="mb-2xl text-center">
        <h1 class="mb-sm">Contact Us</h1>
        <p class="text-secondary">We'd love to hear from you</p>
      </div>

      <div class="card">
        <div class="card__body">
          <form>
            <div class="form-group">
              <label class="form__label" for="name">Name</label>
              <input type="text" id="name" class="form__input" required>
            </div>

            <div class="form-group">
              <label class="form__label" for="email">Email</label>
              <input type="email" id="email" class="form__input" required>
            </div>

            <div class="form-group">
              <label class="form__label" for="message">Message</label>
              <textarea id="message" class="form__textarea" rows="6" required></textarea>
            </div>

            <button type="submit" class="btn btn--primary btn--lg w-full">Send Message</button>
          </form>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
```

---

## Best Practices

### DO

✅ **Use semantic HTML**
```html
<article class="card">
  <header class="card__header">
    <h2 class="card__title">Article Title</h2>
  </header>
  <section class="card__body">
    <p>Content here</p>
  </section>
</article>
```

✅ **Compose with utilities**
```html
<div class="flex gap-md items-center mb-lg">
  <img src="avatar.jpg" class="w-12 h-12 radius-full">
  <h3>John Doe</h3>
</div>
```

✅ **Use design tokens**
```css
.custom-component {
  padding: var(--space-lg);
  color: var(--primary);
  border-radius: var(--radius-md);
}
```

✅ **Follow BEM naming**
```html
<div class="alert alert--success">
  <p class="alert__title">Success!</p>
  <p class="alert__message">Operation completed.</p>
</div>
```

✅ **Center with container classes**
```html
<div class="container container--sm">
  <!-- Centered content -->
</div>
```

### DON'T

❌ **Don't use inline styles**
```html
<!-- Bad -->
<div style="padding: 16px; color: blue;">

<!-- Good -->
<div class="p-lg text-primary">
```

❌ **Don't hardcode values**
```css
/* Bad */
.component {
  padding: 24px;
  color: #3b82f6;
}

/* Good */
.component {
  padding: var(--space-lg);
  color: var(--primary);
}
```

❌ **Don't use non-semantic wrappers**
```html
<!-- Bad -->
<div class="wrapper">
  <div class="inner">
    <div class="content">
      <p>Text</p>
    </div>
  </div>
</div>

<!-- Good -->
<article class="card">
  <div class="card__body">
    <p>Text</p>
  </div>
</article>
```

❌ **Don't create custom classes for spacing**
```css
/* Bad */
.margin-bottom-large {
  margin-bottom: 24px;
}

/* Good - use utility classes */
<div class="mb-lg">
```

❌ **Don't break BEM naming**
```html
<!-- Bad -->
<div class="card-header-title">Title</div>

<!-- Good -->
<h2 class="card__title">Title</h2>
```

---

## Theming

### Applying a Theme

Override design tokens to create a custom theme:

```html
<style>
  :root {
    --primary: hsl(280, 100%, 70%);
    --secondary: hsl(320, 85%, 65%);
    --background: hsl(0, 0%, 10%);
    --surface: hsl(0, 0%, 15%);
    --text: hsl(0, 0%, 95%);
    --text-secondary: hsl(0, 0%, 70%);
  }
</style>
```

All components will automatically use the new theme colors.

### Dynamic Theme Loading

For advanced theming systems (like VRGB):

```html
<style id="theme-tokens">
  /* Tokens injected here by JavaScript */
</style>

<script>
  async function loadTheme() {
    const response = await fetch('/api/theme');
    const tokens = await response.json();

    const css = Object.entries(tokens)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');

    document.getElementById('theme-tokens').textContent = `:root { ${css} }`;
  }

  loadTheme();
</script>
```

---

## Checklist for New Pages

When building a new page, verify:

- [ ] Using `container container--sm` for centered layout
- [ ] All spacing uses token classes (`mb-lg`, `p-2xl`, etc.)
- [ ] Components follow BEM naming (`.card__body`, `.btn--primary`)
- [ ] No inline styles (use utility classes instead)
- [ ] Text hierarchy uses proper heading tags (`h1`, `h2`, `h3`)
- [ ] Colors use semantic classes (`text-primary`, `bg-surface`)
- [ ] Forms use proper structure (`.form-group`, `.form__label`, `.form__input`)
- [ ] Buttons have proper variants (`.btn--primary`, `.btn--lg`)
- [ ] Cards use proper structure (`.card__header`, `.card__body`, `.card__actions`)
- [ ] No hardcoded pixel values in custom CSS
- [ ] Background set with `background: var(--background)`
- [ ] Responsive spacing (`p-2xl` for main content padding)

---

## Quick Reference

### Most Common Patterns

**Centered page layout:**
```html
<div class="container container--sm">
  <!-- content -->
</div>
```

**Full-screen center:**
```html
<div class="flex flex--column items-center justify-center h-screen p-2xl">
  <!-- content -->
</div>
```

**Card with centered content:**
```html
<div class="card">
  <div class="card__body text-center">
    <div class="font-3xl mb-md">🎨</div>
    <h2 class="mb-sm">Title</h2>
    <p class="text-secondary mb-lg">Description</p>
    <button class="btn btn--primary btn--lg">Action</button>
  </div>
</div>
```

**Form structure:**
```html
<div class="form-group">
  <label class="form__label" for="field">Label</label>
  <input type="text" id="field" class="form__input">
</div>
```

**Flex row:**
```html
<div class="flex gap-md items-center">
  <!-- items -->
</div>
```

**Vertical stack:**
```html
<div class="flex flex--column gap-lg">
  <!-- items -->
</div>
```

---

## Additional Resources

- **Component Examples**: See `preview/` folder in repo
- **Token Reference**: See `lib/tokens.css`
- **Utility Reference**: See `lib/utilities.css`
- **Live Preview**: Run `./hooks.sh serve` and visit http://localhost:8080/

---

**Remember**: Haberdash is about composing simple pieces into complex UIs. When in doubt, use existing utilities and components rather than creating custom classes.

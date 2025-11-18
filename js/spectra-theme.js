/**
 * Spectra Theme Bridge - Direct HSL Component Mapping
 * Each F dimension's H/S/L components directly control specific design outputs
 *
 * F1 Origin: Chromatic base (hue → primary color, sat/light → palette tone)
 * F2 Contrast: Edge definition (sat → sharpness, light → shadow depth)
 * F3 Density: Spatial field (hue → spacing, sat → padding, light → roundness)
 * F4 Hierarchy: Visual impact (light → type scale, sat → weight variation)
 *
 * Usage:
 *   <script src="spectra-theme.js" data-node-id="haberdash-ui-theme"></script>
 */

(async function() {
  // Get configuration from script tag
  const scriptTag = document.currentScript;
  const nodeId = scriptTag?.getAttribute('data-node-id') || 'ui-theme-001';
  const apiEndpoint = scriptTag?.getAttribute('data-api') || 'https://zf8klzvd4k.execute-api.us-east-2.amazonaws.com/prod/blend';
  const debug = scriptTag?.hasAttribute('data-debug');

  if (debug) console.log('🌈 Spectra Theme: Loading node', nodeId);

  try {
    // Fetch Spectra node with cache-busting timestamp
    const cacheBuster = Date.now();
    const response = await fetch(`${apiEndpoint}?node_id=${nodeId}&t=${cacheBuster}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const spectraData = await response.json();
    if (debug) console.log('🌈 Spectra Theme: Data received', spectraData);

    // Extract color metadata (D1-D4)
    const metadata = spectraData.metadata;
    const root = document.documentElement;

    // Get HSL values for all dimensions (support multiple naming schemes)
    const f1 = metadata['F1 Origin']?.hsl || metadata.primary_anchor?.hsl || metadata.d1?.hsl;
    const f2 = metadata['F2 Contrast']?.hsl || metadata.relational_modifier?.hsl || metadata.d2?.hsl;
    const f3 = metadata['F3 Density']?.hsl || metadata.intensity_vector?.hsl || metadata.d3?.hsl;
    const f4 = metadata['F4 Hierarchy']?.hsl || metadata.opposition_point?.hsl || metadata.d4?.hsl;

    if (!f1 || !f2 || !f3 || !f4) {
      throw new Error('Missing dimension data');
    }

    // Helper: Map range linearly
    const mapRange = (value, inMin, inMax, outMin, outMax) => {
      return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
    };

    // === F1 ORIGIN: COLOR PALETTE ===
    // F1.H → Primary hue
    // F1.S → Color saturation strength
    // F1.L → Dark/light mode detection

    const isDarkMode = f1.l < 50;

    if (isDarkMode) {
      root.style.setProperty('--color-primary', `hsl(${f1.h}, ${Math.min(f1.s + 30, 100)}%, ${Math.min(f1.l + 50, 70)}%)`);
      root.style.setProperty('--color-primary-dark', `hsl(${f1.h}, ${Math.min(f1.s + 20, 90)}%, ${Math.min(f1.l + 40, 60)}%)`);
      root.style.setProperty('--color-primary-light', `hsl(${f1.h}, ${Math.min(f1.s + 40, 100)}%, ${Math.min(f1.l + 65, 85)}%)`);
    } else {
      root.style.setProperty('--color-primary', `hsl(${f1.h}, ${f1.s}%, ${Math.max(f1.l, 40)}%)`);
      root.style.setProperty('--color-primary-dark', `hsl(${f1.h}, ${f1.s}%, ${Math.max(f1.l - 15, 30)}%)`);
      root.style.setProperty('--color-primary-light', `hsl(${f1.h}, ${f1.s}%, ${Math.min(f1.l + 20, 80)}%)`);
    }

    // Accent color
    const accentHue = (f1.h + 30) % 360;
    const accentLightness = isDarkMode ? Math.min(f1.l + 55, 75) : Math.min(f1.l + 10, 70);
    root.style.setProperty('--color-accent', `hsl(${accentHue}, ${f1.s}%, ${accentLightness}%)`);

    // Background/surface
    if (isDarkMode) {
      root.style.setProperty('--color-background', `hsl(${f1.h}, ${Math.max(f1.s - 30, 5)}%, ${f1.l + 2}%)`);
      root.style.setProperty('--color-surface', `hsl(${f1.h}, ${Math.max(f1.s - 25, 10)}%, ${f1.l + 6}%)`);
      root.style.setProperty('--color-text', `hsl(${f1.h}, 10%, 95%)`);
      root.style.setProperty('--color-text-dim', `hsl(${f1.h}, 8%, 70%)`);
    } else {
      root.style.setProperty('--color-background', `hsl(${f1.h}, ${Math.max(f1.s - 50, 5)}%, 98%)`);
      root.style.setProperty('--color-surface', `hsl(${f1.h}, ${Math.max(f1.s - 45, 10)}%, 95%)`);
      root.style.setProperty('--color-text', `hsl(${f1.h}, 10%, 20%)`);
      root.style.setProperty('--color-text-dim', `hsl(${f1.h}, 8%, 50%)`);
    }

    if (debug) console.log('🎨 F1 Palette:', { hue: f1.h, sat: f1.s, light: f1.l, darkMode: isDarkMode });

    // === F2 CONTRAST: EDGE DEFINITION ===
    // F2.S → Border sharpness (0 = soft/round, 100 = sharp/defined)
    // F2.L → Shadow depth (0 = deep shadows, 100 = light shadows)

    // Border radius inversely proportional to saturation (high sat = sharp = small radius)
    const borderRadiusBase = Math.round(mapRange(f2.s, 0, 100, 16, 4));
    root.style.setProperty('--border-radius-base', `${borderRadiusBase}px`);
    root.style.setProperty('--border-radius-lg', `${Math.round(borderRadiusBase * 1.5)}px`);

    // Shadow blur based on lightness (high lightness = lighter/softer shadows)
    const shadowBlur = Math.round(mapRange(f2.l, 0, 100, 24, 8));
    root.style.setProperty('--shadow-sm', `0 2px ${shadowBlur}px rgba(0,0,0,0.1)`);
    root.style.setProperty('--shadow-md', `0 4px ${Math.round(shadowBlur * 1.5)}px rgba(0,0,0,0.15)`);

    // Border opacity based on saturation (high sat = more defined borders)
    const borderOpacity = mapRange(f2.s, 0, 100, 0.1, 0.6);
    root.style.setProperty('--border-opacity', borderOpacity.toFixed(2));

    if (debug) console.log('✂️  F2 Contrast:', { sat: f2.s, light: f2.l, borderRadius: borderRadiusBase, shadowBlur });

    // === F3 DENSITY: SPATIAL FIELD ===
    // F3.H → Spacing/margins (0° = tight, 360° = airy)
    // F3.S → Padding (0% = minimal, 100% = generous)
    // F3.L → Border radius override (additional roundness control)

    // Spacing: 0.5rem (tight) to 1.5rem (airy)
    const spaceUnit = mapRange(f3.h, 0, 360, 0.5, 1.5);
    root.style.setProperty('--space-unit', `${spaceUnit.toFixed(3)}rem`);

    // Padding multiplier: 0.6× (minimal) to 1.4× (generous)
    const paddingScale = mapRange(f3.s, 0, 100, 0.6, 1.4);
    root.style.setProperty('--padding-scale', paddingScale.toFixed(2));

    // Gap multiplier tied to spacing
    const gapScale = mapRange(f3.h, 0, 360, 0.8, 1.2);
    root.style.setProperty('--gap-scale', gapScale.toFixed(2));

    // F3.L can add extra roundness (combines with F2 for total roundness)
    const extraRoundness = Math.round(mapRange(f3.l, 0, 100, 0, 8));
    const totalBorderRadius = borderRadiusBase + extraRoundness;
    root.style.setProperty('--border-radius-base', `${totalBorderRadius}px`);
    root.style.setProperty('--border-radius-lg', `${Math.round(totalBorderRadius * 1.5)}px`);

    if (debug) console.log('📏 F3 Density:', {
      hue: f3.h,
      sat: f3.s,
      light: f3.l,
      spaceUnit: spaceUnit.toFixed(3),
      paddingScale: paddingScale.toFixed(2),
      roundness: totalBorderRadius
    });

    // === F4 HIERARCHY: VISUAL IMPACT ===
    // F4.L → Type scale ratio (0% = flat/uniform, 100% = dramatic)
    // F4.S → Font weight variation (0% = uniform weights, 100% = bold contrast)

    // Type ratio: 1.2 (flat) to 1.618 (golden ratio, dramatic)
    const typeRatio = mapRange(f4.l, 0, 100, 1.2, 1.618);
    root.style.setProperty('--type-ratio', typeRatio.toFixed(3));

    // Font weight for headings: 400 (normal, flat) to 700 (bold, dramatic)
    const fontWeightHeading = Math.round(mapRange(f4.s, 0, 100, 400, 700));
    root.style.setProperty('--font-weight-heading', fontWeightHeading);
    root.style.setProperty('--font-weight-body', 400);

    if (debug) console.log('📐 F4 Hierarchy:', {
      light: f4.l,
      sat: f4.s,
      typeRatio: typeRatio.toFixed(3),
      fontWeight: fontWeightHeading
    });

    // Add CSS class to indicate theme is loaded
    document.documentElement.classList.add('spectra-theme-loaded');

    if (debug) console.log('✅ Spectra Theme: Applied successfully');

    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('spectra-theme-loaded', {
      detail: { spectraData, nodeId }
    }));

  } catch (error) {
    console.error('❌ Spectra Theme: Failed to load', error);

    // Fallback to default theme
    document.documentElement.classList.add('spectra-theme-fallback');
  }
})();

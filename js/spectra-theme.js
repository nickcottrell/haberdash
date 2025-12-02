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

  // Handle BASE theme as built-in preset (Craigslist mode)
  if (nodeId.toUpperCase() === 'BASE') {
    const root = document.documentElement;

    if (debug) console.log('🌈 Spectra Theme: Applying BASE theme (Craigslist mode)');

    // Minimal "Craigslist-like" theme - browser defaults with visible borders
    root.style.setProperty('--primary', '#0000EE');
    root.style.setProperty('--primary-hover', '#551A8B');
    root.style.setProperty('--primary-light', '#0000EE');
    root.style.setProperty('--background', '#ffffff');
    root.style.setProperty('--surface', '#ffffff');
    root.style.setProperty('--surface-light', '#f5f5f5');
    root.style.setProperty('--surface-lighter', '#eeeeee');
    root.style.setProperty('--text', '#000000');
    root.style.setProperty('--text-heading', '#000000');
    root.style.setProperty('--text-body', '#000000');
    root.style.setProperty('--text-secondary', '#000000');
    root.style.setProperty('--text-tertiary', '#000000');
    root.style.setProperty('--border', '#000000');
    root.style.setProperty('--border-light', '#cccccc');
    root.style.setProperty('--border-focus', '#0000EE');
    root.style.setProperty('--border-width', '1px');
    root.style.setProperty('--radius-sm', '0px');
    root.style.setProperty('--radius-md', '0px');
    root.style.setProperty('--radius-lg', '0px');
    root.style.setProperty('--radius-xl', '0px');
    root.style.setProperty('--radius-full', '0px');
    root.style.setProperty('--shadow-sm', 'none');
    root.style.setProperty('--shadow-md', 'none');
    root.style.setProperty('--shadow-lg', 'none');
    root.style.setProperty('--shadow-xl', 'none');
    root.style.setProperty('--space-unit', '1rem');
    root.style.setProperty('--font-size-base', '1rem');
    root.style.setProperty('--font-size-sm', '0.875rem');
    root.style.setProperty('--font-size-xs', '0.75rem');
    root.style.setProperty('--font-size-lg', '1.125rem');
    root.style.setProperty('--font-size-xl', '1.25rem');
    root.style.setProperty('--font-size-2xl', '1.5rem');
    root.style.setProperty('--font-size-3xl', '1.875rem');
    root.style.setProperty('--font-size-4xl', '2.25rem');
    root.style.setProperty('--font-weight-heading', '700');
    root.style.setProperty('--font-weight-body', '400');
    root.style.setProperty('--line-height-normal', '1.5');
    root.style.setProperty('--transition-base', '0ms');
    root.style.setProperty('--transition-fast', '0ms');
    root.style.setProperty('--transition-slow', '0ms');

    // Semantic colors - browser defaults
    root.style.setProperty('--success', '#008000');
    root.style.setProperty('--warning', '#FF8C00');
    root.style.setProperty('--error', '#FF0000');
    root.style.setProperty('--info', '#0000EE');

    document.documentElement.classList.add('spectra-theme-loaded');
    document.documentElement.setAttribute('data-theme', 'base');

    window.dispatchEvent(new CustomEvent('spectra-theme-loaded', {
      detail: {
        nodeId: 'BASE',
        spectraData: {
          metadata: {
            'F1 Origin': { hsl: { h: 240, s: 100, l: 50 } },
            'F2 Contrast': { hsl: { h: 0, s: 0, l: 0 } },
            'F3 Density': { hsl: { h: 0, s: 0, l: 50 } },
            'F4 Hierarchy': { hsl: { h: 0, s: 0, l: 50 } }
          }
        }
      }
    }));

    if (debug) console.log('✅ Spectra Theme: BASE theme applied');
    return;
  }

  try {
    // Fetch Spectra node with cache-busting timestamp
    const cacheBuster = Date.now();
    const response = await fetch(`${apiEndpoint}?node_id=${nodeId}&t=${cacheBuster}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const spectraData = await response.json();
    if (debug) console.log('🌈 Spectra Theme: Data received', spectraData);

    // Check if user has saved theme_mode preference
    if (spectraData.theme_mode === 'none') {
      if (debug) console.log('🌈 Spectra Theme: NO STYLE mode detected, removing theme');
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.add('spectra-theme-none');

      window.dispatchEvent(new CustomEvent('spectra-theme-loaded', {
        detail: { spectraData, nodeId, themeMode: 'none' }
      }));

      return; // Exit early, don't apply theme
    }

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

    // Helper: Calculate circular hue distance (0-180°)
    const hueDistance = (h1, h2) => {
      const diff = Math.abs(h1 - h2);
      return Math.min(diff, 360 - diff);
    };

    // === VARIANCE CALCULATIONS ===
    // Extract all HSL values
    const hues = [f1.h, f2.h, f3.h, f4.h];
    const sats = [f1.s, f2.s, f3.s, f4.s];
    const lights = [f1.l, f2.l, f3.l, f4.l];

    // F1: Monochrome ←→ Polychrome (Hue variance)
    // Calculate average hue distance between all pairs
    let totalHueDistance = 0;
    let pairCount = 0;
    for (let i = 0; i < hues.length; i++) {
      for (let j = i + 1; j < hues.length; j++) {
        totalHueDistance += hueDistance(hues[i], hues[j]);
        pairCount++;
      }
    }
    const hueVariance = totalHueDistance / pairCount; // 0-180

    // F2: Soft ←→ Sharp (Saturation variance for edges)
    const satVariance = Math.max(...sats) - Math.min(...sats); // 0-100

    // F3: Compact ←→ Spacious (Saturation variance for spacing)
    // Same as F2 but mapped to spacing outputs
    const spacingVariance = satVariance; // 0-100

    // F4: Flat ←→ Dramatic (Lightness variance for hierarchy)
    const lightVariance = Math.max(...lights) - Math.min(...lights); // 0-100

    if (debug) console.log('📊 Variances:', {
      hue: hueVariance.toFixed(1) + '° (0=mono, 180=poly)',
      sat: satVariance.toFixed(1) + '% (edges & spacing)',
      light: lightVariance.toFixed(1) + '% (hierarchy)'
    });

    // === F1: MONOCHROME ←→ POLYCHROME (COLOR PALETTE) ===
    // Use F1 as primary color base
    const isDarkMode = f1.l < 50;

    if (isDarkMode) {
      root.style.setProperty('--primary', `hsl(${f1.h}, ${Math.min(f1.s + 30, 100)}%, ${Math.min(f1.l + 50, 70)}%)`);
      root.style.setProperty('--primary-dark', `hsl(${f1.h}, ${Math.min(f1.s + 20, 90)}%, ${Math.min(f1.l + 40, 60)}%)`);
      root.style.setProperty('--primary-light', `hsl(${f1.h}, ${Math.min(f1.s + 40, 100)}%, ${Math.min(f1.l + 65, 85)}%)`);
    } else {
      root.style.setProperty('--primary', `hsl(${f1.h}, ${f1.s}%, ${Math.max(f1.l, 40)}%)`);
      root.style.setProperty('--primary-dark', `hsl(${f1.h}, ${f1.s}%, ${Math.max(f1.l - 15, 30)}%)`);
      root.style.setProperty('--primary-light', `hsl(${f1.h}, ${f1.s}%, ${Math.min(f1.l + 20, 80)}%)`);
    }

    // Accent color: Use hue variance to determine accent shift
    // High hue variance = use complementary/distant color
    // Low hue variance = use subtle analogous shift
    const accentShift = mapRange(hueVariance, 0, 180, 15, 90); // 15-90° shift
    const accentHue = (f1.h + accentShift) % 360;
    const accentLightness = isDarkMode ? Math.min(f1.l + 55, 75) : Math.min(f1.l + 10, 70);
    root.style.setProperty('--secondary', `hsl(${accentHue}, ${f1.s}%, ${accentLightness}%)`);

    // Background/surface
    if (isDarkMode) {
      root.style.setProperty('--background', `hsl(${f1.h}, ${Math.max(f1.s - 30, 5)}%, ${f1.l + 2}%)`);
      root.style.setProperty('--surface', `hsl(${f1.h}, ${Math.max(f1.s - 25, 10)}%, ${f1.l + 6}%)`);
      root.style.setProperty('--text', `hsl(${f1.h}, 10%, 95%)`);
      root.style.setProperty('--text-secondary', `hsl(${f1.h}, 8%, 70%)`);
    } else {
      root.style.setProperty('--background', `hsl(${f1.h}, ${Math.max(f1.s - 50, 5)}%, 98%)`);
      root.style.setProperty('--surface', `hsl(${f1.h}, ${Math.max(f1.s - 45, 10)}%, 95%)`);
      root.style.setProperty('--text', `hsl(${f1.h}, 10%, 20%)`);
      root.style.setProperty('--text-secondary', `hsl(${f1.h}, 8%, 50%)`);
    }

    if (debug) console.log('🎨 F1 Polychrome:', { hueVariance: hueVariance.toFixed(1), accentShift: accentShift.toFixed(1), darkMode: isDarkMode });

    // === F2: SOFT ←→ SHARP (EDGE DEFINITION) ===
    // Border radius inversely proportional to saturation variance
    // High variance = sharp/defined = small radius
    // Low variance = soft/diffuse = large radius
    const borderRadiusBase = Math.round(mapRange(satVariance, 0, 100, 16, 4));
    root.style.setProperty('--radius-md', `${borderRadiusBase}px`);
    root.style.setProperty('--radius-lg', `${Math.round(borderRadiusBase * 1.5)}px`);

    // Shadow blur inversely proportional to variance
    const shadowBlur = Math.round(mapRange(satVariance, 0, 100, 24, 8));
    root.style.setProperty('--shadow-sm', `0 2px ${shadowBlur}px rgba(0,0,0,0.1)`);
    root.style.setProperty('--shadow-md', `0 4px ${Math.round(shadowBlur * 1.5)}px rgba(0,0,0,0.15)`);

    // Border opacity proportional to variance
    const borderOpacity = mapRange(satVariance, 0, 100, 0.1, 0.6);
    root.style.setProperty('--border-opacity', borderOpacity.toFixed(2));

    // Border thickness proportional to variance
    // High variance = sharp/defined = thick borders (2-3px)
    // Low variance = soft/diffuse = thin borders (1px)
    const borderWidth = mapRange(satVariance, 0, 100, 1, 3);
    root.style.setProperty('--border-width', `${borderWidth.toFixed(1)}px`);

    if (debug) console.log('✂️  F2 Sharp:', { satVariance: satVariance.toFixed(1), borderRadius: borderRadiusBase, shadowBlur, borderWidth: borderWidth.toFixed(1) });

    // === F3: COMPACT ←→ SPACIOUS (SPATIAL DENSITY) ===
    // Spacing proportional to saturation variance
    // High variance = diverse colors need breathing room = spacious
    // Low variance = uniform colors = compact
    const spaceUnit = mapRange(spacingVariance, 0, 100, 0.5, 1.5);
    root.style.setProperty('--space-unit', `${spaceUnit.toFixed(3)}rem`);

    // Padding and gap scale with spacing
    const paddingScale = mapRange(spacingVariance, 0, 100, 0.6, 1.4);
    root.style.setProperty('--padding-scale', paddingScale.toFixed(2));

    const gapScale = mapRange(spacingVariance, 0, 100, 0.8, 1.2);
    root.style.setProperty('--gap-scale', gapScale.toFixed(2));

    if (debug) console.log('📏 F3 Spacious:', {
      spacingVariance: spacingVariance.toFixed(1),
      spaceUnit: spaceUnit.toFixed(3),
      paddingScale: paddingScale.toFixed(2)
    });

    // === F4: FLAT ←→ DRAMATIC (VISUAL HIERARCHY) ===
    // Type step proportional to lightness variance
    // High variance = dramatic contrast = big type scale
    // Low variance = subtle differences = flat type scale
    const typeStep = mapRange(lightVariance, 0, 100, 0.125, 0.5);
    root.style.setProperty('--type-step', `${typeStep.toFixed(3)}rem`);

    // Keep ratio for backwards compatibility
    const typeRatio = 1 + (typeStep / 1);
    root.style.setProperty('--type-ratio', typeRatio.toFixed(3));

    // Font weight variation proportional to lightness variance
    const fontWeightHeading = Math.round(mapRange(lightVariance, 0, 100, 400, 700));
    root.style.setProperty('--font-weight-heading', fontWeightHeading);
    root.style.setProperty('--font-weight-body', 400);

    // Text color boldness proportional to lightness variance
    // High variance = dramatic contrast = dark headings (#000), medium body (#444)
    // Low variance = subtle/flat = gray headings (#666), light body (#888)
    if (isDarkMode) {
      // Dark mode: Higher variance = brighter contrast
      const headingLightness = Math.round(mapRange(lightVariance, 0, 100, 75, 98));
      const bodyLightness = Math.round(mapRange(lightVariance, 0, 100, 65, 85));
      root.style.setProperty('--text-heading', `hsl(${f1.h}, 10%, ${headingLightness}%)`);
      root.style.setProperty('--text-body', `hsl(${f1.h}, 8%, ${bodyLightness}%)`);
    } else {
      // Light mode: Higher variance = darker contrast
      const headingLightness = Math.round(mapRange(lightVariance, 0, 100, 40, 10));
      const bodyLightness = Math.round(mapRange(lightVariance, 0, 100, 55, 30));
      root.style.setProperty('--text-heading', `hsl(${f1.h}, 10%, ${headingLightness}%)`);
      root.style.setProperty('--text-body', `hsl(${f1.h}, 8%, ${bodyLightness}%)`);
    }

    if (debug) console.log('📐 F4 Dramatic:', {
      lightVariance: lightVariance.toFixed(1),
      typeStep: `${typeStep.toFixed(3)}rem`,
      fontWeight: fontWeightHeading
    });

    // Add CSS class to indicate theme is loaded
    document.documentElement.classList.add('spectra-theme-loaded');
    document.documentElement.setAttribute('data-theme', 'live');

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

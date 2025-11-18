/**
 * Spectra Theme Bridge
 * Fetches UI theme parameters from Spectra node and applies to CSS
 *
 * Usage:
 *   <script src="spectra-theme.js" data-node-id="ui-theme-001"></script>
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
    const d1 = metadata['F1 Origin']?.hsl || metadata.primary_anchor?.hsl || metadata.d1?.hsl;
    const d2 = metadata['F2 Contrast']?.hsl || metadata.relational_modifier?.hsl || metadata.d2?.hsl;
    const d3 = metadata['F3 Density']?.hsl || metadata.intensity_vector?.hsl || metadata.d3?.hsl;
    const d4 = metadata['F4 Hierarchy']?.hsl || metadata.opposition_point?.hsl || metadata.d4?.hsl;

    if (!d1 || !d2 || !d3 || !d4) {
      throw new Error('Missing dimension data');
    }

    // === OUTPUT 1: COLOR PALETTE TONE ===
    // Detect dark mode vs light mode based on average lightness
    const avgLightness = (d1.l + d2.l + d3.l + d4.l) / 4;
    const isDarkMode = avgLightness < 50; // Dark if average lightness below 50%

    // Primary color - boost brightness in dark mode for visibility
    if (isDarkMode) {
      // In dark mode, boost saturation and lightness for vibrant colors
      root.style.setProperty('--color-primary', `hsl(${d1.h}, ${Math.min(d1.s + 30, 100)}%, ${Math.min(d1.l + 50, 70)}%)`);
      root.style.setProperty('--color-primary-dark', `hsl(${d1.h}, ${Math.min(d1.s + 20, 90)}%, ${Math.min(d1.l + 40, 60)}%)`);
      root.style.setProperty('--color-primary-light', `hsl(${d1.h}, ${Math.min(d1.s + 40, 100)}%, ${Math.min(d1.l + 65, 85)}%)`);
    } else {
      // Light mode - use colors as-is or slightly adjusted
      root.style.setProperty('--color-primary', `hsl(${d1.h}, ${d1.s}%, ${Math.max(d1.l, 40)}%)`);
      root.style.setProperty('--color-primary-dark', `hsl(${d1.h}, ${d1.s}%, ${Math.max(d1.l - 15, 30)}%)`);
      root.style.setProperty('--color-primary-light', `hsl(${d1.h}, ${d1.s}%, ${Math.min(d1.l + 20, 80)}%)`);
    }

    // Accent from D1 hue relationship
    const accentHue = (d1.h + 30) % 360;
    const accentLightness = isDarkMode ? Math.min(d1.l + 55, 75) : Math.min(d1.l + 10, 70);
    root.style.setProperty('--color-accent', `hsl(${accentHue}, ${d1.s}%, ${accentLightness}%)`);

    // Background/surface - respect dark mode vs light mode
    if (isDarkMode) {
      // Dark mode: use low lightness values
      root.style.setProperty('--color-background', `hsl(${d1.h}, ${Math.max(d1.s - 30, 5)}%, ${d1.l + 2}%)`);
      root.style.setProperty('--color-surface', `hsl(${d1.h}, ${Math.max(d1.s - 25, 10)}%, ${d1.l + 6}%)`);
      // Light text for dark backgrounds
      root.style.setProperty('--color-text', `hsl(${d1.h}, 10%, 95%)`);
      root.style.setProperty('--color-text-dim', `hsl(${d1.h}, 8%, 70%)`);
    } else {
      // Light mode: use high lightness values
      root.style.setProperty('--color-background', `hsl(${d1.h}, ${Math.max(d1.s - 50, 5)}%, 98%)`);
      root.style.setProperty('--color-surface', `hsl(${d1.h}, ${Math.max(d1.s - 45, 10)}%, 95%)`);
      // Dark text for light backgrounds
      root.style.setProperty('--color-text', `hsl(${d1.h}, 10%, 20%)`);
      root.style.setProperty('--color-text-dim', `hsl(${d1.h}, 8%, 50%)`);
    }

    if (debug) console.log('🎨 Palette:', { primary: `hsl(${d1.h}, ${d1.s}%, ${d1.l}%)` });

    // === OUTPUT 2: BORDER RADIUS & CONTRAST (SHARPNESS) ===
    // Average saturation across all dimensions
    const avgSaturation = (d1.s + d2.s + d3.s + d4.s) / 4;

    // Lightness range (max - min)
    const lightnessRange = Math.max(d1.l, d2.l, d3.l, d4.l) - Math.min(d1.l, d2.l, d3.l, d4.l);

    // Sharpness score: 0 = soft/rounded, 1 = sharp/defined
    const sharpness = (avgSaturation / 100) * (lightnessRange / 100);

    // Border radius inversely proportional to sharpness
    const borderRadius = Math.round(16 * (1 - sharpness));
    root.style.setProperty('--border-radius-base', `${borderRadius}px`);
    root.style.setProperty('--border-radius-lg', `${Math.round(borderRadius * 1.5)}px`);

    // Shadow blur inversely proportional to sharpness
    const shadowBlur = Math.round(20 * (1 - sharpness));
    root.style.setProperty('--shadow-sm', `0 2px ${shadowBlur}px rgba(0,0,0,0.1)`);
    root.style.setProperty('--shadow-md', `0 4px ${Math.round(shadowBlur * 1.5)}px rgba(0,0,0,0.15)`);

    // Border opacity proportional to sharpness
    const borderOpacity = 0.1 + (sharpness * 0.5);
    root.style.setProperty('--border-opacity', borderOpacity.toFixed(2));

    if (debug) console.log('✂️  Sharpness:', sharpness.toFixed(2), 'radius:', borderRadius);

    // === OUTPUT 3: SPACE AROUND OBJECTS (DENSITY) ===
    // Saturation variance across dimensions
    const saturations = [d1.s, d2.s, d3.s, d4.s];
    const avgSat = saturations.reduce((a, b) => a + b) / 4;
    const satVariance = saturations.reduce((sum, val) => sum + Math.pow(val - avgSat, 2), 0) / 4;

    // Hue spread (max distance between any two hues)
    const hues = [d1.h, d2.h, d3.h, d4.h];
    let maxHueDist = 0;
    for (let i = 0; i < hues.length; i++) {
      for (let j = i + 1; j < hues.length; j++) {
        const dist = Math.min(Math.abs(hues[i] - hues[j]), 360 - Math.abs(hues[i] - hues[j]));
        maxHueDist = Math.max(maxHueDist, dist);
      }
    }
    const hueSpread = maxHueDist / 180; // 0 to 1

    // Spaciousness: higher variance + wider spread = more spacious
    const spaciousness = (Math.sqrt(satVariance) / 100) * hueSpread;

    // Space unit: 0.5rem (compact) to 1.25rem (spacious)
    const spaceUnit = 0.5 + (spaciousness * 0.75);
    root.style.setProperty('--space-unit', `${spaceUnit.toFixed(3)}rem`);
    root.style.setProperty('--gap-scale', (1 + spaciousness).toFixed(2));
    root.style.setProperty('--padding-scale', (1 + spaciousness * 0.5).toFixed(2));

    if (debug) console.log('📏 Spaciousness:', spaciousness.toFixed(2), 'space-unit:', spaceUnit.toFixed(3));

    // === OUTPUT 4: TYPE SIZE & HIERARCHY ===
    // Lightness ratios between dimensions
    const l1 = Math.max(d1.l, 1); // Avoid division by zero
    const l4 = Math.max(d4.l, 1);
    const lightnessRatios = [d1.l / l4, d2.l / l4, d3.l / l4];

    // Variance in ratios = hierarchy strength
    const avgRatio = lightnessRatios.reduce((a, b) => a + b) / 3;
    const ratioVariance = lightnessRatios.reduce((sum, val) => sum + Math.pow(val - avgRatio, 2), 0) / 3;
    const hierarchyStrength = Math.sqrt(ratioVariance);

    // Type ratio: 1.2 (subtle) to 1.618 (dramatic golden ratio)
    const typeRatio = 1.2 + (hierarchyStrength * 0.418);
    root.style.setProperty('--type-ratio', typeRatio.toFixed(3));

    // Font weight contrast: 300-700 based on hierarchy
    const fontWeightContrast = Math.round(300 + (hierarchyStrength * 400));
    root.style.setProperty('--font-weight-heading', fontWeightContrast);
    root.style.setProperty('--font-weight-body', 400);

    if (debug) console.log('📐 Hierarchy:', hierarchyStrength.toFixed(2), 'ratio:', typeRatio.toFixed(3));

    // Add a CSS class to indicate theme is loaded
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

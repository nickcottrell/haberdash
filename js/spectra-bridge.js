/**
 * Spectra Bridge for Haberdash
 * Maps Spectra-generated CSS variables to Haberdash's variable names
 */

(function() {
  console.log('🔗 Spectra Bridge: Script loaded');

  let spectraReady = false;
  let cssReady = false;

  // Function to apply Spectra theme to Haberdash
  function applyTheme() {
    if (!spectraReady) {
      console.log('⏳ Spectra Bridge: Waiting for Spectra theme...');
      return;
    }

    console.log('🌈 Spectra theme loaded, applying to Haberdash...');

    // Remove old override if exists
    const oldStyle = document.getElementById('spectra-override');
    if (oldStyle) oldStyle.remove();

    const root = document.documentElement;
    const computed = getComputedStyle(root);

    // === MAPPING: Spectra → Haberdash ===

    // Colors
    const spectraPrimary = computed.getPropertyValue('--color-primary').trim();
    const spectraPrimaryDark = computed.getPropertyValue('--color-primary-dark').trim();
    const spectraPrimaryLight = computed.getPropertyValue('--color-primary-light').trim();
    const spectraAccent = computed.getPropertyValue('--color-accent').trim();
    const spectraBackground = computed.getPropertyValue('--color-background').trim();
    const spectraSurface = computed.getPropertyValue('--color-surface').trim();
    const spectraText = computed.getPropertyValue('--color-text').trim();
    const spectraTextDim = computed.getPropertyValue('--color-text-dim').trim();

    // Border Radius
    const spectraBorderBase = computed.getPropertyValue('--border-radius-base').trim();
    const spectraBorderLg = computed.getPropertyValue('--border-radius-lg').trim();

    // Shadows
    const spectraShadowSm = computed.getPropertyValue('--shadow-sm').trim();
    const spectraShadowMd = computed.getPropertyValue('--shadow-md').trim();

    // Spacing
    const spectraSpaceUnit = computed.getPropertyValue('--space-unit').trim();

    // Typography
    const spectraTypeRatio = computed.getPropertyValue('--type-ratio').trim();
    const spectraFontWeightHeading = computed.getPropertyValue('--font-weight-heading').trim();

    // Build CSS override string
    let css = ':root {\n';

    if (spectraPrimary) {
      css += `  --primary: ${spectraPrimary} !important;\n`;
      css += `  --primary-hover: ${spectraPrimaryDark} !important;\n`;
      css += `  --primary-light: ${spectraPrimaryLight} !important;\n`;
      css += `  --gradient-primary: linear-gradient(135deg, ${spectraPrimary} 0%, ${spectraPrimaryDark} 100%) !important;\n`;
    }

    if (spectraBackground) {
      css += `  --background: ${spectraBackground} !important;\n`;
    }

    if (spectraSurface) {
      css += `  --surface: ${spectraSurface} !important;\n`;
      const surfaceRGB = hexToRGB(spectraSurface);
      if (surfaceRGB) {
        const lighter = lightenRGB(surfaceRGB, 10);
        const lightest = lightenRGB(surfaceRGB, 20);
        css += `  --surface-light: ${rgbToHex(lighter.r, lighter.g, lighter.b)} !important;\n`;
        css += `  --surface-lighter: ${rgbToHex(lightest.r, lightest.g, lightest.b)} !important;\n`;
      }
    }

    if (spectraText) {
      css += `  --text: ${spectraText} !important;\n`;
    }

    if (spectraTextDim) {
      css += `  --text-secondary: ${spectraTextDim} !important;\n`;
    }

    if (spectraBorderBase) {
      css += `  --radius-sm: ${parseInt(spectraBorderBase) / 2}px !important;\n`;
      css += `  --radius-md: ${spectraBorderBase} !important;\n`;
    }

    if (spectraBorderLg) {
      css += `  --radius-lg: ${spectraBorderLg} !important;\n`;
      css += `  --radius-xl: ${parseInt(spectraBorderLg) * 1.33}px !important;\n`;
    }

    if (spectraShadowSm) {
      css += `  --shadow-sm: ${spectraShadowSm} !important;\n`;
    }

    if (spectraShadowMd) {
      css += `  --shadow-md: ${spectraShadowMd} !important;\n`;
      const blur = parseInt(spectraShadowMd.match(/(\d+)px/)?.[1] || '12');
      css += `  --shadow-lg: 0 ${blur * 2}px ${blur * 2}px rgba(0,0,0,0.4) !important;\n`;
      css += `  --shadow-xl: 0 ${blur * 3}px ${blur * 3}px rgba(0,0,0,0.5) !important;\n`;
    }

    // Spacing scale
    if (spectraSpaceUnit) {
      const baseValue = parseFloat(spectraSpaceUnit);
      css += `  --space-xs: ${baseValue * 0.25}rem !important;\n`;
      css += `  --space-sm: ${baseValue * 0.5}rem !important;\n`;
      css += `  --space-md: ${baseValue * 0.75}rem !important;\n`;
      css += `  --space-lg: ${baseValue}rem !important;\n`;
      css += `  --space-xl: ${baseValue * 1.5}rem !important;\n`;
      css += `  --space-2xl: ${baseValue * 2}rem !important;\n`;
      css += `  --space-3xl: ${baseValue * 3}rem !important;\n`;
      css += `  --space-4xl: ${baseValue * 4}rem !important;\n`;
    }

    // Typography scale
    if (spectraTypeRatio) {
      const ratio = parseFloat(spectraTypeRatio);
      const base = 1; // 1rem = 16px
      css += `  --font-size-xs: ${base * 0.75}rem !important;\n`;
      css += `  --font-size-sm: ${base * 0.875}rem !important;\n`;
      css += `  --font-size-base: ${base}rem !important;\n`;
      css += `  --font-size-lg: ${base * ratio}rem !important;\n`;
      css += `  --font-size-xl: ${base * Math.pow(ratio, 1.5)}rem !important;\n`;
      css += `  --font-size-2xl: ${base * Math.pow(ratio, 2)}rem !important;\n`;
      css += `  --font-size-3xl: ${base * Math.pow(ratio, 2.5)}rem !important;\n`;
      css += `  --font-size-4xl: ${base * Math.pow(ratio, 3)}rem !important;\n`;
    }

    // Font weights
    if (spectraFontWeightHeading) {
      css += `  --font-weight-semibold: ${spectraFontWeightHeading} !important;\n`;
      css += `  --font-weight-bold: ${Math.min(parseInt(spectraFontWeightHeading) + 100, 900)} !important;\n`;
    }

    css += '}\n';

    // Inject CSS
    const style = document.createElement('style');
    style.id = 'spectra-override';
    style.textContent = css;
    document.head.appendChild(style);

    console.log('✅ Spectra Bridge: Theme applied to Haberdash via CSS injection');
    console.log('CSS injected:\n' + css);
  }

  // Wait for Spectra theme to load
  window.addEventListener('spectra-theme-loaded', (e) => {
    console.log('🌈 Spectra Bridge: Theme loaded event received!');
    spectraReady = true;
    applyTheme();
  });

  // Also apply after all CSS loads
  window.addEventListener('load', () => {
    console.log('🔗 Spectra Bridge: Window loaded, re-applying theme...');
    if (spectraReady) {
      applyTheme();
    }
  });

  console.log('🔗 Spectra Bridge: Event listeners registered');

  // Helper functions
  function hexToRGB(hex) {
    // Handle hsl() format
    if (hex.startsWith('hsl')) {
      const match = hex.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (match) {
        const [_, h, s, l] = match.map(Number);
        return hslToRGB(h, s, l);
      }
      return null;
    }

    // Handle hex format
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function hslToRGB(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  function lightenRGB(rgb, percent) {
    return {
      r: Math.min(255, Math.round(rgb.r + (255 - rgb.r) * (percent / 100))),
      g: Math.min(255, Math.round(rgb.g + (255 - rgb.g) * (percent / 100))),
      b: Math.min(255, Math.round(rgb.b + (255 - rgb.b) * (percent / 100)))
    };
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
})();

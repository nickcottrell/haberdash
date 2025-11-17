/**
 * Spectra Bridge for Haberdash
 * Maps Spectra-generated CSS variables to Haberdash's variable names
 */

(function() {
  // Wait for Spectra theme to load
  window.addEventListener('spectra-theme-loaded', (e) => {
    console.log('🌈 Spectra theme loaded, applying to Haberdash...');

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

    if (spectraPrimary) {
      root.style.setProperty('--primary', spectraPrimary);
      root.style.setProperty('--primary-hover', spectraPrimaryDark);
      root.style.setProperty('--primary-light', spectraPrimaryLight);

      // Update gradient to use new primary colors
      root.style.setProperty('--gradient-primary',
        `linear-gradient(135deg, ${spectraPrimary} 0%, ${spectraPrimaryDark} 100%)`);
    }

    if (spectraBackground) {
      root.style.setProperty('--background', spectraBackground);
    }

    if (spectraSurface) {
      root.style.setProperty('--surface', spectraSurface);

      // Generate lighter surface variations based on Spectra surface
      const surfaceRGB = hexToRGB(spectraSurface);
      if (surfaceRGB) {
        const lighter = lightenRGB(surfaceRGB, 10);
        const lightest = lightenRGB(surfaceRGB, 20);
        root.style.setProperty('--surface-light', rgbToHex(lighter.r, lighter.g, lighter.b));
        root.style.setProperty('--surface-lighter', rgbToHex(lightest.r, lightest.g, lightest.b));
      }
    }

    if (spectraText) {
      root.style.setProperty('--text', spectraText);
    }

    if (spectraTextDim) {
      root.style.setProperty('--text-secondary', spectraTextDim);
    }

    // Border Radius
    const spectraBorderBase = computed.getPropertyValue('--border-radius-base').trim();
    const spectraBorderLg = computed.getPropertyValue('--border-radius-lg').trim();

    if (spectraBorderBase) {
      root.style.setProperty('--radius-sm', `${parseInt(spectraBorderBase) / 2}px`);
      root.style.setProperty('--radius-md', spectraBorderBase);
    }

    if (spectraBorderLg) {
      root.style.setProperty('--radius-lg', spectraBorderLg);
      root.style.setProperty('--radius-xl', `${parseInt(spectraBorderLg) * 1.33}px`);
    }

    // Shadows
    const spectraShadowSm = computed.getPropertyValue('--shadow-sm').trim();
    const spectraShadowMd = computed.getPropertyValue('--shadow-md').trim();

    if (spectraShadowSm) {
      root.style.setProperty('--shadow-sm', spectraShadowSm);
    }

    if (spectraShadowMd) {
      root.style.setProperty('--shadow-md', spectraShadowMd);
      // Generate larger shadows based on md
      const blur = parseInt(spectraShadowMd.match(/(\d+)px/)?.[1] || '12');
      root.style.setProperty('--shadow-lg', `0 ${blur * 2}px ${blur * 2}px rgba(0,0,0,0.4)`);
      root.style.setProperty('--shadow-xl', `0 ${blur * 3}px ${blur * 3}px rgba(0,0,0,0.5)`);
    }

    // Spacing
    const spectraSpaceUnit = computed.getPropertyValue('--space-unit').trim();

    if (spectraSpaceUnit) {
      const baseValue = parseFloat(spectraSpaceUnit);
      root.style.setProperty('--space-xs', `${baseValue * 0.25}rem`);
      root.style.setProperty('--space-sm', `${baseValue * 0.5}rem`);
      root.style.setProperty('--space-md', `${baseValue * 0.75}rem`);
      root.style.setProperty('--space-lg', `${baseValue}rem`);
      root.style.setProperty('--space-xl', `${baseValue * 1.5}rem`);
      root.style.setProperty('--space-2xl', `${baseValue * 2}rem`);
      root.style.setProperty('--space-3xl', `${baseValue * 3}rem`);
      root.style.setProperty('--space-4xl', `${baseValue * 4}rem`);
    }

    // Typography
    const spectraTypeRatio = computed.getPropertyValue('--type-ratio').trim();
    const spectraFontWeightHeading = computed.getPropertyValue('--font-weight-heading').trim();

    if (spectraTypeRatio) {
      const ratio = parseFloat(spectraTypeRatio);
      const base = 1; // 1rem = 16px

      root.style.setProperty('--font-size-xs', `${base * 0.75}rem`);
      root.style.setProperty('--font-size-sm', `${base * 0.875}rem`);
      root.style.setProperty('--font-size-base', `${base}rem`);
      root.style.setProperty('--font-size-lg', `${base * ratio}rem`);
      root.style.setProperty('--font-size-xl', `${base * Math.pow(ratio, 1.5)}rem`);
      root.style.setProperty('--font-size-2xl', `${base * Math.pow(ratio, 2)}rem`);
      root.style.setProperty('--font-size-3xl', `${base * Math.pow(ratio, 2.5)}rem`);
      root.style.setProperty('--font-size-4xl', `${base * Math.pow(ratio, 3)}rem`);
    }

    if (spectraFontWeightHeading) {
      root.style.setProperty('--font-weight-semibold', spectraFontWeightHeading);
      root.style.setProperty('--font-weight-bold', Math.min(parseInt(spectraFontWeightHeading) + 100, 900));
    }

    console.log('✅ Spectra theme applied to Haberdash');
  });

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

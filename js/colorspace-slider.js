/**
 * ColorSpaceSlider - A configurable slider component for any color space
 * Renders sliders, presets, and handles value updates based on JSON configuration
 */
class ColorSpaceSlider {
  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    this.config = config;
    this.sliders = {};
    this.outputs = {};
    this.values = {};

    // Initialize default values
    this.config.channels.forEach(channel => {
      this.values[channel.id] = channel.default;
    });

    this.render();
    this.attachEventListeners();
  }

  /**
   * Render the complete slider component
   */
  render() {
    this.container.innerHTML = `
      <div class="colorspace-slider" data-colorspace="${this.config.colorSpace}">
        ${this.renderSliders()}
        ${this.renderPresets()}
      </div>
    `;
  }

  /**
   * Render all slider channels
   */
  renderSliders() {
    const slidersHTML = this.config.channels.map(channel => {
      const initialLabel = this.getValueLabel(channel, channel.default);

      return `
        <div class="slider" data-channel="${channel.id}">
          <div style="margin-bottom: 0.75em;">
            <div style="font-size: 1.5em; font-weight: bold; color: var(--text-heading, #111); margin-bottom: 0.25em;">
              ${channel.name}
            </div>
            <div style="color: var(--text-secondary, #666); font-size: 0.875em;">
              ${channel.description}
            </div>
          </div>
          <div class="slider__track">
            <input
              type="range"
              id="${this.config.colorSpace}-${channel.id}-slider"
              class="slider__input"
              min="${channel.min}"
              max="${channel.max}"
              value="${channel.default}"
              data-channel-id="${channel.id}"
              aria-valuemin="${channel.min}"
              aria-valuemax="${channel.max}"
              aria-valuenow="${channel.default}"
            >
          </div>
          <div class="slider__labels">
            <span>${channel.labels.min}</span>
            <span>${channel.labels.max}</span>
          </div>
          <output
            for="${this.config.colorSpace}-${channel.id}-slider"
            class="slider__output"
            style="margin-top: 0.75em;">
            ${initialLabel}
          </output>
        </div>
      `;
    }).join('');

    return `
      <div class="slider-group" style="display: flex; flex-direction: column; gap: 1.5em;">
        ${slidersHTML}
      </div>
    `;
  }

  /**
   * Render preset buttons if configured
   */
  renderPresets() {
    if (!this.config.presets || this.config.presets.length === 0) {
      return '';
    }

    const presetsHTML = this.config.presets.map((preset, index) => {
      const isChecked = index === 0 ? 'checked' : '';
      const dataAttrs = Object.entries(preset.values)
        .map(([key, val]) => `data-${key}="${val}"`)
        .join(' ');

      // Check if theme is live or base
      const isLiveTheme = document.documentElement.getAttribute('data-theme') === 'live';

      if (isLiveTheme) {
        // Spectra theme - hidden radio with card styling
        return `
          <label class="preset-card" style="display: block; cursor: pointer;">
            <input
              type="radio"
              name="${this.config.colorSpace}-preset"
              value="${preset.hex || preset.name}"
              ${dataAttrs}
              ${isChecked}
              style="position: absolute; opacity: 0; pointer-events: none;"
            >
            <div class="preset-card__inner" style="background: var(--surface-light); border: 2px solid var(--border); border-radius: var(--radius-md); padding: 1.25em; text-align: center; transition: all var(--transition-base); box-shadow: var(--shadow-sm);">
              ${preset.hex ? `<div style="display: inline-block; width: 3em; height: 3em; background: ${preset.hex}; border: 2px solid var(--border); border-radius: var(--radius-sm); margin-bottom: 0.75em; box-shadow: var(--shadow-sm);"></div>` : ''}
              <div style="font-weight: 600; color: var(--text-heading); margin-bottom: 0.25em;">${preset.name}</div>
              ${preset.hex ? `<div style="font-size: 0.875em; font-family: monospace; color: var(--text-secondary);">${preset.hex}</div>` : ''}
            </div>
          </label>
        `;
      } else {
        // Base theme - visible radio with simple layout
        return `
          <label class="preset-card" style="display: flex; align-items: flex-start; gap: 0.5em; cursor: pointer; border: 2px solid #000; padding: 1em;">
            <input
              type="radio"
              name="${this.config.colorSpace}-preset"
              value="${preset.hex || preset.name}"
              ${dataAttrs}
              ${isChecked}
              style="margin-top: 0.25em;"
            >
            <div style="flex: 1;">
              ${preset.hex ? `<div style="display: inline-block; width: 2em; height: 2em; background: ${preset.hex}; border: 1px solid #000; margin-bottom: 0.5em;"></div>` : ''}
              <div style="font-weight: bold;">${preset.name}</div>
              ${preset.hex ? `<div style="font-size: 0.75em; font-family: monospace;">${preset.hex}</div>` : ''}
            </div>
          </label>
        `;
      }
    }).join('');

    return `
      <fieldset style="border: none; padding: 0; margin: 0; margin-top: 2em;">
        <legend style="font-weight: 600; margin-bottom: 1em; color: var(--text-heading, #000); font-size: 1.125em;">
          Presets
        </legend>
        <div class="preset-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em;">
          ${presetsHTML}
        </div>
      </fieldset>
    `;
  }

  /**
   * Get the appropriate label for a value
   */
  getValueLabel(channel, value) {
    const numValue = parseInt(value);

    // Find the appropriate label based on thresholds
    for (let i = channel.valueLabels.length - 1; i >= 0; i--) {
      if (numValue >= channel.valueLabels[i].threshold) {
        return channel.valueLabels[i].label;
      }
    }

    return channel.valueLabels[0].label;
  }

  /**
   * Attach event listeners to sliders and presets
   */
  attachEventListeners() {
    // Slider event listeners
    this.config.channels.forEach(channel => {
      const sliderId = `${this.config.colorSpace}-${channel.id}-slider`;
      const slider = document.getElementById(sliderId);
      const output = document.querySelector(`output[for="${sliderId}"]`);

      if (slider && output) {
        this.sliders[channel.id] = slider;
        this.outputs[channel.id] = output;

        slider.addEventListener('input', (e) => {
          const value = parseInt(e.target.value);
          this.values[channel.id] = value;
          output.textContent = this.getValueLabel(channel, value);

          // Dispatch custom event for external listeners
          this.container.dispatchEvent(new CustomEvent('colorspace-change', {
            detail: {
              colorSpace: this.config.colorSpace,
              values: { ...this.values }
            }
          }));
        });
      }
    });

    // Preset event listeners
    const presetRadios = this.container.querySelectorAll(`input[name="${this.config.colorSpace}-preset"]`);
    presetRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          // Update all channel values from preset
          this.config.channels.forEach(channel => {
            const value = parseInt(e.target.dataset[channel.id]);
            if (!isNaN(value)) {
              this.values[channel.id] = value;
              if (this.sliders[channel.id]) {
                this.sliders[channel.id].value = value;
              }
              if (this.outputs[channel.id]) {
                this.outputs[channel.id].textContent = this.getValueLabel(channel, value);
              }
            }
          });

          // Update preset card styling for live theme
          this.updatePresetCardStyles();

          // Dispatch custom event
          this.container.dispatchEvent(new CustomEvent('colorspace-change', {
            detail: {
              colorSpace: this.config.colorSpace,
              values: { ...this.values },
              preset: e.target.value
            }
          }));
        }
      });
    });

    // Initialize preset card styling
    this.updatePresetCardStyles();
  }

  /**
   * Update visual styling of preset cards (for live theme)
   */
  updatePresetCardStyles() {
    const presetRadios = this.container.querySelectorAll(`input[name="${this.config.colorSpace}-preset"]`);
    presetRadios.forEach(radio => {
      const cardInner = radio.parentElement.querySelector('.preset-card__inner');
      if (cardInner) {
        if (radio.checked) {
          cardInner.style.borderWidth = '3px';
          cardInner.style.borderColor = 'var(--primary)';
          cardInner.style.background = 'var(--primary-light, var(--surface))';
          cardInner.style.transform = 'scale(1.02)';
          cardInner.style.boxShadow = 'var(--shadow-md)';
        } else {
          cardInner.style.borderWidth = '2px';
          cardInner.style.borderColor = 'var(--border)';
          cardInner.style.background = 'var(--surface-light)';
          cardInner.style.transform = 'scale(1)';
          cardInner.style.boxShadow = 'var(--shadow-sm)';
        }
      }
    });
  }

  /**
   * Get current values
   */
  getValues() {
    return { ...this.values };
  }

  /**
   * Set values programmatically
   */
  setValues(newValues) {
    Object.entries(newValues).forEach(([channelId, value]) => {
      const channel = this.config.channels.find(ch => ch.id === channelId);
      if (channel) {
        this.values[channelId] = value;
        if (this.sliders[channelId]) {
          this.sliders[channelId].value = value;
        }
        if (this.outputs[channelId]) {
          this.outputs[channelId].textContent = this.getValueLabel(channel, value);
        }
      }
    });
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ColorSpaceSlider;
}

/**
 * Haberdash.js
 * Modular UI component utilities
 */

const Haberdash = {
    /**
     * Toast notification system
     */
    toast: {
        show(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('removing');
                setTimeout(() => toast.remove(), 300);
            }, duration);

            return toast;
        },

        success(message, duration) {
            return this.show(message, 'success', duration);
        },

        error(message, duration) {
            return this.show(message, 'error', duration);
        },

        warning(message, duration) {
            return this.show(message, 'warning', duration);
        },

        info(message, duration) {
            return this.show(message, 'info', duration);
        }
    },

    /**
     * Slider control utilities
     */
    slider: {
        /**
         * Initialize a slider with value display mapping
         * @param {string} sliderId - The ID of the range input
         * @param {function|object} displayMap - Function or object mapping values to display text
         */
        init(sliderId, displayMap) {
            const slider = document.getElementById(sliderId);
            const display = document.getElementById(`${sliderId}-display`);

            if (!slider || !display) {
                console.warn(`Slider or display not found for ID: ${sliderId}`);
                return;
            }

            const updateDisplay = (value) => {
                if (typeof displayMap === 'function') {
                    display.textContent = displayMap(value);
                } else if (typeof displayMap === 'object') {
                    display.textContent = displayMap[value] || value;
                }
            };

            slider.addEventListener('input', (e) => {
                updateDisplay(parseInt(e.target.value));
            });

            // Initialize display
            updateDisplay(parseInt(slider.value));

            return {
                getValue: () => parseInt(slider.value),
                setValue: (value) => {
                    slider.value = value;
                    updateDisplay(value);
                }
            };
        },

        /**
         * Set preset values for multiple sliders
         * @param {object} presetValues - Object mapping slider IDs to values
         */
        setPreset(presetValues) {
            Object.entries(presetValues).forEach(([sliderId, value]) => {
                const slider = document.getElementById(sliderId);
                if (slider) {
                    slider.value = value;
                    slider.dispatchEvent(new Event('input'));
                }
            });
        }
    },

    /**
     * Preset button utilities
     */
    preset: {
        /**
         * Initialize preset buttons with active state management
         * @param {string} containerSelector - CSS selector for preset container
         */
        init(containerSelector) {
            const container = document.querySelector(containerSelector);
            if (!container) return;

            container.addEventListener('click', (e) => {
                const button = e.target.closest('.preset-button');
                if (!button) return;

                // Remove active state from all buttons in this container
                container.querySelectorAll('.preset-button').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active state to clicked button
                button.classList.add('active');
            });
        }
    },

    /**
     * Loading state utilities
     */
    loading: {
        /**
         * Show loading state
         * @param {string} selector - CSS selector for loading element
         */
        show(selector = '#loading') {
            const element = document.querySelector(selector);
            if (element) element.style.display = 'block';
        },

        /**
         * Hide loading state
         * @param {string} selector - CSS selector for loading element
         */
        hide(selector = '#loading') {
            const element = document.querySelector(selector);
            if (element) element.style.display = 'none';
        },

        /**
         * Toggle loading state
         * @param {boolean} show - Whether to show or hide
         * @param {string} loadingSelector - Selector for loading element
         * @param {string} contentSelector - Selector for content element
         */
        toggle(show, loadingSelector = '#loading', contentSelector = '#content') {
            const loading = document.querySelector(loadingSelector);
            const content = document.querySelector(contentSelector);

            if (loading) loading.style.display = show ? 'block' : 'none';
            if (content) content.style.display = show ? 'none' : 'block';
        }
    },

    /**
     * Form validation utilities
     */
    form: {
        /**
         * Add error state to form field
         * @param {HTMLElement} input - The input element
         * @param {string} message - Error message to display
         */
        setError(input, message) {
            input.classList.add('error');

            // Remove existing error message
            const existingError = input.parentElement.querySelector('.form-error');
            if (existingError) existingError.remove();

            // Add new error message
            if (message) {
                const error = document.createElement('span');
                error.className = 'form-error';
                error.textContent = message;
                input.parentElement.appendChild(error);
            }
        },

        /**
         * Clear error state from form field
         * @param {HTMLElement} input - The input element
         */
        clearError(input) {
            input.classList.remove('error');
            const error = input.parentElement.querySelector('.form-error');
            if (error) error.remove();
        },

        /**
         * Validate required fields
         * @param {string} formSelector - CSS selector for form
         * @returns {boolean} Whether form is valid
         */
        validate(formSelector) {
            const form = document.querySelector(formSelector);
            if (!form) return false;

            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    this.setError(field, 'This field is required');
                    isValid = false;
                } else {
                    this.clearError(field);
                }
            });

            return isValid;
        }
    },

    /**
     * Modal utilities
     */
    modal: {
        /**
         * Create and show a modal
         * @param {object} options - Modal configuration
         */
        show({ title, content, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h3>${title}</h3>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-cancel">${cancelText}</button>
                        <button class="btn btn-primary modal-confirm">${confirmText}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            const confirmBtn = modal.querySelector('.modal-confirm');
            const cancelBtn = modal.querySelector('.modal-cancel');

            const close = () => {
                modal.remove();
            };

            confirmBtn.addEventListener('click', () => {
                if (onConfirm) onConfirm();
                close();
            });

            cancelBtn.addEventListener('click', () => {
                if (onCancel) onCancel();
                close();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    if (onCancel) onCancel();
                    close();
                }
            });

            return { close };
        }
    },

    /**
     * Utility functions
     */
    utils: {
        /**
         * Debounce function calls
         * @param {function} func - Function to debounce
         * @param {number} wait - Wait time in milliseconds
         */
        debounce(func, wait = 300) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Format date to locale string
         * @param {Date|string} date - Date to format
         */
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        /**
         * Format time to locale string
         * @param {Date|string} date - Date to format
         */
        formatTime(date) {
            return new Date(date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        /**
         * Copy text to clipboard
         * @param {string} text - Text to copy
         */
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                Haberdash.toast.success('Copied to clipboard');
            } catch (err) {
                Haberdash.toast.error('Failed to copy');
            }
        }
    }
};

// Export for use in modules or make globally available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Haberdash;
} else {
    window.Haberdash = Haberdash;
}

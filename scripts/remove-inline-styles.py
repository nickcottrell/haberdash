#!/usr/bin/env python3
"""
Remove inline styles from HTML files and replace with CSS classes.
"""

import re
import sys

def remove_inline_styles(content):
    replacements = [
        # Spacing utilities
        (r' style="margin-top: 0\.5em;"', ' class="mt-sm"'),
        (r' style="margin-top: 1em;"', ' class="mt-md"'),
        (r' style="margin-top: 1\.5em;"', ' class="mt-lg"'),
        (r' style="margin-top: 2em;"', ' class="mt-xl"'),
        (r' style="margin-bottom: 0\.5em;"', ' class="mb-sm"'),
        (r' style="margin-bottom: 1em;"', ' class="mb-md"'),
        (r' style="margin-bottom: 1\.5em;"', ' class="mb-lg"'),
        (r' style="margin-left: 0\.5em;"', ' class="ml-sm"'),
        (r' style="width: 100%;"', ' class="w-full"'),

        # Flex/Grid utilities
        (r' style="flex-wrap: wrap;"', ' class="flex--wrap"'),
        (r' style="display: grid; grid-template-columns: repeat\(3, 1fr\); gap: 1em;"', ''),
        (r' style="display: block; cursor: pointer;"', ''),
        (r' style="position: absolute; opacity: 0; pointer-events: none;"', ' class="preset-card__input"'),
        (r' style="display: flex; flex-direction: column; gap: 1\.5em;"', ''),

        # Text utilities
        (r' style="color: var\(--text-secondary\);"', ' class="text-secondary"'),
        (r' style="color: var\(--text-secondary\); margin-bottom: 1\.5em;"', ' class="text-secondary mb-lg"'),
        (r' style="margin-bottom: 1em; color: var\(--text-secondary\);"', ' class="mb-md text-secondary"'),
        (r' style="color: var\(--text-secondary\); font-size: 0\.875em; margin: 0;"', ' class="slider__description"'),
        (r' style="margin-bottom: 0\.75em;"', ' class="slider__header"'),
        (r' style="margin-top: 0\.75em;"', ' class="mt-md"'),
        (r' style="margin-bottom: 0\.25em;"', ''),

        # Preset card inline styles
        (r' style="background: var\(--surface-light\); border: 2px solid var\(--border\); border-radius: var\(--radius-md\); padding: 1\.25em; text-align: center; transition: all var\(--transition-base\); box-shadow: var\(--shadow-sm\);"', ''),
        (r' style="display: inline-block; width: 3em; height: 3em; background: (#[0-9A-F]{6}); border: 2px solid var\(--border\); border-radius: var\(--radius-sm\); margin-bottom: 0\.75em; box-shadow: var\(--shadow-sm\);"', r' class="preset-card__swatch" style="background: \1;"'),
        (r' style="font-weight: 600; color: var\(--text-heading\); margin-bottom: 0\.25em;"', ' class="preset-card__title"'),
        (r' style="font-size: 0\.875em; font-family: monospace; color: var\(--text-secondary\);"', ' class="preset-card__value"'),

        # Other
        (r' style="background: var\(--surface\); border: 2px solid var\(--border\); border-radius: var\(--radius-lg\); padding: 2em; box-shadow: var\(--shadow-md\);"', ''),
        (r' style="border: none; padding: 0; margin: 0; margin-top: 2em;"', ' class="mt-xl"'),
        (r' style="font-weight: 600; margin-bottom: 1em; color: var\(--text-heading\); font-size: 1\.125em;"', ''),
        (r' style="margin-top: 2em; margin-bottom: 1em; font-size: 1\.25em;"', ' class="mt-xl mb-md"'),
        (r' style="font-size: 1\.25em; margin-bottom: 0\.5em;"', ' class="mb-sm"'),
        (r' style="color: red;"', ' class="text-error"'),
        (r' style="color: var\(--text-secondary\); margin-top: 0\.5em;"', ' class="text-secondary mt-sm"'),
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    return content

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python remove-inline-styles.py <html-file>")
        sys.exit(1)

    filename = sys.argv[1]

    with open(filename, 'r') as f:
        content = f.read()

    updated_content = remove_inline_styles(content)

    with open(filename, 'w') as f:
        f.write(updated_content)

    print(f"Updated {filename}")

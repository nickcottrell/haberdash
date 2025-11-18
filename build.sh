#!/bin/bash
# Build script for Haberdash - generates hash-based filenames for cache busting

echo "🔨 Building Haberdash..."

# Generate hash from file content
THEME_HASH=$(md5 -q js/spectra-theme.js | cut -c1-8)
BRIDGE_HASH=$(md5 -q js/spectra-bridge.js | cut -c1-8)

# Copy files with hashed names
cp js/spectra-theme.js js/spectra-theme.${THEME_HASH}.js
cp js/spectra-bridge.js js/spectra-bridge.${BRIDGE_HASH}.js

# Update index.html with hashed filenames
sed -i.bak "s|js/spectra-theme\.js[^\"]*|js/spectra-theme.${THEME_HASH}.js|g" index.html
sed -i.bak "s|js/spectra-bridge\.js[^\"]*|js/spectra-bridge.${BRIDGE_HASH}.js|g" index.html
rm index.html.bak

echo "✅ Built with hashes:"
echo "   spectra-theme.${THEME_HASH}.js"
echo "   spectra-bridge.${BRIDGE_HASH}.js"

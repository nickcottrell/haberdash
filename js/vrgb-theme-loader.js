/**
 * VRGB Theme Loader - Direct Token Application
 * Fetches VRGB values from Spectra node and gets pre-calculated tokens from builder API
 *
 * This replaces spectra-theme.js's variance calculations with direct token application
 * from the VRGB builder's token_generator.py for consistent theming.
 *
 * Usage:
 *   <script src="js/vrgb-theme-loader.js"
 *           data-node-id="haberdash-ui-theme"
 *           data-node-api="http://localhost:8888/api/node"
 *           data-token-api="http://localhost:8888/api/generate">
 *   </script>
 */

(async function() {
  const scriptTag = document.currentScript;
  const nodeId = scriptTag?.getAttribute('data-node-id') || 'haberdash-ui-theme';

  // Auto-detect environment: use localhost if on localhost, otherwise use production
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const defaultNodeApi = isLocal ? 'http://localhost:8888/api/node' : 'https://zf8klzvd4k.execute-api.us-east-2.amazonaws.com/prod/api/node';
  const defaultTokenApi = isLocal ? 'http://localhost:8888/api/generate' : 'https://zf8klzvd4k.execute-api.us-east-2.amazonaws.com/prod/api/generate';

  const nodeApiEndpoint = scriptTag?.getAttribute('data-node-api') || defaultNodeApi;
  const tokenApiEndpoint = scriptTag?.getAttribute('data-token-api') || defaultTokenApi;
  const debug = scriptTag?.hasAttribute('data-debug');

  if (debug) console.log('🌈 VRGB Theme Loader: Starting...', { nodeId, nodeApiEndpoint, tokenApiEndpoint });

  try {
    // Step 1: Fetch Spectra node to get VRGB values
    const cacheBuster = Date.now();
    const nodeResponse = await fetch(`${nodeApiEndpoint}?node_id=${nodeId}&t=${cacheBuster}`, {
      cache: 'no-store'
    });

    if (!nodeResponse.ok) throw new Error(`Failed to fetch node: ${nodeResponse.status}`);

    const nodeData = await nodeResponse.json();
    if (debug) console.log('🌈 VRGB Theme Loader: Node data received', nodeData);

    // Check if node has VRGB values stored directly
    if (!nodeData.vrgb) {
      throw new Error('Node missing VRGB values - please publish theme from builder');
    }

    // Check if unstyled mode is enabled
    if (nodeData.unstyled) {
      if (debug) console.log('🌈 VRGB Theme Loader: Unstyled mode enabled');
      // Apply unstyled (Craigslist) mode
      document.documentElement.setAttribute('data-unstyled', 'true');
      document.documentElement.classList.add('vrgb-theme-loaded');
      document.documentElement.setAttribute('data-theme', 'unstyled');

      window.dispatchEvent(new CustomEvent('vrgb-theme-loaded', {
        detail: { nodeData, nodeId, unstyled: true }
      }));

      return; // Exit early - no need to fetch tokens
    }

    const vrgb = nodeData.vrgb;
    if (debug) console.log('🌈 VRGB Theme Loader: VRGB values', vrgb);

    // Step 2: Fetch tokens from builder API using VRGB values
    const params = new URLSearchParams({
      d1_hsl: vrgb.d1_hsl.join(','),
      d2_lab: vrgb.d2_lab.join(','),
      d3_lab: vrgb.d3_lab.join(','),
      d4_lab: vrgb.d4_lab.join(',')
    });

    const tokenResponse = await fetch(`${tokenApiEndpoint}?${params}`);
    if (!tokenResponse.ok) throw new Error(`Failed to fetch tokens: ${tokenResponse.status}`);

    const tokenData = await tokenResponse.json();
    if (debug) console.log('🌈 VRGB Theme Loader: Tokens received', tokenData.tokens);

    // Step 3: Apply tokens to :root
    const root = document.documentElement;
    Object.entries(tokenData.tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Mark theme as loaded
    document.documentElement.classList.add('vrgb-theme-loaded');
    document.documentElement.setAttribute('data-theme', 'live');

    if (debug) console.log('✅ VRGB Theme Loader: Theme applied successfully');

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('vrgb-theme-loaded', {
      detail: { nodeData, tokenData, nodeId }
    }));

  } catch (error) {
    console.error('❌ VRGB Theme Loader: Failed to load', error);
    document.documentElement.classList.add('vrgb-theme-fallback');
  }
})();

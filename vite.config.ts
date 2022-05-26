import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      http: 'agent-base',
      https: 'agent-base',
    },
  },
});

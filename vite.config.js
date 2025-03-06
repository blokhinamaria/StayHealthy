import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/StayHealthy/',
  build: {
    target: 'esnext', // Use modern JavaScript
    minify: 'terser', // Better minification than default 'esbuild'
    cssCodeSplit: true, // Split CSS for better caching
    sourcemap: false, // Set to true for debugging, false for smaller bundle
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separate vendor dependencies
          }
        }
      }
    }
  }
});
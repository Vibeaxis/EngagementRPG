import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/EngagementRPG/', // Add this line!
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // Standard port for local dev
    open: true, // Automatically opens the browser
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true if you need to debug production builds
    minify: 'terser', // Optimized for small bundle sizes
    rollupOptions: {
      output: {
        // Keeps your chunks organized
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});

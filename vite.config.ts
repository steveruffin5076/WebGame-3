import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// GitHub Pages serves this project from /WebGame-3/.
// A custom domain or user-page deploy would set base to '/'.
export default defineConfig({
  base: process.env.PUBLIC_BASE ?? '/WebGame-3/',
  plugins: [svelte()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 2048,
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});

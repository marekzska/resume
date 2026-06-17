import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resolve the workspace library from source so tests need no prebuilt dist.
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: /^warm-motion\/styles\.css$/,
        replacement: path.resolve(__dirname, './packages/warm-motion/src/styles.css'),
      },
      { find: /^warm-motion$/, replacement: path.resolve(__dirname, './packages/warm-motion/src/index.ts') },
    ],
  },
  // esbuild (not plugin-react) transforms test JSX here; the root solution tsconfig
  // sets no `jsx`, so force the automatic runtime explicitly.
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})

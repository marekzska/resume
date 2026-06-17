import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'warm-motion.js' : 'warm-motion.cjs'),
    },
    rollupOptions: {
      // Keep React + framer-motion as peer deps; the consumer provides them.
      external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
    },
  },
})

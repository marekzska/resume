import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const fonts = Object.keys(ctx.bundle).filter((file) =>
          /(fraunces-latin-standard|geist-latin-wght)-normal-[\w-]+\.woff2$/.test(file),
        )
        return {
          html,
          tags: fonts.map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `/${file}`,
              crossorigin: '',
            },
            injectTo: 'head-prepend',
          })),
        }
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  resolve: {
    // Consume the workspace library from source so dev/build never depend on a
    // prebuilt dist; the published dist is still built+validated for npm.
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: /^warm-motion\/styles\.css$/,
        replacement: path.resolve(__dirname, './packages/warm-motion/src/styles.css'),
      },
      { find: /^warm-motion$/, replacement: path.resolve(__dirname, './packages/warm-motion/src/index.ts') },
    ],
  },
})

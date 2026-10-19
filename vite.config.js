import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Keep technology logos as separate lazy-loaded files instead of
    // inlining them into the main JS bundle
    assetsInlineLimit: (filePath) => (filePath.includes('devicon') ? false : undefined),
  },
  server: {
    port: 5174,
    host: true,
    strictPort: true,
    // Allow temporary Cloudflare tunnel links for testing on phones
    allowedHosts: ['.trycloudflare.com'],
  },
})


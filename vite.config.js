import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',                       // project root is the repo root
  publicDir: false,                // we’re not using /public for static HTML
  server: { host: true },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'          // <-- force Vite/Rollup to this entry
    }
  }
})

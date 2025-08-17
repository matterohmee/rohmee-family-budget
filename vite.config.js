import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',                       // project root is the repo root
  publicDir: false,                // we're not using /public for static HTML
  server: { 
    host: '0.0.0.0',
    port: 5173,
    cors: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'          // <-- force Vite/Rollup to this entry
    }
  }
})

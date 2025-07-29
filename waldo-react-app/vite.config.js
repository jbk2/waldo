import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base Vite config, extended for component and integration tests in namespaced config files:
// vitest.config.components.js & vitest.config.integration.js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:5173'
      }
    },
    pool: 'forks', // Forces sequential execution
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
})
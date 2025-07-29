import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './vite.config.js'

export default defineConfig(mergeConfig(baseConfig, {
  test: {
    setupFiles: './src/tests/setup.integration.js',
  },
})) 
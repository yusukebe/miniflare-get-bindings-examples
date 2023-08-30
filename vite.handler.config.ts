import { defineConfig } from 'vite'
import devServer from './src/vite-plugins/dev-server'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/workers/handler.ts',
      bindings: {
        TOKEN: 'FOO'
      }
    })
  ]
})

import { defineConfig } from 'vite'
import devServer from './src/vite-plugins/dev-server'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/workers/hono.tsx',
      kvNamespaces: ['MY_KV']
    })
  ]
})

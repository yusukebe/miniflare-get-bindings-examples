import { defineConfig } from 'vite'
import devServer from './src/vite-plugins/dev-server'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/workers/hono-vite.tsx',
      kvNamespaces: ['MY_KV']
    })
  ]
})

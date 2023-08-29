import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Miniflare } from 'miniflare'

type Bindings = {
  TOKEN: string
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()
app.get('/', async (c) => {
  await c.env.MY_KV.put('key', 'bar')
  const kvValue = await c.env.MY_KV.get('key')
  return c.text(`My TOKEN is ${c.env.TOKEN}, KV Value is ${kvValue}`)
})

const nullScript = 'addEventListener("fetch", (event) => event.respondWith(new Response(null, { status: 404 })));'
const mf = new Miniflare({
  modules: true,
  script: nullScript,
  bindings: {
    TOKEN: 'FOO'
  },
  kvNamespaces: ['MY_KV']
})

serve({
  fetch: async (req) => {
    const bindings = await mf.getBindings<Bindings>()
    return app.fetch(req, bindings)
  }
})

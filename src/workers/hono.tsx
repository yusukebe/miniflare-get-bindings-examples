import { Hono } from 'hono'

type Bindings = {
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

const noName = 'no name'
app.get('/', async (c) => {
  const name = (await c.env.MY_KV.get('name')) ?? noName
  const Page = () => (
    <html>
      <body>
        <h1>
          Miniflare <code>getBindings()</code> example
        </h1>
        <form action="/" method="post">
          <input type="text" name="name" placeholder="name" value="" />
          <input type="submit" />
        </form>
        <p>
          MY_KV: <b>{name}</b>
        </p>
      </body>
    </html>
  )
  return c.html(<Page />)
})

app.post('/', async (c) => {
  const { name } = await c.req.parseBody<{ name: string }>()
  await c.env.MY_KV.put('name', name ?? noName)
  return c.redirect('/')
})

app.onError((e, c) => {
  return c.text(e.message)
})

export default app

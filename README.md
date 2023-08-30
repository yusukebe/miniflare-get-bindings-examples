# Miniflare `getBindings()` Examples

This project showcases the new feature [`getBindings()` of Miniflare](https://github.com/cloudflare/miniflare/pull/639).

## Motivation

Before the introduction of this feature, we couldn't access bindings directly from Node.js. To utilize bindings, our Workers had to be run on `workerd` using the Wrangler commands `wrangler dev` or `wrangler pages dev`. This restriction meant that bindings were inaccessible from dev tools of frameworks like Vite, which is employed in SvelteKit, Qwik City, Astro, SolidStart, and others. The same limitation applies to the Remix or Next.js dev server.

For instance, Vite is known for its speed. While developing applications with Vite offers a pleasant experience, the `wrangler dev` and `wrangler pages dev` commands, though they have a hot reload feature, are slower in comparison.

The `getBindings()` feature in Miniflare presents a potential solution to this challenge.

## How It Works

`getBindings()` allows developers to access bindings outside of applications that aren't running on Miniflare or `workerd`. Here's a brief overview:

```ts
const mf = new Miniflare({
  script: nullScript,
  bindings: {
    TOKEN: 'FOO'
  }
})
const bindings = await mf.getBindings()
console.log(`My TOKEN is ${bindings.TOKEN}`)
```

[@hono/node-server](https://github.com/honojs/node-server) can manage Node.js's `IncomingMessage` and `ServerResponse`, allowing you to execute your Worker application on Node.js. With this setup, you can inject the bindings into your Worker.

```ts
const handler = {
  async fetch(_, env:Bindings) {
    return new Response(`My TOKEN is ${env.TOKEN}`)
  }
}

// The `serve` function will manage Node.js Request/Response
serve({
  fetch: async (req) => {
    const bindings = await mf.getBindings<Bindings>()
    return handler.fetch(req, bindings)
  }
})
```

Additionally, by creating a custom Vite dev-server, you can integrate bindings with Vite. You can also run it using the `wrangler dev` or `wrangler pages dev` commands, or deploy it to Cloudflare.

## Demo

https://github.com/yusukebe/miniflare-get-bindings-examples/assets/10682/a568e999-7e92-4a52-bf66-0a30211b250a

## Directory Structure

```plain
src
├── hono-basic.ts
├── vite-plugins
│   └── dev-server.ts
└── workers
    ├── handler.ts
    └── hono.tsx
```

## Installation

```plain
npm install
```

## Available Commands

* `dev:basic:hono`
* `dev:vite:handler`
* `dev:vite:hono`
* `dev:wrangler:hono`
* `dev:wrangler:handler`

To execute a command, use:

```plain
npm run dev:basic:hono
```

## Moving Forward

By adopting this approach, we can achieve a superior developer experience using the dev server of frameworks, such as the `vite` command, for Cloudflare Workers/Pages.

## Related Projects

Several projects aim to achieve our goal by using a proxy for Workers:

* https://github.com/leader22/cfw-bindings-wrangler-bridge
* https://github.com/james-elicx/cf-bindings-proxy

## Authors

* Yusuke Wada <https://github.com/yusukebe>

## License

MIT

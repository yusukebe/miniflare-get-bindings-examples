type Bindings = {
  TOKEN: string
}

const handler: ExportedHandler<Bindings> = {
  async fetch(_, env) {
    const html = `<!DOCTYPE html>
		<body>
		  <h1>Hello World</h1>
		  <p>Your TOKEN is <b>${env.TOKEN}</b></p>
		</body>`

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      }
    })
  }
}

export default handler

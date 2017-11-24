const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const mobxReact = require('mobx-react')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'


const app = next({ dev })
const handle = app.getRequestHandler()

mobxReact.useStaticRendering(true)

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/', ctx.query)
    ctx.respond = false
  })

  router.get('/article/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/article', ctx.query)
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

const Tiy = require('../dist').default

const app = new Tiy()

app.use(async (ctx, next) => {
  const { response, request } = ctx
  console.log(request.headers)
  console.log(request.method)

  ctx.response.res.end('123')
})

app.listen(3002)
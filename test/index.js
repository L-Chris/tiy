const Tiy = require('../dist').default

const app = new Tiy()

app.use(async (ctx, next) => {
  const res = ctx.response.res
  res.end('123')
})

app.listen(3000)
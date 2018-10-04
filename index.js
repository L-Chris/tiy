const Tiy = require('./Tiy')

exports.BaseController = require('./BaseController')

exports.BaseService = require('./BaseService')

exports.Tiy = async (ctx, next) => {
  ctx.seed = new Tiy(ctx)
  await next()
}
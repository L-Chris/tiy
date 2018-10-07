import { TiyContext } from "global"
import TiyCli from './TiyCli'

exports.BaseController = require('./BaseController')

exports.BaseService = require('./BaseService')

exports.TiyCli = async (ctx: TiyContext, next: Function) => {
  ctx.tiy = new TiyCli(ctx)
  await next()
}
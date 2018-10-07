import TiyContext from "../core/Context"

class BaseController {
  public ctx: TiyContext
  public service: any
  constructor (ctx: TiyContext) {
    this.ctx = ctx
  }
}

module.exports = BaseController
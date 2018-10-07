const { getDB, getTables, getControllers, getServices, getRoutes } = require('./utils')
const tables = getTables()
const services = getServices()
const controllers = getControllers()
const routes = getRoutes()

class TiyCli {
  public ctx: TiyContext
  public service: Object
  public controller: Object

  constructor (ctx) {
    this.ctx = ctx
    this.service = ctx.service = {}
    this.controller = {}

    this.init()
  }

  async init () {


    this.initDB()
    this.initService()
    this.initController()
  }

  initDB () {
    this.db = this.ctx.db = getDB()
    for (const key in tables) {
      this.db.query(tables[key], [])
    }
  }

  initService () {
    services.forEach(_ => {
      const Ctor = require(_.path)
      const instance = new Ctor(this.ctx)
      this.service[_.name] = instance
    })
  }

  initController () {
    controllers.forEach(_ => {
      const Ctor = require(_.path)
      const instance = new Ctor(this.ctx)
      this.controller[_.name] = instance
    })
  }
}

module.exports = TiyCli
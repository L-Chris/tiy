import { TiyContext } from 'global'

module.exports = class BaseService {
  static $table: string

  public ctx: TiyContext
  constructor (ctx: TiyContext) {
    this.ctx = ctx
  }

  async query (params) {
    return this.db.query(params)
  }

  async insert (params) {
    const values = Array.isArray(params) ? params : [params]
    return this.query({
      sql: `INSERT INTO ${this.$table} SET ?`,
      values,
      namedParameters: false
    })
  }
}
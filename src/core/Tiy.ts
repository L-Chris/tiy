import http, { Server, IncomingMessage, ServerResponse } from 'http'
import Emitter from 'events'
import Stream from 'stream'
import statuses from 'statuses'
import TiyContext from './Context'
import TiyRequest from './Request'
import TiyResponse from './Response'
import compose from '../utils'

class Tiy extends Emitter {
  private middlewares: Array<Function>
  private servers: Array<Server>
  private env: String

  constructor () {
    super()

    this.middlewares = []
    this.servers = []
    this.env = process.env.NODE_ENV || 'development'
  }

  listen (...args: Array<any>): Server {
    const server = http.createServer(this.callback())
    this.servers.push(server)
    return server.listen(...args)
  }

  use (fn: Function): this {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    this.middlewares.push(fn)
    return this
  }

  callback () {
    const fn = compose(this.middlewares)

    if (!this.listenerCount('error')) this.on('error', this.handleError)

    const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
  }

  handleRequest (ctx: TiyContext, fnMiddleware: Function) {
    return fnMiddleware(ctx)
      .then(this.handleResponse.bind(null, ctx))
      .catch((err: any) => {
        console.log(err)
      })
  }

  handleResponse (ctx: TiyContext) {
    const { res } = ctx.response
    const { statusCode } = res
    let body: any

    if (statuses.empty[statusCode]) {
      body = null
      return res.end()
    }

    if (Buffer.isBuffer(body)) return res.end(body)
    if (typeof body === 'string') return res.end(body)
    if (body instanceof Stream) return body.pipe(res)

    body = JSON.stringify(body)

    res.end(body)
  }

  handleError (err: any) {
    if (!(err instanceof Error)) throw new TypeError('non-error thrown: %j')

    const msg = err.stack || err.toString()
    console.error();
    console.error(msg.replace(/^/gm, '  '))
    console.error();
  }

  createContext (req: IncomingMessage, res: ServerResponse): TiyContext {
    const request = new TiyRequest(req)
    const response = new TiyResponse(res)
    const context = new TiyContext(this, request, response)

    return context
  }
}

export default Tiy
import { TiyContext } from 'global'
import Route from './Route'

const METHODS = [
  'HEAD',
  'OPTIONS',
  'GET',
  'PUT',
  'PATCH',
  'POST',
  'DELETE'
]

class Router {
  private opts: Object
  private methods: Array<string>
  private stack: Array<Route>

  constructor () {
    this.opts = {}
    this.methods = METHODS
    this.stack = []
  }

  createDispatcher () {
    const self = this
    function dispatch (ctx: TiyContext, next: Function) {}

    return dispatch
  }

  // create a route
  register (path: string, methods: Array<string>, middleware: Function) {}

  head (path: string, middleware: Function): this {
    this.register(path, ['head'], middleware)
    return this
  }

  options (path: string, middleware: Function): this {
    this.register(path, ['options'], middleware)
    return this
  }

  get (path: string, middleware: Function): this {
    this.register(path, ['get'], middleware)
    return this
  }

  put (path: string, middleware: Function): this {
    this.register(path, ['put'], middleware)
    return this
  }

  patch (path: string, middleware: Function): this {
    this.register(path, ['patch'], middleware)
    return this
  }

  post (path: string, middleware: Function): this {
    this.register(path, ['post'], middleware)
    return this
  }

  delete (path: string, middleware: Function): this {
    this.register(path, ['delete'], middleware)
    return this
  }
}

export default Router
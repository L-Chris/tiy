import { IncomingMessage } from 'http'
import {parse, format} from 'url'
import qs from 'querystring'
import accepts, { Accepts } from 'accepts'

class TiyRequest {
  public req: IncomingMessage
  private _accept: Accepts

  constructor (req: IncomingMessage) {
    this.req = req
  }

  get headers () {
    return this.req.headers
  }

  set headers (obj) {
    this.req.headers = obj
  }

  get accept () {
    return this._accept || (this._accept = accepts(this.req))
  }

  set accept (obj: Accepts) {
    this._accept = obj
  }

  get contentType () {
    const type = this.getHeader('Content-Type').toString()
    if (!type) return ''
    return type.split(';')[0]
  }

  get url () {
    return this.req.url
  }

  set url (val) {
    this.req.url = val
  }

  get path () {
    return parse(this.url).pathname
  }

  set path (val) {
    const url = parse(this.url)
    if (url.pathname === url.path) return

    url.pathname = val
    url.path = null

    this.url = format(url)
  }

  get query () {
    return qs.parse(this.querystring)
  }

  set query (obj) {
    this.querystring = qs.stringify(obj)
  }

  get querystring () {
    return parse(this.url).query || ''
  }

  set querystring (val) {
    const url = parse(this.url)
    if (url.search === `?${val}`) return

    url.search = val
    url.path = null

    this.url = format(url)
  }

  get search () {
    return `?${this.querystring}`
  }

  set search (val) {
    this.querystring = val
  }

  get method () {
    return this.req.method
  }

  set method (val) {
    this.req.method = val
  }

  getHeader (field: string) {
    field = field.toLowerCase()

    if (['referer', 'referrer'].indexOf(field) > 0) this.headers.referrer || this.headers.referer || ''
    return this.headers[field] || ''
  }
}

export default TiyRequest
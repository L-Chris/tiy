import { ServerResponse } from 'http'
import Stream from 'stream'
import statuses from 'statuses'
import assert from 'assert'
import { isType } from '../utils'

class TiyResponse {
  public res: ServerResponse
  private _body: String | Buffer | Object | Stream

  constructor (res: ServerResponse) {
    this.res = res
  }

  get headers () {
    return this.res.getHeaders()
  }

  get headerSent () {
    return this.res.headersSent
  }

  get status () {
    return this.res.statusCode
  }

  set status (code: number) {
    if (this.headerSent) return
    assert(typeof code === 'number', 'status code must be a number')
    assert(statuses[code], `invalid status code: ${code}`)

    this.res.statusCode = code
    if (this.body && statuses.empty[code]) this.body =null
  }

  get message () {
    return this.res.statusMessage || statuses[this.status]
  }

  set message (msg) {
    this.res.statusMessage = msg
  }

  get body () {
    return this._body
  }

  set body (val) {
    this._body = val

    // no content
    if (null == val) {
      if (!statuses.empty[this.status]) this.status = 204
      this.remove('Content-Type')
      this.remove('Content-Length')
      this.remove('Transfer-Encoding')
      return
    }
  }

  redirect (url: string) {}

  getHeader (field: string) {
    return this.headers[field.toLowerCase()] || ''
  }

  setHeader (field: any, val?: string | Array<string>) {
    if (this.headerSent) return;

    if (arguments.length === 2) {
      if (Array.isArray(val)) val = val.map(v => isType.string(val) ? v : String(v))
      else if (isType.string(val)) val = String(val)
      this.res.setHeader(field, val)
    } else {
      for (const key in field) {
        this.setHeader(key, field[key])
      }
    }
  }

  remove (field: string) {
    if (this.headerSent) return

    this.res.removeHeader(field)
  }
}

export default TiyResponse
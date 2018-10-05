import { Tiy, TiyRequest, TiyResponse } from 'global'

class TiyContext {
  public app: Tiy
  public request: TiyRequest
  public response: TiyResponse

  constructor (app: Tiy, request: TiyRequest, response: TiyResponse) {
    this.app = app
    this.request = request
    this.response = response
  }
}

export default TiyContext
import { ServerResponse } from 'http'

class TiyResponse {
  public res: ServerResponse

  constructor (res: ServerResponse) {
    this.res = res
  }
}

export default TiyResponse
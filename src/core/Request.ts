import { IncomingMessage } from 'http'

class TiyRequest {
  public req: IncomingMessage

  constructor (req: IncomingMessage) {
    this.req = req
  }
}

export default TiyRequest
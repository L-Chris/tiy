import Emitter from 'events'
import { Server, IncomingMessage, ServerResponse } from 'http'

interface Tiy extends Emitter {
}

interface TiyRequest {
  req: IncomingMessage
}

interface TiyResponse {
  res: ServerResponse
}

interface TiyContext {
  app: Tiy
  request: TiyRequest
  response: TiyResponse
}
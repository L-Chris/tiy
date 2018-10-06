import Emitter from 'events'
import { Server, IncomingMessage, ServerResponse, IncomingHttpHeaders, OutgoingHttpHeaders } from 'http'

interface Tiy extends Emitter {}

interface TiyRequest {
  req: IncomingMessage
  headers: IncomingHttpHeaders
  contentType: string
  url: string
  path: string
  query: Object
  querystring: string
  search: string
  method: string
}

interface TiyResponse {
  res: ServerResponse
  headers: OutgoingHttpHeaders
  headerSent: any
  status: number
  message: string
  body: any
}

interface TiyContext {
  app: Tiy
  request: TiyRequest
  response: TiyResponse
}
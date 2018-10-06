import Stream from 'stream'
import { TiyContext } from 'global'

export function compose (middlewares: Array<Function>) {
  if (!Array.isArray(middlewares)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middlewares) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context: TiyContext, next: Function) {
    let index = -1
    function dispatch (i: number) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middlewares[i]
      if (i === middlewares.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}

export const isString = (val: any) => typeof val === 'string'
export const isFuntion = (val: any) => typeof val === 'function'
export const isError = (val: any) => val instanceof Error
export const isStream = (val: any) => val instanceof Stream

export const isType = {
  string: isString,
  function: isFuntion,
  error: isError,
  stream: isStream
}
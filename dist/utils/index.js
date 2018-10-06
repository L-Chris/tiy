"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = __importDefault(require("stream"));
function compose(middlewares) {
    if (!Array.isArray(middlewares))
        throw new TypeError('Middleware stack must be an array!');
    for (const fn of middlewares) {
        if (typeof fn !== 'function')
            throw new TypeError('Middleware must be composed of functions!');
    }
    return function (context, next) {
        let index = -1;
        function dispatch(i) {
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = middlewares[i];
            if (i === middlewares.length)
                fn = next;
            if (!fn)
                return Promise.resolve();
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        return dispatch(0);
    };
}
exports.compose = compose;
exports.isString = (val) => typeof val === 'string';
exports.isFuntion = (val) => typeof val === 'function';
exports.isError = (val) => val instanceof Error;
exports.isStream = (val) => val instanceof stream_1.default;
exports.isType = {
    string: exports.isString,
    function: exports.isFuntion,
    error: exports.isError,
    stream: exports.isStream
};

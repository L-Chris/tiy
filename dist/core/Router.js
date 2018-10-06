"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const METHODS = [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
];
class Router {
    constructor() {
        this.opts = {};
        this.methods = METHODS;
        this.stack = [];
    }
    createDispatcher() {
        const self = this;
        function dispatch(ctx, next) { }
        return dispatch;
    }
    // create a route
    register(path, methods, middleware) { }
    head(path, middleware) {
        this.register(path, ['head'], middleware);
        return this;
    }
    options(path, middleware) {
        this.register(path, ['options'], middleware);
        return this;
    }
    get(path, middleware) {
        this.register(path, ['get'], middleware);
        return this;
    }
    put(path, middleware) {
        this.register(path, ['put'], middleware);
        return this;
    }
    patch(path, middleware) {
        this.register(path, ['patch'], middleware);
        return this;
    }
    post(path, middleware) {
        this.register(path, ['post'], middleware);
        return this;
    }
    delete(path, middleware) {
        this.register(path, ['delete'], middleware);
        return this;
    }
}
exports.default = Router;

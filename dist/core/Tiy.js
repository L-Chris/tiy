"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const events_1 = __importDefault(require("events"));
const statuses_1 = __importDefault(require("statuses"));
const Context_1 = __importDefault(require("./Context"));
const Request_1 = __importDefault(require("./Request"));
const Response_1 = __importDefault(require("./Response"));
const utils_1 = require("../utils");
class Tiy extends events_1.default {
    constructor() {
        super();
        this.middlewares = [];
        this.servers = [];
        this.env = process.env.NODE_ENV || 'development';
    }
    listen(...args) {
        const server = http_1.default.createServer(this.callback());
        this.servers.push(server);
        return server.listen(...args);
    }
    use(fn) {
        if (!utils_1.isType.function(fn))
            throw new TypeError('middleware must be a function!');
        this.middlewares.push(fn);
        return this;
    }
    callback() {
        const fn = utils_1.compose(this.middlewares);
        if (!this.listenerCount('error'))
            this.on('error', this.handleError);
        const handleRequest = (req, res) => {
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        };
        return handleRequest;
    }
    handleRequest(ctx, fnMiddleware) {
        return fnMiddleware(ctx)
            .then(this.handleResponse.bind(null, ctx))
            .catch((err) => {
            console.log(err);
        });
    }
    handleResponse(ctx) {
        const { res, status } = ctx.response;
        let body;
        if (statuses_1.default.empty[status]) {
            body = null;
            return res.end();
        }
        if (Buffer.isBuffer(body))
            return res.end(body);
        if (utils_1.isType.string(body))
            return res.end(body);
        if (utils_1.isType.stream(body))
            return body.pipe(res);
        body = JSON.stringify(body);
        res.end(body);
    }
    handleError(err) {
        if (!utils_1.isType.error(err))
            throw new TypeError('non-error thrown: %j');
        const msg = err.stack || err.toString();
        console.error();
        console.error(msg.replace(/^/gm, '  '));
        console.error();
    }
    createContext(req, res) {
        const request = new Request_1.default(req);
        const response = new Response_1.default(res);
        const context = new Context_1.default(this, request, response);
        return context;
    }
}
exports.default = Tiy;

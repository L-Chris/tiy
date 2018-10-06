"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const querystring_1 = __importDefault(require("querystring"));
const accepts_1 = __importDefault(require("accepts"));
class TiyRequest {
    constructor(req) {
        this.req = req;
    }
    get headers() {
        return this.req.headers;
    }
    set headers(obj) {
        this.req.headers = obj;
    }
    get accept() {
        return this._accept || (this._accept = accepts_1.default(this.req));
    }
    set accept(obj) {
        this._accept = obj;
    }
    get contentType() {
        const type = this.getHeader('Content-Type').toString();
        if (!type)
            return '';
        return type.split(';')[0];
    }
    get url() {
        return this.req.url;
    }
    set url(val) {
        this.req.url = val;
    }
    get path() {
        return url_1.parse(this.url).pathname;
    }
    set path(val) {
        const url = url_1.parse(this.url);
        if (url.pathname === url.path)
            return;
        url.pathname = val;
        url.path = null;
        this.url = url_1.format(url);
    }
    get query() {
        return querystring_1.default.parse(this.querystring);
    }
    set query(obj) {
        this.querystring = querystring_1.default.stringify(obj);
    }
    get querystring() {
        return url_1.parse(this.url).query || '';
    }
    set querystring(val) {
        const url = url_1.parse(this.url);
        if (url.search === `?${val}`)
            return;
        url.search = val;
        url.path = null;
        this.url = url_1.format(url);
    }
    get search() {
        return `?${this.querystring}`;
    }
    set search(val) {
        this.querystring = val;
    }
    get method() {
        return this.req.method;
    }
    set method(val) {
        this.req.method = val;
    }
    getHeader(field) {
        field = field.toLowerCase();
        if (['referer', 'referrer'].indexOf(field) > 0)
            this.headers.referrer || this.headers.referer || '';
        return this.headers[field] || '';
    }
}
exports.default = TiyRequest;

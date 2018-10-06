"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statuses_1 = __importDefault(require("statuses"));
const assert_1 = __importDefault(require("assert"));
const utils_1 = require("../utils");
class TiyResponse {
    constructor(res) {
        this.res = res;
    }
    get headers() {
        return this.res.getHeaders();
    }
    get headerSent() {
        return this.res.headersSent;
    }
    get status() {
        return this.res.statusCode;
    }
    set status(code) {
        if (this.headerSent)
            return;
        assert_1.default(typeof code === 'number', 'status code must be a number');
        assert_1.default(statuses_1.default[code], `invalid status code: ${code}`);
        this.res.statusCode = code;
        if (this.body && statuses_1.default.empty[code])
            this.body = null;
    }
    get message() {
        return this.res.statusMessage || statuses_1.default[this.status];
    }
    set message(msg) {
        this.res.statusMessage = msg;
    }
    get body() {
        return this._body;
    }
    set body(val) {
        this._body = val;
        // no content
        if (null == val) {
            if (!statuses_1.default.empty[this.status])
                this.status = 204;
            this.remove('Content-Type');
            this.remove('Content-Length');
            this.remove('Transfer-Encoding');
            return;
        }
    }
    redirect(url) { }
    getHeader(field) {
        return this.headers[field.toLowerCase()] || '';
    }
    setHeader(field, val) {
        if (this.headerSent)
            return;
        if (arguments.length === 2) {
            if (Array.isArray(val))
                val = val.map(v => utils_1.isType.string(val) ? v : String(v));
            else if (utils_1.isType.string(val))
                val = String(val);
            this.res.setHeader(field, val);
        }
        else {
            for (const key in field) {
                this.setHeader(key, field[key]);
            }
        }
    }
    remove(field) {
        if (this.headerSent)
            return;
        this.res.removeHeader(field);
    }
}
exports.default = TiyResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TiyContext {
    constructor(app, request, response) {
        this.app = app;
        this.request = request;
        this.response = response;
    }
}
exports.default = TiyContext;

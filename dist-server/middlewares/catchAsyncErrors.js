"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (func) { return function (req, res, next) {
    return Promise.resolve(func(req, res, next))
        .catch(next);
}; });

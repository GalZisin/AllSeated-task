"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        var error = __assign({}, err);
        error.message = err.message;
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
});

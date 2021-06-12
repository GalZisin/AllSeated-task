"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Position_1 = __importDefault(require("./Position"));
var User = /** @class */ (function () {
    function User(id, x, y, z, rotation) {
        this._id = id;
        this._position = new Position_1.default(x, y, z);
        this._rotation = rotation;
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "x", {
        get: function () {
            return this._position._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "y", {
        get: function () {
            return this._position._y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "z", {
        get: function () {
            return this._position._z;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.default = User;

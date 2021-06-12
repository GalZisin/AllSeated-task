"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var SingletonArray = /** @class */ (function () {
    function SingletonArray() {
        var _this = this;
        this.usersDataArray = [];
        //Add and Update user in array
        this.setArray = function (user) {
            //remove existing user from array
            for (var i = 0; i < _this.usersDataArray.length; i++) {
                if (user._id === _this.usersDataArray[i]._id) {
                    _this.usersDataArray.splice(i, 1);
                    console.log("deleted i: " + i + "user id: " + user._id);
                    break;
                }
            }
            //Add new User
            _this.add(user);
        };
        //Add user into array, sorted by x coordinate
        this.add = function (user) {
            if (_this.usersDataArray.length === 0) {
                _this.usersDataArray.push(user);
                console.log("insert first user id: " + user._id);
                return;
            }
            var isInserted = false;
            for (var i = 0; i < _this.usersDataArray.length; i++) {
                if (user._position._x < _this.usersDataArray[i]._position._x) {
                    if (i === 0) {
                        _this.usersDataArray.unshift(user);
                        console.log("unshift user id: " + user._id);
                    }
                    else {
                        _this.usersDataArray.splice(i, 0, user);
                        console.log("splice user i: " + i + "user id" + user._id);
                    }
                    isInserted = true;
                    break;
                }
            }
            if (!isInserted) {
                _this.usersDataArray.push(user);
                console.log("push user id: " + user._id);
            }
        };
        //Get users by distance
        this.getByDistance = function (user, distance, maxUsers) {
            console.log("getByDistance user id: " + user._id);
            var dxd = distance * distance;
            if (_this.usersDataArray.length < 2)
                return [];
            return _this.getByDistancer(user, dxd, 0, _this.usersDataArray.length - 1, maxUsers);
        };
        //Get users by distance using recursion
        //The routine check middle position of array part (from position to posiotion).
        //If middle position does not meet the distance requirements it definiens direction for next search 
        //and calls the program recursively using new values for fromPos, toPos.
        //If middle position meets the distance requirements it selects appropriate users on left and right direction from
        //the middle position.
        this.getByDistancer = function (user, sqrDistance, fromPos, toPos, maxUsers) {
            console.log("getByDistancer fromPos: " + fromPos + "toPos: " + toPos);
            var inew = [];
            var xd1 = 0;
            var yd = 0;
            var zd = 0;
            if (toPos - fromPos <= 5) {
                for (var i = fromPos; i <= toPos; i++) {
                    if (_this.usersDataArray[i]._id != user._id) {
                        xd1 = _this.usersDataArray[i]._position._x - user._position._x;
                        xd1 = xd1 * xd1;
                        console.log("xd1: " + xd1 + " user id: " + _this.usersDataArray[i]._id);
                        if (sqrDistance >= xd1) {
                            yd = _this.usersDataArray[i]._position._y - user._position._y;
                            zd = _this.usersDataArray[i]._position._z - user._position._z;
                            xd1 = xd1 + yd * yd + zd * zd;
                            console.log("finish distance xd1: " + xd1);
                            if (sqrDistance >= xd1) {
                                inew.push(_this.usersDataArray[i]);
                                if (inew.length >= maxUsers)
                                    return inew;
                            }
                        }
                    }
                }
                return inew;
            }
            var indexPos = 1;
            if (toPos - fromPos == 1) {
                indexPos = 1;
            }
            else {
                indexPos = Math.floor((toPos - fromPos) / 2);
            }
            console.log("indexPos after divide= " + indexPos);
            //check position
            if (_this.usersDataArray[indexPos]._id == user._id) {
                console.log("found current user ");
                if (indexPos + 1 >= toPos)
                    indexPos--;
                else
                    indexPos++;
            }
            console.log("indexPos: " + indexPos + "user id:  " + _this.usersDataArray[indexPos]._id);
            var xd = _this.usersDataArray[indexPos]._position._x - user._position._x;
            xd = xd * xd;
            if (sqrDistance < xd) {
                if (toPos - fromPos == 1)
                    return [];
                var indexPos1 = indexPos + 1;
                var dx1 = 0;
                var selectedRight = false;
                while (indexPos1 < toPos) {
                    dx1 = _this.usersDataArray[indexPos1]._position._x - user._position._x;
                    dx1 = dx1 * dx1;
                    if (dx1 != xd) {
                        if (dx1 < xd) {
                            selectedRight = true;
                        }
                        break;
                    }
                    indexPos1++;
                }
                if (selectedRight) {
                    console.log("selected right: ");
                    return _this.getByDistancer(user, sqrDistance, indexPos1, toPos, maxUsers);
                }
                else {
                    console.log("selected left: ");
                    return _this.getByDistancer(user, sqrDistance, fromPos, indexPos, maxUsers);
                }
            }
            else {
                var getCurrentUser = true;
                var pp = indexPos;
                console.log("found user: " + _this.usersDataArray[indexPos]._id + "sqrDelta: " + xd);
                inew.push(new User_1.default(_this.usersDataArray[indexPos]._id, _this.usersDataArray[indexPos]._position._x, _this.usersDataArray[indexPos]._position._y, _this.usersDataArray[indexPos]._position._z, _this.usersDataArray[indexPos]._rotation));
                //go right
                while (getCurrentUser && pp <= toPos) {
                    pp++;
                    if (pp > toPos) {
                        getCurrentUser = false;
                        break;
                    }
                    if (_this.usersDataArray[pp]._id != user._id) {
                        xd = _this.usersDataArray[pp]._position._x - user._position._x;
                        xd = xd * xd;
                        if (sqrDistance >= xd) {
                            yd = _this.usersDataArray[pp]._position._y - user._position._y;
                            zd = _this.usersDataArray[pp]._position._z - user._position._z;
                            xd = xd + yd * yd + zd * zd;
                            if (sqrDistance >= xd) {
                                inew.push(_this.usersDataArray[pp]);
                                if (inew.length >= maxUsers)
                                    return inew;
                            }
                        }
                        else
                            getCurrentUser = false;
                    }
                }
                //go left
                pp = indexPos;
                getCurrentUser = true;
                while (getCurrentUser && pp >= fromPos) {
                    pp--;
                    if (pp < fromPos) {
                        getCurrentUser = false;
                        break;
                    }
                    if (_this.usersDataArray[pp]._id != user._id) {
                        xd = _this.usersDataArray[pp]._position._x - user._position._x;
                        xd = xd * xd;
                        if (sqrDistance >= xd) {
                            yd = _this.usersDataArray[pp]._position._y - user._position._y;
                            zd = _this.usersDataArray[pp]._position._z - user._position._z;
                            xd = xd + yd * yd + zd * zd;
                            if (sqrDistance >= xd) {
                                inew.push(_this.usersDataArray[pp]);
                                if (inew.length >= maxUsers)
                                    return inew;
                            }
                        }
                        else
                            getCurrentUser = false;
                    }
                }
                return inew;
            }
        };
    }
    SingletonArray.getInstance = function () {
        if (!this._instance) {
            this._instance = new SingletonArray();
        }
        return SingletonArray._instance;
    };
    SingletonArray.prototype.getArray = function () {
        return this.usersDataArray;
    };
    return SingletonArray;
}());
exports.default = SingletonArray;

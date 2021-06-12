"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = express_1.Router();
router.route('/users').get(userController_1.getUsers);
exports.default = router;

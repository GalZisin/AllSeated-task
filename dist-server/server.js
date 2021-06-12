"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
//Handle Uncaught exceptions
process.on('unhandledException', function (err) {
    console.log("ERROR: " + err.stack);
    console.log('Shuting down due to uncaught exception');
    process.exit(1);
});
//Setting up config files
dotenv_1.default.config({ path: './config.env' });
var server = app_1.default.listen(process.env.PORT, function () {
    console.log("Server started on PORT: " + process.env.PORT + " in " + process.env.NODE_ENV + " mode.");
});
//Handle Unhandled Promis rejections
process.on('unhandledRejection', function (err) {
    console.log("ERROR: " + err);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(function () {
        process.exit(1);
    });
});

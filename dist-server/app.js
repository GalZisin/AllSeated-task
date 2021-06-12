"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var errors_1 = __importDefault(require("./middlewares/errors"));
var app = express_1.default();
var corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.use('/api/v1', userRoute_1.default);
//Middleware to handle errors
app.use(errors_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = require("../express-src/router/userRouter");
const groupRouter_1 = require("../express-src/router/groupRouter");
const belongsToGroupRouter_1 = require("../express-src/router/belongsToGroupRouter");
const followRouter_1 = require("../express-src/router/followRouter");
const rootRouter_1 = require("../express-src/router/rootRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/', rootRouter_1.rootRouter);
app.use('/user', userRouter_1.userRouter);
app.use('/group', groupRouter_1.groupRouter);
app.use('/group-member', belongsToGroupRouter_1.belongsToGroupRouter);
app.use('/follow', followRouter_1.followRouter);
app.use((req, res, next) => {
    if (req.is_return_res) {
        req.time_keeper.invokeWriter({ state: "Success", name: "Node" });
        return;
    }
    next();
});
app.use((err, req, res, next) => {
    console.log(err);
    let message = '500 server error : ' + req.path;
    console.log(message);
    res.status(500).json({ message: message });
    return;
});
app.use((req, res, next) => {
    let message = '404 notfound request : ' + req.path;
    console.log(message);
    res.status(404).json({ message: message });
    return;
});
exports.default = app;

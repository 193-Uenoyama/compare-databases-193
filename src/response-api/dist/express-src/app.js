"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("../express-src/controller/user");
const group_1 = require("../express-src/controller/group");
const group_member_1 = require("../express-src/controller/group-member");
const relation_1 = require("../express-src/controller/relation");
const root_1 = require("../express-src/controller/root");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/', root_1.rootRouter);
app.use('/user', user_1.userRouter);
app.use('/group', group_1.groupRouter);
app.use('/group-member', group_member_1.groupMemberRouter);
app.use('/relation', relation_1.relationRouter);
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
    res.status(500).json({ msg: message });
    return;
});
app.use((req, res, next) => {
    let message = '404 notfound request : ' + req.path;
    console.log(message);
    res.status(404).json({ msg: message });
    return;
});
exports.default = app;

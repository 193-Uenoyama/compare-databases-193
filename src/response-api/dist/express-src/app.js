"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("../express-src/routes/user");
const group_1 = require("../express-src/routes/group");
const group_member_1 = require("../express-src/routes/group-member");
const relation_1 = require("../express-src/routes/relation");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get('/', (req, res, next) => {
    res.status(200).json({ msg: "hello world" });
});
app.use('/user', user_1.userRouter);
app.use('/group', group_1.groupRouter);
app.use('/group-member', group_member_1.groupMemberRouter);
app.use('/relation', relation_1.relationRouter);
app.use((req, res, next) => {
    let message = '404 notfound request : ' + req.path;
    console.log(message);
    res.status(404);
    res.json({ msg: message });
});
app.use((err, req, res, next) => {
    let message = '500 server error : ' + req.path;
    console.log(message);
    res.status(500);
    res.json({ msg: message });
});
exports.default = app;

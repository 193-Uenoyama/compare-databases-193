"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("../express-src/routes/user");
const group_1 = require("../express-src/routes/group");
const group_member_1 = require("../express-src/routes/group-member");
const relation_1 = require("../express-src/routes/relation");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(body_parser_1.default.json());
exports.app.get('/', (req, res, next) => {
    res.status(200).json({ msg: "hello world" });
});
exports.app.use('/user', user_1.userRouter);
exports.app.use('/group', group_1.groupRouter);
exports.app.use('/group-member', group_member_1.groupMemberRouter);
exports.app.use('/relation', relation_1.relationRouter);
exports.app.use((req, res, next) => {
    let message = '404 notfound request : ' + req.path;
    console.log(message);
    res.status(404);
    res.json({ msg: message });
});
exports.app.use((err, req, res, next) => {
    let message = '500 server error : ' + req.path;
    console.log(message);
    res.status(500);
    res.json({ msg: message });
});

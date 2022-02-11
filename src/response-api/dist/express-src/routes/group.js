"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
exports.groupRouter = express_1.default.Router();
exports.groupRouter.get('/', function (req, res, next) {
    // let return_data: any = {};
    // let time_keeper = new TimeKeeper();
    let groupName = Math.random().toString(32).substring(2);
    let groupIntroduction = Math.random().toString(32).substring(2);
    index_1.default.Groups.create({
        groupName: groupName,
        groupIntroduction: groupIntroduction,
    }, {});
    res.status(200).json({ msg: "foo" });
});

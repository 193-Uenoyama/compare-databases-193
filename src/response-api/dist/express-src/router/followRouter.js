"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
exports.followRouter = express_1.default.Router();
exports.followRouter.get('/', function (req, res, next) {
    // let return_data: any = {};
    // let time_keeper = new TimeKeeper();
    index_1.default.Follow.create({
        followedUserId: 1,
        followingUserId: 1,
    }, {});
    res.status(200).json({ msg: "foo" });
});

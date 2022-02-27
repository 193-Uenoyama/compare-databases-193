"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const TimeKeeper_1 = __importDefault(require("@/express-src/modules/write_logs/TimeKeeper"));
const index_1 = __importDefault(require("@/sequelize-src/models/index"));
const _modules_1 = require("@/express-src/controller/_modules");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let return_data = {};
        let firstName = Math.random().toString(32).substring(2);
        let lastName = Math.random().toString(32).substring(2);
        let email = Math.random().toString(32).substring(2);
        yield index_1.default.Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
        }, {}).catch((err) => {
            res.status(500).json({ msg: err });
        });
        return_data = yield index_1.default.Users.findAll({
            where: {
                userId: 82,
            }
        })
            .catch((err) => {
            res.status(500).json({ msg: err });
        });
        res.status(200).json(return_data);
    });
});
exports.userRouter.post('/create', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 送られてきたデータを格納。
        let user_request_data = {
            firstName: req.body.firstName || undefined,
            lastName: req.body.lastName || undefined,
            email: req.body.email || undefined,
            introduction: req.body.introduction || undefined,
        };
        // undefinedのデータを削除
        let create_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(user_request_data);
        let created_user = yield index_1.default.Users.create(create_data, {}).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false
            });
        });
        res.status(200).json({
            createdUser: created_user,
            message: "success! create " + created_user.firstName + " " + created_user.lastName,
            isConnectDatabase: true,
        });
    });
});
exports.userRouter.get('/read', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let time_keeper = new TimeKeeper_1.default();
        let readed_users = yield index_1.default.Users.findAll({})
            .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false
            });
        });
        res.status(200).json({
            users: readed_users,
            message: "success connect database",
            isConnectDatabase: true
        });
    });
});
exports.userRouter.post('/update', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 送られてきたデータを格納。
        let user_request_data = {
            firstName: req.body.firstName || undefined,
            lastName: req.body.lastName || undefined,
            email: req.body.email || undefined,
            introduction: req.body.introduction || undefined,
        };
        // undefinedのデータを削除
        let update_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(user_request_data);
        // 更新
        yield index_1.default.Users.update(update_data, {
            where: {
                userId: req.body.userId,
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false,
            });
        });
        // 更新されたユーザを取得
        let updated_user = yield index_1.default.Users.findOne({
            where: {
                UserId: req.body.userId
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false,
            });
        });
        res.status(200).json({
            updatedUser: updated_user,
            message: "success! update " + updated_user.firstName + " " + updated_user.lastName,
            isConnectDatabase: true,
        });
    });
});
exports.userRouter.post('/delete', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let deletion_user = yield index_1.default.Users.findOne({
            where: {
                UserId: req.body.userId
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false,
            });
            return;
        });
        yield index_1.default.Users.destroy({
            where: {
                UserId: req.body.userId
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false,
            });
            return;
        });
        res.status(200).json({
            deletedUser: deletion_user,
            message: "success! deleted " + deletion_user.firstName + " " + deletion_user.lastName,
            isConnectDatabase: true,
        });
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
const _modules_1 = require("../../express-src/router/_modules");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', async function (req, res, next) {
    let return_data = {};
    let firstName = Math.random().toString(32).substring(2);
    let lastName = Math.random().toString(32).substring(2);
    let email = Math.random().toString(32).substring(2);
    await index_1.default.Users.calculateTimeOfCreate(req.time_keeper, {
        firstName: firstName,
        lastName: lastName,
        email: email,
    }, {}).catch((err) => {
        next(err);
        return;
    });
    return_data = await index_1.default.Users.calculateTimeOfFindAll(req.time_keeper, {})
        .catch((err) => {
        next(err);
        return;
    });
    res.status(200).json(return_data);
    req.is_return_res = true;
    next();
});
exports.userRouter.post('/create', async function (req, res, next) {
    // 送られてきたデータを格納。
    let user_request_data = {
        firstName: req.body.firstName || undefined,
        lastName: req.body.lastName || undefined,
        email: req.body.email || undefined,
        introduction: req.body.introduction || undefined,
    };
    // undefinedのデータを削除
    let create_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(user_request_data);
    let created_user = await index_1.default.Users.calculateTimeOfCreate(req.time_keeper, create_data, {}).catch((err) => {
        console.log(err.stack);
        next(err);
        return;
    });
    res.status(200).json({
        createdUser: created_user,
        message: "success! create " + created_user.firstName + " " + created_user.lastName,
        isConnectDatabase: true,
    });
});
exports.userRouter.get('/read', async function (req, res, next) {
    let readed_users = await index_1.default.Users.calculateTimeOfFindAll(req.time_keeper, {})
        .catch((err) => {
        console.log(err.stack);
        next(err);
        return;
    });
    res.status(200).json({
        users: readed_users,
        message: "success connect database",
        isConnectDatabase: true
    });
});
exports.userRouter.post('/update', async function (req, res, next) {
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
    await index_1.default.Users.calculateTimeOfUpdate(req.time_keeper, update_data, {
        where: {
            userId: req.body.userId,
        }
    }).catch((err) => {
        console.log(err.stack);
        next(err);
        return;
    });
    // 更新されたユーザを取得
    let updated_user = await index_1.default.Users.findOne({
        where: {
            userId: req.body.userId
        }
    }).catch((err) => {
        console.log(err.stack);
        next(err);
        return;
    });
    res.status(200).json({
        updatedUser: updated_user,
        message: "success! update " + updated_user.firstName + " " + updated_user.lastName,
        isConnectDatabase: true,
    });
});
exports.userRouter.post('/delete', async function (req, res, next) {
    let deletion_user = await index_1.default.Users.findOne({
        where: {
            userId: req.body.userId
        }
    }).catch((err) => {
        console.log(err.stack);
        next(err);
        return;
    });
    await index_1.default.Users.calculateTimeOfDelete(req.time_keeper, {
        where: {
            UserId: req.body.userId
        }
    }).catch((err) => {
        console.log(err.stack);
        next(err);
        return;
    });
    res.status(200).json({
        deletedUser: deletion_user,
        message: "success! deleted " + deletion_user.firstName + " " + deletion_user.lastName,
        isConnectDatabase: true,
    });
});

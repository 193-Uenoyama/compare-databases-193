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
exports.groupRouter = void 0;
const express_1 = require("express");
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
const _modules_1 = require("../../express-src/routes/_modules");
exports.groupRouter = (0, express_1.Router)();
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
exports.groupRouter.get('/read', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let readed_groups = yield index_1.default.Groups.findAll({})
            .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false
            });
            return;
        });
        res.status(200).json({
            groups: readed_groups,
            message: "success connect database",
            isConnectDatabase: true
        });
    });
});
exports.groupRouter.post('/create', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let group_request_data = {
            groupName: req.body.groupName || undefined,
            groupIntroduction: req.body.groupIntroduction || undefined,
        };
        // undefinedのデータを削除
        let create_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(group_request_data);
        let created_group = yield index_1.default.Groups.create(create_data, {}).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false
            });
            return;
        });
        res.status(200).json({
            createdGroup: created_group,
            message: "success! create " + created_group.groupName,
            isConnectDatabase: true,
        });
    });
});
exports.groupRouter.post('/update', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 送られてきたデータを格納。
        let group_request_data = {
            groupName: req.body.groupName || undefined,
            groupIntroduction: req.body.groupIntroduction || undefined,
        };
        // undefinedのデータを削除
        let update_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(group_request_data);
        // 更新
        yield index_1.default.Groups.update(update_data, {
            where: {
                groupId: req.body.groupId,
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false,
            });
            return;
        });
        // 更新されたユーザを取得
        let updated_group = yield index_1.default.Groups.findOne({
            where: {
                groupId: req.body.groupId,
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
            updatedGroup: updated_group,
            message: "success! update " + updated_group.groupName,
            isConnectDatabase: true,
        });
    });
});
exports.groupRouter.post('/delete', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let deletion_group = yield index_1.default.Groups.findOne({
            where: {
                groupId: req.body.groupId
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "sorry... fail connect to database.",
                isConnectDatabase: false,
            });
            return;
        });
        yield index_1.default.Group.destroy({
            where: {
                groupId: req.body.groupId
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
            deletedUser: deletion_group,
            message: "success! deleted " + deletion_group.groupName,
            isConnectDatabase: true,
        });
    });
});

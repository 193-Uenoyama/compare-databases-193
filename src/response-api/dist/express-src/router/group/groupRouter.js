"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const index_1 = __importDefault(require("../../../sequelize-src/models/index"));
const _modules_1 = require("../../../express-src/router/_modules");
const validationMessages_1 = require("../../../express-src/modules/validation/validationMessages");
exports.groupRouter = (0, express_1.Router)();
exports.groupRouter.post('/create', (0, express_validator_1.body)('groupName').notEmpty().withMessage(validationMessages_1.APPMSG.Group.require.groupName), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    //TODO groupName を || undefined やめる
    let group_request_data = {
        groupName: req.body.groupName || undefined,
        groupIntroduction: req.body.groupIntroduction || undefined,
    };
    // undefinedのデータを削除
    let create_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(group_request_data);
    let created_group;
    try {
        created_group = await index_1.default.Groups.create(create_data, {});
    }
    catch (err) {
        next(err);
        return;
    }
    res.status(200).json({
        createdGroup: created_group,
        message: "success! create " + created_group.groupName,
        isConnectDatabase: true,
    });
});
exports.groupRouter.get('/read', async function (req, res, next) {
    let readed_groups;
    try {
        readed_groups = await index_1.default.Groups.findAll({});
    }
    catch (err) {
        next(err);
        return;
    }
    res.status(200).json({
        groups: readed_groups,
        message: "success connect database",
        isConnectDatabase: true
    });
});
exports.groupRouter.post('/update', 
// = Validation ================================
// 空か判定した後、型を判定
(0, express_validator_1.body)('groupId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Group.regular.groupId), 
// groupId以外のパラメータはどれか一つでも存在すること
(0, express_validator_1.body)('entire').custom((value, { req }) => {
    if (typeof req.body.groupName == 'undefined' &&
        typeof req.body.groupIntroduction == 'undefined') {
        throw new Error();
    }
    return true;
}).withMessage(validationMessages_1.APPMSG.General.notEvenTheMinimum), 
// = Processing ================================
async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // 送られてきたデータを格納。
    let group_request_data = {
        groupName: req.body.groupName || undefined,
        groupIntroduction: req.body.groupIntroduction || undefined,
    };
    // undefinedのデータを削除
    let update_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(group_request_data);
    // 更新
    try {
        await index_1.default.Groups.update(update_data, {
            where: {
                groupId: req.body.groupId,
            }
        });
    }
    catch (err) {
        next(err);
        return;
    }
    // 更新されたグループを取得
    let updated_group;
    try {
        updated_group = await index_1.default.Groups.findOne({
            where: {
                groupId: req.body.groupId,
            }
        });
    }
    catch (err) {
        next(err);
        return;
    }
    res.status(200).json({
        updatedGroup: updated_group,
        message: "success! update " + updated_group.groupName,
        isConnectDatabase: true,
    });
});
exports.groupRouter.post('/delete', (0, express_validator_1.body)('groupId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Group.regular.groupId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // 削除対象のグループを取り出す。
    let deletion_group;
    try {
        deletion_group = await index_1.default.Groups.findOne({
            where: {
                groupId: req.body.groupId
            }
        });
    }
    catch (err) {
        next(err);
        return;
    }
    // グループを削除する
    try {
        await index_1.default.Groups.destroy({
            where: {
                groupId: req.body.groupId
            }
        });
    }
    catch (err) {
        next(err);
        return;
    }
    res.status(200).json({
        deletedGroup: deletion_group,
        message: "success! deleted " + deletion_group.groupName,
        isConnectDatabase: true,
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.belongsToGroupRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const index_1 = __importDefault(require("../../../sequelize-src/models/index"));
const _modules_1 = require("../../../express-src/router/_modules");
const validationMessages_1 = require("../../../express-src/modules/validation/validationMessages");
exports.belongsToGroupRouter = (0, express_1.Router)();
exports.belongsToGroupRouter.post('/create', (0, express_validator_1.body)('userId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.User.regular.userId), (0, express_validator_1.body)('groupId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Group.regular.groupId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    let group_request_data = {
        groupId: req.body.groupId,
        memberId: req.body.userId
    };
    // undefinedのデータを削除
    let create_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(group_request_data);
    let result;
    try {
        result = await index_1.default.GroupMembers.calculateTimeOfCreate(req.process_logging.log_detail, create_data);
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        belonged_group: result,
        is_success: true,
    });
    next();
});
exports.belongsToGroupRouter.post('/read', (0, express_validator_1.body)('groupId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Group.regular.groupId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    let targetGroup;
    try {
        targetGroup = await index_1.default.Groups.calculateTimeOfFindOne(req.process_logging.log_detail, {
            where: {
                groupId: req.body.groupId,
            },
            include: ['Members'],
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        readed_group: targetGroup,
        is_success: true,
    });
    next();
});
exports.belongsToGroupRouter.post('/read/rows', async function (req, res, next) {
    let group_members_count;
    try {
        group_members_count = await index_1.default.GroupMembers.count({});
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        group_members_count: group_members_count,
        is_success: true,
    });
    next();
});
exports.belongsToGroupRouter.post('/delete', (0, express_validator_1.body)('userId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.User.regular.userId), (0, express_validator_1.body)('groupId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Group.regular.groupId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    let result;
    try {
        result = await index_1.default.GroupMembers.calculateTimeOfDestroy(req.process_logging.log_detail, {
            where: {
                groupId: req.body.groupId,
                memberId: req.body.userId,
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        left_group: result,
        is_success: true,
    });
    next();
});

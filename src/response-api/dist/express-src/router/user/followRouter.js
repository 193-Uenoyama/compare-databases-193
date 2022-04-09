"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const index_1 = __importDefault(require("../../../sequelize-src/models/index"));
const _modules_1 = require("../../../express-src/router/_modules");
const validationMessages_1 = require("../../../express-src/modules/validation/validationMessages");
exports.followRouter = (0, express_1.Router)();
exports.followRouter.post('/create', (0, express_validator_1.body)('followedUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followedUserId), (0, express_validator_1.body)('followerUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followerUserId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    let group_request_data = {
        followedUserId: req.body.followedUserId,
        followerUserId: req.body.followerUserId
    };
    // undefinedのデータを削除
    let create_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(group_request_data);
    let result;
    try {
        result = await index_1.default.Follows.calculateTimeOfCreate(req.process_logging.log_detail, create_data);
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        created_follow: result,
        is_success: true,
    });
    next();
});
exports.followRouter.post('/read/getfollower', (0, express_validator_1.body)('followedUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followedUserId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    let targetUser;
    try {
        targetUser = await index_1.default.Users.calculateTimeOfFindOne(req.process_logging.log_detail, {
            where: {
                userId: req.body.followedUserId,
            },
            include: ['Follower'],
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        followers: targetUser,
        is_success: true,
    });
    next();
});
exports.followRouter.post('/read/getfollowed', (0, express_validator_1.body)('followerUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followerUserId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    let targetUser;
    try {
        targetUser = await index_1.default.Users.calculateTimeOfFindOne(req.process_logging.log_detail, {
            where: {
                userId: req.body.followerUserId,
            },
            include: ['Followed'],
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        followeds: targetUser,
        is_success: true,
    });
    next();
});
exports.followRouter.post('/delete', (0, express_validator_1.body)('followedUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followedUserId), (0, express_validator_1.body)('followerUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followerUserId), async function (req, res, next) {
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
        result = await index_1.default.Follows.calculateTimeOfDestroy(req.process_logging.log_detail, {
            where: {
                followedUserId: req.body.followedUserId,
                followerUserId: req.body.followerUserId
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        deleted_followed: result,
        is_success: true,
    });
    next();
});

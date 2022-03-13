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
/** create follow ******************************************
 *
 * followedUserをfollowingUserがフォローする
 *
 * @param req.body.followedUserId: number
 * @param req.body.followerUserId: number
 *
 **********************************************************/
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
        res.status(400).json({ errors: errors.array() });
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
        result = await index_1.default.Follows.create(create_data);
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        follow: result,
    });
});
/** read follower ******************************************
 *
 * 対象ユーザ(followedUser)をフォローしているユーザを取り出す
 *
 * @param req.body.followedUserId: number
 *
 **********************************************************/
exports.followRouter.get('/read/getfollower/:followedUserId', (0, express_validator_1.param)('followedUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followedUserId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    let targetUser;
    try {
        targetUser = await index_1.default.Users.findOne({
            where: {
                userId: req.params.followedUserId,
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
        user: targetUser,
    });
});
/** read follower ******************************************
 *
 * 対象ユーザ(followerUser)がフォローしているユーザを取り出す
 *
 * @param req.body.followerUserId: number
 *
 **********************************************************/
exports.followRouter.get('/read/getfollowed/:followerUserId', (0, express_validator_1.param)('followerUserId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.Follows.regular.followerUserId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    let targetUser;
    try {
        targetUser = await index_1.default.Users.findOne({
            where: {
                userId: req.params.followerUserId,
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
        user: targetUser,
    });
});
/** delete follow ******************************************
 *
 * followingUserがfollowedUserのフォローを外す
 *
 * @param req.body.followedUserId: number
 * @param req.body.followerUserId: number
 *
 **********************************************************/
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
        res.status(400).json({ errors: errors.array() });
        return;
    }
    let result;
    try {
        result = await index_1.default.Follows.destroy({
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
        user: result,
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("validator"));
const index_1 = __importDefault(require("../../../sequelize-src/models/index"));
const _modules_1 = require("../../../express-src/router/_modules");
const validationMessages_1 = require("../../../express-src/modules/validation/validationMessages");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/create', 
//validation
(0, express_validator_1.body)('firstName').notEmpty().withMessage(validationMessages_1.APPMSG.User.require.firstName), (0, express_validator_1.body)('lastName').notEmpty().withMessage(validationMessages_1.APPMSG.User.require.lastName), (0, express_validator_1.body)('email')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.User.require.email)
    .bail()
    .isEmail()
    .withMessage(validationMessages_1.APPMSG.User.regular.email), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    // 送られてきたデータを格納。
    let user_request_data = {
        firstName: req.body.firstName || undefined,
        lastName: req.body.lastName || undefined,
        email: req.body.email || undefined,
        introduction: req.body.introduction || undefined,
    };
    // undefinedのデータを削除
    let create_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(user_request_data);
    let created_user;
    try {
        created_user = await index_1.default.Users.calculateTimeOfCreate(req.process_logging.log_detail, create_data, {});
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        created_user: created_user,
        is_success: true,
    });
    next();
});
exports.userRouter.post('/read', async function (req, res, next) {
    let readed_users;
    try {
        readed_users = await index_1.default.Users.calculateTimeOfFindAll(req.process_logging.log_detail, {});
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        readed_users: readed_users,
        is_success: true,
    });
    next();
});
exports.userRouter.post('/update', 
// = Validation ================================
// 空か判定した後、型を判定
(0, express_validator_1.body)('userId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.User.regular.userId), 
// userId以外のパラメータはどれか一つでも存在すること
(0, express_validator_1.body)('entire').custom((value, { req }) => {
    if (typeof req.body.firstName == 'undefined' &&
        typeof req.body.lastName == 'undefined' &&
        typeof req.body.email == 'undefined' &&
        typeof req.body.introduction == 'undefined') {
        throw new Error();
    }
    return true;
}).withMessage(validationMessages_1.APPMSG.General.notEvenTheMinimum), 
// emailが存在する場合のみemailのフォーマットをチェックをする
(0, express_validator_1.body)('email').custom(value => {
    if (typeof value == 'undefined')
        return true;
    if (validator_1.default.isEmail(value))
        return true;
    throw new Error();
}).withMessage(validationMessages_1.APPMSG.User.regular.email), 
// = Processing ================================
async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    // 送られてきたデータを格納。
    let user_request_data = {
        firstName: req.body.firstName || undefined,
        lastName: req.body.lastName || undefined,
        email: req.body.email || undefined,
        introduction: req.body.introduction || undefined,
    };
    // undefinedのデータを削除
    let update_data = (0, _modules_1.cutUndefinedOutOfAnArgument)(user_request_data);
    try {
        await index_1.default.Users.calculateTimeOfUpdate(req.process_logging.log_detail, update_data, { where: { userId: req.body.userId, } });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    // 更新されたユーザを取得
    let updated_user;
    try {
        updated_user = await index_1.default.Users.findOne({
            where: {
                userId: req.body.userId
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        updated_user: updated_user,
        is_success: true,
    });
    next();
});
exports.userRouter.post('/delete', (0, express_validator_1.body)('userId')
    .notEmpty()
    .withMessage(validationMessages_1.APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(validationMessages_1.APPMSG.User.regular.userId), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            is_success: false,
        });
        return;
    }
    // 削除対象のユーザを取り出す。
    let deletion_user;
    try {
        deletion_user = await index_1.default.Users.findOne({
            where: {
                userId: req.body.userId
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    // ユーザを削除する
    try {
        await index_1.default.Users.calculateTimeOfDestroy(req.process_logging.log_detail, {
            where: {
                userId: req.body.userId
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    res.status(200).json({
        deleted_user: deletion_user,
        is_success: true,
    });
    next();
});

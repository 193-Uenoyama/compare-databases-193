"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.belongsToGroupRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const index_1 = __importDefault(require("../../../sequelize-src/models/index"));
const validationMessages_1 = require("../../../express-src/modules/validation/validationMessages");
exports.belongsToGroupRouter = (0, express_1.Router)();
/** create belongsToGroup **********************************
 *
 * 送られてきたデータでグループを作成
 *
 * @param req.body.groupId: number
 * @param req.body.userId: number
 *
 **********************************************************/
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
    .withMessage(validationMessages_1.APPMSG.Group.regular.groupId), function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
});
/** read belongsToGroup members ****************************
 *
 * 送られてきたデータでグループを作成
 *
 * @param req.body.groupId: number
 *
 **********************************************************/
exports.belongsToGroupRouter.get('/read/:groupId', (0, express_validator_1.param)('groupId')
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
    let targetGroup;
    try {
        targetGroup = await index_1.default.Groups.findOne({
            where: {
                groupId: req.params.groupId,
            },
            include: [index_1.default.Users],
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        return;
    }
    console.log(targetGroup);
    res.status(200).json({
        group: targetGroup,
    });
});
/** delete belongsToGroup **********************************
 *
 * 送られてきたデータでグループを作成
 *
 * @param req.body.groupId: number
 * @param req.body.userId: number
 *
 **********************************************************/
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
    .withMessage(validationMessages_1.APPMSG.Group.regular.groupId), function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const core_1 = require("@sequelize/core");
const CalculateProcessingTimeModel_1 = __importDefault(require("../../sequelize-src/CalculateProcessingTimeModel"));
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
class User extends CalculateProcessingTimeModel_1.default {
    static associate(DB) {
        DB.Users.belongsToMany(DB.Groups, {
            as: 'Teams',
            through: 'GroupMembers',
            foreignKey: 'memberId',
            otherKey: 'groupId',
        });
        // UserとFollower(Follows)を結びつけるassociation.
        // Userが自分のフォロワーを操作するためには
        // 自身のuserIdとfollowedUserId(フォローされているユーザID)
        // が結びつかなければならない。
        DB.Users.belongsToMany(DB.Users, {
            as: 'Follower',
            through: 'Follows',
            foreignKey: 'followedUserId',
            otherKey: 'followerUserId',
        });
        // UserとFolloweed(Follows)を結びつけるassociation.
        DB.Users.belongsToMany(DB.Users, {
            as: 'Followed',
            through: 'Follows',
            foreignKey: 'followerUserId',
            otherKey: 'followedUserId',
        });
    }
}
exports.User = User;
;
User.init({
    userId: {
        type: core_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    introduction: {
        type: core_1.DataTypes.STRING,
    }
}, {
    sequelize: defineSequelize_1.sequelize,
    modelName: 'Users',
});

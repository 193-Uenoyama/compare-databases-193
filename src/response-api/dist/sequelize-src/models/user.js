"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const group_1 = require("../../sequelize-src/models/group");
const CalculateProcessingTimeModel_1 = __importDefault(require("../../sequelize-src/CalculateProcessingTimeModel"));
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
class User extends CalculateProcessingTimeModel_1.default {
    associate() {
        User.belongsToMany(User, {
            through: 'Follows',
            foreignKey: 'followedUserId',
            targetKey: 'followingUserId'
        });
        User.belongsToMany(group_1.Group, {
            through: 'GroupMembers',
            foreignKey: 'memberId',
            targetKey: 'groupId'
        });
    }
}
exports.User = User;
;
User.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    introduction: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: defineSequelize_1.sequelize,
    modelName: 'Users',
});

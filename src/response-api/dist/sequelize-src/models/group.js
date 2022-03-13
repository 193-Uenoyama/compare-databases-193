"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const sequelize_1 = require("sequelize");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
const CalculateProcessingTimeModel_1 = __importDefault(require("../../sequelize-src/CalculateProcessingTimeModel"));
class Group extends CalculateProcessingTimeModel_1.default {
    static associate(DB) {
        DB.Groups.belongsToMany(DB.Users, {
            as: 'Members',
            through: 'GroupMembers',
            foreignKey: 'groupId',
            otherKey: 'memberId',
        });
    }
}
exports.Group = Group;
;
Group.init({
    groupId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    groupIntroduction: {
        type: sequelize_1.DataTypes.TEXT,
    }
}, {
    sequelize: defineSequelize_1.sequelize,
    modelName: 'Groups',
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
const CalculateProcessingTimeModel_1 = __importDefault(require("../../sequelize-src/CalculateProcessingTimeModel"));
// TODO creation optional 調べる
class GroupMember extends CalculateProcessingTimeModel_1.default {
    static associate(DB) {
        DB.GroupMembers.belongsTo(DB.Users, {
            foreignKey: "memberId",
        });
        DB.GroupMembers.belongsTo(DB.Groups, {
            foreignKey: "groupId",
        });
    }
}
;
GroupMember.init({
    groupId: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Groups",
            key: "groupId",
        },
        onDelete: 'cascade',
    },
    memberId: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Users",
            key: "userId",
        },
        onDelete: 'cascade',
    }
}, {
    sequelize: defineSequelize_1.sequelize,
    modelName: 'GroupMembers',
    updatedAt: false,
});
exports.default = GroupMember;

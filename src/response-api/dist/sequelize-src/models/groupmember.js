"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
const user_1 = require("../../sequelize-src/models/user");
const group_1 = require("../../sequelize-src/models/group");
class GroupMember extends sequelize_1.Model {
    static associate() {
        GroupMember.belongsTo(user_1.User);
        GroupMember.belongsTo(group_1.Group);
    }
}
;
GroupMember.init({
    groupId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Groups",
            key: "groupId",
        }
    },
    memberId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Users",
            key: "userId",
        }
    }
}, {
    sequelize: defineSequelize_1.sequelize,
    modelName: 'GroupMembers',
    updatedAt: false,
});
exports.default = GroupMember;

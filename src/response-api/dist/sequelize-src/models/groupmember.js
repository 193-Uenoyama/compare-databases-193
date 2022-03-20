"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
class GroupMember extends core_1.Model {
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
        }
    },
    memberId: {
        type: core_1.DataTypes.INTEGER,
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

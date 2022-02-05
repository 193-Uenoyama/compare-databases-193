"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class GroupMember extends sequelize_1.Model {
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
        sequelize,
        modelName: 'GroupMembers',
        updatedAt: false,
    });
    // let Groups = require('../../sequelize-src/models/groups')(sequelize);
    // let User = require('../../sequelize-src/models/user')(sequelize);
    // GroupMembers.belongsTo(Groups);
    // GroupMembers.hasMany(User);
    return GroupMember;
};

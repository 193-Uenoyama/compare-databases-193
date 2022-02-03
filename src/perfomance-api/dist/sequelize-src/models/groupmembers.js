"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class GroupMembers extends sequelize_1.Model {
    }
    ;
    GroupMembers.init({
        groupId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Groups",
                key: "groupId"
            }
        },
        memberId: {
            type: sequelize_1.DataTypes.STRING,
            references: {
                model: "Users",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'GroupMembers',
    });
    return GroupMembers;
};

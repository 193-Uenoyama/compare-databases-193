"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Group extends sequelize_1.Model {
    }
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
        sequelize,
        modelName: 'Groups',
    });
    // let GroupMembers = require('../../sequelize-src/models/groupmembers')(sequelize);
    // Groups.hasMany(GroupMembers);
    return Group;
};

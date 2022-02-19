"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const sequelize_1 = require("sequelize");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
class Group extends sequelize_1.Model {
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class User extends sequelize_1.Model {
    }
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
        sequelize,
        modelName: 'Users',
    });
    // let GroupMembers = require('../../sequelize-src/models/groupmembers')(sequelize);
    // let Relations = require('../../sequelize-src/models/relations')(sequelize);
    // User.belongsToMany(GroupMembers, {through: "GroupMembers"});
    // User.belongsToMany(Relations, {through: "Relations"});
    return User;
};

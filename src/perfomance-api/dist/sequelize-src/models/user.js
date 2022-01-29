"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class User extends sequelize_1.Model {
    }
    ;
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING
        },
        introduction: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Users',
    });
    return User;
};

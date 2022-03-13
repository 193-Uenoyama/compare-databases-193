"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Groups', {
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
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Groups');
    }
};

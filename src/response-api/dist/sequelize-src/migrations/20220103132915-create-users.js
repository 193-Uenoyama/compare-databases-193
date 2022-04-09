"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            userId: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            introduction: {
                type: core_1.DataTypes.STRING,
            },
            createdAt: {
                type: core_1.DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: core_1.DataTypes.DATE,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};

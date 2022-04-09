"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Groups', {
            groupId: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            groupName: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            groupIntroduction: {
                type: core_1.DataTypes.TEXT,
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
        await queryInterface.dropTable('Groups');
    }
};

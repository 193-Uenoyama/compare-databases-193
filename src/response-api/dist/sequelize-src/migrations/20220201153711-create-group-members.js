"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('GroupMembers', {
            groupId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: "Groups",
                    key: "groupId",
                }
            },
            memberId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userId",
                }
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('GroupMembers');
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('GroupMembers', {
            groupId: {
                type: core_1.DataTypes.INTEGER,
                references: {
                    model: "Groups",
                    key: "groupId",
                },
                onDelete: 'cascade',
            },
            memberId: {
                type: core_1.DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userId",
                },
                onDelete: 'cascade',
            },
            createdAt: {
                allowNull: false,
                type: core_1.DataTypes.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('GroupMembers');
    }
};

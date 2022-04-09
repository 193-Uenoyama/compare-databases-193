"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Follows', {
            followerUserId: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Users",
                    key: "userId",
                },
                onDelete: "cascade",
            },
            followedUserId: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Users",
                    key: "userId",
                },
                onDelete: "cascade",
            },
            createdAt: {
                type: core_1.DataTypes.DATE,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Follows');
    }
};

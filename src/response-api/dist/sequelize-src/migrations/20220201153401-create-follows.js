"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Follows', {
            followerUserId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Users",
                    key: "userId",
                }
            },
            followedUserId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Users",
                    key: "userId",
                }
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Follows');
    }
};

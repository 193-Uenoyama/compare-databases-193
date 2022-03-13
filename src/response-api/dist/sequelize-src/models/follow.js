"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
class Follow extends sequelize_1.Model {
    static associate(DB) {
        DB.Follows.belongsTo(DB.Users, {
            foreignKey: "followerUserId",
        });
        DB.Follows.belongsTo(DB.Users, {
            foreignKey: "followedUserId",
        });
    }
}
;
Follow.init({
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
}, {
    sequelize: defineSequelize_1.sequelize,
    modelName: 'Follows',
    updatedAt: false,
});
exports.default = Follow;

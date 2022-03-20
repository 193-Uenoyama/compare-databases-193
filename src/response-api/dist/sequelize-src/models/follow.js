"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
class Follow extends core_1.Model {
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
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Users",
            key: "userId",
        }
    },
    followedUserId: {
        type: core_1.DataTypes.INTEGER,
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

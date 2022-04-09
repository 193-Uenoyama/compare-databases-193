"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
const CalculateProcessingTimeModel_1 = __importDefault(require("../../sequelize-src/CalculateProcessingTimeModel"));
// TODO creation optional 調べる
class Follow extends CalculateProcessingTimeModel_1.default {
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
}, {
    sequelize: defineSequelize_1.sequelize,
    modelName: 'Follows',
    updatedAt: false,
});
exports.default = Follow;

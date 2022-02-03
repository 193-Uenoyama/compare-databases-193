"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Relations extends sequelize_1.Model {
    }
    ;
    Relations.init({
        followedUserId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        },
        followingUserId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'Relations',
    });
    return Relations;
};

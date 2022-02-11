"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Relation extends sequelize_1.Model {
    }
    ;
    Relation.init({
        followedUserId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "userId",
            }
        },
        followingUserId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "userId",
            }
        },
    }, {
        sequelize,
        modelName: 'Relations',
        updatedAt: false,
    });
    // let User = require('../../sequelize-src/models/user')(sequelize);
    // Relations.hasMany(User);
    return Relation;
};

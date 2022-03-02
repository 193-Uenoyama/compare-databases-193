"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
module.exports = {
    async up(queryInterface, Sequelize) {
        let data;
        await index_1.default.Users.findAll({}).then((rows) => {
            data = rows;
        });
        let now = new Date();
        return queryInterface.bulkInsert('Relations', [{
                followedUserId: data[0].userId,
                followingUserId: data[2].userId,
                createdAt: now,
            }, {
                followedUserId: data[1].userId,
                followingUserId: data[2].userId,
                createdAt: now,
            }]);
    },
    async down() {
        await index_1.default.Relations.destroy({
            truncate: true
        });
    }
};

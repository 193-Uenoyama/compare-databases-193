"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
module.exports = {
    async up(queryInterface, Sequelize) {
        let user_data;
        let group_data;
        await index_1.default.Users.findAll({}).then((rows) => {
            user_data = rows;
        });
        await index_1.default.Groups.findAll({}).then((rows) => {
            group_data = rows;
        });
        let now = new Date();
        if (user_data.length == 0 || group_data.length == 0) {
            return;
        }
        return queryInterface.bulkInsert('GroupMembers', [{
                groupId: group_data[0].groupId,
                memberId: user_data[0].userId,
                createdAt: now,
            }, {
                groupId: group_data[0].groupId,
                memberId: user_data[1].userId,
                createdAt: now,
            }
        ]);
    },
    async down() {
        await index_1.default.GroupMembers.destroy({
            truncate: true
        });
    }
};

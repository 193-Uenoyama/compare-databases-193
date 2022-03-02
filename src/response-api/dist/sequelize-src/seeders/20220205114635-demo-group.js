"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
module.exports = {
    async up(queryInterface, Sequelize) {
        let now = new Date();
        return queryInterface.bulkInsert('Groups', [{
                groupName: 'kitamura\'s',
                groupIntroduction: 'we love oyatsu',
                createdAt: now,
                updatedAt: now,
            }, {
                groupName: 'A project team',
                createdAt: now,
                updatedAt: now,
            }]);
    },
    async down() {
        await index_1.default.Groups.destroy({
            truncate: { cascade: true }
        });
    }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../sequelize-src/models/index"));
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let now = new Date();
        return queryInterface.bulkInsert('Users', [{
                firstName: 'John',
                lastName: 'Doe',
                email: 'example@example.com',
                createdAt: now,
                updatedAt: now,
            },
            {
                firstName: 'Kitamura',
                lastName: '193',
                email: 'example@kitamura.com.jp',
                createdAt: now,
                updatedAt: now,
            },
            {
                firstName: 'aaa',
                lastName: 'bbb',
                email: 'aaa@abb.jp',
                createdAt: now,
                updatedAt: now,
            },
            {
                firstName: 'ccc',
                lastName: 'ddd',
                email: 'ccc@cdd.jp',
                createdAt: now,
                updatedAt: now,
            },
            {
                firstName: 'yamada',
                lastName: 'keizou',
                email: 'k.yamada@www.co.jp',
                createdAt: now,
                updatedAt: now,
            }]);
    },
    async down() {
        await index_1.default.Users.destroy({
            truncate: { cascade: true }
        });
    }
};

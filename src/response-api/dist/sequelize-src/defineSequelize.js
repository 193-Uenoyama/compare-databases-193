"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || 'development';
// config.ts を module.exports で書きたいのでrequire?
// TODO あとでいろいろ調べる
const config = require('@/sequelize-src/config/config')[env];
if (process.env.DATABASE_SYSTEM == 'sqlite') {
    config.storage = process.env.DATABASE_HOST;
}
config.benchmark = true;
config.logging = (logStr, execTime) => {
    console.log(logStr);
    console.log(execTime);
};
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);

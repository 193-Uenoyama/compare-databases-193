import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';

// config.ts を module.exports で書きたいのでrequire?
// TODO あとでいろいろ調べる
const config = require('@/sequelize-src/config/config')[env];
if (process.env.DATABASE_SYSTEM == 'sqlite') {
  config.storage = process.env.DATABASE_HOST;
}

export const sequelize = new Sequelize( config.database, config.username, config.password, config);
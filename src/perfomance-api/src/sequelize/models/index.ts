import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
// config.ts を module.exports で書きたいのでrequire?
// TODO あとでいろいろ調べる
const config = require('../config/config')[env];
if (process.env.DATABASE_SYSTEM == 'sqlite') {
  config.storage = process.env.DATABASE_HOST;
}

const basename = path.basename(__filename);
const DB: any = {};

let sequelize = new Sequelize( config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    // トランスパイル後なら'.js', ts-nodeで読み込むときは'.ts'
    let correct_file_extention: boolean = ( file.slice(-3) === '.js' || file.slice(-3) === '.ts');
    return (file.indexOf('.') !== 0) && (file !== basename) && correct_file_extention;
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    DB[model.name] = model;
  });

Object.keys(DB).forEach(modelName => {
  if (DB[modelName].associate) {
    DB[modelName].associate(DB);
  }
});

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

export default DB;

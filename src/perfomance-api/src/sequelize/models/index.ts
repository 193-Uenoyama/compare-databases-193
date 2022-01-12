import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'psql';
const project_root = process.env.NODE_PATH || __dirname;

const basename = path.basename(__filename);
const config = require(project_root + 'src/sequelize/config/config.json')[env];
const DB: any = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || 'development';
// config.ts を module.exports で書きたいのでrequire?
// TODO あとでいろいろ調べる
const config = require('../config/config')[env];
const basename = path_1.default.basename(__filename);
const DB = {};
let sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
fs_1.default
    .readdirSync(__dirname)
    .filter(file => {
    // トランスパイル後なら'.js', ts-nodeで読み込むときは'.ts'
    let correct_file_extention = (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
    return (file.indexOf('.') !== 0) && (file !== basename) && correct_file_extention;
})
    .forEach(file => {
    const model = require(path_1.default.join(__dirname, file))(sequelize);
    DB[model.name] = model;
});
Object.keys(DB).forEach(modelName => {
    if (DB[modelName].associate) {
        DB[modelName].associate(DB);
    }
});
DB.sequelize = sequelize;
DB.Sequelize = sequelize_1.Sequelize;
exports.default = DB;

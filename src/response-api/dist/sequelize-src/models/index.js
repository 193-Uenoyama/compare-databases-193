"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const user_1 = require("../../sequelize-src/models/user");
const group_1 = require("../../sequelize-src/models/group");
const groupmember_1 = __importDefault(require("../../sequelize-src/models/groupmember"));
const follow_1 = __importDefault(require("../../sequelize-src/models/follow"));
const defineSequelize_1 = require("../../sequelize-src/defineSequelize");
// const basename = path.basename(__filename);
const DB = {};
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     // トランスパイル後なら'.js', ts-nodeで読み込むときは'.ts'
//     let correct_file_extention: boolean = ( file.slice(-3) === '.js' || file.slice(-3) === '.ts');
//     return (file.indexOf('.') !== 0) && (file !== basename) && correct_file_extention;
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize);
//     DB[model.name] = model;
//   });
DB[user_1.User.name] = user_1.User;
DB[group_1.Group.name] = group_1.Group;
DB[groupmember_1.default.name] = groupmember_1.default;
DB[follow_1.default.name] = follow_1.default;
Object.keys(DB).forEach(modelName => {
    if (DB[modelName].associate) {
        DB[modelName].associate(DB);
    }
});
DB.sequelize = defineSequelize_1.sequelize;
DB.Sequelize = core_1.Sequelize;
exports.default = DB;

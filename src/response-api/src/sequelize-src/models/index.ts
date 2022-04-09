import fs from 'fs';
import path from 'path';
import { Sequelize } from '@sequelize/core';

import { User } from '@/sequelize-src/models/user'
import { Group } from '@/sequelize-src/models/group'
import GroupMember from '@/sequelize-src/models/groupmember'
import Follow from '@/sequelize-src/models/follow'
import { sequelize } from '@/sequelize-src/defineSequelize'

// const basename = path.basename(__filename);
const DB: any = {};

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


DB[User.name] = User;
DB[Group.name] = Group;
DB[GroupMember.name] = GroupMember;
DB[Follow.name] = Follow;

Object.keys(DB).forEach(modelName => {
  if (DB[modelName].associate) {
    DB[modelName].associate(DB);
  }
});

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

export default DB;

import {
  QueryInterface,
  Sequelize,
} from 'sequelize'
import db from '@/sequelize-src/models/index'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    let user_data: any;
    let group_data: any;
    db.Users.findAll({}).then((rows: any) => {
      user_data = rows;
    });
    db.Groups.findAll({}).then((rows: any) => {
      group_data = rows;
    });
    let now: Date = new Date();
    if (user_data.length == 0 || group_data.length == 0) {
      return
    }
    return queryInterface.bulkInsert('GroupMembers', [{
        groupId: group_data[0].groupId,
        memberId: user_data[0].userId,
        createdAt: now,
      },{
        groupId: group_data[0].groupId,
        memberId: user_data[1].userId,
        createdAt: now,
      }
    ]);
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    return queryInterface.bulkDelete('GroupMembers', {}, {});
  }
};

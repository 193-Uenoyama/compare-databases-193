import {
  QueryInterface,
  Sequelize,
} from 'sequelize'
import db from '@/sequelize-src/models/index'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    let data: any;
    db.Users.findAll({}).then((rows: any) => {
      data = rows;
    });
    let now: Date = new Date();
    return queryInterface.bulkInsert('Relations', [{
        followedUserId: data[0].userId,
        followingUserId: data[2].userId,
        createdAt: now,
      }, {
        followedUserId: data[1].userId,
        followingUserId: data[2].userId,
        createdAt: now,
      }]);
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    return queryInterface.bulkDelete('Relations', {}, {});
  }
};

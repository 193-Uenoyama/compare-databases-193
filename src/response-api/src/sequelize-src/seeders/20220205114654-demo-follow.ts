import {
  QueryInterface,
  Sequelize,
} from 'sequelize'
import db from '@/sequelize-src/models/index'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    let data: any;
    await db.Users.findAll({}).then((rows: any) => {
      data = rows;
    });
    let now: Date = new Date();
    return queryInterface.bulkInsert('Follows', [{
        followedUserId: data[0].userId,
        followingUserId: data[2].userId,
        createdAt: now,
      }, {
        followedUserId: data[1].userId,
        followingUserId: data[2].userId,
        createdAt: now,
      }]);
  },

  async down () {
    await db.Follows.destroy({
      truncate: true
    })
  }
};

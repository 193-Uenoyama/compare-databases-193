import {
  QueryInterface,
  Sequelize,
} from '@sequelize/core'
import db from '@/sequelize-src/models/index'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    let data: any;
    await db.Users.findAll({}).then((rows: any) => {
      data = rows;
    });
    let now: Date = new Date();
    return queryInterface.bulkInsert('Follows', [{
        followerUserId: data[2].userId,
        followedUserId: data[0].userId,
        createdAt: now,
      }, {
        followerUserId: data[2].userId,
        followedUserId: data[1].userId,
        createdAt: now,
      }, {
        followerUserId: data[1].userId,
        followedUserId: data[2].userId,
        createdAt: now,
      }]);
  },

  async down () {
    await db.Follows.destroy({
      truncate: true
    })
  }
};

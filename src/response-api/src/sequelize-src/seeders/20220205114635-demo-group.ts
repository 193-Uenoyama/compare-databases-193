import {
  QueryInterface,
  Sequelize,
} from '@sequelize/core'
import db from '@/sequelize-src/models/index'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    let now: Date = new Date();
    return queryInterface.bulkInsert('Groups', [{
        groupName: 'kitamura\'s',
        groupIntroduction: 'we love oyatsu',
        createdAt: now,
        updatedAt: now,
      },{
        groupName: 'A project team',
        createdAt: now,
        updatedAt: now,
      }]);
  },

  async down () {
    await db.Groups.destroy({
      truncate: { cascade: true }
    })
  }
};

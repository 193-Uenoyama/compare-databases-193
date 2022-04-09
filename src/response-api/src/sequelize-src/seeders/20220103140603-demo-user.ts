import {
  QueryInterface,
  Sequelize,
} from '@sequelize/core'
import db from '@/sequelize-src/models/index'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    let now: Date = new Date();
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: now,
      updatedAt: now,
    },
    {
      firstName: 'Kitamura',
      lastName: '193',
      email: 'example@kitamura.com.jp',
      createdAt: now,
      updatedAt: now,
    },
    {
      firstName: 'aaa',
      lastName: 'bbb',
      email: 'aaa@abb.jp',
      createdAt: now,
      updatedAt: now,
    },
    {
      firstName: 'ccc',
      lastName: 'ddd',
      email: 'ccc@cdd.jp',
      createdAt: now,
      updatedAt: now,
    },
    {
      firstName: 'yamada',
      lastName: 'keizou',
      email: 'k.yamada@www.co.jp',
      createdAt: now,
      updatedAt: now,
    }]);
  },

  async down () {
    await db.Users.destroy({
      truncate: { cascade: true }
    });
  }
};

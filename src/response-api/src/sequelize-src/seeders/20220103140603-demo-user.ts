import {
  QueryInterface,
  Sequelize,
} from 'sequelize'

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
    }]);
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.bulkDelete('Users', {}, {});
  }
};

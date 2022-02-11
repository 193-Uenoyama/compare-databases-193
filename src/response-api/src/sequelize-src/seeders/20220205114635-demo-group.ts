import {
  QueryInterface,
  Sequelize,
} from 'sequelize'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    let now: Date = new Date();
    return queryInterface.bulkInsert('Groups', [{
        groupName: 'kitamura\'s',
        groupIntroduction: 'we love oyatsu',
        createdAt: now,
        updatedAt: now,
      }]);
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    return queryInterface.bulkDelete('Groups', {}, {});
  }
};

import {
  DataTypes,
  QueryInterface,
  Sequelize,
} from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.createTable('Groups', {
      groupId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      groupName: { 
        type: DataTypes.INTEGER 
      },
      groupIntroduction: { 
        type: DataTypes.TEXT 
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};

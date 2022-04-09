import {
  DataTypes,
  QueryInterface,
  Sequelize,
} from '@sequelize/core'

module.exports = {
  up: async (queryInterface: QueryInterface , Sequelize: Sequelize) => {
    await queryInterface.createTable('GroupMembers', {
      groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Groups",
          key: "groupId",
        },
        onDelete: 'cascade',
      },
      memberId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface: QueryInterface , Sequelize: Sequelize) => {
    await queryInterface.dropTable('GroupMembers');
  }
};

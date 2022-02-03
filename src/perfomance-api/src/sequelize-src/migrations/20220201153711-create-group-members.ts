import {
  DataTypes,
  QueryInterface,
  Sequelize,
} from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface , Sequelize: Sequelize) => {
    await queryInterface.createTable('GroupMembers', {
      groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Groups",
          key: "groupId"
        }
      },
      memberId: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "id"
        }
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
  down: async (queryInterface: QueryInterface , Sequelize: Sequelize) => {
    await queryInterface.dropTable('GroupMembers');
  }
};

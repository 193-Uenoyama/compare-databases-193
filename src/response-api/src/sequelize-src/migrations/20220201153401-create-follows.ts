import {
  DataTypes,
  QueryInterface,
  Sequelize,
} from '@sequelize/core'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.createTable('Follows', {
      followerUserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "cascade",
      },
      followedUserId: { 
        type: DataTypes.INTEGER ,
        primaryKey: true,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "cascade",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.dropTable('Follows');
  }
};

import {
  DataTypes,
  QueryInterface,
  Sequelize,
} from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.createTable('Follows', {
      followedUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        }
      },
      followingUserId: { 
        type: DataTypes.INTEGER ,
        references: {
          model: "Users",
          key: "userId",
        }
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

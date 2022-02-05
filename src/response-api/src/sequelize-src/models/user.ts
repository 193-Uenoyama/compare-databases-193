import {
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

interface UserAttributes {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  introduction: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

module.exports = (sequelize: Sequelize) => {

  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare userId: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare introduction: string | null;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
  };

  User.init({
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    introduction: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Users',
  });

  // let GroupMembers = require('@/sequelize-src/models/groupmembers')(sequelize);
  // let Relations = require('@/sequelize-src/models/relations')(sequelize);
  // User.belongsToMany(GroupMembers, {through: "GroupMembers"});
  // User.belongsToMany(Relations, {through: "Relations"});

  return User;
}


import {
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  introduction: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {

  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare introduction: string | null;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    }, 
    email: { 
      type: DataTypes.STRING 
    },
    introduction: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    }, {
    sequelize,
    modelName: 'Users',
  });

  return User;
}


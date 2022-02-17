import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '@/sequelize-src/defineSequelize'

export interface UserCommonAttributes {
  userId?: number | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  introduction?: string | null | undefined;
}

export interface UserAttributes extends UserCommonAttributes {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  introduction: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}


export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
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


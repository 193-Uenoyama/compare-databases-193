import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { Group } from '@/sequelize-src/models/group'
import GroupMembers from '@/sequelize-src/models/groupmember'
import CalculateProcessingTimeModel from '@/sequelize-src/CalculateProcessingTimeModel'
import { sequelize } from '@/sequelize-src/defineSequelize'

export interface excludedPersonalInfomationUserAttributes {
  userId: number;
  firstName: string;
  lastName: string;
  introduction: string | null;
}

export interface UserCommonAttributes {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  introduction?: string | null;
}

export interface UserAttributes extends UserCommonAttributes {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  introduction: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

export class User extends CalculateProcessingTimeModel<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare userId: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare introduction: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  associate(DB: any) {
    // DB.Users.belongsToMany(DB.Users, {
    //   through: 'Follows',
    //   foreignKey: 'followedUserId',
    //   targetKey: 'followingUserId',
    // });
    DB.Users.belongsToMany(DB.Groups, { 
      through: 'GroupMembers',
      foreignKey: 'memberId',
      otherKey: 'groupId',
    });
    DB.Users.hasMany(DB.GroupMembers, {
      foreignKey: 'memberId',
      sourceKey: 'userId',
    });
  }
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


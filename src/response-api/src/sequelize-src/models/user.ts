import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
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

export class User extends CalculateProcessingTimeModel<InferAttributes<User>, InferCreationAttributes<User>>{
  declare userId: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare introduction: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(DB: any) {
    DB.Users.belongsToMany(DB.Groups, { 
      as: 'Teams',
      through: 'GroupMembers',
      foreignKey: 'memberId',
      otherKey: 'groupId',
    });

    // UserとFollower(Follows)を結びつけるassociation.
    // Userが自分のフォロワーを操作するためには
    // 自身のuserIdとfollowedUserId(フォローされているユーザID)
    // が結びつかなければならない。
    DB.Users.belongsToMany(DB.Users, {
      as: 'Follower',
      through: 'Follows',
      foreignKey: 'followedUserId',
      otherKey: 'followerUserId',
    });
    // UserとFolloweed(Follows)を結びつけるassociation.
    DB.Users.belongsToMany(DB.Users, {
      as: 'Followed',
      through: 'Follows',
      foreignKey: 'followerUserId',
      otherKey: 'followedUserId',
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


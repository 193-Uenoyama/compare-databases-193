import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import { sequelize } from '@/sequelize-src/defineSequelize'
import CalculateProcessingTimeModel from '@/sequelize-src/CalculateProcessingTimeModel'

interface FollowAttributes {
  followerUserId: number;
  followedUserId: number;
}

// TODO creation optional 調べる
class Follow extends CalculateProcessingTimeModel<InferAttributes<Follow>, InferCreationAttributes<Follow>> {
  declare followerUserId: number;
  declare followedUserId: number;

  static associate(DB: any) {
    DB.Follows.belongsTo(DB.Users, {
      foreignKey: "followerUserId",
    });
    DB.Follows.belongsTo(DB.Users, {
      foreignKey: "followedUserId",
    });
  }
};

Follow.init({
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
}, {
  sequelize,
  modelName: 'Follows',
  updatedAt: false,
});

export default Follow;

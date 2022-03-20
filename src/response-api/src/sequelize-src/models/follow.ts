import {
  DataTypes,
  Model,
  Optional,
} from '@sequelize/core';
import { sequelize } from '@/sequelize-src/defineSequelize'

interface FollowAttributes {
  followerUserId: number;
  followedUserId: number;
}

interface FollowCreationAttributes extends Optional<FollowAttributes, "followerUserId"> {}

class Follow extends Model<FollowAttributes, FollowCreationAttributes> implements FollowAttributes {
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
    }
  },
  followedUserId: { 
    type: DataTypes.INTEGER ,
    primaryKey: true,
    references: {
      model: "Users",
      key: "userId",
    }
  },
}, {
  sequelize,
  modelName: 'Follows',
  updatedAt: false,
});

export default Follow;

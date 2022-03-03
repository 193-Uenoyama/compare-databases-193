import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '@/sequelize-src/defineSequelize'

interface FollowAttributes {
  followedUserId: number;
  followingUserId: number;
}

interface FollowCreationAttributes extends Optional<FollowAttributes, "followingUserId"> {}

class Follow extends Model<FollowAttributes, FollowCreationAttributes> implements FollowAttributes {
  declare followedUserId: number;
  declare followingUserId: number;
};

Follow.init({
  followedUserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Users",
      key: "userId",
    }
  },
  followingUserId: { 
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

import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '@/sequelize-src/defineSequelize'

interface RelationAttributes {
  followedUserId: number;
  followingUserId: number;
}

interface RelationCreationAttributes extends Optional<RelationAttributes, "followingUserId"> {}

class Relation extends Model<RelationAttributes, RelationCreationAttributes> implements RelationAttributes {
  declare followedUserId: number;
  declare followingUserId: number;
};

Relation.init({
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
  modelName: 'Relations',
  updatedAt: false,
});

export default Relation;

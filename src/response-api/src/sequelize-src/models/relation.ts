import {
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

interface RelationAttributes {
  followedUserId: number;
  followingUserId: number;
}

interface RelationCreationAttributes extends Optional<RelationAttributes, "followingUserId"> {}

module.exports = (sequelize: Sequelize) => {

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

  // let User = require('@/sequelize-src/models/user')(sequelize);
  // Relations.hasMany(User);

  return Relation;
};

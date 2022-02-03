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

  class Relations extends Model<RelationAttributes, RelationCreationAttributes> implements RelationAttributes {
    declare followedUserId: number;
    declare followingUserId: number;
  };

  Relations.init({
    followedUserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    followingUserId: { 
      type: DataTypes.INTEGER ,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Relations',
  });

  return Relations;
};

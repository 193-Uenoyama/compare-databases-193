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
      primaryKey: true,
      references: {
        model: "Users",
        key: "id"
      }
    },
    followingUserId: { 
      type: DataTypes.INTEGER ,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Relations',
  });

  // let User = require('@/sequelize-src/models/user')(sequelize);
  // Relations.hasMany(User);

  return Relations;
};

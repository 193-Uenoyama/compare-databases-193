import {
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

interface GroupAttributes {
  groupId: number;
  groupName: string;
  groupIntroduction: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, "groupId"> {}

module.exports = (sequelize: Sequelize) => {
  class Groups extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    declare groupId: number;
    declare groupName: string;
    declare groupIntroduction: string;
  };

  Groups.init({
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    groupName: { 
      type: DataTypes.INTEGER 
    },
    groupIntroduction: { 
      type: DataTypes.TEXT 
    }
  }, {
    sequelize,
    modelName: 'Groups',
  });

  let GroupMembers = require('@/sequelize-src/models/groupmembers')(sequelize);
  Groups.hasMany(GroupMembers);

  return Groups;
};

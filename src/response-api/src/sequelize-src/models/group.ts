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
  class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    declare groupId: number;
    declare groupName: string;
    declare groupIntroduction: string;
  };

  Group.init({
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    groupName: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupIntroduction: { 
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'Groups',
  });

  // let GroupMembers = require('@/sequelize-src/models/groupmembers')(sequelize);
  // Groups.hasMany(GroupMembers);

  return Group;
};

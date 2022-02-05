import {
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

interface GroupMemberAttributes {
  groupId: number;
  memberId: number;
}

interface GroupMemberCreationAttributes extends Optional<GroupMemberAttributes, "groupId"> {}

module.exports = (sequelize: Sequelize) => {
  class GroupMembers extends Model<GroupMemberAttributes, GroupMemberCreationAttributes> implements GroupMemberAttributes {
    declare groupId: number;
    declare memberId: number;
  };

  GroupMembers.init({
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Groups",
        key: "groupId"
      }
    },
    memberId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'GroupMembers',
  });

  let Groups = require('@/sequelize-src/models/groups')(sequelize);
  let User = require('@/sequelize-src/models/user')(sequelize);
  GroupMembers.belongsTo(Groups);
  GroupMembers.hasMany(User);

  return GroupMembers;
};

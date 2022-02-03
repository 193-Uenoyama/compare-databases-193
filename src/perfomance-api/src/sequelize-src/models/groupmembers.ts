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
      references: {
        model: "Groups",
        key: "groupId"
      }
    },
    memberId: {
      type: DataTypes.STRING,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'GroupMembers',
  });

  return GroupMembers;
};

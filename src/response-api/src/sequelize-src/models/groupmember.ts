import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '@/sequelize-src/defineSequelize'

interface GroupMemberAttributes {
  groupId: number;
  memberId: number;
}

interface GroupMemberCreationAttributes extends Optional<GroupMemberAttributes, "groupId"> {}

class GroupMember extends Model<GroupMemberAttributes, GroupMemberCreationAttributes> implements GroupMemberAttributes {
  declare groupId: number;
  declare memberId: number;

  static associate(DB: any) {
    DB.GroupMembers.belongsTo(DB.Users, {
      foreignKey: "memberId",
    });
    DB.GroupMembers.belongsTo(DB.Groups, {
      foreignKey: "groupId",
    });
  }
};

GroupMember.init({
  groupId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Groups",
      key: "groupId",
    }
  },
  memberId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Users",
      key: "userId",
    }
  }
}, {
  sequelize,
  modelName: 'GroupMembers',
  updatedAt: false,
});

export default GroupMember;

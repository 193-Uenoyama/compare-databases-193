import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import { sequelize } from '@/sequelize-src/defineSequelize'
import CalculateProcessingTimeModel from '@/sequelize-src/CalculateProcessingTimeModel'

interface GroupMemberAttributes {
  groupId: number;
  memberId: number;
}

// TODO creation optional 調べる
class GroupMember extends CalculateProcessingTimeModel<InferAttributes<GroupMember>, InferCreationAttributes<GroupMember>> {
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
    },
    onDelete: 'cascade',
  },
  memberId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Users",
      key: "userId",
    },
    onDelete: 'cascade',
  }
}, {
  sequelize,
  modelName: 'GroupMembers',
  updatedAt: false,
});

export default GroupMember;

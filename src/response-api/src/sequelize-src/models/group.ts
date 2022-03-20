import {
  DataTypes,
  Model,
  Optional,
} from '@sequelize/core';
import { sequelize } from '@/sequelize-src/defineSequelize'
import CalculateProcessingTimeModel from '@/sequelize-src/CalculateProcessingTimeModel'

export interface GroupCommonAttributes {
  groupName?: string;
  groupIntroduction?: string;
}

export interface GroupAttributes {
  groupId: number;
  groupName: string;
  groupIntroduction: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, "groupId"> {}

export class Group extends CalculateProcessingTimeModel<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  declare groupId: number;
  declare groupName: string;
  declare groupIntroduction: string;

  static associate(DB: any) {
    DB.Groups.belongsToMany(DB.Users, { 
      as: 'Members',
      through: 'GroupMembers',
      foreignKey: 'groupId',
      otherKey: 'memberId',
    });
  }
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


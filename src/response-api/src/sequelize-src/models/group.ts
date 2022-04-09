import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import { sequelize } from '@/sequelize-src/defineSequelize'
import CalculateProcessingTimeModel from '@/sequelize-src/CalculateProcessingTimeModel'

export interface elasticGroupAttributes {
  groupId?: number;
  groupName?: string;
  groupIntroduction?: string;
}

export interface GroupAttributes {
  groupId: number;
  groupName: string;
  groupIntroduction: string;
}

export class Group extends CalculateProcessingTimeModel<InferAttributes<Group>, InferCreationAttributes<Group>> {
  declare groupId: CreationOptional<number>;
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


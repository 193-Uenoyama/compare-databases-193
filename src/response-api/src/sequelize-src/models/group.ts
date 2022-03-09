import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '@/sequelize-src/defineSequelize'
import { User } from '@/sequelize-src/models/user'
import GroupMembers from '@/sequelize-src/models/groupmember'

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

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  declare groupId: number;
  declare groupName: string;
  declare groupIntroduction: string;

  static associate(DB: any) {
    DB.Groups.belongsToMany(DB.Users, { 
      through: 'GroupMembers',
      foreignKey: 'groupId',
      otherKey: 'memberId',
    });
    DB.Groups.hasMany(DB.GroupMembers, {
      foreignKey: 'groupId',
      sourceKey: 'groupId',
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


import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '@/sequelize-src/defineSequelize'

interface GroupAttributes {
  groupId: number;
  groupName: string;
  groupIntroduction: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, "groupId"> {}

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

export default Group;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Invoice extends Model {}

Invoice.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientNumber: {
    type: DataTypes.BIGINT, 
    allowNull: false,
  },
  referenceMonth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  electricEnergyKWh: {
    type: DataTypes.FLOAT,
  },
  electricEnergyValue: {
    type: DataTypes.FLOAT,
  },
  screeEnergyKWh: {
    type: DataTypes.FLOAT,
  },
  screeEnergyValue: {
    type: DataTypes.FLOAT,
  },
  compensatedEnergyKWh: {
    type: DataTypes.FLOAT,
  },
  compensatedEnergyValue: {
    type: DataTypes.FLOAT,
  },
  municipalPublicLightingContribution: {
    type: DataTypes.FLOAT,
  },
}, {
  sequelize,
  modelName: 'Invoice',
});

export default Invoice;
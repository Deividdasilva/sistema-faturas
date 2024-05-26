// // src/models/Invoice.ts
// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/database';

// class Invoice extends Model {
//     public id!: number;
//     public clientId!: number;
//     public referenceMonth!: string;
//     public electricEnergyKWh!: number;
//     public electricEnergyValue!: number;
//     public screeEnergyKWh!: number;
//     public screeEnergyValue!: number;
//     public compensatedEnergyKWh!: number;
//     public compensatedEnergyValue!: number;
//     public municipalPublicLightingContribution!: number;
// }

// Invoice.init({
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     clientId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     referenceMonth: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     electricEnergyKWh: DataTypes.FLOAT,
//     electricEnergyValue: DataTypes.FLOAT,
//     screeEnergyKWh: DataTypes.FLOAT,
//     screeEnergyValue: DataTypes.FLOAT,
//     compensatedEnergyKWh: DataTypes.FLOAT,
//     compensatedEnergyValue: DataTypes.FLOAT,
//     municipalPublicLightingContribution: DataTypes.FLOAT
// }, {
//     sequelize,
//     modelName: 'Invoice'
// });

// export default Invoice;

// src/models/Invoice.ts
// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/database';

// class Invoice extends Model {
//   public id!: number;
//   public clientId!: number;
//   public referenceMonth!: string;
//   public electricEnergyKWh!: number;
//   public electricEnergyValue!: number;
//   public screeEnergyKWh!: number;
//   public screeEnergyValue!: number;
//   public compensatedEnergyKWh!: number;
//   public compensatedEnergyValue!: number;
//   public municipalPublicLightingContribution!: number;
// }

// Invoice.init({
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   clientId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   referenceMonth: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   electricEnergyKWh: {
//     type: DataTypes.FLOAT,
//   },
//   electricEnergyValue: {
//     type: DataTypes.FLOAT,
//   },
//   screeEnergyKWh: {
//     type: DataTypes.FLOAT,
//   },
//   screeEnergyValue: {
//     type: DataTypes.FLOAT,
//   },
//   compensatedEnergyKWh: {
//     type: DataTypes.FLOAT,
//   },
//   compensatedEnergyValue: {
//     type: DataTypes.FLOAT,
//   },
//   municipalPublicLightingContribution: {
//     type: DataTypes.FLOAT,
//   },
// }, {
//   sequelize,
//   modelName: 'Invoice',
// });

// export default Invoice;

// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/database';

// class Invoice extends Model {
//   public id!: number;
//   public clientNumber!: number;
//   public referenceMonth!: string;
//   public electricEnergyKWh!: number;
//   public electricEnergyValue!: number;
//   public screeEnergyKWh!: number;
//   public screeEnergyValue!: number;
//   public compensatedEnergyKWh!: number;
//   public compensatedEnergyValue!: number;
//   public municipalPublicLightingContribution!: number;
// }

// Invoice.init({
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   clientNumber: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   referenceMonth: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   electricEnergyKWh: {
//     type: DataTypes.FLOAT,
//   },
//   electricEnergyValue: {
//     type: DataTypes.FLOAT,
//   },
//   screeEnergyKWh: {
//     type: DataTypes.FLOAT,
//   },
//   screeEnergyValue: {
//     type: DataTypes.FLOAT,
//   },
//   compensatedEnergyKWh: {
//     type: DataTypes.FLOAT,
//   },
//   compensatedEnergyValue: {
//     type: DataTypes.FLOAT,
//   },
//   municipalPublicLightingContribution: {
//     type: DataTypes.FLOAT,
//   },
// }, {
//   sequelize,
//   modelName: 'Invoice',
// });

// export default Invoice;


// InvoiceModel.js
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

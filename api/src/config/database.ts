import { Sequelize } from 'sequelize';

// Valores padrão para as variáveis de ambiente
const dbName = process.env.POSTGRES_DB || 'mydefaultdb';
const dbUser = process.env.POSTGRES_USER || 'defaultuser';
const dbPass = process.env.POSTGRES_PASSWORD || 'defaultpassword';

if (!process.env.POSTGRES_DB || !process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD) {
  console.error('Database environment variables are not set.');
  process.exit(1);
}

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

export default sequelize;

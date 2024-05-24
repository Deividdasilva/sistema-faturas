// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'user',
//   password: 'password',
//   database: 'mydatabase',
//   port: 5432,
//   logging: false,  // Ou console.log para ver as queries executadas
// });

// export default sequelize;

// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME!,
//   process.env.DATABASE_USER!,
//   process.env.DATABASE_PASS!,
//   {
//     host: process.env.DATABASE_HOST!,
//     dialect: 'postgres',
//     logging: false
//   }
// );

// export default sequelize;

// import { Sequelize } from 'sequelize';

// // Assegure-se de que o nome do host corresponde ao nome do serviço do PostgreSQL no docker-compose.yml
// const sequelize = new Sequelize({
//   database: process.env.POSTGRES_DB,
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: 'postgres', // Nome do serviço no docker-compose
//   port: 5432,
//   dialect: 'postgres'
// });

// export default sequelize;

// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(process.env.POSTGRES_DB!, process.env.POSTGRES_USER!, process.env.POSTGRES_PASSWORD, {
//   host: process.env.DB_HOST || 'postgres', // Nome do serviço Docker do PostgreSQL
//   dialect: 'postgres',
//   port: process.env.DB_PORT || 5432,
// });

// export default sequelize;

import { Sequelize } from 'sequelize';

// Valores padrão para as variáveis de ambiente
const dbName = process.env.POSTGRES_DB || 'mydefaultdb';
const dbUser = process.env.POSTGRES_USER || 'defaultuser';
const dbPass = process.env.POSTGRES_PASSWORD || 'defaultpassword';

// Garantindo que os valores necessários estão disponíveis e são strings
if (!process.env.POSTGRES_DB || !process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD) {
  console.error('Database environment variables are not set.');
  process.exit(1); // Termina o processo se as variáveis não estiverem definidas
}

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: process.env.DB_HOST || 'localhost', // Usar 'postgres' se estiver usando docker-compose e o serviço se chamar 'postgres'
  dialect: 'postgres',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, // A porta deve ser um número
});

export default sequelize;

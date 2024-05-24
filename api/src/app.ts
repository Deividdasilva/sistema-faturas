// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!!!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;

// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import invoiceRoutes from './routes/invoiceRoutes'; // Importando as rotas de faturas

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // Rotas
// app.use('/api', invoiceRoutes); // Endpoint base para as rotas de faturas

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;

// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import apiRoutes from './routes/indexRoutes';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api', apiRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;

// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import apiRoutes from './routes/indexRoutes';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware para habilitar CORS e parsear JSON corretamente
// app.use(cors());
// app.use(bodyParser.json());

// // Rota base '/api' para todas as chamadas da API
// app.use('/api', apiRoutes);

// // Rota raiz para verificar se a API está funcionando
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Iniciando o servidor na porta definida
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;

// import express from 'express';
// import cors from 'cors';
// import apiRoutes from './routes/indexRoutes';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Configurando middleware de CORS e parseamento de JSON
// app.use(cors());
// app.use(express.json()); // Utiliza o próprio método do express que substitui o bodyParser.json()

// // Definição da rota base para todas as chamadas da API
// app.use('/api', apiRoutes);

// // Rota raiz para verificar se a API está ativa
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Inicialização do servidor na porta especificada
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;

// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from './routes/indexRoutes';
import sequelize from './config/database';  // Importando a instância de conexão do Sequelize

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});


// sequelize.sync({ force: false }).then(() => {
//   console.log('Database & tables created!');
// }).catch(error => {
//   console.error('Failed to create database & tables:', error);
// });

// Sincronizar todos os modelos com o banco de dados
sequelize.sync().then(() => {
  console.log('Drop and re-sync db.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});






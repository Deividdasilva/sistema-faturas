import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from './routes/indexRoutes';
import sequelize from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Isolando a função de inicialização do banco de dados e servidor para controlar via Jest
function initializeDatabase() {
  return sequelize.sync();
}

function startServer() {
  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Exportando funções para permitir controle nos testes
export { app, initializeDatabase, startServer };

// Verificando se o arquivo é executado diretamente e não importado (isso evita que o servidor inicie durante os testes automaticamente)
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database & tables created!');
      startServer();
    })
    .catch(error => {
      console.error('Failed to create database & tables:', error);
    });
}

export default app; 








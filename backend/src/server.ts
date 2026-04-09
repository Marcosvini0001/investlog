import express from 'express';
import cors from 'cors';
import { sequelize } from '.';
import investimentosRoutes from './routes/investimentos';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/investimentos', investimentosRoutes);

sequelize.sync().then(() => {
  console.log('Banco sincronizado');

  app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
  });
});
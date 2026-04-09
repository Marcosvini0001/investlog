import express from 'express';
import cors from 'cors';
import investimentoRoutes from './routes/investimentoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/investimentos', investimentoRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
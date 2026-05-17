import express from 'express';
import cors from 'cors';
import investimentoRoutes from './routes/investimentoRoutes';
import authRoutes from "./routes/authRoutes";
import sequelize from './config/database';
import './models/modelUsers';
import './models/modelInvestimento';
import './models/modelVenda';
import './models/modelConta';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/investimentos', investimentoRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log('Banco sincronizado'))
  .catch(console.error);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Servidor rodando na porta', PORT);
});
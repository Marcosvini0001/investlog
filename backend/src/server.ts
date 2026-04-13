import express from 'express';
import cors from 'cors';
import investimentoRoutes from './routes/investimentoRoutes';
import authRoutes from "./routes/authRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
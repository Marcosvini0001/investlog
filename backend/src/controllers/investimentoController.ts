import { Request, Response } from 'express';
import  Investimento  from '../models/modelInvestimento';

// Criar investimento
export const criarInvestimento = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, quantidade, valor_unitario } = req.body;

    if (!nome || quantidade <= 0 || valor_unitario <= 0) {
    return res.status(400).json({ error: 'Valores devem ser maiores que zero' });
    }

    const valor_total = quantidade * valor_unitario;

    const investimento = await Investimento.create({
      nome,
      tipo,
      quantidade,
      valor_unitario,
      valor_total
    });

    return res.json(investimento);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Listar investimentos
export const listarInvestimentos = async (_req: Request, res: Response) => {
  try {
    const data = await Investimento.findAll();
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};
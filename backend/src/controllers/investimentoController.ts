import { Request, Response } from "express";
import { Investimento } from "../models/modelInvestimento";

export const criarInvestimento = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, quantidade, valor_unitario } = req.body;
    const userId = req.userId;

    if (!nome || !quantidade || !valor_unitario) {
      return res.status(400).json({ message: "Preencha todos os campos corretamente" });
    }

    const valor_total = Number(quantidade) * Number(valor_unitario);

    const investimento = await Investimento.create({
      userId,
      nome,
      tipo,
      quantidade,
      valor_unitario,
      valor_total,
    });

    return res.status(201).json({ message: "Investimento criado", investimento });
  } catch (error: any) {
    console.error("Erro ao criar investimento:", error);
    return res.status(500).json({ message: "Erro ao criar investimento" });
  }
};

export const listarInvestimentos = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const investimentos = await Investimento.findAll({
      where: { userId },
    });

    return res.json(investimentos);
  } catch (error: any) {
    console.error("Erro ao listar investimentos:", error);
    return res.status(500).json({ message: "Erro ao listar investimentos" });
  }
};
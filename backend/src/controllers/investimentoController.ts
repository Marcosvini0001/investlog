import { Request, Response } from "express";
import { Investimento } from "../models/modelInvestimento";

export const criarInvestimento = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, quantidade, valor_unitario } = req.body;

    if (!nome || quantidade == null || valor_unitario == null) {
      return res.status(400).json({ message: "Preencha todos os campos corretamente" });
    }

    const valor_total = Number(quantidade) * Number(valor_unitario);

    const investimento = await Investimento.create({
      userId: req.userId,
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
    const investimentos = await Investimento.findAll({
      where: { userId: req.userId },
    });

    return res.json(investimentos);
  } catch (error: any) {
    console.error("Erro ao listar investimentos:", error);
    return res.status(500).json({ message: "Erro ao listar investimentos" });
  }
};

export const atualizarInvestimento = async (req: Request, res: Response) => {
  try {
    const investimentoId = Number(req.params.id);
    const { quantidade, valor_unitario } = req.body;

    if (quantidade == null || valor_unitario == null) {
      return res.status(400).json({ message: "Informe quantidade e valor unitário" });
    }

    const investimento = await Investimento.findOne({
      where: { id: investimentoId, userId: req.userId },
    });

    if (!investimento) {
      return res.status(404).json({ message: "Investimento não encontrado" });
    }

    investimento.quantidade = Number(quantidade);
    investimento.valor_unitario = Number(valor_unitario);
    investimento.valor_total = Number(quantidade) * Number(valor_unitario);

    await investimento.save();

    return res.json({ message: "Investimento atualizado", investimento });
  } catch (error: any) {
    console.error("Erro ao atualizar investimento:", error);
    return res.status(500).json({ message: "Erro ao atualizar investimento" });
  }
};

export const excluirInvestimento = async (req: Request, res: Response) => {
  try {
    const investimentoId = Number(req.params.id);

    const investimento = await Investimento.findOne({
      where: { id: investimentoId, userId: req.userId },
    });

    if (!investimento) {
      return res.status(404).json({ message: "Investimento não encontrado" });
    }

    await investimento.destroy();

    return res.json({ message: "Investimento excluído" });
  } catch (error: any) {
    console.error("Erro ao excluir investimento:", error);
    return res.status(500).json({ message: "Erro ao excluir investimento" });
  }
};

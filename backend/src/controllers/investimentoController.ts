import { Request, Response } from "express";
import { Investimento, User } from "../models/modelInvestimento";
import PDFDocument from 'pdfkit';

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

export const getUserInvestmentsSummary = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.userId },
      include: [{
        model: Investimento,
        as: 'investments',
        attributes: ['nome', 'valor_total']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json({
      user: user.nome,
      investments: user.investments
    });
  } catch (error: any) {
    console.error("Erro ao obter resumo de investimentos:", error);
    return res.status(500).json({ message: "Erro ao obter resumo de investimentos" });
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

export const exportarPDF = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const investimentos = await Investimento.findAll({
      where: { userId },
    });

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=investimentos.pdf"
    );

    doc.pipe(res);

    // 🔥 TÍTULO
    doc.fontSize(22).text("INVESTLOG", { align: "center" });
    doc.fontSize(14).text("Relatório de Investimentos", {
      align: "center",
    });

    doc.moveDown();

    let totalGeral = 0;

    investimentos.forEach((inv, index) => {
      const valorTotal = Number(inv.valor_total);
      const valorUnit = Number(inv.valor_unitario);

      totalGeral += valorTotal;

      doc
        .fontSize(12)
        .text(`${index + 1}. ${inv.nome}`, { underline: true })
        .text(`Quantidade: ${inv.quantidade}`)
        .text(`Valor unitário: R$ ${valorUnit.toFixed(2)}`)
        .text(`Valor total: R$ ${valorTotal.toFixed(2)}`)
        .text(
          `Data: ${new Date(inv.createdAt).toLocaleDateString("pt-BR")}`
        )
        .moveDown();
    });

    // 🔥 TOTAL FINAL
    doc.moveDown();
    doc
      .fontSize(14)
      .text(`Total investido: R$ ${totalGeral.toFixed(2)}`, {
        align: "right",
      });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar PDF" });
  }
};

import { Router } from 'express';
import { Investimento } from '..';

const router = Router();

// Criar
router.post('/', async (req, res) => {
  try {
    const { nome, tipo, quantidade, valor_unitario } = req.body;

    const valor_total = quantidade * valor_unitario;

    const investimento = await Investimento.create({
      nome,
      tipo,
      quantidade,
      valor_unitario,
      valor_total
    });

    res.json(investimento);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Listar
router.get('/', async (req, res) => {
  try {
    const data = await Investimento.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
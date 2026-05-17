import { Router } from "express";
import {
  criarInvestimento,
  listarInvestimentos,
  atualizarInvestimento,
  excluirInvestimento,
  getUserInvestmentsSummary,
  venderInvestimento,
  listarVendas,
  getVendasSummary,
  exportarPDF,
} from "../controllers/investimentoController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", autenticar, criarInvestimento);
router.get("/", autenticar, listarInvestimentos);
router.get("/summary", autenticar, getUserInvestmentsSummary);
router.get("/vendas", autenticar, listarVendas);
router.get("/vendas/summary", autenticar, getVendasSummary);
router.post("/:id/vender", autenticar, venderInvestimento);
router.patch("/:id", autenticar, atualizarInvestimento);
router.delete("/:id", autenticar, excluirInvestimento);
router.get('/exportar', autenticar, exportarPDF);

export default router;

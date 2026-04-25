import { Router } from "express";
import {
  criarInvestimento,
  listarInvestimentos,
  atualizarInvestimento,
  excluirInvestimento,
  getUserInvestmentsSummary,
  exportarPDF
} from "../controllers/investimentoController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", autenticar, criarInvestimento);
router.get("/", autenticar, listarInvestimentos);
router.get("/summary", autenticar, getUserInvestmentsSummary);
router.patch("/:id", autenticar, atualizarInvestimento);
router.delete("/:id", autenticar, excluirInvestimento);
router.get('/exportar', autenticar, exportarPDF);

export default router;

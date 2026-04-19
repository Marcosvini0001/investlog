import { Router } from "express";
import {
  criarInvestimento,
  listarInvestimentos,
  atualizarInvestimento,
  excluirInvestimento,
  getUserInvestmentsSummary,
} from "../controllers/investimentoController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", autenticar, criarInvestimento);
router.get("/", autenticar, listarInvestimentos);
router.get("/summary", autenticar, getUserInvestmentsSummary);
router.patch("/:id", autenticar, atualizarInvestimento);
router.delete("/:id", autenticar, excluirInvestimento);

export default router;

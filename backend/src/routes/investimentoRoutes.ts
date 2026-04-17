import { Router } from "express";
import { criarInvestimento, listarInvestimentos } from "../controllers/investimentoController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", autenticar, criarInvestimento);
router.get("/", autenticar, listarInvestimentos);

export default router;
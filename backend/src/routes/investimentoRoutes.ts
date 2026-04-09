import { Router } from 'express';
import { criarInvestimento, listarInvestimentos } from '../controllers/investimentoController';

const router = Router();

router.post('/', criarInvestimento);
router.get('/', listarInvestimentos);

export default router;
import express from 'express';
import { createProcedimento, getProcedimentos } from '../controllers/procedimentoController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Listar procedimentos - apenas médico
router.get('/', authMiddleware(['medico']), getProcedimentos);

// Registrar procedimento - apenas médico
router.post('/', authMiddleware(['medico']), createProcedimento);

export default router;

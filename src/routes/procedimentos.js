import express from 'express';
import { createProcedimento } from '../controllers/procedimentoController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Registrar procedimento - apenas médico
router.post('/', authMiddleware(['medico']), createProcedimento);

export default router;

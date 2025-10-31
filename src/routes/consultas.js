import express from 'express';
import { createConsulta } from '../controllers/consultaController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Registrar consulta - apenas médico
router.post('/', authMiddleware(['medico']), createConsulta);

export default router;

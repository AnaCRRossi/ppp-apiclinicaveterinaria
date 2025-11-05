import express from 'express';
import { createConsulta, getConsultas } from '../controllers/consultaController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Listar consultas - apenas médico
router.get('/', authMiddleware(['medico']), getConsultas);

// Registrar consulta - apenas médico
router.post('/', authMiddleware(['medico']), createConsulta);

export default router;

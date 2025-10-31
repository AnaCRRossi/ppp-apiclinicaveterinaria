import express from 'express';
import { createPet, listPets, getPet } from '../controllers/petController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Criar pet - apenas médico
router.post('/', authMiddleware(['medico']), createPet);
// Listar / buscar pets - médico pode ver todos, dono vê os seus via login + filtro
router.get('/', authMiddleware(['medico','dono']), listPets);
// Buscar dados e histórico de pet - médico vê tudo, dono apenas se for dono
router.get('/:id', authMiddleware(['medico','dono']), getPet);

export default router;

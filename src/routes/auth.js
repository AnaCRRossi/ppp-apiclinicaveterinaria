import express from 'express';
import { registerMedico, registerDono, login } from '../controllers/authController.js';

const router = express.Router();

// Registrar médico veterinário
router.post('/medico/register', registerMedico);
// Registrar dono do pet
router.post('/dono/register', registerDono);
// Login (médico ou dono)
router.post('/login', login);

export default router;

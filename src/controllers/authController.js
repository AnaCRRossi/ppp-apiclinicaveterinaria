import * as authService from '../services/authService.js';

export async function registerMedico(req, res) {
  try {
    const created = await authService.registerMedico(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

export async function registerDono(req, res) {
  try {
    const created = await authService.registerDono(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

export async function login(req, res) {
  try {
    const token = await authService.login(req.body);
    res.json(token);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

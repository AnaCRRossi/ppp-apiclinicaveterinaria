import * as consultaService from '../services/consultaService.js';

export function createConsulta(req, res) {
  try {
    const payload = { ...req.body, medicoId: req.user.id };
    const consulta = consultaService.createConsulta(payload);
    res.status(201).json(consulta);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

export function getConsultas(req, res) {
  try {
    const consultas = consultaService.getConsultas();
    res.status(200).json(consultas);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

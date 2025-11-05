import * as procedimentoService from '../services/procedimentoService.js';

export function createProcedimento(req, res) {
  try {
    const payload = { ...req.body, medicoId: req.user.id };
    const procedimento = procedimentoService.createProcedimento(payload);
    res.status(201).json(procedimento);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

export function getProcedimentos(req, res) {
  try {
    const procedimentos = procedimentoService.getProcedimentos();
    res.status(200).json(procedimentos);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

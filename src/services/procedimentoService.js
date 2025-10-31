import db, { generateId } from '../models/db.js';

export function createProcedimento({ petId, medicoId, data, descricao }) {
  const pet = db.pets.find(p => p.id === petId);
  if (!pet) throw { status: 400, message: 'Pet não encontrado' };
  const medico = db.medicos.find(m => m.id === medicoId);
  if (!medico) throw { status: 400, message: 'Médico não encontrado' };
  const procedimento = { id: generateId('procedimento'), petId, medicoId, data, descricao };
  db.procedimentos.push(procedimento);
  return procedimento;
}

import db, { generateId } from '../models/db.js';

export function createConsulta({ petId, medicoId, data, descricao }) {
  const pet = db.pets.find(p => p.id === petId);
  if (!pet) throw { status: 400, message: 'Pet não encontrado' };
  const medico = db.medicos.find(m => m.id === medicoId);
  if (!medico) throw { status: 400, message: 'Médico não encontrado' };
  const consulta = { id: generateId('consulta'), petId, medicoId, data, descricao };
  db.consultas.push(consulta);
  return consulta;
}

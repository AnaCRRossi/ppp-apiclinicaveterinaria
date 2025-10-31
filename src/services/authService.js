import db, { generateId } from '../models/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'trocar_esse_segredo_em_producao';
const TOKEN_EXPIRES = '8h';

export async function registerMedico({ nome, email, senha }) {
  const exists = db.medicos.find(m => m.email === email);
  if (exists) throw { status: 400, message: 'E-mail de médico já cadastrado' };
  const hashed = await bcrypt.hash(senha, 8);
  const medico = { id: generateId('medico'), nome, email, senha: hashed, role: 'medico' };
  db.medicos.push(medico);
  return { id: medico.id, nome: medico.nome, email: medico.email };
}

export async function registerDono({ nome, email, senha }) {
  const exists = db.donos.find(d => d.email === email);
  if (exists) throw { status: 400, message: 'E-mail de dono já cadastrado' };
  const hashed = await bcrypt.hash(senha, 8);
  const dono = { id: generateId('dono'), nome, email, senha: hashed, role: 'dono' };
  db.donos.push(dono);
  return { id: dono.id, nome: dono.nome, email: dono.email };
}

export async function login({ email, senha }) {
  const medico = db.medicos.find(m => m.email === email);
  if (medico) {
    const ok = await bcrypt.compare(senha, medico.senha);
    if (!ok) throw { status: 401, message: 'Credenciais inválidas' };
    const token = jwt.sign({ id: medico.id, role: 'medico', type: 'medico' }, SECRET, { expiresIn: TOKEN_EXPIRES });
    return { token, user: { id: medico.id, nome: medico.nome, email: medico.email, role: 'medico' } };
  }
  const dono = db.donos.find(d => d.email === email);
  if (dono) {
    const ok = await bcrypt.compare(senha, dono.senha);
    if (!ok) throw { status: 401, message: 'Credenciais inválidas' };
    const token = jwt.sign({ id: dono.id, role: 'dono', type: 'dono' }, SECRET, { expiresIn: TOKEN_EXPIRES });
    return { token, user: { id: dono.id, nome: dono.nome, email: dono.email, role: 'dono' } };
  }
  throw { status: 401, message: 'Credenciais inválidas' };
}

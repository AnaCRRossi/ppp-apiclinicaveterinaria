import db, { generateId } from '../models/db.js';

export function createPet({ nome, especie, raca, donoId }) {
  const dono = db.donos.find(d => d.id === donoId);
  if (!dono) throw { status: 400, message: 'Dono não encontrado' };
  const pet = { id: generateId('pet'), nome, especie, raca, donoId };
  db.pets.push(pet);
  return pet;
}

export function findPets(query) {
  if (!query) return db.pets;
  const q = query.toLowerCase();
  return db.pets.filter(p => p.nome.toLowerCase().includes(q) || p.raca?.toLowerCase().includes(q));
}

export function getPetById(id) {
  const pet = db.pets.find(p => p.id === id);
  if (!pet) throw { status: 404, message: 'Pet não encontrado' };
  return pet;
}

export function getPetHistory(petId) {
  const consultas = db.consultas.filter(c => c.petId === petId);
  const procedimentos = db.procedimentos.filter(p => p.petId === petId);
  return { consultas, procedimentos };
}

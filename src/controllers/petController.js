import * as petService from '../services/petService.js';

export function createPet(req, res) {
  try {
    const payload = req.body;
    const pet = petService.createPet(payload);
    res.status(201).json(pet);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

export function listPets(req, res) {
  try {
    const q = req.query.q;
    const pets = petService.findPets(q);
    res.json(pets);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

export function getPet(req, res) {
  try {
    const pet = petService.getPetById(req.params.id);
    const history = petService.getPetHistory(req.params.id);
    res.json({ pet, history });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

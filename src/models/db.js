const db = {
  medicos: [],
  donos: [],
  pets: [],
  consultas: [],
  procedimentos: [],
};

let idCounters = {
  medico: 1,
  dono: 1,
  pet: 1,
  consulta: 1,
  procedimento: 1,
};

export function generateId(type) {
  const id = idCounters[type]++;
  return id.toString();
}

export default db;

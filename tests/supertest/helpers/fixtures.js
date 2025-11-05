// Dados de teste padronizados
export const fixtures = {
  // Médicos
  validMedico: {
    nome: 'Dr. João Silva',
    email: 'joao.silva@veterinaria.com',
    senha: 'senha123'
  },
  
  registroMedico: {
    nome: 'Dr. Roberto Santos',
    email: 'roberto.santos@clinica.com',
    senha: 'senha456'
  },
  
  anotherMedico: {
    nome: 'Dra. Maria Santos',
    email: 'maria.santos@veterinaria.com', 
    senha: 'senha456'
  },

  // Donos
  validDono: {
    nome: 'Carlos Oliveira',
    email: 'carlos@email.com',
    senha: 'senha789'
  },

  registroDono: {
    nome: 'Ana Carolina Rossi',
    email: 'ana.rossi@email.com',
    senha: 'senha321'
  },

  anotherDono: {
    nome: 'Ana Costa',
    email: 'ana@email.com',
    senha: 'senha321'
  },

  // Pets
  validPet: {
    nome: 'Rex',
    especie: 'Cachorro', 
    raca: 'SRD',
    donoId: '1' // Será ajustado dinamicamente nos testes
  },

  anotherPet: {
    nome: 'Mimi',
    especie: 'Gato',
    raca: 'Persa',
    donoId: '1'
  },

  // Consultas
  validConsulta: {
    petId: '1', // Será ajustado dinamicamente
    data: '2025-11-04',
    descricao: 'Consulta de rotina - checkup geral'
  },

  // Procedimentos
  validProcedimento: {
    petId: '1', // Será ajustado dinamicamente
    data: '2025-11-04',
    descricao: 'Vacina antirrábica',
    tipo: 'Vacina'
  },

  // Dados inválidos para testes de erro
  invalidData: {
    emptyMedico: {},
    medicoSemNome: {
      email: 'teste@email.com',
      senha: '123456'
    },
    medicoSemEmail: {
      nome: 'Dr. Teste',
      senha: '123456'
    },
    medicoSemSenha: {
      nome: 'Dr. Teste',
      email: 'teste@email.com'
    },
    petSemDono: {
      nome: 'Pet Órfão',
      especie: 'Cachorro',
      raca: 'SRD',
      donoId: '999' // ID inexistente
    }
  }
};

// Credenciais de login baseadas nos fixtures
export const loginCredentials = {
  medico: {
    email: fixtures.validMedico.email,
    senha: fixtures.validMedico.senha
  },
  registroMedico: {
    email: fixtures.registroMedico.email,
    senha: fixtures.registroMedico.senha
  },
  dono: {
    email: fixtures.validDono.email,
    senha: fixtures.validDono.senha
  },
  registroDono: {
    email: fixtures.registroDono.email,
    senha: fixtures.registroDono.senha
  },
  invalid: {
    email: 'naoexiste@email.com',
    senha: 'senhaerrada'
  }
};
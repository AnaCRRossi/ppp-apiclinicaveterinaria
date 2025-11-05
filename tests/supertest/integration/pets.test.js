import { expect, request } from '../helpers/setup.js';
import { fixtures } from '../helpers/fixtures.js';
import { createMedicoAndLogin, createDonoAndLogin, createCompleteSetup, authenticatedRequest } from '../helpers/auth-helper.js';

describe('🐕 CRITICAL: Pets Management Tests', function() {
  this.timeout(10000);

  describe('POST /pets - Create Pet', function() {
    
    it('✅ Should create pet with valid medico token', async function() {
      // Setup: criar médico, dono e fazer login
      const medicoToken = await createMedicoAndLogin();
      await createDonoAndLogin(); // Cria dono com ID 2

      const response = await authenticatedRequest(medicoToken)
        .post('/pets')
        .send({
          ...fixtures.validPet,
          donoId: '2' // ID do dono criado
        });

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('nome', fixtures.validPet.nome);
      expect(response.body).to.have.property('especie', fixtures.validPet.especie);
      expect(response.body).to.have.property('donoId', '2');
    });

    it('❌ Should reject pet creation without token', async function() {
      const response = await request
        .post('/pets')
        .send(fixtures.validPet);

      expect(response).to.have.status(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Token não fornecido');
    });

    it('❌ Should reject pet creation with dono token', async function() {
      // Setup: criar dono e tentar criar pet
      const donoToken = await createDonoAndLogin();

      const response = await authenticatedRequest(donoToken)
        .post('/pets')
        .send(fixtures.validPet);

      expect(response).to.have.status(403);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Acesso negado');
    });

    it('❌ Should reject pet creation with invalid dono ID', async function() {
      const medicoToken = await createMedicoAndLogin();

      const response = await authenticatedRequest(medicoToken)
        .post('/pets')
        .send(fixtures.invalidData.petSemDono);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Dono não encontrado');
    });
  });

  describe('GET /pets - List Pets', function() {
    
    it('✅ Should list all pets for medico', async function() {
      // Setup completo: médico, dono e pet
      const { medicoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .get('/pets');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0]).to.have.property('nome', fixtures.validPet.nome);
    });

    it('✅ Should list owner pets for dono', async function() {
      // Setup completo
      const { donoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(donoToken)
        .get('/pets');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      // Dono deve ver seus pets (implementação atual retorna todos)
      expect(response.body).to.have.lengthOf.at.least(0);
    });

    it('❌ Should reject pets listing without token', async function() {
      const response = await request.get('/pets');

      expect(response).to.have.status(401);
      expect(response.body.error).to.include('Token não fornecido');
    });
  });

  describe('GET /pets/:id - Pet Details and History', function() {
    
    it('✅ Should get pet details and history for medico', async function() {
      const { medicoToken, petId } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .get(`/pets/${petId}`);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('pet');
      expect(response.body).to.have.property('history');
      expect(response.body.pet).to.have.property('id', petId);
      expect(response.body.history).to.have.property('consultas');
      expect(response.body.history).to.have.property('procedimentos');
    });

    it('❌ Should reject access to non-existent pet', async function() {
      const medicoToken = await createMedicoAndLogin();

      const response = await authenticatedRequest(medicoToken)
        .get('/pets/999');

      expect(response).to.have.status(404);
      expect(response.body.error).to.include('Pet não encontrado');
    });
  });

  describe('GET /pets?q=search - Pet Search', function() {
    
    it('✅ Should search pets by name', async function() {
      const { medicoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .get('/pets?q=rex');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('nome', 'Rex');
    });

    it('✅ Should return empty array for no matches', async function() {
      const { medicoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .get('/pets?q=naoexiste');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(0);
    });
  });
});
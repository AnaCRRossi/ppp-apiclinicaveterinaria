import { expect, request } from '../helpers/setup.js';
import { fixtures } from '../helpers/fixtures.js';
import { createCompleteSetup, authenticatedRequest } from '../helpers/auth-helper.js';

describe('🏥 CRITICAL: Consultas and Procedimentos Tests', function() {
  this.timeout(10000);

  describe('POST /consultas - Create Consulta', function() {
    
    it('✅ Should create consulta with valid medico token', async function() {
      const { medicoToken, petId } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .post('/consultas')
        .send({
          ...fixtures.validConsulta,
          petId: petId
        });

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('petId', petId);
      expect(response.body).to.have.property('medicoId', '1'); // Primeiro médico criado
      expect(response.body).to.have.property('descricao', fixtures.validConsulta.descricao);
    });

    it('❌ Should reject consulta creation with dono token', async function() {
      const { donoToken, petId } = await createCompleteSetup();

      const response = await authenticatedRequest(donoToken)
        .post('/consultas')
        .send({
          ...fixtures.validConsulta,
          petId: petId
        });

      expect(response).to.have.status(403);
      expect(response.body.error).to.include('Acesso negado');
    });

    it('❌ Should reject consulta with invalid pet ID', async function() {
      const { medicoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .post('/consultas')
        .send({
          ...fixtures.validConsulta,
          petId: '999' // Pet inexistente
        });

      expect(response).to.have.status(400);
      expect(response.body.error).to.include('Pet não encontrado');
    });
  });

  describe('GET /consultas - List Consultas', function() {
    
    it('✅ Should list all consultas for medico', async function() {
      const { medicoToken, petId } = await createCompleteSetup();

      // Primeiro criar uma consulta
      await authenticatedRequest(medicoToken)
        .post('/consultas')
        .send({
          ...fixtures.validConsulta,
          petId: petId
        });

      // Depois listar consultas
      const response = await authenticatedRequest(medicoToken)
        .get('/consultas');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0]).to.have.property('petId', petId);
      expect(response.body[0]).to.have.property('descricao', fixtures.validConsulta.descricao);
    });

    it('✅ Should return empty array when no consultas exist', async function() {
      const { medicoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .get('/consultas');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(0);
    });

    it('❌ Should reject consultas listing with dono token', async function() {
      const { donoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(donoToken)
        .get('/consultas');

      expect(response).to.have.status(403);
      expect(response.body.error).to.include('Acesso negado');
    });

    it('❌ Should reject consultas listing without token', async function() {
      const response = await request.get('/consultas');

      expect(response).to.have.status(401);
      expect(response.body.error).to.include('Token não fornecido');
    });
  });

  describe('POST /procedimentos - Create Procedimento', function() {
    
    it('✅ Should create procedimento with valid medico token', async function() {
      const { medicoToken, petId } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .post('/procedimentos')
        .send({
          ...fixtures.validProcedimento,
          petId: petId
        });

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('petId', petId);
      expect(response.body).to.have.property('medicoId', '1');
      expect(response.body).to.have.property('descricao', fixtures.validProcedimento.descricao);
    });

    it('❌ Should reject procedimento creation with dono token', async function() {
      const { donoToken, petId } = await createCompleteSetup();

      const response = await authenticatedRequest(donoToken)
        .post('/procedimentos')
        .send({
          ...fixtures.validProcedimento,
          petId: petId
        });

      expect(response).to.have.status(403);
      expect(response.body.error).to.include('Acesso negado');
    });

    it('❌ Should reject procedimento with invalid pet ID', async function() {
      const { medicoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .post('/procedimentos')
        .send({
          ...fixtures.validProcedimento,
          petId: '999'
        });

      expect(response).to.have.status(400);
      expect(response.body.error).to.include('Pet não encontrado');
    });
  });

  describe('GET /procedimentos - List Procedimentos', function() {
    
    it('✅ Should list all procedimentos for medico', async function() {
      const { medicoToken, petId } = await createCompleteSetup();

      // Criar um procedimento
      await authenticatedRequest(medicoToken)
        .post('/procedimentos')
        .send({
          ...fixtures.validProcedimento,
          petId: petId
        });

      // Listar procedimentos
      const response = await authenticatedRequest(medicoToken)
        .get('/procedimentos');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0]).to.have.property('petId', petId);
      expect(response.body[0]).to.have.property('descricao', fixtures.validProcedimento.descricao);
    });

    it('✅ Should return empty array when no procedimentos exist', async function() {
      const { medicoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(medicoToken)
        .get('/procedimentos');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(0);
    });

    it('❌ Should reject procedimentos listing with dono token', async function() {
      const { donoToken } = await createCompleteSetup();

      const response = await authenticatedRequest(donoToken)
        .get('/procedimentos');

      expect(response).to.have.status(403);
      expect(response.body.error).to.include('Acesso negado');
    });

    it('❌ Should reject procedimentos listing without token', async function() {
      const response = await request.get('/procedimentos');

      expect(response).to.have.status(401);
      expect(response.body.error).to.include('Token não fornecido');
    });
  });

  describe('Integration: Consultas and Procedimentos in Pet History', function() {
    
    it('✅ Should include consultas and procedimentos in pet history', async function() {
      const { medicoToken, petId } = await createCompleteSetup();

      // Criar consulta e procedimento
      await authenticatedRequest(medicoToken)
        .post('/consultas')
        .send({
          ...fixtures.validConsulta,
          petId: petId
        });

      await authenticatedRequest(medicoToken)
        .post('/procedimentos')
        .send({
          ...fixtures.validProcedimento,
          petId: petId
        });

      // Verificar histórico do pet
      const response = await authenticatedRequest(medicoToken)
        .get(`/pets/${petId}`);

      expect(response).to.have.status(200);
      expect(response.body.history.consultas).to.have.lengthOf(1);
      expect(response.body.history.procedimentos).to.have.lengthOf(1);
      expect(response.body.history.consultas[0]).to.have.property('descricao', fixtures.validConsulta.descricao);
      expect(response.body.history.procedimentos[0]).to.have.property('descricao', fixtures.validProcedimento.descricao);
    });
  });
});
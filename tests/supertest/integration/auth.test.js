import { expect, request, clearDatabase } from '../helpers/setup.js';
import { fixtures, loginCredentials } from '../helpers/fixtures.js';

describe('🔐 CRITICAL: Authentication Tests', function() {
  this.timeout(10000); // Timeout maior para testes de autenticação

  beforeEach(async function() {
    await clearDatabase();
  });

  describe('POST /auth/medico/register', function() {
    
    it('✅ Should register medico with valid data', async function() {
      const response = await request
        .post('/auth/medico/register')
        .send(fixtures.validMedico);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('nome', fixtures.validMedico.nome);
      expect(response.body).to.have.property('email', fixtures.validMedico.email);
      expect(response.body).to.not.have.property('senha'); // Senha não deve ser retornada
    });

    it('❌ Should reject duplicate email', async function() {
      // Primeiro registro
      await request
        .post('/auth/medico/register')
        .send(fixtures.validMedico);

      // Segundo registro com mesmo email
      const response = await request
        .post('/auth/medico/register')
        .send(fixtures.validMedico);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('já cadastrado');
    });

    it('❌ Should reject missing required fields', async function() {
      const response = await request
        .post('/auth/medico/register')
        .send(fixtures.invalidData.medicoSemNome);

      expect(response).to.have.status(500); // Erro interno por campo ausente
    });
  });

  describe('POST /auth/dono/register', function() {
    
    it('✅ Should register dono with valid data', async function() {
      const response = await request
        .post('/auth/dono/register')
        .send(fixtures.validDono);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('nome', fixtures.validDono.nome);
      expect(response.body).to.have.property('email', fixtures.validDono.email);
      expect(response.body).to.not.have.property('senha');
    });

    it('❌ Should reject duplicate email', async function() {
      // Primeiro registro
      await request
        .post('/auth/dono/register')
        .send(fixtures.validDono);

      // Segundo registro com mesmo email
      const response = await request
        .post('/auth/dono/register')
        .send(fixtures.validDono);

      expect(response).to.have.status(400);
      expect(response.body.error).to.include('já cadastrado');
    });
  });

  describe('POST /auth/login', function() {
    
    beforeEach(async function() {
      // Registrar médico e dono para testes de login
      await request.post('/auth/medico/register').send(fixtures.validMedico);
      await request.post('/auth/dono/register').send(fixtures.validDono);
    });

    it('✅ Should login medico with valid credentials', async function() {
      const response = await request
        .post('/auth/login')
        .send(loginCredentials.medico);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('role', 'medico');
      expect(response.body.user).to.have.property('email', fixtures.validMedico.email);
      
      // Verificar se token é uma string JWT válida (3 partes separadas por ponto)
      const token = response.body.token;
      expect(token.split('.')).to.have.lengthOf(3);
    });

    it('✅ Should login dono with valid credentials', async function() {
      const response = await request
        .post('/auth/login')
        .send(loginCredentials.dono);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
      expect(response.body.user).to.have.property('role', 'dono');
      expect(response.body.user).to.have.property('email', fixtures.validDono.email);
    });

    it('❌ Should reject invalid credentials', async function() {
      const response = await request
        .post('/auth/login')
        .send(loginCredentials.invalid);

      expect(response).to.have.status(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Credenciais inválidas');
    });

    it('❌ Should reject wrong password', async function() {
      const response = await request
        .post('/auth/login')
        .send({
          email: fixtures.validMedico.email,
          senha: 'senhaerrada'
        });

      expect(response).to.have.status(401);
      expect(response.body.error).to.include('Credenciais inválidas');
    });
  });
});
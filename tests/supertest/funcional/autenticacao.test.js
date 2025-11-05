import { expect, request, clearDatabase } from '../helpers/setup.js';
import { fixtures } from '../helpers/fixtures.js';

describe('Testes de Login', function() {
  this.timeout(10000);

  beforeEach(async function() {
    await clearDatabase();
  });

  describe('POST /auth/login', function() {
    
    it('Deve retornar 200 com um token em string quando usuario e senha válidos', async function() {
      // Primeiro precisa registrar um médico
      await request
        .post('/auth/medico/register')
        .send({
          nome: 'giulia.rossi',
          email: 'giulia.rossi@email.com',
          senha: '123456'
        });

      const resposta = await request
        .post('/auth/login')
        .send({
          email: 'giulia.rossi@email.com',
          senha: '123456'
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('token');
      expect(resposta.body.token).to.be.a('string');
    });

    it('Deve retornar erro 401 quando credenciais inválidas', async function() {
      const resposta = await request
        .post('/auth/login')
        .send({
          email: 'usuario.invalido@email.com',
          senha: '098765'
        });

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Credenciais inválidas');
    });

    it('Deve retornar erro 401 quando senha incorreta', async function() {
      // Depois deve registrar um usuário
      await request
        .post('/auth/medico/register')
        .send(fixtures.registroMedico);

      const resposta = await request
        .post('/auth/login')
        .send({
          email: fixtures.registroMedico.email,
          senha: '098765'
        });

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Credenciais inválidas');
    });

    it('Deve permitir login de dono de pet', async function() {
      // Depois deve registrar um dono
      await request
        .post('/auth/dono/register')
        .send(fixtures.registroDono);

      const resposta = await request
        .post('/auth/login')
        .send({
          email: fixtures.registroDono.email,
          senha: fixtures.registroDono.senha
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('token');
      expect(resposta.body).to.have.property('user');
      expect(resposta.body.user).to.have.property('role', 'dono');
    });

    it('Deve permitir login de médico veterinário', async function() {
      // Depois deve registrar um médico
      await request
        .post('/auth/medico/register')
        .send(fixtures.registroMedico);

      const resposta = await request
        .post('/auth/login')
        .send({
          email: fixtures.registroMedico.email,
          senha: fixtures.registroMedico.senha
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('token');
      expect(resposta.body).to.have.property('user');
      expect(resposta.body.user).to.have.property('role', 'medico');
    });
  });

  describe('POST /auth/medico/register - Registro de Médico', function() {
    
    it('Deve registrar médico com dados válidos', async function() {
      const dadosMedico = {
        nome: 'Dra. Ana Paula',
        email: 'ana.paula@clinica.com',
        senha: '123456'
      };

      const resposta = await request
        .post('/auth/medico/register')
        .send(dadosMedico);

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property('id');
      expect(resposta.body).to.have.property('nome', dadosMedico.nome);
      expect(resposta.body).to.have.property('email', dadosMedico.email);
      expect(resposta.body).to.not.have.property('senha');
    });

    it('Deve retornar erro 400 quando email já está cadastrado', async function() {
      const dadosMedico = {
        nome: 'Dra. Ana Paula',
        email: 'ana.paula@clinica.com',
        senha: '123456'
      };

      // Primeiro registro
      await request
        .post('/auth/medico/register')
        .send(dadosMedico);

      // Segundo registro com mesmo email
      const resposta = await request
        .post('/auth/medico/register')
        .send(dadosMedico);

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('já cadastrado');
    });
  });

  describe('POST /auth/dono/register - Registro de Dono', function() {
    
    it('Deve registrar dono com dados válidos', async function() {
      const dadosDono = {
        nome: 'Maria Fernanda',
        email: 'maria.fernanda@email.com',
        senha: '123456'
      };

      const resposta = await request
        .post('/auth/dono/register')
        .send(dadosDono);

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property('id');
      expect(resposta.body).to.have.property('nome', dadosDono.nome);
      expect(resposta.body).to.have.property('email', dadosDono.email);
      expect(resposta.body).to.not.have.property('senha');
    });

    it('Deve retornar erro 400 quando email já está cadastrado', async function() {
      const dadosDono = {
        nome: 'Carlos Eduardo',
        email: 'carlos@email.com',
        senha: '123456'
      };

      // Primeiro registro
      await request
        .post('/auth/dono/register')
        .send(dadosDono);

      // Segundo registro com mesmo email
      const resposta = await request
        .post('/auth/dono/register')
        .send(dadosDono);

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('já cadastrado');
    });
  });

  describe('Testes de Validação', function() {
    
    it('Deve retornar erro 400 quando email tem formato inválido', async function() {
      const resposta = await request
        .post('/auth/medico/register')
        .send({
          nome: 'Dr. Teste Email',
          email: 'email-sem-arroba-nem-dominio', // Email inválido
          senha: '123456'
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Email inválido');
    });

    it('Deve retornar erro 400 quando nome está vazio', async function() {
      const resposta = await request
        .post('/auth/dono/register')
        .send({
          nome: '', // Nome vazio
          email: 'teste.nome@email.com',
          senha: '123456'
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Nome é obrigatório');
    });
  });
});
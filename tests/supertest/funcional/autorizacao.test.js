import { expect, request, clearDatabase } from '../helpers/setup.js';
import { fixtures } from '../helpers/fixtures.js';
import { createMedicoAndLogin, createDonoAndLogin } from '../helpers/auth-helper.js';

describe('Testes de Acesso', function() {
  this.timeout(15000);

  beforeEach(async function() {
    await clearDatabase();
  });

  describe('GET /consultas - Listar Consultas', function() {
    
    it('Deve permitir acesso para médico autenticado', async function() {
      const tokenMedico = await createMedicoAndLogin();

      const resposta = await request
        .get('/consultas')
        .set('Authorization', `Bearer ${tokenMedico}`);

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array');
    });

    it('Deve negar acesso para dono de pet', async function() {
      const tokenDono = await createDonoAndLogin();

      const resposta = await request
        .get('/consultas')
        .set('Authorization', `Bearer ${tokenDono}`);

      expect(resposta.status).to.equal(403);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Acesso negado');
    });

    it('Deve retornar erro 401 quando não há token', async function() {
      const resposta = await request.get('/consultas');

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Token não fornecido');
    });

    it('Deve retornar erro 401 com token inválido', async function() {
      const resposta = await request
        .get('/consultas')
        .set('Authorization', 'Bearer token-invalido');

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Token inválido');
    });
  });

  describe('GET /procedimentos - Listar Procedimentos', function() {
    
    it('Deve permitir acesso para médico autenticado', async function() {
      const tokenMedico = await createMedicoAndLogin();

      const resposta = await request
        .get('/procedimentos')
        .set('Authorization', `Bearer ${tokenMedico}`);

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array');
    });

    it('Deve negar acesso para dono de pet', async function() {
      const tokenDono = await createDonoAndLogin();

      const resposta = await request
        .get('/procedimentos')
        .set('Authorization', `Bearer ${tokenDono}`);

      expect(resposta.status).to.equal(403);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Acesso negado');
    });

    it('Deve retornar erro 401 quando não há token', async function() {
      const resposta = await request.get('/procedimentos');

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Token não fornecido');
    });

    it('Deve retornar erro 401 com token inválido', async function() {
      const resposta = await request
        .get('/procedimentos')
        .set('Authorization', 'Bearer token-invalido-xyz');

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Token inválido');
    });
  });

  describe('POST /pets - Criação de Pet', function() {
    
    it('Deve permitir criação para médico autenticado', async function() {
      const tokenMedico = await createMedicoAndLogin();
      
      // Criar dono e capturar o ID
      const respostaDono = await request
        .post('/auth/dono/register')
        .send({
          nome: 'Gustavo de Rossi',
          email: 'gustavo.dono@email.com',
          senha: '123456'
        });

      const donoIdReal = respostaDono.body.id; // Usar o ID do dono retornado

      const dadosPet = {
        nome: 'Chico',
        especie: 'Cachorro',
        raca: 'Spitz Alemão',
        donoId: donoIdReal // Usar ID retornado
      };

      const resposta = await request
        .post('/pets')
        .set('Authorization', `Bearer ${tokenMedico}`)
        .send(dadosPet);

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property('id');
      expect(resposta.body).to.have.property('nome', dadosPet.nome);
    });

    it('Deve negar criação para dono de pet', async function() {
      const tokenDono = await createDonoAndLogin();

      const dadosPet = {
        nome: 'Milka',
        especie: 'Gato',
        raca: 'SRD',
        donoId: '1'
      };

      const resposta = await request
        .post('/pets')
        .set('Authorization', `Bearer ${tokenDono}`)
        .send(dadosPet);

      expect(resposta.status).to.equal(403);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Acesso negado');
    });

    it('Deve retornar erro 401 quando não há token', async function() {
      const dadosPet = {
        nome: 'Bobby',
        especie: 'Cachorro',
        raca: 'Labrador',
        donoId: '1'
      };

      const resposta = await request
        .post('/pets')
        .send(dadosPet);

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property('error');
      expect(resposta.body.error).to.include('Token não fornecido');
    });
  });
});
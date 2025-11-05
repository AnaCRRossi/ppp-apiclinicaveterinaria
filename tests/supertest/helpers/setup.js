import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../../../src/app.js';

// Configurar chai com plugin HTTP
chai.use(chaiHttp);

// Exportar utilitários
export const expect = chai.expect;
export const request = supertest(app);

// Função helper para limpar dados entre testes
export async function clearDatabase() {
  const dbModule = await import('../../../src/models/db.js');
  const db = dbModule.default;
  
  // Limpar todas as tabelas
  db.medicos = [];
  db.donos = [];
  db.pets = [];
  db.consultas = [];
  db.procedimentos = [];
}
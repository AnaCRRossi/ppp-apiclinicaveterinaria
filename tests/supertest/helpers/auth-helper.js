import { request } from './setup.js';
import { fixtures, loginCredentials } from './fixtures.js';

/**
 * Registra um médico e faz login, retornando o token JWT
 */
export async function createMedicoAndLogin() {
  // 1. Registrar médico
  await request
    .post('/auth/medico/register')
    .send(fixtures.validMedico);

  // 2. Fazer login
  const loginResponse = await request
    .post('/auth/login')
    .send(loginCredentials.medico);

  return loginResponse.body.token;
}

/**
 * Registra um dono e faz login, retornando o token JWT
 */
export async function createDonoAndLogin() {
  // 1. Registrar dono
  await request
    .post('/auth/dono/register')  
    .send(fixtures.validDono);

  // 2. Fazer login
  const loginResponse = await request
    .post('/auth/login')
    .send(loginCredentials.dono);

  return loginResponse.body.token;
}

/**
 * Cria setup completo: médico, dono e pet
 * Retorna tokens e IDs criados
 */
export async function createCompleteSetup() {
  // 1. Criar e fazer login do médico
  const medicoToken = await createMedicoAndLogin();
  
  // 2. Criar e fazer login do dono
  const donoToken = await createDonoAndLogin();
  
  // 3. Criar pet (médico cria, dono é proprietário)
  const petResponse = await request
    .post('/pets')
    .set('Authorization', `Bearer ${medicoToken}`)
    .send({
      ...fixtures.validPet,
      donoId: '2' // ID do dono (segundo usuário criado)
    });
    
  return {
    medicoToken,
    donoToken, 
    petId: petResponse.body.id,
    donoId: '2'
  };
}

/**
 * Helper para fazer requisições autenticadas
 */
export function authenticatedRequest(token) {
  return {
    get: (url) => request.get(url).set('Authorization', `Bearer ${token}`),
    post: (url) => request.post(url).set('Authorization', `Bearer ${token}`),
    put: (url) => request.put(url).set('Authorization', `Bearer ${token}`),
    delete: (url) => request.delete(url).set('Authorization', `Bearer ${token}`)
  };
}
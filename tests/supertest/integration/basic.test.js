import { expect, request } from '../helpers/setup.js';

describe('🧪 Basic Test', function() {
  this.timeout(5000);

  it('Should respond to basic request', async function() {
    const response = await request.get('/docs');
    
    // Deve redirecionar ou retornar alguma resposta
    expect(response.status).to.be.oneOf([200, 301, 302, 404]);
  });
});
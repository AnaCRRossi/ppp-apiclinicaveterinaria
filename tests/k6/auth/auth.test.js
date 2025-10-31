import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:3000';

export default function () {
    // Registrar médico
    let medicoPayload = JSON.stringify({
        nome: 'Dr. Teste',
        email: `medico${__VU}@test.com`,
        senha: '123456'
    });
    let medicoRes = http.post(`${BASE_URL}/auth/medico/register`, medicoPayload, { headers: { 'Content-Type': 'application/json' } });
    check(medicoRes, { 'register medico status 201/409': r => r.status === 201 || r.status === 409 });

    // Registrar dono
    let donoPayload = JSON.stringify({
        nome: 'Dono Teste',
        email: `dono${__VU}@test.com`,
        senha: '123456'
    });
    let donoRes = http.post(`${BASE_URL}/auth/dono/register`, donoPayload, { headers: { 'Content-Type': 'application/json' } });
    check(donoRes, { 'register dono status 201/409': r => r.status === 201 || r.status === 409 });

    // Login médico
    let loginPayload = JSON.stringify({
        email: `medico${__VU}@test.com`,
        senha: '123456'
    });
    let loginRes = http.post(`${BASE_URL}/auth/login`, loginPayload, { headers: { 'Content-Type': 'application/json' } });
    check(loginRes, { 'login medico status 200': r => r.status === 200 });

    sleep(1);
}
